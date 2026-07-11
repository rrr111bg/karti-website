"use client";

import { motion, useReducedMotion, type MotionValue } from "motion/react";
import type { ComponentProps } from "react";

type MotionPathProps = ComponentProps<typeof motion.path>;

/**
 * DrawPath: een SVG-pad dat zichzelf tekent.
 * - `progress` (MotionValue 0..1) → scrub-modus, gekoppeld aan scroll.
 * - zonder `progress` → one-shot whileInView-tekening.
 * Reduced-motion rendert het pad volgetekend. Voor no-JS bestaat de
 * globale CSS-override `html:not(.js) .draw-path` die dash-styles
 * neutraliseert, zodat decoratie nooit onzichtbaar blijft.
 */
export function DrawPath({
  progress,
  duration = 1.6,
  delay = 0,
  className = "",
  ...rest
}: Omit<MotionPathProps, "pathLength"> & {
  progress?: MotionValue<number>;
  duration?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  const cls = `draw-path ${className}`.trim();

  if (reduce) {
    return <motion.path {...rest} className={cls} />;
  }

  if (progress) {
    return (
      <motion.path
        {...rest}
        className={cls}
        initial={false}
        style={{ ...(rest.style ?? {}), pathLength: progress }}
      />
    );
  }

  return (
    <motion.path
      {...rest}
      className={cls}
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration, delay, ease: [0.16, 0.84, 0.32, 1] }}
    />
  );
}
