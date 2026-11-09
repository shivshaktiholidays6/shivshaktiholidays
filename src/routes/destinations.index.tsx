"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Search, X } from "lucide-react";
import { DestinationCard, SectionHead } from "@/components/site/Cards";
import { ResponsiveImage } from "@/components/site/ResponsiveImage";
import { trackAnalyticsEvent } from "@/components/site/Analytics";
import { destinations as catalogueDestinations, type Destination } from "@/data/catalog";

export default function Page({ destinationItems = catalogueDestinations }: { destinationItems?: Destination[] }) {
  const [scope, setScope] = useState<"international" | "domestic">("international");
  const [region, setRegion] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(12);
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const searchBoxRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const normalizedQuery = query.trim().toLowerCase();
  const searchMatches = normalizedQuery
    ? destinationItems
        .filter((d) =>
          [d.name, d.region, d.blurb].some((value) =>
            value.toLowerCase().includes(normalizedQuery),
          ),
        )
        .slice(0, 6)
    : [];
  const list = destinationItems.filter((d) =>
    normalizedQuery
      ? [d.name, d.region, d.blurb].some((value) =>
          value.toLowerCase().includes(normalizedQuery),
        )
      : d.scope === scope && (region === "All" || d.region === region),
  );

  useEffect(() => {
    function closeSuggestions(event: PointerEvent) {
      if (!searchBoxRef.current?.contains(event.target as Node)) {
        setSuggestionsOpen(false);
        setActiveSuggestion(-1);
      }
    }

    document.addEventListener("pointerdown", closeSuggestions);
    return () => document.removeEventListener("pointerdown", closeSuggestions);
  }, []);

  function openFirstMatch() {
    const match = searchMatches[activeSuggestion] ?? searchMatches[0];
    if (match) {
      trackAnalyticsEvent("destination_search", {
        destination_slug: match.slug,
        result_count: searchMatches.length,
      });
      router.push(`/destinations/${match.slug}`);
    }
  }

  return (
    <section className="pb-24 pt-36">
      <div className="container-x">
        <SectionHead
          eyebrow="Destinations"
          title="Where Would You Like To Go?"
          text="Explore extraordinary destinations and discover your next unforgettable holiday."
        />
        <div ref={searchBoxRef} className="relative z-20 mx-auto mt-8 max-w-2xl">
          <div className="flex items-center rounded-2xl border border-border bg-card p-2 shadow-soft transition focus-within:border-accent focus-within:ring-4 focus-within:ring-accent/10">
            <Search className="ml-3 size-5 shrink-0 text-accent" aria-hidden="true" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setVisibleCount(12);
                setSuggestionsOpen(true);
                setActiveSuggestion(-1);
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown") {
                  event.preventDefault();
                  setSuggestionsOpen(true);
                  setActiveSuggestion((index) => Math.min(index + 1, searchMatches.length - 1));
                } else if (event.key === "ArrowUp") {
                  event.preventDefault();
                  setActiveSuggestion((index) => Math.max(index - 1, 0));
                } else if (event.key === "Escape") {
                  setSuggestionsOpen(false);
                  setActiveSuggestion(-1);
                } else if (event.key === "Enter") {
                  event.preventDefault();
                  openFirstMatch();
                }
              }}
              onFocus={() => setSuggestionsOpen(true)}
              type="search"
              role="combobox"
              aria-label="Search holiday destinations"
              aria-autocomplete="list"
              aria-expanded={Boolean(normalizedQuery && suggestionsOpen)}
              aria-controls={normalizedQuery ? "destination-search-results" : undefined}
              aria-activedescendant={
                activeSuggestion >= 0 ? `destination-option-${activeSuggestion}` : undefined
              }
              placeholder="Search a place — Bali, Kashmir, Dubai..."
              className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-primary outline-none placeholder:text-muted-foreground sm:text-base"
            />
            {query && (
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setSuggestionsOpen(false);
                  setActiveSuggestion(-1);
                }}
                aria-label="Clear destination search"
                className="grid size-10 shrink-0 place-items-center rounded-xl text-muted-foreground transition hover:bg-muted hover:text-primary"
              >
                <X className="size-4" />
              </button>
            )}
            <button
              type="button"
              onClick={openFirstMatch}
              disabled={!searchMatches.length}
              className="hidden rounded-xl bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-wider text-primary-foreground transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-45 sm:block"
            >
              Find place
            </button>
          </div>
          {normalizedQuery && suggestionsOpen && (
            <div
              id="destination-search-results"
              role="listbox"
              className="absolute inset-x-0 top-[calc(100%+0.5rem)] overflow-hidden rounded-2xl border border-border bg-card p-2 shadow-lift"
            >
              {searchMatches.length ? (
                searchMatches.map((destination, index) => (
                  <button
                    key={destination.slug}
                    id={`destination-option-${index}`}
                    type="button"
                    role="option"
                    aria-selected={activeSuggestion === index}
                    onMouseEnter={() => setActiveSuggestion(index)}
                    onClick={() => {
                      trackAnalyticsEvent("destination_search", {
                        destination_slug: destination.slug,
                        result_count: searchMatches.length,
                      });
                      router.push(`/destinations/${destination.slug}`);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${activeSuggestion === index ? "bg-muted" : "hover:bg-muted"}`}
                  >
                    <span className="relative size-11 shrink-0 overflow-hidden rounded-lg">
                      <ResponsiveImage
                        src={destination.image}
                        alt=""
                        focalPoint={destination.imagePosition}
                        fill
                        sizes="44px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-primary">{destination.name}</span>
                      <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="size-3 text-accent" />
                        {destination.scope === "domestic" ? "India" : destination.region}
                      </span>
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-4 py-5 text-center text-sm text-muted-foreground">
                  No place found. Try another destination name.
                </p>
              )}
            </div>
          )}
        </div>
        <div className={`mt-10 flex justify-center gap-2 ${normalizedQuery ? "opacity-55" : ""}`}>
          {(["international", "domestic"] as const).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setQuery("");
                setVisibleCount(12);
                setScope(t);
                setRegion("All");
              }}
              className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider ${scope === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
            >
              {t === "international" ? "International" : "India"}
            </button>
          ))}
        </div>
        <div className={`mt-5 flex flex-wrap justify-center gap-2 ${normalizedQuery ? "opacity-55" : ""}`}>
          {["All", ...Array.from(new Set(destinationItems.filter((d) => d.scope === scope).map((d) => d.region)))].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRegion(r);
                setVisibleCount(12);
              }}
              className={`rounded-full border px-4 py-1.5 text-sm ${region === r ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted-foreground hover:border-accent"}`}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:grid-cols-4">
          {list.slice(0, visibleCount).map((d) => (
            <DestinationCard key={d.slug} d={d} compactMobile />
          ))}
        </div>
        {visibleCount < list.length && (
          <div className="mt-9 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + 12)}
              className="rounded-full border border-accent/50 bg-card px-6 py-3 text-xs font-semibold uppercase tracking-wider text-primary shadow-xs transition hover:bg-accent hover:text-accent-foreground"
            >
              Show more destinations
            </button>
          </div>
        )}
        {normalizedQuery && !list.length && (
          <p className="py-20 text-center text-muted-foreground">
            We could not find that place. Try a nearby city, country or region.
          </p>
        )}
      </div>
    </section>
  );
}
