import type { Metadata } from "next";
import Link from "next/link";
import { Edit3, Eye, EyeOff, Plus, Search } from "lucide-react";
import { ResponsiveImage } from "@/components/site/ResponsiveImage";
import { setPackagePublished } from "@/lib/admin-actions";
import { requireAdminUser } from "@/lib/admin-auth";
import { getSupabaseAdmin } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  title: "Packages | Admin",
  robots: { index: false, follow: false },
};

function first(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

export default async function AdminPackagesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  await requireAdminUser();
  const params = await searchParams;
  const query = first(params["q"]).trim().toLowerCase();
  const publishedFilter = first(params["published"]) || "all";
  const updated = first(params["updated"]) === "1";
  const actionError = first(params["error"]);
  const supabase = getSupabaseAdmin();

  if (!supabase) return <div className="p-8 text-red-700">Supabase is not configured.</div>;
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("updated_at", { ascending: false });

  if (error) {
    return (
      <div className="p-5 sm:p-8">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
          <h1 className="text-xl font-bold">Package database setup required</h1>
          <p className="mt-2 text-sm">
            Run <code>202611090002_create_packages.sql</code> in the Supabase SQL Editor, then refresh this page.
          </p>
        </div>
      </div>
    );
  }

  const packages = (data ?? []).filter((item) => {
    if (publishedFilter === "published" && !item.published) return false;
    if (publishedFilter === "draft" && item.published) return false;
    if (!query) return true;
    return `${item.name} ${item.place} ${item.slug}`.toLowerCase().includes(query);
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-600">Content management</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-950 sm:text-4xl">Holiday Packages</h1>
            <p className="mt-2 text-sm text-slate-500">Create, update, publish and organise website packages.</p>
          </div>
          <Link
            href="/admin/packages/new"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 text-xs font-bold uppercase tracking-wider text-white hover:bg-slate-800"
          >
            <Plus className="size-4" /> Add package
          </Link>
        </header>

        {updated && (
          <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
            Package publishing status updated.
          </p>
        )}
        {actionError && (
          <p className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            The package could not be updated. Please try again.
          </p>
        )}

        <section className="mt-7 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-4 sm:p-5">
            <form className="grid gap-3 sm:grid-cols-[1fr_190px_auto]">
              <label className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <input
                  name="q"
                  defaultValue={first(params["q"])}
                  placeholder="Search packages..."
                  className="h-11 w-full rounded-xl border border-slate-200 pl-10 pr-3 text-sm outline-none focus:border-amber-500"
                />
              </label>
              <select
                name="published"
                defaultValue={publishedFilter}
                className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-amber-500"
              >
                <option value="all">Published and drafts</option>
                <option value="published">Published only</option>
                <option value="draft">Drafts only</option>
              </select>
              <button className="h-11 rounded-xl bg-slate-950 px-5 text-xs font-bold uppercase tracking-wider text-white">
                Apply
              </button>
            </form>
          </div>

          {packages.length === 0 ? (
            <div className="grid min-h-64 place-items-center p-8 text-center">
              <div>
                <p className="font-semibold text-slate-700">No database packages yet</p>
                <p className="mt-1 text-sm text-slate-500">The existing website catalogue remains active until you add and publish packages.</p>
                <Link href="/admin/packages/new" className="mt-4 inline-flex text-sm font-bold text-amber-700">
                  Create your first package →
                </Link>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[940px] text-left text-sm">
                <thead className="bg-slate-50 text-[0.68rem] uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Package</th>
                    <th className="px-5 py-3">Scope</th>
                    <th className="px-5 py-3">Duration</th>
                    <th className="px-5 py-3">Price</th>
                    <th className="px-5 py-3">Visibility</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {packages.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/80">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="relative size-14 overflow-hidden rounded-xl bg-slate-100">
                            <ResponsiveImage src={item.image_url} alt="" fill sizes="56px" className="object-cover" />
                          </div>
                          <div>
                            <p className="font-bold text-slate-900">{item.name}</p>
                            <p className="mt-0.5 text-xs text-slate-500">{item.place}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4 capitalize text-slate-600">{item.scope}</td>
                      <td className="px-5 py-4 text-slate-600">{item.nights}N / {item.nights + 1}D</td>
                      <td className="px-5 py-4 font-bold text-slate-900">₹{item.price.toLocaleString("en-IN")}</td>
                      <td className="px-5 py-4">
                        <span className={`rounded-full px-2.5 py-1 text-xs font-bold ${item.published ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"}`}>
                          {item.published ? "Published" : "Draft"}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          {item.published && (
                            <Link
                              href={`/packages/${item.slug}`}
                              target="_blank"
                              className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:border-amber-500 hover:text-amber-700"
                              aria-label={`View ${item.name}`}
                            >
                              <Eye className="size-4" />
                            </Link>
                          )}
                          <Link
                            href={`/admin/packages/${item.id}/edit`}
                            className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:border-amber-500 hover:text-amber-700"
                            aria-label={`Edit ${item.name}`}
                          >
                            <Edit3 className="size-4" />
                          </Link>
                          <form action={setPackagePublished}>
                            <input type="hidden" name="id" value={item.id} />
                            <input type="hidden" name="published" value={item.published ? "false" : "true"} />
                            <button
                              className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-600 hover:border-amber-500 hover:text-amber-700"
                              aria-label={item.published ? `Unpublish ${item.name}` : `Publish ${item.name}`}
                            >
                              {item.published ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                          </form>
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
