"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";

/**
 * "About" bento grid (Claude Design import) — 7 asymmetric cards on a
 * 6-column grid at desktop width; a plain single column below `lg`.
 */
export function CompanyIntro() {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);

  return (
    <section id="about" ref={scope} className="mx-auto max-w-6xl px-6 py-32 sm:px-14 lg:py-36">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p data-reveal className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-homeTerracotta">
            {t.intro.kicker}
          </p>
          <h2 data-reveal className="mt-3 max-w-xl font-homeDisplay text-4xl text-homeInk sm:text-[46px]">
            {t.intro.title}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-6 lg:auto-rows-[170px]">
        {/* card1 — dark location card */}
        <div
          data-reveal
          className="flex flex-col justify-between rounded-[28px] bg-homeInk p-9 shadow-[0_24px_50px_-20px_oklch(27%_0.045_50_/_0.4)] lg:col-[1/4] lg:row-[1/3]"
        >
          <span className="grid h-[3.25rem] w-[3.25rem] place-items-center rounded-full bg-homeGold text-2xl">📍</span>
          <div>
            <p className="mb-2 font-homeDisplay text-2xl text-homeBg">{t.intro.card1.title}</p>
            <p className="text-[15px] leading-relaxed text-homeBg/85">{t.intro.card1.desc}</p>
          </div>
        </div>

        {/* card2 */}
        <div
          data-reveal
          className="flex flex-col justify-center gap-2 rounded-[28px] bg-homeCard p-8 lg:col-[4/7] lg:row-[1/2]"
        >
          <p className="font-homeDisplay text-2xl text-homeInk">{t.intro.card2.title}</p>
          <p className="text-sm leading-relaxed text-homeInk2">{t.intro.card2.desc}</p>
        </div>

        {/* card3 — gold */}
        <div
          data-reveal
          className="flex flex-col justify-center gap-1.5 rounded-[28px] bg-homeGold p-7 lg:col-[4/6] lg:row-[2/3]"
        >
          <p className="font-homeDisplay text-[22px] text-homeInk">{t.intro.card3.title}</p>
          <p className="text-[13px] leading-relaxed text-homeInk/75">{t.intro.card3.desc}</p>
        </div>

        {/* card4 — stat */}
        <div
          data-reveal
          className="flex flex-col items-center justify-center gap-1 rounded-[28px] border-[1.5px] border-homeInk/15 bg-homeBg p-5 text-center lg:col-[6/7] lg:row-[2/3]"
        >
          <p className="font-homeDisplay text-[34px] text-homeTerracotta">{t.intro.card4Value}</p>
          <p className="text-xs font-bold text-homeInk2">{t.intro.card4Label}</p>
        </div>

        {/* card5 */}
        <div
          data-reveal
          className="flex flex-col justify-center gap-1.5 rounded-[24px] bg-homeCard p-[1.625rem] lg:col-[1/3] lg:row-[3/4]"
        >
          <p className="font-homeDisplay text-xl text-homeInk">{t.intro.card5.title}</p>
          <p className="text-[13px] text-homeInk2">{t.intro.card5.desc}</p>
        </div>

        {/* card6 */}
        <div
          data-reveal
          className="flex flex-col justify-center gap-1.5 rounded-[24px] bg-homeCard p-[1.625rem] lg:col-[3/5] lg:row-[3/4]"
        >
          <p className="font-homeDisplay text-xl text-homeInk">{t.intro.card6.title}</p>
          <p className="text-[13px] text-homeInk2">{t.intro.card6.desc}</p>
        </div>

        {/* card7 — dark, CTA */}
        <div
          data-reveal
          className="flex flex-col justify-center gap-2 rounded-[24px] bg-homeInk p-[1.625rem] lg:col-[5/7] lg:row-[3/4]"
        >
          <p className="font-homeDisplay text-xl text-homeBg">{t.intro.card7Title}</p>
          <Link href="/contact" className="text-[13px] font-bold text-homeGold">
            {t.intro.card7Cta} →
          </Link>
        </div>
      </div>
    </section>
  );
}
