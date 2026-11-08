/**
 * Splits a display value like "$12.1b", "9.5%", "440k+" or "436,860" into the parts a
 * counter needs. Returns null for values that should not count ("5–15 yrs", "Monthly").
 */
export function parseCountable(raw: string) {
  const match = raw.trim().match(/^([^\d]*?)(\d[\d,]*(?:\.\d+)?)([^\d]*)$/);
  if (!match) return null;
  const [, prefix, number, suffix] = match;
  return {
    prefix,
    suffix,
    value: parseFloat(number.replace(/,/g, "")),
    decimals: (number.split(".")[1] ?? "").length,
    grouped: number.includes(","),
  };
}

export function formatCount(n: number, decimals: number, grouped: boolean) {
  return grouped
    ? n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : n.toFixed(decimals);
}
