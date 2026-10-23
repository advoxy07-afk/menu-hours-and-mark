import { describe, it, expect } from "vitest";
import { openStateAt, kolkataMinutesNow } from "@/lib/hours";

describe("opening hours (morning 6:30–11:30, evening 4:30–10:00 pm)", () => {
  it("is open at 7:00 am", () => {
    expect(openStateAt(7 * 60).open).toBe(true);
  });
  it("opens exactly at 6:30 am", () => {
    expect(openStateAt(6 * 60 + 30).open).toBe(true);
  });
  it("closes at 11:30 am (boundary is closed)", () => {
    const s = openStateAt(11 * 60 + 30);
    expect(s.open).toBe(false);
    expect(s.next).toBe("4:30 pm");
  });
  it("midday reports evening opening", () => {
    expect(openStateAt(13 * 60)).toEqual({ open: false, next: "4:30 pm" });
  });
  it("is open at 9:00 pm", () => {
    expect(openStateAt(21 * 60).open).toBe(true);
  });
  it("closes at 10:00 pm and reports next morning", () => {
    expect(openStateAt(22 * 60)).toEqual({ open: false, next: "6:30 am" });
  });
  it("kolkataMinutesNow returns minutes within a day", () => {
    const m = kolkataMinutesNow();
    expect(m).toBeGreaterThanOrEqual(0);
    expect(m).toBeLessThan(24 * 60);
  });
});
