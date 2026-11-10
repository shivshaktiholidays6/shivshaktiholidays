import type { MetadataRoute } from "next";
import { getPublishedDestinations } from "@/lib/destinations";
import { getPublishedPackages } from "@/lib/packages";
import { site } from "@/config/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [packages, destinations] = await Promise.all([
    getPublishedPackages(),
    getPublishedDestinations(),
  ]);
  const base = site.url;
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
    ...staticPages.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/packages" || path === "/destinations" ? 0.9 : 0.7,
    })),
    ...destinations
      .filter((d) => !d.noIndex)
      .map((d) => ({
        url: `${base}/destinations/${d.slug}`,
        ...(d.updatedAt ? { lastModified: new Date(d.updatedAt) } : {}),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    ...packages
      .filter((p) => !p.noIndex)
      .map((p) => ({
        url: `${base}/packages/${p.slug}`,
        ...(p.updatedAt ? { lastModified: new Date(p.updatedAt) } : {}),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
  ];
}
