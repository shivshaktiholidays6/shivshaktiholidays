import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PackageCard, PageHero, SectionHead } from "@/components/site/Cards";
import { ResponsiveImage } from "@/components/site/ResponsiveImage";
import { images, packages } from "@/data/catalog";
import { waLink, waMessages } from "@/config/site";

const spots: Array<[string, string]> = [
  ["Maldives", images.hero],
  ["Bali", images.bali],
  ["Switzerland", images.switzerland],
  ["Santorini", images.europe],
  ["Kashmir", images.kashmir],
  ["Kerala", images.kerala],
  ["Udaipur", images.rajasthan],
  ["Mauritius", images.hero],
];

export default function Page() {
  return (
    <>
      <PageHero
        image={images.europe}
        eyebrow="Honeymoon & romance"
        title="Make Your Beginning Unforgettable."
        text="Couple packages, private stays and romantic experiences in the world's most beautiful places."
      >
        <Button asChild variant="gold" size="xl" className="mt-8">
          <a href={waLink(waMessages.honeymoon)} target="_blank" rel="noreferrer">
            Plan Your Dream Honeymoon
          </a>
        </Button>
      </PageHero>
      <section className="py-24">
        <div className="container-x">
          <SectionHead eyebrow="Romantic destinations" title="Where Love Stories Begin" />
          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
            {spots.map(([n, img], i) => (
              <div
                key={n}
                className={`group relative min-h-56 overflow-hidden rounded-2xl ${i === 0 || i === 5 ? "md:row-span-2" : ""}`}
              >
                <ResponsiveImage
                  src={img}
                  alt={`${n} romantic holiday destination`}
                  fill
                  sizes="(max-width: 767px) 48vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-card-overlay" />
                <h3 className="absolute bottom-4 left-5 text-2xl text-primary-foreground">{n}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-muted py-24">
        <div className="container-x">
          <SectionHead eyebrow="Couple packages" title="Honeymoon Packages" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages
              .filter((p) => p.types.includes("Honeymoon"))
              .map((p) => (
                <PackageCard key={p.slug} p={p} />
              ))}
          </div>
          <div className="mt-12 text-center">
            <Button asChild variant="navy" size="xl">
              <Link href="/plan-trip">Customize Your Honeymoon</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
