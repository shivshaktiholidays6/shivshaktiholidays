import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, Search, X, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { destinations } from "@/data/catalog";
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
    <Link to="/" className="flex items-center gap-2.5">
      <span className="grid size-10 place-items-center rounded-full border border-accent text-accent">
        <Compass className="size-5" strokeWidth={1.5} />
      </span>
      <span className="leading-none">
        <span className={cn("block font-display text-lg font-semibold tracking-wide", light ? "text-primary-foreground" : "text-primary")}>
          Shiv Shakti
        </span>
        <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.35em] text-accent">Holidays</span>
      </span>
    </Link>
  );
}

export function Header() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const transparentAllowed = path === "/" || ["/international", "/domestic", "/honeymoon"].includes(path);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => { setOpen(false); setSearchOpen(false); }, [path]);

  const solid = scrolled || !transparentAllowed || open;
  const results = q.length > 1 ? destinations.filter((d) => d.name.toLowerCase().includes(q.toLowerCase())).slice(0, 6) : [];

  return (
    <header className={cn("fixed inset-x-0 top-0 z-50 transition-all duration-500", solid ? "bg-card/95 shadow-soft backdrop-blur" : "bg-transparent")}>
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Logo light={!solid} />
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }}
              className={cn("relative text-sm font-medium transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all hover:after:w-full data-[status=active]:after:w-full",
                solid ? "text-foreground hover:text-secondary" : "text-primary-foreground/90 hover:text-primary-foreground")}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Search destinations" onClick={() => setSearchOpen((v) => !v)}
            className={cn("grid size-10 place-items-center rounded-full transition", solid ? "text-primary hover:bg-muted" : "text-primary-foreground hover:bg-primary-foreground/10")}>
            <Search className="size-5" />
          </button>
          <Button asChild variant="gold" size="xl" className="hidden sm:inline-flex h-10 px-6">
            <Link to="/plan-trip">Plan My Trip</Link>
          </Button>
          <button aria-label="Menu" onClick={() => setOpen((v) => !v)}
            className={cn("grid size-10 place-items-center lg:hidden", solid ? "text-primary" : "text-primary-foreground")}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {searchOpen && (
        <div className="border-t border-border bg-card">
          <div className="container-x py-4">
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search a destination — e.g. Bali, Kerala, Switzerland"
              className="w-full rounded-full border border-input bg-background px-5 py-3 text-sm outline-none focus:ring-2 focus:ring-ring" />
            {results.length > 0 && (
              <ul className="mt-3 grid gap-1 sm:grid-cols-2">
                {results.map((d) => (
                  <li key={d.slug}>
                    <button onClick={() => navigate({ to: "/destinations/$slug", params: { slug: d.slug } })}
                      className="w-full rounded-lg px-4 py-2 text-left text-sm hover:bg-muted">
                      <span className="font-semibold text-primary">{d.name}</span> <span className="text-muted-foreground">· {d.region}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      {open && (
        <nav className="border-t border-border bg-card lg:hidden">
          <div className="container-x flex flex-col py-4">
            {[...nav, { to: "/honeymoon", label: "Honeymoon" }, { to: "/plan-trip", label: "Plan My Trip" }].map((n) => (
              <Link key={n.to} to={n.to} className="py-3 text-base font-medium text-foreground data-[status=active]:text-accent">{n.label}</Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
