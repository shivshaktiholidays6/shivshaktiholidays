import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Compass, Globe2, Map, Sparkles, HeartHandshake, CalendarCheck, Plane, Headphones, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DestinationCard, PackageCard, SectionHead } from "@/components/site/Cards";
import { fieldClass } from "@/components/site/EnquiryForm";
import { destinations, images, packages, categories } from "@/data/catalog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shiv Shakti Holidays — Discover the World, Create Memories" },
      { name: "description", content: "Premium domestic and international holiday packages, honeymoons and customized trips planned around you." },
      { property: "og:title", content: "Shiv Shakti Holidays — Discover the World" },
      { property: "og:description", content: "From Indian escapes to international adventures, holidays designed around your dreams." },
    ],
  }),
  component: Home,
});

const featured = ["maldives", "bali", "switzerland", "dubai", "kashmir", "kerala", "rajasthan", "greece"];

function Home() {
  const [tab, setTab] = useState<"international" | "domestic">("international");
  const navigate = useNavigate();
  const shown = tab === "international"
    ? destinations.filter((d) => ["maldives", "bali", "switzerland", "dubai", "greece", "thailand"].includes(d.slug))
    : destinations.filter((d) => ["kashmir", "kerala", "rajasthan", "goa", "himachal-pradesh", "andaman-and-nicobar-islands"].includes(d.slug));
  void featured;

  return (
    <>
      <section className="relative min-h-screen overflow-hidden">
        <img src={images.hero} alt="Overwater villas in the Maldives at sunset" width={1920} height={1088} className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-overlay" />
        <div className="container-x relative flex min-h-screen flex-col justify-center pb-48 pt-32 text-primary-foreground">
          <div className="max-w-3xl animate-fade-up">
            <p className="eyebrow">Welcome to Shiv Shakti Holidays</p>
            <h1 className="mt-5 text-5xl leading-[1.05] md:text-7xl">Discover The World.<br /><em className="text-accent">Create Memories Forever.</em></h1>
            <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">From breathtaking Indian escapes to unforgettable international adventures, discover holidays designed around your dreams.</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild variant="gold" size="xl"><Link to="/packages">Explore Holidays</Link></Button>
              <Button asChild variant="glass" size="xl"><Link to="/plan-trip">Plan Your Trip</Link></Button>
            </div>
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 translate-y-1/2 md:translate-y-1/3">
          <form onSubmit={(e) => { e.preventDefault(); navigate({ to: "/plan-trip" }); }}
            className="container-x">
            <div className="grid gap-3 rounded-2xl bg-card p-5 shadow-lift sm:grid-cols-2 lg:grid-cols-7">
              <input placeholder="Destination" className={fieldClass} />
              <input placeholder="Departure city" className={fieldClass} />
              <input type="date" aria-label="Departure date" className={fieldClass} />
              <input type="date" aria-label="Return date" className={fieldClass} />
              <div className="grid grid-cols-2 gap-2">
                <input type="number" min={1} placeholder="Adults" className={fieldClass} />
                <input type="number" min={0} placeholder="Kids" className={fieldClass} />
              </div>
              <select className={fieldClass} defaultValue=""><option value="" disabled>Category</option>{categories.map((c) => <option key={c}>{c}</option>)}</select>
              <Button type="submit" variant="navy" className="h-full min-h-12">Find My Holiday</Button>
            </div>
          </form>
        </div>
      </section>

      <section className="bg-background pb-10 pt-56 md:pt-32">
        <div className="container-x grid grid-cols-2 gap-6 text-center md:grid-cols-4">
          {[[Map, "Domestic Holidays"], [Globe2, "International Adventures"], [Sparkles, "Customized Experiences"], [Headphones, "Personalized Travel Assistance"]].map(([I, t]) => {
            const Icon = I as typeof Map;
            return <div key={t as string} className="flex flex-col items-center gap-2"><Icon className="size-6 text-accent" strokeWidth={1.5} /><span className="text-sm font-semibold text-primary">{t as string}</span></div>;
          })}
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHead eyebrow="Destinations" title="Where Would You Like To Go?" text="Explore extraordinary destinations and discover your next unforgettable holiday." />
          <div className="mt-10 flex justify-center gap-2">
            {(["international", "domestic"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition ${tab === t ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-primary"}`}>
                {t === "international" ? "International" : "India"}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((d) => <DestinationCard key={d.slug} d={d} />)}
          </div>
          <div className="mt-10 text-center"><Button asChild variant="navy" size="xl"><Link to="/destinations">View All Destinations</Link></Button></div>
        </div>
      </section>

      <section className="bg-muted py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead center={false} eyebrow="Holiday packages" title="Journeys We Love" text="Sample itineraries to inspire you — every trip can be tailored." />
            <Button asChild variant="outline" className="rounded-full"><Link to="/packages">Browse all packages</Link></Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages.filter((p) => ["bali-romantic-escape", "switzerland-scenic-escape", "dubai-luxury-experience", "kashmir-paradise", "kerala-backwaters", "rajasthan-royal-experience"].includes(p.slug)).map((p) => <PackageCard key={p.slug} p={p} />)}
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[28rem]">
          <img src={images.europe} alt="Santorini at sunset" loading="lazy" className="absolute inset-0 size-full object-cover" />
        </div>
        <div className="flex items-center bg-primary p-10 text-primary-foreground md:p-20">
          <div>
            <p className="eyebrow">Honeymoon</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Make Your Beginning Unforgettable.</h2>
            <p className="mt-5 text-primary-foreground/75">Private stays, romantic experiences and scenic destinations — from the Maldives and Santorini to Kashmir and Udaipur.</p>
            <Button asChild variant="gold" size="xl" className="mt-8"><Link to="/honeymoon">Plan Your Dream Honeymoon</Link></Button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <SectionHead eyebrow="Why choose us" title="Your Dreams. Our Travel Planning." />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [Sparkles, "Customized Travel Experiences", "Every itinerary shaped around your interests, pace and budget."],
              [Globe2, "Domestic & International", "From the Himalayas to the Alps, one team for every journey."],
              [Compass, "Carefully Planned Itineraries", "Balanced days with the right mix of sights and downtime."],
              [Layers, "Multiple Holiday Categories", "Honeymoons, family trips, pilgrimages, adventure and luxury."],
              [HeartHandshake, "Personalized Assistance", "Real people to help you plan, before and during your trip."],
              [CalendarCheck, "Convenient Enquiry & Booking", "Share your plans in minutes via form, call or WhatsApp."],
            ].map(([I, t, d]) => {
              const Icon = I as typeof Map;
              return (
                <div key={t as string} className="rounded-2xl border border-border bg-card p-8 transition hover:-translate-y-1 hover:shadow-soft">
                  <Icon className="size-8 text-accent" strokeWidth={1.4} />
                  <h3 className="mt-5 text-xl text-primary">{t as string}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary py-24 text-primary-foreground">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center"><p className="eyebrow">How it works</p><h2 className="mt-3 text-4xl md:text-5xl">Four Steps To Your Journey</h2></div>
          <div className="mt-14 grid gap-10 md:grid-cols-4">
            {[
              ["Discover Your Destination", "Explore our domestic and international destinations."],
              ["Share Your Preferences", "Tell us your dates, budget and travel requirements."],
              ["Receive Your Itinerary", "Our travel team prepares a suitable holiday proposal."],
              ["Confirm & Enjoy", "Finalize the arrangements and get ready to travel."],
            ].map(([t, d], i) => (
              <div key={t} className="border-t border-accent/40 pt-6">
                <span className="font-display text-5xl text-accent">0{i + 1}</span>
                <h3 className="mt-3 text-xl">{t}</h3>
                <p className="mt-2 text-sm text-primary-foreground/70">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Our promise</p>
            <h2 className="mt-3 text-4xl text-primary md:text-5xl">A Travel Experience Built On Care</h2>
            <p className="mt-5 text-muted-foreground">We listen first, plan carefully and stay in touch throughout your journey. Traveller stories will appear here as our guests share them.</p>
            <Button asChild variant="gold" size="xl" className="mt-8"><Link to="/plan-trip"><Plane />Start Planning</Link></Button>
          </div>
          <img src={images.kerala} alt="Kerala houseboat" loading="lazy" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lift" />
        </div>
      </section>
    </>
  );
}
