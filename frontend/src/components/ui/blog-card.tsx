"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, ArrowUpRight } from "lucide-react";
import type { ContentItem } from "@/types";

export function BlogCard({ blog, index = 0 }: { blog: ContentItem; index?: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        href={`/blogs/${blog.slug}`}
        className="group block overflow-hidden rounded-2xl border border-desert-100/60 bg-white shadow-luxury hover:shadow-luxury-lg transition-all duration-500 hover:-translate-y-2"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-desert-800 via-desert-600 to-amber-300">
          {blog.hero_image_url ? (
            <img
              src={blog.hero_image_url}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-desert-800 via-desert-600 to-amber-300" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            {blog.category || "Jaisalmer Travel"}
          </span>
          <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
            <Clock className="h-3 w-3" />
            {blog.reading_time || 5} min read
          </div>
        </div>

        <div className="p-6 md:p-7">
          {blog.author && (
            <p className="mb-3 text-xs text-muted-foreground">
              By <span className="font-medium text-foreground">{blog.author}</span>
            </p>
          )}
          <h2 className="mb-3 font-serif text-xl md:text-2xl font-semibold leading-snug group-hover:text-desert-700 transition-colors line-clamp-2">
            {blog.title}
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {blog.excerpt}
          </p>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-desert-700 group-hover:gap-2.5 transition-all">
            Read story <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
