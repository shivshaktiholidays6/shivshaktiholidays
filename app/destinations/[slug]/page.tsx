import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationDetail from "@/routes/destinations.$slug";
import { destinations } from "@/data/catalog";

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = destinations.find((item) => item.slug === slug);
  if (!d) return {};
  return {
    title: `${d.name} Holidays`,
    description: d.blurb,
    alternates: { canonical: `/destinations/${d.slug}` },
    openGraph: { images: [d.image] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const d = destinations.find((item) => item.slug === slug);
  if (!d) notFound();
  return <DestinationDetail d={d} />;
}
