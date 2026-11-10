import type { Metadata } from "next";
import Packages from "@/routes/packages.index";
import { getPublishedPackages } from "@/lib/packages";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "India & International Tour Packages",
  description:
    "Compare customizable India, international, honeymoon and pilgrimage tour packages with clear itineraries and prices from Shiv Shakti Holidays.",
  path: "/packages",
});
export const revalidate = 300;

export default async function PackagesPage() {
  const packageItems = await getPublishedPackages();
  return <Packages packageItems={packageItems} />;
}
