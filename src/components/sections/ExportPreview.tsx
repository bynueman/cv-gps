"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { ExportCTA } from "@/components/ExportCTA";

/**
 * Home preview of the export/partnership story: sober B2B blocks and
 * the shared inquiry banner. The full version lives at /export.
 */
export function ExportPreview() {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);

  return (
    <section ref={scope} className="bg-cream-200/60 py-20 lg:py-28">
      <div className="container-page">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <p data-reveal className="kicker">
              {t.exportSection.kicker}
            </p>
            <h2
              data-reveal
              className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
            >
              {t.exportSection.title}
            </h2>
            <p data-reveal className="mt-5 text-base leading-relaxed text-espresso-600">
              {t.exportSection.subtitle}
            </p>
            <Link
              data-reveal
              href="/export"
              className="mt-6 inline-block text-sm font-semibold text-gold-600 underline-offset-4 hover:underline"
            >
              {t.common.seeAll} →
            </Link>
          </div>

          <div className="lg:col-span-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:gap-5">
              {t.exportSection.blocks.map((block, i) => (
                <article
                  key={block.title}
                  data-reveal
                  className="rounded-2xl border border-espresso-900/10 bg-cream-50 p-6 transition-shadow duration-300 hover:shadow-card sm:p-7"
                >
                  <span className="font-display text-sm font-semibold text-gold-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold">{block.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-espresso-600">{block.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div data-reveal className="mt-14">
          <ExportCTA />
        </div>
      </div>
    </section>
  );
}
