import type { Business, BusinessListResponse, Review, PaginatedResponse, GalleryItem, DashboardStats, ContentItem } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

async function fetchAPI<T>(path: string, options?: RequestInit): Promise<T> {
  const url = `${API_BASE}${path}`;
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...options?.headers },
    cache: "no-store",
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ detail: "Request failed" }));
    throw new Error(error.detail || `HTTP ${res.status}`);
  }
  return res.json();
}

export const api = {
  businesses: {
    list: () => fetchAPI<BusinessListResponse>("/api/businesses"),
    get: (id: number) => fetchAPI<Business>(`/api/businesses/${id}`),
    getBySlug: (slug: string) => fetchAPI<Business>(`/api/businesses/slug/${slug}`),
  },
  reviews: {
    list: (params?: Record<string, string | number | boolean>) => {
      const qs = params ? "?" + new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ).toString() : "";
      return fetchAPI<PaginatedResponse<Review>>(`/api/reviews${qs}`);
    },
    get: (id: number) => fetchAPI<Review>(`/api/reviews/${id}`),
    create: (data: Record<string, unknown>) =>
      fetchAPI<Review>("/api/reviews", {
        method: "POST",
        body: JSON.stringify(data),
      }),
    helpful: (id: number) =>
      fetchAPI<{ helpful_count: number }>(`/api/reviews/${id}/helpful`, { method: "POST" }),
  },
  gallery: {
    list: (params?: Record<string, string | number>) => {
      const qs = params ? "?" + new URLSearchParams(
        Object.entries(params).map(([k, v]) => [k, String(v)])
      ).toString() : "";
      return fetchAPI<{ items: GalleryItem[]; total: number }>(`/api/gallery${qs}`);
    },
  },
  content: {
    blogs: (params?: Record<string, string | number>) => {
      const qs = params ? "?" + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
      return fetchAPI<ContentItem[]>(`/api/content/blogs${qs}`);
    },
    blog: (slug: string) => fetchAPI<ContentItem>(`/api/content/blogs/${slug}`),
    guides: (params?: Record<string, string | number>) => {
      const qs = params ? "?" + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString() : "";
      return fetchAPI<ContentItem[]>(`/api/content/guides${qs}`);
    },
    guide: (slug: string) => fetchAPI<ContentItem>(`/api/content/guides/${slug}`),
  },
  analytics: {
    dashboard: () =>
      fetchAPI<DashboardStats>("/api/analytics/dashboard", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }),
  },
};
