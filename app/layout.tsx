import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { QuickQueryFloat } from "@/components/site/QuickQueryFloat";
import { LeadEnquiryPopup } from "@/components/site/LeadEnquiryPopup";
import { AnalyticsManager } from "@/components/site/Analytics";
import { getPublishedDestinations } from "@/lib/destinations";
import { getActivePromotion } from "@/lib/promotions";
import "@/styles.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL("https://shivshaktiholidays.com"),
  title: {
    default: "Shiv Shakti Holidays — Personalized Holidays & Custom Trips",
    template: "%s — Shiv Shakti Holidays",
  },
  description:
    "Domestic and international holiday packages, spiritual journeys, honeymoons and custom trips planned around you.",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  openGraph: { type: "website", siteName: "Shiv Shakti Holidays", images: ["/logoimg.jpeg"] },
  twitter: { card: "summary_large_image", images: ["/logoimg.jpeg"] },
  verification: process.env["GOOGLE_SITE_VERIFICATION"]
    ? { google: process.env["GOOGLE_SITE_VERIFICATION"] }
    : undefined,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const [destinationItems, promotion] = await Promise.all([
    getPublishedDestinations(),
    getActivePromotion(),
  ]);
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body>
        <Header destinationItems={destinationItems} promotion={promotion} />
        <main>{children}</main>
        <Footer />
        <LeadEnquiryPopup />
        <QuickQueryFloat />
        <AnalyticsManager />
      </body>
    </html>
  );
}
