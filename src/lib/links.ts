/* Plausible tagged-event: elke klik op een match-call CTA wordt als
   conversie-event gemeten; de UTM-content reist mee naar /match-call
   en vandaar de Calendly-embed in, zodat elke boeking traceerbaar is. */
export const EVENT_MATCHCALL = "plausible-event-name=matchcall-click";

/** Interne boekingsroute met UTM per plek op de site. */
export function matchCallHref(content: string): string {
  return `/match-call?utm_content=${encodeURIComponent(content)}`;
}
