import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PackageCard, PageHero, SectionHead } from "@/components/site/Cards";
import { DestinationRegionExplorer } from "@/components/site/DestinationRegionExplorer";
import { SectionCTA } from "@/components/site/SectionCTA";
import { destinations, images, packages, type Destination, type Pkg } from "@/data/catalog";
import { waLink, waMessages } from "@/config/site";

export default function Page({ packageItems = packages, destinationItems = destinations }: { packageItems?: Pkg[]; destinationItems?: Destination[] }) {
  return (
    <>
      <PageHero
        image={images.switzerland}
        eyebrow="International holidays"
        title={"Your Passport\nto Extraordinary Experiences."}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild variant="gold" size="xl">
            <Link href="/plan-trip">Request a Quote</Link>
          </Button>
          <Button asChild variant="glass" size="xl">
            <a href={waLink(waMessages.international)} target="_blank" rel="noreferrer">
              WhatsApp Us
            </a>
          </Button>
        </div>
      </PageHero>
      <DestinationRegionExplorer scope="international" destinationItems={destinationItems} />
      <section className="py-24">
        <div className="container-x">
          <SectionHead eyebrow="Popular" title="International Packages" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packageItems
              .filter((p) => p.scope === "international")
              .slice(0, 6)
              .map((p) => (
                <PackageCard key={p.slug} p={p} />
              ))}
          </div>
          <SectionCTA />
        </div>
      </section>
      <section className="bg-primary py-16 text-primary-foreground">
        <div className="container-x max-w-3xl text-center">
          <p className="eyebrow">Visa assistance</p>
          <h2 className="mt-3 text-3xl">Guidance For Your Paperwork</h2>
          <p className="mt-4 text-primary-foreground/75">
            We can guide you on documentation for your trip. Visa requirements depend on your
            nationality, destination and current regulations; approval is decided solely by the
            relevant authorities and cannot be guaranteed.
          </p>
        </div>
      </section>
    </>
  );
}
