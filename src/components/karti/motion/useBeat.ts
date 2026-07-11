"use client";

import { useTransform, type MotionValue } from "motion/react";

/**
 * useBeat: opacity/y voor beat `index` van `total` binnen een
 * PinnedScene-progress (0..1). Overlappende ramps zorgen voor een
 * cross-fade: de volgende beat komt op terwijl de vorige wijkt.
 * Beat 0 staat bij progress 0 al klaar; de laatste beat blijft staan
 * tot de track loslaat. Alleen transform/opacity.
 */
export function useBeat(
  progress: MotionValue<number>,
  index: number,
  total: number
): { opacity: MotionValue<number>; y: MotionValue<number> } {
  const seg = 1 / total;
  const start = index * seg;
  const end = start + seg;
  const ramp = seg * 0.22;
  const first = index === 0;
  const last = index === total - 1;

  // Keyframes strikt oplopend houden; useTransform clamp't buiten bereik.
  const stops = first
    ? [0, end - ramp, end]
    : last
      ? [start, start + ramp, 1]
      : [start, start + ramp, end - ramp, end];

  const opacity = useTransform(
    progress,
    stops,
    first ? [1, 1, 0] : last ? [0, 1, 1] : [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    stops,
    first ? [0, 0, -28] : last ? [28, 0, 0] : [28, 0, 0, -28]
  );

  return { opacity, y };
}
