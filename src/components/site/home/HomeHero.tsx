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
  focalPoint: string;
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
      2000,
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
        focalPoint={heroSlide.focalPoint}
        fill
        priority={activeHero === 0}
        sizes="100vw"
        className="absolute inset-0 size-full animate-[hero-image-in_1s_ease-out_both] object-cover motion-reduce:animate-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white/82 via-white/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-white/25" />

      <div className="container-x relative z-10 flex flex-1 flex-col justify-center pb-16 pt-28 text-primary sm:pb-32 sm:pt-40">
        <div key={heroSlide.id} className="max-w-3xl animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/45 bg-white px-3 py-1 shadow-xs sm:px-3.5 sm:py-1.5">
            <Sparkles className="size-3.5 animate-pulse text-accent" />
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-[#9a6516] sm:text-[0.68rem] sm:tracking-[0.22em]">
              {heroSlide.badge}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold leading-[1.12] tracking-tight text-primary drop-shadow-sm font-display sm:mt-5 sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-7xl">
            {heroSlide.title}
            <br />
            <em className="block font-normal italic text-[#a66b12] sm:inline">{heroSlide.accent}</em>
          </h1>

          <p className="mt-3 max-w-xl text-sm font-medium leading-relaxed text-primary/75 font-sans sm:mt-6 sm:text-lg">
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
            <Button
              asChild
              variant="outline"
              size="xl"
              className="w-full border-primary/20 bg-white text-primary shadow-sm hover:scale-102 hover:bg-white sm:w-auto"
            >
              <Link href="/plan-trip" className="inline-flex items-center justify-center">
                Plan Personalized Trip
              </Link>
            </Button>
          </div>

          <div className="mt-7 flex items-center gap-1.5" aria-label="Hero slide controls">
            <button
              type="button"
              onClick={previousHero}
              aria-label="Previous hero slide"
              className="grid size-9 shrink-0 place-items-center rounded-full border border-primary/15 bg-white text-primary shadow-sm transition hover:border-accent hover:text-accent"
            >
              <ChevronLeft className="size-4" />
            </button>
            <div className="flex items-center gap-1 rounded-full border border-primary/10 bg-white px-2 py-2 shadow-xs">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveHero(index)}
                  aria-label={`Show ${item.label}`}
                  aria-current={index === activeHero}
                  title={item.label}
                  className={`h-1.5 rounded-full transition-all duration-300 ${index === activeHero ? "w-5 bg-accent shadow-sm" : "w-1.5 bg-primary/25 hover:bg-primary/50"}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={nextHero}
              aria-label="Next hero slide"
              className="grid size-9 shrink-0 place-items-center rounded-full border border-primary/15 bg-white text-primary shadow-sm transition hover:border-accent hover:text-accent"
            >
              <ChevronRight className="size-4" />
            </button>
            <button
              type="button"
              onClick={() => setHeroPaused((current) => !current)}
              aria-label={heroPaused ? "Resume hero slideshow" : "Pause hero slideshow"}
              className="grid size-9 shrink-0 place-items-center rounded-full border border-primary/15 bg-white text-primary shadow-sm transition hover:border-accent hover:text-accent"
            >
              {heroPaused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 items-start gap-2 border-t border-primary/10 pt-5 text-xs text-primary/75 sm:mt-14 sm:flex sm:flex-wrap sm:items-center sm:gap-10 sm:pt-6">
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
                  <strong className="block text-[0.62rem] font-semibold leading-tight text-primary sm:text-xs">
                    {title}
                  </strong>
                  <span className="hidden text-[0.72rem] text-primary/60 sm:block">
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
