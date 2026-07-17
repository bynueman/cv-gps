"use client";

import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { tekoByPackaging } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { MotionBackdrop } from "@/components/MotionBackdrop";

/**
 * Putri Teko category page, organized by the real packaging forms in
 * the photo set: a light panel for RTD bottles, then a dark brew panel
 * with three sub-groups — sachet boxes, jar blends, and the practical
 * spice pack.
 */
export function TekoCatalog() {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);

  const botol = tekoByPackaging("botol");
  const kotak = tekoByPackaging("kotak");
  const toples = tekoByPackaging("toples");
  const kemasan = tekoByPackaging("kemasan");

  return (
    <>
      <PageHeader
        kicker={t.tekoPage.kicker}
        title={t.tekoPage.title}
        lede={t.tekoPage.subtitle}
        variant="teko"
        deps={[lang]}
      />

      <section ref={scope} className="pb-20 lg:pb-28">
        <div className="container-page space-y-16">
          {/* Botol · ready to drink — light panel */}
          <div className="relative overflow-hidden rounded-3xl border border-espresso-900/10 bg-cream-50 p-7 shadow-card sm:p-10">
            <MotionBackdrop variant="teko" />
            <div className="relative">
              <h2 data-reveal className="font-display text-2xl font-semibold">
                {t.tekoPage.rtdTitle}
              </h2>
              <p data-reveal className="mt-2 max-w-xl text-sm leading-relaxed text-espresso-600">
                {t.tekoPage.rtdBody}
              </p>
              <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {botol.map((p) => (
                  <li key={p.slug} data-reveal>
                    <ProductCard product={p} showServing />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Brew at home — dark panel with packaging sub-groups */}
          <div className="relative overflow-hidden rounded-3xl bg-espresso-900 p-7 text-cream-100 shadow-card sm:p-10">
            <MotionBackdrop variant="teko" />
            <div className="relative">
              <h2 data-reveal className="font-display text-2xl font-semibold">
                {t.tekoPage.brewTitle}
              </h2>
              <p data-reveal className="mt-2 max-w-xl text-sm leading-relaxed text-cream-200/80">
                {t.tekoPage.brewBody}
              </p>

              {/* Kotak sachet */}
              <div className="mt-9">
                <h3 data-reveal className="font-display text-lg font-semibold text-turmeric">
                  {t.tekoPage.packs.kotak.title}
                </h3>
                <p data-reveal className="mt-1 text-sm text-cream-200/70">
                  {t.tekoPage.packs.kotak.body}
                </p>
                <ul className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {kotak.map((p) => (
                    <li key={p.slug} data-reveal>
                      <ProductCard product={p} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Toples racikan */}
              <div className="mt-10">
                <h3 data-reveal className="font-display text-lg font-semibold text-turmeric">
                  {t.tekoPage.packs.toples.title}
                </h3>
                <p data-reveal className="mt-1 text-sm text-cream-200/70">
                  {t.tekoPage.packs.toples.body}
                </p>
                <ul className="mt-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
                  {toples.map((p) => (
                    <li key={p.slug} data-reveal>
                      <ProductCard product={p} />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Kemasan praktis */}
              <div className="mt-10">
                <h3 data-reveal className="font-display text-lg font-semibold text-turmeric">
                  {t.tekoPage.packs.kemasan.title}
                </h3>
                <p data-reveal className="mt-1 text-sm text-cream-200/70">
                  {t.tekoPage.packs.kemasan.body}
                </p>
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {kemasan.map((p) => (
                    <li key={p.slug} data-reveal>
                      <ProductCard product={p} size="wide" showServing />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <p data-reveal className="text-xs italic text-espresso-500">
            {t.tekoPage.groupNote}
          </p>
        </div>
      </section>
    </>
  );
}
