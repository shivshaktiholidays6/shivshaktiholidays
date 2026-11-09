import type { Metadata } from "next";
import Link from "next/link";
import { Edit3, Eye, EyeOff, Plus, Search } from "lucide-react";
import { DeletePromotionButton } from "@/components/admin/DeletePromotionButton";
import { setPromotionActive } from "@/lib/admin-actions";
import { requireAdminUser } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = { title: "Offers & Banners | Admin", robots: { index: false, follow: false } };

function first(value: string | string[] | undefined) { return Array.isArray(value) ? value[0] ?? "" : value ?? ""; }
function scheduleLabel(startsAt: string | null, endsAt: string | null) {
  const format = (value: string) => new Intl.DateTimeFormat("en-IN", { dateStyle: "medium" }).format(new Date(value));
  if (startsAt && endsAt) return `${format(startsAt)} – ${format(endsAt)}`;
  if (startsAt) return `From ${format(startsAt)}`;
  if (endsAt) return `Until ${format(endsAt)}`;
  return "No expiry";
}

export default async function AdminPromotionsPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  await requireAdminUser();
  const params = await searchParams;
  const query = first(params["q"]).trim().toLowerCase();
  const stateFilter = first(params["state"]) || "all";
  const supabase = getSupabaseAdmin();
  if (!supabase) return <div className="p-8 text-red-700">Supabase is not configured.</div>;
  const { data, error } = await supabase.from("promotions").select("*").order("sort_order").order("updated_at", { ascending: false });
  if (error) return <div className="p-5 sm:p-8"><div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900"><h1 className="text-xl font-bold">Promotion database setup required</h1><p className="mt-2 text-sm">Run <code>202611090004_create_promotions.sql</code> in the Supabase SQL Editor, then refresh this page.</p></div></div>;
  const items = (data ?? []).filter((item) => {
    if (stateFilter === "active" && !item.active) return false;
    if (stateFilter === "inactive" && item.active) return false;
    return !query || `${item.title} ${item.message} ${item.coupon_code ?? ""}`.toLowerCase().includes(query);
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8"><div className="mx-auto max-w-[1400px]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Marketing</p><h1 className="mt-1 text-3xl font-bold text-slate-950 sm:text-4xl">Offers & Banners</h1><p className="mt-2 text-sm text-slate-500">Schedule reusable promotional announcements across the website.</p></div><Link href="/admin/promotions/new" className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-800"><Plus className="size-4" /> Add offer</Link></header>
      {first(params["updated"]) === "1" && <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Offer visibility updated.</p>}
      {first(params["deleted"]) === "1" && <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">Offer deleted successfully.</p>}
      {first(params["error"]) && <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">The offer action could not be completed.</p>}
      <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-4 sm:p-5"><form className="grid gap-3 sm:grid-cols-[1fr_190px_auto]"><label className="relative"><Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" /><input name="q" defaultValue={first(params["q"])} placeholder="Search offers..." className="h-11 w-full rounded-xl border border-slate-200 pl-10 pr-3 text-sm outline-none focus:border-amber-500" /></label><select name="state" defaultValue={stateFilter} className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm"><option value="all">Active and inactive</option><option value="active">Active only</option><option value="inactive">Inactive only</option></select><button className="h-11 rounded-xl bg-slate-950 px-5 text-xs font-bold uppercase tracking-wider text-white">Apply</button></form></div>
        {items.length === 0 ? <div className="grid min-h-64 place-items-center p-8 text-center"><div><p className="font-semibold text-slate-700">No promotional banners yet</p><p className="mt-1 text-sm text-slate-500">Create a Diwali, seasonal or limited-time offer.</p><Link href="/admin/promotions/new" className="mt-4 inline-flex text-sm font-bold text-amber-700">Create your first offer →</Link></div></div> : (
          <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-slate-50 text-[0.68rem] uppercase tracking-wider text-slate-500"><tr><th className="px-5 py-3">Offer</th><th className="px-5 py-3">Placement</th><th className="px-5 py-3">Schedule</th><th className="px-5 py-3">Status</th><th className="px-5 py-3 text-right">Actions</th></tr></thead><tbody className="divide-y divide-slate-100">{items.map((item) => <tr key={item.id} className="hover:bg-slate-50/80"><td className="px-5 py-4"><p className="font-bold text-slate-900">{item.title}</p><p className="mt-1 max-w-md truncate text-xs text-slate-500">{item.offer_text || item.message}</p>{item.coupon_code && <span className="mt-2 inline-flex rounded-md bg-amber-50 px-2 py-1 font-mono text-[0.68rem] font-bold text-amber-800">{item.coupon_code}</span>}</td><td className="px-5 py-4 capitalize text-slate-600">{item.placement === "sitewide" ? "Entire website" : "Homepage"}</td><td className="px-5 py-4 text-xs text-slate-600">{scheduleLabel(item.starts_at, item.ends_at)}</td><td className="px-5 py-4"><span className={`rounded-full px-2.5 py-1 text-xs font-bold ${item.active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>{item.active ? "Active" : "Inactive"}</span></td><td className="px-5 py-4"><div className="flex justify-end gap-2"><Link href={`/admin/promotions/${item.id}/edit`} className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:border-amber-500 hover:text-amber-700" aria-label={`Edit ${item.title}`}><Edit3 className="size-4" /></Link><form action={setPromotionActive}><input type="hidden" name="id" value={item.id} /><input type="hidden" name="active" value={item.active ? "false" : "true"} /><button className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:border-amber-500 hover:text-amber-700" aria-label={item.active ? `Deactivate ${item.title}` : `Activate ${item.title}`}>{item.active ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</button></form><DeletePromotionButton id={item.id} title={item.title} /></div></td></tr>)}</tbody></table></div>
        )}
      </section>
    </div></div>
  );
}
