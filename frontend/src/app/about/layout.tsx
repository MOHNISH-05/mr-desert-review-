import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";

const baseUrl = "https://mr-desert-review.vercel.app";

export const metadata: Metadata = {
  title: "About Us | Mr. Desert Jaisalmer Tourism Platform",
  description:
    "Learn about Mr. Desert Jaisalmer — premier hospitality brand by Dheeraj Purohit featuring luxury desert camps, heritage fort hotels, and tour packages.",
  keywords: [
    "About Mr. Desert Jaisalmer",
    "Dheeraj Purohit Jaisalmer",
    "Jaisalmer luxury hospitality",
    "Elite Castle Jaisalmer about",
    "Happy Adventure Camp story",
  ],
  alternates: {
    canonical: `${baseUrl}/about`,
  },
  openGraph: {
    title: "About Us | Mr. Desert Jaisalmer Tourism Platform",
    description:
      "Learn about Mr. Desert Jaisalmer — premier hospitality brand by Dheeraj Purohit featuring luxury desert camps and heritage hotels.",
    url: `${baseUrl}/about`,
    siteName: "Mr. Desert Jaisalmer Reviews",
    images: [
      {
        url: "/businesses/elite-india-tour-planner/dheeraj-purohit.webp",
        width: 1200,
        height: 630,
        alt: "Dheeraj Purohit - Founder of Mr. Desert Jaisalmer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Mr. Desert Jaisalmer Tourism Platform",
    description:
      "Learn about Mr. Desert Jaisalmer — premier hospitality brand by Dheeraj Purohit.",
    images: ["/businesses/elite-india-tour-planner/dheeraj-purohit.webp"],
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
      name: "About Us",
      item: `${baseUrl}/about`,
    },
  ],
};

const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "About Mr. Desert Jaisalmer",
  description:
    "Official tourism content hub for Jaisalmer featuring hotels, desert camps, and tours curated by Dheeraj Purohit.",
  url: `${baseUrl}/about`,
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[breadcrumbSchema, aboutPageSchema]} />
      {children}
    </>
  );
}
