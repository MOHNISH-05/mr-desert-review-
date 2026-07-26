import { NextResponse } from "next/server";
import { getDatabaseBusinesses } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  const businesses = getDatabaseBusinesses();
  return NextResponse.json({
    businesses,
    total: businesses.length,
  });
}
