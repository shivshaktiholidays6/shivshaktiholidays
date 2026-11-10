import type { Metadata } from "next";
import Home from "@/routes/index";
import { getPublishedPackages } from "@/lib/packages";
import { getPublishedDestinations } from "@/lib/destinations";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Tour & Travel Agency in Roorkee",
  description:
    "Plan domestic and international tours, Char Dham journeys, honeymoons and customized holidays with Shiv Shakti Holidays in Roorkee.",
  path: "/",
});

export const revalidate = 300;

export default async function HomePage() {
  const [packageItems, destinationItems] = await Promise.all([
    getPublishedPackages(),
    getPublishedDestinations(),
  ]);
  return <Home packageItems={packageItems} destinationItems={destinationItems} />;
}
