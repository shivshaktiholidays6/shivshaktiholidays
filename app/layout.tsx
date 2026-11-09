import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import { Header } from "@/components/site/Header";
import { Footer, WhatsAppFloat } from "@/components/site/Footer";
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
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${manrope.variable} ${playfair.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
