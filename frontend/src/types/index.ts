export interface Business {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  logo_url: string | null;
  hero_image_url: string | null;
  website_url: string;
  booking_url: string | null;
  contact_phone: string | null;
  contact_email: string | null;
  whatsapp_number: string | null;
  address: string | null;
  google_maps_url: string | null;
  google_maps_embed: string | null;
  average_rating: number;
  total_reviews: number;
  is_active: boolean;
  order: number;
  created_at: string | null;
  updated_at: string | null;
}

export interface ReviewMedia {
  id: number;
  media_type: string;
  url: string;
  public_id: string | null;
  width: number | null;
  height: number | null;
}

export interface ReviewReply {
  id: number;
  content: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface Review {
  id: number;
  business_id: number;
  business_name: string | null;
  business_slug: string | null;
  guest_name: string;
  guest_email: string | null;
  guest_photo_url: string | null;
  country: string | null;
  city: string | null;
  visit_date: string | null;
  overall_rating: number;
  staff_rating: number | null;
  cleanliness_rating: number | null;
  food_rating: number | null;
  location_rating: number | null;
  experience_rating: number | null;
  value_for_money: number | null;
  title: string | null;
  content: string;
  is_recommended: boolean;
  is_verified: boolean;
  is_featured: boolean;
  is_published: boolean;
  is_pinned: boolean;
  status: string;
  review_source: string;
  helpful_count: number;
  media: ReviewMedia[];
  reply: ReviewReply | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  page_size: number;
  total_pages: number;
  reviews: T[];
}

export interface BusinessListResponse {
  businesses: Business[];
  total: number;
}

export interface GalleryItem {
  id: number;
  review_id: number;
  business_id: number | null;
  business_name: string | null;
  guest_name: string | null;
  media_type: string;
  url: string;
  width: number | null;
  height: number | null;
  created_at: string | null;
}

export interface DashboardStats {
  total_reviews: number;
  published_reviews: number;
  pending_reviews: number;
  featured_reviews: number;
  average_rating: number;
  total_businesses: number;
  monthly_reviews: { month: string; count: number }[];
  business_comparison: { name: string; count: number; avg_rating: number }[];
  rating_distribution: Record<string, number>;
  country_distribution: { country: string; count: number }[];
  recent_activity: { id: number; guest_name: string; action: string; status: string; created_at: string | null }[];
}

export interface ContentItem {
  id: number;
  business_id?: number | null;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  hero_image_url: string | null;
  author: string | null;
  reading_time: number | null;
  category: string | null;
  tags: string | null;
  map_url: string | null;
  seo_title: string | null;
  meta_description: string | null;
  status: string;
  published_at: string | null;
}
