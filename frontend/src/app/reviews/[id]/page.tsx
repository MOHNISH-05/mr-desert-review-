import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";
import { FALLBACK_REVIEWS } from "@/lib/fallback-data";
import { Stars } from "@/components/ui/stars";
import { Button } from "@/components/ui/button";
import { StoryActions } from "@/components/reviews/story-actions";
import { JsonLd } from "@/components/seo/json-ld";
import { ArrowLeft, CalendarDays, ExternalLink, MapPin } from "lucide-react";
import type { Review } from "@/types";

const baseUrl = "https://mr-desert-review.vercel.app";
const API_BASE = "";
type Props = { params: Promise<{ id: string }> };
const assetUrl = (url: string) => (url.startsWith("/uploads/") ? `${API_BASE}${url}` : url);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  let review: Review | undefined;

  try {
    review = await api.reviews.get(Number(id));
  } catch {
    review = FALLBACK_REVIEWS.find((r) => r.id === Number(id));
  }

  if (!review) {
    return { title: "Guest Story Not Found | Mr. Desert Reviews" };
  }

  const title = review.title
    ? `${review.title} | ${review.business_name || "Mr. Desert Review"}`
    : `Guest Review by ${review.guest_name} | ${review.business_name || "Mr. Desert Jaisalmer"}`;

  const description =
    review.content.length > 150
      ? `${review.content.slice(0, 147)}...`
      : review.content;

  const canonicalUrl = `${baseUrl}/reviews/${id}`;

  return {
    title,
    description,
    keywords: [
      `${review.business_name || "Jaisalmer"} review`,
      `Guest review by ${review.guest_name}`,
      "Jaisalmer desert camp experience",
      "Thar desert review",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "Mr. Desert Jaisalmer Reviews",
      images: [
        {
          url: "/businesses/mr-desert/6-scaled-e1756826347412.webp",
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/businesses/mr-desert/6-scaled-e1756826347412.webp"],
    },
  };
}

export default async function ReviewStoryPage({ params }: Props) {
  let review: Review | undefined;
  const { id } = await params;

  try {
    review = await api.reviews.get(Number(id));
  } catch {
    review = FALLBACK_REVIEWS.find((r) => r.id === Number(id));
  }

  if (!review) {
    notFound();
  }

  const images = review.media?.filter((item) => item.media_type === "image") || [];
  const cover = images[0] ? assetUrl(images[0].url) : "/businesses/mr-desert/6-scaled-e1756826347412.webp";
  let related: Review[] = [];

  try {
    const result = await api.reviews.list({
      business_id: review.business_id,
      page_size: 4,
      status: "approved",
    });
    if (result.reviews && result.reviews.length) {
      related = result.reviews.filter((item) => item.id !== review!.id).slice(0, 3);
    } else {
      related = FALLBACK_REVIEWS.filter(
        (item) => item.business_id === review!.business_id && item.id !== review!.id
      ).slice(0, 3);
    }
  } catch {
    related = FALLBACK_REVIEWS.filter(
      (item) => item.business_id === review!.business_id && item.id !== review!.id
    ).slice(0, 3);
  }

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    "@id": `${baseUrl}/reviews/${id}#review`,
    name: review.title || `Review for ${review.business_name || "Mr. Desert Jaisalmer"}`,
    reviewBody: review.content,
    datePublished: review.created_at || "2026-02-10",
    author: {
      "@type": "Person",
      name: review.guest_name,
      nationality: review.country || undefined,
    },
    itemReviewed: {
      "@type": "LocalBusiness",
      name: review.business_name || "Mr. Desert Jaisalmer",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jaisalmer",
        addressRegion: "Rajasthan",
        addressCountry: "IN",
      },
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.overall_rating,
      bestRating: 5,
      worstRating: 1,
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
        name: "Reviews",
        item: `${baseUrl}/all-reviews`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: review.title || `${review.guest_name}'s Review`,
        item: `${baseUrl}/reviews/${id}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[reviewSchema, breadcrumbSchema]} />
      <article className="min-h-screen bg-[#f7f3ed] pb-24 pt-28">
        <div className="container max-w-6xl">
          <Link
            href="/all-reviews"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-desert-700"
          >
            <ArrowLeft className="h-4 w-4" /> Back to stories
          </Link>

          <header className="grid items-end gap-10 lg:grid-cols-[1.25fr_.75fr]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-2xl shadow-xl">
              <img
                src={cover}
                alt={review.title || "Guest story"}
                width={800}
                height={500}
                loading="eager"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
              <span className="absolute bottom-5 left-5 rounded-full bg-[#6f491c]/90 px-4 py-2 text-xs uppercase tracking-[.2em] text-amber-50">
                {review.business_name || "Mr. Desert Jaisalmer"}
              </span>
            </div>

            <div className="pb-2">
              <p className="mb-4 text-xs uppercase tracking-[.28em] text-desert-700">A guest story</p>
              <h1 className="mb-5 text-4xl font-serif font-medium leading-tight md:text-6xl">
                {review.title || "A Jaisalmer experience to remember"}
              </h1>
              <div className="mb-5 flex items-center gap-3">
                <Stars rating={review.overall_rating} />
                <span className="font-semibold text-desert-700">{review.overall_rating.toFixed(1)} / 5</span>
              </div>
              <p className="mb-6 text-muted-foreground">
                Shared by <strong className="text-foreground">{review.guest_name}</strong>
                {review.country ? ` from ${review.country}` : ""}
                {review.city ? ` · ${review.city}` : ""}
              </p>
              <div className="flex flex-wrap gap-3">
                <StoryActions title={review.title || "Guest story"} />
                {review.business_slug && (
                  <Link href={`/business/${review.business_slug}`}>
                    <Button variant="outline">
                      <ExternalLink className="mr-2 h-4 w-4" /> Explore business
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </header>

          <div className="mx-auto mt-16 grid max-w-5xl gap-12 lg:grid-cols-[1fr_280px]">
            <div>
              <div className="mb-10 flex flex-wrap gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2">
                  <MapPin className="h-4 w-4 text-desert-600" />
                  {review.business_name || "Jaisalmer"}
                </span>
                <span className="flex items-center gap-2 rounded-full bg-white px-4 py-2">
                  <CalendarDays className="h-4 w-4 text-desert-600" />
                  {review.visit_date ? new Date(review.visit_date).toLocaleDateString() : "Guest experience"}
                </span>
                {review.is_verified && (
                  <span className="rounded-full bg-emerald-50 px-4 py-2 text-emerald-700">✓ Verified guest</span>
                )}
              </div>

              <div className="border-l-2 border-desert-300 pl-6 md:pl-10">
                <p className="whitespace-pre-line text-xl font-serif leading-relaxed md:text-2xl">{review.content}</p>
              </div>

              {review.reply && (
                <div className="mt-12 rounded-2xl border border-desert-100 bg-white p-6">
                  <p className="mb-2 text-xs uppercase tracking-widest text-desert-700">Owner response</p>
                  <p className="leading-relaxed text-muted-foreground">{review.reply.content}</p>
                </div>
              )}
            </div>

            {images.length > 1 && (
              <aside>
                <p className="mb-4 text-xs uppercase tracking-[.25em] text-desert-700">Guest photography</p>
                <div className="grid grid-cols-2 gap-3">
                  {images.slice(0, 6).map((image) => (
                    <img
                      key={image.id}
                      src={assetUrl(image.url)}
                      alt={`Guest photography by ${review.guest_name}`}
                      width={300}
                      height={300}
                      loading="lazy"
                      decoding="async"
                      className="aspect-square w-full rounded-xl object-cover"
                    />
                  ))}
                </div>
              </aside>
            )}
          </div>

          {related.length > 0 && (
            <section className="mt-20 border-t border-desert-200 pt-12">
              <p className="mb-3 text-xs uppercase tracking-[.25em] text-desert-700">Keep exploring</p>
              <h2 className="mb-8 text-3xl font-serif">More stories from {review.business_name}</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {related.map((item) => (
                  <Link
                    key={item.id}
                    href={`/reviews/${item.id}`}
                    className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <p className="mb-2 text-xs text-muted-foreground">{item.guest_name}</p>
                    <h3 className="font-serif text-xl">{item.title || "A guest experience"}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{item.content}</p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  );
}
