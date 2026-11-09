"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { deletePromotion } from "@/lib/admin-actions";

function SubmitButton({ title }: { title: string }) {
  const { pending } = useFormStatus();
  return <button type="submit" disabled={pending} title="Delete offer" aria-label={pending ? `Deleting ${title}` : `Delete ${title}`} className="grid size-9 place-items-center rounded-lg border border-red-200 text-red-600 transition hover:border-red-500 hover:bg-red-50 disabled:cursor-wait disabled:opacity-60">{pending ? <LoaderCircle className="size-4 animate-spin" /> : <Trash2 className="size-4" />}</button>;
}

export function DeletePromotionButton({ id, title }: { id: string; title: string }) {
  return (
    <form action={deletePromotion} onSubmit={(event) => { if (!window.confirm(`Delete “${title}”? This cannot be undone.`)) event.preventDefault(); }}>
      <input type="hidden" name="id" value={id} />
      <SubmitButton title={title} />
    </form>
  );
}
