"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Stars } from "@/components/ui/stars";
import { ExternalLink, Phone, MapPin, Calendar, ArrowLeft, PenLine, Sparkles } from "lucide-react";
import type { Business } from "@/types";
import { getBusinessHeroImage } from "@/lib/business-images";

interface BusinessHeroProps {
  business: Business;
}

export function BusinessHero({ business }: BusinessHeroProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const bg = business.hero_image_url || getBusinessHeroImage(business.slug);

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-end overflow-hidden bg-[#1A1A1A]">
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ y: bgY }}>
        <Image
          src={bg}
          alt={`${business.name} Hero Image`}
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105 transition-transform duration-1000"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/95 via-[#1A1A1A]/50 to-[#1A1A1A]/30 z-[1]" />
      <div className="absolute inset-0 bg-gradient-hero opacity-60 z-[1]" />
      <div className="absolute inset-0 noise-overlay z-[1]" aria-hidden="true" />

      <motion.div className="container relative z-10 py-20 md:py-24" style={{ opacity }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm mb-6 group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>

          <div className="max-w-3xl">
            {business.logo_url && (
              <div className="relative h-16 w-48 mb-5">
                <Image
                  src={business.logo_url}
                  alt={`${business.name} Logo`}
                  fill
                  className="object-contain object-left"
                />
              </div>
            )}

            <p className="eyebrow text-amber-300/80 mb-4 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              Official business page
            </p>

            <h1 className="text-4xl md:text-6xl font-serif font-medium text-white mb-4 leading-[1.05]">
              {business.name}
            </h1>
            <p className="text-white/70 text-lg md:text-xl mb-6 max-w-2xl leading-relaxed font-light">
              {business.short_description || business.description}
            </p>

            <div className="flex items-center gap-4 flex-wrap mb-8">
              <div className="flex items-center gap-2 glass-luxury rounded-xl px-4 py-2.5">
                <Stars rating={business.average_rating} size="sm" />
                <span className="text-white font-semibold">{business.average_rating.toFixed(1)}</span>
                <span className="text-white/50 text-sm">({business.total_reviews} reviews)</span>
              </div>
              {business.address && (
                <div className="flex items-center gap-1.5 text-white/60 text-sm">
                  <MapPin className="h-4 w-4 text-desert-400" />
                  {business.address}
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              {business.website_url && (
                <a href={business.website_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="gold" size="lg" className="group">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Visit Website
                  </Button>
                </a>
              )}
              {business.booking_url && (
                <a href={business.booking_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="default" size="lg">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Now
                  </Button>
                </a>
              )}
              {business.whatsapp_number && (
                <a
                  href={`https://wa.me/${business.whatsapp_number.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="glass" size="lg" className="!text-emerald-300 border-emerald-500/30 hover:!bg-emerald-500/20">
                    <Phone className="h-4 w-4 mr-2" />
                    WhatsApp
                  </Button>
                </a>
              )}
              {business.google_maps_url && (
                <a href={business.google_maps_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="glass" size="lg">
                    <MapPin className="h-4 w-4 mr-2" />
                    Google Maps
                  </Button>
                </a>
              )}
              <Link href={`/write-review?business=${business.slug}`}>
                <Button variant="glass" size="lg">
                  <PenLine className="h-4 w-4 mr-2" />
                  Write a Review
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
