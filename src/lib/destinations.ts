import "server-only";

import {
  destinations as catalogueDestinations,
  type Destination,
  type Scope,
} from "@/data/catalog";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { Database } from "@/lib/supabase/database.types";
import { getRedirectedContentSlugs } from "@/lib/content-redirects";

export type DestinationRow = Database["public"]["Tables"]["destinations"]["Row"];

export function destinationRowToDestination(row: DestinationRow): Destination {
  return {
    slug: row.slug,
    name: row.name,
    region: row.region,
    scope: row.scope as Scope,
    image: row.image_url,
    imageAlt: row.image_alt,
    imagePosition: row.image_position,
    blurb: row.blurb,
    overview: row.overview ?? undefined,
    idealDuration: row.ideal_duration ?? undefined,
    bestFor: row.best_for ?? undefined,
    planningLabel: row.planning_label ?? undefined,
    featured: row.featured,
    seoTitle: row.seo_title ?? undefined,
    seoDescription: row.seo_description ?? undefined,
    socialImage: row.social_image_url ?? undefined,
    noIndex: row.noindex,
    canonicalUrl: row.canonical_url ?? undefined,
    updatedAt: row.updated_at,
  };
}

export async function getPublishedDestinations(): Promise<Destination[]> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return catalogueDestinations;

  const [{ data, error }, redirectedSlugs] = await Promise.all([
    supabase
      .from("destinations")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false }),
    getRedirectedContentSlugs("destination"),
  ]);

  if (error || !data?.length) return catalogueDestinations;
  const managedSlugs = new Set(data.map((row) => row.slug));
  const managedDestinations = data.filter((row) => row.published).map(destinationRowToDestination);
  const remainingCatalogue = catalogueDestinations.filter(
    (item) => !managedSlugs.has(item.slug) && !redirectedSlugs.has(item.slug),
  );
  return [...managedDestinations, ...remainingCatalogue];
}

export async function getPublishedDestination(slug: string): Promise<Destination | null> {
  const supabase = getSupabaseAdmin();
  if (!supabase) return catalogueDestinations.find((item) => item.slug === slug) ?? null;

  const { data, error } = await supabase
    .from("destinations")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error) return catalogueDestinations.find((item) => item.slug === slug) ?? null;
  if (data) return data.published ? destinationRowToDestination(data) : null;
  return catalogueDestinations.find((item) => item.slug === slug) ?? null;
}
