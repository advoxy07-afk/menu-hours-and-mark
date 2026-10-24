import { describe, expect, it } from "vitest";
import { filterMenu } from "@/data/menu";
import { cartSummary, formatPaise, normalizeCart, readSavedCart, setCartQuantity, whatsappCheckoutUrl, whatsappMessage } from "@/lib/cart";

const chocolate = filterMenu("Chocolate Protein Shake", "all")[0];
const dosa = filterMenu("Plain Dosa", "dosas")[0];
if (!chocolate || !dosa) throw new Error("Required real menu items missing");

describe("Cart and WhatsApp ordering", () => {
  it("adds and increments the actual ₹59 chocolate shake without duplicates", () => {
    const added = setCartQuantity([], chocolate.id, 1);
    const updated = setCartQuantity(added, chocolate.id, 2);
    expect(updated).toEqual([{ id: chocolate.id, quantity: 2 }]);
    expect(cartSummary(updated).totalPaise).toBe(11800);
  });
  it("calculates multiple-item subtotal and final total safely in paise", () => {
    const summary = cartSummary([{ id: chocolate.id, quantity: 2 }, { id: dosa.id, quantity: 3 }]);
    expect(summary.count).toBe(5);
    expect(summary.lines.map((line) => line.linePaise)).toEqual([11800, 14700]);
    expect(summary.subtotalPaise).toBe(26500);
    expect(summary.totalPaise).toBe(26500);
  });
  it("removes at zero and never allows negative quantities", () => {
    expect(setCartQuantity([{ id: dosa.id, quantity: 1 }], dosa.id, 0)).toEqual([]);
    expect(setCartQuantity([{ id: dosa.id, quantity: 1 }], dosa.id, -1)).toEqual([]);
  });
  it("rejects invalid quantities and unsafe totals", () => {
    const cart = [{ id: dosa.id, quantity: 1 }];
    for (const quantity of [NaN, Infinity, 1.5, Number.MAX_SAFE_INTEGER]) {
      expect(setCartQuantity(cart, dosa.id, quantity)).toEqual(cart);
    }
  });
  it("restores saved quantities using current real prices, ignoring tampering", () => {
    const restored = readSavedCart(JSON.stringify([{ id: chocolate.id, quantity: 2, price: 1, name: "Fake" }]));
    expect(restored).toEqual([{ id: chocolate.id, quantity: 2 }]);
    expect(cartSummary(restored).totalPaise).toBe(11800);
  });
  it("discards unknown and unconfirmed hidden menu items", () => {
    expect(normalizeCart([{ id: "unknown", quantity: 1 }, { id: "diet-plans--1-week-plan", quantity: 1 }])).toEqual([]);
  });
  it("handles corrupt storage and an explicitly cleared cart", () => {
    expect(readSavedCart("not JSON")).toEqual([]);
    expect(readSavedCart("[]")).toEqual([]);
  });
  it("does not checkout an empty cart", () => {
    expect(whatsappCheckoutUrl([])).toBeNull();
    expect(whatsappMessage([])).toBeNull();
  });
  it("generates the requested order message and exact owner WhatsApp URL", () => {
    const url = whatsappCheckoutUrl([{ id: chocolate.id, quantity: 2 }]);
    expect(url).not.toBeNull();
    const parsed = new URL(url ?? "");
    expect(parsed.origin + parsed.pathname).toBe("https://wa.me/917077514143");
    expect(parsed.searchParams.get("text")).toBe("Hi Healthy Diet Cafe! I'd like to place an order.\n\nMY ORDER\n\n1. Chocolate Protein Shake × 2\n   ₹59 each — ₹118\n\nSubtotal: ₹118\nTOTAL: ₹118\n\nPlease confirm availability and my order. Thank you!");
  });
  it("encodes unusual names and optional details without corrupting the URL", () => {
    const item = filterMenu("Fresh Lime & Mint", "all")[0];
    if (!item) throw new Error("Required item missing");
    const url = whatsappCheckoutUrl([{ id: item.id, quantity: 1 }], { name: "Anu & Raj", preference: "Takeaway", instructions: "No sugar + ice? धन्यवाद\nThanks #1" });
    const text = new URL(url ?? "").searchParams.get("text");
    expect(text).toContain("Fresh Lime & Mint × 1");
    expect(text).toContain("Customer name: Anu & Raj\nPreference: Takeaway\nSpecial instructions: No sugar + ice? धन्यवाद\nThanks #1");
  });
  it("omits optional details when not supplied", () => {
    expect(whatsappMessage([{ id: dosa.id, quantity: 1 }])).not.toContain("Customer name:");
    expect(whatsappMessage([{ id: dosa.id, quantity: 1 }])).not.toContain("Preference:");
  });
  it("formats INR with Indian grouping and preserves paise", () => {
    expect(formatPaise(249900)).toBe("₹2,499");
    expect(formatPaise(5925)).toBe("₹59.25");
  });
});