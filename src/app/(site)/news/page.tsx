import type { Metadata } from "next";
import { NewsList } from "@/components/pages/NewsList";
import { getPublishedArticles, articleCardFromDb } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Berita & Kegiatan",
  description:
    "Sorotan produk, kegiatan perusahaan, dan edukasi bahan dari CV Gama Putra Santosa.",
};

// Reads the DB per-request so a newly published article appears
// immediately (see revalidatePath calls in the admin CRUD routes).
export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const rows = await getPublishedArticles();
  const articles = rows.map(articleCardFromDb);
  return <NewsList articles={articles} />;
}
