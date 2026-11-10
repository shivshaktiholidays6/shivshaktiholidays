import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PackageDetail from "@/routes/packages.$slug";
import { packages } from "@/data/catalog";
import { getPublishedPackage } from "@/lib/packages";
import { JsonLd } from "@/components/site/JsonLd";

export const revalidate = 300;

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPublishedPackage(slug);
  if (!p) return {};
  return {
    title: p.seoTitle || p.name,
    description: p.seoDescription || p.summary,
    alternates: { canonical: `/packages/${p.slug}` },
    openGraph: {
      type: "website",
      url: `/packages/${p.slug}`,
      title: p.seoTitle || p.name,
      description: p.seoDescription || p.summary,
      images: [{ url: p.image, alt: p.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: p.seoTitle || p.name,
      description: p.seoDescription || p.summary,
      images: [p.image],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPublishedPackage(slug);
  if (!p) notFound();
  const url = `https://shivshaktiholidays.com/packages/${p.slug}`;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "TouristTrip",
            "@id": `${url}#trip`,
            name: p.name,
            description: p.summary,
            image: p.image,
            url,
            touristType: p.types,
            itinerary: p.place,
            provider: { "@id": "https://shivshaktiholidays.com/#business" },
            offers: {
              "@type": "Offer",
              url,
              price: p.price,
              priceCurrency: "INR",
              availability: "https://schema.org/InStock",
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
                name: "Holiday Packages",
                item: "https://shivshaktiholidays.com/packages",
              },
              { "@type": "ListItem", position: 3, name: p.name, item: url },
            ],
          },
        ]}
      />
      <PackageDetail p={p} />
    </>
  );
}
