"use client";

import { useSyncExternalStore, type ReactNode } from "react";
import dynamic from "next/dynamic";

/**
 * Tilt-microinteractie voor de aanbod-cards.
 *
 * - Alleen actief met een fijne pointer (muis/trackpad) en zonder
 *   prefers-reduced-motion; op touch en bij reduced motion is dit een
 *   gewone div en doet de bestaande CSS hover-lift het werk.
 * - Primair: Framer Motion (motion/react) met spring-physics.
 * - Fallback: pure requestAnimationFrame-implementatie als de
 *   motion-chunk niet kan laden.
 */

type TiltProps = { children: ReactNode; className?: string };

const LazyTilt = dynamic<TiltProps>(
  () => import("./MotionTilt").catch(() => import("./RafTilt")),
  { ssr: false }
);

const QUERIES = ["(pointer: fine)", "(prefers-reduced-motion: reduce)"];

function subscribeMedia(onChange: () => void) {
  const lists = QUERIES.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () =>
    lists.forEach((l) => l.removeEventListener("change", onChange));
}

function tiltEligible(): boolean {
  return (
    window.matchMedia(QUERIES[0]).matches &&
    !window.matchMedia(QUERIES[1]).matches
  );
}

export function TiltCard({ children, className = "" }: TiltProps) {
  const enabled = useSyncExternalStore(
    subscribeMedia,
    tiltEligible,
    () => false // server: statisch
  );

  if (!enabled) return <div className={className}>{children}</div>;
  return <LazyTilt className={className}>{children}</LazyTilt>;
}
