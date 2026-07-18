"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { brands, getProduct } from "@/lib/content";

/**
 * Featured-products bento grid (Claude Design import): one 2×2 hero
 * card plus five supporting cards on a 4-column grid, dark section bg.
 * Real products, mapped from the mockup's placeholder names.
 */
const FEATURED = [
  { brand: "putri-teko" as const, slug: "wedang-uwuh-toples", span: "lg:col-[1/3] lg:row-[1/3]", img: "h-[420px]" },
  { brand: "kuicip" as const, slug: "rendang", span: "lg:col-[3/4] lg:row-[1/2]", img: "h-[110px]" },
  { brand: "kuicip" as const, slug: "chili-lime", span: "lg:col-[4/5] lg:row-[1/2]", img: "h-[110px]" },
  { brand: "putri-teko" as const, slug: "beras-kencur", span: "lg:col-[3/4] lg:row-[2/3]", img: "h-[110px]" },
  { brand: "putri-teko" as const, slug: "jahe-merah-kotak", span: "lg:col-[4/5] lg:row-[2/3]", img: "h-[110px]" },
  { brand: "kuicip" as const, slug: "balado", span: "lg:col-[1/5] lg:row-[3/4]", img: "h-[110px]" },
];

export function FeaturedProducts() {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);

  return (
    <section ref={scope} className="bg-homeInk px-6 py-32 sm:px-14 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p data-reveal className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-homeGold">
              {t.featured.kicker}
            </p>
            <h2 data-reveal className="mt-3 max-w-xl font-homeDisplay text-4xl text-homeBg sm:text-[46px]">
              {t.featured.title}
            </h2>
          </div>
          <Link data-reveal href="/products" className="font-bold text-homeGold">
            {t.common.seeAllProducts} →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-4 lg:auto-rows-[260px]">
          {FEATURED.map(({ brand, slug, span, img }) => {
            const product = getProduct(brand, slug);
            if (!product) return null;
            const tag = brand === "kuicip" ? brands.kuicip.tag[lang] : t.packaging[product.packaging!];
            const accent = brand === "kuicip" ? "text-homeTerracotta" : "text-homeSage";
            return (
              <Link
                key={`${brand}-${slug}`}
                data-reveal
                href={`/products/${brand}/${slug}`}
                className={`group flex flex-col gap-3.5 rounded-[26px] bg-homeCard p-6 transition-transform duration-300 hover:-translate-y-1.5 ${span}`}
              >
                <div className={`relative w-full flex-none overflow-hidden rounded-[18px] bg-homePanel ${img}`}>
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name[lang]}
                      fill
                      sizes="(min-width: 1024px) 24rem, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                    />
                  ) : null}
                </div>
                <div>
                  <p className={`mb-1 text-[11px] font-extrabold uppercase tracking-[0.04em] ${accent}`}>
                    {brand === "kuicip" ? brands.kuicip.name : brands["putri-teko"].name} · {tag}
                  </p>
                  <p className="font-homeDisplay text-[22px] text-homeInk">{product.name[lang]}</p>
                  <p className="mt-1 text-[13px] text-homeInk2">{product.short[lang]}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
