import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { getCategoryBySlug } from "@/lib/articleCategories";

export type ArticleInput = {
  slug: string;
  date: string;
  categorySlug: string;
  title: { id: string; en: string };
  excerpt: { id: string; en: string };
  body: { id: string; en: string }; // rich-text HTML from the admin editor
  tags: { id: string; en: string }; // raw comma-separated text
  image: string | null;
  imageThumb: string | null;
  imageOg: string | null;
  featured: boolean;
  published: boolean;
};

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session) throw new UnauthorizedError();
}

export class UnauthorizedError extends Error {}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function validateArticleInput(input: Partial<ArticleInput>) {
  const fieldErrors: Record<string, string> = {};
  if (!input.title?.id?.trim()) fieldErrors["title.id"] = "Judul (ID) wajib diisi.";
  if (!input.title?.en?.trim()) fieldErrors["title.en"] = "Judul (EN) wajib diisi.";
  if (!input.categorySlug || !getCategoryBySlug(input.categorySlug)) {
    fieldErrors["category"] = "Pilih kategori yang valid.";
  }
  if (!input.excerpt?.id?.trim()) fieldErrors["excerpt.id"] = "Ringkasan (ID) wajib diisi.";
  if (!input.excerpt?.en?.trim()) fieldErrors["excerpt.en"] = "Ringkasan (EN) wajib diisi.";
  if (!stripHtml(input.body?.id ?? "")) fieldErrors["body.id"] = "Isi artikel (ID) wajib diisi.";
  if (!stripHtml(input.body?.en ?? "")) fieldErrors["body.en"] = "Isi artikel (EN) wajib diisi.";
  if (!input.date || Number.isNaN(new Date(input.date).getTime())) {
    fieldErrors["date"] = "Tanggal tidak valid.";
  }
  return fieldErrors;
}

export async function assertFeaturedCap(excludeId?: string) {
  const count = await prisma.article.count({
    where: {
      featured: true,
      published: true,
      ...(excludeId ? { id: { not: excludeId } } : {}),
    },
  });
  if (count >= 3) {
    throw new Error("Maksimal 3 artikel featured yang aktif. Nonaktifkan salah satu dulu.");
  }
}

export function revalidateArticlePaths(...slugs: (string | null | undefined)[]) {
  revalidatePath("/news");
  revalidatePath("/");
  for (const slug of slugs) {
    if (slug) revalidatePath(`/news/${slug}`, "page");
  }
}
