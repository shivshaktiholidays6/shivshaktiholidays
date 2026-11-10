import type { Metadata } from "next";
import Home from "@/routes/index";
import { getPublishedPackages } from "@/lib/packages";
import { getPublishedDestinations } from "@/lib/destinations";

export const metadata: Metadata = {
  title: "Personalized Luxury Holidays & Custom Trips",
  description:
    "Explore domestic, international and spiritual holiday packages planned around your travel style.",
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export const revalidate = 300;

export default async function HomePage() {
  const [packageItems, destinationItems] = await Promise.all([
    getPublishedPackages(),
    getPublishedDestinations(),
  ]);
  return <Home packageItems={packageItems} destinationItems={destinationItems} />;
}
