import type { Metadata } from "next";
import About from "@/routes/about";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Meet Shiv Shakti Holidays and learn how we plan thoughtful domestic and international journeys.",
  alternates: { canonical: "/about" },
};
export default About;
