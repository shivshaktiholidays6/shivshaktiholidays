import Link from "next/link";
import { Compass, Home, Map } from "lucide-react";

export default function NotFound() {
  return (
    <section className="grid min-h-[75vh] place-items-center overflow-hidden bg-background px-5 pb-20 pt-36">
      <div className="relative w-full max-w-2xl text-center">
        <div className="absolute left-1/2 top-1/2 -z-10 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
        <span className="mx-auto grid size-16 place-items-center rounded-full border border-accent/25 bg-accent/10 text-accent shadow-xs">
          <Compass className="size-8" />
        </span>
        <p className="eyebrow mt-6">Error 404</p>
        <h1 className="mt-3 text-4xl font-semibold text-primary sm:text-6xl">This route got lost</h1>
        <p className="mx-auto mt-4 max-w-lg leading-relaxed text-muted-foreground">
          The page may have moved, but your next holiday is still waiting. Return home or explore
          our available destinations.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90"
          >
            <Home className="size-4" /> Return home
          </Link>
          <Link
            href="/destinations"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-card px-6 text-sm font-semibold text-primary transition hover:border-accent"
          >
            <Map className="size-4" /> Explore destinations
          </Link>
        </div>
      </div>
    </section>
  );
}
