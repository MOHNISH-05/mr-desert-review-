"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, CalendarDays, ExternalLink, Heart, MapPin, Share2, X, Camera } from "lucide-react";
import { api } from "@/lib/api";
import { Avatar } from "@/components/ui/avatar";
import { Stars } from "@/components/ui/stars";
import { Badge } from "@/components/ui/badge";
import { formatDate, getCountryFlag } from "@/lib/utils";
import type { Review } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const businessMeta: Record<string, { label: string; icon: string; fallback: string }> = {
  "mr-desert": { label: "Mr. Desert Jaisalmer", icon: "🌵", fallback: "/images/dheeraj/mr-desert-alley.webp" },
  "elite-castle": { label: "Elite Castle", icon: "🏨", fallback: "/images/official/elite-castle-story.webp" },
  "happy-adventure": { label: "Happy Adventure Camp", icon: "🏕", fallback: "/images/dheeraj/happy-camp-day.webp" },
  "tour-planner": { label: "Elite India Tour Planner", icon: "🚙", fallback: "/images/dheeraj/camel-safari.webp" },
};

function mediaUrl(url: string) {
  return url.startsWith("/uploads/") ? `${API_BASE}${url}` : url;
}

export function PremiumReviewCard({ review, index = 0 }: { review: Review; index?: number }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [helpful, setHelpful] = useState(review.helpful_count || 0);
  const meta = businessMeta[review.business_slug || ""] || businessMeta["mr-desert"];
  const images = review.media?.filter((item) => item.media_type === "image") || [];
  const cover = images[0] ? mediaUrl(images[0].url) : meta.fallback;
  const remaining = Math.max(0, images.length - 1);
  const excerpt = review.content.length > 160 ? `${review.content.slice(0, 160).trimEnd()}…` : review.content;

  const share = async () => {
    const url = `${window.location.origin}/reviews/${review.id}`;
    if (navigator.share) await navigator.share({ title: review.title || "Guest story", url });
    else await navigator.clipboard?.writeText(url);
  };

  const like = async () => {
    setHelpful((v) => v + 1);
    try { await api.reviews.helpful(review.id); } catch { setHelpful((v) => Math.max(0, v - 1)); }
  };

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -8 }}
        className="group overflow-hidden rounded-2xl border border-desert-100/50 bg-white shadow-luxury hover:shadow-luxury-lg transition-shadow duration-500"
      >
        {/* Magazine hero image */}
        <Link href={`/reviews/${review.id}`} className="relative block aspect-[16/10] overflow-hidden bg-desert-100">
          <img
            src={cover}
            alt={review.title || `${meta.label} guest story`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/25" />

          {/* Business badge */}
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3.5 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
            {meta.icon} {meta.label}
          </span>

          {/* Photo count */}
          {remaining > 0 && (
            <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              <Camera className="h-3.5 w-3.5" />
              +{remaining} photos
            </span>
          )}

          {/* Country flag overlay */}
          {review.country && (
            <span className="absolute bottom-4 left-4 text-2xl drop-shadow-lg">
              {getCountryFlag(review.country)}
            </span>
          )}
        </Link>

        <div className="p-6 md:p-7">
          {/* Rating row */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <Stars rating={review.overall_rating} size="sm" />
            <span className="text-sm font-semibold text-desert-600 tabular-nums">
              {review.overall_rating.toFixed(1)}
            </span>
          </div>

          {/* Title */}
          <Link href={`/reviews/${review.id}`}>
            <h3 className="mb-4 line-clamp-2 font-serif text-xl md:text-2xl font-semibold leading-snug text-foreground group-hover:text-desert-700 transition-colors">
              {review.title || "A Jaisalmer experience to remember"}
            </h3>
          </Link>

          {/* Guest info */}
          <div className="mb-4 flex items-center gap-3">
            <Avatar name={review.guest_name} src={review.guest_photo_url} size="sm" />
            <div className="min-w-0 text-sm">
              <p className="flex items-center gap-1.5 font-medium truncate">
                {review.guest_name}
                {review.is_verified && (
                  <Badge variant="success" className="px-1.5 py-0 text-[10px]">✓ Verified</Badge>
                )}
              </p>
              <p className="text-xs text-muted-foreground">
                {review.country || "Guest"}
                {review.city ? ` · ${review.city}` : ""}
              </p>
            </div>
          </div>

          {/* Excerpt */}
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
            {excerpt}{" "}
            <Link href={`/reviews/${review.id}`} className="whitespace-nowrap font-medium text-desert-700 hover:underline">
              Read more →
            </Link>
          </p>

          {/* Thumbnail gallery */}
          {images.length > 0 && (
            <div className="mb-5 grid grid-cols-4 gap-1.5">
              {images.slice(0, 4).map((image, imageIndex) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setLightboxIndex(imageIndex)}
                  className="relative aspect-square overflow-hidden rounded-lg bg-desert-50 image-zoom"
                >
                  <img src={mediaUrl(image.url)} alt="Guest gallery" loading="lazy" className="h-full w-full object-cover" />
                  {imageIndex === 3 && images.length > 4 && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-semibold text-white">
                      +{images.length - 4}
                    </span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Meta chips */}
          <div className="mb-5 grid grid-cols-2 gap-2 text-[11px] text-muted-foreground">
            <span className="flex items-center gap-1.5 rounded-lg bg-desert-50/80 px-2.5 py-2">
              <MapPin className="h-3.5 w-3.5 text-desert-600 shrink-0" />
              <span className="truncate">{meta.label}</span>
            </span>
            <span className="flex items-center gap-1.5 rounded-lg bg-desert-50/80 px-2.5 py-2">
              <CalendarDays className="h-3.5 w-3.5 text-desert-600 shrink-0" />
              {review.visit_date ? formatDate(review.visit_date) : formatDate(review.created_at)}
            </span>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-2 border-t border-desert-100 pt-4">
            <Link
              href={`/reviews/${review.id}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-desert-600 to-desert-500 px-4 py-2 text-xs font-medium text-white hover:shadow-glow-sm transition-all group/btn"
            >
              Read Full Story
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
            {review.business_slug && (
              <Link
                href={`/business/${review.business_slug}`}
                className="inline-flex items-center gap-1 rounded-full border border-desert-200 px-3 py-2 text-xs font-medium text-desert-700 hover:bg-desert-50 transition-colors"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Visit
              </Link>
            )}
            <button
              type="button"
              onClick={share}
              className="ml-auto rounded-full border border-desert-200 p-2 text-muted-foreground hover:text-desert-700 hover:border-desert-300 transition-colors"
              aria-label="Share story"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={like}
              className="inline-flex items-center gap-1 rounded-full border border-desert-200 px-2.5 py-2 text-xs text-muted-foreground hover:text-rose-600 hover:border-rose-200 transition-colors"
              aria-label="Like story"
            >
              <Heart className="h-4 w-4" />
              {helpful}
            </button>
          </div>
        </div>
      </motion.article>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="lightbox-overlay"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-5 top-5 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <motion.img
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            src={mediaUrl(images[lightboxIndex]?.url || "")}
            alt="Guest gallery"
            className="lightbox-image"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </>
  );
}
