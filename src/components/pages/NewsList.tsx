"use client";

import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { articles } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { ArticleCard } from "@/components/ArticleCard";

/**
 * News & Activities listing: magazine layout with one leading article
 * and an editorial grid. Calmer motion language than product pages.
 */
export function NewsList() {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);
  const [lead, ...rest] = articles;

  return (
    <>
      <PageHeader
        kicker={t.newsSection.kicker}
        title={t.newsSection.title}
        lede={t.newsSection.subtitle}
        deps={[lang]}
      />

      <section ref={scope} className="pb-20 lg:pb-28">
        <div className="container-page">
          {lead ? (
            <div data-reveal className="border-b border-espresso-900/10 pb-12">
              <ArticleCard article={lead} size="featured" />
            </div>
          ) : (
            <p className="text-sm text-espresso-600">{t.newsSection.empty}</p>
          )}

          <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <div key={article.slug} data-reveal>
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
