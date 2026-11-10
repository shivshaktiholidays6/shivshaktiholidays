"use client";

import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fieldClass } from "@/components/site/EnquiryForm";
import { waLink } from "@/config/site";
import { trackAnalyticsEvent } from "@/components/site/Analytics";
import { saveEnquiry } from "@/lib/enquiries";

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
    | "notes"
    | "consent"
    | "company";
  const [f, setF] = useState<Partial<Record<K, string>>>({
    adults: "2",
    children: "0",
    infants: "0",
  });
  const [types, setTypes] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [done, setDone] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [prefilled, setPrefilled] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("source") !== "holiday-finder") return;

    const category = params.get("category") ?? "";
    const preferenceMap: Record<string, string> = {
      Honeymoon: "Honeymoon",
      Family: "Family",
      Luxury: "Luxury",
      Adventure: "Adventure",
      "Group Tours": "Friends",
      "Spiritual & Pilgrimage": "Spiritual",
    };
    const validDate = (value: string | null) =>
      value && /^\d{4}-\d{2}-\d{2}$/.test(value) ? value : "";
    const validCount = (value: string | null, fallback: string) =>
      value && /^\d{1,3}$/.test(value) ? value : fallback;

    setF((current) => ({
      ...current,
      scope:
        category === "International"
          ? "International"
          : category === "Domestic"
            ? "Domestic"
            : "Not Decided Yet",
      from: (params.get("departureCity") ?? "").slice(0, 100),
      dest: (params.get("destination") ?? "").slice(0, 120),
      start: validDate(params.get("departureDate")),
      end: validDate(params.get("returnDate")),
      adults: validCount(params.get("adults"), "2"),
      children: validCount(params.get("kids"), "0"),
    }));
    if (preferenceMap[category]) setTypes([preferenceMap[category]]);
    setPrefilled(true);
  }, []);
  const set = (k: K, v: string) => setF((s) => ({ ...s, [k]: v }));
  const inp = (k: K, props: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <input
      {...props}
      value={f[k] ?? ""}
      onChange={(e) => set(k, e.target.value)}
      className={fieldClass}
    />
  );

  async function next() {
    setError("");
    if (step === 0 && !f.scope) return setError("Please choose an option.");
    if (step === 4 && !f.budget) return setError("Please choose a budget.");
    if (step === 5) {
      if (!f.name || f.name.trim().length < 2) return setError("Please enter your name.");
      if (!/^[+\d\s-]{7,16}$/.test(f.phone ?? ""))
        return setError("Please enter a valid phone number.");
      if (!/^\S+@\S+\.\S+$/.test(f.email ?? "")) return setError("Please enter a valid email.");
      if (!f.consent) return setError("Please allow us to contact you about this enquiry.");

      setSubmitting(true);
      const whatsappTab = window.open("about:blank", "_blank");
      if (whatsappTab) whatsappTab.opener = null;
      try {
        const adults = Number(f.adults ?? 0);
        const children = Number(f.children ?? 0);
        const infants = Number(f.infants ?? 0);
        const { enquiryCode } = await saveEnquiry({
          type: "plan_trip",
          source: "plan_trip_wizard",
          name: f.name.trim(),
          phone: f.phone ?? "",
          email: f.email ?? "",
          consent: true,
          company: f.company,
          destination: f.dest,
          departureCity: f.from,
          travelStart: f.start,
          travelEnd: f.end,
          adults,
          children,
          infants,
          travellers: adults + children + infants,
          preferences: types,
          budget: f.budget,
          message: f.notes,
          metadata: {
            tripScope: f.scope ?? "",
            flexibleDates: Boolean(f.flex),
          },
        });
        const msg = [
          `Hello Shiv Shakti Holidays — holiday plan request ${enquiryCode}`,
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
        const link = waLink(msg);
        trackAnalyticsEvent("plan_trip_submit", { source: "plan_trip_wizard" });
        if (whatsappTab) whatsappTab.location.href = link;
        else window.location.href = link;
        return setDone(enquiryCode);
      } catch (submitError) {
        whatsappTab?.close();
        setError(
          submitError instanceof Error
            ? submitError.message
            : "We could not save your enquiry. Please try again.",
        );
      } finally {
        setSubmitting(false);
      }
      return;
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
        {prefilled && (
          <p className="mx-auto mt-4 max-w-xl rounded-full border border-accent/25 bg-accent/10 px-4 py-2 text-center text-xs font-medium text-primary sm:text-sm">
            Your holiday search details have been added. Review them as you continue.
          </p>
        )}
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
              <input
                name="company"
                value={f.company ?? ""}
                onChange={(event) => set("company", event.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-px w-px overflow-hidden"
              />
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
              <label className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-muted-foreground">
                <input
                  type="checkbox"
                  checked={Boolean(f.consent)}
                  onChange={(event) => set("consent", event.target.checked ? "1" : "")}
                  className="mt-0.5 size-4 rounded border-input accent-[var(--accent)]"
                />
                <span>I agree to be contacted regarding this travel enquiry.</span>
              </label>
            </div>
          )}
          {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          <div className="mt-8 flex justify-between">
            <Button
              variant="ghost"
              disabled={step === 0 || submitting}
              onClick={() => setStep((s) => s - 1)}
            >
              Back
            </Button>
            <Button variant="gold" size="xl" onClick={next} disabled={submitting}>
              {submitting
                ? "Saving enquiry..."
                : step === 5
                  ? "Create My Holiday Plan"
                  : "Continue"}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
