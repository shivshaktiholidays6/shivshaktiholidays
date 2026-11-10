"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { deletePackage } from "@/lib/admin-actions";

function SubmitButton({ name }: { name: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      title="Delete package"
      aria-label={pending ? `Deleting ${name}` : `Delete ${name}`}
      className="grid size-9 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:border-red-500 hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
    >
      {pending ? <LoaderCircle className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
    </button>
  );
}

export function DeletePackageButton({ id, name }: { id: string; name: string }) {
  return (
    <form
      action={deletePackage}
      onSubmit={(event) => {
        if (!window.confirm(`Delete ${name}? This cannot be undone.`)) event.preventDefault();
      }}
    >
      <input type="hidden" name="id" value={id} />
      <SubmitButton name={name} />
    </form>
  );
}
