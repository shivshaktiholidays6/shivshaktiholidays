import Link from "next/link";
import { Upload } from "lucide-react";
import { categories } from "@/data/catalog";
import { savePackage } from "@/lib/admin-actions";
import type { PackageRow } from "@/lib/packages";
import type { Json } from "@/lib/supabase/database.types";
import { PackageImageUpload } from "@/components/admin/PackageImageUpload";
import { PackageSubmitButton } from "@/components/admin/PackageSubmitButton";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15";

const defaultInclusions = [
  "Hotel accommodation on twin-sharing",
  "Daily breakfast",
  "Airport / station transfers",
  "Sightseeing as per itinerary",
  "Assistance throughout the trip",
];
const defaultExclusions = [
  "Flights / train tickets unless specified",
  "Visa fees and travel insurance",
  "Lunch, dinner and personal expenses",
  "Entry tickets not mentioned",
];

function itineraryText(value: Json | undefined) {
  if (!Array.isArray(value)) return "";
  return value
    .flatMap((item) => {
      if (!item || typeof item !== "object" || Array.isArray(item)) return [];
      const title = typeof item["title"] === "string" ? item["title"] : "";
      const text = typeof item["text"] === "string" ? item["text"] : "";
      return title && text ? [`${title} | ${text}`] : [];
    })
    .join("\n");
}

export function PackageForm({ packageItem }: { packageItem?: PackageRow | undefined }) {
  return (
    <form action={savePackage} className="grid gap-6" encType="multipart/form-data">
      {packageItem && <input type="hidden" name="id" value={packageItem.id} />}

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-950">Package basics</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">
            Package name*
            <input name="name" required maxLength={160} defaultValue={packageItem?.name} className={inputClass} />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            URL slug
            <input
              name="slug"
              maxLength={160}
              defaultValue={packageItem?.slug}
              readOnly={Boolean(packageItem)}
              placeholder="Generated from the package name"
              className={`${inputClass} read-only:bg-slate-100 read-only:text-slate-500`}
            />
            {packageItem && <span className="mt-1 block text-xs font-normal text-slate-400">The slug stays fixed after creation to preserve existing links.</span>}
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Destination slug*
            <input
              name="destinationSlug"
              required
              maxLength={160}
              defaultValue={packageItem?.destination_slug}
              placeholder="e.g. bali"
              className={inputClass}
            />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Display location*
            <input
              name="place"
              required
              maxLength={200}
              defaultValue={packageItem?.place}
              placeholder="e.g. Ubud & Seminyak, Bali"
              className={inputClass}
            />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Scope*
            <select name="scope" required defaultValue={packageItem?.scope ?? "domestic"} className={inputClass}>
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="text-sm font-semibold text-slate-700">
              Nights*
              <input
                name="nights"
                type="number"
                required
                min={1}
                max={60}
                defaultValue={packageItem?.nights ?? 4}
                className={inputClass}
              />
            </label>
            <label className="text-sm font-semibold text-slate-700">
              Starting price (₹)*
              <input
                name="price"
                type="number"
                required
                min={0}
                defaultValue={packageItem?.price ?? 0}
                className={inputClass}
              />
            </label>
          </div>
        </div>
        <label className="mt-4 block text-sm font-semibold text-slate-700">
          Summary*
          <textarea
            name="summary"
            required
            maxLength={1000}
            rows={4}
            defaultValue={packageItem?.summary}
            className={inputClass}
          />
        </label>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-950">Holiday categories</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 rounded-xl border border-slate-200 p-3 text-xs font-semibold text-slate-700">
              <input
                type="checkbox"
                name="types"
                value={category}
                defaultChecked={packageItem?.types.includes(category)}
                className="size-4 accent-amber-600"
              />
              {category}
            </label>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex items-center gap-2">
          <Upload className="size-5 text-amber-600" />
          <h2 className="text-xl font-bold text-slate-950">Package image</h2>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <PackageImageUpload editing={Boolean(packageItem)} />
          <label className="text-sm font-semibold text-slate-700">
            Or existing image URL
            <input
              name="imageUrl"
              type="text"
              defaultValue={packageItem?.image_url}
              placeholder="/local-image.webp or https://..."
              className={inputClass}
            />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Accessible image description
            <input name="imageAlt" defaultValue={packageItem?.image_alt} maxLength={240} className={inputClass} />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Image focal position
            <input
              name="imagePosition"
              defaultValue={packageItem?.image_position ?? "center"}
              placeholder="center or 50% 30%"
              maxLength={80}
              className={inputClass}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-950">Trip content</h2>
        <p className="mt-1 text-xs text-slate-500">Enter one item per line.</p>
        <div className="mt-5 grid gap-4 lg:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">
            Highlights
            <textarea name="highlights" rows={7} defaultValue={packageItem?.highlights.join("\n")} className={inputClass} />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Day-by-day itinerary
            <textarea
              name="itinerary"
              rows={7}
              defaultValue={itineraryText(packageItem?.itinerary)}
              placeholder="Arrival in Bali | Airport pickup and hotel check-in."
              className={inputClass}
            />
            <span className="mt-1 block text-xs font-normal text-slate-400">Format: Day title | Day description</span>
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Inclusions
            <textarea
              name="inclusions"
              rows={7}
              defaultValue={(packageItem?.inclusions.length ? packageItem.inclusions : defaultInclusions).join("\n")}
              className={inputClass}
            />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            Exclusions
            <textarea
              name="exclusions"
              rows={7}
              defaultValue={(packageItem?.exclusions.length ? packageItem.exclusions : defaultExclusions).join("\n")}
              className={inputClass}
            />
          </label>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="text-xl font-bold text-slate-950">Publishing and SEO</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          {[
            ["published", "Published", packageItem?.published],
            ["featured", "Featured package", packageItem?.featured],
            ["mostBooked", "Most booked", packageItem?.most_booked],
          ].map(([name, label, checked]) => (
            <label key={String(name)} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm font-semibold text-slate-700">
              <input type="checkbox" name={String(name)} defaultChecked={Boolean(checked)} className="size-4 accent-amber-600" />
              {String(label)}
            </label>
          ))}
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-semibold text-slate-700">
            Display order
            <input name="sortOrder" type="number" defaultValue={packageItem?.sort_order ?? 0} className={inputClass} />
          </label>
          <div />
          <label className="text-sm font-semibold text-slate-700">
            SEO title
            <input name="seoTitle" maxLength={160} defaultValue={packageItem?.seo_title ?? ""} className={inputClass} />
          </label>
          <label className="text-sm font-semibold text-slate-700">
            SEO description
            <textarea name="seoDescription" maxLength={320} rows={3} defaultValue={packageItem?.seo_description ?? ""} className={inputClass} />
          </label>
        </div>
      </section>

      <div className="sticky bottom-3 z-10 flex items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">
        <Link href="/admin/packages" className="rounded-xl px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-100">
          Cancel
        </Link>
        <PackageSubmitButton />
      </div>
    </form>
  );
}
