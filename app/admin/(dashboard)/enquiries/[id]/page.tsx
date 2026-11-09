import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Users,
} from "lucide-react";
import { updateEnquiryStatus } from "@/lib/admin-actions";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { requireAdminUser } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

const statuses = ["new", "contacted", "quoted", "confirmed", "lost"] as const;

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}

function customerWhatsApp(phone: string, code: string) {
  let digits = phone.replace(/\D/g, "");
  if (digits.length === 10) digits = `91${digits}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(`Hello, this is Shiv Shakti Holidays regarding your enquiry ${code}.`)}`;
}

function Detail({ label, value }: { label: string; value: string | number | null | undefined }) {
  if (value === null || value === undefined || value === "") return null;
  return (
    <div>
      <dt className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-slate-800">{value}</dd>
    </div>
  );
}

export default async function AdminEnquiryDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ updated?: string; error?: string }>;
}) {
  await requireAdminUser();
  const { id } = await params;
  const notices = await searchParams;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return <div className="p-8 text-red-700">Supabase administrator access is not configured.</div>;
  }

  const { data: enquiry, error } = await supabase.from("enquiries").select("*").eq("id", id).single();
  if (error || !enquiry) notFound();

  const travellerBreakdown = [
    enquiry.adults !== null && `${enquiry.adults} adults`,
    enquiry.children !== null && `${enquiry.children} children`,
    enquiry.infants !== null && `${enquiry.infants} infants`,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft className="size-4" /> Back to enquiries
        </Link>

        {notices.updated === "1" && (
          <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Enquiry status updated successfully.
          </p>
        )}
        {notices.error && (
          <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            The status could not be updated. Please try again.
          </p>
        )}

        <header className="mt-5 flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-mono text-xl font-extrabold text-slate-950 sm:text-2xl">
                {enquiry.enquiry_code}
              </h1>
              <StatusBadge status={enquiry.status} />
            </div>
            <p className="mt-2 text-sm text-slate-500">Received {formatDate(enquiry.created_at)}</p>
          </div>
          <form action={updateEnquiryStatus} className="flex flex-wrap items-center gap-2">
            <input type="hidden" name="enquiryId" value={enquiry.id} />
            <input type="hidden" name="returnTo" value={`/admin/enquiries/${enquiry.id}`} />
            <select
              name="status"
              defaultValue={enquiry.status}
              className="h-11 min-w-36 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold outline-none focus:border-amber-500"
            >
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
            <button className="h-11 rounded-xl bg-slate-950 px-5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-slate-800">
              Update status
            </button>
          </form>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="grid gap-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-bold text-slate-950">Customer</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <Detail label="Full name" value={enquiry.name} />
                <Detail label="Enquiry type" value={enquiry.type.replace("_", " ")} />
                <Detail label="Phone" value={enquiry.phone} />
                <Detail label="Email" value={enquiry.email} />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href={`tel:${enquiry.phone}`}
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-slate-950 px-4 text-xs font-bold uppercase tracking-wider text-white"
                >
                  <Phone className="size-4" /> Call
                </a>
                <a
                  href={customerWhatsApp(enquiry.phone, enquiry.enquiry_code)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-600 px-4 text-xs font-bold uppercase tracking-wider text-white"
                >
                  <MessageCircle className="size-4" /> WhatsApp
                </a>
                <a
                  href={`mailto:${enquiry.email}?subject=${encodeURIComponent(`Your Shiv Shakti Holidays enquiry ${enquiry.enquiry_code}`)}`}
                  className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 px-4 text-xs font-bold uppercase tracking-wider text-slate-700"
                >
                  <Mail className="size-4" /> Email
                </a>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="text-xl font-bold text-slate-950">Trip requirements</h2>
              <dl className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                <Detail label="Package" value={enquiry.package_name} />
                <Detail label="Destination" value={enquiry.destination} />
                <Detail label="Departure city" value={enquiry.departure_city} />
                <Detail label="Travel start" value={enquiry.travel_start} />
                <Detail label="Travel end" value={enquiry.travel_end} />
                <Detail label="Trip duration" value={enquiry.days ? `${enquiry.days} days` : null} />
                <Detail label="Total travellers" value={enquiry.travellers} />
                <Detail label="Traveller breakdown" value={travellerBreakdown} />
                <Detail label="Budget" value={enquiry.budget} />
                <Detail label="Preferences" value={enquiry.preferences.join(", ")} />
              </dl>
              {enquiry.message && (
                <div className="mt-6 rounded-xl bg-slate-50 p-4">
                  <p className="text-[0.68rem] font-bold uppercase tracking-wider text-slate-400">Message</p>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                    {enquiry.message}
                  </p>
                </div>
              )}
            </section>
          </div>

          <aside className="grid content-start gap-6">
            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-950">Quick overview</h2>
              <div className="mt-5 grid gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-0.5 size-4 text-amber-600" />
                  <Detail label="Destination" value={enquiry.destination || "Not specified"} />
                </div>
                <div className="flex items-start gap-3">
                  <CalendarDays className="mt-0.5 size-4 text-amber-600" />
                  <Detail label="Travel date" value={enquiry.travel_start || "Not specified"} />
                </div>
                <div className="flex items-start gap-3">
                  <Users className="mt-0.5 size-4 text-amber-600" />
                  <Detail label="Travellers" value={enquiry.travellers ?? "Not specified"} />
                </div>
              </div>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-bold text-slate-950">Attribution</h2>
              <dl className="mt-5 grid gap-4">
                <Detail label="Form source" value={enquiry.source} />
                <Detail label="Website page" value={enquiry.page_path} />
                <Detail label="UTM source" value={enquiry.utm_source} />
                <Detail label="UTM medium" value={enquiry.utm_medium} />
                <Detail label="UTM campaign" value={enquiry.utm_campaign} />
              </dl>
              {enquiry.page_path && (
                <Link
                  href={enquiry.page_path}
                  target="_blank"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-800"
                >
                  Open source page <ExternalLink className="size-3.5" />
                </Link>
              )}
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
