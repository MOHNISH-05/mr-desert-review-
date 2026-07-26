import { NextResponse } from "next/server";
import { getDatabaseReviews } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("page_size") || "20", 10);
  const statusParam = searchParams.get("status");

  let reviews = getDatabaseReviews();

  if (statusParam) {
    reviews = reviews.filter((r) => r.status === statusParam);
  }

  const total = reviews.length;
  const start = (page - 1) * pageSize;
  const paginatedReviews = reviews.slice(start, start + pageSize);
  const totalPages = Math.ceil(total / pageSize) || 1;

  return NextResponse.json({
    reviews: paginatedReviews,
    total,
    page,
    page_size: pageSize,
    total_pages: totalPages,
  });
}
