"use client";

import { useState } from "react";
import { PremiumReviewCard } from "@/components/reviews/premium-review-card";
import { Stars } from "@/components/ui/stars";
import type { Review } from "@/types";

export function BusinessReviews({
  reviews,
  businessName,
}: {
  reviews: Review[];
  businessName: string;
  businessSlug: string;
  businessId: number;
}) {
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "rating">("newest");

  const sorted = [...reviews].sort((a, b) =>
    sortBy === "rating"
      ? b.overall_rating - a.overall_rating
      : sortBy === "oldest"
        ? new Date(a.created_at || "").getTime() - new Date(b.created_at || "").getTime()
        : new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime()
  );

  const average = reviews.length
    ? reviews.reduce((sum, review) => sum + review.overall_rating, 0) / reviews.length
    : 0;

  return (
    <section className="bg-background py-16 md:py-20 border-t border-desert-100">
      <div className="container">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
          <div>
            <p className="eyebrow">Guest journal</p>
            <h2 className="section-heading text-3xl md:text-4xl">
              Stories from {businessName}
            </h2>
          </div>
          <div className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-luxury border border-desert-100">
            <Stars rating={average} size="sm" />
            <span className="font-serif text-xl text-desert-700 tabular-nums">{average.toFixed(1)}</span>
            <span className="text-xs text-muted-foreground">{reviews.length} stories</span>
          </div>
        </div>

        <div className="mb-8 flex gap-2 flex-wrap">
          {([["newest", "Newest"], ["oldest", "Oldest"], ["rating", "Highest rated"]] as const).map(
            ([value, label]) => (
              <button
                key={value}
                onClick={() => setSortBy(value)}
                className={`rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 ${
                  sortBy === value
                    ? "border-desert-600 bg-desert-600 text-white shadow-glow-sm"
                    : "border-desert-200 bg-white text-muted-foreground hover:border-desert-400"
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>

        {sorted.length ? (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
            {sorted.map((review, index) => (
              <PremiumReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-desert-200 bg-white p-16 text-center text-muted-foreground">
            No guest stories yet. Be the first to share your experience.
          </div>
        )}
      </div>
    </section>
  );
}
