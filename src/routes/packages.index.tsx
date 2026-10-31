import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PackageCard, SectionHead } from "@/components/site/Cards";
import { fieldClass } from "@/components/site/EnquiryForm";
import { categories, packages } from "@/data/catalog";

export const Route = createFileRoute("/packages/")({
  head: () => ({
    meta: [
      { title: "Holiday Packages — Shiv Shakti Holidays" },
      { name: "description", content: "Browse international, domestic, honeymoon, family, luxury and pilgrimage holiday packages." },
      { property: "og:title", content: "Holiday Packages — Shiv Shakti Holidays" },
      { property: "og:description", content: "Searchable catalogue of curated holiday packages." },
    ],
  }),
  component: Page,
});

function Page() {
  const [q, setQ] = useState("");
  const [scope, setScope] = useState("all");
  const [type, setType] = useState("all");
  const [budget, setBudget] = useState("all");
  const [dur, setDur] = useState("all");
  const [sort, setSort] = useState("rec");

  const list = useMemo(() => {
    let l = packages.filter((p) =>
      (!q || (p.name + p.place).toLowerCase().includes(q.toLowerCase())) &&
      (scope === "all" || p.scope === scope) &&
      (type === "all" || p.types.includes(type) || (type === "International" && p.scope === "international") || (type === "Domestic" && p.scope === "domestic") || type === "Customized") &&
      (budget === "all" || (budget === "a" ? p.price < 25000 : budget === "b" ? p.price < 50000 && p.price >= 25000 : budget === "c" ? p.price >= 50000 && p.price < 100000 : p.price >= 100000)) &&
      (dur === "all" || (dur === "s" ? p.nights <= 4 : dur === "m" ? p.nights > 4 && p.nights <= 7 : p.nights > 7)));
    if (sort === "lo") l = [...l].sort((a, b) => a.price - b.price);
    if (sort === "hi") l = [...l].sort((a, b) => b.price - a.price);
    if (sort === "dur") l = [...l].sort((a, b) => a.nights - b.nights);
    return l;
  }, [q, scope, type, budget, dur, sort]);

  return (
    <section className="pb-24 pt-36">
      <div className="container-x">
        <SectionHead eyebrow="Catalogue" title="Holiday Packages" text="Sample packages to inspire you. Prices are indicative per person and confirmed at the time of quotation." />
        <div className="mt-10 grid gap-3 rounded-2xl bg-card p-4 shadow-soft md:grid-cols-6">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search destination" className={`${fieldClass} md:col-span-2`} />
          <select value={scope} onChange={(e) => setScope(e.target.value)} className={fieldClass}><option value="all">Domestic & International</option><option value="domestic">Domestic</option><option value="international">International</option></select>
          <select value={type} onChange={(e) => setType(e.target.value)} className={fieldClass}><option value="all">All holiday types</option>{categories.map((c) => <option key={c}>{c}</option>)}</select>
          <select value={budget} onChange={(e) => setBudget(e.target.value)} className={fieldClass}><option value="all">Any budget</option><option value="a">Under ₹25,000</option><option value="b">₹25,000–50,000</option><option value="c">₹50,000–1,00,000</option><option value="d">₹1,00,000+</option></select>
          <select value={dur} onChange={(e) => setDur(e.target.value)} className={fieldClass}><option value="all">Any duration</option><option value="s">Up to 4 nights</option><option value="m">5–7 nights</option><option value="l">8+ nights</option></select>
        </div>
        <div className="mt-6 flex items-center justify-between text-sm text-muted-foreground">
          <span>{list.length} packages</span>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rounded-lg border border-input bg-background px-3 py-2"><option value="rec">Recommended</option><option value="lo">Price: Low to High</option><option value="hi">Price: High to Low</option><option value="dur">Duration</option></select>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PackageCard key={p.slug} p={p} />)}</div>
        {!list.length && <p className="py-20 text-center text-muted-foreground">No packages match — try widening your filters, or ask us for a custom plan.</p>}
      </div>
    </section>
  );
}
