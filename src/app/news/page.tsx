import type { Metadata } from "next";
import { NewsList } from "@/components/pages/NewsList";

export const metadata: Metadata = {
  title: "Berita & Kegiatan",
  description:
    "Sorotan produk, kegiatan perusahaan, dan edukasi bahan dari CV Gama Putra Santosa.",
};

export default function NewsPage() {
  return <NewsList />;
}
