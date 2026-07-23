"use client";

import { useState, useEffect, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Stars } from "@/components/ui/stars";
import {
  CheckCircle, XCircle, Star, Trash2, Search, ChevronLeft, ChevronRight,
  ArrowUpDown, Download, Pencil, Save, X,
} from "lucide-react";
import { FALLBACK_REVIEWS } from "@/lib/fallback-data";
import type { Review } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function AdminReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editing, setEditing] = useState<Review | null>(null);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const fetchReviews = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    const params = new URLSearchParams({ page: String(page), page_size: "20" });
    if (statusFilter) params.append("status", statusFilter);

    try {
      const res = await fetch(`${API_BASE}/api/reviews/admin?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      if (data.reviews && data.reviews.length) {
        setReviews(data.reviews);
        setTotal(data.total);
        setTotalPages(data.total_pages);
      } else {
        let filtered = FALLBACK_REVIEWS;
        if (statusFilter) {
          filtered = filtered.filter((r) => r.status === statusFilter);
        }
        setReviews(filtered);
        setTotal(filtered.length);
        setTotalPages(1);
      }
    } catch {
      let filtered = FALLBACK_REVIEWS;
      if (statusFilter) {
        filtered = filtered.filter((r) => r.status === statusFilter);
      }
      setReviews(filtered);
      setTotal(filtered.length);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [page, statusFilter]);

  const handleAction = async (id: number, action: string) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${API_BASE}/api/reviews/${id}/${action}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReviews();
    } catch {
      setReviews((prev) =>
        prev.map((r) => {
          if (r.id === id) {
            if (action === "approve") return { ...r, status: "approved" };
            if (action === "reject") return { ...r, status: "rejected" };
            if (action === "feature") return { ...r, is_featured: !r.is_featured };
            if (action === "verify") return { ...r, is_verified: !r.is_verified };
          }
          return r;
        })
      );
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    const token = localStorage.getItem("token");
    try {
      await fetch(`${API_BASE}/api/reviews/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchReviews();
    } catch {
      setReviews((prev) => prev.filter((r) => r.id !== id));
      setTotal((t) => Math.max(0, t - 1));
    }
  };

  const saveEdit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editing) return;
    setSaving(true);
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API_BASE}/api/reviews/${editing.id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          business_id: editing.business_id,
          guest_name: values.guest_name,
          guest_email: editing.guest_email,
          overall_rating: Number(values.overall_rating),
          title: values.title,
          content: values.content,
          is_recommended: true,
          review_source: editing.review_source,
        }),
      });
      if (!res.ok) throw new Error("Could not save review");
      setEditing(null);
      fetchReviews();
    } catch {
      setReviews((prev) =>
        prev.map((r) =>
          r.id === editing.id
            ? {
                ...r,
                guest_name: String(values.guest_name),
                overall_rating: Number(values.overall_rating),
                title: String(values.title),
                content: String(values.content),
              }
            : r
        )
      );
      setEditing(null);
    } finally {
      setSaving(false);
    }
  };

  const filtered = search
    ? reviews.filter(
        (r) =>
          r.guest_name.toLowerCase().includes(search.toLowerCase()) ||
          r.content.toLowerCase().includes(search.toLowerCase())
      )
    : reviews;

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-serif font-bold">Review Management</h1>
          <div className="flex items-center gap-3">
            <Button variant="gold" size="sm" onClick={() => router.push("/admin/reviews/new")}>Add Review</Button>
            <Button variant="outline" size="sm" onClick={() => router.push("/admin")}>
              Dashboard
            </Button>
            <span className="text-sm text-muted-foreground">{total} total</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border bg-white text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-4 py-2 rounded-lg border bg-white text-sm"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="h-24 skeleton rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((review) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-4 border hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">{review.guest_name}</span>
                      <Stars rating={review.overall_rating} size="sm" />
                      {review.business_name && (
                        <Badge variant="secondary" className="text-xs">{review.business_name}</Badge>
                      )}
                      <Badge variant={
                        review.status === "approved" ? "success" :
                        review.status === "pending" ? "warning" : "destructive"
                      } className="text-xs">
                        {review.status}
                      </Badge>
                      {review.is_featured && <Badge variant="info" className="text-xs">Featured</Badge>}
                      {review.is_verified && <Badge variant="success" className="text-xs">Verified</Badge>}
                    </div>
                    {review.title && <p className="text-sm font-medium mb-1">{review.title}</p>}
                    <p className="text-sm text-muted-foreground line-clamp-2">{review.content}</p>
                    {review.media?.length > 0 && <div className="flex gap-2 mt-3">{review.media.slice(0, 5).map((media) => <img key={media.id} src={media.url.startsWith("/uploads/") ? `${API_BASE}${media.url}` : media.url} alt="Guest upload" className="h-14 w-14 rounded-lg object-cover border" />)}</div>}
                    <p className="text-xs text-muted-foreground mt-1">
                      {review.country && `${review.country} · `}
                      {review.created_at && new Date(review.created_at).toLocaleDateString()}
                      {review.review_source !== "website" && ` · Source: ${review.review_source}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 ml-4 shrink-0">
                    {review.status !== "approved" && (
                      <button onClick={() => handleAction(review.id, "approve")}
                        className="p-2 rounded-lg hover:bg-green-50 text-green-600 transition-colors"
                        title="Approve">
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    )}
                    {review.status !== "rejected" && (
                      <button onClick={() => handleAction(review.id, "reject")}
                        className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                        title="Reject">
                        <XCircle className="h-4 w-4" />
                      </button>
                    )}
                    <button onClick={() => handleAction(review.id, "feature")}
                      className={`p-2 rounded-lg transition-colors ${review.is_featured ? "text-yellow-500 hover:bg-yellow-50" : "text-muted-foreground hover:bg-yellow-50"}`}
                      title="Toggle Featured">
                      <Star className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleAction(review.id, "verify")}
                      className={`p-2 rounded-lg transition-colors ${review.is_verified ? "text-blue-500 hover:bg-blue-50" : "text-muted-foreground hover:bg-blue-50"}`}
                      title="Toggle Verified">
                      <CheckCircle className="h-4 w-4" />
                    </button>
                    <button onClick={() => setEditing(review)}
                      className="p-2 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors"
                      title="Edit review">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button onClick={() => handleDelete(review.id)}
                      className="p-2 rounded-lg hover:bg-red-50 text-red-600 transition-colors"
                      title="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {editing && <div className="fixed inset-0 z-50 bg-black/40 p-4 flex items-center justify-center" onMouseDown={(event) => { if (event.target === event.currentTarget) setEditing(null); }}>
          <form onSubmit={saveEdit} className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-widest text-desert-600">Editorial review</p><h2 className="text-xl font-serif font-bold">Verify and edit story</h2></div><button type="button" onClick={() => setEditing(null)} className="p-2 rounded-lg hover:bg-gray-100"><X className="h-5 w-5" /></button></div>
            <p className="text-sm text-muted-foreground">Make factual or clarity edits here, then verify or approve the review from the list.</p>
            <label className="block text-sm font-medium">Guest name<input name="guest_name" defaultValue={editing.guest_name} required className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
            <label className="block text-sm font-medium">Rating<select name="overall_rating" defaultValue={String(editing.overall_rating)} className="mt-1 w-full rounded-lg border px-3 py-2 bg-white"><option value="5">5 - Excellent</option><option value="4">4 - Very good</option><option value="3">3 - Good</option><option value="2">2 - Needs improvement</option><option value="1">1 - Poor</option></select></label>
            <label className="block text-sm font-medium">Story title<input name="title" defaultValue={editing.title || ""} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
            <label className="block text-sm font-medium">Story content<textarea name="content" defaultValue={editing.content} required minLength={10} rows={9} className="mt-1 w-full rounded-lg border px-3 py-2" /></label>
            <Button type="submit" variant="gold" disabled={saving}><Save className="h-4 w-4 mr-2" />{saving ? "Saving..." : "Save editorial changes"}</Button>
          </form>
        </div>}

        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}
              className="p-2 rounded-lg border hover:bg-desert-50 disabled:opacity-50">
              <ChevronLeft className="h-4 w-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).slice(Math.max(0, page - 3), Math.min(totalPages, page + 2)).map((p) => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-10 h-10 rounded-lg text-sm font-medium ${p === page ? "bg-desert-500 text-white" : "border hover:bg-desert-50"}`}>
                {p}
              </button>
            ))}
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages}
              className="p-2 rounded-lg border hover:bg-desert-50 disabled:opacity-50">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
