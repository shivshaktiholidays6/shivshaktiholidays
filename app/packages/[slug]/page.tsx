import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import PackageDetail from "@/routes/packages.$slug";
import { packages } from "@/data/catalog";
import { getPublishedPackage } from "@/lib/packages";
import { JsonLd } from "@/components/site/JsonLd";
import { getContentRedirect } from "@/lib/content-redirects";
import { site } from "@/config/site";
import { searchIndexingAllowed } from "@/lib/seo";

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
  if (await getContentRedirect("package", slug)) return {};
  const p = await getPublishedPackage(slug);
  if (!p) return {};
  const title = p.seoTitle || `${p.name} Tour Package`;
  const description =
    p.seoDescription ||
    `Explore the ${p.name} from ${site.name}. View the itinerary, inclusions, travel details and enquiry options.`;
  const image = p.socialImage || p.image;
  return {
    title,
    description,
    alternates: { canonical: p.canonicalUrl || `/packages/${p.slug}` },
    robots: {
      index: searchIndexingAllowed && !p.noIndex,
      follow: searchIndexingAllowed,
    },
    openGraph: {
      type: "website",
      url: `/packages/${p.slug}`,
      siteName: site.name,
      title: `${title} | ${site.name}`,
      description,
      images: [{ url: image, alt: p.imageAlt }],
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
  const redirectedSlug = await getContentRedirect("package", slug);
  if (redirectedSlug) permanentRedirect(`/packages/${redirectedSlug}`);
  const p = await getPublishedPackage(slug);
  if (!p) {
    notFound();
  }
  const url = `${site.url}/packages/${p.slug}`;

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
            provider: { "@id": `${site.url}/#business` },
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
                item: site.url,
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Holiday Packages",
                item: `${site.url}/packages`,
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
