"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useLang } from "@/lib/i18n";
import { brands, groupShots, logos } from "@/lib/content";
import { ChipSVG } from "@/components/graphics/ChipSVG";
import { SteamSVG } from "@/components/graphics/SteamSVG";

/** Chips scattered above the pouch cluster; positioned in CSS, animated
 *  by the pinned scrub timeline as if emerging from the opened ziplock. */
const chips = [
  { left: "6%", top: "2%", size: "w-9", color: "#E8B44A", rot: -24 },
  { left: "22%", top: "-6%", size: "w-11", color: "#D9442E", rot: 12 },
  { left: "40%", top: "-10%", size: "w-8", color: "#E8B44A", rot: -8 },
  { left: "52%", top: "-2%", size: "w-12", color: "#C05A2E", rot: 28 },
  { left: "13%", top: "-13%", size: "w-7", color: "#3E8E52", rot: 40 },
];

export function Hero() {
  const { lang, t } = useLang();
  const scope = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia(scope);

    /* Full choreography — desktop, motion allowed:
       load-in for copy + a short pinned scrub story for the visual. */
    mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1024px)", () => {
      gsap.fromTo(
        "[data-hero-copy]",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out" }
      );
      gsap.fromTo(
        "[data-hero-pouch], [data-hero-bottle]",
        { autoAlpha: 0, y: 50 },
        { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.08, ease: "power3.out", delay: 0.35 }
      );

      // prepare steam paths for the draw-in
      const paths = gsap.utils.toArray<SVGPathElement>(".steam-path");
      paths.forEach((path) => {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
      });

      // pinned storytelling scrub: zip opens → chips emerge → steam blooms
      const story = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scope.current,
          start: "top top",
          end: "+=620",
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
        },
      });

      story
        .fromTo("[data-zip-knob]", { x: 0 }, { x: 168, duration: 0.22 }, 0.02)
        .to("[data-zip-track]", { opacity: 0.25, duration: 0.08 }, 0.12)
        .fromTo(
          "[data-hero-chip]",
          { autoAlpha: 0, y: 80, scale: 0.4, rotation: 0 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotation: (_i, el) => Number((el as HTMLElement).dataset.rot),
            duration: 0.3,
            stagger: 0.045,
            ease: "back.out(1.8)",
          },
          0.16
        )
        .to("[data-hero-pouch]", { y: -12, duration: 0.35, stagger: 0.02 }, 0.2);

      paths.forEach((path, i) => {
        story.to(path, { strokeDashoffset: 0, duration: 0.3 }, 0.34 + i * 0.06);
      });

      story
        .to("[data-hero-bottle]", { y: -10, duration: 0.3 }, 0.4)
        .to("[data-hero-arch]", { scaleY: 1.06, transformOrigin: "bottom", duration: 0.4 }, 0.3)
        .to("[data-scroll-hint]", { autoAlpha: 0, duration: 0.08 }, 0.05);

      // idle loops (not scrubbed): particles + steam float
      gsap.utils.toArray<HTMLElement>("[data-hero-particle]").forEach((p, i) => {
        gsap.fromTo(
          p,
          { y: 14, autoAlpha: 0 },
          {
            y: -22,
            autoAlpha: 0.7,
            duration: 2.4 + i * 0.5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 1.4 + i * 0.4,
          }
        );
      });
      gsap.to("[data-hero-steam]", {
        y: -7,
        duration: 2.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        delay: 1.5,
      });
    });

    /* Simplified — tablet & mobile, motion allowed: no pin, light fades */
    mm.add("(prefers-reduced-motion: no-preference) and (max-width: 1023px)", () => {
      gsap.fromTo(
        "[data-hero-copy], [data-hero-visual]",
        { autoAlpha: 0, y: 24 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "power2.out" }
      );
      gsap.set("[data-scroll-hint]", { autoAlpha: 0 });
    });

    return () => mm.revert();
  }, [lang]);

  return (
    <section ref={scope} className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-28 sm:pt-32">
      <div className="container-page grid items-center gap-14 lg:grid-cols-12">
        {/* Copy */}
        <div className="lg:col-span-6">
          <p data-hero-copy className="kicker">
            {t.hero.kicker}
          </p>
          <h1
            data-hero-copy
            className="mt-4 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl xl:text-6xl"
          >
            {t.hero.title}
          </h1>
          <p data-hero-copy className="mt-6 max-w-xl text-base leading-relaxed text-espresso-600 sm:text-lg">
            {t.hero.subtitle}
          </p>
          <div data-hero-copy className="mt-8 flex flex-wrap gap-3">
            <Link href="/products" className="btn-primary">
              {t.hero.ctaProducts}
            </Link>
            <Link href="/export" className="btn-outline">
              {t.hero.ctaExport}
            </Link>
            <Link href="/contact" className="btn-dark">
              {t.hero.ctaContact}
            </Link>
          </div>
          <div data-hero-copy className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-medium text-espresso-600">
            <span className="flex items-center gap-2.5">
              <Image
                src={logos.kuicip}
                alt={`Logo ${brands.kuicip.name}`}
                width={2560}
                height={1440}
                className="h-7 w-auto"
              />
              {t.hero.lineSnack}
            </span>
            <span className="flex items-center gap-2.5">
              <Image
                src={logos["putri-teko"]}
                alt={`Logo ${brands["putri-teko"].name}`}
                width={1440}
                height={2560}
                className="h-9 w-auto"
              />
              {t.hero.lineBeverage}
            </span>
          </div>
        </div>

        {/* Visual composition: pouch cluster + bottle on layered planes */}
        <div data-hero-visual className="lg:col-span-6">
          <div className="relative mx-auto flex max-w-xl items-end justify-center gap-6 sm:gap-10">
            {/* — Kuicip side — */}
            <div className="relative w-[58%]">
              <div
                data-hero-arch
                className="absolute inset-x-2 bottom-0 top-10 rounded-t-full bg-gold-300/45"
                aria-hidden="true"
              />

              {chips.map((c, i) => (
                <div
                  key={i}
                  data-hero-chip
                  data-rot={c.rot}
                  className={`absolute ${c.size}`}
                  style={{ left: c.left, top: c.top, rotate: `${c.rot}deg` }}
                >
                  <ChipSVG color={c.color} />
                </div>
              ))}

              {/* zip line + slider */}
              <svg
                viewBox="0 0 200 24"
                aria-hidden="true"
                className="absolute -top-1 left-1/2 z-10 w-[70%] -translate-x-1/2"
              >
                <line
                  data-zip-track
                  x1="8"
                  y1="12"
                  x2="192"
                  y2="12"
                  stroke="#9C6508"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="7 6"
                />
                <g data-zip-knob>
                  <rect x="4" y="4" width="20" height="16" rx="5" fill="#3C2B1B" />
                  <rect x="10" y="9" width="8" height="6" rx="2" fill="#F2B234" />
                </g>
              </svg>

              <div className="relative flex items-end justify-center pt-8">
                {/* real transparent cutout: Seaweed · Original · Balado pouch fan */}
                <div data-hero-pouch className="w-full drop-shadow-lg">
                  <Image
                    src={groupShots.kuicip}
                    alt="Kuicip Seaweed, Original, dan Balado"
                    width={1080}
                    height={1350}
                    priority
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>

            {/* — Putri Teko side — */}
            <div className="relative w-[40%] pb-2">
              <div
                data-hero-arch
                className="absolute inset-x-2 bottom-0 top-16 rounded-t-full bg-ginger/25"
                aria-hidden="true"
              />
              <div data-hero-steam className="pointer-events-none absolute -top-14 left-1/2 w-[60%] -translate-x-1/2">
                <SteamSVG className="w-full" />
              </div>
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  data-hero-particle
                  aria-hidden="true"
                  className="absolute h-1.5 w-1.5 rounded-full bg-turmeric opacity-0"
                  style={{ left: `${22 + i * 26}%`, top: `${8 + (i % 2) * 10}%` }}
                />
              ))}
              {/* real transparent cutout: Beras Kencur · Gula Asam · Kunir Asam bottles */}
              <div data-hero-bottle className="relative drop-shadow-lg">
                <Image
                  src={groupShots["putri-teko"]}
                  alt="Putri Teko Beras Kencur, Gula Asam, dan Kunir Asam"
                  width={1080}
                  height={1350}
                  priority
                  className="h-auto w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div
        data-scroll-hint
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-espresso-500 lg:flex"
      >
        <span className="block h-8 w-px bg-espresso-500/40" aria-hidden="true" />
        {t.hero.scrollHint}
      </div>
    </section>
  );
}
