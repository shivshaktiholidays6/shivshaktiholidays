import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LockKeyhole, ShieldCheck } from "lucide-react";
import { redirect } from "next/navigation";
import { adminLogin } from "@/lib/admin-actions";
import { getAdminUser, isAdminAuthConfigured } from "@/lib/admin-auth";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

const errors: Record<string, string> = {
  configuration: "Admin authentication is not configured yet.",
  required: "Enter your email address and password.",
  invalid: "The email address or password is incorrect.",
  unauthorized: "This account is not permitted to access the dashboard.",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await getAdminUser()) redirect("/admin");
  const { error } = await searchParams;
  const configured = isAdminAuthConfigured();

  return (
    <section data-admin-root className="min-h-screen bg-primary px-4 py-12 text-primary-foreground">
      <div className="mx-auto grid min-h-[calc(100vh-6rem)] max-w-md place-items-center">
        <div className="w-full rounded-3xl border border-white/10 bg-white p-6 text-foreground shadow-2xl sm:p-8">
          <div className="flex items-center gap-3">
            <Image
              src="/logoimg.jpeg"
              alt="Shiv Shakti Holidays"
              width={52}
              height={52}
              className="size-13 rounded-full border-2 border-accent object-cover"
            />
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Secure area</p>
              <p className="font-display text-xl font-bold text-primary">Admin Dashboard</p>
            </div>
          </div>

          <div className="mt-8">
            <span className="grid size-11 place-items-center rounded-xl bg-primary text-accent">
              <LockKeyhole className="size-5" />
            </span>
            <h1 className="mt-4 text-3xl text-primary">Welcome back</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Sign in with the approved Supabase administrator account.
            </p>
          </div>

          {!configured && (
            <p role="alert" className="mt-5 rounded-xl bg-amber-50 p-3 text-sm text-amber-800">
              Add the publishable key and administrator email to your environment before signing in.
            </p>
          )}
          {error && errors[error] && (
            <p role="alert" className="mt-5 rounded-xl bg-red-50 p-3 text-sm text-red-700">
              {errors[error]}
            </p>
          )}

          <form action={adminLogin} className="mt-6 grid gap-4">
            <label className="grid gap-1.5 text-sm font-semibold text-primary">
              Email address
              <input
                name="email"
                type="email"
                required
                autoComplete="email"
                className="h-12 rounded-xl border border-input bg-background px-4 text-base font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25"
                placeholder="admin@example.com"
              />
            </label>
            <label className="grid gap-1.5 text-sm font-semibold text-primary">
              Password
              <input
                name="password"
                type="password"
                required
                minLength={8}
                autoComplete="current-password"
                className="h-12 rounded-xl border border-input bg-background px-4 text-base font-normal outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/25"
                placeholder="Your password"
              />
            </label>
            <button
              type="submit"
              disabled={!configured}
              className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-bold uppercase tracking-wider text-primary-foreground transition hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ShieldCheck className="size-4" /> Sign in securely
            </button>
          </form>

          <Link href="/" className="mt-6 block text-center text-sm text-muted-foreground hover:text-primary">
            ← Return to website
          </Link>
        </div>
      </div>
    </section>
  );
}
