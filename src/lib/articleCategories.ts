export type ArticleCategory = {
  slug: string;
  id: string;
  en: string;
};

/**
 * Fixed taxonomy (not free text) so category labels stay consistent
 * across articles — matters for SEO (category as a stable content
 * signal) and for any future category filtering on /news.
 */
export const ARTICLE_CATEGORIES: ArticleCategory[] = [
  { slug: "produk-resep", id: "Produk & Resep", en: "Products & Recipes" },
  { slug: "kegiatan-perusahaan", id: "Kegiatan Perusahaan", en: "Company Activities" },
  { slug: "edukasi-bahan", id: "Edukasi Bahan", en: "Ingredient Education" },
  { slug: "ekspor-kemitraan", id: "Ekspor & Kemitraan", en: "Export & Partnership" },
];

export function getCategoryBySlug(slug: string): ArticleCategory | undefined {
  return ARTICLE_CATEGORIES.find((c) => c.slug === slug);
}

/** Best-effort reverse lookup — matches a stored categoryId/categoryEn pair back to its slug (for pre-filling the edit form). */
export function findCategorySlug(categoryId: string): string | undefined {
  return ARTICLE_CATEGORIES.find((c) => c.id === categoryId)?.slug;
}
