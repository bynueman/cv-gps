"use client";

import Link from "next/link";
import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { featuredArticles } from "@/lib/content";
import { formatDate } from "@/components/ArticleCard";

/**
 * News bento grid (Claude Design import): one large 3×2 image card
 * plus two stacked cards, reusing the same `featuredArticles` data as
 * before — just a new grid shape and a leaner card (no excerpt).
 */
export function NewsPreview() {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);
  const [hero, ...rest] = featuredArticles;

  return (
    <section ref={scope} className="bg-homePanel px-6 py-32 sm:px-14 lg:py-36">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p data-reveal className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-homeTerracotta">
              {t.newsSection.kicker}
            </p>
            <h2 data-reveal className="mt-3 font-homeDisplay text-4xl text-homeInk sm:text-[46px]">
              {t.newsSection.title}
            </h2>
          </div>
          <Link data-reveal href="/news" className="font-bold text-homeTerracotta">
            {t.common.seeAll} →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-6 lg:auto-rows-[230px]">
          {hero ? (
            <Link
              data-reveal
              href={`/news/${hero.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl bg-homeCard transition-transform duration-300 hover:-translate-y-1.5 lg:col-[1/4] lg:row-[1/3]"
            >
              <div className="relative h-[270px] flex-none">
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
                <p className="font-homeDisplay text-[19px] leading-snug text-homeInk">{hero.title[lang]}</p>
              </div>
            </Link>
          ) : null}

          {rest.map((a, i) => (
            <Link
              key={a.slug}
              data-reveal
              href={`/news/${a.slug}`}
              className={`group flex flex-col overflow-hidden rounded-3xl bg-homeCard transition-transform duration-300 hover:-translate-y-1.5 lg:col-[4/7] ${
                i === 0 ? "lg:row-[1/2]" : "lg:row-[2/3]"
              }`}
            >
              <div className="relative h-[120px] flex-none">
                {a.image ? (
                  <Image
                    src={a.image}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 36rem, 90vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : null}
              </div>
              <div className="flex flex-col gap-1.5 p-5">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.04em] text-homeTerracotta">
                  {a.category[lang]} · {formatDate(a.date, lang)}
                </p>
                <p className="font-homeDisplay text-base leading-snug text-homeInk">{a.title[lang]}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
