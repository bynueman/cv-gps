"use client";

import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { MotionBackdrop } from "@/components/MotionBackdrop";

/**
 * Editorial intro: large statement + body on the left, a compact fact
 * panel (spatial inset block, not an icon row) on the right.
 */
export function CompanyIntro() {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);

  return (
    <section ref={scope} className="relative border-y border-espresso-900/10 bg-cream-50">
      <MotionBackdrop variant="neutral" />
      <div className="container-page relative grid gap-12 py-20 lg:grid-cols-12 lg:gap-16 lg:py-28">
        <div className="lg:col-span-7">
          <p data-reveal className="kicker">
            {t.intro.kicker}
          </p>
          <h2
            data-reveal
            className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
          >
            {t.intro.title}
          </h2>
          <p data-reveal className="mt-6 max-w-2xl text-base leading-relaxed text-espresso-600 sm:text-lg">
            {t.intro.body}
          </p>
        </div>

        {/* fact panel — deliberately offset for a layered, spatial feel */}
        <div data-reveal className="lg:col-span-5 lg:mt-14">
          <dl className="relative rounded-3xl border border-espresso-900/10 bg-cream-100 p-7 shadow-card sm:p-8">
            <span
              className="absolute -left-3 -top-3 h-10 w-10 rounded-2xl bg-gold-400/70"
              aria-hidden="true"
            />
            {t.intro.facts.map((fact, i) => (
              <div
                key={fact.label}
                className={`flex items-baseline justify-between gap-4 py-3.5 ${
                  i > 0 ? "border-t border-espresso-900/10" : ""
                }`}
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.16em] text-espresso-500">
                  {fact.label}
                </dt>
                <dd className="text-right text-sm font-semibold">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
