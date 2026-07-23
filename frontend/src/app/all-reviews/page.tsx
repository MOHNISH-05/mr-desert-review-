"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { api } from "@/lib/api";
import { PremiumReviewCard } from "@/components/reviews/premium-review-card";
import type { Review } from "@/types";

export default function AllReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterBusiness, setFilterBusiness] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [businesses, setBusinesses] = useState<{ id: number; name: string; slug: string }[]>([]);

  useEffect(() => { api.businesses.list().then((res) => setBusinesses(res.businesses.map((b) => ({ id: b.id, name: b.name, slug: b.slug })))).catch(() => {}); }, []);
  useEffect(() => { setLoading(true); const params: Record<string, string | number | boolean> = { page, page_size: 12, status: "approved" }; if (filterBusiness) params.business_id = Number(filterBusiness); if (filterRating) params.rating = Number(filterRating); api.reviews.list(params).then((res) => { setReviews(res.reviews); setTotal(res.total); setTotalPages(res.total_pages); }).catch(() => {}).finally(() => setLoading(false)); }, [page, filterBusiness, filterRating]);

  const filtered = search ? reviews.filter((review) => `${review.guest_name} ${review.content} ${review.title || ""}`.toLowerCase().includes(search.toLowerCase())) : reviews;
  return <div className="min-h-screen bg-[#f7f3ed] pb-20 pt-28"><div className="container"><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="mb-10 max-w-2xl"><p className="text-[11px] uppercase tracking-[.32em] text-desert-700 mb-4">The Mr. Desert journal</p><h1 className="text-4xl md:text-6xl font-serif font-medium leading-tight">Guest stories from<br /><span className="italic text-desert-600">the Golden City.</span></h1><p className="mt-5 text-muted-foreground">Beautiful stays, desert nights and journeys remembered by the people who lived them.</p></motion.div><div className="mb-10 flex flex-wrap gap-3"><div className="relative min-w-[220px] flex-1 max-w-sm"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><input type="text" placeholder="Search stories..." value={search} onChange={(event) => setSearch(event.target.value)} className="w-full rounded-full border border-desert-200 bg-white py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-desert-500" /></div><select value={filterBusiness} onChange={(event) => { setFilterBusiness(event.target.value); setPage(1); }} className="rounded-full border border-desert-200 bg-white px-4 py-2.5 text-sm"><option value="">All Businesses</option>{businesses.map((business) => <option key={business.id} value={business.id}>{business.name}</option>)}</select><select value={filterRating} onChange={(event) => { setFilterRating(event.target.value); setPage(1); }} className="rounded-full border border-desert-200 bg-white px-4 py-2.5 text-sm"><option value="">All Ratings</option>{[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} stars</option>)}</select></div>{loading ? <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">{Array.from({ length: 6 }, (_, index) => <div key={index} className="h-[520px] animate-pulse rounded-2xl bg-white/70" />)}</div> : filtered.length ? <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">{filtered.map((review, index) => <PremiumReviewCard key={review.id} review={review} index={index} />)}</div> : <div className="rounded-2xl bg-white p-16 text-center"><h2 className="text-2xl font-serif">No stories found</h2><p className="mt-2 text-muted-foreground">Try another search or filter.</p></div>}{totalPages > 1 && <div className="mt-12 flex items-center justify-center gap-2"><button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="rounded-full border border-desert-200 p-2 disabled:opacity-40"><ChevronLeft className="h-4 w-4" /></button><span className="px-4 text-sm text-muted-foreground">Page {page} of {totalPages} · {total} stories</span><button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="rounded-full border border-desert-200 p-2 disabled:opacity-40"><ChevronRight className="h-4 w-4" /></button></div>}</div></div>;
}
