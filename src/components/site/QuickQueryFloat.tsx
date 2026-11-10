"use client";

import { Paperclip } from "lucide-react";
import { usePathname } from "next/navigation";

export function QuickQueryFloat() {
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;

  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-lead-enquiry"))}
      aria-label="Open quick travel enquiry form"
      className="fixed bottom-24 right-3 z-40 inline-flex h-12 items-center gap-2 rounded-full bg-[#ffc400] py-1.5 pl-1.5 pr-4 text-sm font-bold text-[#07152c] shadow-[0_8px_24px_rgba(255,196,0,0.38)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ffd02f] hover:shadow-[0_10px_28px_rgba(255,196,0,0.48)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffc400] focus-visible:ring-offset-2 sm:right-5 lg:bottom-6"
    >
      <span className="grid size-9 place-items-center rounded-full bg-white text-[#315dbe] shadow-sm">
        <Paperclip className="size-4.5 -rotate-45" strokeWidth={2.4} />
      </span>
      <span>Quick Query</span>
    </button>
  );
}
