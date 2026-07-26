import { NextResponse } from "next/server";
import { getDatabaseReviews, updateDatabaseReview, deleteDatabaseReview } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = Number(id);
  const reviews = getDatabaseReviews();
  const review = reviews.find((r) => r.id === numId);

  if (!review) {
    return NextResponse.json({ detail: "Review not found" }, { status: 404 });
  }

  return NextResponse.json(review);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = Number(id);

  try {
    const body = await request.json();
    const updated = updateDatabaseReview(numId, body);

    if (!updated) {
      return NextResponse.json({ detail: "Review not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json({ detail: "Failed to update review" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = Number(id);
  const success = deleteDatabaseReview(numId);

  if (!success) {
    return NextResponse.json({ detail: "Review not found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}
