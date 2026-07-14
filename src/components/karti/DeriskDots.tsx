/**
 * DeriskDots: rendert de de-risk-string (bijv. "GRATIS · 15 MINUTEN ·
 * VRIJBLIJVEND") met de architecturale gold dots als separators in plaats
 * van typografische puntjes. Gedeeld door TrustBand, MatchCallFinale en de
 * mobiele menu-footer, zodat de tokens overal identiek gestyled zijn.
 * Puur presentationeel; kleur/label-styling komt van de call site.
 */
export function DeriskDots({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const tokens = text.split(" · ");
  return (
    <span
      className={`inline-flex flex-wrap items-center gap-3${
        className ? ` ${className}` : ""
      }`}
    >
      {tokens.map((t, i) => (
        <span key={t} className="inline-flex items-center gap-3">
          {i > 0 && <span className="gold-dot" aria-hidden />}
          {t}
        </span>
      ))}
    </span>
  );
}
