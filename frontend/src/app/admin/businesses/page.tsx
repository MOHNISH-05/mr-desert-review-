"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stars } from "@/components/ui/stars";
import { Building2, ExternalLink, Plus } from "lucide-react";
import type { Business } from "@/types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default function AdminBusinessesPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/admin/login"); return; }

    fetch(`${API_BASE}/api/businesses`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => setBusinesses(data.businesses || []))
      .catch(() => { localStorage.removeItem("token"); router.push("/admin/login"); })
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <div className="pt-24 min-h-screen bg-gray-50">
      <div className="container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-serif font-bold">Business Management</h1>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => router.push("/admin")}>Dashboard</Button>
            <Button variant="gold" size="sm"><Plus className="h-4 w-4 mr-2" />Add Business</Button>
          </div>
        </div>

        {loading ? (
          <div className="space-y-4">
            {Array.from({ length: 4 }, (_, i) => <div key={i} className="h-32 skeleton rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {businesses.map((business, i) => (
              <motion.div
                key={business.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-desert-400 to-desert-600 flex items-center justify-center text-3xl shrink-0">
                      🏢
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{business.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Stars rating={business.average_rating} size="sm" />
                        <span>{business.average_rating.toFixed(1)} ({business.total_reviews} reviews)</span>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {business.short_description || business.description}
                      </p>
                      <div className="flex items-center gap-2">
                        <a href={business.website_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm">
                            <ExternalLink className="h-3 w-3 mr-1" />Website
                          </Button>
                        </a>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
