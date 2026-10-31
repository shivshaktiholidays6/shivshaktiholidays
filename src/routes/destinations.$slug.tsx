import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PackageCard, PageHero, SectionHead } from "@/components/site/Cards";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { destinations, packages } from "@/data/catalog";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const d = destinations.find((x) => x.slug === params.slug);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} Holidays — Shiv Shakti Holidays` },
          { name: "description", content: loaderData.blurb },
          { property: "og:title", content: `${loaderData.name} Holidays` },
          { property: "og:description", content: loaderData.blurb },
        ]
      : [{ title: "Destination not found" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => <div className="pt-40 pb-24 text-center"><h1 className="text-4xl text-primary">Destination not found</h1><Link to="/destinations" className="mt-4 inline-block text-accent">See all destinations</Link></div>,
  component: Page,
});

function Page() {
  const d = Route.useLoaderData();
  const pk = packages.filter((p) => p.destination === d.slug);
  return (
    <>
      <PageHero image={d.image} eyebrow={`${d.region} · ${d.scope === "international" ? "International" : "India"}`} title={d.name} text={d.blurb} />
      <section className="py-20">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="text-3xl text-primary">Overview</h2>
              <p className="mt-4 text-muted-foreground">{d.name} offers a wonderful mix of experiences. Our team will help you choose the right season, stays and experiences for your style of travel — whether you are planning a honeymoon, a family break or an adventure.</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[["Ideal duration", d.scope === "international" ? "5–8 days" : "4–7 days"], ["Best for", "Couples, families, friends"], ["Planning", "Fully customizable"]].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-border bg-card p-5"><p className="eyebrow">{k}</p><p className="mt-2 font-semibold text-primary">{v}</p></div>
              ))}
            </div>
            {d.scope === "international" && (
              <p className="rounded-xl bg-muted p-5 text-sm text-muted-foreground">Visa requirements depend on your nationality, destination and current regulations. We can share guidance, but visa approval is decided solely by the relevant authorities.</p>
            )}
            <div>
              <SectionHead center={false} eyebrow="Packages" title={pk.length ? `${d.name} Packages` : "Custom Itineraries Available"} text={pk.length ? undefined : `We don't have a sample package for ${d.name} listed yet — tell us your plans and we'll build one for you.`} />
              {pk.length > 0 && <div className="mt-8 grid gap-6 sm:grid-cols-2">{pk.map((p) => <PackageCard key={p.slug} p={p} />)}</div>}
              {!pk.length && <Button asChild variant="navy" size="xl" className="mt-6"><Link to="/plan-trip">Plan a custom trip</Link></Button>}
            </div>
          </div>
          <aside className="h-fit rounded-2xl bg-card p-6 shadow-soft lg:sticky lg:top-28">
            <h3 className="text-2xl text-primary">Enquire about {d.name}</h3>
            <div className="mt-5"><EnquiryForm compact /></div>
          </aside>
        </div>
      </section>
    </>
  );
}
