import { useMemo, useState } from "react";
import { categories, filterMenu, formatPrice, visibleCategories, type CategoryId } from "@/data/menu";

export function MenuBoard() {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<CategoryId | "all">("all");
  const items = useMemo(() => filterMenu(query, cat), [query, cat]);
  const groups = visibleCategories
    .map((c) => ({ ...c, items: items.filter((i) => i.category === c.id) }))
    .filter((g) => g.items.length);

  const chip = (active: boolean) =>
    `shrink-0 border px-3 py-1.5 text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
      active ? "border-forest bg-forest text-lime" : "border-forest/25 text-forest hover:border-forest"
    }`;

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-5 border-b border-forest/15 bg-cream/95 px-5 py-4 backdrop-blur md:-mx-10 md:px-10">
        <div className="relative mb-3 max-w-md">
          <label htmlFor="menu-search" className="sr-only">Search the menu</label>
          <input
            id="menu-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search — try “paneer”, “shake”, “dosa”"
            className="w-full border-b-2 border-forest bg-transparent py-2 pr-16 text-base text-ink placeholder:text-muted-foreground focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-0 top-2 text-xs font-bold uppercase tracking-widest text-leaf hover:text-forest">
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

      <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground" aria-live="polite">
        {items.length} {items.length === 1 ? "item" : "items"}
      </p>

      {groups.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-editorial text-3xl text-forest">Nothing by that name.</p>
          <button onClick={() => { setQuery(""); setCat("all"); }} className="mt-4 text-sm font-bold uppercase tracking-widest text-leaf underline underline-offset-4">Show the full menu</button>
        </div>
      ) : (
        <div className="mt-6 grid gap-x-16 gap-y-14 md:grid-cols-2">
          {groups.map((g) => {
            const n = categories.findIndex((c) => c.id === g.id) + 1;
            return (
              <section key={g.id} className="break-inside-avoid">
                <header className="mb-4 flex items-end gap-3 border-b-2 border-forest pb-2">
                  <span className="display-tight text-5xl text-lime [-webkit-text-stroke:1.5px_var(--forest)]">{String(n).padStart(2, "0")}</span>
                  <h3 className="display-tight text-4xl text-forest">{g.name}</h3>
                </header>
                <ul>
                  {g.items.map((i) => (
                    <li key={i.id} className="grid grid-cols-[auto_1fr_auto] items-baseline gap-2 border-b border-dotted border-forest/20 py-2.5">
                      <span className="text-[15px] font-medium text-ink">{i.name}</span>
                      <span aria-hidden className="translate-y-[-3px] border-b border-dotted border-forest/40" />
                      <span className="font-display text-2xl tabular-nums text-leaf">{formatPrice(i.price)}</span>
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
