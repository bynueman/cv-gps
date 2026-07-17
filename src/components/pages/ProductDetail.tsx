"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { brands, relatedProducts, type Product } from "@/lib/content";
import { ProductPackshot } from "@/components/ProductPackshot";
import { ProductCard } from "@/components/ProductCard";
import { ExportCTA } from "@/components/ExportCTA";
import { MotionBackdrop } from "@/components/MotionBackdrop";

/**
 * Reusable product detail template. Kuicip pages lean on flavor
 * storytelling (personality + flavor notes); Putri Teko pages lean on
 * ingredients and serving. Both share the same structure.
 */
export function ProductDetail({ product }: { product: Product }) {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang, product.slug]);

  const brand = brands[product.brand];
  const isKuicip = product.brand === "kuicip";
  const related = relatedProducts(product);

  return (
    <article ref={scope} className="pb-20 pt-28 sm:pt-36 lg:pb-28">
      <div className="container-page">
        <nav data-reveal aria-label="Breadcrumb" className="text-sm font-medium text-espresso-500">
          <Link href={brand.href} className="hover:text-gold-700">
            ← {t.common.backToProducts} {brand.name}
          </Link>
        </nav>

        {/* Hero: packshot on a soft colored plane + product info */}
        <div className="mt-8 grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="relative lg:col-span-5">
            <div
              className="relative flex items-end justify-center overflow-hidden rounded-3xl pb-0 pt-10 shadow-card"
              style={{ backgroundColor: `${product.color}26` }}
            >
              <MotionBackdrop variant={isKuicip ? "kuicip" : "teko"} />
              <div
                className="absolute -left-10 -top-10 h-44 w-44 rounded-full opacity-20"
                style={{ backgroundColor: product.color }}
                aria-hidden="true"
              />
              <div className={`relative drop-shadow-xl ${isKuicip ? "w-[62%]" : "w-[46%]"} pb-6`}>
                <ProductPackshot product={product} lang={lang} />
              </div>
            </div>
            {isKuicip && brand.weight ? (
              <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em] text-espresso-500">
                {t.productDetail.weightLabel}: {brand.weight}
              </p>
            ) : null}
          </div>

          <div className="lg:col-span-7">
            <p data-reveal className="kicker">
              {t.productDetail.categoryLabel} · {brand.name} — {brand.tag[lang]}
            </p>
            <h1
              data-reveal
              className="mt-3 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl"
            >
              {product.name[lang]}
            </h1>
            <p
              data-reveal
              className="mt-3 text-sm font-semibold uppercase tracking-[0.16em]"
              style={{ color: product.colorDark }}
            >
              {product.personality[lang]}
              {product.serving ? ` · ${product.serving[lang]}` : ""}
            </p>

            <h2 data-reveal className="mt-8 font-display text-lg font-semibold">
              {t.productDetail.aboutTitle}
            </h2>
            <p data-reveal className="mt-2 max-w-2xl text-base leading-relaxed text-espresso-600">
              {product.description[lang]}
            </p>

            <div className="mt-8 grid gap-8 sm:grid-cols-2">
              <div data-reveal>
                <h2 className="font-display text-lg font-semibold">{t.productDetail.highlightsTitle}</h2>
                <ul className="mt-3 space-y-2.5">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-espresso-700">
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: product.color }}
                        aria-hidden="true"
                      />
                      {h[lang]}
                    </li>
                  ))}
                </ul>
              </div>
              <div data-reveal>
                <h2 className="font-display text-lg font-semibold">
                  {isKuicip ? t.productDetail.notesTitleKuicip : t.productDetail.notesTitleTeko}
                </h2>
                <ul className="mt-3 space-y-2.5">
                  {product.notes.map((n, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm leading-relaxed text-espresso-700">
                      <span
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                        style={{ backgroundColor: product.colorDark }}
                        aria-hidden="true"
                      />
                      {n[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Inquiry CTA */}
        <div data-reveal className="mt-16">
          <ExportCTA
            title={t.productDetail.inquiryTitle}
            body={t.productDetail.inquiryBody}
            button={t.productDetail.inquiryButton}
          />
        </div>

        {/* Related products */}
        {related.length ? (
          <div className="mt-16">
            <h2 data-reveal className="font-display text-2xl font-semibold">
              {t.productDetail.relatedTitle}
            </h2>
            <ul className="mt-7 grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-5">
              {related.map((p) => (
                <li key={p.slug} data-reveal>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </article>
  );
}
