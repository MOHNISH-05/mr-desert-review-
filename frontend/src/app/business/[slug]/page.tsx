import { notFound } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { FALLBACK_BUSINESSES, FALLBACK_REVIEWS } from "@/lib/fallback-data";
import { BusinessHero } from "@/components/business/business-hero";
import { BusinessReviews } from "@/components/reviews/review-list";
import { BusinessInstagramFeed } from "@/components/business/instagram-feed";
import { JsonLd } from "@/components/seo/json-ld";
import { Sparkles, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

const baseUrl = "https://mr-desert-review.vercel.app";

interface Props {
  params: Promise<{ slug: string }>;
}

const businessDetails: Record<string, { eyebrow: string; title: string; points: string[]; schemaType: string }> = {
  "mr-desert": {
    eyebrow: "The wider ecosystem",
    title: "A complete Jaisalmer journey",
    schemaType: "TravelAgency",
    points: [
      "Heritage hotels and comfortable stays",
      "Luxury desert camps near Sam Sand Dunes",
      "Camel safari, jeep safari and sightseeing",
      "Rajasthan tour packages and local experiences",
    ],
  },
  "elite-castle": {
    eyebrow: "Stay near the Golden Fort",
    title: "Heritage character, modern comfort",
    schemaType: "Hotel",
    points: [
      "Deluxe rooms, suites and desert cottages",
      "Rooftop restaurant with fort and city views",
      "Wi-Fi, room service, parking and air conditioning",
      "Local sightseeing and desert experiences",
    ],
  },
  "happy-adventure": {
    eyebrow: "Sleep beneath the Thar sky",
    title: "A complete desert camp experience",
    schemaType: "LodgingBusiness",
    points: [
      "Luxury AC Swiss Tents and Royal AC Cottages",
      "Camel and jeep safaris at Sam Sand Dunes",
      "Rajasthani dining, folk music, dance and bonfire",
      "Stargazing, quad biking and adventure activities",
    ],
  },
  "tour-planner": {
    eyebrow: "Travel across Rajasthan and India",
    title: "Journeys shaped around you",
    schemaType: "TravelAgency",
    points: [
      "Personalized itineraries for couples, families and groups",
      "Sightseeing, transport and accommodation coordination",
      "Local expertise with 24x7 traveler support",
      "Rajasthan heritage, desert and cultural experiences",
    ],
  },
  "jaisal-inn": {
    eyebrow: "Stay near Gadisar Road",
    title: "Premium hotel & rooftop dining",
    schemaType: "Hotel",
    points: [
      "Luxury rooms, family suites and premium amenities",
      "Rooftop restaurant with authentic dining",
      "Refreshing swimming pool & hospitality services",
      "Desert safari packages and city tour assistance",
    ],
  },
  "vijay-bagh": {
    eyebrow: "Heritage village resort near Kuldhara",
    title: "Royal Rajasthani heritage & desert living",
    schemaType: "Resort",
    points: [
      "Royal heritage suites and luxury desert cottages",
      "Authentic Rajasthani dining & traditional folk music",
      "Near historical Kuldhara ghost village",
      "Guided desert tours and stargazing experiences",
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let business;

  try {
    business = await api.businesses.getBySlug(slug);
  } catch {
    business = FALLBACK_BUSINESSES.find((b) => b.slug === slug);
  }

  if (!business) {
    return { title: "Business Not Found | Mr. Desert Jaisalmer" };
  }

  const title = `${business.name} Reviews | Luxury Tourism Jaisalmer`;
  const description =
    business.short_description ||
    `Read authentic guest reviews and ratings for ${business.name} in Jaisalmer, Rajasthan.`;
  const canonicalUrl = `${baseUrl}/business/${slug}`;

  return {
    title,
    description,
    keywords: [
      `${business.name} reviews`,
      `${business.name} Jaisalmer`,
      "Jaisalmer desert tourism",
      "Rajasthan luxury stay",
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
          url: business.hero_image_url || "/businesses/mr-desert/6-scaled-e1756826347412.webp",
          width: 1200,
          height: 630,
          alt: business.name,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [business.hero_image_url || "/businesses/mr-desert/6-scaled-e1756826347412.webp"],
    },
  };
}

export const dynamic = "force-dynamic";

export default async function BusinessPage({ params }: Props) {
  let business;
  let reviews: typeof FALLBACK_REVIEWS = [];
  const { slug } = await params;

  try {
    business = await api.businesses.getBySlug(slug);
    const revRes = await api.reviews.list({
      business_id: business.id,
      page_size: 20,
      status: "approved",
    });
    reviews = revRes.reviews || [];
  } catch {
    business = FALLBACK_BUSINESSES.find((b) => b.slug === slug);
    if (!business) {
      notFound();
    }
    reviews = FALLBACK_REVIEWS.filter((r) => r.business_slug === slug);
  }

  const details = businessDetails[business.slug] || businessDetails["mr-desert"];

  const businessSchema = {
    "@context": "https://schema.org",
    "@type": details.schemaType || "LocalBusiness",
    "@id": `${baseUrl}/business/${business.slug}#business`,
    name: business.name,
    description: business.description || business.short_description,
    url: business.website_url || `${baseUrl}/business/${business.slug}`,
    telephone: business.contact_phone || "+91-9829038039",
    email: business.contact_email || "info@mrdesertjaisalmer.in",
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address || "Jaisalmer",
      addressLocality: "Jaisalmer",
      addressRegion: "Rajasthan",
      postalCode: "345001",
      addressCountry: "IN",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: business.average_rating || 4.9,
      reviewCount: business.total_reviews || reviews.length || 50,
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
        name: "Our Businesses",
        item: `${baseUrl}/#business-stories`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: business.name,
        item: `${baseUrl}/business/${business.slug}`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[businessSchema, breadcrumbSchema]} />
      <BusinessHero business={business} />

      <section className="py-16 md:py-20 bg-background">
        <div className="container">
          {business.description && (
            <div className="mb-14 max-w-3xl">
              <p className="eyebrow">About this place</p>
              <h2 className="font-serif text-3xl md:text-4xl font-medium mb-5">
                {business.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                {business.description}
              </p>
            </div>
          )}

          {details && (
            <div className="mb-14 rounded-2xl border border-desert-100 bg-white p-8 md:p-10 shadow-luxury">
              <p className="eyebrow flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5" />
                {details.eyebrow}
              </p>
              <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-8">
                {details.title}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.points.map((point) => (
                  <div
                    key={point}
                    className="flex items-start gap-3 text-sm text-muted-foreground p-3 rounded-xl bg-desert-50/50"
                  >
                    <span className="mt-0.5 text-desert-500 shrink-0">✦</span>
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {business.google_maps_embed && (
            <div className="mb-14 rounded-2xl overflow-hidden shadow-luxury border border-desert-100">
              <div dangerouslySetInnerHTML={{ __html: business.google_maps_embed }} />
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {business.website_url && (
              <a
                href={business.website_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-desert-200 px-5 py-2.5 text-sm font-medium text-desert-700 hover:bg-desert-50 transition-colors"
              >
                Official website <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full border border-desert-200 px-5 py-2.5 text-sm font-medium text-desert-700 hover:bg-desert-50 transition-colors"
            >
              View gallery <ArrowUpRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/write-review?business=${business.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-dark px-5 py-2.5 text-sm font-medium text-white hover:bg-dark/90 transition-colors"
            >
              Write a review <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <BusinessInstagramFeed slug={business.slug} businessName={business.name} />

      <BusinessReviews
        reviews={reviews}
        businessName={business.name}
        businessSlug={business.slug}
        businessId={business.id}
      />
    </>
  );
}
