import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy & Analytics",
  description: "How Shiv Shakti Holidays handles enquiries and optional website analytics.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="pb-24 pt-36">
      <div className="container-x max-w-3xl">
        <p className="eyebrow">Your privacy</p>
        <h1 className="mt-3 text-4xl text-primary sm:text-5xl">Privacy & Analytics</h1>
        <div className="mt-8 space-y-8 leading-relaxed text-muted-foreground">
          <div>
            <h2 className="text-2xl text-primary">Website analytics</h2>
            <p className="mt-3">
              With your permission, we use analytics to understand page visits, website performance,
              and actions such as package enquiries, WhatsApp clicks, and trip-planning starts.
              Analytics does not receive the personal details entered into our enquiry forms.
            </p>
          </div>
          <div>
            <h2 className="text-2xl text-primary">Enquiry information</h2>
            <p className="mt-3">
              Information you enter into an enquiry is used to prepare and respond to your travel
              request. Enquiries are stored securely so our team can follow up, manage their status,
              and avoid losing your request. We do not send form details to analytics. When you
              continue to WhatsApp, your message is also handled according to WhatsApp&apos;s own terms
              and privacy practices.
            </p>
          </div>
          <div>
            <h2 className="text-2xl text-primary">Your choice</h2>
            <p className="mt-3">
              Optional analytics remains disabled unless you accept it. You can change your choice
              at any time using “Cookie settings” in the website footer.
            </p>
          </div>
          <div>
            <h2 className="text-2xl text-primary">Contact</h2>
            <p className="mt-3">
              For privacy questions, contact {site.name} at{" "}
              <a className="text-primary underline underline-offset-4" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
