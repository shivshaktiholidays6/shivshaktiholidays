"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, MapPin, MessageCircle, Sparkles, Users, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResponsiveImage } from "@/components/site/ResponsiveImage";
import { fieldClass } from "@/components/site/EnquiryForm";
import { trackAnalyticsEvent } from "@/components/site/Analytics";
import { images } from "@/data/catalog";
import { site, waLink } from "@/config/site";
import { saveEnquiry } from "@/lib/enquiries";

const popupSessionKey = "shiv-shakti-enquiry-popup-seen";

export function LeadEnquiryPopup() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [lastWhatsAppLink, setLastWhatsAppLink] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (window.sessionStorage.getItem(popupSessionKey)) return;

    const timer = window.setTimeout(() => setOpen(true), 6500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;

    trackAnalyticsEvent("lead_popup_open", { source: "homepage_timer" });

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") dismiss();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  function dismiss() {
    window.sessionStorage.setItem(popupSessionKey, "true");
    setOpen(false);
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(event.currentTarget)) as Record<string, string>;
    setSubmitError("");
    setSubmitting(true);
    const whatsappTab = window.open("about:blank", "_blank");
    if (whatsappTab) whatsappTab.opener = null;

    try {
      const { enquiryCode } = await saveEnquiry({
        type: "popup",
        source: "lead_popup",
        name: values["name"] ?? "",
        phone: values["phone"] ?? "",
        email: values["email"] ?? "",
        consent: values["consent"] === "on",
        company: values["company"],
        departureCity: values["departureCity"],
        destination: values["destination"],
        travelStart: values["travelDate"],
        travellers: Number(values["travellers"]),
        days: Number(values["days"]),
        message: values["message"],
      });
      const message = [
        `Hello ${site.name}, I would like a personalised holiday quotation.`,
        "",
        `Enquiry ID: ${enquiryCode}`,
        `Name: ${values["name"]}`,
        `Mobile: ${values["phone"]}`,
        `Email: ${values["email"]}`,
        `Departure city: ${values["departureCity"]}`,
        `Destination: ${values["destination"]}`,
        `Travel date: ${values["travelDate"]}`,
        `Travellers: ${values["travellers"]}`,
        `Trip duration: ${values["days"]} days`,
        values["message"] && `Message: ${values["message"]}`,
      ]
        .filter(Boolean)
        .join("\n");
      const link = waLink(message);

      window.sessionStorage.setItem(popupSessionKey, "true");
      setLastWhatsAppLink(link);
      setSubmitted(true);
      trackAnalyticsEvent("lead_form_submit", { form_type: "lead_popup" });
      if (whatsappTab) whatsappTab.location.href = link;
      else window.location.href = link;
    } catch (error) {
      whatsappTab?.close();
      setSubmitError(
        error instanceof Error ? error.message : "We could not save your enquiry. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center overflow-y-auto bg-black/45 p-3 sm:p-5"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) dismiss();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-popup-title"
        className="relative my-auto grid max-h-[calc(100dvh-1.5rem)] w-full max-w-4xl overflow-y-auto rounded-2xl border border-white/20 bg-card shadow-2xl lg:grid-cols-[0.68fr_1.32fr]"
      >
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close enquiry form"
          className="absolute right-3 top-3 z-20 grid size-10 place-items-center rounded-full bg-background/90 text-primary shadow-md transition hover:bg-background hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <X className="size-5" />
        </button>

        <div className="relative hidden min-h-full overflow-hidden lg:block">
          <ResponsiveImage
            src={images.kerala}
            alt="Peaceful Kerala backwaters holiday"
            fill
            sizes="34vw"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/35 to-transparent" />
          <div className="relative flex h-full min-h-[570px] flex-col justify-end p-6 text-primary-foreground">
            <span className="mb-auto inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-primary/35 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="size-3.5 text-accent" /> Complimentary trip planning
            </span>
            <p className="font-display text-3xl leading-tight">Your dream holiday starts here.</p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-primary-foreground/85">
              Share your travel plans and our experts will curate a journey around your dates,
              preferences and budget.
            </p>
            <div className="mt-6 flex items-center gap-3 border-t border-white/20 pt-5 text-sm">
              <MessageCircle className="size-5 text-accent" />
              <span>
                Personal assistance on WhatsApp
                <strong className="block text-white">{site.phone}</strong>
              </span>
            </div>
          </div>
        </div>

        <div className="p-5 pt-14 sm:p-7 sm:pt-12 lg:p-8">
          {submitted ? (
            <div className="flex min-h-[460px] flex-col items-center justify-center text-center">
              <span className="grid size-16 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                <CheckCircle2 className="size-8" />
              </span>
              <p className="eyebrow mt-6">Enquiry prepared</p>
              <h2 id="enquiry-popup-title" className="mt-2 text-3xl text-primary">
                Continue in WhatsApp
              </h2>
              <p className="mt-3 max-w-md text-muted-foreground">
                Your trip details are ready. Please press send in WhatsApp so our travel team can
                prepare your personalised quotation.
              </p>
              <Button asChild variant="gold" size="xl" className="mt-7">
                <a href={lastWhatsAppLink} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-5" /> Open WhatsApp
                </a>
              </Button>
            </div>
          ) : (
            <>
              <p className="eyebrow">Let&apos;s plan something beautiful</p>
              <h2 id="enquiry-popup-title" className="mt-1.5 text-3xl text-primary">
                Need assistance?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">
                Tell us about your trip and receive a personalised quotation on WhatsApp.
              </p>

              <form onSubmit={submit} className="mt-5 grid gap-2.5" noValidate={false}>
                <input
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  className="absolute -left-[9999px] h-px w-px overflow-hidden"
                />
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <label className="sr-only" htmlFor="popup-name">
                    Full name
                  </label>
                  <input
                    id="popup-name"
                    name="name"
                    required
                    minLength={2}
                    maxLength={80}
                    autoComplete="name"
                    placeholder="Full name*"
                    className={fieldClass}
                  />
                  <label className="sr-only" htmlFor="popup-phone">
                    Mobile number
                  </label>
                  <input
                    id="popup-phone"
                    name="phone"
                    required
                    minLength={7}
                    maxLength={16}
                    inputMode="tel"
                    autoComplete="tel"
                    placeholder="Mobile number*"
                    className={fieldClass}
                  />
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <label className="sr-only" htmlFor="popup-email">
                    Email address
                  </label>
                  <input
                    id="popup-email"
                    name="email"
                    type="email"
                    required
                    maxLength={120}
                    autoComplete="email"
                    placeholder="Email address*"
                    className={fieldClass}
                  />
                  <label className="sr-only" htmlFor="popup-departure">
                    Departure city
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-accent" />
                    <input
                      id="popup-departure"
                      name="departureCity"
                      required
                      maxLength={80}
                      placeholder="Departure city*"
                      className={fieldClass}
                      style={{ paddingLeft: "2.75rem" }}
                    />
                  </div>
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <label className="sr-only" htmlFor="popup-destination">
                    Preferred destination
                  </label>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-accent" />
                    <input
                      id="popup-destination"
                      name="destination"
                      required
                      maxLength={80}
                      placeholder="Preferred destination*"
                      className={fieldClass}
                      style={{ paddingLeft: "2.75rem" }}
                    />
                  </div>
                  <label className="sr-only" htmlFor="popup-travellers">
                    Number of travellers
                  </label>
                  <div className="relative">
                    <Users className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-accent" />
                    <input
                      id="popup-travellers"
                      name="travellers"
                      type="number"
                      required
                      min={1}
                      max={100}
                      placeholder="No. of travellers*"
                      className={fieldClass}
                      style={{ paddingLeft: "2.75rem" }}
                    />
                  </div>
                </div>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  <label className="sr-only" htmlFor="popup-date">
                    Travel date
                  </label>
                  <input
                    id="popup-date"
                    name="travelDate"
                    type="date"
                    required
                    className={fieldClass}
                  />
                  <label className="sr-only" htmlFor="popup-days">
                    Number of days
                  </label>
                  <input
                    id="popup-days"
                    name="days"
                    type="number"
                    required
                    min={1}
                    max={90}
                    placeholder="No. of days*"
                    className={fieldClass}
                  />
                </div>
                <label className="sr-only" htmlFor="popup-message">
                  Additional message
                </label>
                <textarea
                  id="popup-message"
                  name="message"
                  rows={2}
                  maxLength={1000}
                  placeholder="Tell us about your hotel preference, budget or special occasion"
                  className={fieldClass}
                />
                <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-0.5 size-4 rounded border-input accent-[var(--accent)]"
                  />
                  <span>I agree to be contacted by {site.name} regarding this travel enquiry.</span>
                </label>
                {submitError && (
                  <p role="alert" className="text-sm text-destructive">
                    {submitError}
                  </p>
                )}
                <Button
                  type="submit"
                  variant="gold"
                  size="xl"
                  className="mt-1 w-full"
                  disabled={submitting}
                >
                  <MessageCircle className="size-5" />
                  {submitting ? "Saving enquiry..." : "Get My Quote on WhatsApp"}
                </Button>
              </form>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
