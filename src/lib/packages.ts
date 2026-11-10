import "server-only";

import { packages as cataloguePackages, type Pkg, type Scope } from "@/data/catalog";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { Database, Json } from "@/lib/supabase/database.types";
import { getRedirectedContentSlugs } from "@/lib/content-redirects";

export type PackageRow = Database["public"]["Tables"]["packages"]["Row"];

function itineraryItems(value: Json): Array<{ title: string; text: string }> {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object" || Array.isArray(item)) return [];
    const title = typeof item["title"] === "string" ? item["title"].trim() : "";
    const text = typeof item["text"] === "string" ? item["text"].trim() : "";
    return title && text ? [{ title, text }] : [];
  });
}

export function packageRowToPkg(row: PackageRow): Pkg {
  return {
    slug: row.slug,
    name: row.name,
    destination: row.destination_slug,
    place: row.place,
    scope: row.scope as Scope,
    nights: row.nights,
    price: row.price,
    types: row.types,
    image: row.image_url,
    imageAlt: row.image_alt,
    imagePosition: row.image_position,
    summary: row.summary,
    highlights: row.highlights,
    mostBooked: row.most_booked,
    itineraryItems: itineraryItems(row.itinerary),
    inclusions: row.inclusions,
    exclusions: row.exclusions,
    featured: row.featured,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
    socialImage: row.social_image_url ?? undefined,
    noIndex: row.noindex,
    canonicalUrl: row.canonical_url ?? undefined,
    updatedAt: row.updated_at,
  };
}

export async function getPublishedPackages(): Promise<Pkg[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return cataloguePackages;

  const [{ data, error }, redirectedSlugs] = await Promise.all([
    supabase
      .from("packages")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),
    getRedirectedContentSlugs("package"),
  ]);

  if (error || !data?.length) return cataloguePackages;
  const managedSlugs = new Set(data.map((row) => row.slug));
  const managedPackages = data.filter((row) => row.published).map(packageRowToPkg);
  const remainingCatalogue = cataloguePackages.filter(
    (item) => !managedSlugs.has(item.slug) && !redirectedSlugs.has(item.slug),
  );
  return [...managedPackages, ...remainingCatalogue];
}

export async function getPublishedPackage(slug: string): Promise<Pkg | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return cataloguePackages.find((item) => item.slug === slug) ?? null;

  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) return cataloguePackages.find((item) => item.slug === slug) ?? null;
  if (data) return data.published ? packageRowToPkg(data) : null;
  return cataloguePackages.find((item) => item.slug === slug) ?? null;
}
