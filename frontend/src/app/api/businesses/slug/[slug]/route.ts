import { NextResponse } from "next/server";
import { getDatabaseBusinesses, normalizeSlug } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const businesses = getDatabaseBusinesses();
  const normalized = normalizeSlug ? normalizeSlug(slug) : slug;
  const business = businesses.find((b) => b.slug === slug || b.slug === normalized);

  if (!business) {
    return NextResponse.json({ detail: "Business not found" }, { status: 404 });
  }

  return NextResponse.json(business);
}
