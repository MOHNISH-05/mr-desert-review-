import { NextResponse } from "next/server";
import { updateReviewStatus } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = Number(id);
  const updated = updateReviewStatus(numId, "rejected", false);

  if (!updated) {
    return NextResponse.json({ detail: "Review not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
