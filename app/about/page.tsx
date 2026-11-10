import type { Metadata } from "next";
import About from "@/routes/about";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About Our Travel Agency in Roorkee",
  description:
    "Meet Shiv Shakti Holidays, a Roorkee travel agency planning domestic tours, international holidays, honeymoons, pilgrimages and custom trips.",
  path: "/about",
});
export default About;
