export type Currency = "RON" | "EUR";

const currencyLabel: Record<Currency, string> = { RON: "lei", EUR: "€" };

/** Format preț conform ghidului: „12.900 €”, „1.950 lei” (punct la mii, moneda după). */
export function formatPrice(amount: number, currency: Currency): string {
  const value = new Intl.NumberFormat("ro-RO", {
    maximumFractionDigits: 0,
    useGrouping: "always",
  }).format(amount);
  return `${value} ${currencyLabel[currency]}`;
}

const DAY_MS = 24 * 60 * 60 * 1000;

/** Data publicării: „Azi, 14:20”, „Ieri, 09:05”, „2 nov.” (anul doar dacă diferă). */
export function formatListingDate(date: Date, now: Date = new Date()): string {
  const time = new Intl.DateTimeFormat("ro-RO", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Bucharest",
  }).format(date);
  const dayKey = (d: Date) =>
    new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Bucharest" }).format(d);
  if (dayKey(date) === dayKey(now)) return `Azi, ${time}`;
  if (dayKey(date) === dayKey(new Date(now.getTime() - DAY_MS))) return `Ieri, ${time}`;
  const sameYear = date.getFullYear() === now.getFullYear();
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "short",
    ...(sameYear ? {} : { year: "numeric" }),
    timeZone: "Europe/Bucharest",
  }).format(date);
}
