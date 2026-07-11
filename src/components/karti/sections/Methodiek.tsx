"use client";

import { motion, transform, useTransform, type MotionValue } from "motion/react";
import {
  GoldCircleIcon,
  AwarenessIcon,
  PathwayIcon,
  BalanceIcon,
  SeasonsIcon,
} from "@/components/icons";
import { METHODIEK } from "@/lib/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { voorkomWees } from "@/lib/tekst";
import { RevealWords } from "@/components/karti/RevealWords";
import { PinnedScene } from "@/components/karti/motion/PinnedScene";
import { useBeat } from "@/components/karti/motion/useBeat";
import { DrawPath } from "@/components/karti/motion/DrawPath";

/* De Karti Methode: 4 pijlers in vaste volgorde.
   Desktop (JS, geen reduced-motion): DE gepinde scrolltelling-scène.
   De volgorde ís de methode, dus de scroll dwingt haar af: elke pijler
   krijgt een beat waarin het metafoor-glyph zichzelf tekent langs een
   gouden progressiedraad met Italiana-cijfers. Mobiel, reduced-motion
   en no-JS krijgen de statische pijler-stapel (fallback). */

const METHODIEK_ICONS = [AwarenessIcon, PathwayIcon, BalanceIcon, SeasonsIcon];
const BEATS = 4;

/* ── Glyphs: de vier metaforen als zelf-tekenende paden (24×24 basis) ── */
function BeatGlyph({
  index,
  draw,
}: {
  index: number;
  draw: MotionValue<number>;
}) {
  // hoofdvorm tekent eerst, accenten volgen in de tweede helft
  // (function-vorm: geen WAAPI-acceleratie, zie useBeat)
  const late = useTransform(() => transform([0.45, 1], [0, 1])(draw.get()));
  const dotOpacity = useTransform(() => transform([0.7, 1], [0, 1])(draw.get()));
  const common = {
    stroke: "#b08d3e",
    strokeWidth: 0.7,
    strokeLinecap: "round" as const,
    fill: "none" as const,
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-full h-full" aria-hidden>
      {index === 0 && (
        <>
          <DrawPath progress={draw} d="M 12 3 a 9 9 0 1 1 -0.02 0" {...common} />
          <motion.circle cx="12" cy="12" r="1.1" fill="#8b3a4a" style={{ opacity: dotOpacity }} />
        </>
      )}
      {index === 1 && (
        <>
          <DrawPath progress={draw} d="M3 9c3.5 0 5.5 6 9 6s5-6 9-6" {...common} />
          <DrawPath progress={late} d="M3 14c3.5 0 5.5-6 9-6s5 6 9 6" {...common} strokeOpacity={0.55} />
          <motion.circle cx="7" cy="11.5" r="0.7" fill="#8b3a4a" style={{ opacity: dotOpacity }} />
          <motion.circle cx="17" cy="11.5" r="0.7" fill="#8b3a4a" style={{ opacity: dotOpacity }} />
        </>
      )}
      {index === 2 && (
        <>
          <DrawPath progress={draw} d="M4 9.5 20 8" {...common} />
          <DrawPath progress={late} d="M12 8.8V19M8.5 19h7" {...common} />
          <motion.circle cx="4.6" cy="9.4" r="1.1" style={{ opacity: dotOpacity }} {...common} />
          <motion.circle cx="19.4" cy="8.1" r="1.1" style={{ opacity: dotOpacity }} {...common} />
        </>
      )}
      {index === 3 && (
        <>
          <DrawPath progress={draw} d="M12 3a9 9 0 0 1 9 9" {...common} />
          <DrawPath progress={draw} d="M21 12a9 9 0 0 1-9 9" {...common} strokeOpacity={0.75} />
          <DrawPath progress={late} d="M12 21a9 9 0 0 1-9-9" {...common} strokeOpacity={0.5} />
          <DrawPath progress={late} d="M3 12a9 9 0 0 1 9-9" {...common} strokeOpacity={0.3} />
          <motion.circle cx="12" cy="12" r="1" fill="#8b3a4a" style={{ opacity: dotOpacity }} />
        </>
      )}
    </svg>
  );
}

