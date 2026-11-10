"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/site/ResponsiveImage";

export interface HomeHeroSlide {
  id: string;
  label: string;
  badge: string;
  title: string;
  accent: string;
  description: string;
  image: string;
  alt: string;
  href: string;
  cta: string;
}

export function HomeHero({ slides }: { slides: readonly [HomeHeroSlide, ...HomeHeroSlide[]] }) {
  const [activeHero, setActiveHero] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const heroTouchStart = useRef<number | null>(null);
  const heroSlide = slides[activeHero] ?? slides[0];

  useEffect(() => {
    if (heroPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setActiveHero((current) => (current + 1) % slides.length),
      6000,
    );
    return () => window.clearInterval(timer);
  }, [heroPaused, slides.length]);

  function previousHero() {
    setActiveHero((current) => (current - 1 + slides.length) % slides.length);
  }

  function nextHero() {
    setActiveHero((current) => (current + 1) % slides.length);
  }

  return (
    <section
      className="relative flex min-h-[92vh] flex-col justify-between overflow-hidden sm:min-h-screen"
      aria-roledescription="carousel"
      aria-label="Featured holiday experiences"
      onTouchStart={(event) => {
        heroTouchStart.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        if (heroTouchStart.current === null) return;
        const distance =
          (event.changedTouches[0]?.clientX ?? heroTouchStart.current) - heroTouchStart.current;
        if (Math.abs(distance) > 55) {
          if (distance > 0) previousHero();
          else nextHero();
        }
        heroTouchStart.current = null;
      }}
    >
      <ResponsiveImage
        key={heroSlide.id}
        src={heroSlide.image}
        alt={heroSlide.alt}
        fill
        priority={activeHero === 0}
        sizes="100vw"
        className="absolute inset-0 size-full animate-[hero-image-in_1s_ease-out_both] object-cover object-center motion-reduce:animate-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-primary/20" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-primary/95" />
      <div className="absolute inset-0 bg-radial-[at_top_right] from-accent/20 via-transparent to-transparent opacity-70" />

      <div className="container-x relative z-10 flex flex-1 flex-col justify-center pb-16 pt-24 text-primary-foreground sm:pb-32 sm:pt-36">
        <div key={heroSlide.id} className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-primary/50 px-3 py-1 shadow-xs backdrop-blur-md sm:px-3.5 sm:py-1.5">
            <Sparkles className="size-3.5 animate-pulse text-accent" />
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-accent sm:text-[0.68rem] sm:tracking-[0.22em]">
              {heroSlide.badge}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold leading-[1.12] tracking-tight text-white drop-shadow-sm font-display sm:mt-5 sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-7xl">
            {heroSlide.title}
            <br />
            <em className="block font-normal italic text-accent sm:inline">{heroSlide.accent}</em>
          </h1>

          <p className="mt-3 max-w-xl text-sm font-normal leading-relaxed text-primary-foreground/90 font-sans sm:mt-6 sm:text-lg">
            {heroSlide.description}
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:mt-9 sm:flex-row">
            <Button
              asChild
              variant="gold"
              size="xl"
              className="w-full shadow-lift hover:scale-102 sm:w-auto"
            >
              <Link href={heroSlide.href} className="inline-flex items-center justify-center gap-2">
                <span>{heroSlide.cta}</span>
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="glass" size="xl" className="w-full hover:scale-102 sm:w-auto">
              <Link href="/plan-trip" className="inline-flex items-center justify-center">
                Plan Personalized Trip
              </Link>
            </Button>
          </div>

          <div className="mt-7 flex items-center gap-2" aria-label="Hero slide controls">
            <button
              type="button"
              onClick={previousHero}
              aria-label="Previous hero slide"
              className="grid size-10 shrink-0 place-items-center rounded-full border border-white/25 bg-primary/35 text-white shadow-sm backdrop-blur-md transition hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-primary/30 p-1.5 backdrop-blur-md">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveHero(index)}
                  aria-label={`Show ${item.label}`}
                  aria-current={index === activeHero}
                  className={`h-7 rounded-full px-2.5 text-[0.62rem] font-semibold uppercase tracking-wider transition sm:px-3 ${index === activeHero ? "bg-accent text-accent-foreground shadow-sm" : "text-white/70 hover:bg-white/10 hover:text-white"}`}
                >
                  <span className="sm:hidden">0{index + 1}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={nextHero}
              aria-label="Next hero slide"
              className="grid size-10 shrink-0 place-items-center rounded-full border border-white/25 bg-primary/35 text-white shadow-sm backdrop-blur-md transition hover:border-accent hover:text-accent"
            >
              <ChevronRight className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setHeroPaused((current) => !current)}
              aria-label={heroPaused ? "Resume hero slideshow" : "Pause hero slideshow"}
              className="hidden size-10 shrink-0 place-items-center rounded-full border border-white/25 bg-primary/35 text-white shadow-sm backdrop-blur-md transition hover:border-accent hover:text-accent sm:grid"
            >
              {heroPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 items-start gap-2 border-t border-primary-foreground/15 pt-5 text-xs text-primary-foreground/80 sm:mt-14 sm:flex sm:flex-wrap sm:items-center sm:gap-10 sm:pt-6">
            {[
              ["✦", "Custom Itineraries", "Travel plans shaped around you"],
              ["↗", "India & Worldwide", "Domestic and international holidays"],
              ["24/7", "Dedicated Concierge", "Personal travel specialist"],
            ].map(([icon, title, text]) => (
              <div
                key={title}
                className="flex min-w-0 flex-col items-center gap-1.5 text-center sm:flex-row sm:gap-2.5 sm:text-left"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent/20 font-display text-[0.58rem] font-bold text-accent sm:text-sm">
                  {icon}
                </span>
                <div>
                  <strong className="block text-[0.62rem] font-semibold leading-tight text-white sm:text-xs">
                    {title}
                  </strong>
                  <span className="hidden text-[0.72rem] text-primary-foreground/70 sm:block">
                    {text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
