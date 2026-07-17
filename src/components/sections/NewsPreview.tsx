"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { featuredArticles } from "@/lib/content";
import { ArticleCard } from "@/components/ArticleCard";

/** Three featured articles on home, linking to the full listing. */
export function NewsPreview() {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);

  return (
    <section ref={scope} className="py-20 lg:py-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p data-reveal className="kicker">
              {t.newsSection.kicker}
            </p>
            <h2
              data-reveal
              className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
            >
              {t.newsSection.title}
            </h2>
          </div>
          <Link
            data-reveal
            href="/news"
            className="text-sm font-semibold text-gold-600 underline-offset-4 hover:underline"
          >
            {t.common.seeAll} →
          </Link>
        </div>

        <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {featuredArticles.map((article) => (
            <div key={article.slug} data-reveal>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
