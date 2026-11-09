import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PromotionForm } from "@/components/admin/PromotionForm";
import { requireAdminUser } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = { title: "Edit Offer | Admin", robots: { index: false } };
export default async function EditPromotionPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string; saved?: string }> }) {
  await requireAdminUser(); const { id } = await params; const notices = await searchParams;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound(); const supabase = getSupabaseAdmin(); if (!supabase) notFound();
  const { data: promotion, error } = await supabase.from("promotions").select("*").eq("id", id).single(); if (error || !promotion) notFound();
  return <div className="p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-5xl"><Link href="/admin/promotions" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft className="size-4" /> Back to offers</Link><h1 className="mt-5 text-3xl font-bold text-slate-950 sm:text-4xl">Edit {promotion.title}</h1><p className="mt-2 text-sm text-slate-500">Update the campaign, schedule and visibility.</p>{notices.saved === "1" && <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Offer saved successfully.</p>}{notices.error && <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{notices.error === "image" ? "Use an image of at least 900 × 550 px and no larger than 5 MB." : "The offer could not be saved. Check its dates and button link."}</p>}<div className="mt-7"><PromotionForm promotion={promotion} /></div></div></div>;
}
