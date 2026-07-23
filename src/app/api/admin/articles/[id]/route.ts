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

type Params = { params: { id: string } };

export async function PATCH(req: Request, { params }: Params) {
  await requireAdminSession();

  const existing = await prisma.article.findUnique({ where: { id: params.id } });
  if (!existing) {
    return NextResponse.json({ error: "Artikel tidak ditemukan." }, { status: 404 });
  }

  const input = (await req.json()) as Partial<ArticleInput> & { confirmSlugChange?: boolean };
  const fieldErrors = validateArticleInput(input);

  const slug = slugify(input.slug || input.title?.id || "");
  if (!slug) {
    fieldErrors["slug"] = "Slug tidak valid.";
  } else if (slug !== existing.slug) {
    const conflict = await prisma.article.findUnique({ where: { slug } });
    if (conflict) {
      fieldErrors["slug"] = "Slug sudah digunakan artikel lain.";
    } else if (existing.published && !input.confirmSlugChange) {
      fieldErrors["slug"] =
        "Artikel ini sudah dipublikasikan — mengubah slug akan mengubah URL publik. Centang konfirmasi untuk melanjutkan.";
    }
  }

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json({ fieldErrors }, { status: 400 });
  }

  const category = getCategoryBySlug(input.categorySlug!)!;
  const featured = Boolean(input.featured);
  const published = Boolean(input.published);

  if (featured && published) {
    try {
      await assertFeaturedCap(existing.id);
    } catch (err) {
      return NextResponse.json({ error: (err as Error).message }, { status: 400 });
    }
  }

  const updated = await prisma.article.update({
    where: { id: existing.id },
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

  revalidateArticlePaths(existing.slug, updated.slug);

  return NextResponse.json({ id: updated.id, slug: updated.slug });
}

export async function DELETE(_req: Request, { params }: Params) {
  await requireAdminSession();

  const existing = await prisma.article.findUnique({ where: { id: params.id } });
  if (!existing) {
    return NextResponse.json({ error: "Artikel tidak ditemukan." }, { status: 404 });
  }

  await prisma.article.delete({ where: { id: params.id } });
  revalidateArticlePaths(existing.slug);

  return NextResponse.json({ ok: true });
}
