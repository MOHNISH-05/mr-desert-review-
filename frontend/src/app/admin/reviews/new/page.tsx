"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import type { Business } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function NewAdminReviewPage() {
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/admin/login"); return; }
    fetch(`${API_BASE}/api/businesses`, { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => { if (!res.ok) throw new Error("Unauthorized"); return res.json(); })
      .then((data) => setBusinesses(data.businesses || []))
      .catch(() => router.push("/admin/login"));
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true); setError("");
    const token = localStorage.getItem("token");
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const response = await fetch(`${API_BASE}/api/reviews`, { method: "POST", headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }, body: JSON.stringify({ ...values, business_id: Number(values.business_id), overall_rating: Number(values.overall_rating), is_recommended: true, review_source: "admin" }) });
      if (!response.ok) throw new Error("Could not create review");
      const review = await response.json();
      if (!photos.length) throw new Error("Add at least one featured hero image before saving.");
      if (photos.length) {
        const media = new FormData(); photos.forEach((photo) => media.append("files", photo));
        const upload = await fetch(`${API_BASE}/api/reviews/${review.id}/media`, { method: "POST", body: media });
        if (!upload.ok) throw new Error("Review created, but image upload failed");
      }
      router.push("/admin/reviews");
    } catch (err) { setError(err instanceof Error ? err.message : "Could not create review"); } finally { setLoading(false); }
  }

  return <div className="pt-24 min-h-screen bg-gray-50"><div className="container max-w-2xl py-8"><div className="flex items-center justify-between mb-8"><div><p className="text-xs uppercase tracking-widest text-desert-600">Admin editorial desk</p><h1 className="text-3xl font-serif font-bold">Add a publicity review</h1></div><Button variant="outline" onClick={() => router.push("/admin/reviews")}>Back</Button></div><form onSubmit={submit} className="bg-white border rounded-2xl p-6 md:p-8 shadow-sm space-y-5">{error && <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}<p className="text-sm text-muted-foreground">New reviews start as pending. Add a hero image, save the story, then approve it from Review Management to publish it publicly.</p><label className="block text-sm font-medium">Business<select name="business_id" required className="mt-2 w-full rounded-lg border px-3 py-3 bg-white"><option value="">Select business</option>{businesses.map((business) => <option key={business.id} value={business.id}>{business.name}</option>)}</select></label><div className="grid md:grid-cols-2 gap-4"><label className="block text-sm font-medium">Guest name<input name="guest_name" required minLength={2} className="mt-2 w-full rounded-lg border px-3 py-3" /></label><label className="block text-sm font-medium">Guest email<input name="guest_email" type="email" className="mt-2 w-full rounded-lg border px-3 py-3" /></label></div><div className="grid md:grid-cols-2 gap-4"><label className="block text-sm font-medium">Country / city<input name="country" className="mt-2 w-full rounded-lg border px-3 py-3" /></label><label className="block text-sm font-medium">Rating<select name="overall_rating" defaultValue="5" className="mt-2 w-full rounded-lg border px-3 py-3 bg-white"><option value="5">5 - Excellent</option><option value="4">4 - Very good</option><option value="3">3 - Good</option><option value="2">2 - Needs improvement</option><option value="1">1 - Poor</option></select></label></div><label className="block text-sm font-medium">Story title<input name="title" required className="mt-2 w-full rounded-lg border px-3 py-3" placeholder="A royal stay in the Golden City" /></label><label className="block text-sm font-medium">Review story<textarea name="content" required minLength={10} rows={9} className="mt-2 w-full rounded-lg border px-3 py-3" placeholder="Write the guest experience..." /></label><label className="block text-sm font-medium">Featured hero image + gallery<input type="file" required multiple accept="image/jpeg,image/png,image/webp,image/avif" onChange={(event) => setPhotos(Array.from(event.target.files || []).slice(0, 20))} className="mt-2 block w-full rounded-lg border px-3 py-3 text-sm" /><span className="mt-1 block text-xs text-muted-foreground">First image becomes the hero cover. Add up to 20 images, 10 MB each.</span></label><Button type="submit" variant="gold" size="lg" className="w-full" disabled={loading}>{loading ? "Saving..." : "Save pending review"}</Button></form></div></div>;
}
