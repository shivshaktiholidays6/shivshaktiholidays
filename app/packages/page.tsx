import type { Metadata } from "next";
import Packages from "@/routes/packages.index";
import { getPublishedPackages } from "@/lib/packages";

export const metadata: Metadata = {
  title: "Holiday Packages",
  description: "Browse domestic, international, honeymoon and pilgrimage holiday packages.",
};
export const revalidate = 300;

export default async function PackagesPage() {
  const packageItems = await getPublishedPackages();
  return <Packages packageItems={packageItems} />;
}
