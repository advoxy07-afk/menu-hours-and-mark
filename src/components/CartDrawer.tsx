import { useEffect, useRef, useState } from "react";
import { MessageCircle, ShoppingBag, Trash2 } from "lucide-react";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/CartProvider";
import { QuantityStepper } from "@/components/CartControls";
import { formatPaise, whatsappCheckoutUrl, type CustomerDetails } from "@/lib/cart";
import { external } from "@/config/business";

export function CartDrawer() {
  const cart = useCart();
  const [details, setDetails] = useState<CustomerDetails>({});
  const [launching, setLaunching] = useState(false);
  const locked = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  const url = whatsappCheckoutUrl(cart.entries, details);
  const fieldClass = "mt-1 w-full rounded-md border border-input bg-background px-3 py-2.5 text-base text-foreground focus-visible:outline-2 focus-visible:outline-ring";
  return <SheetContent className="flex h-dvh w-full flex-col gap-0 p-0 sm:max-w-lg motion-reduce:animate-none motion-reduce:transition-none">
    <SheetHeader className="border-b border-divider px-5 py-6 pr-12 text-left">
      <SheetTitle className="font-display text-3xl text-forest">Your cart <span className="font-sans text-base">({cart.count})</span></SheetTitle>
      <SheetDescription>Healthy Diet Cafe</SheetDescription>
    </SheetHeader>
    {cart.lines.length === 0 ? <div className="flex flex-1 flex-col items-center justify-center gap-5 px-5 text-center">
      <ShoppingBag className="h-10 w-10 text-forest" aria-hidden="true" />
      <p className="font-editorial text-2xl text-forest">Something fresh awaits.</p>
      <p className="text-sm text-muted-foreground">Your cart is empty.</p>
      <Button asChild className="h-11"><a href="#menu" onClick={() => cart.setOpen(false)}>Back to the menu</a></Button>
    </div> : <>
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-5">
        <div className="flex items-center justify-between border-b border-divider py-3">
          <p className="text-xs font-semibold uppercase text-muted-foreground">My order</p>
          <Button variant="ghost" className="h-11 text-xs text-forest" onClick={cart.clear}><Trash2 aria-hidden="true" />Clear cart</Button>
        </div>
        <ul>
          {cart.lines.map((line) => <li key={line.id} className="border-b border-divider py-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0"><h3 className="break-words font-medium text-ink">{line.item.name}</h3><p className="mt-1 text-sm text-muted-foreground">{formatPaise(line.unitPaise)} each</p></div>
              <p className="shrink-0 font-semibold tabular-nums text-forest">{formatPaise(line.linePaise)}</p>
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
              <QuantityStepper name={line.item.name} quantity={line.quantity} onChange={(quantity) => cart.setQuantity(line.id, quantity)} />
              <Button variant="ghost" size="icon" className="h-11 w-11 text-muted-foreground" aria-label={`Remove ${line.item.name} from cart`} title="Remove item" onClick={() => cart.setQuantity(line.id, 0)}><Trash2 aria-hidden="true" /></Button>
            </div>
          </li>)}
        </ul>
        <fieldset className="space-y-4 py-6">
          <legend className="pt-5 text-sm font-semibold text-forest">Order details <span className="font-normal text-muted-foreground">(optional)</span></legend>
          <label className="block text-sm text-ink">Customer name<input autoComplete="name" maxLength={120} className={fieldClass} value={details.name ?? ""} onChange={(e) => setDetails({ ...details, name: e.target.value })} /></label>
          <label className="block text-sm text-ink">Preference<select className={fieldClass} value={details.preference ?? ""} onChange={(e) => { const value = e.target.value; if (value === "" || value === "Pickup" || value === "Takeaway") setDetails({ ...details, preference: value }); }}><option value="">No preference</option><option value="Pickup">Pickup</option><option value="Takeaway">Takeaway</option></select></label>
          <label className="block text-sm text-ink">Special instructions<textarea rows={3} maxLength={1000} className={fieldClass} value={details.instructions ?? ""} onChange={(e) => setDetails({ ...details, instructions: e.target.value })} /></label>
        </fieldset>
      </div>
      <div className="shrink-0 border-t border-divider bg-background px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        <dl><div className="flex justify-between text-sm text-muted-foreground"><dt>Subtotal</dt><dd className="tabular-nums">{formatPaise(cart.subtotalPaise)}</dd></div><div className="mt-2 flex justify-between text-xl font-semibold text-forest"><dt>Total</dt><dd className="tabular-nums">{formatPaise(cart.totalPaise)}</dd></div></dl>
        {url && <Button asChild className="mt-4 h-12 w-full text-xs font-bold" aria-disabled={launching}>
          <a href={url} {...external} onClick={(event) => {
            if (locked.current || !whatsappCheckoutUrl(cart.entries, details)) { event.preventDefault(); return; }
            locked.current = true;
            setLaunching(true);
            timer.current = setTimeout(() => { locked.current = false; setLaunching(false); }, 2000);
          }}><MessageCircle aria-hidden="true" />{launching ? "OPENING WHATSAPP…" : "ORDER ON WHATSAPP"}</a>
        </Button>}
        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Send the message in WhatsApp. The cafe will confirm availability and your order.</p>
        {cart.storageError && <p role="status" className="mt-2 text-xs text-destructive">Your browser cannot save this cart for refreshes.</p>}
      </div>
    </>}
  </SheetContent>;
}