"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { featuredKuicip, featuredTekoBrew, featuredTekoRtd } from "@/lib/content";
import { ProductCard } from "@/components/ProductCard";
import { MotionBackdrop } from "@/components/MotionBackdrop";

/**
 * Home featured grid — a deliberate subset, not the full catalog.
 * Bento rhythm: 4 upright Kuicip cards, then two mixed-width rows for
 * the Putri Teko subgroups (RTD and brew).
 */
export function FeaturedProducts() {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);

  return (
    <section ref={scope} className="relative overflow-hidden py-20 lg:py-28">
      <MotionBackdrop variant="kuicip" />
      <div className="container-page relative">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p data-reveal className="kicker">
              {t.featured.kicker}
            </p>
            <h2
              data-reveal
              className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
            >
              {t.featured.title}
            </h2>
            <p data-reveal className="mt-5 text-base leading-relaxed text-espresso-600">
              {t.featured.subtitle}
            </p>
          </div>
          <Link
            data-reveal
            href="/products"
            className="text-sm font-semibold text-gold-600 underline-offset-4 hover:underline"
          >
            {t.common.seeAllProducts} →
          </Link>
        </div>

        {/* Kuicip highlights */}
        <h3 data-reveal className="mt-12 font-display text-xl font-semibold">
          {t.featured.kuicipTitle}
        </h3>
        <ul className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {featuredKuicip.map((p) => (
            <li key={p.slug} data-reveal>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>

        {/* Putri Teko highlights — two subgroups, wide bento cards */}
        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-8">
          <div>
            <h3 data-reveal className="font-display text-xl font-semibold">
              {t.featured.tekoRtdTitle}
            </h3>
            <ul className="mt-5 space-y-4">
              {featuredTekoRtd.map((p) => (
                <li key={p.slug} data-reveal>
                  <ProductCard product={p} size="wide" showServing />
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 data-reveal className="font-display text-xl font-semibold">
              {t.featured.tekoBrewTitle}
            </h3>
            <ul className="mt-5 space-y-4">
              {featuredTekoBrew.map((p) => (
                <li key={p.slug} data-reveal>
                  <ProductCard product={p} size="wide" showServing />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
