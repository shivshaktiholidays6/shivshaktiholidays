import type { Metadata } from "next";
import Destinations from "@/routes/destinations.index";
import { getPublishedDestinations } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Holiday Destinations",
  description: "Explore popular destinations across India and around the world.",
};
export const revalidate = 300;

export default async function DestinationsPage() {
  const destinationItems = await getPublishedDestinations();
  return <Destinations destinationItems={destinationItems} />;
}
