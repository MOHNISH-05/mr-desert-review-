import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero";
import { StatsSection } from "@/components/home/stats";
import { BusinessCards } from "@/components/home/business-cards";
import { LatestReviews } from "@/components/home/latest-reviews";
import { HomeCTA } from "@/components/home/home-cta";
import { api } from "@/lib/api";
import { FALLBACK_BUSINESSES, FALLBACK_REVIEWS } from "@/lib/fallback-data";
import { JsonLd } from "@/components/seo/json-ld";
import type { Business, Review } from "@/types";

const baseUrl = "https://mr-desert-review.vercel.app";

export const metadata: Metadata = {
  title: "Mr. Desert Reviews | Real Guest Experiences in Jaisalmer",
  description:
    "Discover authentic guest stories for luxury desert camps, heritage fort hotels, camel safaris, and custom Rajasthan tour packages in Jaisalmer.",
  keywords: [
    "Mr. Desert Reviews",
    "Jaisalmer guest reviews",
    "Luxury desert camp Jaisalmer",
    "Elite Castle Jaisalmer",
    "Happy Adventure Camp",
    "Jaisalmer tour planner",
  ],
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Mr. Desert Reviews | Real Guest Experiences in Jaisalmer",
    description:
      "Discover authentic guest stories for luxury desert camps, heritage fort hotels, and camel safaris in Jaisalmer.",
    url: baseUrl,
    siteName: "Mr. Desert Jaisalmer Reviews",
    images: [
      {
        url: "/images/dheeraj/mr-desert-alley.webp",
        width: 1200,
        height: 630,
        alt: "Mr. Desert Jaisalmer Heritage Experience",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mr. Desert Reviews | Real Guest Experiences in Jaisalmer",
    description:
      "Discover authentic guest stories for luxury desert camps, heritage fort hotels, and camel safaris in Jaisalmer.",
    images: ["/images/dheeraj/mr-desert-alley.webp"],
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${baseUrl}/#website`,
  url: baseUrl,
  name: "Mr. Desert Jaisalmer Reviews",
  description: "Authentic guest reviews for luxury desert camps, hotels, and tours in Jaisalmer.",
  publisher: {
    "@id": `${baseUrl}/#organization`,
  },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${baseUrl}/all-reviews?search={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

export default async function HomePage() {
  let businesses: Business[] = [];
  let reviews: Review[] = [];

  try {
    const bizRes = await api.businesses.list();
    businesses = bizRes.businesses || [];

    const revRes = await api.reviews.list({ page_size: 6, status: "approved" });
    reviews = revRes.reviews || [];
  } catch {
    // Fallback for when backend is not running
  }

  if (!businesses.length) {
    businesses = FALLBACK_BUSINESSES;
  }
  if (!reviews.length) {
    reviews = FALLBACK_REVIEWS;
  }

  return (
    <>
      <JsonLd data={websiteSchema} />
      <HeroSection />
      <StatsSection />
      <BusinessCards businesses={businesses} />
      <LatestReviews reviews={reviews} />
      <HomeCTA />
    </>
  );
}
