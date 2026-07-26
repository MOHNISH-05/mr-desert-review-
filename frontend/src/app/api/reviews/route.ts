import { NextResponse } from "next/server";
import { getDatabaseReviews, createDatabaseReview } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const pageSize = parseInt(searchParams.get("page_size") || "12", 10);
  const businessId = searchParams.get("business_id");
  const rating = searchParams.get("rating");
  const statusParam = searchParams.get("status") || "approved";

  let reviews = getDatabaseReviews();

  if (statusParam) {
    reviews = reviews.filter((r) => r.status === statusParam && r.is_published);
  }

  if (businessId) {
    reviews = reviews.filter((r) => r.business_id === Number(businessId));
  }

  if (rating) {
    reviews = reviews.filter((r) => r.overall_rating === Number(rating));
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.business_id || !body.guest_name || !body.content) {
      return NextResponse.json(
        { detail: "Business ID, Guest Name, and Content are required." },
        { status: 400 }
      );
    }

    const review = createDatabaseReview(body);
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { detail: "Failed to save review in database." },
      { status: 500 }
    );
  }
}
