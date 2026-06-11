"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment, useEffect, useState, type CSSProperties } from "react";
import {
  MenuIcon,
  CloseIcon,
  ArrowRight,
  InstagramIcon,
  EmailIcon,
  MoonIcon,
  FullMoonIcon,
  GoldCircleIcon,
  ArchitecturalArcIcon,
  BlueprintDotsIcon,
  DiamondMarkIcon,
  CrosshairCircleIcon,
  CycleSpiralIcon,
  UpDownArrowsIcon,
  SineWaveIcon,
  AwarenessIcon,
  PathwayIcon,
  BalanceIcon,
  SeasonsIcon,
} from "@/components/icons";
import {
  NAV_LINKS,
  HERO,
  HERKENNING,
  METHODIEK,
  VAN_NAAR,
  TIJDLIJN,
  BEWIJS,
  BOUWSTENEN,
  NASRA,
  TRAJECTEN,
  TESTIMONIALS,
  MATCHCALL,
  FOOTER,
} from "@/lib/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RootsVisual } from "@/components/karti/RootsVisual";
import { StickyMatchCall } from "@/components/karti/StickyMatchCall";
import { TiltCard } from "@/components/karti/TiltCard";
import { SpotlightPortrait } from "@/components/karti/SpotlightPortrait";
import { RevealWords } from "@/components/karti/RevealWords";
import { MagneticButton } from "@/components/karti/MagneticButton";
import { OntwarDraad } from "@/components/karti/OntwarDraad";
import { ScrollThread } from "@/components/karti/ScrollThread";

/* Plausible tagged-event: elke klik op een match-call CTA wordt als
   conversie-event gemeten; de UTM-content reist mee naar /match-call
   en vandaar de Calendly-embed in, zodat elke boeking traceerbaar is. */
const EVENT_MATCHCALL = "plausible-event-name=matchcall-click";

/** Interne boekingsroute met UTM per plek op de site. */
function matchCallHref(content: string): string {
  return `/match-call?utm_content=${encodeURIComponent(content)}`;
}

/* ─────────────── Header ─────────────── */
function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // scroll-lock terwijl het menu open is
  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
    <header className="sticky top-0 z-40 bg-[#f2eae0]/90 backdrop-blur-md border-b border-[#b08d3e]/25">
      <div className="container-wide flex items-center justify-between py-4 lg:py-5">
        <Link href="/" className="t0-wordmark whitespace-nowrap text-[#3d3228]">
          K A R T I
        </Link>
        <nav className="hidden xl:flex items-center gap-9 t6-label text-[#3d3228]">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="whitespace-nowrap hover:text-[#80662c] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            href={matchCallHref("header")}
            className={`btn-primary btn-header whitespace-nowrap ${EVENT_MATCHCALL}`}
          >
            <span className="sm:hidden">Match-call</span>
            <span className="hidden sm:inline">{HERO.primaryCta}</span>
          </Link>
          <button
            type="button"
            className="xl:hidden text-[#3d3228] p-2 -mr-2"
            aria-label="Menu openen"
            aria-expanded={menuOpen}
            aria-controls="mobiel-menu"
            onClick={() => setMenuOpen(true)}
          >
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>

      {/* Buiten de <header>: backdrop-filter maakt de header anders het
          containing block voor deze fixed overlay */}
      {menuOpen && (
        <div
          id="mobiel-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Navigatie"
          className="fixed inset-0 z-50 night-bloom flex flex-col"
        >
          <div className="velvet-texture" />
          <div className="container-wide relative flex items-center justify-between py-4">
            <span className="t0-wordmark text-[#fbf7f3]">K A R T I</span>
            <button
              type="button"
              autoFocus
              aria-label="Menu sluiten"
              onClick={() => setMenuOpen(false)}
              className="text-[#e2cda0] p-2 -mr-2"
            >
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          <nav className="relative flex-1 flex flex-col items-center justify-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-[family-name:var(--font-heading)] text-[#fbf7f3] text-[28px] hover:text-[#e2cda0] transition-colors"
              >
                {l.label}
              </a>
            ))}
            <Link
              href={matchCallHref("menu")}
              onClick={() => setMenuOpen(false)}
              className={`btn-primary-lg mt-6 ${EVENT_MATCHCALL}`}
            >
              {HERO.primaryCta}
            </Link>
          </nav>
          <div className="relative pb-10 text-center t6-label text-[#e2cda0]">
            {HERO.ctaSub}
          </div>
        </div>
      )}
    </>
  );
}

