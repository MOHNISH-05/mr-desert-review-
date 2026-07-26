"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, MessageCircle, ExternalLink, Instagram, Sparkles, UserPlus } from "lucide-react";
import { fetchInstagramFeed, getInstagramAccountInfo, type InstagramPost } from "@/lib/instagram";

interface BusinessInstagramFeedProps {
  slug: string;
  businessName?: string;
}

export function BusinessInstagramFeed({ slug, businessName }: BusinessInstagramFeedProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const accountInfo = getInstagramAccountInfo(slug);
  const displayName = businessName || accountInfo.businessName;

  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetchInstagramFeed(slug)
      .then((data) => {
        if (isMounted) {
          setPosts(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load Instagram feed", err);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
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
                Live Instagram Feed
              </span>
            </div>
            <h3 className="font-serif text-2xl md:text-3xl font-semibold text-foreground flex items-center gap-2">
              @{accountInfo.handle}
              <span className="text-xs font-sans font-normal text-muted-foreground bg-desert-100 px-2.5 py-0.5 rounded-full">
                {accountInfo.followersCount} followers
              </span>
            </h3>
            <p className="text-xs md:text-sm text-muted-foreground mt-1">
              Latest moments shared by {displayName} on Instagram
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={accountInfo.accountUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 px-4 py-2 text-xs font-medium text-white shadow-sm hover:shadow-glow-sm hover:opacity-95 transition-all group"
            >
              <UserPlus className="h-3.5 w-3.5" />
              Follow Account
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

        {/* Loading State Skeleton */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
            {Array.from({ length: 6 }, (_, i) => (
              <div
                key={i}
                className="aspect-square rounded-2xl bg-desert-100 animate-pulse border border-desert-200/50"
              />
            ))}
          </div>
        ) : posts.length > 0 ? (
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

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3.5 text-white z-10">
                  {/* Top Bar: Instagram Logo Badge */}
                  <div className="flex justify-end">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600 text-white shadow-sm">
                      <Instagram className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  {/* Bottom Content: Counts & Caption */}
                  <div>
                    {/* Like & Comment Counts */}
                    <div className="flex items-center gap-3 text-xs font-semibold mb-1.5 text-white/95">
                      <span className="flex items-center gap-1">
                        <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                        {post.likesCount}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="h-3.5 w-3.5 text-white/90" />
                        {post.commentsCount}
                      </span>
                    </div>

                    {/* Caption Preview */}
                    <p className="text-[11px] leading-snug line-clamp-2 text-white/90 font-light mb-1">
                      {post.caption}
                    </p>

                    {/* Post Date */}
                    <span className="text-[10px] uppercase tracking-wider text-amber-300/90 font-medium">
                      {post.formattedDate}
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        ) : (
          /* Empty Fallback State */
          <div className="text-center py-12 rounded-2xl border border-dashed border-desert-200 bg-white/50">
            <Instagram className="h-10 w-10 mx-auto mb-3 text-desert-400" />
            <h4 className="font-serif text-lg font-semibold text-foreground mb-1">
              Connect on Instagram
            </h4>
            <p className="text-xs text-muted-foreground max-w-sm mx-auto mb-4">
              Follow @{accountInfo.handle} to explore real-time photos and stories from {displayName}.
            </p>
            <a
              href={accountInfo.accountUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 px-5 py-2 text-xs font-medium text-white shadow-sm hover:opacity-95 transition-all"
            >
              <Instagram className="h-3.5 w-3.5" />
              Visit @{accountInfo.handle} on Instagram
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
