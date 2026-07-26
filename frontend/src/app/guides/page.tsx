import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { api } from "@/lib/api";
import { FALLBACK_GUIDES } from "@/lib/fallback-data";
import { Map, ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/seo/json-ld";
import type { ContentItem } from "@/types";

const baseUrl = "https://mr-desert-review.vercel.app";

export const metadata: Metadata = {
  title: "Jaisalmer Destination Guides | Forts, Dunes & Safaris",
  description:
    "Expert local destination guides for Jaisalmer Fort, Sam Sand Dunes, Gadisar Lake, and Thar Desert camel safaris.",
  keywords: [
    "Jaisalmer destination guide",
    "Jaisalmer fort travel guide",
    "Sam Sand Dunes guide",
    "Gadisar Lake Jaisalmer",
    "Jaisalmer camel safari guide",
  ],
  alternates: {
    canonical: `${baseUrl}/guides`,
  },
  openGraph: {
    title: "Jaisalmer Destination Guides | Forts, Dunes & Safaris",
    description:
      "Expert local destination guides for Jaisalmer Fort, Sam Sand Dunes, Gadisar Lake, and Thar Desert camel safaris.",
    url: `${baseUrl}/guides`,
    siteName: "Mr. Desert Jaisalmer Reviews",
    images: [
      {
        url: "/businesses/elite-india-tour-planner/tour-safari.webp",
        width: 1200,
        height: 630,
        alt: "Jaisalmer Destination Guides",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jaisalmer Destination Guides | Forts, Dunes & Safaris",
    description:
      "Expert local destination guides for Jaisalmer Fort, Sam Sand Dunes, and Thar Desert safaris.",
    images: ["/businesses/elite-india-tour-planner/tour-safari.webp"],
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
  ],
};

export default async function GuidesPage() {
  let guides: ContentItem[] = [];
  try {
    guides = await api.content.guides({ page_size: 24 });
    if (!guides || !guides.length) {
      guides = FALLBACK_GUIDES;
    }
  } catch {
    guides = FALLBACK_GUIDES;
  }

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: guides.map((guide, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: guide.title,
      url: `${baseUrl}/guides/${guide.slug}`,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbSchema, itemListSchema]} />
      <div className="pt-28 pb-24 min-h-screen bg-background">
        <div className="relative mb-16 overflow-hidden bg-[#1A1A1A]">
          <div className="absolute inset-0 z-0">
            <Image
              src="/businesses/elite-india-tour-planner/tour-safari.webp"
              alt="Jaisalmer Destination Guides Header"
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-25"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/85 to-background z-[1]" aria-hidden="true" />
          <div className="container relative max-w-3xl py-12 z-10">
            <p className="eyebrow flex items-center gap-2">
              <Map className="h-3.5 w-3.5" />
              Plan your Jaisalmer journey
            </p>
            <h1 className="section-heading mb-5">
              Destination{" "}
              <span className="text-gradient-gold italic">Guides</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Local knowledge for the fort, dunes, heritage lanes and unforgettable desert experiences.
            </p>
          </div>
        </div>

        <div className="container">
          {guides.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {guides.map((guide) => (
                <Link
                  key={guide.id}
                  href={`/guides/${guide.slug}`}
                  className="group rounded-2xl border border-desert-100 bg-white p-7 hover:border-desert-300 hover:shadow-luxury-lg transition-all duration-500 hover:-translate-y-1"
                >
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-desert-50 text-desert-600 mb-6 group-hover:bg-desert-100 transition-colors">
                    <Map className="h-5 w-5" />
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-desert-600 mb-2">
                    {guide.category || "Jaisalmer guide"}
                  </p>
                  <h2 className="text-xl font-serif font-semibold mb-3 group-hover:text-desert-700 transition-colors leading-snug">
                    {guide.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{guide.excerpt}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-desert-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read guide <ArrowUpRight className="h-4 w-4" />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-desert-200 p-16 text-center text-muted-foreground">
              Destination guides are being curated by our local editorial team.
            </div>
          )}
        </div>
      </div>
    </>
  );
}
