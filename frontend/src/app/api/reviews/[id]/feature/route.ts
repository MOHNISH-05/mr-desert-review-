import { NextResponse } from "next/server";
import { toggleReviewFlag } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = Number(id);
  const updated = toggleReviewFlag(numId, "is_featured");

  if (!updated) {
    return NextResponse.json({ detail: "Review not found" }, { status: 404 });
  }

  return NextResponse.json(updated);
}
