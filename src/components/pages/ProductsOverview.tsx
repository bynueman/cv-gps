"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { brands, featuredKuicip, featuredTekoBrew, featuredTekoRtd, logos } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { MotionBackdrop } from "@/components/MotionBackdrop";

/** Category-first overview: two brand clusters, each with a short
 *  story, selected highlights, and a CTA to its category page. */
export function ProductsOverview() {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);

  return (
    <>
      <PageHeader
        kicker={t.productsPage.kicker}
        title={t.productsPage.title}
        lede={t.productsPage.subtitle}
        deps={[lang]}
      />

      <section ref={scope} className="pb-20 lg:pb-28">
        <div className="container-page space-y-16">
          {/* Kuicip cluster */}
          <div className="relative overflow-hidden rounded-3xl border border-espresso-900/10 bg-cream-50 p-7 shadow-card sm:p-10">
            <MotionBackdrop variant="kuicip" />
            <div className="relative">
              <div data-reveal className="flex flex-wrap items-center gap-x-5 gap-y-2">
                <Image
                  src={logos.kuicip}
                  alt={`Logo ${brands.kuicip.name}`}
                  width={2560}
                  height={1440}
                  className="h-12 w-auto sm:h-14"
                />
                <span className="text-sm font-semibold uppercase tracking-[0.18em] text-espresso-600">
                  {brands.kuicip.tag[lang]}
                </span>
              </div>
              <p data-reveal className="mt-4 max-w-2xl text-base leading-relaxed text-espresso-600">
                {brands.kuicip.story[lang]}
              </p>
              <p data-reveal className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-espresso-500">
                {t.productsPage.highlightsLabel}
              </p>
              <ul className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {featuredKuicip.map((p) => (
                  <li key={p.slug} data-reveal>
                    <ProductCard product={p} />
                  </li>
                ))}
              </ul>
              <div data-reveal className="mt-8">
                <Link href={brands.kuicip.href} className="btn-primary">
                  {t.common.exploreBrand} {brands.kuicip.name} →
                </Link>
              </div>
            </div>
          </div>

          {/* Putri Teko cluster */}
          <div className="relative overflow-hidden rounded-3xl bg-espresso-900 p-7 text-cream-100 shadow-card sm:p-10">
            <MotionBackdrop variant="teko" />
            <div className="relative">
              <div data-reveal className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <Image
                  src={logos["putri-teko"]}
                  alt={`Logo ${brands["putri-teko"].name}`}
                  width={1440}
                  height={2560}
                  className="h-20 w-auto sm:h-24"
                />
                <div>
                  <h2 className="font-display text-4xl font-bold tracking-tight text-turmeric">
                    {brands["putri-teko"].name}
                  </h2>
                  <span className="text-sm font-semibold uppercase tracking-[0.18em] text-cream-200/70">
                    {brands["putri-teko"].tag[lang]}
                  </span>
                </div>
              </div>
              <p data-reveal className="mt-4 max-w-2xl text-base leading-relaxed text-cream-200/85">
                {brands["putri-teko"].story[lang]}
              </p>
              <p data-reveal className="mt-8 text-xs font-semibold uppercase tracking-[0.2em] text-cream-200/60">
                {t.productsPage.highlightsLabel}
              </p>
              <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                {[...featuredTekoRtd.slice(0, 1), ...featuredTekoBrew.slice(0, 1)].map((p) => (
                  <li key={p.slug} data-reveal>
                    <ProductCard product={p} size="wide" showServing />
                  </li>
                ))}
              </ul>
              <div data-reveal className="mt-8">
                <Link href={brands["putri-teko"].href} className="btn-primary">
                  {t.common.exploreBrand} {brands["putri-teko"].name} →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
