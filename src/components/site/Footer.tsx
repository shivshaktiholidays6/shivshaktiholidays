import Link from "next/link";
import { Facebook, Instagram, Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Logo } from "./Header";
import { site, waLink, waMessages } from "@/config/site";
import { AnalyticsPreferencesButton } from "@/components/site/Analytics";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-8 py-10 sm:py-12 lg:grid-cols-[1.2fr_0.75fr_0.75fr_1.35fr] lg:gap-8">
        <div className="col-span-2 lg:col-span-1">
          <Logo light />
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-primary-foreground/65 sm:text-sm">
            {site.tagline} Domestic and international holidays, planned around you.
          </p>
          <div className="mt-4 flex items-center gap-5" aria-label="Social media">
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noreferrer"
              aria-label="Follow Shiv Shakti Holidays on Instagram"
              className="text-[#E4405F] transition duration-200 hover:-translate-y-0.5 hover:scale-110 hover:text-[#ff5c7c]"
            >
              <Instagram className="size-5" strokeWidth={2.2} />
            </a>
            <span
              aria-label="Shiv Shakti Holidays on Facebook — coming soon"
              title="Facebook — coming soon"
              className="text-[#1877F2]"
            >
              <Facebook className="size-5 fill-current" strokeWidth={1.8} />
            </span>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-base">Explore</h4>
          <ul className="space-y-1.5 text-xs text-primary-foreground/70 sm:text-sm">
            <li>
              <Link href="/destinations" className="hover:text-accent">
                Destinations
              </Link>
            </li>
            <li>
              <Link href="/packages" className="hover:text-accent">
                Holiday Packages
              </Link>
            </li>
            <li>
              <Link href="/international" className="hover:text-accent">
                International Tours
              </Link>
            </li>
            <li>
              <Link href="/domestic" className="hover:text-accent">
                Domestic Tours
              </Link>
            </li>
            <li>
              <Link href="/honeymoon" className="hover:text-accent">
                Honeymoon
              </Link>
            </li>
            <li>
              <Link href="/packages#spiritual-places" className="hover:text-accent">
                Spiritual Journeys
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="mb-3 text-base">Company</h4>
          <ul className="space-y-1.5 text-xs text-primary-foreground/70 sm:text-sm">
            <li>
              <Link href="/about" className="hover:text-accent">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/plan-trip" className="hover:text-accent">
                Plan My Trip
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-accent">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/privacy" className="hover:text-accent">
                Privacy & Analytics
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 lg:col-span-1">
          <h4 className="mb-3 text-base">Get in touch</h4>
          <ul className="grid gap-2.5 text-xs text-primary-foreground/70 sm:grid-cols-2 sm:text-sm lg:grid-cols-1">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent" />{" "}
              <span>
                <a href={`tel:${site.phone}`}>{site.phone}</a>
                <span className="mx-1.5 text-primary-foreground/30">/</span>
                <a href={`tel:${site.phoneSecondary}`}>{site.phoneSecondary}</a>
              </span>
            </li>
            <li className="flex items-start gap-2.5">
              <MessageCircle className="mt-0.5 size-4 shrink-0 text-accent" />{" "}
              <a href={waLink(waMessages.general)} target="_blank" rel="noreferrer">
                WhatsApp us
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent" />{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent" />
              <span>
                {site.address}
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 block w-fit font-semibold text-accent underline-offset-4 hover:underline"
                >
                  Get directions
                </a>
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-x flex flex-col gap-2 py-4 text-[0.68rem] text-primary-foreground/50 sm:flex-row sm:items-center sm:justify-between sm:text-xs">
          <span>
            © {new Date().getFullYear()} {site.name}. All rights reserved.
          </span>
          <span className="flex flex-wrap gap-x-3 gap-y-1 sm:justify-end">
            <span>Prices shown are indicative samples and subject to confirmation.</span>
            <AnalyticsPreferencesButton className="hover:text-accent" />
          </span>
        </div>
      </div>
    </footer>
  );
}

