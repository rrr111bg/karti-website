"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  MenuIcon,
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
} from "@/components/icons";
import {
  CALENDLY_URL,
  NAV_LINKS,
  HERO,
  HERKENNING,
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

/* ─────────────── Header ─────────────── */
function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[#f2eae0]/90 backdrop-blur-md border-b border-[#b08d3e]/25">
      <div className="container-wide flex items-center justify-between py-5">
        <Link href="/" className="t0-wordmark text-[#3d3228]">
          K A R T I
        </Link>
        <nav className="hidden lg:flex items-center gap-10 t6-label text-[#3d3228]">
          {NAV_LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-[#b08d3e] transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <a href="#nieuwsbrief" className="hidden md:inline-flex btn-primary">
            Nieuwsbrief
          </a>
          <button className="lg:hidden text-[#3d3228]" aria-label="Menu">
            <MenuIcon className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ─────────────── Split Hero ─────────────── */
function SplitHero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // next-tick so the initial class applies, then toggle reveal
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  // Split pull quote: main text in bark, "Over jezelf." in deep rose
  const pull = HERO.pullQuote;
  const accent = "Over jezelf.";
  const pullHead = pull.endsWith(accent)
    ? pull.slice(0, pull.length - accent.length)
    : pull;

  const revealClass = `hero-reveal-item${mounted ? " hero-reveal-in" : ""}`;
  const revealStyle = (delay: number) => ({ transitionDelay: `${delay}ms` });

  return (
    <section className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[85vh]">
      {/* Left: Night Bloom portrait panel */}
      <div className="night-bloom relative flex items-end min-h-[520px] lg:min-h-0 p-10 lg:p-14">
        {/* Nasra hero portrait — file: /public/images/nasra-hero.jpg */}
        <Image
          src="/images/nasra-hero.jpg"
          alt="Nasra"
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover object-[center_45%]"
        />
        {/* Dark overlay voor leesbaarheid van de gold label — licht gehouden voor de editorial foto */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(26,22,20,0.15) 0%, rgba(26,22,20,0) 35%, rgba(26,22,20,0) 65%, rgba(26,22,20,0.55) 100%)",
          }}
        />
        <div className="velvet-texture" />
        {/* Fine gold circle frame */}
        <GoldCircleIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[min(70vh,520px)] h-[min(70vh,520px)] text-[#c9a854] opacity-40" />
        {/* Bottom label only (no wordmark here, header has it) */}
        <div
          className={`relative z-10 t6-label text-[#e2cda0] hero-reveal-item${
            mounted ? " hero-reveal-in" : ""
          }`}
          style={{ transitionDelay: "600ms" }}
        >
          {HERO.label}
        </div>
        <div className="absolute bottom-10 right-10 gold-dots-cluster">
          <span />
          <span />
          <span />
        </div>
      </div>

      {/* Right: Dawn content panel */}
      <div className="relative bg-[#f2eae0] flex items-center px-8 lg:px-20 py-20 lg:py-0 overflow-hidden">
        <ArchitecturalArcIcon className="absolute -right-24 -bottom-24 w-[520px] h-[520px] text-[#c9a854] opacity-[0.06]" />
        <div className="relative max-w-[620px]">
          <h1 className="t1-hero text-[#3d3228]">
            <span className={revealClass} style={revealStyle(0)}>
              {HERO.headline[0]}
            </span>
            <br />
            <span className={revealClass} style={revealStyle(120)}>
              {HERO.headline[1]}
            </span>
          </h1>
          <hr
            className={`gold-divider-animated my-8${mounted ? " in" : ""}`}
            style={{ transitionDelay: "260ms" }}
          />
          <p
            className={`t3-quote text-[#3d3228] mb-12 ${revealClass}`}
            style={revealStyle(380)}
          >
            {pullHead}
            <span style={{ color: "#8b3a4a" }}>{accent}</span>
          </p>
          <a
            href="#bouwstenen"
            className={`btn-outline-gold inline-flex items-center gap-2 text-[15px] ${revealClass}`}
            style={{ padding: "18px 38px", ...revealStyle(520) }}
          >
            {HERO.secondaryCta} <ArrowRight className="w-4 h-4" />
          </a>
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
            <div className="t6-label text-[#b08d3e] mb-5">{NASRA.label}</div>
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
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost-link inline-flex items-center gap-1"
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
              <div
                key={card.name}
                className={`relative flex flex-col p-10 card-lift ${
                  featured
                    ? "night-bloom border border-[#b08d3e] lg:-mt-6 lg:mb-0 card-lift-featured"
                    : "bg-[#faf6f0] border border-[#b08d3e]/30"
                }`}
              >
                {featured && <div className="velvet-texture" />}
                <div className="relative flex-1 flex flex-col">
                  <div
                    className={`t6-label mb-4 ${
                      featured ? "text-[#e2cda0]" : "text-[#b08d3e]"
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
                      color: featured ? "#e2cda0" : "#b08d3e",
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
            );
          })}
        </div>
        <div className="mt-20 text-center max-w-[720px] mx-auto">
          <p className="t3-quote text-[#3d3228] mb-6">{TRAJECTEN.closingQuote}</p>
          <p className="t4-body text-[#8a8070] mb-12">{TRAJECTEN.closingBody}</p>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-lg"
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
          <div className="t6-label text-[#b08d3e] mb-4">{NEWSLETTER.label}</div>
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

/* ─────────────── Instagram Feed ─────────────── */
function InstagramFeed() {
  return (
    <section className="py-24 lg:py-32">
      <div className="container-wide">
        <div className="text-center mb-10">
          <div className="t6-label text-[#b08d3e] mb-4">{INSTAGRAM.label}</div>
          <p
            className="font-[family-name:var(--font-heading)] italic"
            style={{ fontSize: "clamp(22px, 2vw, 28px)", color: "#3d3228" }}
          >
            {INSTAGRAM.headline}
          </p>
        </div>
        <div className="flex gap-5 overflow-x-auto no-scrollbar pb-4 -mx-5 px-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <a
              key={i}
              href={INSTAGRAM.link}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex-shrink-0 w-[240px] h-[360px] night-bloom border border-[#c9a854]/30 hover:border-[#c9a854]/70 transition-colors"
            >
              <div className="velvet-texture" />
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <InstagramIcon className="w-5 h-5 text-[#e2cda0]" />
                <div className="t6-label text-[#e2cda0]">{INSTAGRAM.handle}</div>
              </div>
              <GoldCircleIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 text-[#c9a854] opacity-30" />
            </a>
          ))}
        </div>
        <div className="text-center mt-8">
          <a
            href={INSTAGRAM.link}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost-link inline-flex items-center gap-1"
          >
            {INSTAGRAM.linkLabel} <ArrowRight className="w-4 h-4" />
          </a>
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
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-lg"
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
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link href="/" className="t0-wordmark text-[#3d3228] block mb-4">
              K A R T I
            </Link>
            <div className="t6-label text-[#b08d3e]">{FOOTER.tagline}</div>
          </div>
          <nav className="flex flex-col gap-2">
            <div className="t6-label text-[#b08d3e] mb-2">NAVIGATIE</div>
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
            <div className="t6-label text-[#b08d3e] mb-2">CONTACT</div>
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
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-[#8a8070]">
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
        <SplitHero />
        <Herkenning />
        <DeBouwstenen />
        <OverNasra />
        <DeTrajecten />
        <Testimonials />
        <Nieuwsbrief />
        <InstagramFeed />
        <MatchCall />
      </main>
      <Footer />
    </>
  );
}
