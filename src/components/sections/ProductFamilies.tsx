"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { brands, kuicipProducts, putriTekoProducts } from "@/lib/content";
import { ProductPackshot } from "@/components/ProductPackshot";

/**
 * Split storytelling: two worlds under one company. Kuicip panel is
 * bright and energetic; Putri Teko panel is dark and warm. Each leads
 * to its category page.
 */
export function ProductFamilies() {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);

  return (
    <section ref={scope} className="py-4 pb-20 lg:pb-28">
      <div className="container-page">
        <div className="max-w-2xl">
          <p data-reveal className="kicker">
            {t.families.kicker}
          </p>
          <h2
            data-reveal
            className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
          >
            {t.families.title}
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {/* Kuicip world */}
          <Link
            data-reveal
            href={brands.kuicip.href}
            className="group relative flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-3xl bg-gold-400/90 p-8 text-espresso-950 shadow-card transition-shadow hover:shadow-lift sm:p-10"
          >
            <span
              className="absolute -right-14 -top-14 h-48 w-48 rounded-full bg-cream-50/30 transition-transform duration-500 group-hover:scale-125"
              aria-hidden="true"
            />
            <div className="relative">
              <h3 className="font-display text-4xl font-bold tracking-tight">{brands.kuicip.name}</h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-espresso-800/80">
                {brands.kuicip.tag[lang]}
              </p>
              <p className="mt-5 font-display text-xl font-semibold">{t.families.kuicip.lead}</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-espresso-800">
                {t.families.kuicip.body}
              </p>
            </div>
            <div className="relative mt-8 flex items-end justify-between gap-6">
              <span className="btn-dark !px-5 !py-2.5">{t.families.kuicip.cta} →</span>
              <div className="flex w-40 items-end sm:w-48">
                <div className="w-1/2 -rotate-6 drop-shadow-md transition-transform duration-300 group-hover:-translate-y-1">
                  <ProductPackshot product={kuicipProducts[1]} lang={lang} />
                </div>
                <div className="z-10 -ml-4 w-[58%] drop-shadow-md transition-transform duration-300 group-hover:-translate-y-2">
                  <ProductPackshot product={kuicipProducts[6]} lang={lang} />
                </div>
              </div>
            </div>
          </Link>

          {/* Putri Teko world */}
          <Link
            data-reveal
            href={brands["putri-teko"].href}
            className="group relative flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-3xl bg-espresso-900 p-8 text-cream-100 shadow-card transition-shadow hover:shadow-lift sm:p-10"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 280 120"
              fill="none"
              className="absolute -right-10 top-6 w-64 opacity-25 transition-transform duration-500 group-hover:translate-x-2"
            >
              <path d="M8 112 C60 30 200 20 272 64" stroke="#C06B2D" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 12" />
            </svg>
            <div className="relative">
              <h3 className="font-display text-4xl font-bold tracking-tight text-turmeric">
                {brands["putri-teko"].name}
              </h3>
              <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-cream-200/70">
                {brands["putri-teko"].tag[lang]}
              </p>
              <p className="mt-5 font-display text-xl font-semibold">{t.families.teko.lead}</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-cream-200/85">
                {t.families.teko.body}
              </p>
            </div>
            <div className="relative mt-8 flex items-end justify-between gap-6">
              <span className="btn-primary !px-5 !py-2.5">{t.families.teko.cta} →</span>
              <div className="flex w-36 items-end gap-2 sm:w-44">
                <div className="w-[42%] drop-shadow-md transition-transform duration-300 group-hover:-translate-y-1">
                  <ProductPackshot product={putriTekoProducts[1]} lang={lang} />
                </div>
                <div className="w-[58%] drop-shadow-md transition-transform duration-300 group-hover:-translate-y-2">
                  <ProductPackshot product={putriTekoProducts[3]} lang={lang} />
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
