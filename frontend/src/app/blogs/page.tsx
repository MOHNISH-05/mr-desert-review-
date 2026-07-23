import type { Metadata } from "next";
import Link from "next/link";
import { api } from "@/lib/api";
import { FALLBACK_BLOGS } from "@/lib/fallback-data";
import { BlogCard } from "@/components/ui/blog-card";
import { JsonLd } from "@/components/seo/json-ld";
import type { ContentItem } from "@/types";

const baseUrl = "https://mr-desert-review.vercel.app";

export const metadata: Metadata = {
  title: "Desert Journal & Travel Stories | Mr. Desert Jaisalmer",
  description:
    "Explore travel guides, desert camping tips, fort history, and local insights for visiting Jaisalmer and the Thar Desert in Rajasthan.",
  keywords: [
    "Jaisalmer travel blog",
    "Thar desert travel guide",
    "Best time to visit Jaisalmer",
    "Jaisalmer fort history",
    "Camel safari tips",
  ],
  alternates: {
    canonical: `${baseUrl}/blogs`,
  },
  openGraph: {
    title: "Desert Journal & Travel Stories | Mr. Desert Jaisalmer",
    description:
      "Explore travel guides, desert camping tips, fort history, and local insights for visiting Jaisalmer.",
    url: `${baseUrl}/blogs`,
    siteName: "Mr. Desert Jaisalmer Reviews",
    images: [
      {
        url: "/images/dheeraj/mr-desert-alley.webp",
        width: 1200,
        height: 630,
        alt: "Jaisalmer Travel Journal",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Desert Journal & Travel Stories | Mr. Desert Jaisalmer",
    description:
      "Explore travel guides, desert camping tips, fort history, and local insights for visiting Jaisalmer.",
    images: ["/images/dheeraj/mr-desert-alley.webp"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: baseUrl,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Journal & Blogs",
      item: `${baseUrl}/blogs`,
    },
  ],
};

export default async function BlogsPage() {
  let blogs: ContentItem[] = [];
  try {
    blogs = await api.content.blogs({ page_size: 24 });
    if (!blogs || !blogs.length) {
      blogs = FALLBACK_BLOGS;
    }
  } catch {
    blogs = FALLBACK_BLOGS;
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: blogs.map((blog, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: blog.title,
      url: `${baseUrl}/blogs/${blog.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema, itemListSchema]} />
      <div className="pt-28 pb-24 min-h-screen bg-background">
        <div className="relative mb-16 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('/images/dheeraj/mr-desert-alley.webp')" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/85 to-background" aria-hidden="true" />
          <div className="container relative max-w-3xl py-12">
            <p className="eyebrow">The Desert Journal</p>
            <h1 className="section-heading mb-5">
              Stories from the{" "}
              <span className="text-gradient-gold italic">Golden City</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Thoughtful travel stories, practical advice and local perspective for discovering Jaisalmer.
            </p>
          </div>
        </div>

        <div className="container">
          {blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
              {blogs.map((blog, i) => (
                <BlogCard key={blog.id} blog={blog} index={i} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-desert-200 p-16 text-center">
              <p className="text-muted-foreground text-lg">
                Our editorial team is preparing the first travel stories.
              </p>
              <Link href="/all-reviews" className="inline-block mt-4 text-desert-600 hover:underline font-medium">
                Explore guest stories instead →
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
