import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { DestinationCard, PackageCard, PageHero, SectionHead } from "@/components/site/Cards";
import { destinations, images, packages, regions } from "@/data/catalog";
import { waLink, waMessages } from "@/config/site";

export const Route = createFileRoute("/international")({
  head: () => ({
    meta: [
      { title: "International Holidays — Shiv Shakti Holidays" },
      { name: "description", content: "International holiday packages to the Maldives, Switzerland, Dubai, Bali, Thailand, Singapore and Europe." },
      { property: "og:title", content: "International Holidays — Shiv Shakti Holidays" },
      { property: "og:description", content: "Your passport to extraordinary experiences." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero image={images.switzerland} eyebrow="International holidays" title={"Your Passport\nto Extraordinary Experiences."}>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="gold" size="xl"><Link to="/plan-trip">Request a Quote</Link></Button>
          <Button asChild variant="glass" size="xl"><a href={waLink(waMessages.international)} target="_blank" rel="noreferrer">WhatsApp Us</a></Button>
        </div>
      </PageHero>
      {regions("international").map((r, i) => (
        <section key={r} className={i % 2 ? "bg-muted py-16" : "py-16"}>
          <div className="container-x">
            <h2 className="text-3xl text-primary">{r}</h2>
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {destinations.filter((d) => d.region === r).map((d) => <DestinationCard key={d.slug} d={d} tall />)}
            </div>
          </div>
        </section>
      ))}
      <section className="py-24">
        <div className="container-x">
          <SectionHead eyebrow="Popular" title="International Packages" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{packages.filter((p) => p.scope === "international").map((p) => <PackageCard key={p.slug} p={p} />)}</div>
        </div>
      </section>
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container-x max-w-3xl text-center">
          <p className="eyebrow">Visa assistance</p>
          <h2 className="mt-3 text-3xl">Guidance For Your Paperwork</h2>
          <p className="mt-4 text-primary-foreground/75">We can guide you on documentation for your trip. Visa requirements depend on your nationality, destination and current regulations; approval is decided solely by the relevant authorities and cannot be guaranteed.</p>
        </div>
      </section>
    </>
  );
}
