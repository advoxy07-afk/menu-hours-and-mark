import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { CartProvider } from "@/components/CartProvider";
import { AddToCart, CartButton } from "@/components/CartControls";
import { CartDrawer } from "@/components/CartDrawer";
import { filterMenu } from "@/data/menu";
import { CART_STORAGE_KEY } from "@/lib/cart";

afterEach(() => { cleanup(); localStorage.clear(); });

describe("Cart React integration", () => {
  it("renders the real provider, updates quantity and opens checkout without a hook crash", async () => {
    const item = filterMenu("Chocolate Protein Shake", "all")[0];
    if (!item) throw new Error("Required item missing");
    render(<CartProvider><CartButton /><AddToCart item={item} /><CartDrawer /></CartProvider>);
    const add = screen.getByRole("button", { name: "Add Chocolate Protein Shake to cart" });
    await waitFor(() => expect(add).toBeEnabled());
    fireEvent.click(add);
    fireEvent.click(screen.getByRole("button", { name: "Increase quantity of Chocolate Protein Shake" }));
    fireEvent.click(screen.getByRole("button", { name: "Open cart, 2 items" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const checkout = screen.getByRole("link", { name: "ORDER ON WHATSAPP" });
    const url = new URL(checkout.getAttribute("href") ?? "");
    expect(url.searchParams.get("text")).toContain("TOTAL: ₹118");
    await waitFor(() => expect(JSON.parse(localStorage.getItem(CART_STORAGE_KEY) ?? "[]")).toEqual([{ id: item.id, quantity: 2 }]));
    fireEvent.click(screen.getByRole("button", { name: "Clear cart" }));
    expect(screen.queryByRole("link", { name: "ORDER ON WHATSAPP" })).not.toBeInTheDocument();
  });
});