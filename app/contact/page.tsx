import type { Metadata } from "next";
import Contact from "@/routes/contact";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Our Travel Agency in Roorkee",
  description:
    "Contact Shiv Shakti Holidays in Roorkee for domestic tours, international packages, honeymoons, pilgrimages and customized trip quotations.",
  path: "/contact",
});
export default Contact;
