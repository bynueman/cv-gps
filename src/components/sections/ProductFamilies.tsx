"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { brands, groupShots, logos } from "@/lib/content";

/**
 * Split storytelling: two worlds under one company. Kuicip panel is
 * bright and energetic; Putri Teko panel is dark and warm. Each panel
 * carries its real brand logo and the transparent group cutout of its
 * actual products, and leads to its category page.
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
              <Image
                src={logos.kuicip}
                alt={`Logo ${brands.kuicip.name}`}
                width={2560}
                height={1440}
                className="h-12 w-auto drop-shadow-sm sm:h-14"
              />
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-espresso-800/80">
                {brands.kuicip.tag[lang]}
              </p>
              <p className="mt-5 font-display text-xl font-semibold">{t.families.kuicip.lead}</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-espresso-800">
                {t.families.kuicip.body}
              </p>
            </div>
            <div className="relative mt-8 flex items-end justify-between gap-6">
              <span className="btn-dark !px-5 !py-2.5">{t.families.kuicip.cta} →</span>
              <div className="w-44 drop-shadow-md transition-transform duration-300 group-hover:-translate-y-2 sm:w-52">
                <Image
                  src={groupShots.kuicip}
                  alt="Kuicip Seaweed, Original, dan Balado"
                  width={1080}
                  height={1350}
                  className="h-auto w-full"
                />
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
            <div className="relative flex items-start gap-5">
              <Image
                src={logos["putri-teko"]}
                alt={`Logo ${brands["putri-teko"].name}`}
                width={1440}
                height={2560}
                className="h-24 w-auto drop-shadow-sm sm:h-28"
              />
              <div>
                <h3 className="font-display text-4xl font-bold tracking-tight text-turmeric">
                  {brands["putri-teko"].name}
                </h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.18em] text-cream-200/70">
                  {brands["putri-teko"].tag[lang]}
                </p>
              </div>
            </div>
            <div className="relative">
              <p className="mt-5 font-display text-xl font-semibold">{t.families.teko.lead}</p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-cream-200/85">
                {t.families.teko.body}
              </p>
            </div>
            <div className="relative mt-8 flex items-end justify-between gap-6">
              <span className="btn-primary !px-5 !py-2.5">{t.families.teko.cta} →</span>
              <div className="w-40 drop-shadow-md transition-transform duration-300 group-hover:-translate-y-2 sm:w-48">
                <Image
                  src={groupShots["putri-teko"]}
                  alt="Botol Putri Teko Beras Kencur, Gula Asam, dan Kunir Asam"
                  width={1080}
                  height={1350}
                  className="h-auto w-full"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
