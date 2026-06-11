"use client";

import { useSyncExternalStore } from "react";

/**
 * true op apparaten met een fijne pointer (muis/trackpad) zonder
 * prefers-reduced-motion; false op server, touch en bij reduced motion.
 * Externe-store patroon: geen setState-in-effect, reageert live op wijziging.
 */
const QUERIES = ["(pointer: fine)", "(prefers-reduced-motion: reduce)"];

function subscribe(onChange: () => void) {
  const lists = QUERIES.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () =>
    lists.forEach((l) => l.removeEventListener("change", onChange));
}

function snapshot(): boolean {
  return (
    window.matchMedia(QUERIES[0]).matches &&
    !window.matchMedia(QUERIES[1]).matches
  );
}

export function useFinePointer(): boolean {
  return useSyncExternalStore(subscribe, snapshot, () => false);
}
