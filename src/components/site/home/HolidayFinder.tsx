"use client";

import { useRouter } from "next/navigation";
import { Compass, Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fieldClass } from "@/components/site/EnquiryForm";

export function HolidayFinder({ categories }: { categories: readonly string[] }) {
  const router = useRouter();

  return (
    <section className="relative z-20 -mt-8 sm:-mt-16 lg:-mt-14">
      <div className="container-x">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            router.push("/plan-trip");
          }}
          className="rounded-2xl border border-border/80 bg-card/95 p-4 shadow-lift backdrop-blur-xl sm:rounded-3xl sm:p-7"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="grid size-7 place-items-center rounded-full bg-accent/15 text-accent">
                <Compass className="size-4" />
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-primary">Find Your Personalized Holiday</span>
                <span className="ml-2 hidden text-xs text-muted-foreground md:inline">· Tell us where and when you wish to travel</span>
              </div>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-wider text-accent">
              <Sparkles className="size-3" /> Best Rate Guaranteed
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
            <input name="destination" placeholder="Destination (e.g. Bali, Kashmir)" className={fieldClass} />
            <input name="departureCity" placeholder="Departure City (e.g. Mumbai)" className={fieldClass} />
            <div className="flex flex-col gap-1">
              <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground lg:hidden">Departure Date</label>
              <input name="departureDate" type="date" aria-label="Departure date" className={fieldClass} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[0.65rem] font-semibold uppercase tracking-wider text-muted-foreground lg:hidden">Return Date</label>
              <input name="returnDate" type="date" aria-label="Return date" className={fieldClass} />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input name="adults" type="number" min={1} placeholder="Adults" className={fieldClass} />
              <input name="kids" type="number" min={0} placeholder="Kids" className={fieldClass} />
            </div>
            <select name="category" className={fieldClass} defaultValue="">
              <option value="" disabled>Holiday Style</option>
              {categories.map((category) => <option key={category}>{category}</option>)}
            </select>
            <Button type="submit" variant="navy" className="min-h-11 h-11 flex items-center justify-center gap-1.5 text-xs font-semibold uppercase tracking-wider shadow-soft transition-all hover:shadow-lift sm:col-span-2 sm:h-full lg:col-span-1">
              <Search className="size-4" />
              <span>Find Holidays</span>
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
