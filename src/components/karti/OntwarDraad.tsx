/**
 * De ontwarrende draad (brand-metafoor: van complex naar vloeiend):
 * een gouden lijn die zich tekent van NU naar STRAKS, met een eind-dot.
 * Presentational: de parent stuurt `active` (in-view) en stagger-delay.
 * Zonder JS volgetekend zichtbaar (html.js-scoping in globals.css).
 */
export function OntwarDraad({
  active,
  delayMs = 0,
}: {
  active: boolean;
  delayMs?: number;
}) {
  return (
    <svg
      viewBox="0 0 64 24"
      className="ontwar"
      aria-hidden
      focusable="false"
    >
      <path
        className={`ontwar-path${active ? " in" : ""}`}
        style={{ transitionDelay: `${delayMs}ms` }}
        d="M2 12 C 14 4, 24 20, 36 12 S 50 7, 55 11.6"
        stroke="#b08d3e"
        strokeWidth="1.4"
        fill="none"
        strokeLinecap="round"
      />
      <circle
        className={`ontwar-dot${active ? " in" : ""}`}
        style={{ transitionDelay: `${delayMs + 520}ms` }}
        cx="60"
        cy="12"
        r="2.4"
        fill="#b08d3e"
      />
    </svg>
  );
}
