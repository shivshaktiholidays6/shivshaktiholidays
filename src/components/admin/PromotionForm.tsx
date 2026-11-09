import Link from "next/link";
import { CalendarClock, Megaphone, Palette } from "lucide-react";
import { savePromotion } from "@/lib/admin-actions";
import type { Promotion } from "@/lib/promotions";
import { PromotionSubmitButton } from "@/components/admin/PromotionSubmitButton";
import { PromotionImageUpload } from "@/components/admin/PromotionImageUpload";

const inputClass = "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15";

function localDateTime(value: string | null | undefined) {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

export function PromotionForm({ promotion }: { promotion?: Promotion | undefined }) {
  return (
    <form action={savePromotion} className="grid gap-6" encType="multipart/form-data">
      {promotion && <input type="hidden" name="id" value={promotion.id} />}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2"><Megaphone className="size-5 text-amber-600" /><h2 className="text-xl font-bold text-slate-950">Offer content</h2></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">Headline*<input name="title" required maxLength={120} defaultValue={promotion?.title ?? "Diwali Special Offer"} className={inputClass} /></label>
          <label className="text-sm font-semibold text-slate-700">Offer badge<input name="offerText" maxLength={120} defaultValue={promotion?.offer_text ?? "Up to 20% off selected tours"} className={inputClass} /></label>
        </div>
        <label className="mt-4 block text-sm font-semibold text-slate-700">Short message*<input name="message" required maxLength={300} defaultValue={promotion?.message ?? "Celebrate the festival of lights with an unforgettable holiday."} className={inputClass} /></label>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <label className="text-sm font-semibold text-slate-700">Coupon code<input name="couponCode" maxLength={50} defaultValue={promotion?.coupon_code ?? "DIWALI20"} className={inputClass} /></label>
          <label className="text-sm font-semibold text-slate-700">Button label<input name="ctaLabel" maxLength={60} defaultValue={promotion?.cta_label ?? "Explore offers"} className={inputClass} /></label>
          <label className="text-sm font-semibold text-slate-700">Button link<input name="ctaHref" maxLength={500} defaultValue={promotion?.cta_href ?? "/packages"} placeholder="/packages" className={inputClass} /></label>
        </div>
        <label className="mt-4 block text-sm font-semibold text-slate-700">Terms note<textarea name="termsText" maxLength={300} rows={3} defaultValue={promotion?.terms_text ?? "Offer applies to selected packages and travel dates. Terms apply."} className={inputClass} /></label>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2"><Palette className="size-5 text-amber-600" /><h2 className="text-xl font-bold text-slate-950">Appearance and placement</h2></div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <label className="text-sm font-semibold text-slate-700">Theme<select name="theme" defaultValue={promotion?.theme ?? "diwali"} className={inputClass}><option value="diwali">Diwali festive</option><option value="gold">Golden offer</option><option value="navy">Luxury navy</option></select></label>
          <label className="text-sm font-semibold text-slate-700">Display on<select name="placement" defaultValue={promotion?.placement ?? "sitewide"} className={inputClass}><option value="sitewide">Entire website</option><option value="homepage">Homepage only</option></select></label>
          <label className="text-sm font-semibold text-slate-700">Priority order<input name="sortOrder" type="number" defaultValue={promotion?.sort_order ?? 0} className={inputClass} /></label>
        </div>
        <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
          <PromotionImageUpload />
          <label className="text-sm font-semibold text-slate-700">Or existing image URL<input name="imageUrl" maxLength={1000} defaultValue={promotion?.image_url ?? "/generated/diwali-offer-card.png"} className={inputClass} /></label>
          <label className="text-sm font-semibold text-slate-700">Image description<input name="imageAlt" maxLength={240} defaultValue={promotion?.image_alt ?? "Elegant Diwali lamps, marigold flowers and luxury travel decorations"} className={inputClass} /></label>
          <label className="text-sm font-semibold text-slate-700">Image focal position<input name="imagePosition" maxLength={80} defaultValue={promotion?.image_position ?? "center"} placeholder="center or 70% 50%" className={inputClass} /></label>
        </div>
        {promotion?.image_url && <label className="mt-4 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/50 p-3 text-sm font-semibold text-red-700"><input type="checkbox" name="removeImage" className="size-4 accent-red-600" /> Remove image and use the slim banner</label>}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2"><CalendarClock className="size-5 text-amber-600" /><h2 className="text-xl font-bold text-slate-950">Schedule and visibility</h2></div>
        <p className="mt-1 text-xs text-slate-500">Leave dates empty to run the offer without a schedule.</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">Starts at<input name="startsAt" type="datetime-local" defaultValue={localDateTime(promotion?.starts_at)} className={inputClass} /></label>
          <label className="text-sm font-semibold text-slate-700">Ends at<input name="endsAt" type="datetime-local" defaultValue={localDateTime(promotion?.ends_at)} className={inputClass} /></label>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700"><input type="checkbox" name="active" defaultChecked={promotion?.active} className="size-4 accent-amber-600" /> Active</label>
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700"><input type="checkbox" name="dismissible" defaultChecked={promotion?.dismissible ?? true} className="size-4 accent-amber-600" /> Visitors can dismiss it</label>
        </div>
      </section>

      <div className="sticky bottom-3 z-10 flex items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
        <Link href="/admin/promotions" className="rounded-xl px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</Link>
        <PromotionSubmitButton />
      </div>
    </form>
  );
}
