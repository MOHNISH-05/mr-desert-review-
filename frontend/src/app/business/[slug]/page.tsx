import { notFound } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { BusinessHero } from "@/components/business/business-hero";
import { BusinessReviews } from "@/components/reviews/review-list";
import { Sparkles, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

const businessDetails: Record<string, { eyebrow: string; title: string; points: string[] }> = {
  "mr-desert": {
    eyebrow: "The wider ecosystem",
    title: "A complete Jaisalmer journey",
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
    points: [
      "Personalized itineraries for couples, families and groups",
      "Sightseeing, transport and accommodation coordination",
      "Local expertise with 24x7 traveler support",
      "Rajasthan heritage, desert and cultural experiences",
    ],
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const { slug } = await params;
    const business = await api.businesses.getBySlug(slug);
    return {
      title: `${business.name} Reviews`,
      description: business.short_description || `Read reviews for ${business.name}`,
    };
  } catch {
    return { title: "Business Not Found" };
  }
}

export default async function BusinessPage({ params }: Props) {
  let business;
  let reviews;

  try {
    const { slug } = await params;
    business = await api.businesses.getBySlug(slug);
    const revRes = await api.reviews.list({
      business_id: business.id,
      page_size: 20,
      status: "approved",
    });
    reviews = revRes.reviews || [];
  } catch {
    notFound();
  }

  const details = businessDetails[business.slug];

  return (
    <>
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

          {/* Quick links */}
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

      <BusinessReviews
        reviews={reviews}
        businessName={business.name}
        businessSlug={business.slug}
        businessId={business.id}
      />
    </>
  );
}
