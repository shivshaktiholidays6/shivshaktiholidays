import type { MetadataRoute } from "next";
import { site } from "@/config/site";
import { searchIndexingAllowed } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  if (!searchIndexingAllowed) {
    return {
      rules: { userAgent: "*", disallow: "/" },
      sitemap: `${site.url}/sitemap.xml`,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
