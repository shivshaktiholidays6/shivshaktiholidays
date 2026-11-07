"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { waLink } from "@/config/site";

export const fieldClass =
  "w-full rounded-lg border border-input bg-background px-3.5 sm:px-4 py-2.5 sm:py-3 text-base sm:text-sm outline-none transition focus:border-accent focus:ring-2 focus:ring-ring/40";

export function EnquiryForm({ packageName, compact }: { packageName?: string; compact?: boolean }) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState<string | null>(null);

  function submit(e: React.FormEvent<HTMLFormElement>) {
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
    };
    const nextErrors: Record<string, string> = {};
    if (v.name.length < 2 || v.name.length > 80) nextErrors["name"] = "Please enter your name";
    if (!/^[+\d\s-]{7,16}$/.test(v.phone)) nextErrors["phone"] = "Enter a valid phone number";
    if (!/^\S+@\S+\.\S+$/.test(v.email) || v.email.length > 120)
      nextErrors["email"] = "Enter a valid email";
    if ((v.destination?.length ?? 0) > 80) nextErrors["destination"] = "Destination is too long";
    if ((v.message?.length ?? 0) > 1000) nextErrors["message"] = "Message is too long";
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      return;
    }
    setErrors({});
    const id = "SSH-" + Date.now().toString(36).toUpperCase().slice(-6);
    const msg = [
      `Hello Shiv Shakti Holidays, enquiry ${id}`,
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
    window.open(waLink(msg), "_blank");
    setDone(id);
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
      <Button type="submit" variant="gold" size="xl">
        {packageName ? "Get Package Quote" : "Submit Enquiry"}
      </Button>
    </form>
  );
}
