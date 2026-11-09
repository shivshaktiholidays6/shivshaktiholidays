"use client";

import { LoaderCircle, Save } from "lucide-react";
import { useFormStatus } from "react-dom";

export function DestinationSubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="inline-flex min-w-44 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-wait disabled:opacity-80"
    >
      {pending ? <><LoaderCircle className="size-4 animate-spin" /> Saving destination...</> : <><Save className="size-4" /> Save destination</>}
    </button>
  );
}
