import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PackageDetail from "@/routes/packages.$slug";
import { packages } from "@/data/catalog";
import { getPublishedPackage } from "@/lib/packages";

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
    openGraph: { images: [p.image] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await getPublishedPackage(slug);
  if (!p) notFound();
  return <PackageDetail p={p} />;
}
