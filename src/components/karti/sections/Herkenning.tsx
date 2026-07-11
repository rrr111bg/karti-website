"use client";

import { FullMoonIcon } from "@/components/icons";
import { HERKENNING } from "@/lib/content";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { RevealWords } from "@/components/karti/RevealWords";

export function Herkenning() {
  const { ref, inView } = useScrollReveal<HTMLDivElement>({ threshold: 0.25 });
  return (
    <section id="herkenning" className="py-20 lg:py-40">
      <div ref={ref} className="container-narrow text-center">
        <hr className="gold-divider-short mx-auto mb-10" />
        <RevealWords text={HERKENNING.headline} className="t2-section mb-10 lg:mb-14" />
        {/* rustige linkerlijn: lijst links uitgelijnd in gecentreerde kolom */}
        <ul className="flex flex-col gap-6 lg:gap-7 mb-10 lg:mb-14 max-w-[620px] mx-auto text-left">
          {HERKENNING.signals.map((signal) => (
            <li
              key={signal}
              className="t3-quote flex items-start gap-5 text-[#3d3228]"
              style={{ fontSize: "clamp(20px, 1.9vw, 27px)" }}
            >
              <FullMoonIcon className="w-[12px] h-[12px] mt-[15px] text-[#b06b72] flex-shrink-0" />
              <span>{signal}</span>
            </li>
          ))}
        </ul>
        <p className="t4-body text-balance text-[#2e2622] max-w-[560px] mx-auto mb-12">
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
