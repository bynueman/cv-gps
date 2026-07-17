"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { company } from "@/lib/content";

/** Strong closing section on home: contact details + inquiry CTA. */
export function ContactCTA() {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);

  return (
    <section ref={scope} className="border-t border-espresso-900/10 bg-cream-50 py-20 lg:py-24">
      <div className="container-page grid items-center gap-10 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p data-reveal className="kicker">
            {t.contactSection.kicker}
          </p>
          <h2
            data-reveal
            className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
          >
            {t.contactSection.ctaTitle}
          </h2>
          <p data-reveal className="mt-4 max-w-lg text-base leading-relaxed text-espresso-600">
            {t.contactSection.ctaBody}
          </p>
          <div data-reveal className="mt-7 flex flex-wrap gap-3">
            <Link href="/contact" className="btn-primary">
              {t.contactSection.ctaButton}
            </Link>
            <a href={company.whatsappHref} className="btn-outline">
              WhatsApp
            </a>
          </div>
        </div>
        <address data-reveal className="not-italic lg:col-span-5">
          <div className="rounded-3xl border border-espresso-900/10 bg-cream-100 p-7 text-sm leading-relaxed shadow-card">
            <p className="font-display text-lg font-semibold">{company.name}</p>
            <p className="mt-2 text-espresso-600">{company.location[lang]}</p>
            <p className="mt-4">
              <a href={`mailto:${company.email}`} className="font-medium hover:text-gold-700">
                {company.email}
              </a>
            </p>
            <p className="mt-1">
              <a href={company.whatsappHref} className="font-medium hover:text-gold-700">
                {company.whatsapp}
              </a>
            </p>
          </div>
        </address>
      </div>
    </section>
  );
}
