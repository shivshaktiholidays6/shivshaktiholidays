"use client";

import { LoaderCircle, Save } from "lucide-react";
import { useFormStatus } from "react-dom";

export function PackageSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className="inline-flex min-w-44 cursor-pointer items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md active:translate-y-0 disabled:cursor-wait disabled:bg-slate-700 disabled:opacity-90"
    >
      {pending ? (
        <>
          <LoaderCircle className="size-4 animate-spin" />
          <span className="animate-pulse">Saving package...</span>
        </>
      ) : (
        <>
          <Save className="size-4" /> Save package
        </>
      )}
    </button>
  );
}
