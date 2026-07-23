import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import path from "path";
import { mkdir, writeFile } from "fs/promises";
import sharp from "sharp";

export const runtime = "nodejs";

const MAX_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME = new Set(["image/jpeg", "image/png", "image/webp"]);
const ALLOWED_FORMATS = new Set(["jpeg", "png", "webp"]);
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "news");

function kb(bytes: number) {
  return `${(bytes / 1024).toFixed(1)}KB`;
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File tidak ditemukan." }, { status: 400 });
  }

  if (!ALLOWED_MIME.has(file.type)) {
    return NextResponse.json({ error: "Format harus JPEG, PNG, atau WebP." }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "Ukuran file maksimal 10MB." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Don't trust the client-supplied MIME type alone — verify the actual
  // decoded format so a renamed/spoofed file can't reach sharp's pipeline.
  const metadata = await sharp(buffer).metadata();
  if (!metadata.format || !ALLOWED_FORMATS.has(metadata.format)) {
    return NextResponse.json({ error: "File bukan gambar yang valid." }, { status: 400 });
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const id = randomUUID();
  const contentName = `${id}-content.webp`;
  const thumbName = `${id}-thumb.webp`;
  const ogName = `${id}-og.webp`;

  // .rotate() applies the EXIF orientation to the pixel data; since
  // .withMetadata() is never called, the encoded output carries no EXIF.
  const [contentBuffer, thumbBuffer, ogBuffer] = await Promise.all([
    sharp(buffer).rotate().resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 82 }).toBuffer(),
    sharp(buffer).rotate().resize({ width: 640, withoutEnlargement: true }).webp({ quality: 80 }).toBuffer(),
    sharp(buffer).rotate().resize({ width: 1200, height: 630, fit: "cover" }).webp({ quality: 82 }).toBuffer(),
  ]);

  await Promise.all([
    writeFile(path.join(UPLOAD_DIR, contentName), contentBuffer),
    writeFile(path.join(UPLOAD_DIR, thumbName), thumbBuffer),
    writeFile(path.join(UPLOAD_DIR, ogName), ogBuffer),
  ]);

  console.log(
    `[upload] ${file.name}: original ${kb(buffer.length)} -> content ${kb(contentBuffer.length)}, thumb ${kb(thumbBuffer.length)}, og ${kb(ogBuffer.length)}`
  );

  return NextResponse.json({
    image: `/uploads/news/${contentName}`,
    imageThumb: `/uploads/news/${thumbName}`,
    imageOg: `/uploads/news/${ogName}`,
    sizes: {
      original: buffer.length,
      content: contentBuffer.length,
      thumb: thumbBuffer.length,
      og: ogBuffer.length,
    },
  });
}
