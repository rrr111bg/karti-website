"use client";

import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { TESTIMONIALS } from "@/lib/content";
import { RevealWords } from "@/components/karti/RevealWords";

/* Testimonials: horizontale snap-rail op Night Bloom.
   Alle negen verhalen direct bereikbaar (geen expander, geen timer):
   native scroll-snap met touch, trackpad en toetsenbord, en een gouden
   voortgangshairline op scrollXProgress als feedback. Velvet en
   gold-threads dragen de signatuur van de donkere acte. */
export function Testimonials() {
  const railRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({ container: railRef });

  return (
    <section id="testimonials" className="relative night-bloom py-20 lg:py-36">
      <div className="velvet-texture" />
      <div className="gold-threads" aria-hidden />
      <div className="container-wide relative">
        <div className="text-center mb-10 lg:mb-14">
          <hr
            className="mx-auto mb-6"
            style={{ width: 80, height: 1, border: 0, background: "#c9a854", opacity: 0.7 }}
          />
          <RevealWords text={TESTIMONIALS.headline} className="t2-section text-[#fbf7f3]" />
        </div>
      </div>

      <div className="relative">
        {/* randvervaging: de rail loopt visueel het noir in */}
        <div aria-hidden className="rail-fade rail-fade-left hidden sm:block" />
        <div aria-hidden className="rail-fade rail-fade-right hidden sm:block" />
        <div
          ref={railRef}
          role="region"
          aria-label="Verhalen van vrouwen die je voorgingen"
          tabIndex={0}
          className="rail no-scrollbar flex gap-5 lg:gap-8 overflow-x-auto snap-x snap-mandatory pb-4 px-5 sm:px-10 xl:px-[max(96px,calc((100vw-1400px)/2))] scroll-px-5 sm:scroll-px-10 xl:scroll-px-[max(96px,calc((100vw-1400px)/2))]"
        >
          {TESTIMONIALS.items.map((t) => (
            <article
              key={t.name}
              className="snap-start shrink-0 w-[82vw] sm:w-[380px] lg:w-[400px] border border-[#c9a854]/30 p-8 lg:p-10 flex flex-col bg-[#1a1614]/40"
            >
              <h3
                className="font-[family-name:var(--font-heading)] italic text-[#e2cda0] mb-4"
                style={{ fontSize: "16px", letterSpacing: "0.01em" }}
              >
                {t.title}
              </h3>
              <p
                className="font-[family-name:var(--font-heading)] italic text-[#fbf7f3] mb-6 flex-1"
                style={{ fontSize: "19px", lineHeight: 1.55 }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <hr
                className="mb-4"
                style={{ width: 40, height: 1, border: 0, background: "#c9a854", opacity: 0.6 }}
              />
              <div className="t6-label text-[#c9a854]">{t.name}</div>
            </article>
          ))}
        </div>
      </div>

      <div className="container-wide relative mt-4">
        <div className="rail-progress" aria-hidden>
          <motion.div
            className="rail-progress-fill"
            style={{ scaleX: scrollXProgress }}
          />
        </div>
      </div>
    </section>
  );
}
