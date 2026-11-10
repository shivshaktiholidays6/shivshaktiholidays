import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { QuickQueryFloat } from "@/components/site/QuickQueryFloat";
import { LeadEnquiryPopup } from "@/components/site/LeadEnquiryPopup";
import { AnalyticsManager } from "@/components/site/Analytics";
import { JsonLd } from "@/components/site/JsonLd";
import { getPublishedDestinations } from "@/lib/destinations";
import { getActivePromotion } from "@/lib/promotions";
import "@/styles.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shivshaktiholidays.com"),
  applicationName: "Shiv Shakti Holidays",
  title: {
    default: "Shiv Shakti Holidays — Personalized Holidays & Custom Trips",
    template: "%s — Shiv Shakti Holidays",
  },
  description:
    "Domestic and international holiday packages, spiritual journeys, honeymoons and custom trips planned around you.",
  keywords: [
    "holiday packages",
    "custom tours India",
    "international holidays",
    "domestic tours",
    "honeymoon packages",
    "spiritual journeys",
    "travel agency Roorkee",
  ],
  authors: [{ name: "Shiv Shakti Holidays", url: "https://shivshaktiholidays.com" }],
  creator: "Shiv Shakti Holidays",
  publisher: "Shiv Shakti Holidays",
  category: "travel",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://shivshaktiholidays.com",
    siteName: "Shiv Shakti Holidays",
    title: "Shiv Shakti Holidays — Personalized Holidays & Custom Trips",
    description:
      "Domestic and international holidays, pilgrimages and custom journeys planned around you.",
    images: [{ url: "/logoimg.jpeg", alt: "Shiv Shakti Holidays" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiv Shakti Holidays",
    description: "Personalized domestic and international holidays planned around you.",
    images: ["/logoimg.jpeg"],
  },
  formatDetection: { email: false, address: false, telephone: false },
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
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": ["TravelAgency", "LocalBusiness"],
              "@id": "https://shivshaktiholidays.com/#business",
              name: "Shiv Shakti Holidays",
              url: "https://shivshaktiholidays.com",
              logo: "https://shivshaktiholidays.com/logoimg.jpeg",
              image: "https://shivshaktiholidays.com/logoimg.jpeg",
              email: "shivshaktiholidays.rke@gmail.com",
              telephone: ["+91 95680 00777", "+91 98975 99995"],
              address: {
                "@type": "PostalAddress",
                streetAddress: "Opp. Old Kachari Gate, Bus Stand",
                addressLocality: "Roorkee",
                addressRegion: "Uttarakhand",
                postalCode: "247667",
                addressCountry: "IN",
              },
              sameAs: ["https://www.instagram.com/shiv.shaktiholidays/"],
              priceRange: "₹₹",
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://shivshaktiholidays.com/#website",
              url: "https://shivshaktiholidays.com",
              name: "Shiv Shakti Holidays",
              publisher: { "@id": "https://shivshaktiholidays.com/#business" },
              inLanguage: "en-IN",
            },
          ]}
        />
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
