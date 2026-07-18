"use client";

import { useLang } from "@/lib/i18n";
import { useReveal } from "@/hooks/useReveal";
import { company } from "@/lib/content";

/**
 * Contact pathways (Claude Design import): centered eyebrow/title, then
 * 4 cards (general/product/export/collaboration), each linking to
 * email. Replaces the previous single CTA + address block on the home
 * page only — the full address/email/WhatsApp block still lives on
 * `/contact`.
 */
export function ContactCTA() {
  const { lang, t } = useLang();
  const scope = useReveal<HTMLElement>([lang]);

  return (
    <section ref={scope} id="contact" className="bg-homeInk px-6 pt-32 sm:px-14 lg:pt-36">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-14 max-w-xl text-center">
          <p data-reveal className="text-[13px] font-extrabold uppercase tracking-[0.08em] text-homeGold">
            {t.homeContact.kicker}
          </p>
          <h2 data-reveal className="mt-3 font-homeDisplay text-4xl text-homeBg sm:text-[46px]">
            {t.homeContact.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 pb-24 sm:grid-cols-2 lg:grid-cols-4">
          {t.homeContact.pathways.map((cw) => (
            <div
              key={cw.title}
              data-reveal
              className="flex flex-col gap-2 rounded-[22px] border border-homeBg/15 bg-homeBg/[0.06] p-[1.625rem] transition-colors hover:bg-homeBg/[0.12]"
            >
              <p className="font-homeDisplay text-[19px] text-homeBg">{cw.title}</p>
              <p className="text-[13px] leading-relaxed text-homeBg/65">{cw.desc}</p>
              <a
                href={`mailto:${company.email}`}
                className="mt-1.5 text-[13px] font-bold text-homeGold"
              >
                {t.homeContact.emailCta} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
