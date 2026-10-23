/**
 * Opening-hours logic for Healthy Diet Cafe.
 * Verified schedule (from the business): morning 6:30–11:30, evening 16:30–22:00,
 * every day, Asia/Kolkata timezone.
 */

export interface Window { start: number; end: number; label: string }

/** Minutes since midnight, Kolkata time. */
export const WINDOWS: Window[] = [
  { start: 6 * 60 + 30, end: 11 * 60 + 30, label: "6:30 am" },
  { start: 16 * 60 + 30, end: 22 * 60, label: "4:30 pm" },
];

export function openStateAt(minutes: number): { open: boolean; next: string | null } {
  if (WINDOWS.some((w) => minutes >= w.start && minutes < w.end)) return { open: true, next: null };
  const upcoming = WINDOWS.find((w) => minutes < w.start) ?? WINDOWS[0];
  return { open: false, next: upcoming.label };
}

/** Current minutes since midnight in Asia/Kolkata. */
export function kolkataMinutesNow(now: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => Number(parts.find((p) => p.type === t)?.value ?? 0);
  return get("hour") * 60 + get("minute");
}
