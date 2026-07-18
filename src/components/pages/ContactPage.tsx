"use client";

import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { company } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { ContactForm } from "@/components/ContactForm";

/** Contact page: full inquiry form, company info, and a map slot. */
export function ContactPage() {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);
  const info = t.contactSection.info;

  return (
    <>
      <PageHeader
        kicker={t.contactSection.kicker}
        title={t.contactSection.title}
        lede={t.contactSection.subtitle}
        deps={[lang]}
      />

      <section ref={scope} className="pb-20 lg:pb-28">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div data-reveal className="lg:col-span-7">
            <ContactForm />
          </div>

          <div className="space-y-6 lg:col-span-5">
            <div data-reveal className="rounded-3xl border border-espresso-900/10 bg-cream-50 p-8">
              <h2 className="font-display text-xl font-semibold">{company.name}</h2>
              <dl className="mt-6 space-y-5 text-sm">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-espresso-500">
                    {info.addressLabel}
                  </dt>
                  <dd className="mt-1 leading-relaxed text-espresso-700">
                    {company.address}
                    <span className="mt-1 block text-xs italic text-espresso-500">
                      {info.addressNote}
                    </span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-espresso-500">
                    {info.emailLabel}
                  </dt>
                  <dd className="mt-1">
                    <a href={`mailto:${company.email}`} className="text-espresso-700 hover:text-gold-700">
                      {company.email}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-espresso-500">
                    {info.whatsappLabel}
                  </dt>
                  <dd className="mt-1">
                    <a href={company.whatsappHref} className="text-espresso-700 hover:text-gold-700">
                      {company.whatsapp}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.15em] text-espresso-500">
                    {info.hoursLabel}
                  </dt>
                  <dd className="mt-1 text-espresso-700">{info.hours}</dd>
                </div>
              </dl>
              <a href={company.whatsappHref} className="btn-primary mt-8 w-full">
                WhatsApp →
              </a>
            </div>

            {/* Map slot — swap for an embedded map when the final
                location is confirmed */}
            <div
              data-reveal
              className="flex aspect-[4/3] items-center justify-center rounded-3xl border border-dashed border-espresso-900/25 bg-cream-200/50 p-6 text-center"
            >
              <p className="text-sm font-medium text-espresso-500">{info.mapNote}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
