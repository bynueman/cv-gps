"use client";

import Link from "next/link";
import type { Product } from "@/lib/content";
import { useLang } from "@/lib/i18n";
import { ProductPackshot } from "@/components/ProductPackshot";

/**
 * Catalog/product card. The real studio shots share a warm cream
 * backdrop, so the photo fills the card frame edge-to-edge (with a
 * slow zoom on hover) instead of floating on a tinted plane. A small
 * chip states the packaging form: 70 gr ziplock for Kuicip, the real
 * botol/kotak/toples/kemasan forms for Putri Teko.
 * `size="wide"` produces the horizontal bento variant.
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

  const chip =
    product.brand === "kuicip" ? "70 gr" : product.packaging ? t.packaging[product.packaging] : null;

  if (size === "wide") {
    return (
      <Link
        href={href}
        className="group relative flex items-center gap-5 overflow-hidden rounded-3xl border border-espresso-900/10 bg-cream-50 p-4 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:gap-6 sm:p-5"
      >
        <div
          className="absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-[0.14] transition-transform duration-500 group-hover:scale-125"
          style={{ backgroundColor: product.color }}
          aria-hidden="true"
        />
        <div className="relative w-28 shrink-0 sm:w-32">
          <ProductPackshot product={product} lang={lang} zoom className="shadow-card" />
          {chip ? (
            <span className="absolute left-1.5 top-1.5 rounded-full bg-cream-50/90 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.12em] text-espresso-800 backdrop-blur-sm">
              {chip}
            </span>
          ) : null}
        </div>
        <div className="relative min-w-0 py-1">
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
      <div className="relative">
        <ProductPackshot product={product} lang={lang} zoom />
        {chip ? (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-cream-50/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-espresso-800 backdrop-blur-sm">
            {chip}
          </span>
        ) : null}
        <span
          className="absolute bottom-0 left-4 right-4 h-1 rounded-t-full opacity-80"
          style={{ backgroundColor: product.color }}
          aria-hidden="true"
        />
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
