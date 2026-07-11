"use client";

/**
 * PortraitArcs: drie concentrische deelbogen (geen volle ringen) rond
 * het hero-portret. Architecturale fine-line taal in Gold Warm; de
 * onderbrekingen geven de compositie richting en lucht. Puur decoratief.
 */
export function PortraitArcs({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden
      className={className}
      style={{ overflow: "visible" }}
    >
      <circle
        cx="50"
        cy="50"
        r="37"
        stroke="#c9a854"
        strokeWidth="0.4"
        strokeOpacity="0.45"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="0.62 0.38"
        transform="rotate(-24 50 50)"
      />
      <circle
        cx="50"
        cy="50"
        r="43"
        stroke="#c9a854"
        strokeWidth="0.35"
        strokeOpacity="0.28"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="0.38 0.62"
        transform="rotate(128 50 50)"
      />
      <circle
        cx="50"
        cy="50"
        r="49"
        stroke="#c9a854"
        strokeWidth="0.3"
        strokeOpacity="0.16"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="0.22 0.78"
        transform="rotate(296 50 50)"
      />
    </svg>
  );
}
