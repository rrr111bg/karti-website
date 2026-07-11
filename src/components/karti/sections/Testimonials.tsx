"use client";

import { useState } from "react";
import { TESTIMONIALS } from "@/lib/content";
import { RevealWords } from "@/components/karti/RevealWords";

/* Testimonials: statisch bewijs, geen carrousel
   Drie verhalen direct zichtbaar op elk formaat (bewijs mag je niet
   hoeven zoeken), de rest achter een rustige expander. */
export function Testimonials() {
  const [showAll, setShowAll] = useState(false);
  const items = showAll ? TESTIMONIALS.items : TESTIMONIALS.items.slice(0, 3);

  return (
    <section id="testimonials" className="relative night-bloom py-20 lg:py-40">
      <div className="velvet-texture" />
      <div className="container-wide relative">
        <div className="text-center mb-10 lg:mb-16">
          <hr
            className="mx-auto mb-6"
            style={{ width: 80, height: 1, border: 0, background: "#c9a854", opacity: 0.7 }}
          />
          <RevealWords text={TESTIMONIALS.headline} className="t2-section text-[#fbf7f3]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 max-w-[1180px] mx-auto">
          {items.map((t) => (
            <article
              key={t.name}
              className="border border-[#c9a854]/30 p-8 lg:p-10 bg-transparent flex flex-col"
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

        <div className="text-center mt-12">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            className="btn-outline-gold-light"
          >
            {showAll ? TESTIMONIALS.collapseLabel : TESTIMONIALS.expandLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
