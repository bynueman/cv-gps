"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { brands, getProduct } from "@/lib/content";

/**
 * Featured-products bento grid: one hero card plus four upright
 * supporting cards (3 Kuicip + 1 Putri Teko), dark section bg. Card
 * images use `aspect-[3/4]` (the real studio shots' own proportions)
 * rather than a forced letterbox crop.
 */
const SUPPORTING = [
  { brand: "kuicip" as const, slug: "original" },
  { brand: "kuicip" as const, slug: "seaweed" },
  { brand: "kuicip" as const, slug: "balado" },
  { brand: "putri-teko" as const, slug: "beras-kencur" },
];
const HERO = { brand: "putri-teko" as const, slug: "wedang-uwuh-toples" };

export function FeaturedProducts() {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);

  const hero = getProduct(HERO.brand, HERO.slug);

  const tagFor = (brand: "kuicip" | "putri-teko", packaging?: string) =>
    brand === "kuicip" ? brands.kuicip.tag[lang] : t.packaging[packaging as keyof typeof t.packaging];
  const accentFor = (brand: "kuicip" | "putri-teko") =>
    brand === "kuicip" ? "text-homeTerracotta" : "text-homeSage";

  return (
    <section ref={scope} className="bg-homeInk px-6 py-32 sm:px-14 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p data-reveal className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-homeGold">
              {t.featured.kicker}
            </p>
            <h2 data-reveal className="mt-3 max-w-xl font-display text-4xl text-homeBg sm:text-[46px]">
              {t.featured.title}
            </h2>
          </div>
          <Link data-reveal href="/products" className="font-bold text-homeGold">
            {t.common.seeAllProducts} →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {/* hero card — image fills the full card height (2 supporting
              rows' worth) so a portrait photo has real room to breathe */}
          {hero ? (
            <Link
              data-reveal
              href={`/products/${HERO.brand}/${HERO.slug}`}
              className="group flex flex-col gap-4 rounded-[26px] bg-homeCard p-6 transition-transform duration-300 hover:-translate-y-1.5 lg:row-span-2"
            >
              <div className="relative min-h-[280px] flex-1 overflow-hidden rounded-[18px] bg-homePanel">
                {hero.image ? (
                  <Image
                    src={hero.image}
                    alt={hero.name[lang]}
                    fill
                    sizes="(min-width: 1024px) 30rem, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                  />
                ) : null}
              </div>
              <div>
                <p className={`mb-1 text-[11px] font-extrabold uppercase tracking-[0.04em] ${accentFor(HERO.brand)}`}>
                  {brands["putri-teko"].name} · {tagFor(HERO.brand, hero.packaging)}
                </p>
                <p className="font-display text-2xl text-homeInk">{hero.name[lang]}</p>
                <p className="mt-1 text-sm text-homeInk2">{hero.short[lang]}</p>
              </div>
            </Link>
          ) : null}

          {/* 4 supporting cards, upright 3:4 photos matching the real packshots */}
          <div className="grid grid-cols-2 gap-5">
            {SUPPORTING.map(({ brand, slug }) => {
              const product = getProduct(brand, slug);
              if (!product) return null;
              return (
                <Link
                  key={`${brand}-${slug}`}
                  data-reveal
                  href={`/products/${brand}/${slug}`}
                  className="group flex flex-col gap-3 rounded-[22px] bg-homeCard p-4 transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-homePanel">
                    {product.image ? (
                      <Image
                        src={product.image}
                        alt={product.name[lang]}
                        fill
                        sizes="(min-width: 1024px) 16rem, 45vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                      />
                    ) : null}
                  </div>
                  <div>
                    <p className={`mb-1 text-[11px] font-extrabold uppercase tracking-[0.04em] ${accentFor(brand)}`}>
                      {tagFor(brand, product.packaging)}
                    </p>
                    <p className="font-display text-lg text-homeInk">{product.name[lang]}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
