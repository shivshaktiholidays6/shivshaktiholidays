"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Menu,
  Search,
  X,
  Compass,
  Phone,
  MessageCircle,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/site/ResponsiveImage";
import { destinations, type Destination } from "@/data/catalog";
import { site, waLink, waMessages } from "@/config/site";
import { cn } from "@/lib/utils";

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
      className="flex items-center gap-2 xs:gap-2.5 sm:gap-3.5 group select-none min-w-0 shrink"
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
          className="relative size-10 xs:size-11 sm:size-12 lg:size-13 rounded-full object-cover bg-white p-0.5 shadow-lift ring-2 ring-accent/70 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shrink-0"
        />
      </div>

      {/* Styled, Big & Animated Brand Name */}
      <div className="leading-none flex flex-col justify-center min-w-0">
        <span className="font-display text-base xs:text-lg sm:text-2xl lg:text-[1.72rem] font-bold tracking-tight inline-block drop-shadow-sm whitespace-nowrap">
          <span className="animate-gold-shimmer inline-block transition-all duration-300 group-hover:scale-[1.02]">
            Shiv Shakti
          </span>
        </span>
        <div className="mt-0.5 sm:mt-1 flex items-center gap-1 sm:gap-1.5">
          <span className="h-px w-2 xs:w-3 sm:w-4 bg-gradient-to-r from-transparent to-accent/90" />
          <span className="block text-[0.52rem] xs:text-[0.62rem] sm:text-[0.68rem] font-bold uppercase tracking-[0.2em] sm:tracking-[0.36em] text-accent transition-all duration-500 group-hover:tracking-[0.44em] group-hover:text-amber-300 whitespace-nowrap">
            Holidays
          </span>
          <span className="h-px w-2 xs:w-3 sm:w-4 bg-gradient-to-l from-transparent to-accent/90" />
        </div>
      </div>
    </Link>
  );
}

export function Header({ destinationItems = destinations }: { destinationItems?: Destination[] }) {
  const path = usePathname();
  const isHome = path === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
  }, [path]);

  const solid = scrolled || !isHome || open;
  const results =
    q.length > 1
      ? destinationItems.filter((d) => d.name.toLowerCase().includes(q.toLowerCase())).slice(0, 6)
      : [];

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
      <div
        className={cn(
          "hidden lg:block border-b border-primary-foreground/10 transition-all duration-300",
          scrolled
            ? "h-0 overflow-hidden opacity-0 py-0"
            : "bg-primary/30 backdrop-blur-xs py-1.5 text-[0.72rem] text-primary-foreground/80",
        )}
      >
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
          scrolled ? "h-16 sm:h-18 lg:h-20" : "h-18 sm:h-20 lg:h-22",
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
          <button
            aria-label={searchOpen ? "Close search" : "Search destinations"}
            onClick={() => setSearchOpen((v) => !v)}
            className={cn(
              "grid size-9 sm:size-10 place-items-center rounded-full border transition-all shrink-0",
              searchOpen
                ? "border-accent bg-accent text-accent-foreground shadow-xs"
                : "border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground hover:border-accent hover:bg-accent/20 hover:text-accent",
            )}
          >
            {searchOpen ? <X className="size-4" /> : <Search className="size-4" />}
          </button>

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
            className="grid size-9 sm:size-10 place-items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground transition-all hover:border-accent lg:hidden shrink-0"
          >
            {open ? <X className="size-4.5 sm:size-5" /> : <Menu className="size-4.5 sm:size-5" />}
          </button>
        </div>
      </div>

      {/* Luxury Search Overlay */}
      {searchOpen && (
        <div className="border-t border-accent/30 bg-primary/98 backdrop-blur-xl text-primary-foreground shadow-lift">
          <div className="container-x py-3.5 sm:py-5">
            <div className="relative flex items-center">
              <Search className="absolute left-3.5 sm:left-4 size-4 text-accent pointer-events-none" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search destinations (e.g. Bali, Kashmir, Dubai)..."
                className="w-full rounded-full border border-accent/30 bg-primary-foreground/10 pl-10 sm:pl-11 pr-10 sm:pr-12 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder:text-primary-foreground/50 outline-none focus:border-accent focus:ring-2 focus:ring-accent/40 backdrop-blur-md"
              />
              {q && (
                <button
                  type="button"
                  onClick={() => setQ("")}
                  className="absolute right-3.5 grid size-6 place-items-center rounded-full text-primary-foreground/60 hover:text-white"
                  aria-label="Clear search"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            {/* Trending Quick Suggestions */}
            {q.length <= 1 && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-primary-foreground/75">
                <span className="text-[0.65rem] sm:text-[0.68rem] uppercase tracking-wider text-accent font-semibold whitespace-nowrap">
                  Popular:
                </span>
                {["Bali", "Maldives", "Switzerland", "Dubai", "Kashmir", "Kerala", "Rajasthan"].map(
                  (dest) => (
                    <button
                      key={dest}
                      onClick={() => {
                        const found = destinationItems.find(
                          (d) => d.name.toLowerCase() === dest.toLowerCase(),
                        );
                        if (found) router.push(`/destinations/${found.slug}`);
                      }}
                      className="rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-2.5 sm:px-3 py-1 text-[0.72rem] sm:text-xs hover:border-accent hover:text-accent transition-colors cursor-pointer"
                    >
                      {dest}
                    </button>
                  ),
                )}
              </div>
            )}

            {results.length > 0 && (
              <ul className="mt-3 sm:mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3 max-h-[55vh] overflow-y-auto">
                {results.map((d) => (
                  <li key={d.slug}>
                    <button
                      onClick={() => router.push(`/destinations/${d.slug}`)}
                      className="w-full rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-2.5 sm:p-3 text-left text-sm hover:border-accent/40 hover:bg-primary-foreground/10 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div className="min-w-0 pr-2">
                        <span className="font-semibold text-white group-hover:text-accent transition-colors block truncate">
                          {d.name}
                        </span>
                        <span className="text-xs text-primary-foreground/60 block">{d.region}</span>
                      </div>
                      <ArrowUpRight className="size-4 shrink-0 text-accent/60 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {/* Luxury Mobile Navigation Drawer */}
      {open && (
        <nav className="border-t border-accent/25 bg-primary/98 backdrop-blur-2xl text-primary-foreground lg:hidden max-h-[calc(100vh-4.5rem)] overflow-y-auto">
          <div className="container-x flex flex-col py-4 sm:py-5 space-y-1">
            {/* Quick search inside mobile menu */}
            <div className="mb-3 px-1">
              <button
                onClick={() => {
                  setOpen(false);
                  setSearchOpen(true);
                }}
                className="w-full flex items-center gap-2.5 rounded-full border border-accent/30 bg-primary-foreground/10 px-4 py-2.5 text-xs text-primary-foreground/60 hover:text-white hover:border-accent/60 transition-colors"
              >
                <Search className="size-3.5 text-accent" />
                <span>Search destinations...</span>
              </button>
            </div>

            {nav.map((n) => (
              <Link
                key={n.to}
                href={n.to}
                prefetch={false}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-primary-foreground/10 hover:text-accent ${path === n.to ? "bg-primary-foreground/10 text-accent" : "text-primary-foreground/90"}`}
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
