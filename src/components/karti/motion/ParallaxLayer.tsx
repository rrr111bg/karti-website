"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/**
 * ParallaxLayer: decoratieve y-parallax terwijl de laag door de viewport
 * reist. Transform-only, aria-hidden, statisch onder reduced-motion.
 * Server rendert y=0 (geen verborgen beginstaat); de offset komt pas na
 * hydration, en alleen voor gebruikers zonder reduced-motion.
 */
export function ParallaxLayer({
  children,
  from = 40,
  to = -40,
  className = "",
}: {
  children: ReactNode;
  /** y-offset (px) wanneer de laag onderin de viewport verschijnt */
  from?: number;
  /** y-offset (px) wanneer de laag bovenuit de viewport verdwijnt */
  to?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [from, to]);

  return (
    <motion.div ref={ref} aria-hidden className={className} style={{ y }}>
      {children}
    </motion.div>
  );
}
