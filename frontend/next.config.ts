import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep local development artifacts separate from production builds.
  distDir: process.env.NODE_ENV === "development" ? ".next-local" : ".next",
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
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
