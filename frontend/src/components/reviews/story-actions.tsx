"use client";

import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function StoryActions({ title }: { title: string }) {
  const share = async () => { const url = window.location.href; if (navigator.share) await navigator.share({ title, url }); else { await navigator.clipboard?.writeText(url); alert("Story link copied"); } };
  return <Button variant="gold" onClick={share}><Share2 className="mr-2 h-4 w-4" /> Share story</Button>;
}
