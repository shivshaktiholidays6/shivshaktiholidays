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
    ...staticPages.map((path) => ({
      url: `${base}${path}`,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path === "/packages" || path === "/destinations" ? 0.9 : 0.7,
    })),
    ...destinations.map((d) => ({
      url: `${base}/destinations/${d.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...packages.map((p) => ({
      url: `${base}/packages/${p.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
