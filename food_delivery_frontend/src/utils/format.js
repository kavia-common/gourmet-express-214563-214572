/**
 * Formatting helpers
 */
// PUBLIC_INTERFACE
export function money(n) {
  /** Formats a number as USD currency string */
  const v = Number.isFinite(n) ? n : 0;
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(v);
}
