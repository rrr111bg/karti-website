"use client";

import { useEffect, useRef, useState } from "react";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * useStepScroll — returns the active step index and total progress
 * for a tall, sticky-pinned section. The section element is expected
 * to be taller than the viewport by `steps * 100vh`.
 *
 * Returns:
 * - ref: attach to the outer <section>
 * - activeStep: 0..steps-1
 * - progress: 0..1 (continuous scroll progress across section)
 * - reduced: true if prefers-reduced-motion (consumers can fall back)
 */
export function useStepScroll<T extends HTMLElement = HTMLElement>(steps: number) {
  const ref = useRef<T | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [progress, setProgress] = useState(0);
  // Lazy-init from matchMedia so we never set state inside the effect body.
  const [reduced] = useState<boolean>(() => prefersReducedMotion());

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (reduced) return;

    let rafId: number | null = null;

    const compute = () => {
      rafId = null;
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const total = node.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = scrolled / total; // 0..1
      setProgress(p);
      const step = Math.min(steps - 1, Math.max(0, Math.floor(p * steps)));
      setActiveStep(step);
    };

    const onScroll = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId != null) window.cancelAnimationFrame(rafId);
    };
  }, [steps, reduced]);

  return { ref, activeStep, progress, reduced };
}
