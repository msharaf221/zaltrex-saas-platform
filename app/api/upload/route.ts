import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import fs from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

const UPLOAD_SUBDIR = path.join(process.cwd(), "public", "uploads", "blog");
const MAX_FILE_SIZE = 15 * 1024 * 1024; // 15MB
const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "image/avif",
]);

export async function POST(req: NextRequest) {
  try {
    // 1. Admin Authorization Check
    const session = await auth();
    if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin privileges required." },
        { status: 401 }
      );
    }

    // 2. Parse Multipart Form Data
    const formData = await req.formData();
    const uploadedFiles: File[] = [];

    // Gather all files from "files" or "file" or any File instance in form data
    for (const [key, value] of formData.entries()) {
      if (value instanceof File && value.size > 0) {
        uploadedFiles.push(value);
      }
    }

    if (uploadedFiles.length === 0) {
      return NextResponse.json(
        { success: false, error: "No files were uploaded. Please select one or more images." },
        { status: 400 }
      );
    }

    // 3. Ensure destination directory exists
    await fs.mkdir(UPLOAD_SUBDIR, { recursive: true });

    const savedFiles: Array<{ url: string; name: string; size: number }> = [];

    // 4. Validate and write each file
    for (const file of uploadedFiles) {
      if (!ALLOWED_MIME_TYPES.has(file.type) && !file.type.startsWith("image/")) {
        return NextResponse.json(
          {
            success: false,
            error: `File "${file.name}" has an unsupported format (${file.type}). Only images (JPEG, PNG, WebP, GIF, SVG, AVIF) are allowed.`,
          },
          { status: 400 }
        );
      }

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            error: `File "${file.name}" exceeds the 15MB limit. Please upload a smaller image.`,
          },
          { status: 400 }
        );
      }

      // Sanitize filename and create unique timestamped name
      const ext = path.extname(file.name) || ".png";
      const baseName = path
        .basename(file.name, ext)
        .replace(/[^a-zA-Z0-9_-]/g, "_")
        .substring(0, 40);

      const uniqueSuffix = `${Date.now()}_${Math.random().toString(36).substring(2, 8)}`;
      const fileName = `${baseName}_${uniqueSuffix}${ext}`;
      const filePath = path.join(UPLOAD_SUBDIR, fileName);

      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await fs.writeFile(filePath, buffer);

      const publicUrl = `/uploads/blog/${fileName}`;
      savedFiles.push({
        url: publicUrl,
        name: file.name,
        size: file.size,
      });
    }

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${savedFiles.length} image(s).`,
      urls: savedFiles.map((f) => f.url),
      files: savedFiles,
    });
  } catch (error: any) {
    console.error("Upload route error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "An error occurred during file upload." },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth();
    if (!session || (session.user as { role?: string })?.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Unauthorized: Admin privileges required." },
        { status: 401 }
      );
    }

    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ success: false, error: "Invalid file URL." }, { status: 400 });
    }

    // Security check: only allow files inside /uploads/blog/
    if (!url.startsWith("/uploads/blog/")) {
      return NextResponse.json(
        { success: false, error: "Cannot delete non-blog upload files." },
        { status: 400 }
      );
    }

    const fileName = path.basename(url);
    const filePath = path.join(UPLOAD_SUBDIR, fileName);

    // Verify it doesn't escape upload directory
    const resolvedPath = path.resolve(filePath);
    if (!resolvedPath.startsWith(path.resolve(UPLOAD_SUBDIR))) {
      return NextResponse.json({ success: false, error: "Access denied." }, { status: 403 });
    }

    try {
      await fs.unlink(resolvedPath);
    } catch (e: any) {
      // File might already have been deleted, ignore not found
      if (e.code !== "ENOENT") throw e;
    }

    return NextResponse.json({ success: true, message: "File removed successfully." });
  } catch (error: any) {
    console.error("Delete upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete file." },
      { status: 500 }
    );
  }
}
