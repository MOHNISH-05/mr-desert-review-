"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CalendarDays, ExternalLink, Heart, MapPin, Share2, X, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "@/lib/api";
import { Avatar } from "@/components/ui/avatar";
import { Stars } from "@/components/ui/stars";
import { Badge } from "@/components/ui/badge";
import { formatDate, getCountryFlag } from "@/lib/utils";
import type { Review } from "@/types";

const API_BASE = "";

const businessMeta: Record<string, { label: string; icon: string; fallback: string }> = {
  "mr-desert": { label: "Mr. Desert Jaisalmer", icon: "🌵", fallback: "/businesses/mr-desert/6-scaled-e1756826347412.webp" },
  "elite-castle": { label: "Elite Castle Jaisalmer", icon: "🏨", fallback: "/businesses/elite-castle/WhatsApp Image 2026-07-26 at 18.50.40.jpeg" },
  "happy-adventure": { label: "Happy Adventure Camp", icon: "🏕", fallback: "/businesses/happy-adventure-camp/DSC02608_1024x683.webp" },
  "happy-adventure-camp": { label: "Happy Adventure Camp", icon: "🏕", fallback: "/businesses/happy-adventure-camp/DSC02608_1024x683.webp" },
  "tour-planner": { label: "Elite India Tour Planner", icon: "🚙", fallback: "/businesses/elite-india-tour-planner/dheeraj-purohit.webp" },
  "elite-india-tour-planner": { label: "Elite India Tour Planner", icon: "🚙", fallback: "/businesses/elite-india-tour-planner/dheeraj-purohit.webp" },
  "jaisal-inn": { label: "Hotel Jaisal Inn", icon: "🏢", fallback: "/businesses/elite-castle/WhatsApp Image 2026-07-26 at 18.50.43.jpeg" },
  "vijay-bagh": { label: "Vijay Bagh", icon: "🏰", fallback: "/businesses/mr-desert/6-scaled-e1756826347412.webp" },
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
          <Image
            src={cover}
            alt={review.title || `${meta.label} guest story`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-black/25 z-10 pointer-events-none" />

          {/* Business badge */}
          <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/50 px-3.5 py-1.5 text-[11px] font-medium text-white backdrop-blur-md z-20">
            {meta.icon} {meta.label}
          </span>

          {/* Photo count */}
          {remaining > 0 && (
            <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm z-20">
              <Camera className="h-3.5 w-3.5" />
              +{remaining} photos
            </span>
          )}

          {/* Country flag overlay */}
          {review.country && (
            <span className="absolute bottom-4 left-4 text-2xl drop-shadow-lg z-20">
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
                  className="relative aspect-square overflow-hidden rounded-lg bg-desert-50 image-zoom focus:outline-none focus:ring-2 focus:ring-desert-500"
                >
                  <Image
                    src={mediaUrl(image.url)}
                    alt={`Guest photo ${imageIndex + 1}`}
                    fill
                    sizes="100px"
                    className="object-cover"
                    loading="lazy"
                  />
                  {imageIndex === 3 && images.length > 4 && (
                    <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-semibold text-white z-10">
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

      {/* Lightbox Modal with Controls & Counter */}
      {lightboxIndex !== null && images[lightboxIndex] && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={() => setLightboxIndex(null)}
        >
          {/* Header bar */}
          <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-50 text-white">
            <span className="text-sm font-medium tracking-wide bg-black/40 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
              {meta.label} · Photo {lightboxIndex + 1} of {images.length}
            </span>
            <button
              type="button"
              onClick={() => setLightboxIndex(null)}
              className="rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors"
              aria-label="Close lightbox"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Navigation Controls */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : 0));
                }}
                className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors z-50"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : 0));
                }}
                className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/20 transition-colors z-50"
                aria-label="Next photo"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          <div
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={mediaUrl(images[lightboxIndex].url)}
              alt={`${review.title || meta.label} photo ${lightboxIndex + 1}`}
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      )}
    </>
  );
}
