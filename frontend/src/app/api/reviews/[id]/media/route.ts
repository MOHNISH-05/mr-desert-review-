import { NextResponse } from "next/server";
import { addReviewMedia } from "@/lib/db";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const numId = Number(id);

  try {
    const formData = await request.formData();
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ detail: "No files uploaded" }, { status: 400 });
    }

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const mediaItems = [];
    for (const file of files) {
      if (!file.name) continue;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = file.name.split(".").pop() || "jpg";
      const filename = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${ext}`;
      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, buffer);

      mediaItems.push({
        id: Date.now() + Math.floor(Math.random() * 1000),
        review_id: numId,
        media_type: "image",
        url: `/uploads/${filename}`,
        public_id: filename,
        width: null,
        height: null,
      });
    }

    const updated = addReviewMedia(numId, mediaItems);
    if (!updated) {
      return NextResponse.json({ detail: "Review not found" }, { status: 404 });
    }

    return NextResponse.json(mediaItems);
  } catch (error) {
    console.error("Error uploading media:", error);
    return NextResponse.json({ detail: "Failed to upload media" }, { status: 500 });
  }
}
