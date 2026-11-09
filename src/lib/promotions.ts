import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { Database } from "@/lib/supabase/database.types";

export type Promotion = Database["public"]["Tables"]["promotions"]["Row"];

export async function getActivePromotion(): Promise<Promotion | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const now = new Date().toISOString();
  const { data, error } = await supabase
    .from("promotions")
    .select("*")
    .eq("active", true)
    .or(`starts_at.is.null,starts_at.lte.${now}`)
    .or(`ends_at.is.null,ends_at.gte.${now}`)
    .order("sort_order", { ascending: true })
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return error ? null : data;
}
