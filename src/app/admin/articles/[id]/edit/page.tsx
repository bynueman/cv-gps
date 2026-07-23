import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ArticleForm, type ArticleFormValues } from "@/components/admin/ArticleForm";
import { findCategorySlug, ARTICLE_CATEGORIES } from "@/lib/articleCategories";

export const metadata: Metadata = { title: "Edit artikel" };
export const dynamic = "force-dynamic";

export default async function EditArticlePage({ params }: { params: { id: string } }) {
  const article = await prisma.article.findUnique({ where: { id: params.id } });
  if (!article) notFound();

  const values: ArticleFormValues = {
    id: article.id,
    slug: article.slug,
    date: article.date.toISOString().slice(0, 10),
    categorySlug: findCategorySlug(article.categoryId) ?? ARTICLE_CATEGORIES[0].slug,
    title: { id: article.titleId, en: article.titleEn },
    excerpt: { id: article.excerptId, en: article.excerptEn },
    body: { id: article.bodyId, en: article.bodyEn },
    tags: { id: article.tagsId, en: article.tagsEn },
    image: article.image,
    imageThumb: article.imageThumb,
    imageOg: article.imageOg,
    featured: article.featured,
    published: article.published,
  };

  return (
    <div className="container-page max-w-3xl py-10">
      <h1 className="font-display text-2xl font-semibold">Edit artikel</h1>
      <div className="mt-8">
        <ArticleForm mode="edit" article={values} />
      </div>
    </div>
  );
}
