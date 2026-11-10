import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationDetail from "@/routes/destinations.$slug";
import { destinations } from "@/data/catalog";
import { getPublishedDestination } from "@/lib/destinations";
import { getPublishedPackages } from "@/lib/packages";
import { JsonLd } from "@/components/site/JsonLd";

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
  const d = await getPublishedDestination(slug);
  if (!d) return {};
  return {
    title: d.seoTitle || `${d.name} Holidays`,
    description: d.seoDescription || d.blurb,
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: {
      type: "website",
      url: `/destinations/${d.slug}`,
      title: d.seoTitle || `${d.name} Holidays`,
      description: d.seoDescription || d.blurb,
      images: [{ url: d.image, alt: d.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: d.seoTitle || `${d.name} Holidays`,
      description: d.seoDescription || d.blurb,
      images: [d.image],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = await getPublishedDestination(slug);
  if (!d) notFound();
  const packageItems = await getPublishedPackages();
  const url = `https://shivshaktiholidays.com/destinations/${d.slug}`;

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
                item: "https://shivshaktiholidays.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Destinations",
                item: "https://shivshaktiholidays.com/destinations",
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
