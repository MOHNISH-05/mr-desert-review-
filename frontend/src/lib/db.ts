import fs from "fs";
import path from "path";
export function normalizeSlug(slug: string): string {
  if (slug === "happy-adventure") return "happy-adventure-camp";
  if (slug === "tour-planner") return "elite-india-tour-planner";
  return slug;
}
import { FALLBACK_BUSINESSES, FALLBACK_REVIEWS } from "@/lib/fallback-data";
import type { Review, Business } from "@/types";

const DATA_DIR = path.join(process.cwd(), ".data");
const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");
const BUSINESSES_FILE = path.join(DATA_DIR, "businesses.json");

function ensureDirectoryExists() {
  if (!fs.existsSync(DATA_DIR)) {
    try {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    } catch {
      // Ignore if cannot write to filesystem (e.g. serverless read-only mode)
    }
  }
}

// In-memory cache for fast read/write
let memoryReviews: Review[] | null = null;
let memoryBusinesses: Business[] | null = null;

export function getDatabaseReviews(): Review[] {
  if (memoryReviews) return memoryReviews;

  ensureDirectoryExists();
  if (fs.existsSync(REVIEWS_FILE)) {
    try {
      const data = fs.readFileSync(REVIEWS_FILE, "utf-8");
      memoryReviews = JSON.parse(data);
      return memoryReviews || [];
    } catch (e) {
      console.warn("Could not read reviews database file, seeding defaults.", e);
    }
  }

  // Seed with initial reviews
  memoryReviews = [...FALLBACK_REVIEWS];
  saveReviewsToDisk(memoryReviews);
  return memoryReviews;
}

export function getDatabaseBusinesses(): Business[] {
  if (memoryBusinesses) return memoryBusinesses;

  ensureDirectoryExists();
  if (fs.existsSync(BUSINESSES_FILE)) {
    try {
      const data = fs.readFileSync(BUSINESSES_FILE, "utf-8");
      memoryBusinesses = JSON.parse(data);
      return memoryBusinesses || [];
    } catch (e) {
      console.warn("Could not read businesses database file, seeding defaults.", e);
    }
  }

  memoryBusinesses = [...FALLBACK_BUSINESSES];
  recalculateBusinessRatings(memoryBusinesses, getDatabaseReviews());
  saveBusinessesToDisk(memoryBusinesses);
  return memoryBusinesses;
}

function saveReviewsToDisk(reviews: Review[]) {
  memoryReviews = reviews;
  ensureDirectoryExists();
  try {
    fs.writeFileSync(REVIEWS_FILE, JSON.stringify(reviews, null, 2), "utf-8");
  } catch (e) {
    console.warn("Could not persist reviews to disk (serverless mode active).", e);
  }
}

function saveBusinessesToDisk(businesses: Business[]) {
  memoryBusinesses = businesses;
  ensureDirectoryExists();
  try {
    fs.writeFileSync(BUSINESSES_FILE, JSON.stringify(businesses, null, 2), "utf-8");
  } catch (e) {
    console.warn("Could not persist businesses to disk (serverless mode active).", e);
  }
}

function recalculateBusinessRatings(businesses: Business[], reviews: Review[]) {
  businesses.forEach((b) => {
    const approvedReviews = reviews.filter(
      (r) => r.business_id === b.id && r.status === "approved"
    );
    if (approvedReviews.length > 0) {
      const totalRating = approvedReviews.reduce((sum, r) => sum + r.overall_rating, 0);
      b.average_rating = Number((totalRating / approvedReviews.length).toFixed(1));
      b.total_reviews = approvedReviews.length;
    }
  });
}

