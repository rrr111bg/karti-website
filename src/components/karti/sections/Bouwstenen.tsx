"use client";

import {
  BlueprintDotsIcon,
  DiamondMarkIcon,
  CrosshairCircleIcon,
  CycleSpiralIcon,
  UpDownArrowsIcon,
  SineWaveIcon,
} from "@/components/icons";
import { BOUWSTENEN } from "@/lib/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { voorkomWees } from "@/lib/tekst";
import { RevealWords } from "@/components/karti/RevealWords";

/* De Bouwstenen */
const BOUWSTEEN_ICONS = [
  BlueprintDotsIcon,
  DiamondMarkIcon,
  CrosshairCircleIcon,
  CycleSpiralIcon,
  UpDownArrowsIcon,
  SineWaveIcon,
];

/* Blueprint Spread card - used in 3×2 grid */
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
        {voorkomWees(card.body)}
      </p>
    </article>
  );
}

export function Bouwstenen() {
  return (
    <section
      id="bouwstenen"
      className="relative bg-[#f2eae0] py-20 lg:py-40 overflow-hidden"
    >
      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-20 max-w-[720px] mx-auto">
          <RevealWords text={BOUWSTENEN.headline} className="t2-section mb-6 lg:mb-8 text-balance" />
          <hr className="gold-divider mx-auto mb-8" />
          <p className="t4-body text-[#2e2622]">{BOUWSTENEN.intro}</p>
        </div>

        {/* Blueprint Spread: 3×2 grid with vertical gold thread down the middle on desktop */}
        <div className="relative">
          {/* Vertical gold thread - desktop only, down the middle between columns */}
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
