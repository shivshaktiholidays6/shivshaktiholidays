import type { Metadata } from "next";
import Destinations from "@/routes/destinations.index";
import { getPublishedDestinations } from "@/lib/destinations";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Best Holiday Destinations in India & Abroad",
  description:
    "Explore popular holiday destinations across India, Asia, Europe, the Middle East and beyond, with customized trip planning from Roorkee.",
  path: "/destinations",
});
export const revalidate = 300;

export default async function DestinationsPage() {
  const destinationItems = await getPublishedDestinations();
  return <Destinations destinationItems={destinationItems} />;
}
