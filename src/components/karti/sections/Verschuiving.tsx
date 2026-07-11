"use client";

import { VAN_NAAR } from "@/lib/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { voorkomWees } from "@/lib/tekst";
import { RevealWords } from "@/components/karti/RevealWords";
import { OntwarDraad } from "@/components/karti/OntwarDraad";

/* De Verschuiving: van overleven naar begrijpen */
export function Verschuiving() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  return (
    <section className="relative bg-[#f2eae0] pb-20 lg:pb-36 overflow-hidden">
      <div className="container-narrow">
        <div className="text-center mb-10 lg:mb-14">
          <div className="t6-label text-[#80662c] mb-4 lg:mb-5">{VAN_NAAR.label}</div>
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
            <div key={paar.van} className="vn-paar">
              <div
                className={`vn-cel vn-nu scroll-reveal-init ${inView ? "scroll-reveal-in" : ""}`}
                style={{ transitionDelay: `${i * 130}ms` }}
              >
                <p>
                  <span className="vn-mini vn-mini-nu">Nu</span>
                  {voorkomWees(paar.van)}
                </p>
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
                <p>
                  <span className="vn-mini vn-mini-straks">Straks</span>
                  {voorkomWees(paar.naar)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
