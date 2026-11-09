import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PromotionForm } from "@/components/admin/PromotionForm";
import { requireAdminUser } from "@/lib/admin-auth";

export const metadata: Metadata = { title: "Add Offer | Admin", robots: { index: false } };
export default async function NewPromotionPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  await requireAdminUser(); const notices = await searchParams;
  return <div className="p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-5xl"><Link href="/admin/promotions" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-900"><ArrowLeft className="size-4" /> Back to offers</Link><h1 className="mt-5 text-3xl font-bold text-slate-950 sm:text-4xl">Create Promotional Banner</h1><p className="mt-2 text-sm text-slate-500">The form is pre-filled with a Diwali campaign. Adjust the details and activate it when ready.</p>{notices.error && <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{notices.error === "image" ? "Use an image of at least 900 × 550 px and no larger than 5 MB." : "Please check the required fields, dates and button link."}</p>}<div className="mt-7"><PromotionForm /></div></div></div>;
}
