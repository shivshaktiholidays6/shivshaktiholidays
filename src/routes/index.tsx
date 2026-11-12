import Link from "next/link";
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
  CheckCircle2,
  Users,
  MessageCircle,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PackageCard, SectionHead } from "@/components/site/Cards";
import { SectionCTA } from "@/components/site/SectionCTA";
import { ResponsiveImage } from "@/components/site/ResponsiveImage";
import { CuratedDestinations } from "@/components/site/home/CuratedDestinations";
import { HolidayFinder } from "@/components/site/home/HolidayFinder";
import { HomeHero } from "@/components/site/home/HomeHero";
import { TestimonialsCarousel } from "@/components/site/home/TestimonialsCarousel";
import {
  categories,
  destinations,
  mostBookedPackageSlugs,
  packages,
  type Destination,
  type Pkg,
} from "@/data/catalog";
import { site, waLink, waMessages } from "@/config/site";
import worldEscapesHero from "@/assets/home-v2/international-hero.webp";
import kashmirHero from "@/assets/home-v2/kashmir-hero.webp";
import kedarnathHero from "@/assets/home-v2/kedarnath-hero.webp";
import honeymoonMaldives from "@/assets/home-v2/honeymoon-maldives.webp";
import dubaiHero from "@/assets/home-v2/dubai-burj-full-v2.webp";
import londonHero from "@/assets/home-v2/london-westminster.webp";
import thailandHero from "@/assets/thailand.webp";
import singaporeHero from "@/assets/singapore.webp";
import baliHero from "@/assets/bali.jpg";
import keralaHero from "@/assets/kerala.jpg";
import rajasthanHero from "@/assets/rajasthan.jpg";
import goaHero from "@/assets/goa.webp";

