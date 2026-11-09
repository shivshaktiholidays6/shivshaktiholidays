"use client";

import { LoaderCircle, Trash2 } from "lucide-react";
import { useFormStatus } from "react-dom";
import { deleteEnquiry } from "@/lib/admin-actions";

function DeleteButton({ enquiryCode }: { enquiryCode: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex size-9 items-center justify-center rounded-lg border border-red-200 text-red-600 transition hover:border-red-500 hover:bg-red-50 disabled:cursor-wait disabled:opacity-60"
      aria-label={pending ? `Deleting ${enquiryCode}` : `Delete ${enquiryCode}`}
      title="Delete enquiry"
    >
      {pending ? <LoaderCircle className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
    </button>
  );
}

export function DeleteEnquiryButton({
  enquiryId,
  enquiryCode,
  returnTo,
}: {
  enquiryId: string;
  enquiryCode: string;
  returnTo: string;
}) {
  return (
    <form
      action={deleteEnquiry}
      onSubmit={(event) => {
        if (!window.confirm(`Delete enquiry ${enquiryCode}? This action cannot be undone.`)) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="enquiryId" value={enquiryId} />
      <input type="hidden" name="returnTo" value={returnTo} />
      <DeleteButton enquiryCode={enquiryCode} />
    </form>
  );
}
