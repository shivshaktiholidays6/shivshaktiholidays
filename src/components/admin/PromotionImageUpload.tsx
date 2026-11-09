"use client";

import { useState } from "react";

export function PromotionImageUpload() {
  const [feedback, setFeedback] = useState("");
  const [valid, setValid] = useState(true);

  async function inspectImage(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];
    input.setCustomValidity("");
    setValid(true);
    if (!file) { setFeedback(""); return; }
    if (file.size > 5 * 1024 * 1024) {
      const message = "The image is larger than 5 MB.";
      input.setCustomValidity(message); setFeedback(message); setValid(false); return;
    }
    try {
      const bitmap = await createImageBitmap(file);
      const dimensions = `${bitmap.width} × ${bitmap.height} px`;
      const enough = bitmap.width >= 900 && bitmap.height >= 550;
      bitmap.close();
      if (!enough) {
        const message = `${dimensions} is too small. Upload at least 900 × 550 px.`;
        input.setCustomValidity(message); setFeedback(message); setValid(false); return;
      }
      setFeedback(`${dimensions} — ready for the promotional card.`);
    } catch {
      const message = "The image dimensions could not be read.";
      input.setCustomValidity(message); setFeedback(message); setValid(false);
    }
  }

  return (
    <label className="text-sm font-semibold text-slate-700">
      Upload promotional image
      <input name="promotionImageFile" type="file" accept="image/jpeg,image/png,image/webp,image/avif" onChange={inspectImage} className="mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm outline-none file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-xs file:font-bold focus:border-amber-500" />
      <span className={`mt-1 block text-xs font-normal ${valid ? "text-slate-500" : "text-red-600"}`}>{feedback || "Recommended: 1200 × 800 px. Minimum 900 × 550 px, maximum 5 MB."}</span>
    </label>
  );
}
