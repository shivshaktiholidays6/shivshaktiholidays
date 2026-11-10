import type { Metadata } from "next";
import { site } from "@/config/site";

export const searchIndexingAllowed =
  process.env["SITE_ENVIRONMENT"] === "production" &&
  process.env["ALLOW_SEARCH_INDEXING"] === "true";

type PageMetadataInput = {
  title: string;
  description: string;
  path: `/${string}` | "/";
  image?: string;
  imageAlt?: string;
};

export function createPageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  imageAlt = "Shiv Shakti Holidays — personalized tours and holiday packages",
}: PageMetadataInput): Metadata {
  const socialTitle = `${title} | ${site.name}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: site.locale,
      url: path,
      siteName: site.name,
      title: socialTitle,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}
