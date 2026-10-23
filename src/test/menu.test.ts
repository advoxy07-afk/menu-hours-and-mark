import { describe, it, expect } from "vitest";
import { filterMenu, formatPrice, menuItems } from "@/data/menu";

describe("menu", () => {
  it("chocolate protein shake uses main menu price ₹59", () => {
    expect(menuItems.find((i) => i.name === "Chocolate Protein Shake")?.price).toBe(59);
  });
  it("search and category combine", () => {
    const r = filterMenu("paneer", "dosas");
    expect(r.map((i) => i.name)).toEqual(["Paneer Dosa"]);
  });
  it("diet plans hidden until confirmed", () => {
    expect(filterMenu("plan", "all")).toHaveLength(0);
  });
  it("ids are unique", () => {
    expect(new Set(menuItems.map((i) => i.id)).size).toBe(menuItems.length);
  });
  it("formats rupees Indian style", () => {
    expect(formatPrice(2499)).toBe("₹2,499");
  });
});