const homeHeroSlides = [
  {
    id: "world",
    label: "World Escapes",
    badge: "Personalized Luxury Escapes & Curated Journeys",
    title: "Discover The World.",
    accent: "Create Memories Forever.",
    description:
      "From breathtaking Alpine views to iconic European cities, discover international holidays planned around your dreams.",
    image: worldEscapesHero.src,
    alt: "Swiss Alpine village beside a turquoise lake and snow-capped mountains",
    focalPoint: "65% center",
    href: "/international",
    cta: "Explore International Holidays",
  },
  {
    id: "india",
    label: "India, Beautifully",
    badge: "Handpicked Indian Holidays",
    title: "Fall In Love With India.",
    accent: "Every Journey Tells A Story.",
    description:
      "Snow-draped Kashmir, royal Rajasthan and serene Kerala—experience India through journeys designed with warmth, comfort and care.",
    image: kashmirHero.src,
    alt: "Shikara on Dal Lake beneath the snow-capped mountains of Kashmir",
    focalPoint: "65% center",
    href: "/domestic",
    cta: "Discover India Packages",
  },
  {
    id: "spiritual",
    label: "Journeys Of Faith",
    badge: "Sacred Journeys, Thoughtfully Planned",
    title: "Travel With Faith.",
    accent: "Return With Blessings.",
    description:
      "Walk the sacred paths of Char Dham with carefully planned stays, trusted transport and personal assistance throughout your yatra.",
    image: kedarnathHero.src,
    alt: "Kedarnath Temple surrounded by snow-covered Himalayan mountains",
    focalPoint: "68% center",
    href: "/packages/char-dham-yatra",
    cta: "Explore Char Dham Yatra",
  },
  {
    id: "dubai",
    label: "Dubai",
    badge: "Iconic City Escapes",
    title: "Rise Above The Ordinary.",
    accent: "Dubai Awaits.",
    description:
      "See the Burj Khalifa, golden deserts and dazzling waterfronts on a Dubai holiday designed around you.",
    image: dubaiHero.src,
    alt: "Burj Khalifa and the Dubai skyline glowing at sunset",
    focalPoint: "72% center",
    href: "/destinations/dubai",
    cta: "Explore Dubai",
  },
  {
    id: "thailand",
    label: "Thailand",
    badge: "Thailand Explorer",
    title: "Tropical Days.",
    accent: "Unforgettable Nights.",
    description:
      "Sail between limestone islands, unwind on clear-water beaches and discover Thailand's vibrant culture.",
    image: thailandHero.src,
    alt: "Traditional long-tail boat on a turquoise beach in Thailand",
    focalPoint: "35% center",
    href: "/destinations/thailand",
    cta: "Explore Thailand",
  },
  {
    id: "london",
    label: "London",
    badge: "Timeless British Escape",
    title: "Meet A City Of Icons.",
    accent: "London Never Stands Still.",
    description:
      "Walk beside the Thames, see Big Ben and discover royal landmarks, celebrated culture and timeless neighbourhoods.",
    image: londonHero.src,
    alt: "Big Ben and the Palace of Westminster beside the River Thames at golden hour",
    focalPoint: "70% center",
    href: "/international",
    cta: "Explore London Holidays",
  },
  {
    id: "singapore",
    label: "Singapore",
    badge: "The Lion City",
    title: "Future Meets Culture.",
    accent: "Welcome To Singapore.",
    description:
      "Discover dazzling gardens, iconic architecture and world-class experiences in one effortless city escape.",
    image: singaporeHero.src,
    alt: "Marina Bay Sands and Gardens by the Bay in Singapore",
    focalPoint: "50% center",
    href: "/destinations/singapore",
    cta: "Explore Singapore",
  },
  {
    id: "bali",
    label: "Bali",
    badge: "Island Of The Gods",
    title: "Slow Down In Paradise.",
    accent: "Bali Is Calling.",
    description:
      "Temple sunrises, emerald rice terraces and private villas create a restorative island journey.",
    image: baliHero.src,
    alt: "Balinese temple and green rice terraces at sunrise",
    focalPoint: "65% center",
    href: "/destinations/bali",
    cta: "Explore Bali",
  },
  {
    id: "kerala",
    label: "Kerala",
    badge: "God's Own Country",
    title: "Drift Into Calm.",
    accent: "Experience Kerala.",
    description:
      "Cruise peaceful backwaters, stay among palms and discover the warm flavours of southern India.",
    image: keralaHero.src,
    alt: "Traditional houseboat on the palm-lined Kerala backwaters",
    focalPoint: "50% center",
    href: "/destinations/kerala",
    cta: "Explore Kerala",
  },
  {
    id: "rajasthan",
    label: "Rajasthan",
    badge: "Royal Indian Journeys",
    title: "Live A Royal Story.",
    accent: "Rediscover Rajasthan.",
    description:
      "Palaces, desert sunsets and timeless hospitality come together in India's most regal escape.",
    image: rajasthanHero.src,
    alt: "Historic lakeside palace in Rajasthan at sunset",
    focalPoint: "30% center",
    href: "/destinations/rajasthan",
    cta: "Explore Rajasthan",
  },
  {
    id: "goa",
    label: "Goa",
    badge: "Sun, Sea & Heritage",
    title: "Find Your Easy Rhythm.",
    accent: "Goa Feels Different.",
    description:
      "Golden beaches, Portuguese heritage and relaxed coastal days make every Goa escape feel effortless.",
    image: goaHero.src,
    alt: "Golden beach and Portuguese church on the coast of Goa",
    focalPoint: "70% center",
    href: "/destinations/goa",
    cta: "Explore Goa",
  },
] as const;

const internationalCuratedSlugs = [
  "maldives",
  "bali",
  "switzerland",
  "dubai",
  "greece",
  "thailand",
];
const domesticCuratedSlugs = [
  "kashmir",
  "kerala",
  "rajasthan",
  "goa",
  "himachal-pradesh",
  "andaman-and-nicobar-islands",
];

