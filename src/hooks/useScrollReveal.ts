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
 * Respects prefers-reduced-motion: inView is true immediately.
 */
export function useScrollReveal<T extends HTMLElement>({
  threshold = 0.2,
  once = true,
  rootMargin = "0px 0px -5% 0px",
}: Options = {}) {
  const ref = useRef<T | null>(null);
  // Initialize to true if reduced-motion, so consumers render final state.
  const [inView, setInView] = useState<boolean>(() => prefersReducedMotion());

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion()) return;

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
