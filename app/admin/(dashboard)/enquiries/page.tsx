import type { Metadata } from "next";
import AdminDashboardPage from "../page";

export const metadata: Metadata = {
  title: "Enquiries | Admin",
  robots: { index: false, follow: false },
};

export default function AdminEnquiriesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return <AdminDashboardPage searchParams={searchParams} view="enquiries" />;
}
