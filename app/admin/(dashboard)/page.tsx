import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  FileText,
  Inbox,
  Mail,
  MessageSquareText,
  Phone,
  Search,
  Users,
} from "lucide-react";
import { updateEnquiryStatus } from "@/lib/admin-actions";
import { DeleteEnquiryButton } from "@/components/admin/DeleteEnquiryButton";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { requireAdminUser } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";
import type { Database } from "@/lib/supabase/database.types";

type Enquiry = Database["public"]["Tables"]["enquiries"]["Row"];

const statuses = ["all", "new", "contacted", "quoted", "confirmed", "lost"] as const;
const types = ["all", "general", "package", "popup", "plan_trip"] as const;

function firstValue(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function readableType(type: string) {
  return type === "plan_trip"
    ? "Plan My Trip"
    : type.charAt(0).toUpperCase() + type.slice(1);
}

export default async function AdminDashboardPage({
  searchParams,
  view = "dashboard",
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
  view?: "dashboard" | "enquiries";
}) {
  await requireAdminUser();
  const params = await searchParams;
  const query = firstValue(params["q"]).trim().toLowerCase();
  const statusFilter = firstValue(params["status"]) || "all";
  const typeFilter = firstValue(params["type"]) || "all";
  const updated = firstValue(params["updated"]) === "1";
  const deleted = firstValue(params["deleted"]) === "1";
  const actionError = firstValue(params["error"]);
  const supabase = getSupabaseAdmin();

  if (!supabase) {
    return (
      <div className="p-5 sm:p-8">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
          Supabase administrator access is not configured. Check the server environment variables.
        </div>
      </div>
    );
  }

  const [enquiriesResult, totalResult, newResult, quotedResult, confirmedResult] = await Promise.all([
    supabase.from("enquiries").select("*").order("created_at", { ascending: false }).limit(500),
    supabase.from("enquiries").select("*", { count: "exact", head: true }),
    supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("status", "new"),
    supabase.from("enquiries").select("*", { count: "exact", head: true }).eq("status", "quoted"),
    supabase
      .from("enquiries")
      .select("*", { count: "exact", head: true })
      .eq("status", "confirmed"),
  ]);

  if (enquiriesResult.error) {
    return (
      <div className="p-5 sm:p-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-800">
          The enquiries could not be loaded. Confirm that the database migration has been run.
        </div>
      </div>
    );
  }

  const enquiries = (enquiriesResult.data ?? []) as Enquiry[];
  const filtered = enquiries.filter((enquiry) => {
    if (statusFilter !== "all" && enquiry.status !== statusFilter) return false;
    if (typeFilter !== "all" && enquiry.type !== typeFilter) return false;
    if (!query) return true;
    return [
      enquiry.enquiry_code,
      enquiry.name,
      enquiry.email,
      enquiry.phone,
      enquiry.destination,
      enquiry.package_name,
      enquiry.departure_city,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(query);
  });

  const returnParams = new URLSearchParams();
  if (query) returnParams.set("q", query);
  if (statusFilter !== "all") returnParams.set("status", statusFilter);
  if (typeFilter !== "all") returnParams.set("type", typeFilter);
  const basePath = view === "enquiries" ? "/admin/enquiries" : "/admin";
  const returnTo = `${basePath}${returnParams.size ? `?${returnParams.toString()}` : ""}`;

  const statCards = [
    { label: "Total enquiries", value: totalResult.count ?? 0, icon: Inbox, tone: "bg-blue-50 text-blue-700" },
    { label: "Awaiting response", value: newResult.count ?? 0, icon: Clock3, tone: "bg-amber-50 text-amber-700" },
    { label: "Quotes shared", value: quotedResult.count ?? 0, icon: FileText, tone: "bg-violet-50 text-violet-700" },
    { label: "Confirmed", value: confirmedResult.count ?? 0, icon: CheckCircle2, tone: "bg-emerald-50 text-emerald-700" },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1500px]">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Lead management</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-950 sm:text-4xl">
              {view === "enquiries" ? "All Enquiries" : "Enquiry Dashboard"}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Review incoming travel requests and keep every follow-up organised.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="size-2 rounded-full bg-emerald-500" /> Live database
          </div>
        </header>

        {updated && (
          <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Enquiry status updated successfully.
          </p>
        )}
        {deleted && (
          <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Enquiry deleted successfully.
          </p>
        )}
        {actionError && (
          <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            The enquiry action could not be completed. Please try again.
          </p>
        )}

        <section className="mt-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
          {statCards.map(({ label, value, icon: Icon, tone }) => (
            <article key={label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
              <div className={`grid size-10 place-items-center rounded-xl ${tone}`}>
                <Icon className="size-5" />
              </div>
              <p className="mt-5 text-2xl font-extrabold text-slate-950 sm:text-3xl">{value}</p>
              <p className="mt-1 text-xs font-semibold text-slate-500 sm:text-sm">{label}</p>
            </article>
          ))}
        </section>

        <section id="enquiries" className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <div className="flex items-center gap-2">
              <MessageSquareText className="size-5 text-amber-600" />
              <h2 className="text-xl font-bold text-slate-950">All enquiries</h2>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-600">
                {filtered.length}
              </span>
            </div>

            <form className="mt-4 grid gap-3 md:grid-cols-[minmax(240px,1fr)_180px_180px_auto]">
              <label className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  name="q"
                  defaultValue={firstValue(params["q"])}
                  placeholder="Search name, phone, code..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15"
                />
              </label>
              <select
                name="status"
                defaultValue={statusFilter}
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-amber-500"
              >
                {statuses.map((status) => (
                  <option key={status} value={status}>
                    {status === "all" ? "All statuses" : status.charAt(0).toUpperCase() + status.slice(1)}
                  </option>
                ))}
              </select>
              <select
                name="type"
                defaultValue={typeFilter}
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-amber-500"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type === "all" ? "All enquiry types" : readableType(type)}
                  </option>
                ))}
              </select>
              <button className="h-11 rounded-xl bg-slate-950 px-5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-slate-800">
                Apply filters
              </button>
            </form>
          </div>

          {filtered.length === 0 ? (
            <div className="grid min-h-64 place-items-center p-8 text-center">
              <div>
                <Users className="mx-auto size-9 text-slate-300" />
                <p className="mt-3 font-semibold text-slate-700">No matching enquiries</p>
                <p className="mt-1 text-sm text-slate-500">Try changing the search or filters.</p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px] text-left text-sm">
                <thead className="bg-slate-50 text-[0.68rem] uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3 font-bold">Enquiry</th>
                    <th className="px-5 py-3 font-bold">Customer</th>
                    <th className="px-5 py-3 font-bold">Trip</th>
                    <th className="px-5 py-3 font-bold">Received</th>
                    <th className="px-5 py-3 font-bold">Status</th>
                    <th className="px-5 py-3 text-right font-bold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.slice(0, 100).map((enquiry) => (
                    <tr key={enquiry.id} className="transition hover:bg-slate-50/80">
                      <td className="px-5 py-4">
                        <p className="font-mono text-xs font-bold text-slate-900">{enquiry.enquiry_code}</p>
                        <p className="mt-1 text-xs text-slate-500">{readableType(enquiry.type)}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-bold text-slate-900">{enquiry.name}</p>
                        <div className="mt-1 flex items-center gap-3 text-xs text-slate-500">
                          <a href={`tel:${enquiry.phone}`} className="inline-flex items-center gap-1 hover:text-amber-700">
                            <Phone className="size-3" /> {enquiry.phone}
                          </a>
                          <a href={`mailto:${enquiry.email}`} className="inline-flex items-center gap-1 hover:text-amber-700">
                            <Mail className="size-3" /> Email
                          </a>
                        </div>
                      </td>
                      <td className="max-w-64 px-5 py-4">
                        <p className="truncate font-semibold text-slate-800">
                          {enquiry.package_name || enquiry.destination || "Custom holiday"}
                        </p>
                        <p className="mt-1 truncate text-xs text-slate-500">
                          {enquiry.departure_city ? `From ${enquiry.departure_city}` : enquiry.source}
                        </p>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-xs text-slate-500">
                        {formatDate(enquiry.created_at)}
                      </td>
                      <td className="px-5 py-4">
                        <form action={updateEnquiryStatus} className="flex items-center gap-2">
                          <input type="hidden" name="enquiryId" value={enquiry.id} />
                          <input type="hidden" name="returnTo" value={returnTo} />
                          <select
                            name="status"
                            defaultValue={enquiry.status}
                            aria-label={`Status for ${enquiry.enquiry_code}`}
                            className="h-9 rounded-lg border border-slate-200 bg-white px-2 text-xs font-semibold outline-none focus:border-amber-500"
                          >
                            {statuses.slice(1).map((status) => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </option>
                            ))}
                          </select>
                          <button className="h-9 rounded-lg bg-slate-100 px-3 text-xs font-bold text-slate-700 transition hover:bg-slate-200">
                            Save
                          </button>
                        </form>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/enquiries/${enquiry.id}`}
                            className="inline-flex size-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:border-amber-500 hover:text-amber-700"
                            aria-label={`View ${enquiry.enquiry_code}`}
                            title="View enquiry"
                          >
                            <ArrowUpRight className="size-4" />
                          </Link>
                          <DeleteEnquiryButton
                            enquiryId={enquiry.id}
                            enquiryCode={enquiry.enquiry_code}
                            returnTo={returnTo}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
