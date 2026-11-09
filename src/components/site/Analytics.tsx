"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useReportWebVitals } from "next/web-vitals";

const consentStorageKey = "shiv-shakti-analytics-consent";
const gaId = process.env["NEXT_PUBLIC_GA_ID"]?.trim();
const clarityId = process.env["NEXT_PUBLIC_CLARITY_ID"]?.trim();

type Consent = "granted" | "denied";
type AnalyticsValue = string | number | boolean | undefined;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    clarity?: (...args: unknown[]) => void;
  }
}

function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(consentStorageKey) === "granted";
  } catch {
    return false;
  }
}

function prepareGoogleTag() {
  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
}

export function trackAnalyticsEvent(
  eventName: string,
  parameters: Record<string, AnalyticsValue> = {},
) {
  if (!gaId || !hasAnalyticsConsent()) return;
  prepareGoogleTag();
  window.gtag?.("event", eventName, parameters);
}

function reportWebVital(metric: {
  id: string;
  name: string;
  value: number;
  rating?: string;
  navigationType?: string;
}) {
  if (window.location.pathname.startsWith("/admin")) return;
  const value = metric.name === "CLS" ? Math.round(metric.value * 1000) : Math.round(metric.value);
  trackAnalyticsEvent("web_vital", {
    metric_id: metric.id,
    metric_name: metric.name,
    metric_value: value,
    metric_rating: metric.rating,
    navigation_type: metric.navigationType,
  });
}

function ConsentBanner({ onChoose }: { onChoose: (choice: Consent) => void }) {
  return (
    <section
      aria-label="Analytics preferences"
      className="fixed inset-x-3 bottom-3 z-[120] mx-auto max-w-2xl rounded-2xl border border-accent/30 bg-primary/98 p-4 text-primary-foreground shadow-lift backdrop-blur-xl sm:bottom-5 sm:p-5"
    >
      <p className="font-display text-lg font-semibold text-white">Help us improve your experience</p>
      <p className="mt-1.5 text-xs leading-relaxed text-primary-foreground/75 sm:text-sm">
        We use optional analytics to understand page performance and which travel experiences are
        useful. We never send your name, phone number, email, or enquiry message to analytics.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => onChoose("granted")}
          className="rounded-full bg-accent px-4 py-2 text-xs font-semibold uppercase tracking-wider text-accent-foreground transition hover:brightness-105"
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={() => onChoose("denied")}
          className="rounded-full border border-primary-foreground/25 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white transition hover:border-accent hover:text-accent"
        >
          Continue without analytics
        </button>
        <Link href="/privacy" className="ml-auto text-xs text-primary-foreground/65 underline-offset-4 hover:text-accent hover:underline">
          Privacy details
        </Link>
      </div>
    </section>
  );
}

export function AnalyticsPreferencesButton({ className = "" }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-analytics-preferences"))}
      className={className}
    >
      Cookie settings
    </button>
  );
}

export function AnalyticsManager() {
  const pathname = usePathname();
  const [consent, setConsent] = useState<Consent | null>(null);
  const googleInitialized = useRef(false);

  useReportWebVitals(reportWebVital);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(consentStorageKey);
      setConsent(saved === "granted" || saved === "denied" ? saved : null);
    } catch {
      setConsent(null);
    }

    function reopenPreferences() {
      setConsent(null);
    }

    window.addEventListener("open-analytics-preferences", reopenPreferences);
    return () => window.removeEventListener("open-analytics-preferences", reopenPreferences);
  }, []);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (consent !== "granted" || !gaId) return;
    prepareGoogleTag();

    if (!googleInitialized.current) {
      window.gtag?.("js", new Date());
      window.gtag?.("config", gaId, {
        send_page_view: false,
        anonymize_ip: true,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });
      googleInitialized.current = true;
    }

    window.gtag?.("event", "page_view", {
      page_path: pathname,
      page_location: `${window.location.origin}${pathname}`,
      page_title: document.title,
    });

    const segments = pathname.split("/").filter(Boolean);
    if (segments[0] === "packages" && segments[1]) {
      trackAnalyticsEvent("package_view", { package_slug: segments[1] });
    }
    if (segments[0] === "destinations" && segments[1]) {
      trackAnalyticsEvent("destination_view", { destination_slug: segments[1] });
    }
  }, [consent, pathname]);

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    function trackClick(event: MouseEvent) {
      const target = event.target instanceof Element ? event.target : null;
      const clickable = target?.closest<HTMLElement>("a,button");
      if (!clickable) return;

      const explicitEvent = clickable.dataset["analyticsEvent"];
      if (explicitEvent) {
        trackAnalyticsEvent(explicitEvent, {
          source: clickable.dataset["analyticsSource"] ?? pathname,
          item_slug: clickable.dataset["analyticsItem"],
        });
        return;
      }

      if (!(clickable instanceof HTMLAnchorElement)) return;
      const href = clickable.href;
      if (/wa\.me|whatsapp\.com/i.test(href)) {
        trackAnalyticsEvent("whatsapp_click", { source: pathname });
      } else if (href.startsWith("tel:")) {
        trackAnalyticsEvent("phone_click", { source: pathname });
      } else {
        const destination = new URL(href, window.location.origin);
        if (destination.origin === window.location.origin && destination.pathname === "/plan-trip") {
          trackAnalyticsEvent("plan_trip_start", { source: pathname });
        }
      }
    }

    document.addEventListener("click", trackClick, true);
    return () => document.removeEventListener("click", trackClick, true);
  }, [pathname]);

  function chooseConsent(choice: Consent) {
    try {
      window.localStorage.setItem(consentStorageKey, choice);
    } catch {
      // The in-memory choice still applies if storage is unavailable.
    }
    setConsent(choice);
  }

  const analyticsEnabled = consent === "granted";

  if (pathname.startsWith("/admin")) return null;

  return (
    <>
      {analyticsEnabled && gaId && (
        <Script
          id="google-analytics"
          src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
          strategy="afterInteractive"
        />
      )}
      {analyticsEnabled && clarityId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(clarityId)});`}
        </Script>
      )}
      {consent === null && (gaId || clarityId) && <ConsentBanner onChoose={chooseConsent} />}
    </>
  );
}
