import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  Compass,
  Globe2,
  Map,
  Sparkles,
  HeartHandshake,
  CalendarCheck,
  Plane,
  Headphones,
  Layers,
  ArrowRight,
  Star,
  Quote,
  CheckCircle2,
  Users,
  Search,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DestinationCard, PackageCard, SectionHead } from "@/components/site/Cards";
import { fieldClass } from "@/components/site/EnquiryForm";
import { destinations, images, packages, categories } from "@/data/catalog";
import { site, waLink, waMessages } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shiv Shakti Holidays — Bespoke Luxury Holidays & Custom Trips" },
      { name: "description", content: "Curated domestic and international holiday packages, honeymoons, and bespoke itineraries planned around you." },
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
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between overflow-hidden">
        <img
          src={images.hero}
          alt="Overwater villas in the Maldives at sunset"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        {/* Editorial multi-gradient luxury overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/75 via-primary/45 to-primary/95" />
        <div className="absolute inset-0 bg-radial-[at_top_right] from-accent/20 via-transparent to-transparent opacity-60" />

        <div className="container-x relative z-10 flex flex-1 flex-col justify-center pb-20 pt-28 sm:pb-32 sm:pt-36 text-primary-foreground">
          <div className="max-w-3xl animate-fade-up">
            {/* Luxury pill badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-primary/50 px-3.5 py-1.5 backdrop-blur-md shadow-xs">
              <Sparkles className="size-3.5 text-accent animate-pulse" />
              <span className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-accent">
                Bespoke Luxury Escapes & Curated Journeys
              </span>
            </div>

            <h1 className="mt-5 text-3.5xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.08] sm:leading-[1.05] font-semibold font-display tracking-tight text-white drop-shadow-sm">
              Discover The World.<br />
              <em className="text-accent italic font-normal block sm:inline">Create Memories Forever.</em>
            </h1>

            <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg text-primary-foreground/90 leading-relaxed font-sans font-normal">
              From pristine overwater villas in the Maldives to royal palaces in Rajasthan, discover tailored holidays handcrafted exclusively around your dreams.
            </p>

            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3">
              <Button asChild variant="gold" size="xl" className="w-full sm:w-auto shadow-lift hover:scale-102">
                <Link to="/packages" className="inline-flex items-center gap-2">
                  <span>Explore Holiday Packages</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="glass" size="xl" className="w-full sm:w-auto hover:scale-102">
                <Link to="/plan-trip">Plan Bespoke Trip</Link>
              </Button>
            </div>

            {/* Quick Trust Highlights in Hero */}
            <div className="mt-10 sm:mt-14 flex flex-wrap items-center gap-6 sm:gap-10 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/80">
              <div className="flex items-center gap-2.5">
                <span className="grid size-7 place-items-center rounded-full bg-accent/20 text-accent font-display font-bold text-sm">✦</span>
                <div>
                  <strong className="block font-semibold text-white">500+ Curated Trips</strong>
                  <span className="text-[0.72rem] text-primary-foreground/70">Custom tailored itineraries</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="grid size-7 place-items-center rounded-full bg-accent/20 text-accent font-display font-bold text-sm">★</span>
                <div>
                  <strong className="block font-semibold text-white">4.9 / 5 Guest Rating</strong>
                  <span className="text-[0.72rem] text-primary-foreground/70">Verified traveler praises</span>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="grid size-7 place-items-center rounded-full bg-accent/20 text-accent font-display font-bold text-sm">24/7</span>
                <div>
                  <strong className="block font-semibold text-white">Dedicated Concierge</strong>
                  <span className="text-[0.72rem] text-primary-foreground/70">Personal travel specialist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= LUXURY HOLIDAY FINDER CONCIERGE BAR ================= */}
      <section className="relative z-20 -mt-10 sm:-mt-16 lg:-mt-14">
        <div className="container-x">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              navigate({ to: "/plan-trip" });
            }}
            className="rounded-3xl border border-border/80 bg-card/95 p-5 sm:p-7 shadow-lift backdrop-blur-xl"
          >
            {/* Header label inside booking bar */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-full bg-accent/15 text-accent">
                  <Compass className="size-4" />
                </span>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-widest text-primary">
                    Find Your Bespoke Holiday
                  </span>
                  <span className="hidden md:inline text-xs text-muted-foreground ml-2">
                    · Tell us where and when you wish to travel
                  </span>
                </div>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-accent">
                <Sparkles className="size-3" /> Best Rate Guaranteed
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
              {/* Destination */}
              <div className="relative">
                <input placeholder="Destination (e.g. Bali, Kashmir)" className={fieldClass} />
              </div>

              {/* Departure City */}
              <div className="relative">
                <input placeholder="Departure City (e.g. Mumbai)" className={fieldClass} />
              </div>

              {/* Departure Date */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground lg:hidden">
                  Departure Date
                </label>
                <input type="date" aria-label="Departure date" className={fieldClass} />
              </div>

              {/* Return Date */}
              <div className="flex flex-col gap-1">
                <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground lg:hidden">
                  Return Date
                </label>
                <input type="date" aria-label="Return date" className={fieldClass} />
              </div>

              {/* Adults & Kids */}
              <div className="grid grid-cols-2 gap-2">
                <input type="number" min={1} placeholder="Adults" className={fieldClass} />
                <input type="number" min={0} placeholder="Kids" className={fieldClass} />
              </div>

              {/* Category */}
              <div>
                <select className={fieldClass} defaultValue="">
                  <option value="" disabled>Holiday Style</option>
                  {categories.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>

              {/* Submit CTA */}
              <Button
                type="submit"
                variant="navy"
                className="h-11 sm:h-full min-h-11 sm:col-span-2 lg:col-span-1 shadow-soft hover:shadow-lift transition-all flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
              >
                <Search className="size-4" />
                <span>Find Holidays</span>
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* ================= TRUST & EXCELLENCE STRIP ================= */}
      <section className="bg-background py-10 sm:py-14 md:py-16">
        <div className="container-x grid grid-cols-2 gap-3.5 sm:gap-6 md:grid-cols-4">
          {[
            [Map, "Domestic Escapes", "Iconic retreats across India"],
            [Globe2, "Global Adventures", "Handpicked escapes worldwide"],
            [Sparkles, "Tailored Luxury", "Itineraries shaped around you"],
            [Headphones, "Dedicated Concierge", "Personal 24/7 travel care"],
          ].map(([I, t, d]) => {
            const Icon = I as typeof Map;
            return (
              <div
                key={t as string}
                className="group flex flex-col items-center text-center rounded-2xl border border-border/60 bg-card/70 p-4 sm:p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft"
              >
                <span className="grid size-12 place-items-center rounded-full bg-accent/15 text-accent transition-transform duration-300 group-hover:scale-110">
                  <Icon className="size-5 sm:size-6" strokeWidth={1.5} />
                </span>
                <span className="mt-3 text-sm font-semibold text-primary">{t as string}</span>
                <span className="mt-1 text-xs text-muted-foreground hidden sm:block">{d as string}</span>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= CURATED DESTINATIONS ================= */}
      <section className="py-14 sm:py-20 md:py-24 bg-card/30">
        <div className="container-x">
          <SectionHead
            eyebrow="Curated Escapes"
            title="Where Would You Like To Go?"
            text="Explore extraordinary destinations handpicked for sublime landscapes, rich cultures, and unforgettable moments."
          />

          {/* Luxury Switch Tabs */}
          <div className="mt-8 sm:mt-10 flex justify-center">
            <div className="inline-flex rounded-full border border-border/80 bg-muted/60 p-1 backdrop-blur-md shadow-xs">
              {(["international", "domestic"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                    tab === t
                      ? "bg-primary text-primary-foreground shadow-soft"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {t === "international" ? "International Curations" : "Incredible India"}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 sm:mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((d) => (
              <DestinationCard key={d.slug} d={d} />
            ))}
          </div>

          <div className="mt-10 sm:mt-12 text-center">
            <Button asChild variant="navy" size="xl" className="w-full sm:w-auto shadow-soft hover:shadow-lift">
              <Link to="/destinations" className="inline-flex items-center gap-2">
                <span>View All 50+ Destinations</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ================= SIGNATURE ITINERARIES (JOURNEYS WE LOVE) ================= */}
      <section className="bg-muted/70 py-14 sm:py-20 md:py-24 border-y border-border/50">
        <div className="container-x">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
            <SectionHead
              center={false}
              eyebrow="Signature Packages"
              title="Journeys We Love"
              text="Sample itineraries curated by our travel specialists — every trip can be tailored to your pace and preferences."
            />
            <Button asChild variant="outline" className="rounded-full w-full sm:w-auto shrink-0 border-accent/40 text-primary hover:bg-primary hover:text-primary-foreground">
              <Link to="/packages" className="inline-flex items-center gap-2">
                <span>Browse All Packages</span>
                <ArrowRight className="size-4" />
              </Link>
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

      {/* ================= HONEYMOON & ROMANCE EDITORIAL SHOWCASE ================= */}
      <section className="grid md:grid-cols-2 overflow-hidden border-b border-border/60">
        <div className="relative min-h-[18rem] sm:min-h-[24rem] md:min-h-[32rem]">
          <img
            src={images.europe}
            alt="Santorini sunset with luxury infinity view"
            loading="lazy"
            className="absolute inset-0 size-full object-cover transition-transform duration-1000 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent md:hidden" />
          
          {/* Floating luxury stamp */}
          <div className="absolute bottom-5 left-5 z-10 sm:bottom-8 sm:left-8">
            <div className="rounded-2xl border border-white/20 bg-primary/80 p-4 text-white backdrop-blur-md shadow-lift max-w-xs">
              <span className="flex items-center gap-1.5 text-[0.65rem] font-semibold uppercase tracking-wider text-accent">
                <Sparkles className="size-3" /> Voted Best Honeymoon Specialist
              </span>
              <p className="mt-1 text-xs text-white/90">
                Overwater bungalows, private candlelit dinners, and tailored romantic retreats.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center bg-primary p-7 sm:p-12 md:p-16 lg:p-20 text-primary-foreground">
          <div className="max-w-xl">
            <div className="flex items-center gap-2">
              <span className="h-px w-6 bg-accent/70" />
              <p className="eyebrow text-accent">Exclusive Romance Collection</p>
            </div>
            <h2 className="mt-3 text-3xl sm:text-4xl md:text-5xl leading-tight font-display text-white">
              Make Your Beginning Unforgettable.
            </h2>
            <p className="mt-4 text-sm sm:text-base text-primary-foreground/80 leading-relaxed font-sans font-light">
              Private pool villas, scenic sunsets, and bespoke romantic touches — from the Maldives and Santorini to Kashmir, Udaipur, and Switzerland.
            </p>

            {/* Romance Highlights List */}
            <ul className="mt-6 space-y-2.5 text-xs sm:text-sm text-primary-foreground/85">
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-accent shrink-0" />
                <span>Handpicked romantic suites & overwater villas with private pools</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-accent shrink-0" />
                <span>Complimentary couple experiences, spa sessions & sunset cruises</span>
              </li>
              <li className="flex items-center gap-2.5">
                <CheckCircle2 className="size-4 text-accent shrink-0" />
                <span>Seamless private chauffeur transfers & 24/7 dedicated concierge</span>
              </li>
            </ul>

            <Button asChild variant="gold" size="xl" className="mt-8 w-full sm:w-auto shadow-lift hover:scale-102">
              <Link to="/honeymoon" className="inline-flex items-center gap-2">
                <span>Plan Your Dream Honeymoon</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="py-14 sm:py-20 md:py-24 bg-background">
        <div className="container-x">
          <SectionHead
            eyebrow="The Fine Art of Travel"
            title="Your Dreams. Our Travel Planning."
            text="We believe luxury is found in the details. Discover why travelers choose Shiv Shakti Holidays for their signature journeys."
          />

          <div className="mt-8 sm:mt-12 md:mt-14 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              [Sparkles, "Customized Travel Experiences", "Every itinerary is tailored around your personal interests, preferred pace, and budget."],
              [Globe2, "Domestic & International", "From the majestic Himalayas to the Swiss Alps, one trusted team for all your journeys."],
              [Compass, "Thoughtfully Paced Days", "Balanced days blending iconic must-see sights with leisure time to relax and recharge."],
              [Layers, "Multiple Holiday Styles", "Honeymoons, family holidays, spiritual pilgrimages, adventure escapes, and ultra-luxury stays."],
              [HeartHandshake, "Personalized Assistance", "Dedicated travel planners who assist you before, during, and after your trip."],
              [CalendarCheck, "Effortless Booking & Support", "Get instant quotes and customize your journey in minutes via WhatsApp, call, or form."],
            ].map(([I, t, d]) => {
              const Icon = I as typeof Map;
              return (
                <div
                  key={t as string}
                  className="group relative rounded-2xl border border-border/70 bg-card p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-soft"
                >
                  <div className="grid size-12 place-items-center rounded-xl bg-accent/15 text-accent transition-transform duration-300 group-hover:scale-110">
                    <Icon className="size-6 text-accent" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 text-lg sm:text-xl font-semibold text-primary font-display group-hover:text-secondary transition-colors">
                    {t as string}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    {d as string}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================= GUEST STORIES / TESTIMONIALS ================= */}
      <section className="bg-muted/50 py-14 sm:py-20 md:py-24 border-y border-border/50">
        <div className="container-x">
          <SectionHead
            eyebrow="Guest Praises"
            title="Stories From Our Travellers"
            text="Read how our guests experienced sublime journeys and effortless hospitality."
          />

          <div className="mt-10 sm:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "Every detail of our Bali honeymoon was flawlessly orchestrated. From the private pool villa to the sunset dinner, it was truly magical.",
                author: "Rohan & Sneha M.",
                city: "Mumbai",
                pkg: "Bali Romantic Escape",
                rating: 5,
              },
              {
                quote: "The Switzerland trip was a dream come true for our family. Scenic train passes, breathtaking mountain hotels, and 24/7 care on WhatsApp made it effortless.",
                author: "Ananya & Vikram K.",
                city: "New Delhi",
                pkg: "Switzerland Scenic Escape",
                rating: 5,
              },
              {
                quote: "The luxury houseboat in Kerala and private tea estate stay in Munnar exceeded all expectations. Shiv Shakti Holidays provides genuine 5-star planning.",
                author: "Dr. Rajesh Patel",
                city: "Ahmedabad",
                pkg: "Kerala Backwaters & Hills",
                rating: 5,
              },
            ].map((review, i) => (
              <div
                key={i}
                className="relative flex flex-col justify-between rounded-2xl border border-border/70 bg-card p-6 sm:p-8 shadow-xs transition-all duration-300 hover:shadow-soft hover:border-accent/40"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex items-center gap-1 text-accent">
                    {[...Array(review.rating)].map((_, idx) => (
                      <Star key={idx} className="size-4 fill-accent" />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="mt-4 text-xs sm:text-sm text-foreground/80 italic leading-relaxed">
                    "{review.quote}"
                  </p>
                </div>

                <div className="mt-6 border-t border-border/60 pt-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-primary">{review.author}</h4>
                    <span className="text-[0.72rem] text-muted-foreground">{review.city}</span>
                  </div>
                  <span className="rounded-full bg-accent/10 px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-wider text-accent">
                    {review.pkg}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOUR STEPS TO YOUR JOURNEY ================= */}
      <section className="bg-primary py-14 sm:py-20 md:py-24 text-primary-foreground relative overflow-hidden">
        {/* Subtle decorative background glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 size-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 size-96 rounded-full bg-secondary/20 blur-3xl" />

        <div className="container-x relative z-10">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2">
              <span className="h-px w-6 bg-accent/70" />
              <p className="eyebrow text-accent">How It Works</p>
              <span className="h-px w-6 bg-accent/70" />
            </div>
            <h2 className="mt-3 text-2.5xl sm:text-4xl md:text-5xl leading-tight font-display text-white">
              Four Steps To Your Journey
            </h2>
            <p className="mt-3 text-sm sm:text-base text-primary-foreground/75 max-w-lg mx-auto">
              From first spark of inspiration to your journey back home, we make travel seamless.
            </p>
          </div>

          <div className="mt-10 sm:mt-14 md:mt-16 grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[
              ["Discover Your Destination", "Browse our curated domestic and international destinations or ask for personalized recommendations."],
              ["Share Your Preferences", "Tell us your preferred dates, party size, travel style, and special requests."],
              ["Receive Custom Itinerary", "Our travel specialists handcraft a detailed day-by-day plan with transparent pricing."],
              ["Confirm & Travel In Style", "Finalize arrangements, receive travel vouchers, and enjoy 24/7 on-ground assistance."],
            ].map(([t, d], i) => (
              <div
                key={t}
                className="relative rounded-2xl border border-accent/25 bg-primary-foreground/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-accent/60"
              >
                <span className="font-display text-4xl sm:text-5xl font-bold text-accent block">
                  0{i + 1}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white font-display">{t}</h3>
                <p className="mt-2 text-xs sm:text-sm text-primary-foreground/75 leading-relaxed font-light">
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= BESPOKE TRAVEL DESIGNER / VIP CONCIERGE BANNER ================= */}
      <section className="py-14 sm:py-20 md:py-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-primary via-primary/95 to-secondary p-8 sm:p-12 md:p-16 text-primary-foreground shadow-lift">
            <div className="relative z-10 max-w-2xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/20 px-3.5 py-1 text-[0.68rem] font-semibold uppercase tracking-widest text-accent backdrop-blur-md">
                <Sparkles className="size-3" /> Private Concierge & VIP Planning
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-display font-semibold text-white leading-tight">
                Looking For Something Truly Unique?
              </h2>
              <p className="mt-4 text-sm sm:text-base text-primary-foreground/80 leading-relaxed font-light">
                Speak directly with our senior travel designers. Whether it's an anniversary escape, a multi-country family tour, or a corporate retreat, we craft completely bespoke itineraries from scratch.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3.5">
                <Button asChild variant="gold" size="xl" className="shadow-lift hover:scale-102">
                  <a
                    href={waLink(waMessages.general)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="size-4" />
                    <span>Chat With Travel Designer</span>
                  </a>
                </Button>
                <Button asChild variant="glass" size="xl" className="hover:scale-102">
                  <Link to="/plan-trip" className="inline-flex items-center justify-center gap-2">
                    <Plane className="size-4" />
                    <span>Plan Online in 2 Minutes</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Decorative subtle luxury watermark */}
            <div className="absolute right-0 bottom-0 translate-x-1/4 translate-y-1/4 opacity-10 pointer-events-none">
              <Compass className="size-96 text-accent" strokeWidth={0.5} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
