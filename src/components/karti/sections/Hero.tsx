"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, ArchitecturalArcIcon } from "@/components/icons";
import { HERO } from "@/lib/content";
import { EVENT_MATCHCALL, matchCallHref } from "@/lib/links";
import { RootsVisual } from "@/components/karti/RootsVisual";
import { SpotlightPortrait } from "@/components/karti/SpotlightPortrait";
import { MagneticButton } from "@/components/karti/MagneticButton";

/* Hero: het gewortelde portret (Dawn)
   Concept B uit de designrichting: een organisch groeiend wortelsysteem
   in goud op Sandstone. SVG-basis voor iedereen (ook in-app browsers,
   ook zonder JS), WebGL-diepte alleen op apparaten die het aankunnen.
   Mobiel staat de volledige waardepropositie plus match-call CTA boven
   de vouw; het portret wortelt direct daaronder in het stelsel. */
export function Hero() {
  // Split pull quote: main text in bark, "Over jezelf." in deep rose
  const pull = HERO.pullQuote;
  const accent = "Over jezelf.";
  const pullHead = pull.endsWith(accent)
    ? pull.slice(0, pull.length - accent.length)
    : pull;

  const enter = (delay: number) =>
    ({ "--enter-delay": `${delay}ms` } as CSSProperties);

  return (
    <section className="relative overflow-hidden bg-[#f2eae0]">
      {/* Wortelsysteem: groeit vanuit de grond onder het portret;
          op desktop gemaskeerd weg van de contentkolom */}
      <RootsVisual
        fadeLeft
        className="absolute inset-x-0 bottom-0 h-[38%] sm:h-[50%] lg:h-[68%]"
      />
      <ArchitecturalArcIcon
        aria-hidden
        className="absolute -right-28 -top-40 w-[560px] h-[560px] text-[#c9a854] opacity-[0.07]"
      />

      <div className="container-wide relative grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-14 lg:gap-20 pt-12 pb-36 sm:pb-40 lg:pt-20 lg:pb-44 min-h-[88vh]">
        {/* Content: waardepropositie + CTA, mobiel als eerste in beeld;
            mobiel gecentreerd, desktop links-editorial */}
        <div className="max-w-[660px] min-w-0 mx-auto lg:mx-0 text-center lg:text-left">
          <div className="t6-label text-[#80662c] mb-6 hero-enter-item" style={enter(0)}>
            {HERO.label}
          </div>
          <h1 className="t1-hero text-[#3d3228]" style={{ fontSize: "clamp(34px, 8.4vw, 68px)" }}>
            <span className="hero-enter-item inline-block" style={enter(60)}>
              {HERO.headline[0]}
            </span>
            <br />
            <span className="hero-enter-item inline-block" style={enter(180)}>
              {HERO.headline[1]}
            </span>
          </h1>
          <hr className="gold-divider gold-divider-enter my-7 mx-auto lg:mx-0" style={enter(300)} />
          <p className="t3-quote text-[#3d3228] mb-9 hero-enter-item" style={enter(380)}>
            {pullHead}
            <span style={{ color: "#8b3a4a" }}>{accent}</span>
          </p>
          <div
            className="flex flex-col items-center lg:items-start sm:flex-row sm:flex-wrap sm:justify-center lg:justify-start sm:items-center gap-4 hero-enter-item"
            style={enter(470)}
          >
            <MagneticButton className="w-full sm:w-auto">
              <Link
                href={matchCallHref("hero")}
                className={`btn-primary-lg w-full sm:w-auto ${EVENT_MATCHCALL}`}
              >
                {HERO.primaryCta} <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
            <a href="#methode" className="btn-outline-gold w-full sm:w-auto">
              {HERO.secondaryCta}
            </a>
          </div>
          <div className="t6-label text-[#6e6557] mt-5 hero-enter-item" style={enter(550)}>
            {HERO.ctaSub}
          </div>
          <div
            className="flex items-center justify-center lg:justify-start gap-3 mt-9 hero-enter-item"
            style={enter(630)}
          >
            <span className="gold-dot" aria-hidden />
            <span className="t4-body text-[#2e2622]" style={{ fontSize: "15px" }}>
              {HERO.trustLine}
            </span>
          </div>
        </div>

        {/* Portret in fine-line ringen, geworteld in het stelsel */}
        <div
          className="relative flex justify-center lg:justify-end min-w-0 hero-enter-item"
          style={enter(420)}
        >
          <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[330px] lg:h-[330px] xl:w-[400px] xl:h-[400px]">
            <div
              aria-hidden
              className="absolute -inset-5 rounded-full border border-[#c9a854]/40"
            />
            <div
              aria-hidden
              className="hidden lg:block absolute -inset-10 rounded-full border border-[#c9a854]/20"
            />
            <SpotlightPortrait />
            <div className="absolute -bottom-2 -left-7 gold-dots-cluster" aria-hidden>
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
