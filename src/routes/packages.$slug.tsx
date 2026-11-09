import { Check, X, Clock, MapPin, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Cards";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { itinerary, type Pkg } from "@/data/catalog";

const inclusions = [
  "Hotel accommodation on twin-sharing",
  "Daily breakfast",
  "Airport / station transfers",
  "Sightseeing as per itinerary",
  "Assistance throughout the trip",
];
const exclusions = [
  "Flights / train tickets unless specified",
  "Visa fees and travel insurance",
  "Lunch, dinner and personal expenses",
  "Entry tickets not mentioned",
  "Anything not listed in inclusions",
];

export default function PackageDetail({ p }: { p: Pkg }) {
  return (
    <>
      <PageHero image={p.image} eyebrow={p.types.join(" · ")} title={p.name}>
        <div className="mt-6 flex flex-wrap gap-6 text-sm text-primary-foreground/85">
          <span className="flex items-center gap-2">
            <MapPin className="size-4 text-accent" />
            {p.place}
          </span>
          <span className="flex items-center gap-2">
            <Clock className="size-4 text-accent" />
            {p.nights} Nights / {p.nights + 1} Days
          </span>
          <span className="flex items-baseline gap-2">
            <span>Starting from*</span>
            <b className="font-sans text-xl font-bold tracking-tight text-accent tabular-nums">
              ₹{p.price.toLocaleString("en-IN")}
            </b>
            <span className="text-xs">per person</span>
          </span>
        </div>
      </PageHero>
      <section className="py-16 pb-32 lg:pb-16">
        <div className="container-x grid gap-12 lg:grid-cols-3">
          <div className="space-y-14 lg:col-span-2">
            <div>
              <p className="text-lg text-muted-foreground">{p.summary}</p>
              <div className="mt-7 overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-card to-primary/5 p-5 shadow-sm sm:p-6">
                <div className="flex items-start gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-sm">
                    <Sparkles className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-display text-xl text-primary">A thoughtful travel note</p>
                    <p className="mt-2 leading-relaxed text-muted-foreground">
                      Please confirm the latest package details with our travel team before booking.
                      Prices, hotel availability, transfers and sightseeing may change with the
                      season, your travel dates and local conditions. We&apos;ll happily tailor and
                      reconfirm every detail for a smooth, memorable journey.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl text-primary">Tour Highlights</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {p.highlights.map((h) => (
                  <li key={h} className="flex gap-3">
                    <Check className="mt-0.5 size-5 text-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-3xl text-primary">Day-by-Day Itinerary</h2>
              <ol className="mt-6 space-y-6 border-l border-accent/40 pl-6">
                {itinerary(p).map((d) => (
                  <li key={d.day} className="relative">
                    <span className="absolute -left-[33px] top-0.5 grid size-4 place-items-center rounded-full bg-accent" />
                    <p className="eyebrow">Day {d.day}</p>
                    <h3 className="mt-1 text-xl text-primary">{d.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{d.text}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                ["Accommodation", "3★ / 4★ / 5★ options available on request"],
                ["Transportation", "Private or shared transfers as per itinerary"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl border border-border bg-card p-5">
                  <p className="eyebrow">{k}</p>
                  <p className="mt-2 text-sm">{v}</p>
                </div>
              ))}
            </div>
            <div className="grid gap-10 sm:grid-cols-2">
              <div>
                <h3 className="text-2xl text-primary">Inclusions</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {inclusions.map((i) => (
                    <li key={i} className="flex gap-2">
                      <Check className="size-4 text-accent" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl text-primary">Exclusions</h3>
                <ul className="mt-4 space-y-2 text-sm">
                  {exclusions.map((i) => (
                    <li key={i} className="flex gap-2">
                      <X className="size-4 text-destructive" />
                      {i}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <h2 className="text-3xl text-primary">Good to Know</h2>
              <Accordion type="single" collapsible className="mt-4">
                <AccordionItem value="info">
                  <AccordionTrigger>Important information</AccordionTrigger>
                  <AccordionContent>
                    *Prices are indicative samples per person and vary by travel dates, hotel
                    category and availability. Final pricing is shared in your quotation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="cancel">
                  <AccordionTrigger>Cancellation policy</AccordionTrigger>
                  <AccordionContent>
                    Cancellation terms depend on the hotels and services booked and will be clearly
                    shared with your quotation before confirmation.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="custom">
                  <AccordionTrigger>Can I customize this package?</AccordionTrigger>
                  <AccordionContent>
                    Yes — dates, hotels, duration and activities can all be adjusted to suit you.
                  </AccordionContent>
                </AccordionItem>
                {p.scope === "international" && (
                  <AccordionItem value="visa">
                    <AccordionTrigger>Do you help with visas?</AccordionTrigger>
                    <AccordionContent>
                      We can guide you on documentation. Visa requirements depend on nationality and
                      current regulations, and approval rests with the authorities.
                    </AccordionContent>
                  </AccordionItem>
                )}
              </Accordion>
            </div>
          </div>
          <aside
            id="enquire"
            className="h-fit rounded-2xl bg-card p-6 shadow-soft lg:sticky lg:top-28"
          >
            <p className="eyebrow">Enquire</p>
            <h3 className="mt-1 text-2xl text-primary">{p.name}</h3>
            <div className="mt-5">
              <EnquiryForm packageName={p.name} compact />
            </div>
          </aside>
        </div>
      </section>
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card p-3 lg:hidden">
        <Button asChild variant="gold" size="xl" className="w-full">
          <a href="#enquire">Get Package Quote</a>
        </Button>
      </div>
    </>
  );
}
