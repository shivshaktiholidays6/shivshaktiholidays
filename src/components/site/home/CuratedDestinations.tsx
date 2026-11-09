"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DestinationCard, SectionHead } from "@/components/site/Cards";
import { SectionCTA } from "@/components/site/SectionCTA";
import type { Destination } from "@/data/catalog";

export function CuratedDestinations({
  internationalDestinations,
  domesticDestinations,
}: {
  internationalDestinations: Destination[];
  domesticDestinations: Destination[];
}) {
  const [tab, setTab] = useState<"international" | "domestic">("international");
  const shown = tab === "international" ? internationalDestinations : domesticDestinations;

  return (
    <section className="bg-card/30 py-14 sm:py-20 md:py-24">
      <div className="container-x">
        <SectionHead eyebrow="Curated Escapes" title="Where Would You Like To Go?" text="Explore extraordinary destinations handpicked for sublime landscapes, rich cultures, and unforgettable moments." />
        <div className="mt-8 flex justify-center sm:mt-10">
          <div className="inline-flex rounded-full border border-border/80 bg-muted/60 p-1 shadow-xs backdrop-blur-md">
            {(["international", "domestic"] as const).map((item) => (
              <button key={item} type="button" onClick={() => setTab(item)} className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${tab === item ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground hover:text-primary"}`}>
                {item === "international" ? "International Curations" : "Incredible India"}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-6 lg:grid-cols-3">
          {shown.map((destination) => <DestinationCard key={destination.slug} d={destination} compactMobile />)}
        </div>
        <div className="mt-10 text-center sm:mt-12">
          <Button asChild variant="navy" size="xl" className="w-full shadow-soft hover:shadow-lift sm:w-auto">
            <Link href="/destinations" className="inline-flex items-center gap-2">
              <span>View All 50+ Destinations</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
        <SectionCTA />
      </div>
    </section>
  );
}
