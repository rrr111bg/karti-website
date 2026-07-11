"use client";

import type { ReactNode } from "react";
import { HERKENNING } from "@/lib/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RevealWords } from "@/components/karti/RevealWords";

/* Herkenning: kinetic-type scène (scrolltelling 1, niet gepind).
   De vier signalen als grote Lora-italic regels die één voor één landen
   terwijl je scrolt; geen bullets, geen kaders, alleen typografie.
   De climax ("Het hoort er niet bij!") krijgt een gehouden beat:
   scale + rise + een zachte rose gloed. Alles via het bewezen
   html.js/IO-patroon, dus no-JS en reduced-motion zien alles direct. */

function KinLine({ children, index }: { children: ReactNode; index: number }) {
  const { ref, inView } = useScrollReveal<HTMLLIElement>({ threshold: 0.5 });
  return (
    <li
      ref={ref}
      className={`kin-line scroll-reveal-init ${inView ? "scroll-reveal-in" : ""}`}
      style={{ transitionDelay: `${(index % 2) * 90}ms` }}
    >
      {children}
    </li>
  );
}

export function Herkenning() {
  const { ref: climaxRef, inView: climaxIn } = useScrollReveal<HTMLDivElement>({
    threshold: 0.4,
  });
  return (
    <section id="herkenning" className="py-20 lg:py-40">
      <div className="container-narrow">
        <hr className="gold-divider-short mx-auto mb-10" />
        <RevealWords
          text={HERKENNING.headline}
          className="t2-section mb-14 lg:mb-24 text-center text-balance"
        />
        {/* de signalen: links uitgelijnd in een gecentreerde smalle kolom */}
        <ul className="max-w-[760px] mx-auto flex flex-col gap-9 lg:gap-14 mb-16 lg:mb-24 list-none text-left">
          {HERKENNING.signals.map((signal, i) => (
            <KinLine key={signal} index={i}>
              {signal}
            </KinLine>
          ))}
        </ul>
        <p className="t4-body text-balance text-center text-[#2e2622] max-w-[560px] mx-auto mb-14 lg:mb-20">
          {HERKENNING.body}
        </p>
        {/* climax met gehouden beat en zachte rose gloed */}
        <div ref={climaxRef} className="relative text-center">
          <span
            aria-hidden
            className={`kin-glow ${climaxIn ? "in" : ""}`}
          />
          <p
            className={`text-gradient-rose kin-climax ${climaxIn ? "in" : ""}`}
          >
            {HERKENNING.deepRoseQuote}
          </p>
        </div>
      </div>
    </section>
  );
}
