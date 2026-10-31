import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR, type Destination, type Pkg } from "@/data/catalog";
import { waLink } from "@/config/site";

export function DestinationCard({ d, tall }: { d: Destination; tall?: boolean }) {
  return (
    <Link to="/destinations/$slug" params={{ slug: d.slug }}
      className={`group relative block overflow-hidden rounded-2xl shadow-soft ${tall ? "aspect-[3/4]" : "aspect-[4/5]"}`}>
      <img src={d.image} alt={d.name} loading="lazy" className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-card-overlay" />
      <div className="absolute inset-x-0 bottom-0 p-5 text-primary-foreground">
        <p className="eyebrow">{d.region}</p>
        <h3 className="mt-1 text-2xl">{d.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-primary-foreground/75">{d.blurb}</p>
        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-accent">
          Explore <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </Link>
  );
}

export function PackageCard({ p }: { p: Pkg }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-card shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
      <Link to="/packages/$slug" params={{ slug: p.slug }} className="relative block aspect-[4/3] overflow-hidden">
        <img src={p.image} alt={p.name} loading="lazy" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
        <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-primary">{p.types[0]}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><MapPin className="size-3.5" />{p.place}</span>
        </div>
        <h3 className="mt-2 text-xl text-primary">{p.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.summary}</p>
        <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
          <span className="flex items-center gap-1 text-sm text-muted-foreground"><Clock className="size-4" />{p.nights}N / {p.nights + 1}D</span>
          <span className="text-right">
            <span className="block text-[0.65rem] uppercase tracking-wider text-muted-foreground">Starting from*</span>
            <span className="font-display text-xl font-semibold text-primary">{formatINR(p.price)}</span>
          </span>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button asChild variant="navy" size="sm"><Link to="/packages/$slug" params={{ slug: p.slug }}>View Details</Link></Button>
          <Button asChild variant="outline" size="sm" className="text-xs font-semibold uppercase tracking-wider">
            <a href={waLink(`Hello Shiv Shakti Holidays, I'm interested in the "${p.name}" package. Please share details.`)} target="_blank" rel="noreferrer">Enquire</a>
          </Button>
        </div>
      </div>
    </article>
  );
}

export function SectionHead({ eyebrow, title, text, center = true }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-4xl text-primary md:text-5xl">{title}</h2>
      {text && <p className="mt-4 text-muted-foreground">{text}</p>}
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
