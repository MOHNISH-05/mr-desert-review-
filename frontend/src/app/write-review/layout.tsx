import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";

const baseUrl = "https://mr-desert-review.vercel.app";

export const metadata: Metadata = {
  title: "Write a Review | Share Your Jaisalmer Experience",
  description:
    "Share your real guest review for Mr. Desert, Elite Castle, Happy Adventure Camp, or Elite India Tour Planner in Jaisalmer, Rajasthan.",
  keywords: [
    "Write Jaisalmer review",
    "Submit desert camp review",
    "Jaisalmer guest feedback",
  ],
  alternates: {
    canonical: `${baseUrl}/write-review`,
  },
  openGraph: {
    title: "Write a Review | Share Your Jaisalmer Experience",
    description:
      "Share your real guest review for Mr. Desert, Elite Castle, Happy Adventure Camp, or Elite India Tour Planner in Jaisalmer.",
    url: `${baseUrl}/write-review`,
    siteName: "Mr. Desert Jaisalmer Reviews",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Write a Review | Share Your Jaisalmer Experience",
    description:
      "Share your real guest review for desert camps and hotels in Jaisalmer.",
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
      name: "Write a Review",
      item: `${baseUrl}/write-review`,
    },
  ],
};

export default function WriteReviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  );
}
