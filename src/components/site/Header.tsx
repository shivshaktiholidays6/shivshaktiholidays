"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  X,
  Compass,
  Phone,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/site/ResponsiveImage";
import { site, waLink, waMessages } from "@/config/site";
import { cn } from "@/lib/utils";
import type { Promotion } from "@/lib/promotions";
import { PromotionBanner } from "@/components/site/PromotionBanner";

const nav = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/packages", label: "Packages" },
  { to: "/international", label: "International" },
  { to: "/domestic", label: "Domestic" },
  { to: "/honeymoon", label: "Honeymoon" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link
      href="/"
      className="flex min-w-0 shrink items-center gap-1.5 xs:gap-2 sm:gap-3.5 group select-none"
    >
      {/* Animated Glowing Emblem Badge */}
      <div className="relative shrink-0">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-accent/40 via-accent to-accent/40 blur-xs opacity-75 group-hover:opacity-100 transition-opacity duration-500 animate-emblem-glow" />
        <ResponsiveImage
          src="/logoimg.jpeg"
          alt="Shiv Shakti Holidays"
          width={56}
          height={56}
          sizes="56px"
          className="relative size-8 shrink-0 rounded-full bg-white object-cover p-0.5 shadow-lift ring-1 ring-accent/70 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 xs:size-9 sm:size-12 sm:ring-2 lg:size-13"
        />
      </div>

      {/* Refined luxury wordmark */}
      <div className="flex min-w-0 flex-col justify-center leading-none">
        <span className="inline-flex items-baseline whitespace-nowrap font-display text-sm font-semibold tracking-[-0.035em] drop-shadow-sm xs:text-base sm:text-2xl lg:text-[1.72rem]">
          <span className="text-[#fff8e8] transition-colors duration-300 group-hover:text-white">
            Shiv
          </span>
          <span className="ml-1 bg-gradient-to-br from-amber-200 via-accent to-amber-500 bg-clip-text pr-0.5 italic text-transparent transition-all duration-300 group-hover:translate-x-0.5 xs:ml-1.5">
            Shakti
          </span>
        </span>
        <div className="mt-0.5 flex items-center gap-1 sm:mt-1 sm:gap-1.5">
          <span className="h-px w-2 xs:w-3 sm:w-4 bg-gradient-to-r from-transparent to-accent/90" />
          <span className="block whitespace-nowrap text-[0.4rem] font-semibold uppercase tracking-[0.24em] text-amber-300/95 transition-all duration-500 group-hover:text-amber-200 xs:text-[0.48rem] xs:tracking-[0.3em] sm:text-[0.64rem] sm:tracking-[0.42em]">
            Holidays
          </span>
          <span className="h-px w-2 xs:w-3 sm:w-4 bg-gradient-to-l from-transparent to-accent/90" />
        </div>
      </div>
    </Link>
  );
}

