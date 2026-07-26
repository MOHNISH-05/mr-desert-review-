"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowDown, ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DesertParticles } from "@/components/effects/desert-particles";

export function HeroSection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-end overflow-hidden bg-[#1A1A1A]">
      {/* Parallax background video with poster fallback */}
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ y: bgY }}>
        <Image
          src="/businesses/mr-desert/6-scaled-e1756826347412.webp"
          alt="Mr. Desert Jaisalmer Thar Desert Experience"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105"
        />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105 opacity-90 transition-opacity duration-1000"
        >
          <source src="/videos/hero-video.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-hero" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#1A1A1A]/90 via-transparent to-[#1A1A1A]/20" />
      <div className="absolute inset-0 z-[1] noise-overlay" aria-hidden="true" />

      {/* Animated blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-desert-500/10 blur-3xl animate-blob z-[1]" aria-hidden="true" />
      <div className="absolute bottom-1/3 left-1/4 w-72 h-72 rounded-full bg-amber-400/8 blur-3xl animate-blob z-[1]" style={{ animationDelay: "-4s" }} aria-hidden="true" />

      {/* Desert particles */}
      <DesertParticles count={50} />

      {/* Slow-moving clouds */}
      <div className="absolute top-[15%] left-0 right-0 z-[2] opacity-20 pointer-events-none" aria-hidden="true">
        <svg className="w-full animate-cloud-drift" viewBox="0 0 1200 80" fill="none">
          <ellipse cx="200" cy="40" rx="120" ry="25" fill="white" opacity="0.6" />
          <ellipse cx="280" cy="35" rx="80" ry="20" fill="white" opacity="0.4" />
          <ellipse cx="700" cy="50" rx="150" ry="30" fill="white" opacity="0.5" />
          <ellipse cx="820" cy="45" rx="90" ry="22" fill="white" opacity="0.35" />
        </svg>
      </div>

      {/* Camel silhouette */}
      <div className="absolute bottom-[18%] right-[8%] z-[2] hidden lg:block opacity-15 pointer-events-none animate-float-slow" aria-hidden="true">
        <svg width="180" height="120" viewBox="0 0 180 120" fill="none">
          <path
            d="M20 90 Q30 70 45 75 Q55 50 70 55 Q80 30 95 35 Q100 20 110 25 Q115 40 120 45 Q140 35 155 50 Q165 55 160 70 Q150 85 130 88 Q110 92 90 90 Q60 88 40 92 Q25 95 20 90Z"
            fill="#C79A3B"
          />
          <circle cx="108" cy="28" r="3" fill="#1A1A1A" />
        </svg>
      </div>

      {/* Content */}
      <motion.div className="container relative z-10 pb-24 pt-36 md:pb-32" style={{ y: textY, opacity }}>
        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="eyebrow text-amber-300/90 mb-6"
          >
            The Mr. Desert Journal · Jaisalmer, Rajasthan
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-medium text-white leading-[0.92] mb-7 tracking-tight"
          >
            The golden city,
            <br />
            <span className="text-shimmer italic">told beautifully.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-lg md:text-xl text-white/70 max-w-lg leading-relaxed mb-10 font-light"
          >
            Guest stories from the stays, desert camps and journeys curated by Dheeraj Purohit — where Rajasthan meets refined hospitality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/all-reviews">
              <Button variant="gold" size="xl" className="group">
                Explore stories
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="#business-stories">
              <Button variant="glass" size="xl">
                Meet the four places
              </Button>
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.a
        href="#business-stories"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50 hover:text-white/80 transition-colors"
        aria-label="Scroll to discover"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Discover</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="h-5 w-5" />
        </motion.div>
      </motion.a>

      {/* Floating CTA pill */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 right-8 z-10 hidden md:flex"
      >
        <Link
          href="/gallery"
          className="flex items-center gap-3 rounded-full glass-luxury px-5 py-3 text-sm text-white/90 hover:bg-white/15 transition-all hover:shadow-glow-sm"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-desert-500/80">
            <Play className="h-3.5 w-3.5 fill-white text-white ml-0.5" />
          </span>
          View guest gallery
        </Link>
      </motion.div>
    </section>
  );
}
