"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLink, LayoutDashboard, MapPinned, MessageSquareText, PackageOpen } from "lucide-react";

const baseClass =
  "flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition";

export function AdminNavigation() {
  const pathname = usePathname();
  const dashboardActive = pathname === "/admin";
  const enquiriesActive = pathname.startsWith("/admin/enquiries");
  const packagesActive = pathname.startsWith("/admin/packages");
  const destinationsActive = pathname.startsWith("/admin/destinations");

  return (
    <nav className="flex gap-2 overflow-x-auto p-3 lg:flex-1 lg:flex-col lg:overflow-visible lg:p-4">
      <Link
        href="/admin"
        aria-current={dashboardActive ? "page" : undefined}
        className={`${baseClass} ${dashboardActive ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
      >
        <LayoutDashboard className="size-4 text-accent" /> Dashboard
      </Link>
      <Link
        href="/admin/enquiries"
        aria-current={enquiriesActive ? "page" : undefined}
        className={`${baseClass} ${enquiriesActive ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
      >
        <MessageSquareText className="size-4 text-accent" /> Enquiries
      </Link>
      <Link
        href="/admin/packages"
        aria-current={packagesActive ? "page" : undefined}
        className={`${baseClass} ${packagesActive ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
      >
        <PackageOpen className="size-4 text-accent" /> Packages
      </Link>
      <Link
        href="/admin/destinations"
        aria-current={destinationsActive ? "page" : undefined}
        className={`${baseClass} ${destinationsActive ? "bg-white/15 text-white" : "text-white/75 hover:bg-white/10 hover:text-white"}`}
      >
        <MapPinned className="size-4 text-accent" /> Destinations
      </Link>
      <Link
        href="/"
        target="_blank"
        className={`${baseClass} text-white/75 hover:bg-white/10 hover:text-white`}
      >
        <ExternalLink className="size-4 text-accent" /> View website
      </Link>
    </nav>
  );
}
