import type { Metadata } from "next";
import localFont from "next/font/local";
import { LanguageProvider } from "@/lib/i18n";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "./globals.css";

/**
 * Site-wide typography: Lilita One for every heading, Comic Neue
 * (paired with a literal "Comic Sans MS" fallback — see
 * tailwind.config.ts) for body copy. Applied here in the root layout
 * so it's consistent across every page, not just the homepage.
 *
 * Self-hosted via next/font/local (files in public/fonts/, latin
 * subset only) instead of next/font/google — the build no longer
 * depends on a live fetch to Google Fonts' servers, which had failed
 * mid-build on a flaky connection.
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

export const metadata: Metadata = {
  title: {
    default: "CV Gama Putra Santosa — Kuicip & Putri Teko",
    template: "%s — CV Gama Putra Santosa",
  },
  description:
    "Perusahaan produksi pangan dari Sleman, Yogyakarta — rumah bagi keripik singkong Kuicip dan minuman tradisional Putri Teko.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${display.variable} ${sans.variable}`}>
      <body>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
