import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Sheet } from "@/components/ui/sheet";
import { CART_STORAGE_KEY, cartSummary, readSavedCart, setCartQuantity, type CartEntry } from "@/lib/cart";

type CartContextValue = ReturnType<typeof cartSummary> & {
  entries: CartEntry[];
  ready: boolean;
  open: boolean;
  setOpen: (open: boolean) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
  notice: string;
  storageError: boolean;
};
const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<CartEntry[]>([]);
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [storageError, setStorageError] = useState(false);

  useEffect(() => {
    try { setEntries(readSavedCart(localStorage.getItem(CART_STORAGE_KEY))); }
    catch { setStorageError(true); }
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(entries)); }
    catch { setStorageError(true); }
  }, [entries, ready]);

  const summary = cartSummary(entries);
  const setQuantity = (id: string, quantity: number) => {
    setEntries((previous) => setCartQuantity(previous, id, quantity));
    setNotice(quantity > 0 ? "Cart updated." : "Item removed from cart.");
  };
  const clear = () => { setEntries([]); setNotice("Cart cleared."); };
  return (
    <CartContext.Provider value={{ ...summary, entries, ready, open, setOpen, setQuantity, clear, notice, storageError }}>
      <Sheet open={open} onOpenChange={setOpen}>{children}</Sheet>
      <p role="status" className="sr-only">{notice}</p>
    </CartContext.Provider>
  );
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("Cart controls must be inside CartProvider");
  return cart;
}