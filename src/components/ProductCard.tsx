"use client";

import Link from "next/link";
import type { Product } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { ProductPackshot } from "@/components/ProductPackshot";

/**
 * Catalog/product card. `size="wide"` produces the horizontal bento
 * variant used in featured grids.
 */
export function ProductCard({
  product,
  size = "default",
  showServing = false,
}: {
  product: Product;
  size?: "default" | "wide";
  showServing?: boolean;
}) {
  const { lang, t } = useLang();
  const href = `/products/${product.brand}/${product.slug}`;

  if (size === "wide") {
    return (
      <Link
        href={href}
        className="group relative flex items-center gap-5 overflow-hidden rounded-3xl border border-espresso-900/10 bg-cream-50 p-5 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:gap-7 sm:p-7"
      >
        <div
          className="absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-[0.16] transition-transform duration-500 group-hover:scale-125"
          style={{ backgroundColor: product.color }}
          aria-hidden="true"
        />
        <div className="w-28 shrink-0 drop-shadow-md transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-105 sm:w-32">
          <ProductPackshot product={product} lang={lang} />
        </div>
        <div className="relative min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: product.colorDark }}>
            {product.personality[lang]}
          </p>
          <h3 className="mt-1.5 font-display text-xl font-semibold leading-snug">{product.name[lang]}</h3>
          <p className="mt-2 text-sm leading-relaxed text-espresso-600">{product.short[lang]}</p>
          {showServing && product.serving ? (
            <p className="mt-2 text-xs font-medium text-espresso-500">{product.serving[lang]}</p>
          ) : null}
          <span className="mt-3 inline-block text-sm font-semibold text-gold-600">
            {t.common.viewDetail} →
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="group flex h-full flex-col rounded-3xl border border-espresso-900/10 bg-cream-50 p-3 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift"
    >
      <div
        className="relative flex items-end justify-center overflow-hidden rounded-2xl pt-6"
        style={{ backgroundColor: `${product.color}22` }}
      >
        <div
          className="absolute -left-6 -top-6 h-20 w-20 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-150"
          style={{ backgroundColor: product.color }}
          aria-hidden="true"
        />
        <div className="relative w-[68%] drop-shadow-md transition-transform duration-300 group-hover:-translate-y-1.5 group-hover:rotate-2">
          <ProductPackshot product={product} lang={lang} />
        </div>
      </div>
      <div className="flex grow flex-col px-2.5 pb-2.5 pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ color: product.colorDark }}>
          {product.personality[lang]}
        </p>
        <h3 className="mt-1 font-display text-lg font-semibold leading-snug">{product.name[lang]}</h3>
        <p className="mt-1.5 grow text-sm leading-relaxed text-espresso-600">{product.short[lang]}</p>
        {showServing && product.serving ? (
          <p className="mt-2 text-xs font-medium text-espresso-500">{product.serving[lang]}</p>
        ) : null}
        <span className="mt-3 text-sm font-semibold text-gold-600">{t.common.viewDetail} →</span>
      </div>
    </Link>
  );
}
