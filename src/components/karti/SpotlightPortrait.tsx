"use client";

import Image from "next/image";
import { useRef } from "react";
import { useFinePointer } from "@/hooks/useFinePointer";

/**
 * Spotlight-reveal op het hero-portret: het zwart-wit portret toont een
 * warme goudtint binnen een zachte lichtcirkel die de cursor traag volgt.
 * "Zichtbaar maken wat verborgen is", als gebaar.
 *
 * - Pure CSS-mask met variabelen, geen canvas: 60fps, ~0 geheugen.
 * - Alleen met fijne pointer en zonder reduced-motion (useFinePointer);
 *   op touch en mobiel bestaat de overlay simpelweg niet.
 */
export function SpotlightPortrait() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const state = useRef({ tx: 0, ty: 0, cx: 0, cy: 0, raf: 0, running: false });
  const enabled = useFinePointer();

  const tick = () => {
    const s = state.current;
    s.cx += (s.tx - s.cx) * 0.14;
    s.cy += (s.ty - s.cy) * 0.14;
    const el = overlayRef.current;
    if (el) {
      el.style.setProperty("--sx", `${s.cx.toFixed(1)}px`);
      el.style.setProperty("--sy", `${s.cy.toFixed(1)}px`);
    }
    if (Math.abs(s.tx - s.cx) > 0.4 || Math.abs(s.ty - s.cy) > 0.4) {
      s.raf = requestAnimationFrame(tick);
    } else {
      s.running = false;
    }
  };

  const kick = () => {
    if (!state.current.running) {
      state.current.running = true;
      state.current.raf = requestAnimationFrame(tick);
    }
  };

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-full rounded-full overflow-hidden border border-[#b08d3e]/60 bg-[#faf6f0]"
      onPointerMove={
        enabled
          ? (e) => {
              const r = wrapRef.current?.getBoundingClientRect();
              if (!r) return;
              state.current.tx = e.clientX - r.left;
              state.current.ty = e.clientY - r.top;
              overlayRef.current?.classList.add("visible");
              kick();
            }
          : undefined
      }
      onPointerLeave={
        enabled
          ? () => overlayRef.current?.classList.remove("visible")
          : undefined
      }
    >
      <Image
        src="/images/nasra-closeup.jpg"
        alt="Nasra, oprichter van Karti"
        fill
        priority
        sizes="(max-width: 1024px) 250px, 400px"
        className="object-cover scale-[1.04]"
      />
      {enabled && (
        <div ref={overlayRef} className="spotlight-overlay" aria-hidden>
          <Image
            src="/images/nasra-closeup.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 250px, 400px"
            className="object-cover scale-[1.04] spotlight-warm"
          />
        </div>
      )}
    </div>
  );
}
