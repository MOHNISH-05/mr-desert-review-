"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ExternalLink, Instagram, Play, Calendar, UserPlus } from "lucide-react";
import { fetchInstagramFeed, getInstagramAccountInfo, type InstagramPost } from "@/lib/instagram";

interface BusinessInstagramFeedProps {
  slug: string;
  businessName?: string;
}

export function BusinessInstagramFeed({ slug, businessName }: BusinessInstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const accountInfo = getInstagramAccountInfo(slug);
  const displayName = businessName || accountInfo.businessName;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(false);

    fetchInstagramFeed(slug)
      .then((data) => {
        if (isMounted) {
          if (Array.isArray(data) && data.length > 0) {
            setPosts(data);
          } else {
            setError(true);
          }
        }
      })
      .catch((err) => {
        console.error("Failed to load Instagram feed:", err);
        if (isMounted) setError(true);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background via-desert-50/30 to-background border-t border-desert-100/60 overflow-hidden">
      <div className="container">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-sm">
                <Instagram className="h-3.5 w-3.5" />
              </span>
              <span className="text-xs font-semibold tracking-widest uppercase text-rose-600">
                Official Instagram Feed
              </span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground flex items-center gap-2">
              @{accountInfo.handle}
              <span className="text-xs font-sans font-normal text-muted-foreground bg-desert-100 px-2.5 py-0.5 rounded-full">
                {accountInfo.followersCount} followers
              </span>
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Latest moments & stories from {displayName}
            </p>
          </div>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={accountInfo.accountUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 px-4 py-2 text-xs font-medium text-white shadow-sm hover:shadow-glow-sm hover:opacity-95 transition-all group"
            >
              <UserPlus className="h-3.5 w-3.5" />
              Follow on Instagram
            </a>
            <a
              href={accountInfo.accountUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-desert-200 bg-white px-3.5 py-2 text-xs font-medium text-desert-800 hover:bg-desert-50 transition-colors"
            >
              View Profile
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>

        {/* Loading State Skeletons */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-desert-100 animate-pulse border border-desert-200/50"
              />
            ))}
          </div>
        ) : posts.length > 0 && !error ? (
          /* 6-Post Responsive Grid */
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {posts.slice(0, 6).map((post, idx) => (
              <motion.a
                key={post.id}
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group relative overflow-hidden aspect-square rounded-2xl bg-desert-100 shadow-luxury hover:shadow-luxury-lg transition-all duration-500 block focus:outline-none focus:ring-2 focus:ring-rose-500"
              >
                <Image
                  src={post.mediaUrl}
                  alt={post.caption || `${displayName} Instagram post`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />

                {/* Video Indicator Badge */}
                {post.isVideo && (
                  <div className="absolute top-2.5 right-2.5 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm">
                    <Play className="h-3 w-3 fill-white ml-0.5" />
                  </div>
                )}

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3.5 text-white z-20">
                  {/* Top Bar: Instagram Logo Icon */}
                  <div className="flex justify-end">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-sm">
                      <Instagram className="h-3 w-3" />
                    </span>
                  </div>

                  {/* Bottom Bar: Date & 2-Line Caption Preview */}
                  <div>
                    {/* Caption Preview (Exact 2-Line Restriction) */}
                    <p className="text-[11px] leading-tight line-clamp-2 text-white/95 font-medium mb-1.5 drop-shadow-sm">
                      {post.caption}
                    </p>

                    {/* Post Date */}
                    <div className="flex items-center gap-1 text-[10px] text-amber-300/90 font-medium">
                      <Calendar className="h-3 w-3 shrink-0" />
                      <span>{post.formattedDate}</span>
                    </div>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          /* Clean Unavailable Fallback State */
          <div className="text-center py-10 px-6 rounded-2xl border border-dashed border-desert-200 bg-white/60">
            <Instagram className="h-10 w-10 mx-auto mb-3 text-rose-500" />
            <h4 className="font-serif text-lg font-semibold text-foreground mb-1">
              Explore @{accountInfo.handle} on Instagram
            </h4>
            <p className="text-xs text-muted-foreground max-w-md mx-auto mb-5 leading-relaxed">
              Follow our official account on Instagram for daily stories, traveler photos, and exclusive desert experiences.
            </p>
            <a
              href={accountInfo.accountUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 px-5 py-2.5 text-xs font-medium text-white shadow-sm hover:opacity-95 transition-all"
            >
              <UserPlus className="h-4 w-4" />
              Follow @{accountInfo.handle} on Instagram
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
