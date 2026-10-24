import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/components/CartProvider";
import { formatPaise } from "@/lib/cart";
import type { MenuItem } from "@/data/menu";

export function CartButton() {
  const { count } = useCart();
  return <SheetTrigger asChild>
    <Button variant="ghost" className="h-11 gap-1.5 px-2 text-forest" aria-label={`Open cart, ${count} items`}>
      <ShoppingBag aria-hidden="true" /><span className="min-w-4 text-sm tabular-nums">{count}</span>
    </Button>
  </SheetTrigger>;
}

export function QuantityStepper({ name, quantity, onChange }: { name: string; quantity: number; onChange: (quantity: number) => void }) {
  return <div className="flex h-11 shrink-0 items-center rounded-md border border-forest/25">
    <Button variant="ghost" size="icon" className="h-11 w-11 text-forest" aria-label={`Decrease quantity of ${name}`} onClick={() => onChange(quantity - 1)}><Minus aria-hidden="true" /></Button>
    <span className="min-w-7 px-1 text-center text-sm font-semibold tabular-nums text-forest" aria-label={`Quantity of ${name}: ${quantity}`}>{quantity}</span>
    <Button variant="ghost" size="icon" className="h-11 w-11 text-forest" aria-label={`Increase quantity of ${name}`} onClick={() => onChange(quantity + 1)}><Plus aria-hidden="true" /></Button>
  </div>;
}

export function AddToCart({ item }: { item: MenuItem }) {
  const { lines, setQuantity, ready } = useCart();
  const quantity = lines.find((line) => line.id === item.id)?.quantity ?? 0;
  return <div className="flex min-h-11 items-center justify-end gap-3">
    {quantity > 0 ? <>
      <span className="inline-flex items-center gap-1 text-xs font-medium text-forest"><Check className="h-3.5 w-3.5" aria-hidden="true" />In cart</span>
      <QuantityStepper name={item.name} quantity={quantity} onChange={(next) => setQuantity(item.id, next)} />
    </> : <Button variant="outline" disabled={!ready} className="h-11 border-forest/25 text-xs font-bold text-forest" aria-label={`Add ${item.name} to cart`} onClick={() => setQuantity(item.id, 1)}><Plus aria-hidden="true" />ADD TO CART</Button>}
  </div>;
}

export function MobileCartBar() {
  const { count, totalPaise, open } = useCart();
  if (!count || open) return null;
  return <div className="fixed inset-x-0 bottom-0 z-40 border-t border-divider bg-cream p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
    <SheetTrigger asChild><Button className="h-12 w-full justify-between px-4"><span className="inline-flex items-center gap-2"><ShoppingBag aria-hidden="true" />{count} {count === 1 ? "item" : "items"} · {formatPaise(totalPaise)}</span><span>View cart →</span></Button></SheetTrigger>
  </div>;
}