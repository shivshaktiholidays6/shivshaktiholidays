import type { Metadata } from "next";
import PlanTrip from "@/routes/plan-trip";

export const metadata: Metadata = {
  title: "Plan My Trip",
  description: "Tell us your travel preferences and receive a personalized holiday plan.",
  alternates: { canonical: "/plan-trip" },
};
export default PlanTrip;
