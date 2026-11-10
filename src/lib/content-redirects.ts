import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase/admin";

export type RedirectContentType = "package" | "destination";

export async function getContentRedirect(
  contentType: RedirectContentType,
  oldSlug: string,
): Promise<string | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("content_redirects")
    .select("new_slug")
    .eq("content_type", contentType)
    .eq("old_slug", oldSlug)
    .maybeSingle();

  return error ? null : (data?.new_slug ?? null);
}

export async function getRedirectedContentSlugs(
  contentType: RedirectContentType,
): Promise<Set<string>> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return new Set();

  const { data, error } = await supabase
    .from("content_redirects")
    .select("old_slug")
    .eq("content_type", contentType);

  return error ? new Set() : new Set((data ?? []).map((item) => item.old_slug));
}
