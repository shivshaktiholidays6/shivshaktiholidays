"use client";

import { Paperclip } from "lucide-react";
import { usePathname } from "next/navigation";

export function QuickQueryFloat() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  const sitsAbovePackageBar = /^\/packages\/[^/]+/.test(pathname);

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-lead-enquiry"))}
      aria-label="Open quick travel enquiry form"
      className={`fixed right-3 z-40 inline-flex size-11 items-center justify-center rounded-full bg-[#ffc400] text-sm font-bold text-[#07152c] shadow-[0_8px_24px_rgba(255,196,0,0.38)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ffd02f] hover:shadow-[0_10px_28px_rgba(255,196,0,0.48)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc400] focus-visible:ring-offset-2 sm:bottom-5 sm:right-5 sm:h-11 sm:w-auto sm:gap-2 sm:py-1.5 sm:pl-1.5 sm:pr-4 lg:bottom-6 ${sitsAbovePackageBar ? "bottom-20" : "bottom-4"}`}
    >
      <span className="grid size-8 place-items-center rounded-full bg-white text-[#315dbe] shadow-sm sm:size-8">
        <Paperclip className="size-4 -rotate-45" strokeWidth={2.4} />
      </span>
      <span className="hidden sm:inline">Quick Query</span>
    </button>
  );
}
