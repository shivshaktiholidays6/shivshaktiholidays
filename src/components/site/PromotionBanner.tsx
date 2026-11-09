"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Check, Copy, Gift, Sparkles, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Promotion } from "@/lib/promotions";
import { ResponsiveImage } from "@/components/site/ResponsiveImage";

const themeClasses = {
  diwali: "border-amber-300/35 bg-gradient-to-r from-[#5d1738] via-[#8c2f24] to-[#5d1738] text-white",
  gold: "border-amber-300/40 bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950",
  navy: "border-white/15 bg-gradient-to-r from-primary via-secondary to-primary text-white",
} as const;

export function PromotionBanner({ promotion }: { promotion: Promotion | null }) {
  const pathname = usePathname();
  const [activePromotion, setActivePromotion] = useState(promotion);
  const [portalReady, setPortalReady] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [copied, setCopied] = useState(false);
  const storageKey = activePromotion ? `promotion-dismissed:${activePromotion.id}:${activePromotion.updated_at}` : "";

  useEffect(() => {
    let cancelled = false;
    fetch("/api/promotion", { cache: "no-store" })
      .then((response) => response.json() as Promise<{ promotion: Promotion | null }>)
      .then((payload) => {
        if (!cancelled) setActivePromotion(payload.promotion);
      })
      .catch(() => undefined);
    return () => { cancelled = true; };
  }, [promotion?.updated_at]);

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    setDismissed(Boolean(storageKey && window.localStorage.getItem(storageKey)));
  }, [storageKey]);

  if (!activePromotion || dismissed || pathname.startsWith("/admin") || (activePromotion.placement === "homepage" && pathname !== "/")) return null;
  const theme = activePromotion.theme as keyof typeof themeClasses;

  if (activePromotion.image_url) {
    if (!portalReady) return null;
    return createPortal(
      <aside className="fixed bottom-[4.75rem] left-3 z-40 w-[calc(100vw-1.5rem)] max-w-[22rem] overflow-hidden rounded-2xl border border-amber-300/35 bg-card text-foreground shadow-2xl sm:bottom-5 sm:left-5" aria-label="Special offer">
        <div className="relative h-28 overflow-hidden sm:h-36">
          <ResponsiveImage src={activePromotion.image_url} alt={activePromotion.image_alt ?? "Special holiday offer"} focalPoint={activePromotion.image_position} fill sizes="(max-width: 639px) calc(100vw - 24px), 352px" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-black/15" />
          {activePromotion.offer_text && <span className="absolute bottom-3 left-3 rounded-full bg-amber-400 px-3 py-1 text-[0.68rem] font-extrabold uppercase tracking-wider text-slate-950 shadow-lg">{activePromotion.offer_text}</span>}
          {activePromotion.dismissible && <button type="button" onClick={() => { window.localStorage.setItem(storageKey, "1"); setDismissed(true); }} className="absolute right-2 top-2 grid size-8 place-items-center rounded-full bg-black/45 text-white backdrop-blur transition hover:bg-black/65" aria-label="Dismiss special offer"><X className="size-4" /></button>}
        </div>
        <div className="p-4">
          <p className="flex items-center gap-2 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-amber-700"><Sparkles className="size-3.5" /> Limited-time celebration</p>
          <h2 className="mt-1.5 font-display text-xl font-bold leading-tight text-primary">{activePromotion.title}</h2>
          <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{activePromotion.message}</p>
          <div className="mt-3 flex items-center gap-2">
            {activePromotion.coupon_code && <button type="button" onClick={async () => { await navigator.clipboard.writeText(activePromotion.coupon_code ?? ""); setCopied(true); window.setTimeout(() => setCopied(false), 1800); }} className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg border border-dashed border-amber-500/60 bg-amber-50 px-3 font-mono text-[0.68rem] font-bold text-amber-900" title="Copy offer code">{copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}{copied ? "Copied" : activePromotion.coupon_code}</button>}
            {activePromotion.cta_label && activePromotion.cta_href && <Link href={activePromotion.cta_href} className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-[0.68rem] font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-secondary">{activePromotion.cta_label}<ArrowRight className="size-3.5" /></Link>}
          </div>
          {activePromotion.terms_text && <p className="mt-2 truncate text-[0.58rem] text-muted-foreground" title={activePromotion.terms_text}>{activePromotion.terms_text}</p>}
        </div>
      </aside>,
      document.body,
    );
  }

  return (
    <aside className={`relative overflow-hidden border-y ${themeClasses[theme] ?? themeClasses.diwali}`} aria-label="Special offer">
      <div className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(circle_at_15%_50%,#fff_0_1px,transparent_2px),radial-gradient(circle_at_85%_40%,#fff_0_1px,transparent_2px)] [background-size:42px_42px]" />
      <div className="container-x relative flex min-h-12 items-center justify-center gap-2.5 py-2 pr-9 text-center sm:gap-4 sm:pr-10">
        <span className="hidden size-8 shrink-0 place-items-center rounded-full bg-white/15 sm:grid"><Gift className="size-4" /></span>
        <div className="min-w-0 sm:flex sm:items-center sm:gap-3">
          <p className="flex items-center justify-center gap-1.5 text-xs font-extrabold sm:text-sm">
            <Sparkles className="size-3.5 shrink-0 text-amber-200" />
            <span className="truncate">{activePromotion.title}</span>
          </p>
          <p className="mt-0.5 line-clamp-1 text-[0.68rem] opacity-90 sm:mt-0 sm:text-xs">{activePromotion.message}</p>
        </div>
        {activePromotion.offer_text && <span className="hidden shrink-0 rounded-full bg-white/15 px-3 py-1 text-xs font-extrabold lg:inline">{activePromotion.offer_text}</span>}
        {activePromotion.coupon_code && (
          <button
            type="button"
            onClick={async () => {
              await navigator.clipboard.writeText(activePromotion.coupon_code ?? "");
              setCopied(true);
              window.setTimeout(() => setCopied(false), 1800);
            }}
            className="hidden shrink-0 items-center gap-1.5 rounded-lg border border-white/25 bg-black/10 px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider sm:inline-flex"
            title="Copy offer code"
          >
            {copied ? <Check className="size-3" /> : <Copy className="size-3" />} {copied ? "Copied" : activePromotion.coupon_code}
          </button>
        )}
        {activePromotion.cta_label && activePromotion.cta_href && (
          <Link href={activePromotion.cta_href} className="inline-flex shrink-0 items-center gap-1 text-xs font-extrabold underline decoration-current/40 underline-offset-4">
            <span className="hidden sm:inline">{activePromotion.cta_label}</span><ArrowRight className="size-3.5" />
          </Link>
        )}
        {activePromotion.terms_text && <span className="hidden max-w-40 truncate text-[0.6rem] opacity-65 xl:inline" title={activePromotion.terms_text}>{activePromotion.terms_text}</span>}
        {activePromotion.dismissible && (
          <button
            type="button"
            onClick={() => {
              window.localStorage.setItem(storageKey, "1");
              setDismissed(true);
            }}
            className="absolute right-1.5 grid size-8 place-items-center rounded-full opacity-75 transition hover:bg-white/15 hover:opacity-100 sm:right-2"
            aria-label="Dismiss special offer"
          ><X className="size-4" /></button>
        )}
      </div>
    </aside>
  );
}
