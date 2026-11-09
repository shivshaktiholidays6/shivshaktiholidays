import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { DestinationForm } from "@/components/admin/DestinationForm";
import { requireAdminUser } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = { title: "Edit Destination | Admin", robots: { index: false } };

export default async function EditDestinationPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ error?: string; saved?: string }> }) {
  await requireAdminUser();
  const { id } = await params;
  const notices = await searchParams;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const supabase = getSupabaseAdmin();
  if (!supabase) notFound();
  const { data: destination, error } = await supabase.from("destinations").select("*").eq("id", id).single();
  if (error || !destination) notFound();
  return (
    <div className="p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-5xl">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link href="/admin/destinations" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft className="size-4" /> Back to destinations</Link>
        {destination.published && <Link href={`/destinations/${destination.slug}`} target="_blank" className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700">View public page <ExternalLink className="size-4" /></Link>}
      </div>
      <h1 className="mt-5 text-3xl font-bold text-slate-950 sm:text-4xl">Edit {destination.name}</h1>
      <p className="mt-2 text-sm text-slate-500">Update destination content, imagery, publishing and SEO.</p>
      {notices.saved === "1" && <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Destination saved successfully.</p>}
      {notices.error && <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{notices.error === "image" ? "Upload a landscape image of at least 1600 × 900 px (maximum 5 MB), or keep the existing image URL." : "The destination could not be saved. Check the fields and slug."}</p>}
      <div className="mt-7"><DestinationForm destination={destination} /></div>
    </div></div>
  );
}
