import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DestinationForm } from "@/components/admin/DestinationForm";
import { requireAdminUser } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Add Destination | Admin", robots: { index: false } };

export default async function NewDestinationPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  await requireAdminUser();
  const { error } = await searchParams;
  return (
    <div className="p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-5xl">
      <Link href="/admin/destinations" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft className="size-4" /> Back to destinations</Link>
      <h1 className="mt-5 text-3xl font-bold text-slate-950 sm:text-4xl">Add Travel Destination</h1>
      <p className="mt-2 text-sm text-slate-500">Save as a draft first, review the page, then publish when ready.</p>
      {error && <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error === "image" ? "Upload a landscape image of at least 1600 × 900 px (maximum 5 MB), or enter a valid image URL." : "Please check the required fields and try again."}</p>}
      <div className="mt-7"><DestinationForm /></div>
    </div></div>
  );
}
