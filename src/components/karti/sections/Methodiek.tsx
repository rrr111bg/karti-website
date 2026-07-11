"use client";

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

/* De Karti Methode: 4 pijlers in vaste volgorde */
const METHODIEK_ICONS = [AwarenessIcon, PathwayIcon, BalanceIcon, SeasonsIcon];

export function Methodiek() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  return (
    <section id="methode" className="relative bg-[#faf6f0] py-20 lg:py-36 overflow-hidden">
      <GoldCircleIcon
        aria-hidden
        className="absolute -left-44 top-20 w-[440px] h-[440px] text-[#c9a854] opacity-[0.07]"
      />
      <div className="container-wide relative">
        <div className="text-center mb-10 lg:mb-20 max-w-[760px] mx-auto">
          <div className="t6-label text-[#80662c] mb-4 lg:mb-5">{METHODIEK.label}</div>
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
                      {voorkomWees(p.body)}
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
