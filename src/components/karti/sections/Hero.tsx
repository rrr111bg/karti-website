"use client";

import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, ArchitecturalArcIcon } from "@/components/icons";
import { HERO } from "@/lib/content";
import { EVENT_MATCHCALL, matchCallHref } from "@/lib/links";
import { RootsVisual } from "@/components/karti/RootsVisual";
import { SpotlightPortrait } from "@/components/karti/SpotlightPortrait";
import { MagneticButton } from "@/components/karti/MagneticButton";
import { RevealWords } from "@/components/karti/RevealWords";
import { PortraitArcs } from "@/components/karti/PortraitArcs";
import { ParallaxLayer } from "@/components/karti/motion/ParallaxLayer";

/* Hero: het gewortelde portret (Dawn), elevatie-compositie.
   Asymmetrische split; het portret groeit op xl voorbij de gridlijn en
   wordt omringd door drie architecturale deelbogen met scroll-parallax.
   Exact vier tekstelementen (eyebrow, kop, subtekst, CTA-paar); de
   trustline en de-risk-tokens leven in de TrustBand hieronder.
   Het wortelstelsel parallaxt alleen in de WebGL-scene zelf; de
   SVG-basis blijft stil (geen dubbele beweging).
   Mobiel behoudt de bewezen gecentreerde stapel met CTA boven de vouw. */
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
      <ParallaxLayer
        className="absolute -right-28 -top-40 w-[560px] h-[560px] pointer-events-none"
        from={20}
        to={-46}
      >
        <ArchitecturalArcIcon
          aria-hidden
          className="w-full h-full text-[#c9a854] opacity-[0.07]"
        />
      </ParallaxLayer>

      <div className="container-wide relative grid grid-cols-1 lg:grid-cols-[1fr_0.9fr] items-center gap-14 lg:gap-20 pt-12 pb-36 sm:pb-40 lg:pt-20 lg:pb-44 min-h-[88dvh]">
        {/* Content: waardepropositie + CTA, mobiel als eerste in beeld;
            mobiel gecentreerd, desktop links-editorial */}
        <div className="max-w-[660px] min-w-0 mx-auto lg:mx-0 text-center lg:text-left">
          <div className="t6-label text-[#80662c] mb-6 hero-enter-item" style={enter(0)}>
            {HERO.label}
          </div>
          <RevealWords
            as="h1"
            lines={[HERO.headline[0], HERO.headline[1]]}
            staggerMs={40}
            className="t1-hero text-[#3d3228]"
            style={{ fontSize: "clamp(34px, 8.4vw, 68px)" }}
          />
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
        </div>

        {/* Portret: op lg+ groter en voorbij de gridlijn, omringd door
            architecturale deelbogen; mobiel de vertrouwde fijne ring */}
        <div
          className="relative flex justify-center lg:justify-end min-w-0 hero-enter-item"
          style={enter(420)}
        >
          <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[380px] lg:h-[380px] xl:w-[460px] xl:h-[460px] lg:translate-x-10 xl:translate-x-16">
            <div
              aria-hidden
              className="lg:hidden absolute -inset-5 rounded-full border border-[#c9a854]/40"
            />
            <ParallaxLayer
              className="hidden lg:block absolute -inset-16 xl:-inset-24 pointer-events-none"
              from={26}
              to={-26}
            >
              <PortraitArcs className="w-full h-full" />
            </ParallaxLayer>
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
