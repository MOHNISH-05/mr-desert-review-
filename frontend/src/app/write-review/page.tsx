"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Business } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

export default function WriteReviewPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState("");
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/businesses`).then((res) => res.json()).then((data) => { const list = data.businesses || []; setBusinesses(list); const slug = new URLSearchParams(window.location.search).get("business"); const match = list.find((business: Business) => business.slug === slug); if (match) setSelectedBusiness(String(match.id)); }).catch(() => setError("Unable to load businesses right now."));
  }, []);

  async function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const res = await fetch(`${API_BASE}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, business_id: Number(values.business_id), overall_rating: Number(values.overall_rating), is_recommended: true, review_source: "website" }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.detail || "We could not submit your review.");
      }
      const created = await res.json();
      if (photos.length) {
        const media = new FormData();
        photos.forEach((photo) => media.append("files", photo));
        const mediaRes = await fetch(`${API_BASE}/api/reviews/${created.id}/media`, { method: "POST", body: media });
        if (!mediaRes.ok) throw new Error("Review submitted, but the photos could not be uploaded.");
      }
      setSubmitted(true);
      setPhotos([]);
      event.currentTarget.reset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "We could not submit your review.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return <div className="pt-32 pb-24 min-h-screen"><div className="container max-w-2xl text-center"><p className="eyebrow">Thank you for sharing</p><h1 className="text-4xl md:text-5xl font-serif font-bold mb-5">Your story is with our team</h1><p className="text-lg text-muted-foreground mb-8">An admin will verify and, where needed, edit your review before publishing it. Only approved stories appear on this website.</p><div className="flex justify-center gap-3"><Link href="/all-reviews"><Button variant="gold">Read guest stories</Button></Link><Button variant="outline" onClick={() => setSubmitted(false)}>Submit another</Button></div></div></div>;
  }

  return <div className="pt-28 pb-20 min-h-screen bg-stone-50"><div className="container max-w-2xl"><div className="text-center mb-10"><p className="eyebrow">Share your experience</p><h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Tell us about your Jaisalmer story</h1><p className="text-muted-foreground">Your review will be checked by the Mr. Desert team before it is published as a guest story.</p></div><form onSubmit={submitReview} className="bg-white rounded-2xl border p-6 md:p-8 shadow-sm space-y-5">{error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}<label className="block text-sm font-medium">Business<select name="business_id" required value={selectedBusiness} onChange={(event) => setSelectedBusiness(event.target.value)} className="mt-2 w-full rounded-lg border px-3 py-3 bg-white"><option value="">Select a business</option>{businesses.map((business) => <option key={business.id} value={business.id}>{business.name}</option>)}</select></label><div className="grid md:grid-cols-2 gap-4"><label className="block text-sm font-medium">Your name<input name="guest_name" required minLength={2} className="mt-2 w-full rounded-lg border px-3 py-3" /></label><label className="block text-sm font-medium">Email (optional)<input name="guest_email" type="email" className="mt-2 w-full rounded-lg border px-3 py-3" /></label></div><div className="grid md:grid-cols-2 gap-4"><label className="block text-sm font-medium">City / country<input name="country" className="mt-2 w-full rounded-lg border px-3 py-3" placeholder="e.g. Delhi, India" /></label><label className="block text-sm font-medium">Rating<select name="overall_rating" required defaultValue="5" className="mt-2 w-full rounded-lg border px-3 py-3 bg-white"><option value="5">★★★★★ Excellent</option><option value="4">★★★★ Very good</option><option value="3">★★★ Good</option><option value="2">★★ Needs improvement</option><option value="1">★ Poor</option></select></label></div><label className="block text-sm font-medium">Story title<input name="title" className="mt-2 w-full rounded-lg border px-3 py-3" placeholder="A memorable desert evening" /></label><label className="block text-sm font-medium">Your review<textarea name="content" required minLength={10} rows={7} className="mt-2 w-full rounded-lg border px-3 py-3" placeholder="Tell future travelers what made your experience special..." /></label><label className="block text-sm font-medium">Photos (optional)<input type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple onChange={(event) => setPhotos(Array.from(event.target.files || []).slice(0, 5))} className="mt-2 block w-full rounded-lg border px-3 py-3 text-sm" /><span className="mt-1 block text-xs text-muted-foreground">Add up to 5 JPG, PNG or WEBP images. Maximum 10 MB each.</span></label><Button type="submit" variant="gold" size="lg" className="w-full" disabled={loading}>{loading ? "Submitting..." : "Submit for review"}</Button><p className="text-xs text-center text-muted-foreground">By submitting, you agree that the editorial team may correct formatting or edit the story for clarity before publication.</p></form></div></div>;
}
