import Link from "next/link";
import { Mountain, Waves, Flower2, Landmark, Trees, Tent, Users, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DestinationCard, PackageCard, PageHero, SectionHead } from "@/components/site/Cards";
import { SectionCTA } from "@/components/site/SectionCTA";
import { destinations, images, packages, regions } from "@/data/catalog";
import { waLink, waMessages } from "@/config/site";

const cats = [
  [Mountain, "Mountains"],
  [Waves, "Beaches"],
  [Flower2, "Spiritual Journeys"],
  [Landmark, "Heritage"],
  [Trees, "Wildlife"],
  [Tent, "Adventure"],
  [Users, "Family Holidays"],
  [Heart, "Romantic Getaways"],
] as const;

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
      <section className="py-16">
        <div className="container-x grid grid-cols-2 gap-4 md:grid-cols-4">
          {cats.map(([Icon, t]) => (
            <div
              key={t}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-4"
            >
              <Icon className="size-6 text-accent" strokeWidth={1.5} />
              <span className="font-semibold text-primary">{t}</span>
            </div>
          ))}
        </div>
      </section>
      {regions("domestic").map((r, i) => (
        <section key={r} className={i % 2 ? "py-12" : "bg-muted py-12"}>
          <div className="container-x">
            <h2 className="text-3xl text-primary">{r}</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {destinations
                .filter((d) => d.region === r)
                .map((d) => (
                  <DestinationCard key={d.slug} d={d} tall />
                ))}
            </div>
          </div>
        </section>
      ))}
      <section className="py-24">
        <div className="container-x">
          <SectionHead eyebrow="Popular" title="Domestic Packages" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages
              .filter((p) => p.scope === "domestic")
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
