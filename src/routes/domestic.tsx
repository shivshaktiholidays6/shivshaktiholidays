import Link from "next/link";
import { Mountain, Waves, Flower2, Landmark, Trees, Tent, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageCard, PageHero, SectionHead } from "@/components/site/Cards";
import { DestinationRegionExplorer } from "@/components/site/DestinationRegionExplorer";
import { SectionCTA } from "@/components/site/SectionCTA";
import { images, packages } from "@/data/catalog";
import { waLink, waMessages } from "@/config/site";

const cats = [
  [Mountain, "Mountains", "Adventure"],
  [Waves, "Beaches", "Weekend Getaways"],
  [Flower2, "Spiritual Journeys", "Spiritual & Pilgrimage"],
  [Landmark, "Heritage", "Family"],
  [Trees, "Wildlife", "Adventure"],
  [Tent, "Adventure", "Adventure"],
  [Users, "Family Holidays", "Family"],
  [Heart, "Romantic Getaways", "Honeymoon"],
] as const;

function HolidayStyleCards({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <div className="flex shrink-0 gap-4 pr-4" aria-hidden={duplicate || undefined}>
      {cats.map(([Icon, title, packageType]) => (
        <Link
          key={title}
          href={`/packages?type=${encodeURIComponent(packageType)}#all-packages`}
          tabIndex={duplicate ? -1 : undefined}
          className="flex w-[15.5rem] shrink-0 items-center gap-3 rounded-xl border border-border bg-card px-5 py-4 shadow-xs transition duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:w-[18rem]"
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-accent/10">
            <Icon className="size-5 text-accent" strokeWidth={1.5} />
          </span>
          <span className="font-semibold text-primary">{title}</span>
        </Link>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <>
      <PageHero
        image={images.kashmir}
        eyebrow="Domestic holidays"
        title="Discover Incredible India."
        text="From Himalayan valleys to tropical backwaters and royal palaces."
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="gold" size="xl">
            <Link href="/plan-trip">Plan an India Trip</Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <a href={waLink(waMessages.domestic)} target="_blank" rel="noreferrer">
              WhatsApp Us
            </a>
          </Button>
        </div>
      </PageHero>
      <section className="overflow-hidden py-16" aria-label="Holiday styles">
        <div className="mb-6 text-center">
          <p className="eyebrow">Find your travel style</p>
        </div>
        <div className="holiday-style-marquee relative flex overflow-hidden py-2">
          <div className="holiday-style-track flex w-max">
            <HolidayStyleCards />
            <HolidayStyleCards duplicate />
          </div>
        </div>
      </section>
      <DestinationRegionExplorer scope="domestic" />
      <section className="py-24">
        <div className="container-x">
          <SectionHead eyebrow="Popular" title="Domestic Packages" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages
              .filter((p) => p.scope === "domestic")
              .slice(0, 6)
              .map((p) => (
                <PackageCard key={p.slug} p={p} />
              ))}
          </div>
          <SectionCTA />
        </div>
      </section>
    </>
  );
}
