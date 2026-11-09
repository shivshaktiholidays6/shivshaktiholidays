import type { Metadata } from "next";
import Domestic from "@/routes/domestic";
import { getPublishedPackages } from "@/lib/packages";
import { getPublishedDestinations } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "India Holiday Packages",
  description:
    "Discover India with customizable family, honeymoon, adventure and pilgrimage packages.",
};
export const revalidate = 300;

export default async function DomesticPage() {
  const [packageItems, destinationItems] = await Promise.all([
    getPublishedPackages(),
    getPublishedDestinations(),
  ]);
  return <Domestic packageItems={packageItems} destinationItems={destinationItems} />;
}
