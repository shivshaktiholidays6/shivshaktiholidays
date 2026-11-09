"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fieldClass } from "@/components/site/EnquiryForm";
import { waLink } from "@/config/site";
import { trackAnalyticsEvent } from "@/components/site/Analytics";

const steps = ["Destination", "Travel details", "Travellers", "Preferences", "Budget", "Contact"];
const budgets = [
  "Under ₹25,000",
  "₹25,000–₹50,000",
  "₹50,000–₹1,00,000",
  "₹1,00,000–₹2,00,000",
  "₹2,00,000+",
  "Flexible Budget",
];
const prefs = [
  "Honeymoon",
  "Family",
  "Friends",
  "Solo",
  "Corporate",
  "Adventure",
  "Luxury",
  "Spiritual",
];

function Chip({
  on,
  children,
  onClick,
}: {
  on: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-xl border px-5 py-4 text-left text-sm font-semibold transition ${on ? "border-accent bg-accent/15 text-primary" : "border-border bg-card hover:border-accent"}`}
    >
      {children}
    </button>
  );
}

export default function Page() {
  const [step, setStep] = useState(0);
  type K =
    | "scope"
    | "from"
    | "dest"
    | "start"
    | "end"
    | "flex"
    | "adults"
    | "children"
    | "infants"
    | "budget"
    | "name"
    | "phone"
    | "email"
    | "notes";
  const [f, setF] = useState<Partial<Record<K, string>>>({
    adults: "2",
    children: "0",
    infants: "0",
  });
  const [types, setTypes] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [done, setDone] = useState<string | null>(null);
  const set = (k: K, v: string) => setF((s) => ({ ...s, [k]: v }));
  const inp = (k: K, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <input
      {...props}
      value={f[k] ?? ""}
      onChange={(e) => set(k, e.target.value)}
      className={fieldClass}
    />
  );

  function next() {
    setError("");
    if (step === 0 && !f.scope) return setError("Please choose an option.");
    if (step === 4 && !f.budget) return setError("Please choose a budget.");
    if (step === 5) {
      if (!f.name || f.name.trim().length < 2) return setError("Please enter your name.");
      if (!/^[+\d\s-]{7,16}$/.test(f.phone ?? ""))
        return setError("Please enter a valid phone number.");
      if (!/^\S+@\S+\.\S+$/.test(f.email ?? "")) return setError("Please enter a valid email.");
      const id = "SSH-" + Date.now().toString(36).toUpperCase().slice(-6);
      const msg = [
        `Hello Shiv Shakti Holidays — holiday plan request ${id}`,
        `Type: ${f.scope}`,
        `From: ${f.from || "-"}`,
        `Destination: ${f.dest || "-"}`,
        `Dates: ${f.start || "?"} to ${f.end || "?"}${f.flex ? " (flexible)" : ""}`,
        `Travellers: ${f.adults} adults, ${f.children} children, ${f.infants} infants`,
        `Holiday type: ${types.join(", ") || "-"}`,
        `Budget: ${f.budget}`,
        `Name: ${f.name}`,
        `Phone: ${f.phone}`,
        `Email: ${f.email}`,
        f.notes && `Notes: ${f.notes}`,
      ]
        .filter(Boolean)
        .join("\n");
      trackAnalyticsEvent("plan_trip_submit", { source: "plan_trip_wizard" });
      window.open(waLink(msg), "_blank");
      return setDone(id);
    }
    setStep((s) => s + 1);
  }

  if (done)
    return (
      <section className="grid min-h-screen place-items-center px-5 pt-20">
        <div className="max-w-md text-center">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-accent-foreground">
            <Check />
          </span>
          <p className="eyebrow mt-6">Enquiry {done}</p>
          <h1 className="mt-2 text-4xl text-primary">Your holiday plan is on its way</h1>
          <p className="mt-4 text-muted-foreground">
            Press send in WhatsApp and our travel team will prepare your personalised proposal.
          </p>
        </div>
      </section>
    );

  return (
    <section className="pb-24 pt-36">
      <div className="container-x max-w-3xl">
        <p className="eyebrow text-center">Customized holiday planner</p>
        <h1 className="mt-3 text-center text-4xl text-primary md:text-5xl">Plan My Trip</h1>
        <div className="mt-10 flex gap-1.5">
          {steps.map((s, i) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full ${i <= step ? "bg-accent" : "bg-border"}`}
            />
          ))}
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Step {step + 1} of 6 — {steps[step]}
        </p>
        <div className="mt-8 rounded-2xl bg-card p-6 shadow-soft md:p-10">
          {step === 0 && (
            <div className="grid gap-3 sm:grid-cols-3">
              {["Domestic", "International", "Not Decided Yet"].map((o) => (
                <Chip key={o} on={f.scope === o} onClick={() => set("scope", o)}>
                  {o}
                </Chip>
              ))}
            </div>
          )}
          {step === 1 && (
            <div className="grid gap-4 sm:grid-cols-2">
              {inp("from", { placeholder: "Departure city" })}
              {inp("dest", { placeholder: "Destination" })}
              <label className="text-sm text-muted-foreground">
                Departure date{inp("start", { type: "date" })}
              </label>
              <label className="text-sm text-muted-foreground">
                Return date{inp("end", { type: "date" })}
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={!!f.flex}
                  onChange={(e) => set("flex", e.target.checked ? "1" : "")}
                  className="accent-accent"
                />
                My dates are flexible
              </label>
            </div>
          )}
          {step === 2 && (
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["adults", "Adults", 1],
                ["children", "Children", 0],
                ["infants", "Infants", 0],
              ].map(([k, l, m]) => (
                <label key={k as string} className="text-sm text-muted-foreground">
                  {l as string}
                  {inp(k as K, { type: "number", min: m as number })}
                </label>
              ))}
            </div>
          )}
          {step === 3 && (
            <div className="grid gap-3 sm:grid-cols-4">
              {prefs.map((o) => (
                <Chip
                  key={o}
                  on={types.includes(o)}
                  onClick={() =>
                    setTypes((t) => (t.includes(o) ? t.filter((x) => x !== o) : [...t, o]))
                  }
                >
                  {o}
                </Chip>
              ))}
            </div>
          )}
          {step === 4 && (
            <div className="grid gap-3 sm:grid-cols-3">
              {budgets.map((o) => (
                <Chip key={o} on={f.budget === o} onClick={() => set("budget", o)}>
                  {o}
                </Chip>
              ))}
            </div>
          )}
          {step === 5 && (
            <div className="grid gap-4">
              {inp("name", { placeholder: "Full name" })}
              <div className="grid gap-4 sm:grid-cols-2">
                {inp("phone", { placeholder: "Phone number" })}
                {inp("email", { placeholder: "Email", type: "email" })}
              </div>
              <textarea
                value={f.notes ?? ""}
                onChange={(e) => set("notes", e.target.value)}
                rows={4}
                placeholder="Additional requirements"
                className={fieldClass}
              />
            </div>
          )}
          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          <div className="mt-8 flex justify-between">
            <Button variant="ghost" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>
              Back
            </Button>
            <Button variant="gold" size="xl" onClick={next}>
              {step === 5 ? "Create My Holiday Plan" : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
