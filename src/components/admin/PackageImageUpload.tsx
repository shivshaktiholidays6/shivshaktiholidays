"use client";

import { useState } from "react";

const minimumWidth = 1600;
const minimumHeight = 900;

export function PackageImageUpload({ editing = false }: { editing?: boolean }) {
  const [feedback, setFeedback] = useState("");
  const [valid, setValid] = useState(true);

  async function inspectImage(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    input.setCustomValidity("");
    setValid(true);
    if (!file) {
      setFeedback("");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      const message = "The image is larger than 5 MB.";
      input.setCustomValidity(message);
      setFeedback(message);
      setValid(false);
      return;
    }

    try {
      const bitmap = await createImageBitmap(file);
      const dimensions = `${bitmap.width} × ${bitmap.height} px`;
      const isLargeEnough = bitmap.width >= minimumWidth && bitmap.height >= minimumHeight;
      bitmap.close();

      if (!isLargeEnough) {
        const message = `${dimensions} is too small for a full-width hero. Upload at least ${minimumWidth} × ${minimumHeight} px.`;
        input.setCustomValidity(message);
        setFeedback(message);
        setValid(false);
        return;
      }

      setFeedback(`${dimensions} — excellent for package cards and the detail-page hero.`);
    } catch {
      const message = "The image dimensions could not be read. Choose another image file.";
      input.setCustomValidity(message);
      setFeedback(message);
      setValid(false);
    }
  }

  return (
    <label className="text-sm font-semibold text-slate-700">
      Upload landscape image {editing ? "" : "*"}
      <input
        name="imageFile"
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={inspectImage}
        className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none transition file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-bold focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15"
      />
      <span className={`mt-1 block text-xs font-normal ${valid ? "text-slate-500" : "text-red-600"}`}>
        {feedback || "Recommended: 1920 × 1080 px landscape WebP/JPEG. Minimum 1600 × 900 px, maximum 5 MB."}
      </span>
    </label>
  );
}
