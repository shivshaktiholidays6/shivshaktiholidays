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


function Home() {
  const [tab, setTab] = useState<"international" | "domestic">("international");
  const navigate = useNavigate();
  const shown = tab === "international"
    ? destinations.filter((d) => ["maldives", "bali", "switzerland", "dubai", "greece", "thailand"].includes(d.slug))
    : destinations.filter((d) => ["kashmir", "kerala", "rajasthan", "goa", "himachal-pradesh", "andaman-and-nicobar-islands"].includes(d.slug));

  return (
    <>
      <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden">
        <img
          src={images.hero}
          alt="Overwater villas in the Maldives at sunset"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-overlay" />
        <div className="container-x relative z-10 flex flex-1 flex-col justify-center pb-20 pt-28 sm:pb-32 sm:pt-36 text-primary-foreground">
          <div className="max-w-3xl animate-fade-up">
            <p className="eyebrow">Welcome to Shiv Shakti Holidays</p>
            <h1 className="mt-4 sm:mt-5 text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1] sm:leading-[1.05] font-semibold">
              Discover The World.<br />
              <em className="text-accent italic">Create Memories Forever.</em>
            </h1>
            <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-primary-foreground/85 leading-relaxed">
              From breathtaking Indian escapes to unforgettable international adventures, discover holidays designed around your dreams.
            </p>
            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3">
              <Button asChild variant="gold" size="xl" className="w-full sm:w-auto">
                <Link to="/packages">Explore Holidays</Link>
              </Button>
              <Button asChild variant="glass" size="xl" className="w-full sm:w-auto">
                <Link to="/plan-trip">Plan Your Trip</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-20 -mt-10 sm:-mt-16 lg:-mt-14">
        <div className="container-x">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/plan-trip" });
            }}
            className="rounded-2xl border border-border/70 bg-card p-4 sm:p-5 shadow-lift"
          >
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
              <input placeholder="Destination" className={fieldClass} />
              <input placeholder="Departure city" className={fieldClass} />
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground lg:hidden">
                  Departure Date
                </label>
                <input type="date" aria-label="Departure date" className={fieldClass} />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground lg:hidden">
                  Return Date
                </label>
                <input type="date" aria-label="Return date" className={fieldClass} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input type="number" min={1} placeholder="Adults" className={fieldClass} />
                <input type="number" min={0} placeholder="Kids" className={fieldClass} />
              </div>
              <select className={fieldClass} defaultValue="">
                <option value="" disabled>Category</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <Button type="submit" variant="navy" className="h-11 sm:h-full min-h-11 sm:col-span-2 lg:col-span-1">
                Find My Holiday
              </Button>
            </div>
          </form>
        </div>
      </section>

      <section className="bg-background py-8 sm:py-12 md:py-14">
        <div className="container-x grid grid-cols-2 gap-3.5 text-center sm:gap-6 md:grid-cols-4">
          {[[Map, "Domestic Holidays"], [Globe2, "International Adventures"], [Sparkles, "Customized Experiences"], [Headphones, "Personalized Travel Assistance"]].map(([I, t]) => {
            const Icon = I as typeof Map;
            return (
              <div
                key={t as string}
                className="flex flex-col items-center gap-2 rounded-xl border border-border/50 bg-card/60 p-3 sm:border-0 sm:bg-transparent sm:p-0"
              >
                <span className="grid size-10 place-items-center rounded-full bg-accent/15 text-accent sm:size-12">
                  <Icon className="size-5 sm:size-6" strokeWidth={1.5} />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-primary">{t as string}</span>
              </div>
            );
          })}
        </div>
      </section>

      <section className="py-12 sm:py-20 md:py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="Destinations"
            title="Where Would You Like To Go?"
            text="Explore extraordinary destinations and discover your next unforgettable holiday."
          />
          <div className="mt-6 sm:mt-10 flex justify-center gap-2">
            {(["international", "domestic"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded-full px-5 py-2 sm:px-6 sm:py-2.5 text-xs font-semibold uppercase tracking-wider transition ${
                  tab === t
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted text-muted-foreground hover:text-primary"
                }`}
              >
                {t === "international" ? "International" : "India"}
              </button>
            ))}
          </div>
          <div className="mt-8 sm:mt-10 grid gap-4 sm:gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((d) => (
              <DestinationCard key={d.slug} d={d} />
            ))}
          </div>
          <div className="mt-8 sm:mt-10 text-center">
            <Button asChild variant="navy" size="xl" className="w-full sm:w-auto">
              <Link to="/destinations">View All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-muted py-12 sm:py-20 md:py-24">
        <div className="container-x">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
            <SectionHead
              center={false}
              eyebrow="Holiday packages"
              title="Journeys We Love"
              text="Sample itineraries to inspire you — every trip can be tailored."
            />
            <Button asChild variant="outline" className="rounded-full w-full sm:w-auto shrink-0">
              <Link to="/packages">Browse all packages</Link>
            </Button>
          </div>
          <div className="mt-8 sm:mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {packages
              .filter((p) =>
                [
                  "bali-romantic-escape",
                  "switzerland-scenic-escape",
                  "dubai-luxury-experience",
                  "kashmir-paradise",
                  "kerala-backwaters",
                  "rajasthan-royal-experience",
                ].includes(p.slug)
              )
              .map((p) => (
                <PackageCard key={p.slug} p={p} />
              ))}
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2 overflow-hidden">
        <div className="relative min-h-[16rem] sm:min-h-[22rem] md:min-h-[28rem]">
          <img
            src={images.europe}
            alt="Santorini at sunset"
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
        <div className="flex items-center bg-primary p-6 sm:p-10 md:p-16 lg:p-20 text-primary-foreground">
          <div className="max-w-xl">
            <p className="eyebrow">Honeymoon</p>
            <h2 className="mt-2.5 sm:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              Make Your Beginning Unforgettable.
            </h2>
            <p className="mt-3.5 sm:mt-5 text-sm sm:text-base text-primary-foreground/80 leading-relaxed">
              Private stays, romantic experiences and scenic destinations — from the Maldives and Santorini to Kashmir and Udaipur.
            </p>
            <Button asChild variant="gold" size="xl" className="mt-6 sm:mt-8 w-full sm:w-auto">
              <Link to="/honeymoon">Plan Your Dream Honeymoon</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 md:py-24">
        <div className="container-x">
          <SectionHead eyebrow="Why choose us" title="Your Dreams. Our Travel Planning." />
          <div className="mt-8 sm:mt-12 md:mt-14 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
                <div
                  key={t as string}
                  className="rounded-2xl border border-border bg-card p-5 sm:p-7 transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <Icon className="size-7 sm:size-8 text-accent" strokeWidth={1.4} />
                  <h3 className="mt-3.5 sm:mt-5 text-lg sm:text-xl font-semibold text-primary">{t as string}</h3>
                  <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">{d as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary py-12 sm:py-20 md:py-24 text-primary-foreground">
        <div className="container-x">
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">How it works</p>
            <h2 className="mt-2.5 sm:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight">
              Four Steps To Your Journey
            </h2>
          </div>
          <div className="mt-8 sm:mt-12 md:mt-14 grid gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-4">
            {[
              ["Discover Your Destination", "Explore our domestic and international destinations."],
              ["Share Your Preferences", "Tell us your dates, budget and travel requirements."],
              ["Receive Your Itinerary", "Our travel team prepares a suitable holiday proposal."],
              ["Confirm & Enjoy", "Finalize the arrangements and get ready to travel."],
            ].map(([t, d], i) => (
              <div key={t} className="border-t border-accent/40 pt-4 sm:pt-6">
                <span className="font-display text-4xl sm:text-5xl font-semibold text-accent">0{i + 1}</span>
                <h3 className="mt-2.5 sm:mt-3 text-lg sm:text-xl font-medium">{t}</h3>
                <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-primary-foreground/75 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-20 md:py-24">
        <div className="container-x grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <p className="eyebrow">Our promise</p>
            <h2 className="mt-2.5 sm:mt-3 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary leading-tight">
              A Travel Experience Built On Care
            </h2>
            <p className="mt-3.5 sm:mt-5 text-sm sm:text-base text-muted-foreground leading-relaxed">
              We listen first, plan carefully and stay in touch throughout your journey. Traveller stories will appear here as our guests share them.
            </p>
            <Button asChild variant="gold" size="xl" className="mt-6 sm:mt-8 w-full sm:w-auto">
              <Link to="/plan-trip" className="inline-flex items-center gap-2">
                <Plane className="size-4" />
                <span>Start Planning</span>
              </Link>
            </Button>
          </div>
          <img
            src={images.kerala}
            alt="Kerala houseboat"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lift"
          />
        </div>
      </section>
    </>
  );
}
