"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { isAdminEmail, requireAdminUser } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const enquiryStatuses = new Set(["new", "contacted", "quoted", "confirmed", "lost"]);

function addResultToUrl(returnTo: string, key: "error" | "updated", value: string) {
  const [pathname = "/admin", query = ""] = returnTo.split("?", 2);
  const params = new URLSearchParams(query);
  params.set(key, value);
  return `${pathname}?${params.toString()}`;
}

export async function adminLogin(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const supabase = await getSupabaseServerClient();

  if (!supabase) redirect("/admin/login?error=configuration");
  if (!email || !password) redirect("/admin/login?error=required");

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error || !data.user) redirect("/admin/login?error=invalid");

  if (!isAdminEmail(data.user.email)) {
    await supabase.auth.signOut();
    redirect("/admin/login?error=unauthorized");
  }

  redirect("/admin");
}

export async function adminLogout() {
  const supabase = await getSupabaseServerClient();
  await supabase?.auth.signOut();
  redirect("/admin/login");
}

export async function updateEnquiryStatus(formData: FormData) {
  await requireAdminUser();

  const enquiryId = String(formData.get("enquiryId") ?? "");
  const status = String(formData.get("status") ?? "");
  const returnTo = String(formData.get("returnTo") ?? "/admin");
  const safeReturnTo = returnTo.startsWith("/admin") ? returnTo : "/admin";

  if (!/^[0-9a-f-]{36}$/i.test(enquiryId) || !enquiryStatuses.has(status)) {
    redirect(addResultToUrl(safeReturnTo, "error", "invalid-status"));
  }

  const supabase = getSupabaseAdmin();
  if (!supabase) redirect(addResultToUrl(safeReturnTo, "error", "configuration"));

  const { error } = await supabase.from("enquiries").update({ status }).eq("id", enquiryId);
  if (error) redirect(addResultToUrl(safeReturnTo, "error", "update-failed"));

  revalidatePath("/admin");
  revalidatePath(`/admin/enquiries/${enquiryId}`);
  redirect(addResultToUrl(safeReturnTo, "updated", "1"));
}
