"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15";

type SeoEditorProps = {
  contentType: "package" | "destination";
  defaultName: string;
  defaultDescription: string;
  defaultSlug: string;
  seoTitle?: string | null | undefined;
  seoDescription?: string | null | undefined;
  socialImageUrl?: string | null | undefined;
  canonicalUrl?: string | null | undefined;
  noindex?: boolean | undefined;
};

export function SeoEditor({
  contentType,
  defaultName,
  defaultDescription,
  defaultSlug,
  seoTitle,
  seoDescription,
  socialImageUrl,
  canonicalUrl,
  noindex,
}: SeoEditorProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState({
    name: defaultName,
    slug: defaultSlug,
    title: seoTitle ?? "",
    description: seoDescription ?? "",
    canonical: canonicalUrl ?? "",
  });

  useEffect(() => {
    const form = rootRef.current?.closest("form");
    if (!form) return;

    function updatePreview() {
      const field = (name: string) =>
        (form?.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value ??
        "";
      setPreview({
        name: field("name"),
        slug: field("slug"),
        title: field("seoTitle"),
        description: field("seoDescription"),
        canonical: field("canonicalUrl"),
      });
    }

    updatePreview();
    form.addEventListener("input", updatePreview);
    return () => form.removeEventListener("input", updatePreview);
  }, []);

  const fallbackTitle = preview.name
    ? contentType === "package"
      ? `${preview.name} Tour Package`
      : `${preview.name} Tour Packages & Travel Guide`
    : contentType === "package"
      ? "Tour package title"
      : "Destination travel guide";
  const title = preview.title || fallbackTitle;
  const description = preview.description || defaultDescription || "Add a useful page description.";
  const section = contentType === "package" ? "packages" : "destinations";
  const displayUrl = preview.canonical || `${site.url}/${section}/${preview.slug || "url-slug"}`;

  return (
    <div ref={rootRef} className="mt-4 grid gap-4 sm:grid-cols-2">
      <label className="text-sm font-semibold text-slate-700">
        SEO title
        <input
          name="seoTitle"
          maxLength={160}
          defaultValue={seoTitle ?? ""}
          placeholder={fallbackTitle}
          className={inputClass}
        />
        <span className="mt-1 block text-xs font-normal text-slate-400">
          Optional override. Keep it clear and unique; the company name is added automatically.
          Length guidance is not a ranking rule.
        </span>
      </label>
      <label className="text-sm font-semibold text-slate-700">
        SEO description
        <textarea
          name="seoDescription"
          maxLength={320}
          rows={3}
          defaultValue={seoDescription ?? ""}
          placeholder={defaultDescription}
          className={inputClass}
        />
      </label>
      <label className="text-sm font-semibold text-slate-700">
        Social sharing image URL
        <input
          name="socialImageUrl"
          type="text"
          maxLength={1000}
          defaultValue={socialImageUrl ?? ""}
          placeholder="Leave blank to use the main image"
          className={inputClass}
        />
      </label>
      <label className="text-sm font-semibold text-slate-700">
        Canonical URL override
        <input
          name="canonicalUrl"
          type="url"
          maxLength={1000}
          defaultValue={canonicalUrl ?? ""}
          placeholder="Leave blank for the automatic canonical"
          className={inputClass}
        />
        <span className="mt-1 block text-xs font-normal text-slate-400">
          Only URLs on {site.url.replace("https://", "")} are accepted.
        </span>
      </label>
      <label className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 sm:col-span-2">
        <input
          type="checkbox"
          name="noindex"
          defaultChecked={noindex}
          className="mt-0.5 size-4 accent-amber-600"
        />
        <span>
          <strong className="block">Keep this public page out of search results</strong>
          <span className="mt-1 block text-xs font-normal text-amber-800">
            Adds noindex and excludes the page from the sitemap. Use for thin or temporary content,
            not for ordinary drafts.
          </span>
        </span>
      </label>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:col-span-2">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">
          Search preview
        </p>
        <p className="mt-3 truncate text-xs text-emerald-700">{displayUrl}</p>
        <p className="mt-1 text-lg font-medium leading-snug text-blue-700">
          {title} — {site.name}
        </p>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-slate-600">{description}</p>
      </div>
    </div>
  );
}
