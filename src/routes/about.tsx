import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Cards";
import { images } from "@/data/catalog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — Shiv Shakti Holidays" },
      { name: "description", content: "Shiv Shakti Holidays is an independent travel company planning domestic and international holidays." },
      { property: "og:title", content: "About Shiv Shakti Holidays" },
      { property: "og:description", content: "An independent travel company planning holidays around you." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <PageHero image={images.rajasthan} eyebrow="About us" title="Travel, Thoughtfully Planned." />
      <section className="py-24">
        <div className="container-x grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-4xl text-primary">Who We Are</h2>
            <p className="mt-5 text-muted-foreground">Shiv Shakti Holidays is an independent travel and holiday company offering domestic and international tour packages, customized holidays, honeymoons, family vacations, group tours, adventure experiences and luxury travel.</p>
            <p className="mt-4 text-muted-foreground">Our approach is simple: listen carefully, plan honestly and stay with you throughout the journey — so you can focus on making memories.</p>
            <Button asChild variant="gold" size="xl" className="mt-8"><Link to="/contact">Talk to Us</Link></Button>
          </div>
          <img src={images.bali} alt="Bali temple" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lift" />
        </div>
      </section>
    </>
  );
}
