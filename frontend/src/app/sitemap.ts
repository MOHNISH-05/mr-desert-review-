import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mr-desert-review.vercel.app";
  const lastModified = new Date();

  // Core Pages
  const routes = [
    "",
    "/all-reviews",
    "/blogs",
    "/guides",
    "/gallery",
    "/about",
    "/contact",
    "/write-review",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified,
    changeFrequency: "daily" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Businesses
  const businessSlugs = [
    "mr-desert",
    "elite-castle",
    "happy-adventure",
    "tour-planner",
  ];

  const businessRoutes = businessSlugs.map((slug) => ({
    url: `${baseUrl}/business/${slug}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Reviews
  const reviewIds = [101, 102, 103, 104, 105];
  const reviewRoutes = reviewIds.map((id) => ({
    url: `${baseUrl}/reviews/${id}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // Blogs
  const blogSlugs = [
    "best-time-to-visit-jaisalmer",
    "first-timers-guide-desert-camp",
    "jaisalmer-fort-living-heritage",
    "camel-safari-or-jeep-safari",
  ];

  const blogRoutes = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blogs/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Guides
  const guideSlugs = [
    "jaisalmer-fort-guide",
    "sam-sand-dunes-guide",
    "gadisar-lake-guide",
    "camel-safari-guide",
  ];

  const guideRoutes = guideSlugs.map((slug) => ({
    url: `${baseUrl}/guides/${slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    ...routes,
    ...businessRoutes,
    ...reviewRoutes,
    ...blogRoutes,
    ...guideRoutes,
  ];
}
