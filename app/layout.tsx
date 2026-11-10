import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { QuickQueryFloat } from "@/components/site/QuickQueryFloat";
import { LeadEnquiryPopup } from "@/components/site/LeadEnquiryPopup";
import { AnalyticsManager } from "@/components/site/Analytics";
import { JsonLd } from "@/components/site/JsonLd";
import { getActivePromotion } from "@/lib/promotions";
import { site } from "@/config/site";
import { searchIndexingAllowed } from "@/lib/seo";
import "@/styles.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
  title: {
    default: "Shiv Shakti Holidays | Tour & Travel Agency in Roorkee",
    template: "%s — Shiv Shakti Holidays",
  },
  description:
    "Plan domestic and international tours, Char Dham journeys, honeymoons and customized holidays with a trusted travel agency in Roorkee.",
  keywords: [
    "holiday packages",
    "custom tours India",
    "international holidays",
    "domestic tours",
    "honeymoon packages",
    "spiritual journeys",
    "travel agency Roorkee",
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  category: "travel",
  manifest: "/site.webmanifest",
  robots: {
    index: searchIndexingAllowed,
    follow: searchIndexingAllowed,
    googleBot: {
      index: searchIndexingAllowed,
      follow: searchIndexingAllowed,
      "max-image-preview": "large",
    },
  },
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: "Shiv Shakti Holidays | Tour & Travel Agency in Roorkee",
    description:
      "Plan domestic and international tours, spiritual journeys, honeymoons and customized holidays from Roorkee.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Shiv Shakti Holidays — personalized tours and holiday packages",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shiv Shakti Holidays | Tour & Travel Agency in Roorkee",
    description: "Personalized domestic and international holidays planned from Roorkee.",
    images: ["/opengraph-image"],
  },
  formatDetection: { email: false, address: false, telephone: false },
  verification:
    process.env["GOOGLE_SITE_VERIFICATION"] || process.env["BING_SITE_VERIFICATION"]
      ? {
          ...(process.env["GOOGLE_SITE_VERIFICATION"]
            ? { google: process.env["GOOGLE_SITE_VERIFICATION"] }
            : {}),
          ...(process.env["BING_SITE_VERIFICATION"]
            ? { other: { "msvalidate.01": process.env["BING_SITE_VERIFICATION"] } }
            : {}),
        }
      : undefined,
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const promotion = await getActivePromotion();

  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body>
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": ["TravelAgency", "LocalBusiness"],
              "@id": `${site.url}/#business`,
              name: site.name,
              url: site.url,
              logo: `${site.url}/logoimg.jpeg`,
              image: `${site.url}/logoimg.jpeg`,
              email: site.email,
              telephone: [site.phone, site.phoneSecondary],
              address: {
                "@type": "PostalAddress",
                streetAddress: site.location.streetAddress,
                addressLocality: site.location.locality,
                addressRegion: site.location.region,
                postalCode: site.location.postalCode,
                addressCountry: site.location.country,
              },
              sameAs: [site.social.instagram],
              priceRange: "₹₹",
              areaServed: [
                { "@type": "City", name: "Roorkee" },
                { "@type": "State", name: "Uttarakhand" },
                { "@type": "Country", name: "India" },
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+91-95680-00777",
                  contactType: "customer service",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi"],
                },
                {
                  "@type": "ContactPoint",
                  telephone: "+91-98975-99995",
                  contactType: "sales",
                  areaServed: "IN",
                  availableLanguage: ["English", "Hindi"],
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${site.url}/#website`,
              url: site.url,
              name: site.name,
              publisher: { "@id": `${site.url}/#business` },
              inLanguage: site.language,
            },
          ]}
        />
        <Header promotion={promotion} />
        <main>{children}</main>
        <Footer />
        <LeadEnquiryPopup />
        <QuickQueryFloat />
        <AnalyticsManager />
      </body>
    </html>
  );
}
