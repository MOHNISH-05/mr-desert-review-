import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";

const baseUrl = "https://mr-desert-review.vercel.app";

export const metadata: Metadata = {
  title: "Guest Stories & Reviews | Mr. Desert Jaisalmer",
  description:
    "Read verified guest reviews and authentic stories about desert camping, heritage fort stays, and camel safaris in Jaisalmer, Rajasthan.",
  keywords: [
    "Jaisalmer guest reviews",
    "Thar desert camp ratings",
    "Elite Castle reviews",
    "Happy Adventure Camp reviews",
    "Rajasthan tour reviews",
  ],
  alternates: {
    canonical: `${baseUrl}/all-reviews`,
  },
  openGraph: {
    title: "Guest Stories & Reviews | Mr. Desert Jaisalmer",
    description:
      "Read verified guest reviews and authentic stories about desert camping, heritage fort stays, and camel safaris in Jaisalmer.",
    url: `${baseUrl}/all-reviews`,
    siteName: "Mr. Desert Jaisalmer Reviews",
    images: [
      {
        url: "/businesses/happy-adventure-camp/E-1_1024x698.webp",
        width: 1200,
        height: 630,
        alt: "Guest Stories from Jaisalmer Sand Dunes",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guest Stories & Reviews | Mr. Desert Jaisalmer",
    description:
      "Read verified guest reviews and authentic stories about desert camping and fort stays in Jaisalmer.",
    images: ["/businesses/happy-adventure-camp/E-1_1024x698.webp"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Guest Stories & Reviews",
      item: `${baseUrl}/all-reviews`,
    },
  ],
};

export default function AllReviewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  );
}
