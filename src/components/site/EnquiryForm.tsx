"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { waLink } from "@/config/site";
import { trackAnalyticsEvent } from "@/components/site/Analytics";
import { saveEnquiry } from "@/lib/enquiries";

export const fieldClass =
  "w-full rounded-lg border border-input bg-background px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-ring/40";

export function EnquiryForm({
  packageName,
  packageSlug,
  compact,
}: {
  packageName?: string;
  packageSlug?: string;
  compact?: boolean;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const raw = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    const v = {
      name: (raw["name"] ?? "").trim(),
      phone: (raw["phone"] ?? "").trim(),
      email: (raw["email"] ?? "").trim(),
      destination: (raw["destination"] ?? "").trim(),
      date: (raw["date"] ?? "").trim(),
      travellers: (raw["travellers"] ?? "").trim(),
      message: (raw["message"] ?? "").trim(),
      consent: raw["consent"] === "on",
    };
    const nextErrors: Record<string, string> = {};
    if (v.name.length < 2 || v.name.length > 80) nextErrors["name"] = "Please enter your name";
    if (!/^[+\d\s-]{7,16}$/.test(v.phone)) nextErrors["phone"] = "Enter a valid phone number";
    if (!/^\S+@\S+\.\S+$/.test(v.email) || v.email.length > 120)
      nextErrors["email"] = "Enter a valid email";
    if ((v.destination?.length ?? 0) > 80) nextErrors["destination"] = "Destination is too long";
    if ((v.message?.length ?? 0) > 1000) nextErrors["message"] = "Message is too long";
    if (!v.consent) nextErrors["consent"] = "Please allow us to contact you about this enquiry";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    setServerError("");
    setSubmitting(true);
    const whatsappTab = window.open("about:blank", "_blank");
    if (whatsappTab) whatsappTab.opener = null;

    try {
      const { enquiryCode } = await saveEnquiry({
        type: packageName ? "package" : "general",
        source: packageName ? "package_detail" : "enquiry_form",
        name: v.name,
        phone: v.phone,
        email: v.email,
        consent: v.consent,
        company: raw["company"],
        packageName,
        packageSlug,
        destination: v.destination || undefined,
        travelStart: v.date || undefined,
        travellers: v.travellers ? Number(v.travellers) : undefined,
        message: v.message || undefined,
      });
      const msg = [
        `Hello Shiv Shakti Holidays, enquiry ${enquiryCode}`,
        packageName && `Package: ${packageName}`,
        `Name: ${v.name}`,
        `Phone: ${v.phone}`,
        `Email: ${v.email}`,
        v.destination && `Destination: ${v.destination}`,
        v.date && `Travel date: ${v.date}`,
        v.travellers && `Travellers: ${v.travellers}`,
        v.message && `Message: ${v.message}`,
      ]
        .filter(Boolean)
        .join("\n");
      const link = waLink(msg);
      if (whatsappTab) whatsappTab.location.href = link;
      else window.location.href = link;
      trackAnalyticsEvent("lead_form_submit", {
        form_type: packageName ? "package_quote" : "general_enquiry",
        package_name: packageName,
      });
      setDone(enquiryCode);
    } catch (error) {
      whatsappTab?.close();
      setServerError(
        error instanceof Error ? error.message : "We could not save your enquiry. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (done)
    return (
      <div className="rounded-2xl border border-accent/40 bg-muted p-6 text-center">
        <p className="eyebrow">Enquiry {done}</p>
        <h3 className="mt-2 text-2xl text-primary">Thank you!</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Your enquiry is ready in WhatsApp — just press send and our travel team will get back to
          you.
        </p>
      </div>
    );

  const err = (k: string) =>
    errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>;
  return (
    <form onSubmit={submit} className="grid gap-3" noValidate>
      {packageName && <input type="hidden" name="pkg" value={packageName} />}
      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-px w-px overflow-hidden"
      />
      <div>
        <input name="name" placeholder="Full name" className={fieldClass} />
        {err("name")}
      </div>
      <div className={compact ? "grid gap-3" : "grid gap-3 sm:grid-cols-2"}>
        <div>
          <input name="phone" placeholder="Phone number" className={fieldClass} />
          {err("phone")}
        </div>
        <div>
          <input name="email" type="email" placeholder="Email" className={fieldClass} />
          {err("email")}
        </div>
      </div>
      {!packageName && (
        <input name="destination" placeholder="Destination" className={fieldClass} />
      )}
      <div className="grid grid-cols-2 gap-3">
        <input name="date" type="date" className={fieldClass} aria-label="Travel date" />
        <input
          name="travellers"
          type="number"
          min={1}
          placeholder="Travellers"
          className={fieldClass}
        />
      </div>
      <textarea
        name="message"
        rows={compact ? 2 : 4}
        placeholder="Tell us about your trip"
        className={fieldClass}
      />
      <div>
        <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 size-4 rounded border-input accent-[var(--accent)]"
          />
          <span>I agree to be contacted regarding this travel enquiry.</span>
        </label>
        {err("consent")}
      </div>
      {serverError && (
        <p role="alert" className="text-sm text-destructive">
          {serverError}
        </p>
      )}
      <Button type="submit" variant="gold" size="xl" disabled={submitting}>
        {submitting
          ? "Saving enquiry..."
          : packageName
            ? "Get Package Quote"
            : "Submit Enquiry"}
      </Button>
    </form>
  );
}
