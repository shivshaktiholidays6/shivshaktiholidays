import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { site, waLink, waMessages } from "@/config/site";

export default function Page() {
  return (
    <section className="pb-24 pt-36">
      <div className="container-x grid gap-12 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-3 text-4xl text-primary md:text-5xl">
            Your Next Adventure Is Just One Enquiry Away.
          </h1>
          <ul className="mt-10 space-y-5">
            <li className="flex gap-4">
              <Phone className="text-accent" />
              <span className="flex flex-col gap-1">
                <a href={`tel:${site.phone}`}>{site.phone}</a>
                <a href={`tel:${site.phoneSecondary}`}>{site.phoneSecondary}</a>
              </span>
            </li>
            <li className="flex gap-4">
              <Mail className="text-accent" />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li className="flex gap-4">
              <MapPin className="text-accent" />
              {site.address}
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="navy" size="xl">
              <a href={waLink(waMessages.general)} target="_blank" rel="noreferrer">
                <MessageCircle />
                Chat on WhatsApp
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="xl"
              className="font-semibold uppercase tracking-wider text-xs"
            >
              <a href={`tel:${site.phone}`}>
                <Phone />
                Call Us
              </a>
            </Button>
          </div>
        </div>
        <div className="rounded-2xl bg-card p-8 shadow-soft lg:col-span-3">
          <EnquiryForm />
        </div>
      </div>
    </section>
  );
}
