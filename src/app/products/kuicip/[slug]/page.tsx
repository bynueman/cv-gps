import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, kuicipProducts } from "@/lib/content";
import { ProductDetail } from "@/components/pages/ProductDetail";

export function generateStaticParams() {
  return kuicipProducts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const product = getProduct("kuicip", params.slug);
  if (!product) return {};
  return {
    title: `Kuicip ${product.name.id}`,
    description: product.short.id,
  };
}

export default function KuicipDetailPage({ params }: { params: { slug: string } }) {
  const product = getProduct("kuicip", params.slug);
  if (!product) notFound();
  return <ProductDetail product={product} />;
}