/* ── Rail: Italiana-cijfers met oplichtende actieve staat ── */
function RailItem({
  progress,
  index,
  label,
}: {
  progress: MotionValue<number>;
  index: number;
  label: string;
}) {
  const seg = 1 / BEATS;
  const start = index * seg;
  const mapOpacity = transform(
    index === 0
      ? [0, seg * 0.9, seg]
      : [start - seg * 0.1, start + seg * 0.15, start + seg * 0.9, start + seg],
    index === 0 ? [1, 1, 0.3] : [0.3, 1, 1, 0.3]
  );
  const opacity = useTransform(() => mapOpacity(progress.get()));
  return (
    <motion.span
      className="font-[family-name:var(--font-wordmark)] text-[#80662c] block"
      style={{ opacity, fontSize: "26px", letterSpacing: "0.18em", lineHeight: 1 }}
    >
      {label}
    </motion.span>
  );
}

/* ── Eén beat: glyph + tekst, cross-fade langs de track ── */
function MethodiekBeat({
  progress,
  index,
  pijler,
}: {
  progress: MotionValue<number>;
  index: number;
  pijler: (typeof METHODIEK.pijlers)[number];
}) {
  const { opacity, y } = useBeat(progress, index, BEATS);
  const seg = 1 / BEATS;
  const draw = useTransform(
    progress,
    [index * seg, index * seg + seg * 0.4],
    [0, 1]
  );

  return (
    <motion.div
      className="absolute inset-0 grid grid-cols-[minmax(260px,380px)_1fr] items-center gap-16 xl:gap-24"
      style={{ opacity, y }}
    >
      <div className="relative aspect-square w-full max-w-[380px]">
        <BeatGlyph index={index} draw={draw} />
      </div>
      <div className="max-w-[520px]">
        <div
          className="font-[family-name:var(--font-wordmark)] text-[#80662c] mb-4"
          style={{ fontSize: "22px", letterSpacing: "0.18em", lineHeight: 1 }}
        >
          {pijler.index}
        </div>
        <h3
          className="font-[family-name:var(--font-heading)] font-bold text-[#3d3228] mb-5"
          style={{ fontSize: "clamp(28px, 2.6vw, 40px)", lineHeight: 1.15 }}
        >
          {pijler.title}
        </h3>
        <hr className="gold-divider mb-6" />
        <p className="t4-body text-[#2e2622]" style={{ fontSize: "18px", lineHeight: 1.65 }}>
          {voorkomWees(pijler.body)}
        </p>
      </div>
    </motion.div>
  );
}

/* ── Stage: rail links, beats rechts ── */
function MethodiekStage({ progress }: { progress: MotionValue<number> }) {
  const threadScale = useTransform(() => progress.get());
  return (
    <div className="container-wide h-full flex items-center">
      <div className="grid grid-cols-[72px_1fr] gap-12 xl:gap-20 w-full items-center">
        <div className="relative h-[56vh] flex flex-col justify-between items-start py-2">
          <div
            aria-hidden
            className="absolute left-[54px] top-0 bottom-0 w-px bg-[#b08d3e]/20"
          />
          <motion.div
            aria-hidden
            className="absolute left-[54px] top-0 bottom-0 w-px bg-[#b08d3e] origin-top"
            style={{ scaleY: threadScale }}
          />
          {METHODIEK.pijlers.map((p, i) => (
            <RailItem key={p.index} progress={progress} index={i} label={p.index} />
          ))}
        </div>
        <div className="relative h-[56vh]">
          {METHODIEK.pijlers.map((p, i) => (
            <MethodiekBeat key={p.index} progress={progress} index={i} pijler={p} />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Fallback: de statische pijler-stapel (mobiel / RM / no-JS) ── */
function MethodiekFallback() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  return (
    <div className="container-wide relative">
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
                    {voorkomWees(p.body)}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

export function Methodiek() {
  return (
    <section id="methode" className="relative bg-[#faf6f0] pt-20 lg:pt-36 pb-20 lg:pb-36 overflow-clip">
      <GoldCircleIcon
        aria-hidden
        className="absolute -left-44 top-20 w-[440px] h-[440px] text-[#c9a854] opacity-[0.07]"
      />
      <div className="container-wide relative">
        <div className="text-center mb-10 lg:mb-16 max-w-[760px] mx-auto">
          <div className="t6-label text-[#80662c] mb-4 lg:mb-5">{METHODIEK.label}</div>
          <RevealWords text={METHODIEK.headline} className="t2-section mb-7 text-balance" />
          <hr className="gold-divider mx-auto mb-7" />
          <p className="t4-body text-[#2e2622]">{METHODIEK.intro}</p>
        </div>
      </div>

      <PinnedScene beats={BEATS} fallback={<MethodiekFallback />}>
        {(progress) => <MethodiekStage progress={progress} />}
      </PinnedScene>

      <div className="container-wide relative">
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
