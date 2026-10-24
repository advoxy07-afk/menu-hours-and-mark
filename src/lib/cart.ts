import { filterMenu, type MenuItem } from "@/data/menu";
import { business } from "@/config/business";

export const CART_STORAGE_KEY = "healthy-diet-cafe-cart-v1";
export type CartEntry = { id: string; quantity: number };
export type CartLine = CartEntry & { item: MenuItem; unitPaise: number; linePaise: number };
export type CustomerDetails = { name?: string; preference?: "" | "Pickup" | "Takeaway"; instructions?: string };

/** Untrusted saved values never supply names, prices or hidden menu items. */
export function normalizeCart(value: unknown): CartEntry[] {
  if (!Array.isArray(value)) return [];
  const items = filterMenu("", "all");
  const entries: CartEntry[] = [];
  let total = 0;
  let count = 0;
  for (const raw of value) {
    if (!raw || typeof raw !== "object") continue;
    const { id, quantity } = raw;
    const item = items.find((i) => i.id === id);
    if (!item || !Number.isSafeInteger(quantity) || quantity <= 0 || entries.some((e) => e.id === id)) continue;
    const amount = Math.round(item.price * 100) * quantity;
    if (!Number.isSafeInteger(amount) || !Number.isSafeInteger(total + amount) || !Number.isSafeInteger(count + quantity)) continue;
    entries.push({ id, quantity });
    total += amount;
    count += quantity;
  }
  return entries;
}

export function readSavedCart(raw: string | null): CartEntry[] {
  try { return normalizeCart(JSON.parse(raw ?? "[]")); } catch { return []; }
}

export function setCartQuantity(cart: CartEntry[], id: string, quantity: number): CartEntry[] {
  const current = normalizeCart(cart);
  if (!Number.isSafeInteger(quantity)) return current;
  if (quantity <= 0) return current.filter((entry) => entry.id !== id);
  const next = [...current.filter((entry) => entry.id !== id), { id, quantity }];
  const normalized = normalizeCart(next);
  if (!normalized.some((entry) => entry.id === id)) return current;
  return normalized;
}

export function cartSummary(cart: CartEntry[]) {
  const items = filterMenu("", "all");
  const lines: CartLine[] = normalizeCart(cart).flatMap((entry) => {
    const item = items.find((i) => i.id === entry.id);
    if (!item) return [];
    const unitPaise = Math.round(item.price * 100);
    return [{ ...entry, item, unitPaise, linePaise: unitPaise * entry.quantity }];
  });
  const subtotalPaise = lines.reduce((sum, line) => sum + line.linePaise, 0);
  return { lines, count: lines.reduce((sum, line) => sum + line.quantity, 0), subtotalPaise, totalPaise: subtotalPaise };
}

export function formatPaise(paise: number) {
  return `₹${(paise / 100).toLocaleString("en-IN", { minimumFractionDigits: paise % 100 ? 2 : 0, maximumFractionDigits: 2 })}`;
}

export function whatsappMessage(cart: CartEntry[], details: CustomerDetails = {}): string | null {
  const { lines, subtotalPaise, totalPaise } = cartSummary(cart);
  if (!lines.length) return null;
  const order = lines.map((line, index) => `${index + 1}. ${line.item.name} × ${line.quantity}\n   ${formatPaise(line.unitPaise)} each — ${formatPaise(line.linePaise)}`).join("\n\n");
  const extras = [
    details.name?.trim() ? `Customer name: ${details.name.trim()}` : "",
    details.preference === "Pickup" || details.preference === "Takeaway" ? `Preference: ${details.preference}` : "",
    details.instructions?.trim() ? `Special instructions: ${details.instructions.trim()}` : "",
  ].filter(Boolean).join("\n");
  return `Hi ${business.name}! I'd like to place an order.\n\nMY ORDER\n\n${order}\n\nSubtotal: ${formatPaise(subtotalPaise)}\nTOTAL: ${formatPaise(totalPaise)}\n\n${extras ? `${extras}\n\n` : ""}Please confirm availability and my order. Thank you!`;
}

export function whatsappCheckoutUrl(cart: CartEntry[], details: CustomerDetails = {}) {
  const message = whatsappMessage(cart, details);
  return message ? `https://wa.me/${business.whatsappNumber}?text=${encodeURIComponent(message)}` : null;
}