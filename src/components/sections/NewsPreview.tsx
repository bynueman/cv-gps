"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import type { Article } from "@/lib/content";
import { formatDate } from "@/components/ArticleCard";

/**
 * News bento (Claude Design import, re-tuned for real photos): one
 * large hero card plus two stacked cards. Images use `aspect-[3/4]`
 * (the real packshots' own proportions, since articles reuse product
 * photos) instead of the mockup's literal pixel heights, which
 * cropped portrait photos down to an unrecognizable sliver.
 */
export function NewsPreview({ articles }: { articles: Article[] }) {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);
  const [hero, ...rest] = articles;

  // Nothing published yet (News & Activities is pending the admin
  // panel) — skip the section entirely rather than showing an empty
  // grid with a dangling "see all" link.
  if (!hero) return null;

  return (
    <section ref={scope} className="bg-homePanel px-6 py-32 sm:px-14 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p data-reveal className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-homeTerracotta">
              {t.newsSection.kicker}
            </p>
            <h2 data-reveal className="mt-3 font-display text-4xl text-homeInk sm:text-[46px]">
              {t.newsSection.title}
            </h2>
          </div>
          <Link data-reveal href="/news" className="font-bold text-homeTerracotta">
            {t.common.seeAll} →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          {hero ? (
            <Link
              data-reveal
              href={`/news/${hero.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl bg-homeCard transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div className="relative aspect-[3/4] flex-none overflow-hidden sm:aspect-[4/3]">
                {hero.image ? (
                  <Image
                    src={hero.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 36rem, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>
              <div className="flex flex-col gap-1.5 p-6">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.04em] text-homeTerracotta">
                  {hero.category[lang]} · {formatDate(hero.date, lang)}
                </p>
                <p className="font-display text-xl leading-snug text-homeInk">{hero.title[lang]}</p>
              </div>
            </Link>
          ) : null}

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {rest.map((a) => (
              <Link
                key={a.slug}
                data-reveal
                href={`/news/${a.slug}`}
                className="group flex gap-4 overflow-hidden rounded-3xl bg-homeCard p-4 transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="relative aspect-[3/4] w-24 flex-none overflow-hidden rounded-xl sm:w-28">
                  {a.image ? (
                    <Image
                      src={a.image}
                      alt=""
                      fill
                      sizes="8rem"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : null}
                </div>
                <div className="flex flex-col justify-center gap-1.5 py-1">
                  <p className="text-[11px] font-extrabold uppercase tracking-[0.04em] text-homeTerracotta">
                    {a.category[lang]} · {formatDate(a.date, lang)}
                  </p>
                  <p className="font-display text-base leading-snug text-homeInk">{a.title[lang]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
