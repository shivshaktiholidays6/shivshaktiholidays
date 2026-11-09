import Link from "next/link";
import { Upload } from "lucide-react";
import { saveDestination } from "@/lib/admin-actions";
import type { DestinationRow } from "@/lib/destinations";
import { DestinationImageUpload } from "@/components/admin/DestinationImageUpload";
import { DestinationSubmitButton } from "@/components/admin/DestinationSubmitButton";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15";

export function DestinationForm({ destination }: { destination?: DestinationRow | undefined }) {
  return (
    <form action={saveDestination} className="grid gap-6" encType="multipart/form-data">
      {destination && <input type="hidden" name="id" value={destination.id} />}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-950">Destination basics</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">
            Destination name*
            <input name="name" required maxLength={160} defaultValue={destination?.name} className={inputClass} />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            URL slug
            <input
              name="slug"
              maxLength={160}
              defaultValue={destination?.slug}
              readOnly={Boolean(destination)}
              placeholder="Generated from the destination name"
              className={`${inputClass} read-only:bg-slate-100 read-only:text-slate-500`}
            />
            {destination && <span className="mt-1 block text-xs font-normal text-slate-400">The slug stays fixed after creation to protect existing links.</span>}
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Scope*
            <select name="scope" required defaultValue={destination?.scope ?? "domestic"} className={inputClass}>
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Region*
            <input
              name="region"
              required
              maxLength={120}
              defaultValue={destination?.region}
              placeholder="e.g. South India or Europe"
              className={inputClass}
            />
          </label>
        </div>
        <label className="mt-4 block text-sm font-semibold text-slate-700">
          Short description*
          <textarea name="blurb" required maxLength={600} rows={4} defaultValue={destination?.blurb} className={inputClass} />
          <span className="mt-1 block text-xs font-normal text-slate-400">Used on destination cards, search results and the page hero.</span>
        </label>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2">
          <Upload className="size-5 text-amber-600" />
          <h2 className="text-xl font-bold text-slate-950">Destination image</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <DestinationImageUpload editing={Boolean(destination)} />
          <label className="text-sm font-semibold text-slate-700">
            Or existing image URL
            <input name="imageUrl" type="text" defaultValue={destination?.image_url} placeholder="/local-image.webp or Supabase image URL" className={inputClass} />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Accessible image description
            <input name="imageAlt" maxLength={240} defaultValue={destination?.image_alt} className={inputClass} />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Image focal position
            <input name="imagePosition" maxLength={80} defaultValue={destination?.image_position ?? "center"} placeholder="center or 50% 30%" className={inputClass} />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-950">Destination page content</h2>
        <label className="mt-5 block text-sm font-semibold text-slate-700">
          Overview
          <textarea name="overview" maxLength={2000} rows={6} defaultValue={destination?.overview ?? ""} className={inputClass} />
        </label>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <label className="text-sm font-semibold text-slate-700">
            Ideal duration
            <input name="idealDuration" maxLength={100} defaultValue={destination?.ideal_duration ?? ""} placeholder="e.g. 5–8 days" className={inputClass} />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Best for
            <input name="bestFor" maxLength={160} defaultValue={destination?.best_for ?? ""} placeholder="Couples, families, friends" className={inputClass} />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Planning label
            <input name="planningLabel" maxLength={120} defaultValue={destination?.planning_label ?? ""} placeholder="Fully customizable" className={inputClass} />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-950">Publishing and SEO</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700">
            <input type="checkbox" name="published" defaultChecked={destination?.published} className="size-4 accent-amber-600" /> Published
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700">
            <input type="checkbox" name="featured" defaultChecked={destination?.featured} className="size-4 accent-amber-600" /> Feature on homepage
          </label>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">
            Display order
            <input name="sortOrder" type="number" defaultValue={destination?.sort_order ?? 0} className={inputClass} />
          </label>
          <div />
          <label className="text-sm font-semibold text-slate-700">
            SEO title
            <input name="seoTitle" maxLength={160} defaultValue={destination?.seo_title ?? ""} className={inputClass} />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            SEO description
            <textarea name="seoDescription" maxLength={320} rows={3} defaultValue={destination?.seo_description ?? ""} className={inputClass} />
          </label>
        </div>
      </section>

      <div className="sticky bottom-3 z-10 flex items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
        <Link href="/admin/destinations" className="rounded-xl px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100">Cancel</Link>
        <DestinationSubmitButton />
      </div>
    </form>
  );
}
