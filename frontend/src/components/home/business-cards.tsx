"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, PenLine, Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/effects/scroll-reveal";
import type { Business } from "@/types";
import { getFeaturedCardImages, getBusinessImages } from "@/lib/business-images";
import { BusinessInstagramFeed } from "@/components/business/instagram-feed";

const stories: Record<string, { kicker: string; title: string; copy: string }> = {
  "mr-desert": {
    kicker: "01 · The Host",
    title: "The spirit of the Thar",
    copy: "A Jaisalmer story shaped by golden dunes, living culture and warm Rajasthani hospitality — where every sunset feels like a private ceremony.",
  },
  "elite-castle": {
    kicker: "02 · The Stay",
    title: "A room with a view of history",
    copy: "Inside Elite Castle, heritage detail meets a rooftop view of the world's most romantic fort city — refined comfort steps from the Golden Fort.",
  },
  "happy-adventure": {
    kicker: "03 · The Camp",
    title: "Nights beneath the desert stars",
    copy: "Follow the light to Sam Sand Dunes for tented comfort, folk evenings and the quiet drama of the Thar — where silence becomes luxury.",
  },
  "tour-planner": {
    kicker: "04 · The Journey",
    title: "Go beyond the expected",
    copy: "Thoughtful Rajasthan journeys planned with local knowledge, graceful pacing and a sense of place — travel as it should be experienced.",
  },
  "jaisal-inn": {
    kicker: "05 · The Hotel",
    title: "Modern luxury near Gadisar Road",
    copy: "Hotel Jaisal Inn offers premium rooms, a refreshing rooftop swimming pool, fine dining and seamless desert safari arrangements near Gadisar Lake.",
  },
  "vijay-bagh": {
    kicker: "06 · The Heritage Resort",
    title: "Royal heritage village living",
    copy: "Nestled near historical Kuldhara, Vijay Bagh presents heritage suites, desert cottages, traditional folk dining and serene desert quiet.",
  },
};

const shortNames: Record<string, string> = {
  "mr-desert": "Mr. Desert Jaisalmer",
  "elite-castle": "Elite Castle Jaisalmer",
  "happy-adventure": "Happy Adventure Camp",
  "tour-planner": "Elite India Tour Planner",
  "jaisal-inn": "Hotel Jaisal Inn",
  "vijay-bagh": "Vijay Bagh",
};

function StoryImage({ slug, alt, kicker }: { slug: string; alt: string; kicker: string }) {
  const images = getFeaturedCardImages(slug);
  const businessImages = getBusinessImages(slug);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = window.setInterval(() => setIndex((c) => (c + 1) % images.length), 4500);
    return () => window.clearInterval(timer);
  }, [images]);

  const currentImage = images[index] || images[0];
  const currentMetadata = businessImages[index] || businessImages[0];
  const imageAlt = currentMetadata?.alt || `${alt} photo ${index + 1}`;

  return (
    <div className="group relative overflow-hidden aspect-[4/3] rounded-2xl bg-desert-200 shadow-luxury">
      <AnimatePresence mode="sync">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src={currentImage}
            alt={imageAlt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/15 pointer-events-none" />
      
      {/* Kicker badge */}
      <span className="absolute top-5 left-5 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-white backdrop-blur-sm z-10">
        <Sparkles className="h-3 w-3 text-desert-400" />
        {kicker}
      </span>

      {/* Image Counter & Indicators */}
      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between z-10">
        <span className="text-[11px] font-medium tracking-wider text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full border border-white/10">
          {index + 1} / {images.length}
        </span>
        <div className="flex gap-1.5">
          {images.map((_, dot) => (
            <button
              key={dot}
              onClick={() => setIndex(dot)}
              aria-label={`View image ${dot + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                dot === index ? "w-6 bg-desert-400" : "w-1.5 bg-white/50 hover:bg-white/80"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function BusinessCards({ businesses }: { businesses: Business[] }) {
  return (
    <section id="business-stories" className="relative py-24 md:py-36 bg-background overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-desert-200/30 blur-3xl pointer-events-none" aria-hidden="true" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 rounded-full bg-amber-100/40 blur-3xl pointer-events-none" aria-hidden="true" />

      <div className="container relative">
        <ScrollReveal className="max-w-xl mb-20">
          <p className="eyebrow">Four addresses · one golden city</p>
          <h2 className="section-heading">
            Read the places
            <br />
            <span className="italic text-desert-600">behind the stories.</span>
          </h2>
        </ScrollReveal>

        <div className="space-y-24 md:space-y-32">
          {businesses.map((business, index) => {
            const story = stories[business.slug] || stories["mr-desert"];
            const reverse = index % 2 === 1;

            return (
              <div key={business.id} className="space-y-12">
                <motion.article
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                    reverse ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <StoryImage
                    slug={business.slug}
                    alt={shortNames[business.slug] || business.name}
                    kicker={story.kicker}
                  />
                  <div className="max-w-md">
                    <p className="text-sm font-medium tracking-[0.2em] uppercase text-desert-600 mb-4">
                      {shortNames[business.slug] || business.name}
                    </p>
                    <h3 className="text-3xl md:text-5xl font-serif font-medium leading-[1.08] mb-6">
                      {story.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed mb-8 text-base">
                      {story.copy}
                    </p>
                    <div className="flex flex-wrap items-center gap-5">
                      <Link
                        href={`/business/${business.slug}`}
                        className="inline-flex items-center gap-2 rounded-full bg-dark px-5 py-2.5 text-sm font-medium text-white hover:bg-dark/90 hover:shadow-glow-sm transition-all group"
                      >
                        Read guest stories
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                      <Link
                        href={`/write-review?business=${business.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-medium text-desert-700 hover:text-desert-900 border-b border-desert-300 pb-0.5 transition-colors"
                      >
                        <PenLine className="h-4 w-4" />
                        Write a review
                      </Link>
                    </div>
                  </div>
                </motion.article>

                {/* Live Instagram Feed for this business */}
                <BusinessInstagramFeed slug={business.slug} businessName={business.name} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
