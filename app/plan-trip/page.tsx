import type { Metadata } from "next";
import PlanTrip from "@/routes/plan-trip";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Plan a Customized Holiday",
  description:
    "Share your destination, dates, budget and traveller details to receive a customized domestic or international holiday plan.",
  path: "/plan-trip",
});
export default PlanTrip;
