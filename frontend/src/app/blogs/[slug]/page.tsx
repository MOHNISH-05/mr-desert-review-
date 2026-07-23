import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try { const { slug } = await params; const blog = await api.content.blog(slug); return { title: blog.seo_title || blog.title, description: blog.meta_description || blog.excerpt || undefined }; } catch { return {}; }
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  let blog;
  try { const { slug } = await params; blog = await api.content.blog(slug); } catch { notFound(); }
  return <article className="pt-28 pb-20"><div className="container max-w-4xl"><p className="eyebrow">{blog.category || "Travel journal"}</p><h1 className="text-4xl md:text-6xl font-serif font-bold mt-3 mb-5">{blog.title}</h1><p className="text-xl text-muted-foreground mb-8">{blog.excerpt}</p><div className="h-72 md:h-[28rem] rounded-3xl overflow-hidden bg-gradient-to-br from-desert-700 via-desert-500 to-amber-200 mb-10">{blog.hero_image_url && <img src={blog.hero_image_url} alt="" className="w-full h-full object-cover" />}</div><div className="flex gap-4 text-sm text-muted-foreground mb-8"><span>By {blog.author || "Mr. Desert Editorial"}</span><span>·</span><span>{blog.reading_time || 5} min read</span></div><div className="prose prose-lg max-w-none whitespace-pre-line">{blog.content}</div></div></article>;
}
