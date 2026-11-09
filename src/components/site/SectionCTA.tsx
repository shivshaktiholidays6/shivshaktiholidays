import Link from "next/link";
import { ArrowRight, MessageCircle, Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site, waLink, waMessages } from "@/config/site";

export function SectionCTA({
  title = "Didn't find your dream destination?",
  text = "Tell our travel specialists what you have in mind. We will create a personalized itinerary around your dates, budget and travel style.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <div className="relative mt-12 overflow-hidden rounded-3xl border border-accent/35 bg-primary px-6 py-8 text-primary-foreground shadow-lift sm:px-10 sm:py-10">
      <div className="absolute -right-12 -top-12 size-48 rounded-full bg-accent/15 blur-3xl" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            <Sparkles className="size-4" /> Personalized travel planning
          </span>
          <h3 className="mt-3 text-2xl font-semibold text-white sm:text-3xl">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75 sm:text-base">
            {text}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-primary-foreground/80">
            <a
              href={`tel:${site.phone}`}
              className="inline-flex items-center gap-2 hover:text-accent"
            >
              <Phone className="size-4 text-accent" /> {site.phone}
            </a>
            <a
              href={`tel:${site.phoneSecondary}`}
              className="inline-flex items-center gap-2 hover:text-accent"
            >
              <Phone className="size-4 text-accent" /> {site.phoneSecondary}
            </a>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Button asChild variant="gold" size="xl">
            <a href={waLink(waMessages.general)} target="_blank" rel="noreferrer">
              <MessageCircle className="size-4" /> WhatsApp Us
            </a>
          </Button>
          <Button asChild variant="glass" size="xl">
            <Link href="/plan-trip">
              Plan My Trip <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
