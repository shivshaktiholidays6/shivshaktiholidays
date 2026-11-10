import type { Metadata } from "next";
import Honeymoon from "@/routes/honeymoon";
import { getPublishedPackages } from "@/lib/packages";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Honeymoon Packages in India & Abroad",
  description:
    "Plan a personalized honeymoon in Kashmir, Kerala, Bali, Maldives, Switzerland and more with romantic stays and private couple experiences.",
  path: "/honeymoon",
});
export const revalidate = 300;

export default async function HoneymoonPage() {
  const packageItems = await getPublishedPackages();
  return <Honeymoon packageItems={packageItems} />;
}
