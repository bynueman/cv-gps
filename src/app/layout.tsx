import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

/**
 * Site-wide typography: Lilita One for every heading, Comic Neue
 * (paired with a literal "Comic Sans MS" fallback — see
 * tailwind.config.ts) for body copy. Applied here in the root layout
 * so it's consistent across every page (public site AND admin),
 * not just the homepage.
 *
 * Self-hosted via next/font/local (files in public/fonts/, latin
 * subset only) instead of next/font/google — the build no longer
 * depends on a live fetch to Google Fonts' servers, which had failed
 * mid-build on a flaky connection.
 *
 * Header/Footer/LanguageProvider live in `(site)/layout.tsx`, not
 * here — `/admin/*` sits outside that route group so it never
 * inherits the public nav/footer or the bilingual UI dictionary.
 */
const display = localFont({
  src: "../../public/fonts/lilita-one-400.woff2",
  weight: "400",
  variable: "--font-display",
});

const sans = localFont({
  src: [
    { path: "../../public/fonts/comic-neue-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/comic-neue-700.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-sans",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://gpsfood.id";
const SITE_NAME = "CV Gama Putra Santosa";
const SITE_DESCRIPTION =
  "Perusahaan produksi pangan dari Sleman, Yogyakarta — rumah bagi keripik singkong Kuicip dan minuman tradisional Putri Teko.";

// TODO: bilingual metadata (hreflang id/en alternates) is future-scoped —
// the site currently serves one canonical URL per page regardless of the
// client-side language toggle. Not implemented in this pass.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Kuicip & Putri Teko`,
    template: "%s — CV Gama Putra Santosa",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Kuicip & Putri Teko`,
    description: SITE_DESCRIPTION,
    images: [{ url: "/images/og-default.webp", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Kuicip & Putri Teko`,
    description: SITE_DESCRIPTION,
    images: ["/images/og-default.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
