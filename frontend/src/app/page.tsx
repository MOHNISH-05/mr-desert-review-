import { HeroSection } from "@/components/home/hero";
import { StatsSection } from "@/components/home/stats";
import { BusinessCards } from "@/components/home/business-cards";
import { LatestReviews } from "@/components/home/latest-reviews";
import { HomeCTA } from "@/components/home/home-cta";
import { api } from "@/lib/api";
import { FALLBACK_BUSINESSES, FALLBACK_REVIEWS } from "@/lib/fallback-data";
import type { Business, Review } from "@/types";

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
      <HeroSection />
      <StatsSection />
      <BusinessCards businesses={businesses} />
      <LatestReviews reviews={reviews} />
      <HomeCTA />
    </>
  );
}

