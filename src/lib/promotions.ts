import "server-only";

import { unstable_cache } from "next/cache";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { Database } from "@/lib/supabase/database.types";

export type Promotion = Database["public"]["Tables"]["promotions"]["Row"];
export const promotionCacheTag = "active-promotion";

const promotionQueryTimeoutMs = 3_000;

async function withTimeout<T>(operation: PromiseLike<T>, timeoutMs: number): Promise<T> {
  let timeout: ReturnType<typeof setTimeout> | undefined;

  try {
    return await Promise.race([
      Promise.resolve(operation),
      new Promise<never>((_, reject) => {
        timeout = setTimeout(
          () => reject(new Error("Promotion lookup timed out")),
          timeoutMs,
        );
      }),
    ]);
  } finally {
    if (timeout) clearTimeout(timeout);
  }
}

const getCachedActivePromotion = unstable_cache(
  async (): Promise<Promotion | null> => {
    try {
      const supabase = getSupabaseAdmin();
      if (!supabase) return null;

      const now = new Date().toISOString();
      const { data, error } = await withTimeout(
        supabase
          .from("promotions")
          .select("*")
          .eq("active", true)
          .or(`starts_at.is.null,starts_at.lte.${now}`)
          .or(`ends_at.is.null,ends_at.gte.${now}`)
          .order("sort_order", { ascending: true })
          .order("updated_at", { ascending: false })
          .limit(1)
          .maybeSingle(),
        promotionQueryTimeoutMs,
      );

      return error ? null : data;
    } catch (error) {
      console.error(
        "Active promotion lookup failed; continuing without a promotion.",
        error instanceof Error ? error.message : "Unknown error",
      );
      return null;
    }
  },
  ["active-promotion-v1"],
  { revalidate: 300, tags: [promotionCacheTag] },
);

export async function getActivePromotion(): Promise<Promotion | null> {
  return getCachedActivePromotion();
}
