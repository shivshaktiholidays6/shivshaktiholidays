import "server-only";

import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export function isAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  const allowedEmails = (process.env["ADMIN_EMAILS"] ?? "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
  return allowedEmails.includes(email.toLowerCase());
}

export function isAdminAuthConfigured() {
  const hasUrl = Boolean(
    process.env["SUPABASE_URL"]?.trim() ?? process.env["NEXT_PUBLIC_SUPABASE_URL"]?.trim(),
  );
  const hasPublishableKey = Boolean(
    process.env["SUPABASE_PUBLISHABLE_KEY"]?.trim() ??
      process.env["NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"]?.trim() ??
      process.env["SUPABASE_ANON_KEY"]?.trim(),
  );
  return hasUrl && hasPublishableKey && Boolean(process.env["ADMIN_EMAILS"]?.trim());
}

export async function getAdminUser() {
  const supabase = await getSupabaseServerClient();
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) return null;

  const email = typeof data.claims.email === "string" ? data.claims.email : null;
  if (!isAdminEmail(email)) return null;

  return { id: data.claims.sub, email };
}

export async function requireAdminUser() {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}
