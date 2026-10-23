import { createFileRoute } from "@tanstack/react-router";
import hero from "@/assets/hero-bowl.jpg";
import { MenuBoard } from "@/components/MenuBoard";
import { menuItems, formatPrice, type CategoryId } from "@/data/menu";
import { business, mapsLink, directionsLink, reviewsLink, telLink, external } from "@/config/business";
import { InstagramIcon } from "@/components/InstagramIcon";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Healthy Diet Cafe — Protein bowls, shakes & clean meals in Angul" },
      { name: "description", content: "Protein bowls, shakes, dosas and healthy meals at Nalco Nagar, Angul, Odisha. See the full menu and prices." },
      { property: "og:title", content: "Healthy Diet Cafe — Nalco Nagar, Angul" },
      { property: "og:description", content: "Protein bowls, shakes and healthy meals. Full menu with prices." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const fromPrice = (c: CategoryId) => Math.min(...menuItems.filter((i) => i.category === c).map((i) => i.price));
const highlights: [string, CategoryId][] = [["Protein Shakes", "protein-shakes"], ["Healthy Meals", "meals"], ["Dosas", "dosas"], ["Healthy Snacks", "snacks"]];

const pick = (n: string) => menuItems.find((i) => i.name === n)!;
const favourites = ["High Protein (Mix)", "Oats Muesli Mix (Special)", "Grilled Chicken Bowl", "Ragi Dosa", "Green Detox Shake"].map(pick);

function Nav() {
  return (
    <nav className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-5 text-cream md:px-10">
      <a href="#top" className="display-tight text-2xl tracking-wide">Healthy Diet <span className="text-lime">Cafe</span></a>
      <div className="flex items-center gap-5 text-xs font-bold uppercase tracking-[0.18em]">
        <a href="#menu" className="hover:text-lime">Menu</a>
        <a href="#visit" className="hidden hover:text-lime sm:inline">Visit</a>
        <a href={business.instagramUrl} {...external} aria-label="Follow us on Instagram" className="hover:text-lime focus-visible:text-lime"><InstagramIcon /></a>
        <a href={telLink} className="bg-lime px-3 py-2 text-forest">Call</a>
      </div>
    </nav>
  );
}

function Index() {
  return (
    <main id="top" className="overflow-x-clip">
      {/* 01 — Opening */}
      <section className="relative grid min-h-[100svh] bg-forest text-cream md:grid-cols-[1.15fr_1fr]">
        <Nav />
        <div className="relative z-10 flex flex-col justify-end px-5 pb-10 pt-28 md:px-10 md:pb-14">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-lime">Nalco Nagar · Angul · Odisha</p>
          <h1 className="display-tight text-[clamp(5rem,min(19vw,19vh),12rem)]">
            Eat<br />like you<br /><span className="text-lime">mean it.</span>
          </h1>
          <p className="mt-6 max-w-sm text-base text-cream/80">
            Protein bowls, shakes, dosas and honest everyday meals — <span className="font-editorial text-lime">made fresh</span>, priced for every day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#menu" className="bg-lime px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-forest transition-transform hover:-translate-y-0.5">Explore the menu ↗</a>
            <a href={directionsLink} {...external} className="border border-cream/40 px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] hover:border-lime hover:text-lime">Find us</a>
          </div>
        </div>
        <div className="relative flex flex-col md:min-h-0">
          <div className="relative h-[38svh] md:h-auto md:flex-1">
            <img src={hero} alt="Oats bowl with banana and dry fruits beside a green shake" width={1200} height={1504} className="absolute inset-0 h-full w-full object-cover object-[50%_30%]" />
          </div>
          <div className="border-t-4 border-lime bg-forest px-5 py-6 md:px-8">
            <div className="flex items-baseline justify-between">
              <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-lime">On the menu</p>
              <p className="font-editorial text-sm text-cream/70">starting prices</p>
            </div>
            <ul className="mt-3 grid gap-x-6 sm:grid-cols-2">
              {highlights.map(([label, id]) => (
                <li key={id} className="flex items-baseline justify-between gap-2 border-b border-cream/15 py-2">
                  <span className="display-tight text-2xl md:text-3xl">{label}</span>
                  <span className="font-display text-2xl text-lime md:text-3xl"><span className="font-editorial text-xs text-cream/60">from </span>{formatPrice(fromPrice(id))}</span>
                </li>
              ))}
            </ul>
            <a href="#menu" className="mt-4 inline-block text-xs font-bold uppercase tracking-[0.2em] text-lime hover:underline">Explore the full menu →</a>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="overflow-hidden border-y-2 border-forest bg-lime py-3 text-forest" aria-hidden>
        <div className="marquee flex w-max gap-10 whitespace-nowrap display-tight text-3xl">
          {Array.from({ length: 2 }).map((_, k) => (
            <span key={k} className="flex gap-10">
              {["Protein Bowls", "✺", "Organic Shakes", "✺", "Ragi Dosa", "✺", "Healthy Meals", "✺", "Sprouts", "✺", "Green Tea", "✺"].map((t, i) => <span key={i}>{t}</span>)}
            </span>
          ))}
        </div>
      </div>

      {/* 02 — Philosophy */}
      <section className="bg-cream px-5 py-24 md:px-10 md:py-36">
        <div className="grid gap-10 md:grid-cols-12">
          <span className="display-tight text-[9rem] text-sage md:col-span-3 md:text-[14rem]">02</span>
          <div className="md:col-span-8 md:col-start-5">
            <p className="font-editorial text-[clamp(2rem,4.5vw,3.75rem)] leading-[1.08] text-forest">
              Food that fuels your day — fresh, protein-rich, and made to keep
              <span className="not-italic font-display text-leaf"> everyday wellness </span>
              simple.
            </p>
            <dl className="mt-14 grid grid-cols-3 border-t-2 border-forest">
              {[["Fresh", "Made to order"], ["Protein", "Bowls & shakes"], ["Everyday", "Prices from ₹10"]].map(([a, b]) => (
                <div key={a} className="border-r border-forest/20 pr-3 pt-4 last:border-0">
                  <dt className="display-tight text-3xl text-forest md:text-5xl">{a}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">{b}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* 03 — Favourites */}
      <section className="bg-botanical px-5 py-24 text-cream md:px-10 md:py-32">
        <div className="flex items-end justify-between border-b border-cream/20 pb-6">
          <h2 className="display-tight text-[clamp(4rem,11vw,9rem)]">House<br /><span className="font-editorial text-lime text-[0.55em] normal-case">favourites</span></h2>
          <span className="hidden text-xs uppercase tracking-[0.25em] text-cream/60 md:block">03 / Selected</span>
        </div>
        <ol className="mt-4">
          {favourites.map((f, i) => (
            <li key={f.id} className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 border-b border-cream/15 py-5 md:grid-cols-[5rem_1fr_auto]">
              <span className="font-editorial text-lime">{String(i + 1).padStart(2, "0")}</span>
              <span className="display-tight text-4xl transition-colors group-hover:text-lime md:text-6xl">{f.name}</span>
              <span className="font-display text-3xl text-lime md:text-4xl">{formatPrice(f.price)}</span>
            </li>
          ))}
        </ol>
        <a href="#menu" className="mt-10 inline-block border-b-2 border-lime pb-1 text-sm font-bold uppercase tracking-[0.2em] text-lime">See all {menuItems.length - 3} dishes ↓</a>
      </section>

      {/* 04 — Menu */}
      <section id="menu" className="bg-cream px-5 py-24 md:px-10 md:py-32">
        <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
          <h2 className="display-tight text-[clamp(5rem,15vw,12rem)] text-forest">The<br />Menu<span className="text-leaf">.</span></h2>
          <p className="max-w-sm text-base text-muted-foreground md:justify-self-end">
            Ten sections, one simple idea: <span className="font-editorial text-forest">good food, fair prices.</span> Search or tap a category.
          </p>
        </div>
        <MenuBoard />
      </section>

      {/* 05 — Reviews (redirect to Google Maps, nothing embedded) */}
      <section className="bg-lime px-5 py-20 text-forest md:px-10">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="display-tight text-[clamp(3rem,8vw,6.5rem)]">Good food.<br />Real people.</p>
            <p className="mt-3 font-editorial text-lg">See customer reviews on Google Maps.</p>
          </div>
          <a href={reviewsLink} {...external} className="justify-self-start bg-forest px-6 py-4 text-sm font-bold uppercase tracking-[0.18em] text-lime transition-transform hover:-translate-y-0.5">Read our Google Reviews ↗</a>
        </div>
      </section>

      {/* 06 — Visit */}
      <section id="visit" className="bg-forest px-5 py-24 text-cream md:px-10 md:py-32">
        <h2 className="display-tight text-[clamp(5rem,16vw,13rem)] text-lime">Come<br />hungry.</h2>
        <div className="mt-14 grid gap-10 border-t border-cream/20 pt-10 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-lime">Find us</h3>
            <address className="mt-3 text-lg not-italic">{business.addressLines.map((l) => <span key={l} className="block">{l}</span>)}</address>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={directionsLink} {...external} className="bg-lime px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] text-forest transition-transform hover:-translate-y-0.5">Get directions ↗</a>
              <a href={mapsLink} {...external} className="border border-cream/40 px-5 py-3 text-xs font-bold uppercase tracking-[0.18em] hover:border-lime hover:text-lime">View on Google Maps</a>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-lime">Open daily</h3>
            <dl className="mt-3 space-y-2 text-lg">
              {business.hours.map((h) => (
                <div key={h.label} className="flex justify-between gap-6 border-b border-cream/15 pb-2"><dt className="font-editorial">{h.label}</dt><dd className="tabular-nums">{h.value}</dd></div>
              ))}
            </dl>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-lime">Call</h3>
            <a href={telLink} className="display-tight mt-3 block text-6xl hover:text-lime">{business.phoneDisplay}</a>
            <a href={business.instagramUrl} {...external} className="mt-6 inline-flex items-center gap-2 border-b border-lime pb-1 text-sm text-lime hover:text-cream">
              <InstagramIcon /> Follow us on Instagram
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-ink px-5 py-10 text-cream/60 md:px-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <p className="display-tight text-[clamp(3.5rem,12vw,10rem)] text-cream">Healthy Diet <span className="text-lime">Cafe</span></p>
          <div className="flex flex-col gap-3 md:items-end">
          <a href={business.instagramUrl} {...external} className="inline-flex items-center gap-2 text-sm text-lime hover:text-cream"><InstagramIcon /> {business.instagramHandle}</a>
          <p className="text-xs uppercase tracking-[0.2em]">Nalco Nagar, Angul · © {new Date().getFullYear()}</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
