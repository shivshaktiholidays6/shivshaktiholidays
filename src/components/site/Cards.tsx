import Link from "next/link";
import { ArrowUpRight, Clock, MapPin, Sparkles, Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/site/ResponsiveImage";
import { type Destination, type Pkg } from "@/data/catalog";
import { waLink } from "@/config/site";

export function DestinationCard({
  d,
  tall,
  compactMobile = false,
}: {
  d: Destination;
  tall?: boolean;
  compactMobile?: boolean;
}) {
  return (
    <Link
      href={`/destinations/${d.slug}`}
      className={`group relative block overflow-hidden rounded-xl border border-border/40 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-lift sm:rounded-2xl ${
        compactMobile
          ? tall
            ? "aspect-[4/5] sm:aspect-[3/4]"
            : "aspect-[4/5]"
          : tall
            ? "aspect-[3/4]"
            : "aspect-[4/5]"
      }`}
    >
      <ResponsiveImage
        src={d.image}
        alt={d.imageAlt}
        focalPoint={d.imagePosition}
        fill
        sizes="(max-width: 639px) 46vw, (max-width: 1023px) 48vw, 25vw"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/35 to-transparent" />
      <div className={`${compactMobile ? "left-2 top-2" : "left-3.5 top-3.5"} absolute z-10 sm:left-4 sm:top-4`}>
        <span className="inline-flex items-center gap-1 rounded-full border border-card/40 bg-card/85 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-wider text-primary shadow-xs backdrop-blur-md sm:px-2.5 sm:text-[0.62rem]">
          <Sparkles className="size-2.5 text-accent" aria-hidden="true" />
          <span>Curated</span>
        </span>
      </div>
      <div className={`absolute inset-x-0 bottom-0 z-10 text-primary-foreground ${compactMobile ? "p-3" : "p-4"} sm:p-5`}>
        <p className={`${compactMobile ? "text-[0.56rem] tracking-[0.18em]" : "eyebrow"} font-semibold uppercase text-accent/90 sm:text-[0.72rem] sm:tracking-[0.28em]`}>
          {d.region}
        </p>
        <h3 className={`${compactMobile ? "mt-0.5 text-base leading-tight" : "mt-1 text-xl"} font-display font-semibold text-white transition-colors group-hover:text-accent sm:mt-1 sm:text-2xl`}>
          {d.name}
        </h3>
        <p className={`${compactMobile ? "hidden sm:line-clamp-2" : "line-clamp-2"} mt-1.5 text-xs font-sans leading-relaxed text-primary-foreground/80 sm:text-sm`}>
          {d.blurb}
        </p>
        <div className={`${compactMobile ? "hidden sm:flex" : "flex"} mt-3 items-center justify-between border-t border-primary-foreground/15 pt-2.5`}>
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-accent transition-all group-hover:tracking-widest">
            Explore Destination{" "}
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function PackageCard({ p }: { p: Pkg }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border/70 bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift sm:rounded-2xl">
      <Link
        href={`/packages/${p.slug}`}
        className="relative block aspect-[16/9] overflow-hidden sm:aspect-[4/3]"
      >
        <ResponsiveImage
          src={p.image}
          alt={p.imageAlt}
          focalPoint={p.imagePosition}
          fill
          sizes="(max-width: 639px) 94vw, (max-width: 1023px) 48vw, 33vw"
          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        <span
          className={`absolute left-2.5 top-2.5 rounded-full border px-2.5 py-1 text-[0.58rem] font-bold uppercase tracking-wider shadow-xs backdrop-blur-md sm:left-4 sm:top-4 sm:px-3 sm:text-[0.65rem] ${p.mostBooked ? "gold-gradient border-accent/60 text-accent-foreground" : "bg-card/90 border-border/50 text-primary"}`}
        >
          {p.mostBooked ? "Most Booked" : p.types[0]}
        </span>
        <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-full border border-accent/20 bg-primary/80 px-2 py-1 text-[0.6rem] font-semibold text-accent backdrop-blur-md sm:right-4 sm:top-4 sm:px-2.5 sm:text-[0.65rem]">
          <Star className="size-3 fill-accent text-accent" />
          <span>4.9</span>
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-3.5 sm:p-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex min-w-0 items-center gap-1 font-medium text-foreground/85">
            <MapPin className="size-3.5 text-accent" />
            <span className="truncate">{p.place}</span>
          </span>
          <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground">
            <Clock className="size-3 text-accent" />
            {p.nights}N / {p.nights + 1}D
          </span>
        </div>
        <h3 className="mt-2 text-base font-semibold leading-snug text-primary transition-colors group-hover:text-secondary sm:text-xl font-display">
          {p.name}
        </h3>
        <p className="mt-1 line-clamp-1 text-xs leading-relaxed text-muted-foreground sm:mt-1.5 sm:line-clamp-2 sm:text-sm">
          {p.summary}
        </p>
        <div className="mt-3 flex items-end justify-between border-t border-border/70 pt-3 sm:mt-4 sm:pt-3.5">
          <div>
            <span className="block text-[0.65rem] uppercase tracking-wider text-muted-foreground">
              Starting from*
            </span>
            <div className="mt-0.5 flex items-baseline gap-1.5">
              <span className="font-sans text-xl font-bold tracking-[-0.035em] text-primary tabular-nums sm:text-2xl">
                <span className="mr-0.5 text-[0.82em] font-semibold text-accent">₹</span>
                {p.price.toLocaleString("en-IN")}
              </span>
              <span className="text-[0.68rem] font-medium text-muted-foreground">per person</span>
            </div>
          </div>
          <span className="hidden text-[0.68rem] font-semibold uppercase tracking-wider text-accent sm:block">
            All-Inclusive
          </span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:mt-4">
          <Button asChild variant="navy" size="sm" className="w-full text-xs sm:text-sm">
            <Link href={`/packages/${p.slug}`}>View Details</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="w-full text-xs font-semibold uppercase tracking-wider border-accent/40 text-primary hover:bg-accent hover:text-accent-foreground"
          >
            <a
              href={waLink(
                `Hello Shiv Shakti Holidays, I'm interested in the "${p.name}" package. Please share details.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1.5"
            >
              <MessageCircle className="size-3.5 text-accent" />
              <span>Enquire</span>
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
  center = true,
}: {
  eyebrow: string;
  title: string;
  text?: string | undefined;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={`flex items-center gap-2.5 ${center ? "justify-center" : ""}`}>
        <span className="h-px w-6 bg-accent/70" />
        <p className="eyebrow">{eyebrow}</p>
        <span className="h-px w-6 bg-accent/70" />
      </div>
      <h2 className="mt-2.5 sm:mt-3 text-2.5xl sm:text-4xl md:text-5xl text-primary leading-tight font-display">
        {title}
      </h2>
      {text && (
        <p
          className={`mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed ${center ? "max-w-xl mx-auto" : ""}`}
        >
          {text}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  image,
  imageAlt,
  imagePosition = "center",
  eyebrow,
  title,
  text,
  children,
}: {
  image: string;
  imageAlt?: string;
  imagePosition?: string;
  eyebrow: string;
  title: string;
  text?: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden">
      <ResponsiveImage
        src={image}
        alt={imageAlt ?? `${title} travel experience`}
        focalPoint={imagePosition}
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-overlay" />
      <div className="container-x relative pb-20 pt-36 text-primary-foreground animate-fade-up">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl whitespace-pre-line text-5xl leading-[1.05] md:text-7xl">
          {title}
        </h1>
        {text && <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">{text}</p>}
        {children}
      </div>
    </section>
  );
}
