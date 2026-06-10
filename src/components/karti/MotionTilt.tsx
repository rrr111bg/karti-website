"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

/** Spring-gedreven tilt (max ±3.2°) — kalm en organisch, nooit bouncy. */
export default function MotionTilt({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const sx = useSpring(px, { stiffness: 120, damping: 20, mass: 0.4 });
  const sy = useSpring(py, { stiffness: 120, damping: 20, mass: 0.4 });
  const rotateY = useTransform(sx, [0, 1], [-3.2, 3.2]);
  const rotateX = useTransform(sy, [0, 1], [2.6, -2.6]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
    </motion.div>
  );
}
