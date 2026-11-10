import type { Metadata } from "next";
import Domestic from "@/routes/domestic";
import { getPublishedPackages } from "@/lib/packages";
import { getPublishedDestinations } from "@/lib/destinations";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "India Tour Packages from Roorkee",
  description:
    "Discover customizable India tour packages from Roorkee for families, couples, groups, pilgrimages, beaches, mountains and weekend holidays.",
  path: "/domestic",
});
export const revalidate = 300;

export default async function DomesticPage() {
  const [packageItems, destinationItems] = await Promise.all([
    getPublishedPackages(),
    getPublishedDestinations(),
  ]);
  return <Domestic packageItems={packageItems} destinationItems={destinationItems} />;
}
