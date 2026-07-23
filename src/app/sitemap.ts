import type { MetadataRoute } from "next";
import { kuicipProducts, putriTekoProducts } from "@/lib/content";
import { getPublishedArticles } from "@/lib/articles";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gpsfood.id";

// Always computed fresh — revalidatePath() doesn't reliably invalidate
// Next.js's special metadata-route files the way it does normal pages,
// and this query is cheap enough that on-demand caching isn't worth it.
export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/products",
    "/products/kuicip",
    "/products/putri-teko",
    "/export",
    "/news",
    "/contact",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const productRoutes: MetadataRoute.Sitemap = [
    ...kuicipProducts.map((p) => ({ url: `${SITE_URL}/products/kuicip/${p.slug}`, lastModified: new Date() })),
    ...putriTekoProducts.map((p) => ({ url: `${SITE_URL}/products/putri-teko/${p.slug}`, lastModified: new Date() })),
  ];

  const articles = await getPublishedArticles();
  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${SITE_URL}/news/${a.slug}`,
    lastModified: a.updatedAt,
  }));

  return [...staticRoutes, ...productRoutes, ...articleRoutes];
}
