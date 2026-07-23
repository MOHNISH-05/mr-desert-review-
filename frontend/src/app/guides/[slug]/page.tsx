import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { FALLBACK_GUIDES } from "@/lib/fallback-data";
import { JsonLd } from "@/components/seo/json-ld";
import type { ContentItem } from "@/types";

const baseUrl = "https://mr-desert-review.vercel.app";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let guide: ContentItem | undefined;

  try {
    guide = await api.content.guide(slug);
  } catch {
    guide = FALLBACK_GUIDES.find((g) => g.slug === slug);
  }

  if (!guide) {
    return { title: "Guide Not Found | Mr. Desert Guides" };
  }

  const title = guide.seo_title || `${guide.title} | Jaisalmer Destination Guide`;
  const description =
    guide.meta_description ||
    guide.excerpt ||
    `Read ${guide.title} for local insights and tips in Jaisalmer, Rajasthan.`;
  const canonicalUrl = `${baseUrl}/guides/${slug}`;

  return {
    title,
    description,
    keywords: [
      guide.title,
      "Jaisalmer attraction guide",
      guide.category || "Rajasthan travel",
      "Jaisalmer tourist spots",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Mr. Desert Jaisalmer Guides",
      images: [
        {
          url: guide.hero_image_url || "/images/dheeraj/camel-safari.webp",
          width: 1200,
          height: 630,
          alt: guide.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [guide.hero_image_url || "/images/dheeraj/camel-safari.webp"],
    },
  };
}

export default async function GuidePage({ params }: Props) {
  let guide: ContentItem | undefined;
  const { slug } = await params;

  try {
    guide = await api.content.guide(slug);
  } catch {
    guide = FALLBACK_GUIDES.find((g) => g.slug === slug);
  }

  if (!guide) {
    notFound();
  }

  const touristAttractionSchema = {
    "@context": "https://schema.org",
    "@type": "TouristAttraction",
    "@id": `${baseUrl}/guides/${slug}#attraction`,
    name: guide.title,
    description: guide.excerpt || guide.meta_description,
    image: guide.hero_image_url || `${baseUrl}/images/dheeraj/camel-safari.webp`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Jaisalmer",
      addressRegion: "Rajasthan",
      addressCountry: "IN",
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
        name: "Destination Guides",
        item: `${baseUrl}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: guide.title,
        item: `${baseUrl}/guides/${slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[touristAttractionSchema, breadcrumbSchema]} />
      <article className="pt-28 pb-20">
        <div className="container max-w-4xl">
          <Link href="/guides" className="mb-6 inline-block text-sm text-muted-foreground hover:text-desert-700 font-medium">
            ← Back to destination guides
          </Link>
          <p className="eyebrow">{guide.category || "Destination guide"}</p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold mt-3 mb-5">{guide.title}</h1>
          <p className="text-xl text-muted-foreground mb-8">{guide.excerpt}</p>

          <div className="rounded-3xl bg-desert-900 text-white p-8 md:p-12 mb-10 shadow-luxury">
            <p className="text-sm uppercase tracking-widest text-desert-200 mb-3">Jaisalmer, Rajasthan</p>
            <p className="text-2xl font-serif">
              A considered guide to help you experience the Golden City with more time, context and curiosity.
            </p>
          </div>

          <div className="prose prose-lg max-w-none whitespace-pre-line text-foreground/90 leading-relaxed">
            {guide.content}
          </div>

          {guide.map_url && (
            <a
              href={guide.map_url}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-10 rounded-full border border-desert-300 px-6 py-3 text-sm font-medium text-desert-800 hover:bg-desert-50 transition-all"
            >
              Open this destination in Google Maps →
            </a>
          )}

          <div className="mt-16 pt-8 border-t border-desert-200 flex flex-wrap gap-4 items-center justify-between">
            <Link
              href="/all-reviews"
              className="inline-flex items-center gap-2 rounded-full bg-dark px-6 py-3 text-sm font-medium text-white hover:bg-dark/90 transition-all"
            >
              Read guest experiences →
            </Link>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-full border border-desert-300 px-6 py-3 text-sm font-medium text-desert-800 hover:bg-desert-50 transition-all"
            >
              Read desert travel journal
            </Link>
          </div>
        </div>
      </article>
    </>
  );
}
