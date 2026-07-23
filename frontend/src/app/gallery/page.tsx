"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Camera, ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "@/lib/api";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import type { GalleryItem } from "@/types";

export default function GalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ item: GalleryItem; index: number } | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    api.gallery.list({ page_size: 50 }).then((res) => {
      setItems(res.items);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = filter
    ? items.filter((i) => i.business_name?.toLowerCase().includes(filter.toLowerCase()))
    : items;

  const filters = ["All", "Mr. Desert Jaisalmer", "Elite Castle Jaisalmer", "Happy Adventure Camp Jaisalmer", "Elite India Tour Planner"];

  const navigateLightbox = (dir: -1 | 1) => {
    if (!lightbox) return;
    const newIndex = (lightbox.index + dir + filtered.length) % filtered.length;
    setLightbox({ item: filtered[newIndex], index: newIndex });
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-background">
      {/* Hero header */}
      <div className="relative mb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/images/dheeraj/happy-camp-night.webp')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" aria-hidden="true" />
        <div className="container relative py-12 text-center">
          <ScrollReveal>
            <p className="eyebrow justify-center flex">Captured moments</p>
            <h1 className="section-heading mb-4">
              Guest <span className="text-gradient-gold italic">Gallery</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Real moments captured by our guests during their stay in the Golden City
            </p>
          </ScrollReveal>
        </div>
      </div>

      <div className="container">
        {/* Filters */}
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {filters.map((name) => (
            <button
              key={name}
              onClick={() => setFilter(name === "All" ? "" : name)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                (name === "All" && !filter) || filter === name
                  ? "bg-desert-500 text-white shadow-glow-sm"
                  : "bg-white border border-desert-100 text-foreground/70 hover:border-desert-300 hover:text-desert-700"
              }`}
            >
              {name === "All" ? name : name.replace(" Jaisalmer", "").replace(" Elite India Tour Planner", " Tour Planner")}
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
                <div className="relative rounded-2xl overflow-hidden shadow-luxury hover:shadow-luxury-lg transition-all duration-500">
                  {item.media_type === "image" ? (
                    <img
                      src={item.url}
                      alt={item.guest_name ? `Photo by ${item.guest_name}` : "Guest photo"}
                      className="w-full rounded-2xl transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  ) : (
                    <div className="relative bg-dark rounded-2xl h-48 flex items-center justify-center">
                      <span className="text-5xl text-white/80">▶</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                    <div className="absolute bottom-4 left-4 right-4">
                      {item.guest_name && (
                        <p className="text-white font-medium text-sm">{item.guest_name}</p>
                      )}
                      {item.business_name && (
                        <p className="text-white/60 text-xs mt-0.5">{item.business_name}</p>
                      )}
                    </div>
                    <div className="absolute top-4 right-4">
                      <Camera className="h-4 w-4 text-white/70" />
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
            <h3 className="text-xl font-serif font-semibold mb-2">No photos yet</h3>
            <p className="text-muted-foreground">Guests haven&apos;t uploaded photos yet</p>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(-1); }}
              className="absolute left-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigateLightbox(1); }}
              className="absolute right-5 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="relative max-w-5xl mx-auto p-4" onClick={(e) => e.stopPropagation()}>
              {lightbox.item.media_type === "image" ? (
                <motion.img
                  key={lightbox.item.id}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={lightbox.item.url}
                  alt=""
                  className="lightbox-image mx-auto"
                />
              ) : (
                <video src={lightbox.item.url} controls className="rounded-2xl w-full max-h-[88vh]" />
              )}
              {(lightbox.item.guest_name || lightbox.item.business_name) && (
                <div className="mt-4 text-center text-white/70 text-sm">
                  {lightbox.item.guest_name && <span>{lightbox.item.guest_name}</span>}
                  {lightbox.item.business_name && <span> · {lightbox.item.business_name}</span>}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
