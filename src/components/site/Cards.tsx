import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, MapPin, Sparkles, Star, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR, type Destination, type Pkg } from "@/data/catalog";
import { waLink } from "@/config/site";

export function DestinationCard({ d, tall }: { d: Destination; tall?: boolean }) {
  return (
    <Link to="/destinations/$slug" params={{ slug: d.slug }}
      className={`group relative block overflow-hidden rounded-2xl border border-border/40 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-lift ${tall ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
      <img src={d.image} alt={d.name} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-out group-hover:scale-108" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/35 to-transparent" />
      <div className="absolute left-3.5 top-3.5 z-10 sm:left-4 sm:top-4">
        <span className="inline-flex items-center gap-1 rounded-full bg-card/85 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-wider text-primary backdrop-blur-md border border-card/40 shadow-xs">
          <Sparkles className="size-2.5 text-accent" />
          <span>Curated</span>
        </span>
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-primary-foreground z-10">
        <p className="eyebrow text-accent/90">{d.region}</p>
        <h3 className="mt-1 text-xl sm:text-2xl font-semibold text-white group-hover:text-accent transition-colors font-display">{d.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-xs sm:text-sm text-primary-foreground/80 font-sans leading-relaxed">{d.blurb}</p>
        <div className="mt-3 flex items-center justify-between border-t border-primary-foreground/15 pt-2.5">
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-accent transition-all group-hover:tracking-widest">
            Explore Destination <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </div>
    </Link>
  );
}

export function PackageCard({ p }: { p: Pkg }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-lift">
      <Link to="/packages/$slug" params={{ slug: p.slug }} className="relative block aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-106" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        <span className="absolute left-3 top-3 sm:left-4 sm:top-4 rounded-full bg-card/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-primary backdrop-blur-md border border-border/50 shadow-xs">{p.types[0]}</span>
        <span className="absolute right-3 top-3 sm:right-4 sm:top-4 inline-flex items-center gap-1 rounded-full bg-primary/80 px-2.5 py-1 text-[0.65rem] font-semibold text-accent backdrop-blur-md border border-accent/20">
          <Star className="size-3 fill-accent text-accent" />
          <span>4.9</span>
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1 font-medium text-foreground/85"><MapPin className="size-3.5 text-accent" />{p.place}</span>
          <span className="flex items-center gap-1 rounded-md bg-muted px-2 py-0.5 text-[0.7rem] font-medium text-muted-foreground"><Clock className="size-3 text-accent" />{p.nights}N / {p.nights + 1}D</span>
        </div>
        <h3 className="mt-2 text-lg sm:text-xl font-semibold text-primary leading-snug font-display group-hover:text-secondary transition-colors">{p.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">{p.summary}</p>
        <div className="mt-4 flex items-end justify-between border-t border-border/70 pt-3.5">
          <div>
            <span className="block text-[0.65rem] uppercase tracking-wider text-muted-foreground">Starting from*</span>
            <div className="flex items-baseline gap-1">
              <span className="font-display text-xl font-bold text-primary">{formatINR(p.price)}</span>
              <span className="text-[0.7rem] text-muted-foreground">/ person</span>
            </div>
          </div>
          <span className="text-[0.68rem] text-accent font-semibold uppercase tracking-wider">All-Inclusive</span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button asChild variant="navy" size="sm" className="w-full text-xs sm:text-sm"><Link to="/packages/$slug" params={{ slug: p.slug }}>View Details</Link></Button>
          <Button asChild variant="outline" size="sm" className="w-full text-xs font-semibold uppercase tracking-wider border-accent/40 text-primary hover:bg-accent hover:text-accent-foreground">
            <a href={waLink(`Hello Shiv Shakti Holidays, I'm interested in the "${p.name}" package. Please share details.`)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1.5">
              <MessageCircle className="size-3.5 text-accent" />
              <span>Enquire</span>
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function SectionHead({ eyebrow, title, text, center = true }: { eyebrow: string; title: string; text?: string | undefined; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <div className={`flex items-center gap-2.5 ${center ? "justify-center" : ""}`}>
        <span className="h-px w-6 bg-accent/70" />
        <p className="eyebrow">{eyebrow}</p>
        <span className="h-px w-6 bg-accent/70" />
      </div>
      <h2 className="mt-2.5 sm:mt-3 text-2.5xl sm:text-4xl md:text-5xl text-primary leading-tight font-display">{title}</h2>
      {text && <p className={`mt-3 sm:mt-4 text-sm sm:text-base text-muted-foreground leading-relaxed ${center ? "max-w-xl mx-auto" : ""}`}>{text}</p>}
    </div>
  );
}

export function PageHero({ image, eyebrow, title, text, children }: { image: string; eyebrow: string; title: string; text?: string; children?: React.ReactNode }) {
  return (
    <section className="relative flex min-h-[70vh] items-end overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-overlay" />
      <div className="container-x relative pb-20 pt-36 text-primary-foreground animate-fade-up">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-4 max-w-3xl whitespace-pre-line text-5xl leading-[1.05] md:text-7xl">{title}</h1>
        {text && <p className="mt-6 max-w-xl text-lg text-primary-foreground/80">{text}</p>}
        {children}
      </div>
    </section>
  );
}
