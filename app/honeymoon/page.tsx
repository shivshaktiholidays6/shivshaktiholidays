import type { Metadata } from "next";
import Honeymoon from "@/routes/honeymoon";
import { getPublishedPackages } from "@/lib/packages";

export const metadata: Metadata = {
  title: "Honeymoon Packages",
  description: "Romantic honeymoon packages and private couple experiences in India and abroad.",
};
export const revalidate = 300;

export default async function HoneymoonPage() {
  const packageItems = await getPublishedPackages();
  return <Honeymoon packageItems={packageItems} />;
}
