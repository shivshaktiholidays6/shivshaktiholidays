import type { Metadata } from "next";
import International from "@/routes/international";
import { getPublishedPackages } from "@/lib/packages";
import { getPublishedDestinations } from "@/lib/destinations";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "International Tour Packages from India",
  description:
    "Explore customizable international tour packages for Dubai, Bali, Thailand, Europe, Singapore and more, with itinerary and visa guidance.",
  path: "/international",
});
export const revalidate = 300;

export default async function InternationalPage() {
  const [packageItems, destinationItems] = await Promise.all([
    getPublishedPackages(),
    getPublishedDestinations(),
  ]);
  return <International packageItems={packageItems} destinationItems={destinationItems} />;
}
