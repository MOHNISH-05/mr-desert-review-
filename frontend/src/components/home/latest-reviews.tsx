"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { PremiumReviewCard } from "@/components/reviews/premium-review-card";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import type { Review } from "@/types";

interface LatestReviewsProps {
  reviews: Review[];
}

export function LatestReviews({ reviews }: LatestReviewsProps) {
  if (!reviews.length) return null;

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none" aria-hidden="true" />

      <div className="container relative">
        <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <p className="eyebrow">Fresh from the journal</p>
            <h2 className="section-heading">
              Latest <span className="text-gradient-gold italic">stories</span>
            </h2>
            <p className="text-muted-foreground mt-4 max-w-md">
              What our recent guests are saying about their Jaisalmer experience
            </p>
          </div>
          <Link href="/all-reviews" className="hidden md:block shrink-0">
            <Button variant="outline" size="lg" className="group">
              View all stories
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {reviews.slice(0, 6).map((review, i) => (
            <PremiumReviewCard key={review.id} review={review} index={i} />
          ))}
        </div>

        <div className="text-center mt-12 md:hidden">
          <Link href="/all-reviews">
            <Button variant="gold" size="lg" className="group">
              View All Stories
              <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
