import type { MetadataRoute } from "next";
import { getPublishedDestinations } from "@/lib/destinations";
import { getPublishedPackages } from "@/lib/packages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [packages, destinations] = await Promise.all([
    getPublishedPackages(),
    getPublishedDestinations(),
  ]);
  const base = "https://shivshaktiholidays.com";
  const staticPages = [
    "",
    "/about",
    "/contact",
    "/destinations",
    "/packages",
    "/international",
    "/domestic",
    "/honeymoon",
    "/plan-trip",
    "/privacy",
  ];
  return [
    ...staticPages.map((path) => ({ url: `${base}${path}`, changeFrequency: "monthly" as const })),
    ...destinations.map((d) => ({
      url: `${base}/destinations/${d.slug}`,
      changeFrequency: "monthly" as const,
    })),
    ...packages.map((p) => ({
      url: `${base}/packages/${p.slug}`,
      changeFrequency: "weekly" as const,
    })),
  ];
}
