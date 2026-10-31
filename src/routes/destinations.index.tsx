import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { DestinationCard, SectionHead } from "@/components/site/Cards";
import { destinations, regions } from "@/data/catalog";

export const Route = createFileRoute("/destinations/")({
  head: () => ({
    meta: [
      { title: "Destinations — Shiv Shakti Holidays" },
      { name: "description", content: "Explore international and Indian destinations, from Bali and Switzerland to Kashmir and Kerala." },
      { property: "og:title", content: "Destinations — Shiv Shakti Holidays" },
      { property: "og:description", content: "Find your next holiday destination across India and the world." },
    ],
  }),
  component: Page,
});

function Page() {
  const [scope, setScope] = useState<"international" | "domestic">("international");
  const [region, setRegion] = useState<string>("All");
  const list = destinations.filter((d) => d.scope === scope && (region === "All" || d.region === region));
  return (
    <section className="pb-24 pt-36">
      <div className="container-x">
        <SectionHead eyebrow="Destinations" title="Where Would You Like To Go?" text="Explore extraordinary destinations and discover your next unforgettable holiday." />
        <div className="mt-10 flex justify-center gap-2">
          {(["international", "domestic"] as const).map((t) => (
            <button key={t} onClick={() => { setScope(t); setRegion("All"); }}
              className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider ${scope === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}>
              {t === "international" ? "International" : "India"}
            </button>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {["All", ...regions(scope)].map((r) => (
            <button key={r} onClick={() => setRegion(r)}
              className={`rounded-full border px-4 py-1.5 text-sm ${region === r ? "border-accent bg-accent text-accent-foreground" : "border-border text-muted-foreground hover:border-accent"}`}>{r}</button>
          ))}
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((d) => <DestinationCard key={d.slug} d={d} />)}
        </div>
      </div>
    </section>
  );
}
