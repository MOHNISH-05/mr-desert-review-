import type { Metadata } from "next";
import { Playfair_Display, Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { LuxuryProviders } from "@/components/providers/luxury-providers";
import { JsonLd } from "@/components/seo/json-ld";

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

const baseUrl = "https://mr-desert-review.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Mr. Desert Reviews | Authentic Jaisalmer Guest Experiences",
    template: "%s | Mr. Desert Jaisalmer",
  },
  description:
    "Explore genuine guest reviews for luxury desert camps, heritage fort hotels, and camel safaris in Jaisalmer, Rajasthan. Curated by Dheeraj Purohit.",
  keywords: [
    "Mr Desert Jaisalmer reviews",
    "Jaisalmer luxury desert camp",
    "Elite Castle Jaisalmer review",
    "Happy Adventure Camp Jaisalmer",
    "Elite India Tour Planner review",
    "Jaisalmer camel safari reviews",
    "Sam Sand Dunes hotels",
    "Rajasthan luxury tourism",
    "Jaisalmer fort hotels",
  ],
  authors: [{ name: "Dheeraj Purohit", url: "https://mrdesertjaisalmer.in" }],
  creator: "Mr. Desert Jaisalmer",
  publisher: "Mr. Desert Jaisalmer",
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Mr. Desert Reviews | Authentic Jaisalmer Guest Experiences",
    description:
      "Read real reviews for luxury desert camps, heritage fort hotels, and camel safaris in Jaisalmer, Rajasthan.",
    url: baseUrl,
    siteName: "Mr. Desert Jaisalmer Reviews",
    images: [
      {
        url: "/businesses/mr-desert/6-scaled-e1756826347412.webp",
        width: 1200,
        height: 630,
        alt: "Mr. Desert Jaisalmer Heritage Architecture",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr. Desert Reviews | Jaisalmer Luxury Tourism",
    description:
      "Authentic guest stories for luxury desert camps & fort hotels in Jaisalmer, Rajasthan.",
    images: ["/businesses/mr-desert/6-scaled-e1756826347412.webp"],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "@id": `${baseUrl}/#organization`,
  name: "Mr. Desert Jaisalmer",
  url: baseUrl,
  logo: `${baseUrl}/businesses/mr-desert/logo.png`,
  image: `${baseUrl}/businesses/mr-desert/6-scaled-e1756826347412.webp`,
  description:
    "Premier tourism brand offering luxury desert camps, heritage hotels, camel safaris, and Rajasthan tour packages in Jaisalmer.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Sam Sand Dunes",
    addressLocality: "Jaisalmer",
    addressRegion: "Rajasthan",
    postalCode: "345001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 26.9157,
    longitude: 70.9083,
  },
  telephone: "+91-9829038039",
  email: "info@mrdesertjaisalmer.in",
  sameAs: [
    "https://mrdesertjaisalmer.in",
    "https://elitecastlejaisalmer.com",
    "https://happyadventurecampjaisalmer.com",
    "https://eliteindiatourplanner.com",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${manrope.variable}`}
    >
      <head>
        <JsonLd data={organizationSchema} />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <LuxuryProviders>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </LuxuryProviders>
      </body>
    </html>
  );
}
