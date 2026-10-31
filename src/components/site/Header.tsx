import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Search, X, Compass, Phone, MessageCircle, ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { destinations } from "@/data/catalog";
import { site, waLink, waMessages } from "@/config/site";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Destinations" },
  { to: "/packages", label: "Holiday Packages" },
  { to: "/international", label: "International" },
  { to: "/domestic", label: "Domestic" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 sm:gap-3 group">
      <img
        src="/logo.png"
        alt="Shiv Shakti Holidays"
        width={48}
        height={48}
        className="size-10 sm:size-11 rounded-full object-contain bg-white p-0.5 shadow-soft ring-1 ring-accent/40 transition-transform duration-300 group-hover:scale-105 shrink-0"
      />
      <span className="leading-tight">
        <span className={cn("block font-display text-base sm:text-lg font-semibold tracking-wide transition-colors", light ? "text-white" : "text-white")}>
          Shiv Shakti
        </span>
        <span className="block text-[0.58rem] sm:text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-accent">Holidays</span>
      </span>
    </Link>
  );
}

export function Header() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isHome = path === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 30);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(false); setSearchOpen(false); }, [path]);

  const solid = scrolled || !isHome || open;
  const results = q.length > 1 ? destinations.filter((d) => d.name.toLowerCase().includes(q.toLowerCase())).slice(0, 6) : [];

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "bg-primary/95 backdrop-blur-xl border-b border-accent/25 shadow-soft text-primary-foreground"
          : "bg-gradient-to-b from-primary/85 via-primary/40 to-transparent text-primary-foreground"
      )}
    >
      {/* Top micro concierge strip (desktop) */}
      <div
        className={cn(
          "hidden lg:block border-b border-primary-foreground/10 transition-all duration-300",
          scrolled ? "h-0 overflow-hidden opacity-0 py-0" : "bg-primary/30 backdrop-blur-xs py-1.5 text-[0.72rem] text-primary-foreground/80"
        )}
      >
        <div className="container-x flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium text-accent">
              <Compass className="size-3" />
              <span>Bespoke Holidays & Curated Escapes</span>
            </span>
            <span className="text-primary-foreground/30">·</span>
            <span className="text-primary-foreground/70">Personalized Luxury Travel Planning</span>
          </div>
          <div className="flex items-center gap-5">
            <a href={`tel:${site.phone}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <Phone className="size-3 text-accent" />
              <span>{site.phone}</span>
            </a>
            <span className="text-primary-foreground/30">|</span>
            <a href={waLink(waMessages.general)} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-accent transition-colors">
              <MessageCircle className="size-3 text-accent" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className={cn("container-x flex items-center justify-between gap-4 transition-all duration-300", scrolled ? "h-16 sm:h-18" : "h-20")}>
        <Logo light={true} />

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 xl:gap-1.5 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="relative px-3 py-2 text-xs font-semibold uppercase tracking-wider text-primary-foreground/85 transition-all hover:text-accent rounded-full hover:bg-primary-foreground/5 data-[status=active]:text-accent data-[status=active]:bg-primary-foreground/10 group"
            >
              <span>{n.label}</span>
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-accent rounded-full transition-all duration-300 group-hover:w-4 group-data-[status=active]:w-4" />
            </Link>
          ))}
          <Link
            to="/honeymoon"
            className="relative px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-accent transition-all hover:text-white rounded-full bg-accent/15 border border-accent/40 hover:bg-accent/25 ml-1 flex items-center gap-1"
          >
            <span>Honeymoon</span>
            <span className="text-[0.65rem]">✨</span>
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            aria-label="Search destinations"
            onClick={() => setSearchOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground transition-all hover:border-accent hover:bg-accent/20 hover:text-accent"
          >
            <Search className="size-4" />
          </button>

          <Button
            asChild
            variant="gold"
            size="xl"
            className="hidden sm:inline-flex h-10 px-5 text-xs font-semibold uppercase tracking-wider shadow-soft hover:shadow-lift hover:scale-103"
          >
            <Link to="/plan-trip" className="inline-flex items-center gap-1.5">
              <span>Plan My Trip</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>

          <button
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="grid size-10 place-items-center rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground transition-all hover:border-accent lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Luxury Search Overlay */}
      {searchOpen && (
        <div className="border-t border-accent/30 bg-primary/98 backdrop-blur-xl text-primary-foreground shadow-lift">
          <div className="container-x py-5">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-accent" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search a luxury destination — e.g. Bali, Maldives, Switzerland, Kashmir..."
                className="w-full rounded-full border border-accent/30 bg-primary-foreground/10 pl-11 pr-5 py-3 text-sm text-white placeholder:text-primary-foreground/50 outline-none focus:border-accent focus:ring-2 focus:ring-accent/40 backdrop-blur-md"
              />
            </div>

            {/* Trending Quick Suggestions */}
            {q.length <= 1 && (
              <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs text-primary-foreground/75">
                <span className="text-[0.68rem] uppercase tracking-wider text-accent font-semibold">Popular Escapes:</span>
                {["Bali", "Maldives", "Switzerland", "Dubai", "Kashmir", "Kerala", "Rajasthan"].map((dest) => (
                  <button
                    key={dest}
                    onClick={() => {
                      const found = destinations.find((d) => d.name.toLowerCase() === dest.toLowerCase());
                      if (found) navigate({ to: "/destinations/$slug", params: { slug: found.slug } });
                    }}
                    className="rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-3 py-1 text-xs hover:border-accent hover:text-accent transition-colors cursor-pointer"
                  >
                    {dest}
                  </button>
                ))}
              </div>
            )}

            {results.length > 0 && (
              <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {results.map((d) => (
                  <li key={d.slug}>
                    <button
                      onClick={() => navigate({ to: "/destinations/$slug", params: { slug: d.slug } })}
                      className="w-full rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-3 text-left text-sm hover:border-accent/40 hover:bg-primary-foreground/10 transition-all flex items-center justify-between group cursor-pointer"
                    >
                      <div>
                        <span className="font-semibold text-white group-hover:text-accent transition-colors">{d.name}</span>
                        <span className="text-xs text-primary-foreground/60 block">{d.region}</span>
                      </div>
                      <ArrowUpRight className="size-4 text-accent/60 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
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
        <nav className="border-t border-accent/25 bg-primary/98 backdrop-blur-2xl text-primary-foreground lg:hidden">
          <div className="container-x flex flex-col py-5 space-y-1">
            {[...nav, { to: "/honeymoon", label: "Honeymoon Specials ✨" }].map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-primary-foreground/90 transition-colors hover:bg-primary-foreground/10 hover:text-accent data-[status=active]:bg-primary-foreground/10 data-[status=active]:text-accent"
              >
                <span>{n.label}</span>
                <ArrowRight className="size-4 opacity-50" />
              </Link>
            ))}

            <div className="border-t border-primary-foreground/15 pt-5 mt-4 space-y-3">
              <Button asChild variant="gold" size="xl" className="w-full shadow-soft">
                <Link to="/plan-trip" className="inline-flex items-center justify-center gap-2">
                  <span>Plan My Trip</span>
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <div className="flex items-center justify-around pt-2 text-xs text-primary-foreground/75">
                <a href={`tel:${site.phone}`} className="flex items-center gap-1.5 hover:text-accent transition-colors">
                  <Phone className="size-3.5 text-accent" />
                  <span>Call Us</span>
                </a>
                <span className="text-primary-foreground/30">|</span>
                <a href={waLink(waMessages.general)} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-accent transition-colors">
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
