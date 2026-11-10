"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw, TriangleAlert } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Public route error", error);
  }, [error]);

  return (
    <section className="grid min-h-[75vh] place-items-center bg-background px-5 pb-20 pt-36">
      <div className="w-full max-w-xl rounded-3xl border border-border/70 bg-card p-7 text-center shadow-soft sm:p-10">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent/15 text-accent">
          <TriangleAlert className="size-7" />
        </span>
        <p className="eyebrow mt-6">Something went wrong</p>
        <h1 className="mt-3 text-3xl font-semibold text-primary sm:text-4xl">
          We could not load this page
        </h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
          Please try again. If the problem continues, return home and contact our travel team.
        </p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-accent px-6 text-sm font-semibold text-accent-foreground transition hover:bg-accent/90"
          >
            <RefreshCw className="size-4" /> Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-border bg-background px-6 text-sm font-semibold text-primary transition hover:border-accent"
          >
            <Home className="size-4" /> Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
