"use client";

import { useEffect, useRef, useState } from "react";

type Options = {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
};

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * useScrollReveal — fires once when element enters viewport.
 * Respects prefers-reduced-motion: inView wordt direct na mount true.
 *
 * Let op: initialiseer NOOIT op prefersReducedMotion() — de server rendert
 * false en React 19 patcht attribuut-mismatches bewust niet, waardoor de
 * eindstaat-klasse nooit aankomt en content onzichtbaar blijft voor
 * reduced-motion gebruikers. Daarom: server-consistent starten op false
 * en de eindstaat asynchroon zetten ná hydration.
 */
export function useScrollReveal<T extends HTMLElement>({
  threshold = 0.2,
  once = true,
  rootMargin = "0px 0px -5% 0px",
}: Options = {}) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) {
      const raf = window.requestAnimationFrame(() => setInView(true));
      return () => window.cancelAnimationFrame(raf);
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, once, rootMargin]);

  return { ref, inView };
}