/* ─────────────── Hero: het gewortelde portret (Dawn) ───────────────
   Concept B uit de designrichting: een organisch groeiend wortelsysteem
   in goud op Sandstone. SVG-basis voor iedereen (ook in-app browsers,
   ook zonder JS), WebGL-diepte alleen op apparaten die het aankunnen.
   Mobiel staat de volledige waardepropositie plus match-call CTA boven
   de vouw; het portret wortelt direct daaronder in het stelsel. */
function Hero() {
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
        className="absolute inset-x-0 bottom-0 h-[42%] sm:h-[50%] lg:h-[68%]"
      />
      <ArchitecturalArcIcon
        aria-hidden
        className="absolute -right-28 -top-40 w-[560px] h-[560px] text-[#c9a854] opacity-[0.07]"
      />

      <div className="container-wide relative grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-14 lg:gap-20 pt-12 pb-36 sm:pb-40 lg:pt-20 lg:pb-44 min-h-[88vh]">
        {/* Content: waardepropositie + CTA, mobiel als eerste in beeld */}
        <div className="max-w-[660px] min-w-0">
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
          <hr className="gold-divider gold-divider-enter my-7" style={enter(300)} />
          <p className="t3-quote text-[#3d3228] mb-9 hero-enter-item" style={enter(380)}>
            {pullHead}
            <span style={{ color: "#8b3a4a" }}>{accent}</span>
          </p>
          <div
            className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-4 hero-enter-item"
            style={enter(470)}
          >
            <MagneticButton>
              <Link
                href={matchCallHref("hero")}
                className={`btn-primary-lg ${EVENT_MATCHCALL}`}
              >
                {HERO.primaryCta} <ArrowRight className="w-4 h-4" />
              </Link>
            </MagneticButton>
            <a href="#methode" className="btn-outline-gold">
              {HERO.secondaryCta}
            </a>
          </div>
          <div className="t6-label text-[#6e6557] mt-5 hero-enter-item" style={enter(550)}>
            {HERO.ctaSub}
          </div>
          <div className="flex items-center gap-3 mt-9 hero-enter-item" style={enter(630)}>
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

/* ─────────────── De Karti Methode: 4 pijlers in vaste volgorde ─────────────── */
const METHODIEK_ICONS = [AwarenessIcon, PathwayIcon, BalanceIcon, SeasonsIcon];

function Methodiek() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  return (
    <section id="methode" className="relative bg-[#faf6f0] py-28 lg:py-36 overflow-hidden">
      <GoldCircleIcon
        aria-hidden
        className="absolute -left-44 top-20 w-[440px] h-[440px] text-[#c9a854] opacity-[0.07]"
      />
      <div className="container-wide relative">
        <div className="text-center mb-16 lg:mb-20 max-w-[760px] mx-auto">
          <div className="t6-label text-[#80662c] mb-5">{METHODIEK.label}</div>
          <RevealWords text={METHODIEK.headline} className="t2-section mb-7 text-balance" />
          <hr className="gold-divider mx-auto mb-7" />
          <p className="t4-body text-[#2e2622]">{METHODIEK.intro}</p>
        </div>

        <div ref={ref} className="relative">
          {/* Het pad door de vier pijlers: de volgorde is de methode */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-[23px] left-[6%] right-[6%] h-px bg-gradient-to-r from-[#b08d3e]/0 via-[#b08d3e]/45 to-[#b08d3e]/0"
          />
          <div
            aria-hidden
            className="lg:hidden absolute top-3 bottom-3 left-[23px] w-px bg-gradient-to-b from-[#b08d3e]/0 via-[#b08d3e]/40 to-[#b08d3e]/0"
          />
          <ol className="grid grid-cols-1 lg:grid-cols-4 gap-12 lg:gap-10">
            {METHODIEK.pijlers.map((p, i) => {
              const Icon = METHODIEK_ICONS[i];
              return (
                <li
                  key={p.index}
                  className={`scroll-reveal-init relative flex lg:block gap-6 ${
                    inView ? "scroll-reveal-in" : ""
                  }`}
                  style={{ transitionDelay: `${i * 140}ms` }}
                >
                  <div className="relative flex-shrink-0 w-[46px] h-[46px] lg:mb-6 rounded-full border border-[#b08d3e]/50 bg-[#faf6f0] flex items-center justify-center">
                    <Icon className="w-6 h-6 text-[#80662c]" />
                  </div>
                  <div>
                    <div
                      className="font-[family-name:var(--font-wordmark)] text-[#80662c] mb-2"
                      style={{ fontSize: "20px", letterSpacing: "0.18em", lineHeight: 1 }}
                    >
                      {p.index}
                    </div>
                    <h3
                      className="font-[family-name:var(--font-heading)] font-bold text-[#3d3228] mb-3"
                      style={{ fontSize: "clamp(20px, 1.6vw, 24px)", lineHeight: 1.2 }}
                    >
                      {p.title}
                    </h3>
                    <p className="t4-body text-[#2e2622]" style={{ fontSize: "16px", lineHeight: 1.6 }}>
                      {p.body}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="mt-16 lg:mt-20 text-center max-w-[640px] mx-auto">
          <p
            className="font-[family-name:var(--font-heading)] italic"
            style={{ fontSize: "clamp(20px, 2vw, 28px)", color: "#8b3a4a", lineHeight: 1.45 }}
          >
            {METHODIEK.closing}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Herkenning ─────────────── */
function Herkenning() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.25 });
  return (
    <section id="herkenning" className="py-28 lg:py-40">
      <div ref={ref} className="container-narrow text-center">
        <hr className="gold-divider-short mx-auto mb-10" />
        <RevealWords text={HERKENNING.headline} className="t2-section mb-14" />
        {/* rustige linkerlijn: lijst links uitgelijnd in gecentreerde kolom */}
        <ul className="flex flex-col gap-7 mb-14 max-w-[620px] mx-auto text-left">
          {HERKENNING.signals.map((signal) => (
            <li
              key={signal}
              className="t3-quote flex items-start gap-5 text-[#3d3228]"
              style={{ fontSize: "clamp(20px, 1.9vw, 27px)" }}
            >
              <FullMoonIcon className="w-[12px] h-[12px] mt-[15px] text-[#b06b72] flex-shrink-0" />
              <span>{signal}</span>
            </li>
          ))}
        </ul>
        <p className="t4-body text-balance text-[#2e2622] max-w-[560px] mx-auto mb-12">
          {HERKENNING.body}
        </p>
        <p
          className={`text-gradient-rose hero-reveal-item${
            inView ? " hero-reveal-in" : ""
          }`}
          style={{ transitionDelay: "120ms" }}
        >
          {HERKENNING.deepRoseQuote}
        </p>
      </div>
    </section>
  );
}

/* ─────────────── Verdeeld bewijs: één stem op het juiste moment ─────────────── */
function BewijsBand({
  quote,
  name,
  context,
  tone = "light",
}: {
  quote: string;
  name: string;
  context: string;
  tone?: "light" | "dark";
}) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });
  const dark = tone === "dark";
  return (
    <div
      ref={ref}
      className={`scroll-reveal-init text-center ${inView ? "scroll-reveal-in" : ""}`}
    >
      <p
        className="font-[family-name:var(--font-heading)] italic mx-auto max-w-[680px] text-balance"
        style={{
          fontSize: "clamp(19px, 1.9vw, 26px)",
          lineHeight: 1.5,
          color: dark ? "#fbf7f3" : "#3d3228",
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <div className="flex items-center justify-center gap-3 mt-5">
        <span className="gold-dot" aria-hidden />
        <span
          className="t6-label"
          style={{ color: dark ? "#e2cda0" : "#80662c" }}
        >
          {name} · {context}
        </span>
      </div>
    </div>
  );
}

function BewijsOnderHero() {
  return (
    <section className="bg-[#f2eae0] pb-20 lg:pb-24">
      <div className="container-narrow">
        <hr className="gold-divider-short mx-auto mb-10" />
        <BewijsBand
          quote={BEWIJS.hero.quote}
          name={BEWIJS.hero.name}
          context={BEWIJS.hero.context}
        />
      </div>
    </section>
  );
}

/* ─────────────── De Verschuiving: van overleven naar begrijpen ─────────────── */
function VanNaar() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  return (
    <section className="relative bg-[#f2eae0] pb-28 lg:pb-36 overflow-hidden">
      <div className="container-narrow">
        <div className="text-center mb-14">
          <div className="t6-label text-[#80662c] mb-5">{VAN_NAAR.label}</div>
          <RevealWords
            text={VAN_NAAR.headline}
            className="t2-section text-balance"
            style={{ fontSize: "clamp(24px, 2.8vw, 38px)" }}
          />
        </div>
        {/* Eén grid voor alle cellen: kolommen uniform, cellen per rij
            exact even hoog. De gouden draad ontwart zich van NU naar STRAKS. */}
        <div ref={ref} className="vannaar-grid max-w-[880px] mx-auto">
          {VAN_NAAR.paren.map((paar, i) => (
            <Fragment key={paar.van}>
              <div
                className={`vn-cel vn-nu scroll-reveal-init ${inView ? "scroll-reveal-in" : ""}`}
                style={{ transitionDelay: `${i * 130}ms` }}
              >
                <p>{paar.van}</p>
              </div>
              <div
                className={`vn-connector scroll-reveal-init ${inView ? "scroll-reveal-in" : ""}`}
                style={{ transitionDelay: `${i * 130 + 60}ms` }}
              >
                <OntwarDraad active={inView} delayMs={i * 160 + 240} />
              </div>
              <div
                className={`vn-cel vn-straks scroll-reveal-init ${inView ? "scroll-reveal-in" : ""}`}
                style={{ transitionDelay: `${i * 130 + 90}ms` }}
              >
                <p>{paar.naar}</p>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Jouw eerste drie maanden (tastbaar maken) ─────────────── */
function Tijdlijn() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  return (
    <section className="relative bg-[#faf6f0] py-28 lg:py-36 overflow-hidden">
      <ArchitecturalArcIcon
        aria-hidden
        className="absolute -left-32 -bottom-32 w-[420px] h-[420px] text-[#c9a854] opacity-[0.06]"
      />
      <div className="container-wide relative">
        <div className="text-center mb-16 max-w-[680px] mx-auto">
          <div className="t6-label text-[#80662c] mb-5">{TIJDLIJN.label}</div>
          <RevealWords text={TIJDLIJN.headline} className="t2-section mb-7" />
          <hr className="gold-divider mx-auto mb-7" />
          <p className="t4-body text-balance text-[#2e2622]">{TIJDLIJN.intro}</p>
        </div>
        <div ref={ref} className="relative max-w-[1080px] mx-auto">
          <div
            aria-hidden
            className="hidden lg:block absolute top-[14px] left-[10%] right-[10%] h-px bg-gradient-to-r from-[#b08d3e]/0 via-[#b08d3e]/45 to-[#b08d3e]/0"
          />
          <div
            aria-hidden
            className="lg:hidden absolute top-3 bottom-3 left-[5px] w-px bg-gradient-to-b from-[#b08d3e]/0 via-[#b08d3e]/40 to-[#b08d3e]/0"
          />
          <ol className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-10">
            {TIJDLIJN.maanden.map((m, i) => (
              <li
                key={m.index}
                className={`scroll-reveal-init relative pl-8 lg:pl-0 ${
                  inView ? "scroll-reveal-in" : ""
                }`}
                style={{ transitionDelay: `${i * 140}ms` }}
              >
                <span
                  aria-hidden
                  className="absolute left-0 top-[6px] lg:static lg:block w-[11px] h-[11px] rounded-full bg-[#b08d3e] opacity-80 lg:mb-6"
                />
                <div className="t6-label text-[#80662c] mb-2">{m.index}</div>
                <h3
                  className="font-[family-name:var(--font-heading)] font-bold text-[#3d3228] mb-3"
                  style={{ fontSize: "clamp(20px, 1.6vw, 24px)", lineHeight: 1.2 }}
                >
                  {m.title}
                </h3>
                <p className="t4-body text-[#2e2622]" style={{ fontSize: "16px", lineHeight: 1.6 }}>
                  {m.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── De Bouwstenen ─────────────── */
const BOUWSTEEN_ICONS = [
  BlueprintDotsIcon,
  DiamondMarkIcon,
  CrosshairCircleIcon,
  CycleSpiralIcon,
  UpDownArrowsIcon,
  SineWaveIcon,
];

/* Blueprint Spread card — used in 3×2 grid */
function BouwsteenCard({
  card,
  index,
}: {
  card: (typeof BOUWSTENEN.cards)[number];
  index: number;
}) {
  const Icon = BOUWSTEEN_ICONS[index];
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  return (
    <article
      ref={ref}
      className={`scroll-reveal-init card-lift relative bg-[#faf6f0] border border-[#b08d3e]/30 p-10 lg:p-12 flex flex-col ${
        inView ? "scroll-reveal-in" : ""
      }`}
      style={{ transitionDelay: `${(index % 3) * 100 + Math.floor(index / 3) * 60}ms` }}
    >
      <div className="flex items-start justify-between mb-6">
        <div
          className="font-[family-name:var(--font-wordmark)] text-[#b08d3e]"
          style={{ fontSize: "28px", letterSpacing: "0.15em", lineHeight: 1 }}
        >
          {card.index}
        </div>
        <Icon className="w-9 h-9 text-[#b08d3e]" />
      </div>
      <h3
        className="font-[family-name:var(--font-heading)] font-bold text-[#3d3228] mb-5"
        style={{
          fontSize: "clamp(22px, 1.8vw, 28px)",
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
        }}
      >
        {card.title}
      </h3>
      <hr
        className="mb-5"
        style={{
          width: 40,
          height: 1,
          border: 0,
          background: "#b08d3e",
          opacity: 0.5,
        }}
      />
      <p className="t4-body text-[#2e2622]" style={{ fontSize: "17px" }}>
        {card.body}
      </p>
    </article>
  );
}

function DeBouwstenen() {
  return (
    <section
      id="bouwstenen"
      className="relative bg-[#f2eae0] py-28 lg:py-40 overflow-hidden"
    >
      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center mb-20 max-w-[720px] mx-auto">
          <RevealWords text={BOUWSTENEN.headline} className="t2-section mb-8 text-balance" />
          <hr className="gold-divider mx-auto mb-8" />
          <p className="t4-body text-[#2e2622]">{BOUWSTENEN.intro}</p>
        </div>

        {/* Blueprint Spread: 3×2 grid with vertical gold thread down the middle on desktop */}
        <div className="relative">
          {/* Vertical gold thread — desktop only, down the middle between columns */}
          <div
            aria-hidden
            className="hidden lg:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#b08d3e]/25 pointer-events-none"
          />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 relative">
            {BOUWSTENEN.cards.map((card, i) => (
              <BouwsteenCard key={card.index} card={card} index={i} />
            ))}
          </div>
        </div>

        {/* Closing quote */}
        <div className="mt-20 text-center max-w-[680px] mx-auto">
          <p
            className="font-[family-name:var(--font-heading)] italic"
            style={{
              fontSize: "clamp(22px, 2.2vw, 32px)",
              lineHeight: 1.4,
              color: "#b08d3e",
            }}
          >
            {BOUWSTENEN.closingQuote}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Over Nasra ─────────────── */
function OverNasra() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.25 });
  return (
    <section id="nasra" className="py-28 lg:py-40 bg-[#f5eded]/60">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <div className="t6-label text-[#80662c] mb-5">{NASRA.label}</div>
            <hr className="gold-divider mb-8" />
            <RevealWords text={NASRA.headline} className="t2-section mb-8 text-balance" />
            {NASRA.body.map((p, i) => (
              <p key={i} className="t4-body text-[#2e2622] mb-6">
                {p}
              </p>
            ))}
            <p
              className="font-[family-name:var(--font-heading)] italic mt-8 mb-8"
              style={{
                fontSize: "clamp(24px, 2.4vw, 34px)",
                lineHeight: 1.35,
                color: "#8b3a4a",
              }}
            >
              {NASRA.deepRoseQuote}
            </p>
            <Link
              href={matchCallHref("nasra")}
              className={`btn-ghost-link inline-flex items-center gap-1 ${EVENT_MATCHCALL}`}
            >
              {NASRA.secondaryCta} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div ref={ref} className="relative">
            {/* Primary portrait — file: /public/images/nasra-portrait.jpg */}
            <div className="relative aspect-[4/5] w-full bg-[#d6ccbe] overflow-hidden">
              <Image
                src="/images/nasra-portrait.jpg"
                alt="Nasra in haar praktijk"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={`object-cover object-center image-reveal-scale${
                  inView ? " in" : ""
                }`}
              />
            </div>
            {/* Fine gold frame outside portrait */}
            <div className="pointer-events-none absolute -inset-4 border border-[#b08d3e]/50" />
            {/* Small circular overlapping portrait — /public/images/nasra-closeup.jpg */}
            <div className="absolute -bottom-10 -left-10 w-[140px] h-[140px] rounded-full border border-[#b08d3e]/60 overflow-hidden bg-[#faf6f0]">
              <Image
                src="/images/nasra-closeup.jpg"
                alt="Nasra close-up"
                fill
                sizes="140px"
                className="object-cover object-center"
              />
            </div>
            {/* 3 gold dots cluster */}
            <div className="absolute -top-6 -right-4 gold-dots-cluster">
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

/* ─────────────── Trajecten ─────────────── */
function DeTrajecten() {
  return (
    <section id="trajecten" className="py-28 lg:py-40">
      <div className="container-wide">
        <div className="text-center mb-20">
          <div className="t0-wordmark text-[#b08d3e] mb-6">K A R T I</div>
          <RevealWords text={TRAJECTEN.headline} className="t2-section mb-6" />
          <hr className="gold-divider mx-auto mb-6" />
          <p className="t3-quote text-[#3d3228] max-w-[640px] mx-auto">
            {TRAJECTEN.subline}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {TRAJECTEN.cards.map((card) => {
            const featured = card.featured;
            return (
              <TiltCard key={card.name} className="flex">
              <div
                className={`relative flex flex-col w-full p-10 card-lift ${
                  featured
                    ? "night-bloom border border-[#b08d3e] lg:-mt-6 lg:mb-0 card-lift-featured"
                    : "bg-[#faf6f0] border border-[#b08d3e]/30"
                }`}
              >
                {featured && <div className="velvet-texture" />}
                <div className="relative flex-1 flex flex-col">
                  <div
                    className={`t6-label mb-4 ${
                      featured ? "text-[#e2cda0]" : "text-[#80662c]"
                    }`}
                  >
                    {card.tier}
                  </div>
                  <h3
                    className="font-[family-name:var(--font-heading)] font-bold mb-4"
                    style={{
                      fontSize: "clamp(26px, 2.2vw, 32px)",
                      lineHeight: 1.15,
                      color: featured ? "#e2cda0" : "#3d3228",
                    }}
                  >
                    {card.name}
                  </h3>
                  <hr
                    className="mb-6"
                    style={{
                      width: 60,
                      height: 1,
                      border: 0,
                      background: featured ? "#c9a854" : "#b08d3e",
                      opacity: featured ? 0.9 : 0.5,
                    }}
                  />
                  <p
                    className="t4-body mb-6"
                    style={{ color: featured ? "#fbf7f3" : "#2e2622" }}
                  >
                    {card.body}
                  </p>
                  <ul className="flex flex-col gap-3 flex-1">
                    {card.features.map((f) => (
                      <li key={f} className="flex gap-3 items-start">
                        <MoonIcon
                          className="w-4 h-4 mt-[6px] flex-shrink-0"
                          style={{ color: featured ? "#e2cda0" : "#d4a5a8" }}
                        />
                        <span
                          className="t4-body"
                          style={{ color: featured ? "#fbf7f3" : "#2e2622" }}
                        >
                          {f}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {/* Prijs gedempt: substantie leidt, investering sluit af */}
                  <div className="mt-8 pt-5 border-t border-current/15 flex items-baseline justify-between gap-3">
                    <span
                      className="t6-label"
                      style={{ color: featured ? "#e2cda0" : "#80662c" }}
                    >
                      {TRAJECTEN.investeringLabel}
                    </span>
                    <span
                      className="font-[family-name:var(--font-heading)]"
                      style={{
                        fontSize: "17px",
                        color: featured ? "#fbf7f3" : "#3d3228",
                      }}
                    >
                      {card.price}
                    </span>
                  </div>
                </div>
              </div>
              </TiltCard>
            );
          })}
        </div>

        {/* Bewijs op het beslismoment: haar Blueprint, in klantenwoorden */}
        <div className="mt-16 max-w-[720px] mx-auto bg-[#faf6f0] border border-[#b08d3e]/30 px-8 py-10 lg:px-12">
          <BewijsBand
            quote={BEWIJS.prijzen.quote}
            name={BEWIJS.prijzen.name}
            context={BEWIJS.prijzen.context}
          />
        </div>
        <div className="mt-20 text-center max-w-[720px] mx-auto">
          <p className="t3-quote text-balance text-[#3d3228] mb-6">{TRAJECTEN.closingQuote}</p>
          <p className="t4-body text-balance text-[#6e6557] mb-12 max-w-[560px] mx-auto">{TRAJECTEN.closingBody}</p>
          <Link
            href={matchCallHref("trajecten")}
            className={`btn-primary-lg ${EVENT_MATCHCALL}`}
          >
            {TRAJECTEN.finalCta}
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Testimonials: statisch bewijs, geen carrousel ───────────────
   Drie verhalen direct zichtbaar op elk formaat (bewijs mag je niet
   hoeven zoeken), de rest achter een rustige expander. */
function Testimonials() {
  const [showAll, setShowAll] = useState(false);
  const items = showAll ? TESTIMONIALS.items : TESTIMONIALS.items.slice(0, 3);

  return (
    <section id="testimonials" className="relative night-bloom py-28 lg:py-40">
      <div className="velvet-texture" />
      <div className="container-wide relative">
        <div className="text-center mb-16">
          <hr
            className="mx-auto mb-6"
            style={{ width: 80, height: 1, border: 0, background: "#c9a854", opacity: 0.7 }}
          />
          <RevealWords text={TESTIMONIALS.headline} className="t2-section text-[#fbf7f3]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-[1180px] mx-auto">
          {items.map((t) => (
            <article
              key={t.name}
              className="border border-[#c9a854]/30 p-8 lg:p-10 bg-transparent flex flex-col"
            >
              <h3
                className="font-[family-name:var(--font-heading)] italic text-[#e2cda0] mb-4"
                style={{ fontSize: "16px", letterSpacing: "0.01em" }}
              >
                {t.title}
              </h3>
              <p
                className="font-[family-name:var(--font-heading)] italic text-[#fbf7f3] mb-6 flex-1"
                style={{ fontSize: "19px", lineHeight: 1.55 }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <hr
                className="mb-4"
                style={{ width: 40, height: 1, border: 0, background: "#c9a854", opacity: 0.6 }}
              />
              <div className="t6-label text-[#c9a854]">{t.name}</div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="btn-outline-gold-light"
          >
            {showAll ? TESTIMONIALS.collapseLabel : TESTIMONIALS.expandLabel}
          </button>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Match-call (final CTA) ─────────────── */
function MatchCall() {
  return (
    <section id="matchcall" className="relative night-bloom py-28 lg:py-40">
      <div className="velvet-texture" />
      <ArchitecturalArcIcon className="absolute -right-40 top-1/2 -translate-y-1/2 w-[720px] h-[720px] text-[#c9a854] opacity-[0.08]" />
      <GoldCircleIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] text-[#c9a854] opacity-25" />
      <div className="container-narrow relative text-center">
        <div className="t6-label text-[#e2cda0] mb-6">{MATCHCALL.label}</div>
        <RevealWords
          text={MATCHCALL.headline}
          className="t1-hero text-[#fbf7f3] mb-10 text-balance"
        />
        <hr
          className="mx-auto mb-10"
          style={{ width: 80, height: 1, border: 0, background: "#c9a854", opacity: 0.8 }}
        />
        {/* De-risk in plaats van druk: wat het is, wat het niet is */}
        <div className="max-w-[560px] mx-auto flex flex-col gap-4 mb-2">
          {MATCHCALL.derisk.map((line) => (
            <p
              key={line}
              className="t4-body text-balance text-[#fbf7f3]"
              style={{ fontSize: "17px", lineHeight: 1.6 }}
            >
              {line}
            </p>
          ))}
        </div>
        <div className="mt-12 mb-5 flex justify-center">
          <MagneticButton>
            <Link
              href={matchCallHref("final")}
              className={`btn-primary-lg ${EVENT_MATCHCALL}`}
            >
              {MATCHCALL.cta}
            </Link>
          </MagneticButton>
        </div>
        <div className="t6-label text-[#e2cda0] mb-16">{MATCHCALL.ctaSub}</div>

        {/* Laatste stem vóór de beslissing */}
        <div className="max-w-[640px] mx-auto border-t border-[#c9a854]/25 pt-12 mb-14">
          <BewijsBand
            quote={BEWIJS.final.quote}
            name={BEWIJS.final.name}
            context={BEWIJS.final.context}
            tone="dark"
          />
        </div>

        <div>
          {MATCHCALL.closing.map((line) => (
            <p
              key={line}
              className="font-[family-name:var(--font-heading)] italic text-[#c9a854] mb-3"
              style={{ fontSize: "clamp(20px, 1.8vw, 26px)", lineHeight: 1.5 }}
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Footer ─────────────── */
function Footer() {
  return (
    <footer className="bg-[#f2eae0] border-t border-[#b08d3e]/30">
      {/* extra bodemruimte op mobiel voor de sticky match-call balk */}
      <div className="container-wide pt-16 pb-32 md:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link href="/" className="t0-wordmark text-[#3d3228] block mb-4">
              K A R T I
            </Link>
            <div className="t6-label text-[#80662c]">{FOOTER.tagline}</div>
          </div>
          <nav className="flex flex-col gap-2">
            <div className="t6-label text-[#80662c] mb-2">NAVIGATIE</div>
            {FOOTER.links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[15px] text-[#3d3228] hover:text-[#b08d3e]"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-2">
            <div className="t6-label text-[#80662c] mb-2">CONTACT</div>
            <a
              href={`https://${FOOTER.contact.instagram}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[15px] text-[#3d3228] hover:text-[#b08d3e] inline-flex items-center gap-2"
            >
              <InstagramIcon className="w-4 h-4" /> {FOOTER.contact.instagram}
            </a>
            <a
              href={`mailto:${FOOTER.contact.email}`}
              className="text-[15px] text-[#3d3228] hover:text-[#b08d3e] inline-flex items-center gap-2"
            >
              <EmailIcon className="w-4 h-4" /> {FOOTER.contact.email}
            </a>
          </div>
        </div>
        <hr className="gold-divider mt-14 mb-6" style={{ width: "100%", opacity: 0.3 }} />
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-[#6e6557]">
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <span>{FOOTER.legal}</span>
            {FOOTER.legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="underline decoration-[#b08d3e]/60 underline-offset-4 hover:text-[#3d3228]"
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="gold-dots-cluster">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────── Page ─────────────── */
export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <BewijsOnderHero />
        <Herkenning />
        <VanNaar />
        <Methodiek />
        <DeBouwstenen />
        <OverNasra />
        <DeTrajecten />
        <Tijdlijn />
        <Testimonials />
        <MatchCall />
      </main>
      <Footer />
      <StickyMatchCall />
      <ScrollThread />
    </>
  );
}
