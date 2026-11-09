const styles: Record<string, string> = {
  new: "bg-blue-50 text-blue-700 ring-blue-600/20",
  contacted: "bg-amber-50 text-amber-700 ring-amber-600/20",
  quoted: "bg-violet-50 text-violet-700 ring-violet-600/20",
  confirmed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  lost: "bg-slate-100 text-slate-600 ring-slate-500/20",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-[0.68rem] font-bold uppercase tracking-wider ring-1 ring-inset ${styles[status] ?? styles["new"]}`}
    >
      {status}
    </span>
  );
}
