// Matches ASCII control characters (0x00-0x1F, 0x7F) without embedding raw
// control bytes in source.
const CONTROL_CHARS = new RegExp(
  "[" + String.fromCharCode(0) + "-" + String.fromCharCode(31) + String.fromCharCode(127) + "]",
  "g",
);

/** Strips control characters, collapses whitespace, and caps length. */
export function sanitizeText(input: string, maxLength: number): string {
  return input
    .replace(CONTROL_CHARS, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Masks all but the last 2 digits of a phone number, e.g. +9715*****12 */
export function maskPhone(phone: string): string {
  const visibleStart = phone.slice(0, 5);
  const visibleEnd = phone.slice(-2);
  const maskedLength = Math.max(phone.length - visibleStart.length - visibleEnd.length, 0);
  return `${visibleStart}${"*".repeat(maskedLength)}${visibleEnd}`;
}
