import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, putriTekoProducts } from "@/lib/content";
import { ProductDetail } from "@/components/pages/ProductDetail";

export function generateStaticParams() {
  return putriTekoProducts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct("putri-teko", params.slug);
  if (!product) return {};
  return {
    title: `Putri Teko ${product.name.id}`,
    description: product.short.id,
  };
}

export default function TekoDetailPage({ params }: { params: { slug: string } }) {
  const product = getProduct("putri-teko", params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
