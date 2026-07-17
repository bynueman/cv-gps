"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { brands, company } from "@/lib/content";
import { LangSwitch } from "@/components/LangSwitch";

export function Footer() {
  const { lang, t } = useLang();
  const year = new Date().getFullYear();

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/products", label: t.nav.products },
    { href: "/export", label: t.nav.export },
    { href: "/news", label: t.nav.news },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <footer className="bg-espresso-950 text-cream-200">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-500 font-display text-sm font-bold text-espresso-950">
              GPS
            </span>
            <span className="font-display text-lg font-semibold text-cream-100">
              {company.name}
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-cream-200/70">
            {t.footer.tagline}
          </p>
        </div>

        <nav aria-label="Footer">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            {t.footer.linksTitle}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-cream-200/80 hover:text-cream-100">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Brands">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            {t.footer.brandsTitle}
          </h3>
          <ul className="mt-4 space-y-2.5">
            {Object.values(brands).map((b) => (
              <li key={b.key}>
                <Link href={b.href} className="text-sm text-cream-200/80 hover:text-cream-100">
                  {b.name}
                  <span className="block text-xs text-cream-200/50">{b.tag[lang]}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            {t.footer.contactTitle}
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-cream-200/80">
            <li>{company.location[lang]}</li>
            <li>
              <a href={`mailto:${company.email}`} className="hover:text-cream-100">
                {company.email}
              </a>
            </li>
            <li>
              <a href={company.whatsappHref} className="hover:text-cream-100">
                {company.whatsapp}
              </a>
            </li>
          </ul>
          <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold-400">
            {t.footer.langTitle}
          </h3>
          <div className="mt-3">
            <LangSwitch tone="dark" />
          </div>
        </div>
      </div>

      <div className="border-t border-cream-100/10">
        <div className="container-page flex flex-col gap-1 py-5 text-xs text-cream-200/50 sm:flex-row sm:items-center sm:justify-between">
          <span>
            © {year} {company.name}. {t.footer.copyright}
          </span>
          <span>Sleman · DI Yogyakarta · Indonesia</span>
        </div>
      </div>
    </footer>
  );
}
