import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { FALLBACK_BLOGS } from "@/lib/fallback-data";
import { JsonLd } from "@/components/seo/json-ld";
import type { ContentItem } from "@/types";

const baseUrl = "https://mr-desert-review.vercel.app";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let blog: ContentItem | undefined;

  try {
    blog = await api.content.blog(slug);
  } catch {
    blog = FALLBACK_BLOGS.find((b) => b.slug === slug);
  }

  if (!blog) {
    return { title: "Article Not Found | Mr. Desert Journal" };
  }

  const title = blog.seo_title || `${blog.title} | Jaisalmer Travel Guide`;
  const description =
    blog.meta_description ||
    blog.excerpt ||
    `Read ${blog.title} in the Mr. Desert Jaisalmer Travel Journal.`;
  const canonicalUrl = `${baseUrl}/blogs/${slug}`;

  return {
    title,
    description,
    keywords: [
      blog.title,
      "Jaisalmer travel guide",
      blog.category || "Rajasthan travel",
      "Thar desert guide",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Mr. Desert Jaisalmer Journal",
      images: [
        {
          url: blog.hero_image_url || "/images/dheeraj/mr-desert-alley.webp",
          width: 1200,
          height: 630,
          alt: blog.title,
        },
      ],
      type: "article",
      publishedTime: blog.published_at || undefined,
      authors: [blog.author || "Mr. Desert Editorial"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [blog.hero_image_url || "/images/dheeraj/mr-desert-alley.webp"],
    },
  };
}

export default async function BlogPage({ params }: Props) {
  let blog: ContentItem | undefined;
  const { slug } = await params;

  try {
    blog = await api.content.blog(slug);
  } catch {
    blog = FALLBACK_BLOGS.find((b) => b.slug === slug);
  }

  if (!blog) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${baseUrl}/blogs/${slug}#article`,
    headline: blog.title,
    description: blog.excerpt || blog.meta_description,
    image: blog.hero_image_url || `${baseUrl}/images/dheeraj/mr-desert-alley.webp`,
    datePublished: blog.published_at || "2026-01-10",
    author: {
      "@type": "Person",
      name: blog.author || "Mr. Desert Editorial",
    },
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    mainEntityOfPage: `${baseUrl}/blogs/${slug}`,
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
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: `${baseUrl}/blogs/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[articleSchema, breadcrumbSchema]} />
      <article className="pt-28 pb-20">
        <div className="container max-w-4xl">
          <Link href="/blogs" className="mb-6 inline-block text-sm text-muted-foreground hover:text-desert-700 font-medium">
            ← Back to journal
          </Link>
          <p className="eyebrow">{blog.category || "Travel journal"}</p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mt-3 mb-5">{blog.title}</h1>
          <p className="text-xl text-muted-foreground mb-8">{blog.excerpt}</p>
          
          <div className="h-72 md:h-[28rem] rounded-3xl overflow-hidden bg-gradient-to-br from-desert-700 via-desert-500 to-amber-200 mb-10 shadow-luxury">
            <img
              src={blog.hero_image_url || "/images/dheeraj/mr-desert-alley.webp"}
              alt={blog.title}
              width={1200}
              height={600}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex gap-4 text-sm text-muted-foreground mb-8">
            <span>By {blog.author || "Mr. Desert Editorial"}</span>
            <span>·</span>
            <span>{blog.reading_time || 5} min read</span>
          </div>

          <div className="prose prose-lg max-w-none whitespace-pre-line text-foreground/90 leading-relaxed">
            {blog.content}
          </div>

          <div className="mt-16 pt-8 border-t border-desert-200 flex flex-wrap gap-4 items-center justify-between">
            <Link
              href="/all-reviews"
              className="inline-flex items-center gap-2 rounded-full bg-dark px-6 py-3 text-sm font-medium text-white hover:bg-dark/90 transition-all"
            >
              Read guest experiences →
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-2 rounded-full border border-desert-300 px-6 py-3 text-sm font-medium text-desert-800 hover:bg-desert-50 transition-all"
            >
              Explore destination guides
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