export function Header({ promotion = null }: { promotion?: Promotion | null }) {
  const path = usePathname();
  const isHome = path === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    setOpen(false);
  }, [path]);

  const solid = scrolled || !isHome || open;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "bg-primary/95 backdrop-blur-xl border-b border-accent/25 shadow-soft text-primary-foreground"
          : "bg-gradient-to-b from-primary/85 via-primary/40 to-transparent text-primary-foreground",
      )}
    >
      {/* Top micro concierge strip (desktop) */}
      <div className="hidden border-b border-primary-foreground/10 bg-primary/70 py-1.5 text-[0.72rem] text-primary-foreground/80 backdrop-blur-md lg:block">
        <div className="container-x flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-accent">
              <Compass className="size-3" />
              <span>Personalized Holidays & Curated Escapes</span>
            </span>
            <span className="text-primary-foreground/30">·</span>
            <span className="text-primary-foreground/70">Personalized Luxury Travel Planning</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${site.phone}`}
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <Phone className="size-3 text-accent" />
              <span>{site.phone}</span>
            </a>
            <span className="text-primary-foreground/30">/</span>
            <a href={`tel:${site.phoneSecondary}`} className="hover:text-accent transition-colors">
              {site.phoneSecondary}
            </a>
            <span className="text-primary-foreground/30">|</span>
            <a
              href={waLink(waMessages.general)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:text-accent transition-colors"
            >
              <MessageCircle className="size-3 text-accent" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={cn(
          "container-x flex items-center justify-between gap-2 sm:gap-4 transition-all duration-300",
          scrolled ? "h-14 sm:h-18 lg:h-20" : "h-15 sm:h-20 lg:h-22",
        )}
      >
        <Logo light={true} />

        {/* Desktop Navigation Links - Perfectly Aligned */}
        <nav className="hidden items-center gap-1 xl:gap-2 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              href={n.to}
              prefetch={false}
              className={`relative inline-flex items-center justify-center px-3 py-2 text-xs font-semibold uppercase tracking-wider transition-all hover:text-accent rounded-full hover:bg-primary-foreground/5 group whitespace-nowrap ${path === n.to ? "text-accent bg-primary-foreground/10" : "text-primary-foreground/85"}`}
            >
              <span>{n.label}</span>
              <span
                className={`absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-accent rounded-full transition-all duration-300 group-hover:w-4 ${path === n.to ? "w-4" : "w-0"}`}
              />
            </Link>
          ))}
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3 shrink-0">
          <Button
            asChild
            variant="gold"
            size="xl"
            className="hidden sm:inline-flex h-10 px-4 sm:px-5 text-xs font-semibold uppercase tracking-wider shadow-soft hover:shadow-lift hover:scale-103 shrink-0"
          >
            <Link href="/plan-trip" className="inline-flex items-center gap-1.5">
              <span>Plan My Trip</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-8 shrink-0 place-items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground transition-all hover:border-accent sm:size-10 lg:hidden"
          >
            {open ? <X className="size-4.5 sm:size-5" /> : <Menu className="size-4.5 sm:size-5" />}
          </button>
        </div>
      </div>

      <div className="hidden h-8 items-center justify-center border-t border-primary-foreground/10 bg-primary/75 text-primary-foreground backdrop-blur-md max-sm:flex">
        <a
          href={`tel:${site.phone}`}
          aria-label={`Call ${site.phone}`}
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide transition-colors hover:text-accent"
        >
          <Phone className="size-3.5 text-accent" />
          <span>{site.phone.replace(/^\+91\s*/, "")}</span>
        </a>
      </div>

      <PromotionBanner promotion={promotion} />

      {/* Luxury Mobile Navigation Drawer */}
      {open && (
        <nav className="max-h-[calc(100vh-3.75rem)] overflow-y-auto border-t border-accent/25 bg-primary/98 text-primary-foreground backdrop-blur-2xl lg:hidden">
          <div className="container-x flex flex-col py-3 sm:py-5 space-y-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                href={n.to}
                prefetch={false}
                className={`flex items-center justify-between rounded-xl px-4 py-2.5 text-sm font-medium transition-colors hover:bg-primary-foreground/10 hover:text-accent sm:py-3 ${path === n.to ? "bg-primary-foreground/10 text-accent" : "text-primary-foreground/90"}`}
              >
                <span>{n.label}</span>
                <ArrowRight className="size-4 opacity-50" />
              </Link>
            ))}

            <div className="border-t border-primary-foreground/15 pt-4 mt-3 space-y-3">
              <Button asChild variant="gold" size="xl" className="w-full shadow-soft">
                <Link href="/plan-trip" className="inline-flex items-center justify-center gap-2">
                  <span>Plan My Trip</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <div className="flex items-center justify-around pt-2 text-xs text-primary-foreground/75">
                <a
                  href={`tel:${site.phone}`}
                  className="flex items-center gap-1.5 hover:text-accent transition-colors"
                >
                  <Phone className="size-3.5 text-accent" />
                  <span>Call Us</span>
                </a>
                <span className="text-primary-foreground/30">|</span>
                <a
                  href={waLink(waMessages.general)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-accent transition-colors"
                >
                  <MessageCircle className="size-3.5 text-accent" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
