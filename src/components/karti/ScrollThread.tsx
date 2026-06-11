"use client";

import { useEffect, useRef, useState } from "react";

/**
 * De gouden scroll-draad: een verticale lijn in de linkermarge die zich
 * vult met de scrollvoortgang, met een gouden dot als reiziger en fijne
 * ticks per sectie. Architecturale variant van het wortel/pad-motief.
 *
 * - Alleen ≥768px (CSS verbergt hem op mobiel: rust en ruimte).
 * - Goud werkt op zowel Sandstone als Night Bloom, dus geen blend-modes.
 * - reduced-motion: CSS verbergt dot en vullijn, de statische track blijft.
 * - Puur decoratief: aria-hidden, pointer-events none.
 */
export function ScrollThread() {
  const fillRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [ticks, setTicks] = useState<number[]>([]);

  // sectie-ticks: posities van de genummerde secties op de scroll-as
  useEffect(() => {
    const calc = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      const secties = Array.from(
        document.querySelectorAll<HTMLElement>("main section[id]")
      );
      setTicks(
        secties.map((s) => Math.max(0, Math.min(1, s.offsetTop / max)))
      );
    };
    // na hydration én nadat fonts/afbeeldingen de hoogte zetten
    const t1 = window.setTimeout(calc, 300);
    const t2 = window.setTimeout(calc, 1800);
    window.addEventListener("resize", calc, { passive: true });
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("resize", calc);
    };
  }, []);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max =
          document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        fillRef.current?.style.setProperty("--p", p.toFixed(4));
        dotRef.current?.style.setProperty("--p", p.toFixed(4));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="scroll-thread" aria-hidden>
      <div className="scroll-thread-track" />
      <div ref={fillRef} className="scroll-thread-fill" />
      {ticks.map((t, i) => (
        <span
          key={i}
          className="scroll-thread-tick"
          style={{ top: `${(t * 100).toFixed(2)}%` }}
        />
      ))}
      <div ref={dotRef} className="scroll-thread-dot" />
    </div>
  );
}
