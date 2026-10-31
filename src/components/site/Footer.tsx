import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, MessageCircle } from "lucide-react";
import { Logo } from "./Header";
import { site, waLink, waMessages } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container-x grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo light />
          <p className="mt-5 text-sm leading-relaxed text-primary-foreground/70">{site.tagline} Domestic and international holidays, planned around you.</p>
        </div>
        <div>
          <h4 className="mb-4 text-lg">Explore</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/destinations" className="hover:text-accent">Destinations</Link></li>
            <li><Link to="/packages" className="hover:text-accent">Holiday Packages</Link></li>
            <li><Link to="/international" className="hover:text-accent">International Tours</Link></li>
            <li><Link to="/domestic" className="hover:text-accent">Domestic Tours</Link></li>
            <li><Link to="/honeymoon" className="hover:text-accent">Honeymoon</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-lg">Company</h4>
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li><Link to="/about" className="hover:text-accent">About Us</Link></li>
            <li><Link to="/plan-trip" className="hover:text-accent">Plan My Trip</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-4 text-lg">Get in touch</h4>
          <ul className="space-y-3 text-sm text-primary-foreground/70">
            <li className="flex gap-3"><Phone className="size-4 text-accent" /> <a href={`tel:${site.phone}`}>{site.phone}</a></li>
            <li className="flex gap-3"><MessageCircle className="size-4 text-accent" /> <a href={waLink(waMessages.general)} target="_blank" rel="noreferrer">WhatsApp us</a></li>
            <li className="flex gap-3"><Mail className="size-4 text-accent" /> <a href={`mailto:${site.email}`}>{site.email}</a></li>
            <li className="flex gap-3"><MapPin className="size-4 text-accent" /> {site.address}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-primary-foreground/50 sm:flex-row sm:justify-between">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>Prices shown are indicative samples and subject to confirmation.</span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsAppFloat() {
  return (
    <a href={waLink(waMessages.general)} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"
      className="fixed bottom-24 right-5 z-40 grid size-14 place-items-center rounded-full bg-accent text-accent-foreground shadow-lift transition hover:scale-105 lg:bottom-6">
      <MessageCircle className="size-6" />
    </a>
  );
}
