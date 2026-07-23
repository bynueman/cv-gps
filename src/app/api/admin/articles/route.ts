import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/slug";
import { getCategoryBySlug } from "@/lib/articleCategories";
import { sanitizeArticleHtml } from "@/lib/sanitizeArticleHtml";
import {
  assertFeaturedCap,
  requireAdminSession,
  revalidateArticlePaths,
  validateArticleInput,
  type ArticleInput,
} from "@/lib/articleAdmin";

export async function POST(req: Request) {
  await requireAdminSession();

  const input = (await req.json()) as Partial<ArticleInput>;
  const fieldErrors = validateArticleInput(input);

  const slug = slugify(input.slug || input.title?.id || "");
  if (!slug) {
    fieldErrors["slug"] = "Slug tidak valid.";
  } else {
    const existing = await prisma.article.findUnique({ where: { slug } });
    if (existing) fieldErrors["slug"] = "Slug sudah digunakan artikel lain.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ fieldErrors }, { status: 400 });
  }

  const category = getCategoryBySlug(input.categorySlug!)!;
  const featured = Boolean(input.featured);
  const published = Boolean(input.published);

  if (featured && published) {
    try {
      await assertFeaturedCap();
    } catch (err) {
      return NextResponse.json({ error: (err as Error).message }, { status: 400 });
    }
  }

  const article = await prisma.article.create({
    data: {
      slug,
      date: new Date(input.date!),
      categoryId: category.id,
      categoryEn: category.en,
      titleId: input.title!.id,
      titleEn: input.title!.en,
      excerptId: input.excerpt!.id,
      excerptEn: input.excerpt!.en,
      bodyId: sanitizeArticleHtml(input.body!.id),
      bodyEn: sanitizeArticleHtml(input.body!.en),
      tagsId: input.tags?.id ?? "",
      tagsEn: input.tags?.en ?? "",
      image: input.image || null,
      imageThumb: input.imageThumb || null,
      imageOg: input.imageOg || null,
      featured,
      published,
    },
  });

  revalidateArticlePaths(article.slug);

  return NextResponse.json({ id: article.id, slug: article.slug });
}
