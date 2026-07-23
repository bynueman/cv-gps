import type { Article as PrismaArticle } from "@prisma/client";
import { prisma } from "@/lib/db";
import type { Article } from "@/lib/content";

function parseTags(raw: string): string[] {
  return raw
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}

/**
 * DB-backed article helpers. The public-facing `Article` type (from
 * content.ts) is unchanged — these functions map Prisma rows onto that
 * same contract so ArticleCard/ArticleDetail/NewsList keep working
 * without modification. `body` holds a single sanitized-HTML blob per
 * language (see src/components/admin/RichTextEditor.tsx), wrapped in a
 * one-element array to preserve the existing `Bilingual[]` shape.
 */
export function articleFromDb(row: PrismaArticle): Article {
  return {
    slug: row.slug,
    date: row.date.toISOString(),
    category: { id: row.categoryId, en: row.categoryEn },
    title: { id: row.titleId, en: row.titleEn },
    excerpt: { id: row.excerptId, en: row.excerptEn },
    body: [{ id: row.bodyId, en: row.bodyEn }],
    image: row.image,
    featured: row.featured,
    tags: parseTags(row.tagsId),
  };
}

/** Same contract, but prefers the smaller `imageThumb` variant — use in card grids. */
export function articleCardFromDb(row: PrismaArticle): Article {
  return { ...articleFromDb(row), image: row.imageThumb ?? row.image };
}

export async function getPublishedArticles(): Promise<PrismaArticle[]> {
  return prisma.article.findMany({ where: { published: true }, orderBy: { date: "desc" } });
}

export async function getPublishedArticleBySlug(slug: string): Promise<PrismaArticle | null> {
  return prisma.article.findFirst({ where: { slug, published: true } });
}

export async function getFeaturedArticles(limit = 3): Promise<PrismaArticle[]> {
  return prisma.article.findMany({
    where: { published: true, featured: true },
    orderBy: { date: "desc" },
    take: limit,
  });
}
