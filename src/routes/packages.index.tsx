"use client";

import { useMemo, useState } from "react";
import { Crown, HeartHandshake, Hotel, MapPinned, ShieldCheck, Sparkles } from "lucide-react";
import { PackageCard, SectionHead } from "@/components/site/Cards";
import { SectionCTA } from "@/components/site/SectionCTA";
import { fieldClass } from "@/components/site/EnquiryForm";
import { categories, mostBookedPackageSlugs, packages } from "@/data/catalog";

const serviceHighlights = [
  [Crown, "VIP darshan support"],
  [Hotel, "Comfortable stays"],
  [MapPinned, "Planned transfers"],
  [HeartHandshake, "Family assistance"],
  [ShieldCheck, "Trusted guidance"],
] as const;

export default function Page() {
  const [q, setQ] = useState("");
  const [scope, setScope] = useState("all");
  const [type, setType] = useState("all");
  const [budget, setBudget] = useState("all");
  const [dur, setDur] = useState("all");
  const [sort, setSort] = useState("rec");

  const mostBookedPackages = mostBookedPackageSlugs.flatMap((slug) => {
    const packageItem = packages.find((item) => item.slug === slug);
    return packageItem ? [packageItem] : [];
  });
  const spiritualPackages = packages.filter((p) => p.types.includes("Spiritual & Pilgrimage"));

  const list = useMemo(() => {
    let filtered = packages.filter(
      (p) =>
        (!q || (p.name + p.place).toLowerCase().includes(q.toLowerCase())) &&
        (scope === "all" || p.scope === scope) &&
        (type === "all" ||
          p.types.includes(type) ||
          (type === "International" && p.scope === "international") ||
          (type === "Domestic" && p.scope === "domestic") ||
          type === "Customized") &&
        (budget === "all" ||
          (budget === "a"
            ? p.price < 25000
            : budget === "b"
              ? p.price < 50000 && p.price >= 25000
              : budget === "c"
                ? p.price >= 50000 && p.price < 100000
                : p.price >= 100000)) &&
        (dur === "all" ||
          (dur === "s"
            ? p.nights <= 4
            : dur === "m"
              ? p.nights > 4 && p.nights <= 7
              : p.nights > 7)),
    );
    if (sort === "lo") filtered = [...filtered].sort((a, b) => a.price - b.price);
    if (sort === "hi") filtered = [...filtered].sort((a, b) => b.price - a.price);
    if (sort === "dur") filtered = [...filtered].sort((a, b) => a.nights - b.nights);
    if (sort === "rec") {
      filtered = [...filtered].sort((a, b) => {
        const aIndex = mostBookedPackageSlugs.indexOf(
          a.slug as (typeof mostBookedPackageSlugs)[number],
        );
        const bIndex = mostBookedPackageSlugs.indexOf(
          b.slug as (typeof mostBookedPackageSlugs)[number],
        );
        return (aIndex < 0 ? 999 : aIndex) - (bIndex < 0 ? 999 : bIndex);
      });
    }
    return filtered;
  }, [q, scope, type, budget, dur, sort]);

  return (
    <>
      <section className="relative overflow-hidden bg-primary pb-20 pt-36 text-primary-foreground">
        <div className="absolute inset-0 bg-radial-[at_top_right] from-accent/20 via-transparent to-transparent" />
        <div className="container-x relative text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <Sparkles className="size-4" /> Traveller favourites
          </span>
          <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-semibold text-white sm:text-6xl">
            Most Booked Holiday Packages
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-primary-foreground/75">
            The journeys our travellers ask for most—now with brochure-matched durations, starting
            prices and destination imagery.
          </p>
        </div>
      </section>

      <section className="bg-muted/45 py-20">
        <div className="container-x">
          <SectionHead
            eyebrow="Best sellers"
            title="Our Most Booked Escapes"
            text="From quick Indian getaways to multi-country holidays, these packages are proven favourites."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mostBookedPackages.map((p) => (
              <PackageCard key={p.slug} p={p} />
            ))}
          </div>
          <SectionCTA />
        </div>
      </section>

      <section
        id="spiritual-places"
        className="relative scroll-mt-24 overflow-hidden bg-[#160d18] py-20 text-primary-foreground"
      >
        <div className="absolute inset-0 bg-radial-[at_top] from-accent/15 via-transparent to-transparent" />
        <div className="container-x relative">
          <div className="[&_h2]:text-white [&_p]:text-primary-foreground/75">
            <SectionHead
              eyebrow="Spiritual places"
              title="Pilgrimage & Divine Journeys"
              text="Travel with faith and peace of mind. Our yatra packages combine sacred experiences with thoughtful planning and on-trip support."
            />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-5">
            {serviceHighlights.map(([Icon, label]) => (
              <div
                key={label}
                className="rounded-2xl border border-accent/25 bg-white/5 p-4 text-center backdrop-blur-sm"
              >
                <Icon className="mx-auto size-6 text-accent" />
                <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-white/85">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {spiritualPackages.map((p) => (
              <PackageCard key={p.slug} p={p} />
            ))}
          </div>
          <SectionCTA
            title="Looking for another spiritual destination?"
            text="Ask us about Badrinath, Yamunotri, Haridwar, Rishikesh, Ajmer Sharif, Golden Temple, Tirupati, Puri, Rameswaram, Dwarka and other customized pilgrimage routes."
          />
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <SectionHead
            eyebrow="Complete catalogue"
            title="Find Your Perfect Holiday"
            text="Filter every sample itinerary by destination, holiday style, budget and duration."
          />
          <div className="mt-10 grid gap-3 rounded-2xl bg-card p-4 shadow-soft md:grid-cols-6">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search destination"
              className={`${fieldClass} md:col-span-2`}
            />
            <select value={scope} onChange={(e) => setScope(e.target.value)} className={fieldClass}>
              <option value="all">Domestic & International</option>
              <option value="domestic">Domestic</option>
              <option value="international">International</option>
            </select>
            <select value={type} onChange={(e) => setType(e.target.value)} className={fieldClass}>
              <option value="all">All holiday types</option>
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={fieldClass}
            >
              <option value="all">Any budget</option>
              <option value="a">Under ₹25,000</option>
              <option value="b">₹25,000–50,000</option>
              <option value="c">₹50,000–1,00,000</option>
              <option value="d">₹1,00,000+</option>
            </select>
            <select value={dur} onChange={(e) => setDur(e.target.value)} className={fieldClass}>
              <option value="all">Any duration</option>
              <option value="s">Up to 4 nights</option>
              <option value="m">5–7 nights</option>
              <option value="l">8+ nights</option>
            </select>
          </div>
          <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
            <span>{list.length} packages</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border border-input bg-background px-3 py-2"
            >
              <option value="rec">Recommended</option>
              <option value="lo">Price: Low to High</option>
              <option value="hi">Price: High to Low</option>
              <option value="dur">Duration</option>
            </select>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <PackageCard key={p.slug} p={p} />
            ))}
          </div>
          {!list.length && (
            <p className="py-20 text-center text-muted-foreground">
              No packages match—try widening your filters, or ask us for a custom plan.
            </p>
          )}
          <SectionCTA />
        </div>
      </section>
    </>
  );
}
