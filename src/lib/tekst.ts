/**
 * Typografische hulpjes.
 */

/**
 * Voorkomt een wees-woord: verbindt de laatste twee woorden met een
 * non-breaking space zodat de laatste regel nooit één los woord is
 * ("op maat", "profiel"). Werkt in elke browser, ook zonder
 * text-wrap: pretty ondersteuning (oudere iOS).
 */
export function voorkomWees(tekst: string): string {
  const i = tekst.lastIndexOf(" ");
  if (i === -1) return tekst;
  return tekst.slice(0, i) + "\u00A0" + tekst.slice(i + 1);
}
