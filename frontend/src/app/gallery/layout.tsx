import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";

const baseUrl = "https://mr-desert-review.vercel.app";

export const metadata: Metadata = {
  title: "Guest Photo & Video Gallery | Mr. Desert Jaisalmer",
  description:
    "Explore authentic guest photography from desert camps, camel safaris, and heritage fort stays in Jaisalmer, Rajasthan.",
  keywords: [
    "Jaisalmer photo gallery",
    "Sam Sand Dunes photos",
    "Desert camp photos",
    "Jaisalmer camel safari gallery",
  ],
  alternates: {
    canonical: `${baseUrl}/gallery`,
  },
  openGraph: {
    title: "Guest Photo & Video Gallery | Mr. Desert Jaisalmer",
    description:
      "Explore authentic guest photography from desert camps, camel safaris, and heritage fort stays in Jaisalmer.",
    url: `${baseUrl}/gallery`,
    siteName: "Mr. Desert Jaisalmer Reviews",
    images: [
      {
        url: "/images/dheeraj/happy-camp-night.webp",
        width: 1200,
        height: 630,
        alt: "Jaisalmer Guest Gallery",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guest Photo & Video Gallery | Mr. Desert Jaisalmer",
    description:
      "Explore authentic guest photography from desert camps and fort stays in Jaisalmer.",
    images: ["/images/dheeraj/happy-camp-night.webp"],
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
      name: "Guest Gallery",
      item: `${baseUrl}/gallery`,
    },
  ],
};

const gallerySchema = {
  "@context": "https://schema.org",
  "@type": "ImageGallery",
  name: "Mr. Desert Guest Photography Gallery",
  description: "Authentic guest photos from luxury desert camps and fort stays in Jaisalmer.",
  url: `${baseUrl}/gallery`,
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[breadcrumbSchema, gallerySchema]} />
      {children}
    </>
  );
}
