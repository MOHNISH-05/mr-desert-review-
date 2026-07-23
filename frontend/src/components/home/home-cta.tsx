"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PenLine } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomeCTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/dheeraj/happy-camp-night.webp')" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[#1A1A1A]/85" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-desert-900/30 via-transparent to-desert-900/30" aria-hidden="true" />
      <div className="absolute inset-0 noise-overlay" aria-hidden="true" />

      <div className="container relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow text-amber-300/80 justify-center flex mb-6">
            Your story awaits
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-white mb-6 leading-tight max-w-2xl mx-auto">
            Share your Jaisalmer
            <br />
            <span className="text-shimmer italic">experience with the world.</span>
          </h2>
          <p className="text-white/60 text-lg mb-10 max-w-lg mx-auto leading-relaxed">
            Every guest story helps future travelers discover the magic of the Golden City.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/write-review">
              <Button variant="gold" size="xl" className="group">
                <PenLine className="h-4 w-4 mr-2" />
                Write a Review
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/gallery">
              <Button variant="glass" size="xl">
                View Guest Gallery
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
