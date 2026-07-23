import Link from "next/link";
import { api } from "@/lib/api";
import { BlogCard } from "@/components/ui/blog-card";
import type { ContentItem } from "@/types";

export const metadata = {
  title: "Travel Journal",
  description: "Thoughtful travel stories, practical advice and local perspective for discovering Jaisalmer and Rajasthan.",
};

export default async function BlogsPage() {
  let blogs: ContentItem[] = [];
  try {
    blogs = await api.content.blogs({ page_size: 24 });
  } catch {}

  return (
    <div className="pt-28 pb-24 min-h-screen bg-background">
      {/* Header */}
      <div className="relative mb-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('/images/dheeraj/mr-desert-alley.webp')" }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/85 to-background" aria-hidden="true" />
        <div className="container relative max-w-3xl py-12">
          <p className="eyebrow">The Desert Journal</p>
          <h1 className="section-heading mb-5">
            Stories from the{" "}
            <span className="text-gradient-gold italic">Golden City</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Thoughtful travel stories, practical advice and local perspective for discovering Jaisalmer.
          </p>
        </div>
      </div>

      <div className="container">
        {blogs.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {blogs.map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-desert-200 p-16 text-center">
            <p className="text-muted-foreground text-lg">
              Our editorial team is preparing the first travel stories.
            </p>
            <Link href="/all-reviews" className="inline-block mt-4 text-desert-600 hover:underline font-medium">
              Explore guest stories instead →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
