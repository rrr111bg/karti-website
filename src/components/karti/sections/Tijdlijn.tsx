"use client";

import type { ReactNode } from "react";
import { ArchitecturalArcIcon } from "@/components/icons";
import { TIJDLIJN } from "@/lib/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useActiveIndex } from "@/hooks/useActiveIndex";
import { voorkomWees } from "@/lib/tekst";
import { RevealWords } from "@/components/karti/RevealWords";

/* Jouw eerste drie maanden: sticky-sidebar tijdlijn.
   Links plakt de kop met een groot Italiana-maandcijfer dat crossfadet
   met het maandblok dat in beeld is (IntersectionObserver, geen
   scroll-listener); rechts scrollen de maanden met royale editorial
   ruimte. Mobiel: gestapeld, geen sticky. Sectie-eyebrow niet meer
   gerenderd (budget); de sectie zet geen overflow (sticky-veilig),
   de decoratieve boog leeft in een eigen clip-laag. */

function TijdlijnBlokInhoud({ children }: { children: ReactNode }) {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.3 });
  return (
    <div
      ref={ref}
      className={`scroll-reveal-init ${inView ? "scroll-reveal-in" : ""}`}
    >
      {children}
    </div>
  );
}

export function Tijdlijn() {
  const { active, setRef } = useActiveIndex<HTMLLIElement>(3);

  return (
    <section className="relative bg-[#faf6f0] py-20 lg:py-36">
      <div aria-hidden className="absolute inset-0 overflow-clip pointer-events-none">
        <ArchitecturalArcIcon
          className="absolute -left-32 -bottom-32 w-[420px] h-[420px] text-[#c9a854] opacity-[0.06]"
        />
      </div>
      <div className="container-wide relative">
        <div className="grid grid-cols-1 lg:grid-cols-[0.38fr_0.62fr] gap-12 lg:gap-24 items-start">
          {/* Sticky kopkolom met maandcijfer */}
          <div className="lg:sticky lg:top-[120px] self-start">
            <RevealWords text={TIJDLIJN.headline} className="t2-section mb-6 text-balance" />
            <hr className="gold-divider mb-6" />
            <p className="t4-body text-[#2e2622] max-w-[38ch]">{TIJDLIJN.intro}</p>
            <div className="tl-numeral-stack hidden lg:block" aria-hidden>
              {["1", "2", "3"].map((n, i) => (
                <span key={n} className={`tl-numeral ${active === i ? "in" : ""}`}>
                  {n}
                </span>
              ))}
            </div>
          </div>
          {/* De drie maanden */}
          <ol className="flex flex-col gap-16 lg:gap-36 lg:pt-6 lg:pb-24">
            {TIJDLIJN.maanden.map((m, i) => (
              <li key={m.index} ref={setRef(i)}>
                <TijdlijnBlokInhoud>
                  <div className="t6-label text-[#80662c] mb-3">{m.index}</div>
                  <h3
                    className="font-[family-name:var(--font-heading)] font-bold text-[#3d3228] mb-4"
                    style={{ fontSize: "clamp(24px, 2vw, 32px)", lineHeight: 1.15 }}
                  >
                    {m.title}
                  </h3>
                  <hr
                    className="mb-5"
                    style={{ width: 40, height: 1, border: 0, background: "#b08d3e", opacity: 0.5 }}
                  />
                  <p className="t4-body text-[#2e2622] max-w-[52ch]" style={{ fontSize: "17px", lineHeight: 1.65 }}>
                    {voorkomWees(m.body)}
                  </p>
                </TijdlijnBlokInhoud>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