export function createDatabaseReview(data: Partial<Review>): Review {
  const reviews = getDatabaseReviews();
  const businesses = getDatabaseBusinesses();

  const business = businesses.find((b) => b.id === Number(data.business_id));
  const newId = reviews.length > 0 ? Math.max(...reviews.map((r) => r.id)) + 1 : 1001;

  const now = new Date().toISOString();
  const isAdmin = data.review_source === "admin";

  const newReview: Review = {
    id: newId,
    business_id: Number(data.business_id),
    business_name: business ? business.name : "Jaisalmer Luxury Hospitality",
    business_slug: business ? business.slug : "mr-desert",
    guest_name: data.guest_name || "Anonymous Guest",
    guest_email: data.guest_email || null,
    guest_photo_url: data.guest_photo_url || null,
    country: data.country || "India",
    city: data.city || null,
    visit_date: data.visit_date || now.split("T")[0],
    overall_rating: Number(data.overall_rating || 5),
    staff_rating: data.staff_rating ? Number(data.staff_rating) : 5,
    cleanliness_rating: data.cleanliness_rating ? Number(data.cleanliness_rating) : 5,
    food_rating: data.food_rating ? Number(data.food_rating) : 5,
    location_rating: data.location_rating ? Number(data.location_rating) : 5,
    experience_rating: data.experience_rating ? Number(data.experience_rating) : 5,
    value_for_money: data.value_for_money ? Number(data.value_for_money) : 5,
    title: data.title || "Unforgettable Jaisalmer Experience",
    content: data.content || "",
    is_recommended: data.is_recommended !== undefined ? Boolean(data.is_recommended) : true,
    is_verified: data.is_verified !== undefined ? Boolean(data.is_verified) : true,
    is_featured: data.is_featured !== undefined ? Boolean(data.is_featured) : isAdmin,
    is_published: data.is_published !== undefined ? Boolean(data.is_published) : isAdmin,
    is_pinned: false,
    status: data.status || (isAdmin ? "approved" : "pending"),
    review_source: data.review_source || "website",
    helpful_count: 0,
    media: data.media || [],
    reply: null,
    created_at: now,
    updated_at: now,
  };

  reviews.unshift(newReview);
  recalculateBusinessRatings(businesses, reviews);
  saveReviewsToDisk(reviews);
  saveBusinessesToDisk(businesses);

  return newReview;
}

export function updateReviewStatus(
  id: number,
  status: "approved" | "rejected" | "pending",
  isPublished?: boolean
): Review | null {
  const reviews = getDatabaseReviews();
  const businesses = getDatabaseBusinesses();

  const review = reviews.find((r) => r.id === id);
  if (!review) return null;

  review.status = status;
  if (isPublished !== undefined) {
    review.is_published = isPublished;
  } else if (status === "approved") {
    review.is_published = true;
  } else if (status === "rejected") {
    review.is_published = false;
  }
  review.updated_at = new Date().toISOString();

  recalculateBusinessRatings(businesses, reviews);
  saveReviewsToDisk(reviews);
  saveBusinessesToDisk(businesses);

  return review;
}

export function toggleReviewFlag(
  id: number,
  field: "is_featured" | "is_verified" | "is_pinned"
): Review | null {
  const reviews = getDatabaseReviews();
  const review = reviews.find((r) => r.id === id);
  if (!review) return null;

  review[field] = !review[field];
  review.updated_at = new Date().toISOString();

  saveReviewsToDisk(reviews);
  return review;
}

export function updateDatabaseReview(id: number, updateData: Partial<Review>): Review | null {
  const reviews = getDatabaseReviews();
  const businesses = getDatabaseBusinesses();

  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return null;

  const current = reviews[index];
  const updated: Review = {
    ...current,
    ...updateData,
    id: current.id,
    updated_at: new Date().toISOString(),
  };

  reviews[index] = updated;
  recalculateBusinessRatings(businesses, reviews);
  saveReviewsToDisk(reviews);
  saveBusinessesToDisk(businesses);

  return updated;
}

export function deleteDatabaseReview(id: number): boolean {
  const reviews = getDatabaseReviews();
  const businesses = getDatabaseBusinesses();

  const index = reviews.findIndex((r) => r.id === id);
  if (index === -1) return false;

  reviews.splice(index, 1);
  recalculateBusinessRatings(businesses, reviews);
  saveReviewsToDisk(reviews);
  saveBusinessesToDisk(businesses);

  return true;
}
