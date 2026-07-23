import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LuxuryProviders } from "@/components/providers/luxury-providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Mr. Desert Jaisalmer | Luxury Desert Tourism & Guest Stories",
    template: "%s | Mr. Desert Jaisalmer",
  },
  description:
    "Discover Jaisalmer through authentic guest stories. Premium reviews for Mr. Desert, Elite Castle, Happy Adventure Camp and Elite India Tour Planner — curated by Dheeraj Purohit.",
  keywords: [
    "Jaisalmer luxury tourism",
    "Mr Desert Jaisalmer reviews",
    "Elite Castle Jaisalmer",
    "Happy Adventure Camp",
    "Elite India Tour Planner",
    "desert camp reviews",
    "Rajasthan travel",
    "Sam Sand Dunes",
    "Jaisalmer hotels",
  ],
  authors: [{ name: "Mr. Desert Jaisalmer" }],
  creator: "Mr. Desert Jaisalmer",
  openGraph: {
    title: "Mr. Desert Jaisalmer — The Golden City, Told Beautifully",
    description:
      "Trusted guest stories for hotels, desert camps & tours in Jaisalmer, Rajasthan.",
    type: "website",
    locale: "en_IN",
    siteName: "Mr. Desert Jaisalmer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr. Desert Jaisalmer | Luxury Desert Tourism",
    description: "Authentic guest stories from Jaisalmer's premier hospitality brands.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Mr. Desert Jaisalmer",
  description: "Premium tourism brand offering hotels, desert camps, safaris and Rajasthan tour packages in Jaisalmer.",
  url: "https://mrdesertjaisalmer.in",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Jaisalmer",
    addressRegion: "Rajasthan",
    addressCountry: "IN",
  },
  telephone: "+91-8854808196",
  email: "mrdesertjaisalmer@gmail.com",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${manrope.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <LuxuryProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LuxuryProviders>
      </body>
    </html>
  );
}
