import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedArticleBySlug, getPublishedArticles, articleFromDb, articleCardFromDb } from "@/lib/articles";
import { ArticleDetail } from "@/components/pages/ArticleDetail";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gpsfood.id";
const SITE_NAME = "CV Gama Putra Santosa";

function parseTags(raw: string): string[] {
  return raw.split(",").map((t) => t.trim()).filter(Boolean);
}

// No generateStaticParams — articles are created after build time via
// the admin panel, so this route reads the DB per-request instead.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const row = await getPublishedArticleBySlug(params.slug);
  if (!row) return {};

  const url = `${SITE_URL}/news/${row.slug}`;
  const ogImage = row.imageOg || row.image;
  const tags = parseTags(row.tagsId);

  return {
    title: row.titleId,
    description: row.excerptId,
    keywords: tags.length > 0 ? tags : undefined,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: SITE_NAME,
      title: row.titleId,
      description: row.excerptId,
      url,
      publishedTime: row.date.toISOString(),
      tags: tags.length > 0 ? tags : undefined,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: row.titleId,
      description: row.excerptId,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const row = await getPublishedArticleBySlug(params.slug);
  if (!row) notFound();

  const article = articleFromDb(row);
  const allRows = await getPublishedArticles();
  const related = allRows.filter((a) => a.slug !== row.slug).slice(0, 3).map(articleCardFromDb);

  const url = `${SITE_URL}/news/${row.slug}`;
  const tags = parseTags(row.tagsId);
  const newsArticleJsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: row.titleId,
    description: row.excerptId,
    datePublished: row.date.toISOString(),
    dateModified: row.updatedAt.toISOString(),
    image: row.imageOg || row.image ? [row.imageOg || row.image] : undefined,
    keywords: tags.length > 0 ? tags.join(", ") : undefined,
    articleSection: row.categoryId,
    author: { "@type": "Organization", name: SITE_NAME },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo/gps.webp` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Berita & Kegiatan", item: `${SITE_URL}/news` },
      { "@type": "ListItem", position: 3, name: row.titleId, item: url },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(newsArticleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ArticleDetail article={article} relatedArticles={related} />
    </>
  );
}