export default function Home({
  packageItems = packages,
  destinationItems = destinations,
}: {
  packageItems?: Pkg[];
  destinationItems?: Destination[];
}) {
  const featuredInternational = destinationItems.filter(
    (item) => item.scope === "international" && item.featured,
  );
  const featuredDomestic = destinationItems.filter(
    (item) => item.scope === "domestic" && item.featured,
  );
  const internationalDestinations = [
    ...featuredInternational,
    ...destinationItems.filter(
      (item) =>
        internationalCuratedSlugs.includes(item.slug) &&
        !featuredInternational.some((featured) => featured.slug === item.slug),
    ),
  ].slice(0, 6);
  const domesticDestinations = [
    ...featuredDomestic,
    ...destinationItems.filter(
      (item) =>
        domesticCuratedSlugs.includes(item.slug) &&
        !featuredDomestic.some((featured) => featured.slug === item.slug),
    ),
  ].slice(0, 6);
  return (
    <>
      <HomeHero slides={homeHeroSlides} />
      <HolidayFinder categories={categories} />

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
                <span className="mt-1 text-xs text-muted-foreground hidden sm:block">
                  {d as string}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <PopularPackagesSection packageItems={packageItems} />

      <CuratedDestinations
        internationalDestinations={internationalDestinations}
        domesticDestinations={domesticDestinations}
      />

      {/* ================= HONEYMOON & ROMANCE EDITORIAL SHOWCASE ================= */}
      <section className="grid md:grid-cols-2 overflow-hidden border-b border-border/60">
        <div className="relative min-h-[18rem] sm:min-h-[24rem] md:min-h-[32rem]">
          <ResponsiveImage
            src={honeymoonMaldives}
            alt="Couple enjoying a sunset from a private overwater villa in the Maldives"
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="absolute inset-0 size-full object-cover object-[62%_center] transition-transform duration-1000 hover:scale-105 md:object-center"
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
              Private pool villas, scenic sunsets, and personalized romantic touches — from the
              Maldives and Santorini to Kashmir, Udaipur, and Switzerland.
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

            <Button
              asChild
              variant="gold"
              size="xl"
              className="mt-8 w-full sm:w-auto shadow-lift hover:scale-102"
            >
              <Link href="/honeymoon" className="inline-flex items-center gap-2">
                <span>Plan Your Dream Honeymoon</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="overflow-hidden bg-background py-10 sm:py-20 md:py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="The Fine Art of Travel"
            title="Your Dreams. Our Travel Planning."
            text="Based in Roorkee, Uttarakhand, Shiv Shakti Holidays plans thoughtful domestic and international journeys around your interests, pace and budget."
          />

          <div className="mt-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-12 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pb-0 md:mt-14 lg:grid-cols-3">
            {[
              [
                Sparkles,
                "Customized Travel Experiences",
                "Every itinerary is tailored around your personal interests, preferred pace, and budget.",
              ],
              [
                Globe2,
                "Domestic & International",
                "From the majestic Himalayas to the Swiss Alps, one trusted team for all your journeys.",
              ],
              [
                Compass,
                "Thoughtfully Paced Days",
                "Balanced days blending iconic must-see sights with leisure time to relax and recharge.",
              ],
              [
                Layers,
                "Multiple Holiday Styles",
                "Honeymoons, family holidays, spiritual pilgrimages, adventure escapes, and ultra-luxury stays.",
              ],
              [
                HeartHandshake,
                "Personalized Assistance",
                "Dedicated travel planners who assist you before, during, and after your trip.",
              ],
              [
                CalendarCheck,
                "Effortless Booking & Support",
                "Get instant quotes and customize your journey in minutes via WhatsApp, call, or form.",
              ],
            ].map(([I, t, d]) => {
              const Icon = I as typeof Map;
              return (
                <div
                  key={t as string}
                  className="group relative min-h-[168px] shrink-0 basis-[84%] snap-center rounded-2xl border border-border/70 bg-card p-4 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-soft sm:min-h-0 sm:basis-auto sm:p-8"
                >
                  <div className="grid size-10 place-items-center rounded-xl bg-accent/15 text-accent transition-transform duration-300 group-hover:scale-110 sm:size-12">
                    <Icon className="size-5 text-accent sm:size-6" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-3 text-base font-semibold text-primary font-display group-hover:text-secondary transition-colors sm:mt-5 sm:text-xl">
                    {t as string}
                  </h3>
                  <p className="mt-1.5 text-[0.72rem] leading-relaxed text-muted-foreground sm:mt-2 sm:text-sm">
                    {d as string}
                  </p>
                </div>
              );
            })}
          </div>
          <p className="mt-1 text-center text-[0.68rem] font-medium uppercase tracking-wider text-muted-foreground sm:hidden">
            Swipe to explore
          </p>
        </div>
      </section>

      {/* ================= GUEST STORIES / TESTIMONIALS ================= */}

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

          <div className="mt-8 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-6 md:mt-16 md:grid-cols-4">
            {[
              [
                "Discover Your Destination",
                "Browse our curated domestic and international destinations or ask for personalized recommendations.",
              ],
              [
                "Share Your Preferences",
                "Tell us your preferred dates, party size, travel style, and special requests.",
              ],
              [
                "Receive Custom Itinerary",
                "Our travel specialists handcraft a detailed day-by-day plan with transparent pricing.",
              ],
              [
                "Confirm & Travel In Style",
                "Finalize arrangements, receive travel vouchers, and enjoy 24/7 on-ground assistance.",
              ],
            ].map(([t, d], i) => (
              <div
                key={t}
                className="relative min-h-44 rounded-xl border border-accent/25 bg-primary-foreground/5 p-3.5 backdrop-blur-sm transition-all duration-300 hover:border-accent/60 sm:min-h-0 sm:rounded-2xl sm:p-6"
              >
                <span className="block font-display text-2xl font-bold text-accent sm:text-5xl">
                  0{i + 1}
                </span>
                <h3 className="mt-2 text-sm font-semibold leading-snug text-white font-display sm:mt-3 sm:text-lg">
                  {t}
                </h3>
                <p className="mt-1.5 line-clamp-3 text-[0.65rem] font-light leading-relaxed text-primary-foreground/75 sm:mt-2 sm:line-clamp-none sm:text-sm">
                  {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsCarousel />

      {/* ================= PERSONALIZED TRAVEL DESIGNER / VIP CONCIERGE BANNER ================= */}
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
                Speak directly with our senior travel designers. Whether it's an anniversary escape,
                a multi-country family tour, or a corporate retreat, we craft fully personalized
                itineraries from scratch.
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
                  <Link href="/plan-trip" className="inline-flex items-center justify-center gap-2">
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

function PopularPackagesSection({ packageItems }: { packageItems: Pkg[] }) {
  const slugs = mostBookedPackageSlugs.slice(0, 6);
  const preferred = packageItems.filter((item) => item.featured || item.mostBooked);
  const popularPackages = (
    preferred.length
      ? preferred
      : slugs.flatMap((slug) => {
          const packageItem = packageItems.find((item) => item.slug === slug);
          return packageItem ? [packageItem] : [];
        })
  ).slice(0, 6);

  return (
    <section className="bg-muted/70 py-14 sm:py-20 md:py-24 border-y border-border/50">
      <div className="container-x">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
          <SectionHead
            center={false}
            eyebrow="Popular Packages"
            title="Our Most Booked Journeys"
            text="Start with the holidays travellers request most, from sacred Himalayan journeys to vibrant international escapes."
          />
          <Button
            asChild
            variant="outline"
            className="rounded-full w-full sm:w-auto shrink-0 border-accent/40 text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link href="/packages" className="inline-flex items-center gap-2">
              <span>Browse All Packages</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-8 sm:mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {popularPackages.map((packageItem) => (
            <PackageCard key={packageItem.slug} p={packageItem} />
          ))}
        </div>
        <SectionCTA />
      </div>
    </section>
  );
}
