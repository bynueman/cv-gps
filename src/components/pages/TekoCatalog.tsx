"use client";

import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { putriTekoProducts } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { ProductCard } from "@/components/ProductCard";
import { MotionBackdrop } from "@/components/MotionBackdrop";

/**
 * Putri Teko category page: catalog split into ready-to-drink and
 * brew-at-home subgroups, each with its own heading and mood.
 */
export function TekoCatalog() {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);

  const rtd = putriTekoProducts.filter((p) => p.group === "rtd");
  const brew = putriTekoProducts.filter((p) => p.group === "brew");

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
          {/* Ready to drink */}
          <div className="relative overflow-hidden rounded-3xl border border-espresso-900/10 bg-cream-50 p-7 shadow-card sm:p-10">
            <MotionBackdrop variant="teko" />
            <div className="relative">
              <h2 data-reveal className="font-display text-2xl font-semibold">
                {t.tekoPage.rtdTitle}
              </h2>
              <p data-reveal className="mt-2 max-w-xl text-sm leading-relaxed text-espresso-600">
                {t.tekoPage.rtdBody}
              </p>
              <ul className="mt-7 grid gap-4 lg:grid-cols-3">
                {rtd.map((p) => (
                  <li key={p.slug} data-reveal>
                    <ProductCard product={p} showServing />
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Brew at home — warmer, darker mood */}
          <div className="relative overflow-hidden rounded-3xl bg-espresso-900 p-7 text-cream-100 shadow-card sm:p-10">
            <MotionBackdrop variant="teko" />
            <div className="relative">
              <h2 data-reveal className="font-display text-2xl font-semibold">
                {t.tekoPage.brewTitle}
              </h2>
              <p data-reveal className="mt-2 max-w-xl text-sm leading-relaxed text-cream-200/80">
                {t.tekoPage.brewBody}
              </p>
              <ul className="mt-7 grid gap-4 lg:grid-cols-3">
                {brew.map((p) => (
                  <li key={p.slug} data-reveal>
                    <ProductCard product={p} showServing />
                  </li>
                ))}
              </ul>
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
