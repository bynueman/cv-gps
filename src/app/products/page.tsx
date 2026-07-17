import type { Metadata } from "next";
import { ProductsOverview } from "@/components/pages/ProductsOverview";

export const metadata: Metadata = {
  title: "Produk Kami",
  description:
    "Dua keluarga produk dari CV Gama Putra Santosa: keripik singkong Kuicip dan minuman tradisional Putri Teko.",
};

export default function ProductsPage() {
  return <ProductsOverview />;
}
