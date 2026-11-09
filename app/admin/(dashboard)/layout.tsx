import type { Metadata } from "next";
import Image from "next/image";
import { LogOut } from "lucide-react";
import { AdminNavigation } from "@/components/admin/AdminNavigation";
import { adminLogout } from "@/lib/admin-actions";
import { requireAdminUser } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const user = await requireAdminUser();

  return (
    <div data-admin-root className="min-h-screen bg-slate-50 text-slate-900 lg:grid lg:grid-cols-[250px_1fr]">
      <aside className="border-b border-white/10 bg-primary text-primary-foreground lg:fixed lg:inset-y-0 lg:w-[250px] lg:border-b-0 lg:border-r">
        <div className="flex h-full flex-col">
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-5">
            <Image
              src="/logoimg.jpeg"
              alt="Shiv Shakti Holidays"
              width={44}
              height={44}
              className="size-11 rounded-full border-2 border-accent object-cover"
            />
            <div>
              <p className="font-display text-lg font-bold">Shiv Shakti</p>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-accent">Admin portal</p>
            </div>
          </div>

          <AdminNavigation />

          <div className="hidden border-t border-white/10 p-4 lg:block">
            <p className="truncate px-2 text-xs text-white/55">{user.email}</p>
            <form action={adminLogout} className="mt-3">
              <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white">
                <LogOut className="size-4 text-accent" /> Sign out
              </button>
            </form>
          </div>
        </div>
      </aside>
      <main className="min-w-0 lg:col-start-2">{children}</main>
    </div>
  );
}
