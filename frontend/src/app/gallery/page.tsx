"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, Camera, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import type { GalleryItem } from "@/types";
import { getAllBusinessImages } from "@/lib/business-images";

const REAL_BUSINESS_GALLERY: GalleryItem[] = getAllBusinessImages().map((img, idx) => ({
  id: idx + 1,
  review_id: 100 + (idx % 5) + 1,
  business_id: (idx % 4) + 1,
  business_name: img.businessName,
  guest_name: `Guest Photo - ${img.title}`,
  media_type: "image",
  url: img.url,
  width: 1200,
  height: 800,
  created_at: "2026-02-15",
}));

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ item: GalleryItem; index: number } | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    api.gallery
      .list({ page_size: 100 })
      .then((res) => {
        if (res.items && res.items.length) {
          setItems(res.items);
        } else {
          setItems(REAL_BUSINESS_GALLERY);
        }
      })
      .catch(() => {
        setItems(REAL_BUSINESS_GALLERY);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter
    ? items.filter((i) => i.business_name?.toLowerCase().includes(filter.toLowerCase()))
    : items;

  const filters = [
    { label: "All Businesses", value: "" },
    { label: "Mr. Desert Jaisalmer", value: "Mr. Desert" },
    { label: "Elite Castle Jaisalmer", value: "Elite Castle" },
    { label: "Happy Adventure Camp", value: "Happy Adventure" },
    { label: "Elite India Tour Planner", value: "Tour Planner" },
  ];

  const navigateLightbox = (dir: -1 | 1) => {
    if (!lightbox) return;
    const newIndex = (lightbox.index + dir + filtered.length) % filtered.length;
    setLightbox({ item: filtered[newIndex], index: newIndex });
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-background">
      {/* Hero Header with Next.js Image */}
      <div className="relative mb-16 overflow-hidden bg-[#1A1A1A]">
        <div className="absolute inset-0 z-0">
          <Image
            src="/businesses/happy-adventure-camp/DSC02608_1024x683.webp"
            alt="Jaisalmer Guest Gallery Header"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-35"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A1A]/80 via-[#1A1A1A]/90 to-background z-[1]" aria-hidden="true" />
        <div className="container relative z-10 py-16 text-center">
          <ScrollReveal>
            <p className="eyebrow justify-center flex items-center gap-2 text-amber-300">
              <Sparkles className="h-3.5 w-3.5" /> Authentic Business Photos & Guest Moments
            </p>
            <h1 className="section-heading mb-4 text-white">
              Visual <span className="text-gradient-gold italic">Gallery</span>
            </h1>
            <p className="text-white/70 text-lg max-w-2xl mx-auto font-light">
              Explore real high-resolution photos of Mr. Desert Jaisalmer, Elite Castle, Happy Adventure Camp & Elite India Tour Planner.
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container">
        {/* Business Filter Buttons */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {filters.map((f) => (
            <button
              key={f.label}
              onClick={() => setFilter(f.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === f.value
                  ? "bg-desert-500 text-white shadow-glow-sm scale-105"
                  : "bg-white border border-desert-100 text-foreground/70 hover:border-desert-300 hover:text-desert-700"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="masonry-grid">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="masonry-grid-item">
                <div className={`skeleton ${i % 3 === 0 ? "h-72" : i % 3 === 1 ? "h-48" : "h-56"}`} />
              </div>
            ))}
          </div>
        ) : (
          <div className="masonry-grid">
            {filtered.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.03 }}
                className="masonry-grid-item cursor-pointer group"
                onClick={() => setLightbox({ item, index: i })}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-500 aspect-[4/3] bg-desert-100">
                  {item.media_type === "image" ? (
                    <Image
                      src={item.url}
                      alt={item.guest_name || item.business_name || "Business photo"}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                  ) : (
                    <div className="relative bg-dark rounded-2xl h-full flex items-center justify-center">
                      <span className="text-5xl text-white/80">▶</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <div className="absolute bottom-4 left-4 right-4">
                      {item.guest_name && (
                        <p className="text-white font-medium text-sm line-clamp-1">{item.guest_name}</p>
                      )}
                      {item.business_name && (
                        <p className="text-desert-300 text-xs mt-0.5 font-medium">{item.business_name}</p>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <Camera className="h-4 w-4 text-white/80" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div className="text-center py-24 rounded-2xl border border-dashed border-desert-200">
            <Camera className="h-12 w-12 mx-auto mb-4 text-desert-300" />
            <h3 className="text-xl font-serif font-semibold mb-2">No photos found</h3>
            <p className="text-muted-foreground">Try selecting a different business category</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
            onClick={() => setLightbox(null)}
          >
            {/* Header info & counter */}
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-50 text-white">
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold tracking-wide bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
                  {lightbox.item.business_name}
                </span>
                <span className="text-xs text-white/70 bg-black/40 px-3 py-1.5 rounded-full border border-white/10">
                  {lightbox.index + 1} of {filtered.length}
                </span>
              </div>
              <button
                onClick={() => setLightbox(null)}
                className="w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
                aria-label="Close lightbox"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
              className="absolute left-5 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
              className="absolute right-5 top-1/2 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image display */}
            <div className="relative max-w-5xl w-full h-[82vh] flex items-center justify-center p-2" onClick={(e) => e.stopPropagation()}>
              {lightbox.item.media_type === "image" ? (
                <Image
                  key={lightbox.item.id}
                  src={lightbox.item.url}
                  alt={lightbox.item.guest_name || "Gallery photo"}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <video src={lightbox.item.url} controls className="rounded-2xl w-full max-h-[85vh]" />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
