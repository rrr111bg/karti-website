"use client";

import { useRef } from "react";
import { useScroll } from "motion/react";
import { VAN_NAAR } from "@/lib/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { voorkomWees } from "@/lib/tekst";
import { RevealWords } from "@/components/karti/RevealWords";
import { OntwarDraad } from "@/components/karti/OntwarDraad";
import { DrawPath } from "@/components/karti/motion/DrawPath";

/* De Verschuiving: van overleven naar begrijpen (scrolltelling 2).
   De gouden spine loopt verticaal door de connector-kolom: bovenaan
   geknoopt, onderaan strak. Hij tekent zichzelf met de scroll (scrub);
   de paren onthullen per rij en de OntwarDraad ontwart per kruispunt.
   Mobiel: de bewezen paar-kaarten, spine verborgen. Reduced-motion en
   no-JS zien de spine volgetekend (DrawPath + globale CSS-override). */
export function Verschuiving() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.2 });
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.55"],
  });

  return (
    <section ref={sectionRef} className="relative bg-[#f2eae0] pb-20 lg:pb-36 overflow-hidden">
      <div className="container-narrow">
        <div className="text-center mb-10 lg:mb-14">
          <RevealWords
            text={VAN_NAAR.headline}
            className="t2-section text-balance"
            style={{ fontSize: "clamp(24px, 2.8vw, 38px)" }}
          />
        </div>
        <div ref={ref} className="relative max-w-[880px] mx-auto">
          {/* De spine: geknoopt boven, strak onder; tekent met de scroll.
              Alleen zichtbaar op de 3-koloms layout (sm+). */}
          <svg
            aria-hidden
            viewBox="0 0 76 1000"
            preserveAspectRatio="none"
            fill="none"
            className="hidden sm:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 h-full w-[76px] pointer-events-none"
          >
            <DrawPath
              progress={scrollYProgress}
              d="M 38 0
                 C 64 36, 10 62, 38 96
                 C 66 130, 12 152, 38 188
                 C 56 212, 30 232, 38 262
                 C 44 284, 38 310, 38 340
                 L 38 1000"
              stroke="#b08d3e"
              strokeWidth="1.6"
              strokeOpacity="0.45"
              strokeLinecap="round"
            />
          </svg>
          <div className="vannaar-grid relative">
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
      </div>
    </section>
  );
}
