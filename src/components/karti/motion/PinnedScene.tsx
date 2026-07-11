"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useScroll, type MotionValue } from "motion/react";

/**
 * PinnedScene: browser-native pinning via CSS sticky + Motion-scrub.
 *
 * - Track (beats × 110vh + 100vh) met een sticky stage van 100dvh; de
 *   scrub komt uit useScroll op de track en loopt buiten de React-render.
 * - Scene (desktop) én fallback (statische stapel) worden BEIDE gerenderd;
 *   CSS beslist wat zichtbaar is: track alleen onder html.js op lg+ en
 *   zonder prefers-reduced-motion. Geen JS-swap, geen CLS, geen verborgen
 *   content voor no-JS of reduced-motion gebruikers.
 * - Track-ancestors mogen nooit overflow-hidden zetten (sticky sneuvelt);
 *   bleeds horen in binnenste overflow-clip wrappers.
 */
export function PinnedScene({
  beats,
  children,
  fallback,
  className = "",
}: {
  beats: number;
  children: (progress: MotionValue<number>) => ReactNode;
  fallback: ReactNode;
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  return (
    <div className={`pin-scene ${className}`}>
      <div
        ref={trackRef}
        className="pin-track"
        style={{ "--beats": beats } as CSSProperties}
      >
        <div className="pin-stage">{children(scrollYProgress)}</div>
      </div>
      <div className="pin-fallback">{fallback}</div>
    </div>
  );
}
