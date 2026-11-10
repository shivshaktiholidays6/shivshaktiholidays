import type { Metadata } from "next";
import International from "@/routes/international";
import { getPublishedPackages } from "@/lib/packages";
import { getPublishedDestinations } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "International Holiday Packages",
  description: "Explore curated international holidays and request a customized itinerary.",
  alternates: { canonical: "/international" },
};
export const revalidate = 300;

export default async function InternationalPage() {
  const [packageItems, destinationItems] = await Promise.all([
    getPublishedPackages(),
    getPublishedDestinations(),
  ]);
  return <International packageItems={packageItems} destinationItems={destinationItems} />;
}
