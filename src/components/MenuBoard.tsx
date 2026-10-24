import { useMemo, useState } from "react";
import { categories, filterMenu, formatPrice, visibleCategories, type CategoryId } from "@/data/menu";
import { AddToCart } from "@/components/CartControls";

export function MenuBoard() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const items = useMemo(() => filterMenu(query, cat), [query, cat]);
  const groups = visibleCategories
    .map((c) => ({ ...c, items: items.filter((i) => i.category === c.id) }))
    .filter((g) => g.items.length);

  const chip = (active: boolean) =>
    `shrink-0 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta ${
      active ? "border-forest bg-forest text-cream" : "border-ink/20 bg-white text-ink hover:border-forest hover:text-forest"
    }`;

  return (
    <div>
      <div className="sticky top-16 z-20 -mx-5 border-b border-divider bg-cream/95 px-5 py-4 backdrop-blur md:-mx-8 md:px-8">
        <div className="relative mb-3 max-w-md">
          <label htmlFor="menu-search" className="sr-only">Search the menu</label>
          <input
            id="menu-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search — try “paneer”, “shake”, “dosa”"
            className="w-full rounded-md border border-ink/20 bg-white px-4 py-2.5 text-base text-ink placeholder:text-muted-foreground focus:border-forest focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded px-2 py-1 text-xs font-bold uppercase tracking-widest text-terracotta hover:text-forest"
            >
              Clear ✕
            </button>
          )}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Menu categories">
          <button role="tab" aria-selected={cat === "all"} className={chip(cat === "all")} onClick={() => setCat("all")}>All items</button>
          {visibleCategories.map((c) => (
            <button key={c.id} role="tab" aria-selected={cat === c.id} className={chip(cat === c.id)} onClick={() => setCat(c.id)}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground" aria-live="polite">
        {items.length} {items.length === 1 ? "item" : "items"}
      </p>

      {groups.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-editorial text-3xl text-forest">Nothing by that name.</p>
          <button
            onClick={() => { setQuery(""); setCat("all"); }}
            className="mt-4 text-sm font-bold uppercase tracking-widest text-terracotta underline underline-offset-4 hover:text-forest"
          >
            Show the full menu
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-x-16 gap-y-14 md:grid-cols-2">
          {groups.map((g) => {
            const n = categories.findIndex((c) => c.id === g.id) + 1;
            return (
              <section key={g.id} className="break-inside-avoid">
                <header className="mb-2 flex items-baseline gap-3 border-b border-ink/15 pb-3">
                  <span className="text-xs font-bold tracking-[0.2em] text-terracotta">{String(n).padStart(2, "0")}</span>
                  <h3 className="display-tight text-3xl text-forest">{g.name}</h3>
                </header>
                <ul>
                  {g.items.map((i) => (
                    <li key={i.id} className="border-b border-dotted border-ink/15 py-3">
                      <div className="flex items-baseline gap-3">
                        <span className="min-w-0 text-[15px] font-medium text-ink">{i.name}</span>
                        <span aria-hidden className="min-w-2 flex-1 translate-y-[-3px] border-b border-dotted border-ink/25" />
                        <span className="shrink-0 text-lg font-semibold tabular-nums text-forest">{formatPrice(i.price)}</span>
                      </div>
                      <div className="mt-2"><AddToCart item={i} /></div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
