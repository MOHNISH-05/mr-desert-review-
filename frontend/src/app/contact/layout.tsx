import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";

const baseUrl = "https://mr-desert-review.vercel.app";

export const metadata: Metadata = {
  title: "Contact Us | Mr. Desert Jaisalmer Travel Desk",
  description:
    "Get in touch with Mr. Desert Jaisalmer for luxury desert camp bookings, hotel stays, camel safaris, and custom Rajasthan tour packages.",
  keywords: [
    "Contact Mr. Desert Jaisalmer",
    "Jaisalmer desert camp booking",
    "Elite Castle contact phone",
    "Happy Adventure Camp booking",
  ],
  alternates: {
    canonical: `${baseUrl}/contact`,
  },
  openGraph: {
    title: "Contact Us | Mr. Desert Jaisalmer Travel Desk",
    description:
      "Get in touch with Mr. Desert Jaisalmer for luxury desert camp bookings, hotel stays, camel safaris, and custom tours.",
    url: `${baseUrl}/contact`,
    siteName: "Mr. Desert Jaisalmer Reviews",
    images: [
      {
        url: "/images/official/elite-castle-story.webp",
        width: 1200,
        height: 630,
        alt: "Contact Mr. Desert Jaisalmer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Mr. Desert Jaisalmer Travel Desk",
    description:
      "Get in touch with Mr. Desert Jaisalmer for luxury desert camp bookings and hotel stays.",
    images: ["/images/official/elite-castle-story.webp"],
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
      name: "Contact Us",
      item: `${baseUrl}/contact`,
    },
  ],
};

const contactPageSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact Mr. Desert Jaisalmer",
  description: "Contact details, telephone, email, and inquiry form for Mr. Desert Jaisalmer.",
  url: `${baseUrl}/contact`,
  mainEntity: {
    "@type": "TravelAgency",
    name: "Mr. Desert Jaisalmer",
    telephone: "+91-8854808196",
    email: "mrdesertjaisalmer@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Sam Sand Dunes",
      addressLocality: "Jaisalmer",
      addressRegion: "Rajasthan",
      postalCode: "345001",
      addressCountry: "IN",
    },
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={[breadcrumbSchema, contactPageSchema]} />
      {children}
    </>
  );
}
