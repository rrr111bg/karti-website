"use client";

import { ArchitecturalArcIcon } from "@/components/icons";
import { TIJDLIJN } from "@/lib/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { voorkomWees } from "@/lib/tekst";
import { RevealWords } from "@/components/karti/RevealWords";

/* Jouw eerste drie maanden (tastbaar maken) */
export function Tijdlijn() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.15 });
  return (
    <section className="relative bg-[#faf6f0] py-20 lg:py-36 overflow-hidden">
      <ArchitecturalArcIcon
        aria-hidden
        className="absolute -left-32 -bottom-32 w-[420px] h-[420px] text-[#c9a854] opacity-[0.06]"
      />
      <div className="container-wide relative">
        <div className="text-center mb-10 lg:mb-16 max-w-[680px] mx-auto">
          <div className="t6-label text-[#80662c] mb-4 lg:mb-5">{TIJDLIJN.label}</div>
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
                  {voorkomWees(m.body)}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
