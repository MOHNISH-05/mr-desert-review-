import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep local development artifacts separate from production builds.
  distDir: process.env.NODE_ENV === "development" ? ".next-local" : ".next",
  trailingSlash: false,
  transpilePackages: ["lucide-react"],
  experimental: {
    optimizePackageImports: [],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "mrdesertjaisalmer.in" },
      { protocol: "https", hostname: "elitecastlejaisalmer.com" },
      { protocol: "https", hostname: "happyadventurecampjaisalmer.com" },
      { protocol: "https", hostname: "eliteindiatourplanner.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "X-Robots-Tag",
            value: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
