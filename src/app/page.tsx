"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
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
  calendlyUrl,
  NAV_LINKS,
  HERO,
  HERKENNING,
  METHODIEK,
  BOUWSTENEN,
  NASRA,
  TRAJECTEN,
  TESTIMONIALS,
  NEWSLETTER,
  INSTAGRAM,
  MATCHCALL,
  FOOTER,
} from "@/lib/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RootsVisual } from "@/components/karti/RootsVisual";
import { StickyMatchCall } from "@/components/karti/StickyMatchCall";
import { TiltCard } from "@/components/karti/TiltCard";

/* Plausible tagged-event: elke klik op een match-call CTA wordt als
   conversie-event gemeten, met UTM-content per plek (zie calendlyUrl). */
const EVENT_MATCHCALL = "plausible-event-name=matchcall-click";

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
        <Link href="/" className="t0-wordmark text-[#3d3228]">
          K A R T I
        </Link>
        <nav className="hidden lg:flex items-center gap-10 t6-label text-[#3d3228]">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[#80662c] transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={calendlyUrl("header")}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-primary btn-header ${EVENT_MATCHCALL}`}
          >
            <span className="sm:hidden">Match-call</span>
            <span className="hidden sm:inline">{HERO.primaryCta}</span>
          </a>
          <button
            type="button"
            className="lg:hidden text-[#3d3228] p-2 -mr-2"
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
            <a
              href={calendlyUrl("menu")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className={`btn-primary-lg mt-6 ${EVENT_MATCHCALL}`}
            >
              {HERO.primaryCta}
            </a>
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
      {/* Wortelsysteem: groeit vanuit de grond onder het portret */}
      <RootsVisual className="absolute inset-x-0 bottom-0 h-[46%] sm:h-[52%] lg:h-[68%]" />
      <ArchitecturalArcIcon
        aria-hidden
        className="absolute -right-28 -top-40 w-[560px] h-[560px] text-[#c9a854] opacity-[0.07]"
      />

      <div className="container-wide relative grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-14 lg:gap-20 pt-12 pb-36 sm:pb-40 lg:pt-20 lg:pb-44 min-h-[88vh]">
        {/* Content: waardepropositie + CTA, mobiel als eerste in beeld */}
        <div className="max-w-[660px]">
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
            className="flex flex-col sm:flex-row sm:items-center gap-4 hero-enter-item"
            style={enter(470)}
          >
            <a
              href={calendlyUrl("hero")}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-primary-lg ${EVENT_MATCHCALL}`}
            >
              {HERO.primaryCta} <ArrowRight className="w-4 h-4" />
            </a>
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
          className="relative flex justify-center lg:justify-end hero-enter-item"
          style={enter(420)}
        >
          <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[400px] lg:h-[400px]">
            <div
              aria-hidden
              className="absolute -inset-5 rounded-full border border-[#c9a854]/40"
            />
            <div
              aria-hidden
              className="hidden lg:block absolute -inset-10 rounded-full border border-[#c9a854]/20"
            />
            <div className="relative w-full h-full rounded-full overflow-hidden border border-[#b08d3e]/60 bg-[#faf6f0]">
              <Image
                src="/images/nasra-closeup.jpg"
                alt="Nasra, oprichter van Karti"
                fill
                priority
                sizes="(max-width: 1024px) 250px, 400px"
                className="object-cover scale-[1.04]"
              />
            </div>
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
          <h2 className="t2-section mb-7">{METHODIEK.headline}</h2>
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
        <h2 className="t2-section mb-14">{HERKENNING.headline}</h2>
        <ul className="flex flex-col gap-6 mb-14">
          {HERKENNING.signals.map((signal) => (
            <li
              key={signal}
              className="t3-quote flex items-start justify-center gap-4 text-[#3d3228]"
            >
              <FullMoonIcon className="w-[14px] h-[14px] mt-[16px] text-[#b06b72] flex-shrink-0" />
              <span>{signal}</span>
            </li>
          ))}
        </ul>
        <p className="t4-body text-[#2e2622] max-w-[620px] mx-auto mb-12">
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
          <h2 className="t2-section mb-8">{BOUWSTENEN.headline}</h2>
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
            <h2 className="t2-section mb-8">{NASRA.headline}</h2>
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
            <a
              href={calendlyUrl("nasra")}
              target="_blank"
              rel="noopener noreferrer"
              className={`btn-ghost-link inline-flex items-center gap-1 ${EVENT_MATCHCALL}`}
            >
              {NASRA.secondaryCta} <ArrowRight className="w-4 h-4" />
            </a>
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
          <h2 className="t2-section mb-6">{TRAJECTEN.headline}</h2>
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
                    className="font-[family-name:var(--font-heading)] font-bold mb-3"
                    style={{
                      fontSize: "clamp(26px, 2.2vw, 32px)",
                      lineHeight: 1.15,
                      color: featured ? "#e2cda0" : "#3d3228",
                    }}
                  >
                    {card.name}
                  </h3>
                  <p
                    className="font-[family-name:var(--font-heading)] italic mb-5"
                    style={{
                      fontSize: "22px",
                      color: featured ? "#e2cda0" : "#80662c",
                    }}
                  >
                    {card.price}
                  </p>
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
                </div>
              </div>
              </TiltCard>
            );
          })}
        </div>
        <div className="mt-20 text-center max-w-[720px] mx-auto">
          <p className="t3-quote text-[#3d3228] mb-6">{TRAJECTEN.closingQuote}</p>
          <p className="t4-body text-[#6e6557] mb-12">{TRAJECTEN.closingBody}</p>
          <a
            href={calendlyUrl("trajecten")}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-primary-lg ${EVENT_MATCHCALL}`}
          >
            {TRAJECTEN.finalCta}
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Testimonials (rustige carousel) ─────────────── */
function Testimonials() {
  const items = TESTIMONIALS.items;

  // Desktop: 4 slides, always 3 cards each.
  // Last slide wraps around so Fatima (#9) never sits alone.
  const desktopSlides = useMemo(
    () => [
      [items[0], items[1], items[2]],
      [items[3], items[4], items[5]],
      [items[6], items[7], items[8]],
      [items[7], items[8], items[9]], // wrap: overlap with slide 3
    ],
    [items]
  );

  // Mobile: one card per slide (10 slides) — simpler to read on small screens.
  const mobileSlides = useMemo(() => items.map((t) => [t]), [items]);

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const slides = isMobile ? mobileSlides : desktopSlides;

  const [activeRaw, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // Clamp active during render (avoids setState-in-effect cascade)
  const active = activeRaw >= slides.length ? 0 : activeRaw;

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const id = window.setInterval(() => {
      setActive((a) => (a + 1) % slides.length);
      setProgressKey((k) => k + 1);
    }, 7000);
    return () => window.clearInterval(id);
  }, [paused, slides.length, active]);

  const go = (next: number) => {
    setActive(((next % slides.length) + slides.length) % slides.length);
    setProgressKey((k) => k + 1);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 50) {
      if (delta > 0) go(active + 1);
      else go(active - 1);
    }
    touchStartX.current = null;
  };

  return (
    <section
      id="testimonials"
      className="relative night-bloom py-28 lg:py-40"
    >
      <div className="velvet-texture" />
      <div className="container-wide relative">
        <div className="text-center mb-16">
          <hr
            className="mx-auto mb-6"
            style={{ width: 80, height: 1, border: 0, background: "#c9a854", opacity: 0.7 }}
          />
          <h2 className="t2-section text-[#fbf7f3]">{TESTIMONIALS.headline}</h2>
        </div>

        <div
          className="relative max-w-[1180px] mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Nav buttons (desktop) */}
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Vorige testimonials"
            className="hidden md:flex absolute -left-6 lg:-left-10 top-1/2 -translate-y-[70%] z-10 w-12 h-12 items-center justify-center rounded-full border border-[#c9a854]/60 text-[#e2cda0] bg-[#1a1614]/40 backdrop-blur-sm hover:bg-[#c9a854]/15 hover:border-[#c9a854] transition"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Volgende testimonials"
            className="hidden md:flex absolute -right-6 lg:-right-10 top-1/2 -translate-y-[70%] z-10 w-12 h-12 items-center justify-center rounded-full border border-[#c9a854]/60 text-[#e2cda0] bg-[#1a1614]/40 backdrop-blur-sm hover:bg-[#c9a854]/15 hover:border-[#c9a854] transition"
          >
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Stacked crossfading slides (desktop + mobile, same pattern) */}
          <div className="relative min-h-[380px] md:min-h-[340px]">
            {slides.map((slide, sIdx) => (
              <div
                key={sIdx}
                className="carousel-slide absolute inset-0 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
                style={{
                  opacity: active === sIdx ? 1 : 0,
                  pointerEvents: active === sIdx ? "auto" : "none",
                }}
                aria-hidden={active !== sIdx}
              >
                {slide.map((t, i) => (
                  <article
                    key={`${sIdx}-${t.name}-${i}`}
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
                      “{t.quote}”
                    </p>
                    <hr
                      className="mb-4"
                      style={{
                        width: 40,
                        height: 1,
                        border: 0,
                        background: "#c9a854",
                        opacity: 0.6,
                      }}
                    />
                    <div className="t6-label text-[#c9a854]">{t.name}</div>
                  </article>
                ))}
              </div>
            ))}
          </div>

          {/* Pagination dots + progress bar */}
          <div className="flex flex-col items-center gap-4 mt-12">
            <div className="flex items-center justify-center gap-3">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  aria-label={`Toon groep ${i + 1}`}
                  className="w-[6px] h-[6px] rounded-full transition-opacity"
                  style={{
                    background: "#c9a854",
                    opacity: active === i ? 1 : 0.3,
                  }}
                />
              ))}
            </div>
            {/* Timer progress bar */}
            <div className="w-full max-w-[240px] h-[2px] bg-[#c9a854]/20 overflow-hidden">
              <div
                key={progressKey}
                className="h-full bg-[#c9a854] carousel-progress-bar"
                style={{
                  animationPlayState: paused ? "paused" : "running",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Nieuwsbrief ─────────────── */
function Nieuwsbrief() {
  return (
    <section id="nieuwsbrief" className="py-24 lg:py-32">
      <div className="container-narrow">
        <div className="bg-[#faf6f0] border border-[#b08d3e]/40 px-8 md:px-14 py-14 text-center max-w-[640px] mx-auto">
          <div className="t6-label text-[#80662c] mb-4">{NEWSLETTER.label}</div>
          <p
            className="font-[family-name:var(--font-heading)] italic mb-4"
            style={{ fontSize: "clamp(24px, 2.2vw, 30px)", color: "#3d3228" }}
          >
            {NEWSLETTER.headline}
          </p>
          <p className="t4-body text-[#2e2622] mb-8">{NEWSLETTER.body}</p>
          <form
            name="newsletter"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            action="/thank-you"
            className="flex flex-col sm:flex-row gap-3 max-w-[480px] mx-auto mb-6"
          >
            <input type="hidden" name="form-name" value="newsletter" />
            <p className="hidden">
              <label>
                Laat dit leeg: <input name="bot-field" />
              </label>
            </p>
            <input
              type="email"
              name="email"
              required
              placeholder={NEWSLETTER.placeholder}
              className="flex-1 rounded-full border border-[#b08d3e]/60 bg-transparent px-6 py-4 text-[#2e2622] placeholder:text-[#8a8070] focus:outline-none focus:border-[#b08d3e]"
            />
            <button type="submit" className="btn-primary">
              {NEWSLETTER.cta}
            </button>
          </form>
          <p
            className="font-[family-name:var(--font-heading)] italic text-[#8a8070]"
            style={{ fontSize: "16px" }}
          >
            {NEWSLETTER.signoff}
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────── Instagram (magnetische volg-band) ───────────────
   Bewust geen nep-tegels: één eerlijke, premium uitnodiging. */
function InstagramBand() {
  return (
    <section className="py-24 lg:py-28">
      <div className="container-narrow">
        <div className="relative night-bloom px-8 md:px-14 py-14 md:py-16 text-center overflow-hidden">
          <div className="velvet-texture" />
          <GoldCircleIcon
            aria-hidden
            className="absolute -right-16 -bottom-24 w-[280px] h-[280px] text-[#c9a854] opacity-20"
          />
          <div className="relative">
            <div className="t6-label text-[#e2cda0] mb-4">{INSTAGRAM.label}</div>
            <p
              className="font-[family-name:var(--font-heading)] italic text-[#fbf7f3] mb-8"
              style={{ fontSize: "clamp(24px, 2.4vw, 32px)" }}
            >
              {INSTAGRAM.headline}
            </p>
            <a
              href={INSTAGRAM.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold-light"
            >
              <InstagramIcon className="w-4 h-4" /> Volg @kartihealth
            </a>
          </div>
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
        <h2 className="t1-hero text-[#fbf7f3] mb-10">{MATCHCALL.headline}</h2>
        <hr
          className="mx-auto mb-10"
          style={{ width: 80, height: 1, border: 0, background: "#c9a854", opacity: 0.8 }}
        />
        {MATCHCALL.questions.map((q) => (
          <p
            key={q}
            className="font-[family-name:var(--font-heading)] italic text-[#fbf7f3] mb-5"
            style={{ fontSize: "clamp(20px, 1.8vw, 26px)", lineHeight: 1.5 }}
          >
            {q}
          </p>
        ))}
        <div className="mt-12 mb-5 flex justify-center">
          <a
            href={calendlyUrl("final")}
            target="_blank"
            rel="noopener noreferrer"
            className={`btn-primary-lg ${EVENT_MATCHCALL}`}
          >
            {MATCHCALL.cta}
          </a>
        </div>
        <div className="t6-label text-[#e2cda0] mb-20">{MATCHCALL.ctaSub}</div>
        <div className="pt-4">
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
          <span>{FOOTER.legal}</span>
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
        <Herkenning />
        <Methodiek />
        <DeBouwstenen />
        <OverNasra />
        <DeTrajecten />
        <Testimonials />
        <Nieuwsbrief />
        <InstagramBand />
        <MatchCall />
      </main>
      <Footer />
      <StickyMatchCall />
    </>
  );
}
