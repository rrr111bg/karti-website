"use client";

import type { ComponentType, SVGProps } from "react";
import {
  BlueprintDotsIcon,
  DiamondMarkIcon,
  CrosshairCircleIcon,
  CycleSpiralIcon,
  UpDownArrowsIcon,
  SineWaveIcon,
  WaterElementIcon,
  FireElementIcon,
  EarthElementIcon,
  AirElementIcon,
} from "@/components/icons";
import { BOUWSTENEN } from "@/lib/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { voorkomWees } from "@/lib/tekst";
import { RevealWords } from "@/components/karti/RevealWords";

/* De Bouwstenen: asymmetrische bento.
   Zes cellen, zes maten en tinten: de Blueprint (het hart van het
   aanbod) featured op 2x2 met gouden dot-textuur; de andere vijf in
   brand-tinten (Sage Breath, Rose Whisper, warm-clay, gold-haze) met
   ghosted metafoor-glyphs. Bewust geen donkere cel: het enige
   Night-Bloom-kaartmoment aan de Dawn-kant blijft de featured prijs. */

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const CELL_STYLE: {
  area: string;
  tint: string;
  icon: IconType;
  featured?: boolean;
}[] = [
  { area: "bs-a", tint: "bg-[#faf6f0] blueprint-grid", icon: BlueprintDotsIcon, featured: true },
  { area: "bs-b", tint: "bg-[#eef0e8]", icon: DiamondMarkIcon },
  { area: "bs-c", tint: "bg-[#f5eded]", icon: CrosshairCircleIcon },
  { area: "bs-d", tint: "bg-[#faf6f0]", icon: CycleSpiralIcon },
  { area: "bs-e", tint: "bg-[#d6ccbe]/35", icon: UpDownArrowsIcon },
  { area: "bs-f", tint: "bg-[#e2cda0]/25", icon: SineWaveIcon },
];

const ELEMENT_ICONS: IconType[] = [
  WaterElementIcon,
  FireElementIcon,
  EarthElementIcon,
  AirElementIcon,
];

function BentoCell({
  card,
  index,
}: {
  card: (typeof BOUWSTENEN.cards)[number];
  index: number;
}) {
  const { area, tint, icon: Icon, featured } = CELL_STYLE[index];
  const { ref, inView } = useScrollReveal<HTMLElement>({ threshold: 0.15 });
  const isElementen = index === 1;

  return (
    <article
      ref={ref}
      className={`bento-cell scroll-reveal-init relative overflow-clip border border-[#b08d3e]/30 flex flex-col ${tint} ${
        featured ? "p-10 lg:p-14" : "p-8 lg:p-10"
      } ${inView ? "scroll-reveal-in" : ""}`}
      style={{ gridArea: area, transitionDelay: `${index * 90}ms` }}
    >
      {featured && (
        <div aria-hidden className="absolute inset-3 border border-[#b08d3e]/25 pointer-events-none" />
      )}
      {/* ghosted glyph: het metafoor-teken als stille achtergrondlaag */}
      <Icon
        aria-hidden
        className={`absolute pointer-events-none text-[#b08d3e] ${
          featured
            ? "w-[340px] h-[340px] -right-16 -bottom-16 opacity-[0.08]"
            : "w-[180px] h-[180px] -right-10 -bottom-10 opacity-[0.09]"
        }`}
      />
      <div className="relative flex items-start justify-between mb-5">
        <div
          className="font-[family-name:var(--font-wordmark)] text-[#b08d3e]"
          style={{ fontSize: featured ? "34px" : "24px", letterSpacing: "0.15em", lineHeight: 1 }}
        >
          {card.index}
        </div>
        {isElementen ? (
          <div className="flex items-center gap-3 text-[#80662c]">
            {ELEMENT_ICONS.map((El, i) => (
              <El key={i} className="w-6 h-6" aria-hidden />
            ))}
          </div>
        ) : (
          <Icon className={`text-[#b08d3e] ${featured ? "w-10 h-10" : "w-8 h-8"}`} />
        )}
      </div>
      <h3
        className="relative font-[family-name:var(--font-heading)] font-bold text-[#3d3228] mb-4"
        style={{
          fontSize: featured ? "clamp(28px, 2.4vw, 38px)" : "clamp(21px, 1.7vw, 26px)",
          lineHeight: 1.12,
          letterSpacing: "-0.01em",
        }}
      >
        {card.title}
      </h3>
      <hr
        className="relative mb-4"
        style={{ width: 40, height: 1, border: 0, background: "#b08d3e", opacity: 0.5 }}
      />
      {/* featured cel is 2x2: body ademt verticaal mee in de ruimte */}
      <div className={featured ? "relative flex-1 flex flex-col justify-center pb-10" : "relative"}>
        <p
          className="t4-body text-[#2e2622] max-w-[52ch]"
          style={{
            fontSize: featured ? "clamp(18px, 1.4vw, 21px)" : "16px",
            lineHeight: featured ? 1.7 : 1.6,
          }}
        >
          {voorkomWees(card.body)}
        </p>
      </div>
    </article>
  );
}

export function Bouwstenen() {
  return (
    <section
      id="bouwstenen"
      className="relative bg-[#f2eae0] py-20 lg:py-40 overflow-clip"
    >
      <div className="container-wide relative">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-20 max-w-[720px] mx-auto">
          <RevealWords text={BOUWSTENEN.headline} className="t2-section mb-6 lg:mb-8 text-balance" />
          <hr className="gold-divider mx-auto mb-8" />
          <p className="t4-body text-[#2e2622]">{BOUWSTENEN.intro}</p>
        </div>

        {/* Bento: exact zes cellen, gemengde maten en tinten */}
        <div className="bento">
          {BOUWSTENEN.cards.map((card, i) => (
            <BentoCell key={card.index} card={card} index={i} />
          ))}
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
