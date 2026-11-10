import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import DestinationDetail from "@/routes/destinations.$slug";
import { destinations } from "@/data/catalog";
import { getPublishedDestination } from "@/lib/destinations";
import { getPublishedPackages } from "@/lib/packages";
import { JsonLd } from "@/components/site/JsonLd";
import { getContentRedirect } from "@/lib/content-redirects";
import { site } from "@/config/site";
import { searchIndexingAllowed } from "@/lib/seo";

export const revalidate = 300;

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (await getContentRedirect("destination", slug)) return {};
  const d = await getPublishedDestination(slug);
  if (!d) return {};
  const title = d.seoTitle || `${d.name} Tour Packages & Travel Guide`;
  const description = d.seoDescription || d.blurb;
  const image = d.socialImage || d.image;
  return {
    title,
    description,
    alternates: { canonical: d.canonicalUrl || `/destinations/${d.slug}` },
    robots: {
      index: searchIndexingAllowed && !d.noIndex,
      follow: searchIndexingAllowed,
    },
    openGraph: {
      type: "website",
      url: `/destinations/${d.slug}`,
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      images: [{ url: image, alt: d.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${site.name}`,
      description,
      images: [image],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const redirectedSlug = await getContentRedirect("destination", slug);
  if (redirectedSlug) permanentRedirect(`/destinations/${redirectedSlug}`);
  const d = await getPublishedDestination(slug);
  if (!d) {
    notFound();
  }
  const packageItems = await getPublishedPackages();
  const url = `${site.url}/destinations/${d.slug}`;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "@id": `${url}#destination`,
            name: d.name,
            description: d.overview || d.blurb,
            image: d.image,
            url,
            touristType: d.bestFor,
            containedInPlace: {
              "@type": d.scope === "domestic" ? "Country" : "Place",
              name: d.scope === "domestic" ? "India" : d.region,
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: site.url,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Destinations",
                item: `${site.url}/destinations`,
              },
              { "@type": "ListItem", position: 3, name: d.name, item: url },
            ],
          },
        ]}
      />
      <DestinationDetail d={d} packageItems={packageItems} />
    </>
  );
}
