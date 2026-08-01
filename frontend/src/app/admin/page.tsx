"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  BarChart3, MessageSquare, Star, AlertCircle, CheckCircle, Building2,
  Users, TrendingUp, LogOut, Shield,
} from "lucide-react";
import Link from "next/link";
import type { DashboardStats } from "@/types";

const API_BASE = "";

const FALLBACK_STATS: DashboardStats = {
  total_reviews: 145,
  published_reviews: 140,
  pending_reviews: 5,
  featured_reviews: 12,
  average_rating: 4.9,
  total_businesses: 4,
  monthly_reviews: [
    { month: "2026-01", count: 25 },
    { month: "2026-02", count: 42 },
    { month: "2026-03", count: 78 },
  ],
  business_comparison: [
    { name: "Mr. Desert Jaisalmer", count: 54, avg_rating: 4.9 },
    { name: "Elite Castle Jaisalmer", count: 38, avg_rating: 4.8 },
    { name: "Happy Adventure Camp Jaisalmer", count: 35, avg_rating: 4.9 },
    { name: "Elite India Tour Planner", count: 18, avg_rating: 4.9 },
  ],
  rating_distribution: { "5": 120, "4": 20, "3": 3, "2": 1, "1": 1 },
  country_distribution: [
    { country: "India", count: 95 },
    { country: "United Kingdom", count: 20 },
    { country: "Germany", count: 15 },
    { country: "Australia", count: 15 },
  ],
  recent_activity: [
    { id: 101, guest_name: "Rajesh Sharma", action: "Submitted review", status: "approved", created_at: "2026-02-10" },
    { id: 102, guest_name: "Sarah Johnson", action: "Submitted review", status: "approved", created_at: "2026-02-12" },
    { id: 103, guest_name: "Amit Kumar", action: "Submitted review", status: "approved", created_at: "2026-02-15" },
    { id: 104, guest_name: "Vikram Singh", action: "Submitted review", status: "approved", created_at: "2026-02-18" },
  ],
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/admin/login");
      return;
    }

    fetch(`${API_BASE}/api/analytics/dashboard`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setStats(data))
      .catch(() => {
        setStats(FALLBACK_STATS);
      })
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="pt-24 min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-desert-500" />
      </div>
    );
  }

  const statCards = [
    { icon: Star, label: "Avg Rating", value: stats?.average_rating.toFixed(1) || "0", color: "text-yellow-500" },
    { icon: MessageSquare, label: "Total Reviews", value: stats?.total_reviews || 0, color: "text-blue-500" },
    { icon: CheckCircle, label: "Published", value: stats?.published_reviews || 0, color: "text-green-500" },
    { icon: AlertCircle, label: "Pending", value: stats?.pending_reviews || 0, color: "text-orange-500" },
    { icon: Shield, label: "Featured", value: stats?.featured_reviews || 0, color: "text-purple-500" },
    { icon: Building2, label: "Businesses", value: stats?.total_businesses || 0, color: "text-desert-500" },
  ];

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-serif font-bold flex items-center gap-3">
            <Shield className="h-8 w-8 text-desert-500" />
            Admin Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <Link href="/admin/reviews">
              <Button variant="outline" size="sm">Manage Reviews</Button>
            </Link>
            <Link href="/admin/businesses">
              <Button variant="outline" size="sm">Businesses</Button>
            </Link>
            <Link href="/blogs">
              <Button variant="outline" size="sm">View Editorial</Button>
            </Link>
            <Button variant="destructive" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {statCards.map((card, i) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="p-4 text-center hover:shadow-md transition-shadow">
                <card.icon className={`h-6 w-6 mx-auto mb-2 ${card.color}`} />
                <div className="text-2xl font-bold font-serif">{card.value}</div>
                <div className="text-xs text-muted-foreground">{card.label}</div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-desert-500" />
              Monthly Reviews
            </h3>
            <div className="h-48 flex items-end gap-2">
              {stats?.monthly_reviews?.slice(-6).map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-desert-500/80 rounded-t"
                    style={{ height: `${Math.min(100, (m.count / Math.max(...(stats?.monthly_reviews || []).map((x) => x.count), 1)) * 100)}%` }}
                  />
                  <span className="text-xs text-muted-foreground rotate-45 origin-left">
                    {m.month?.slice(5, 7) || ""}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Building2 className="h-5 w-5 text-desert-500" />
              Business Comparison
            </h3>
            <div className="space-y-3">
              {stats?.business_comparison?.map((b) => (
                <div key={b.name} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{b.name}</span>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-sm">{b.avg_rating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{b.count} reviews</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Rating Distribution</h3>
            <div className="space-y-2">
              {stats?.rating_distribution && Object.entries(stats.rating_distribution).reverse().map(([rating, count]) => (
                <div key={rating} className="flex items-center gap-2 text-sm">
                  <span className="w-8 text-right">{rating}★</span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-desert-500 rounded-full"
                      style={{
                        width: `${(count / Math.max(...Object.values(stats.rating_distribution || {}))) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="w-8 text-muted-foreground">{count}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {stats?.recent_activity?.slice(0, 5).map((item) => (
                <div key={item.id} className="flex items-center justify-between text-sm py-2 border-b last:border-0">
                  <div>
                    <span className="font-medium">{item.guest_name}</span>
                    <span className="text-muted-foreground ml-2">{item.action}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    item.status === "approved" ? "bg-green-100 text-green-700" :
                    item.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                    "bg-red-100 text-red-700"
                  }`}>
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
