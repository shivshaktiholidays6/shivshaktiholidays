import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PackageDetail from "@/routes/packages.$slug";
import { packages } from "@/data/catalog";

export function generateStaticParams() {
  return packages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = packages.find((item) => item.slug === slug);
  if (!p) return {};
  return {
    title: p.name,
    description: p.summary,
    alternates: { canonical: `/packages/${p.slug}` },
    openGraph: { images: [p.image] },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = packages.find((item) => item.slug === slug);
  if (!p) notFound();
  return <PackageDetail p={p} />;
}
