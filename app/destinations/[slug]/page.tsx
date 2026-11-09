import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationDetail from "@/routes/destinations.$slug";
import { destinations } from "@/data/catalog";
import { getPublishedDestination } from "@/lib/destinations";
import { getPublishedPackages } from "@/lib/packages";

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
    openGraph: { images: [d.image] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = await getPublishedDestination(slug);
  if (!d) notFound();
  const packageItems = await getPublishedPackages();
  return <DestinationDetail d={d} packageItems={packageItems} />;
}
