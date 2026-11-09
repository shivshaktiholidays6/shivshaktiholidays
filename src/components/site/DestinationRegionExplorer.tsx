"use client";

import { useState } from "react";
import { DestinationCard } from "@/components/site/Cards";
import { destinations as catalogueDestinations, type Destination, type Scope } from "@/data/catalog";

export function DestinationRegionExplorer({
  scope,
  destinationItems = catalogueDestinations,
}: {
  scope: Scope;
  destinationItems?: Destination[];
}) {
  const regionNames = Array.from(new Set(destinationItems.filter((d) => d.scope === scope).map((d) => d.region)));
  const [activeRegion, setActiveRegion] = useState(regionNames[0] ?? "");
  const visibleDestinations = destinationItems.filter(
    (destination) => destination.scope === scope && destination.region === activeRegion,
  );

  return (
    <section className="bg-muted/45 py-14 sm:py-16">
      <div className="container-x">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Explore by region</p>
            <h2 className="mt-2 text-3xl text-primary sm:text-4xl">{activeRegion}</h2>
          </div>
          <div
            className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            role="tablist"
            aria-label={`${scope === "domestic" ? "Indian" : "International"} regions`}
          >
            {regionNames.map((regionName) => (
              <button
                key={regionName}
                type="button"
                role="tab"
                aria-selected={activeRegion === regionName}
                onClick={() => setActiveRegion(regionName)}
                className={`shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                  activeRegion === regionName
                    ? "border-accent bg-accent text-accent-foreground shadow-xs"
                    : "border-border bg-card text-muted-foreground hover:border-accent/60 hover:text-primary"
                }`}
              >
                {regionName}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {visibleDestinations.map((destination) => (
            <DestinationCard
              key={destination.slug}
              d={destination}
              tall
              compactMobile
            />
          ))}
        </div>
      </div>
    </section>
  );
}
