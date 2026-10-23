import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import hero from "@/assets/hero-daylight.jpg";
import shakesImg from "@/assets/shakes.jpg";
import dosaImg from "@/assets/dosa.jpg";
import mealImg from "@/assets/meal-bowl.jpg";
import { MenuBoard } from "@/components/MenuBoard";
import { menuItems, formatPrice, type CategoryId } from "@/data/menu";
import { business, mapEmbedUrl, directionsLink, reviewsLink, telLink, external } from "@/config/business";
import { InstagramIcon } from "@/components/InstagramIcon";
import { openStateAt, kolkataMinutesNow } from "@/lib/hours";

const SITE = "https://menu-hours-and-mark.lovable.app";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Healthy Diet Cafe — Fresh bowls, shakes & healthy meals in Angul, Odisha" },
      { name: "description", content: "Protein bowls, shakes, dosas and everyday healthy meals at Nalco Nagar, Angul. Browse the full menu with prices, opening hours and directions." },
      { property: "og:title", content: "Healthy Diet Cafe — Nalco Nagar, Angul" },
      { property: "og:description", content: "Fresh bowls, nourishing shakes and everyday favourites. Full menu with prices, hours and directions." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE }],
  }),
  component: Index,
});

const fromPrice = (c: CategoryId) => Math.min(...menuItems.filter((i) => i.category === c).map((i) => i.price));
const pick = (n: string) => menuItems.find((i) => i.name === n)!;

const trustStrip: [string, CategoryId][] = [
  ["Protein shakes", "protein-shakes"],
  ["Dosas", "dosas"],
  ["Healthy meals", "meals"],
  ["Snacks", "snacks"],
];

const features = [
  {
    label: "Protein Shakes",
    cat: "protein-shakes" as CategoryId,
    img: shakesImg,
    alt: "Two tall glasses of chocolate and strawberry protein shakes on a ceramic tray with banana and oats",
    items: ["Chocolate Protein Shake", "Peanut Butter Protein Shake", "High Protein (Mix)"],
    span: "md:col-span-7",
  },
  {
    label: "Dosas",
    cat: "dosas" as CategoryId,
    img: dosaImg,
    alt: "A golden folded dosa on a ceramic plate with coconut chutney",
    items: ["Masala Dosa", "Ragi Dosa", "Paneer Dosa"],
    span: "md:col-span-5",
  },
  {
    label: "Healthy Meals",
    cat: "meals" as CategoryId,
    img: mealImg,
    alt: "A bowl of grilled chicken, brown rice, greens and vegetables",
    items: ["Quinoa Bowl", "Grilled Chicken Bowl", "Paneer Bowl"],
    span: "md:col-span-5",
  },
];

const snackItems = ["Roasted Chana", "Sprouts Bowl", "Fruit Bowl"].map(pick);

const navLinks = [
  { label: "Menu", href: "#menu" },
  { label: "Our Approach", href: "#approach" },
  { label: "Visit", href: "#visit" },
];

const focusRing = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta";

function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-30 border-b border-divider bg-cream/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 md:px-8" aria-label="Main">
        <a href="#top" className={`display-tight text-xl text-forest ${focusRing}`}>
          Healthy Diet <span className="font-editorial text-terracotta">Cafe</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className={`text-xs font-semibold uppercase tracking-[0.16em] text-ink transition-colors hover:text-terracotta ${focusRing}`}>
              {l.label}
            </a>
          ))}
          <a href={business.instagramUrl} {...external} aria-label="Follow us on Instagram" className={`text-forest transition-colors hover:text-terracotta ${focusRing}`}>
            <InstagramIcon />
          </a>
          <a href={telLink} className={`rounded-md bg-forest px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-botanical ${focusRing}`}>
            Call us
          </a>
        </div>
        <button
          className={`flex h-11 w-11 items-center justify-center rounded-md text-forest md:hidden ${focusRing}`}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden>
            {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </nav>
      {open && (
        <div id="mobile-nav" className="border-t border-divider bg-cream md:hidden">
          <div className="flex flex-col px-5 py-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`border-b border-divider py-4 text-sm font-semibold uppercase tracking-[0.16em] text-ink last:border-0 ${focusRing}`}
              >
                {l.label}
              </a>
            ))}
            <div className="flex items-center justify-between py-4">
              <a href={business.instagramUrl} {...external} className={`inline-flex items-center gap-2 text-sm font-semibold text-forest ${focusRing}`} onClick={() => setOpen(false)}>
                <InstagramIcon className="h-5 w-5" /> Instagram
              </a>
              <a href={telLink} className={`rounded-md bg-forest px-4 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-cream ${focusRing}`} onClick={() => setOpen(false)}>
                Call us
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="bg-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-14 pt-12 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-14 md:px-8 md:pb-24 md:pt-20">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-terracotta">Fresh food · Everyday wellness</p>
          <h1 className="display-tight mt-5 text-[clamp(2.9rem,9vw,5.25rem)] text-forest">
            Feel good.<br />
            <span className="font-editorial text-terracotta">Eat well.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-muted-foreground">
            Fresh bowls, nourishing shakes and everyday favourites, made for the way you want to feel.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#menu" className={`rounded-md bg-forest px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-cream transition-colors hover:bg-botanical ${focusRing}`}>
              Explore the menu
            </a>
            <a href={directionsLink} {...external} className={`rounded-md border border-forest/30 px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-forest transition-colors hover:border-terracotta hover:text-terracotta ${focusRing}`}>
              Find our cafe ↗
            </a>
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Nalco Nagar, Angul · Open daily 6:30–11:30 am &amp; 4:30–10:00 pm
          </p>
        </div>
        <div className="relative">
          <div aria-hidden className="absolute -right-3 -top-3 hidden h-full w-full rounded-xl bg-sage md:block" />
          <img
            src={hero}
            alt="An oats and yogurt bowl with banana, berries and nuts beside a green smoothie, in natural daylight"
            width={1200}
            height={1500}
            fetchPriority="high"
            className="relative aspect-[4/5] w-full rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  return (
    <div className="border-y border-divider bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-2 px-5 py-5 md:px-8">
        {trustStrip.map(([label, cat], i) => (
          <p key={cat} className="flex items-center gap-8 text-sm text-ink">
            <span className="font-medium">
              {label} <span className="font-editorial text-terracotta">from {formatPrice(fromPrice(cat))}</span>
            </span>
            {i < trustStrip.length - 1 && <span aria-hidden className="hidden h-1 w-1 rounded-full bg-sage-mid md:inline-block" />}
          </p>
        ))}
      </div>
    </div>
  );
}

function Signature() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-terracotta">Signature offerings</p>
            <h2 className="display-tight mt-3 text-[clamp(2.25rem,5vw,3.75rem)] text-forest">Made fresh, every day</h2>
          </div>
          <a href="#menu" className={`border-b-2 border-terracotta pb-1 text-sm font-bold uppercase tracking-[0.16em] text-forest transition-colors hover:text-terracotta ${focusRing}`}>
            View full menu ↓
          </a>
        </div>
        <div className="grid gap-10 md:grid-cols-12">
          {features.map((f) => (
            <article key={f.cat} className={f.span}>
              <div className="overflow-hidden rounded-xl">
                <img src={f.img} alt={f.alt} width={1024} height={1024} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-500 hover:scale-[1.03]" />
              </div>
              <div className="mt-5 flex items-baseline justify-between gap-4">
                <h3 className="display-tight text-2xl text-forest">{f.label}</h3>
                <p className="text-sm text-muted-foreground">from <span className="font-semibold text-terracotta">{formatPrice(fromPrice(f.cat))}</span></p>
              </div>
              <ul className="mt-3">
                {f.items.map(pick).map((i) => (
                  <li key={i.id} className="flex items-baseline justify-between gap-3 border-b border-dotted border-ink/15 py-2 text-[15px]">
                    <span className="text-ink">{i.name}</span>
                    <span className="font-semibold tabular-nums text-forest">{formatPrice(i.price)}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
          <article className="flex flex-col justify-center rounded-xl bg-sage p-8 md:col-span-7 md:p-10">
            <h3 className="display-tight text-2xl text-forest">Healthy Snacks</h3>
            <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              Something light between meals — quick bowls and bites that still feel like real food.
            </p>
            <ul className="mt-5">
              {snackItems.map((i) => (
                <li key={i.id} className="flex items-baseline justify-between gap-3 border-b border-dotted border-ink/15 py-2 text-[15px]">
                  <span className="text-ink">{i.name}</span>
                  <span className="font-semibold tabular-nums text-forest">{formatPrice(i.price)}</span>
                </li>
              ))}
            </ul>
            <a href="#menu" className={`mt-6 self-start border-b-2 border-terracotta pb-1 text-sm font-bold uppercase tracking-[0.16em] text-forest transition-colors hover:text-terracotta ${focusRing}`}>
              See all snacks ↓
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}

function Story() {
  return (
    <section id="approach" className="scroll-mt-20 bg-sage">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-12 md:px-8 md:py-28">
        <div className="md:col-span-5">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-terracotta">Our approach</p>
          <h2 className="display-tight mt-3 text-[clamp(2.25rem,5vw,3.5rem)] text-forest">Good food, made for everyday.</h2>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p className="text-lg leading-relaxed text-ink">
            Healthy Diet Cafe keeps things simple: bowls, shakes, dosas and meals made fresh through the day,
            at prices that work for students, gym-goers, families and everyone in between.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-ink">
            Ten sections on the menu — from protein power bowls to a quiet cup of green tea — so there is
            always something that fits how you want to eat today.
          </p>
          <blockquote className="mt-8 border-l-2 border-terracotta pl-5 font-editorial text-2xl leading-snug text-forest">
            “Everyday wellness should taste good — and cost everyday prices.”
          </blockquote>
        </div>
      </div>
    </section>
  );
}

function Hours() {
  const [state, setState] = useState<{ open: boolean; next: string | null } | null>(null);
  useEffect(() => {
    const update = () => setState(openStateAt(kolkataMinutesNow()));
    update();
    const t = setInterval(update, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="border-y border-divider bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-12 md:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-terracotta">Opening hours</p>
          <h2 className="display-tight mt-2 text-3xl text-forest">Open daily</h2>
          {state && (
            <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-divider bg-cream px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
              <span aria-hidden className={`h-2 w-2 rounded-full ${state.open ? "bg-leaf" : "bg-terracotta"}`} />
              {state.open ? "Open now" : `Closed · opens ${state.next}`}
            </p>
          )}
        </div>
        <dl className="w-full max-w-sm">
          {business.hours.map((h) => (
            <div key={h.label} className="flex items-baseline justify-between gap-6 border-b border-dotted border-ink/15 py-3">
              <dt className="font-editorial text-lg text-ink">{h.label}</dt>
              <dd className="text-lg font-semibold tabular-nums text-forest">{h.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

function Visit() {
  return (
    <section id="visit" className="scroll-mt-20 bg-forest text-cream">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-terracotta">Visit us</p>
        <h2 className="display-tight mt-3 text-[clamp(2.25rem,5vw,3.75rem)]">Come by the cafe</h2>
        <div className="mt-12 grid gap-10 md:grid-cols-[1fr_1.25fr] md:gap-14">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-sage-mid">Address</h3>
            <address className="mt-3 text-lg leading-relaxed not-italic">
              <span className="block font-semibold">{business.name}</span>
              {business.addressLines.map((l) => <span key={l} className="block">{l}</span>)}
            </address>
            <h3 className="mt-8 text-xs font-bold uppercase tracking-[0.22em] text-sage-mid">Call</h3>
            <a href={telLink} className={`mt-2 inline-block display-tight text-4xl transition-colors hover:text-terracotta ${focusRing}`}>
              {business.phoneDisplay}
            </a>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={directionsLink} {...external} className={`rounded-md bg-terracotta px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90 ${focusRing}`}>
                Get directions ↗
              </a>
              <a href={reviewsLink} {...external} className={`rounded-md border border-cream/40 px-5 py-3 text-xs font-bold uppercase tracking-[0.16em] transition-colors hover:border-terracotta hover:text-terracotta ${focusRing}`}>
                Read Google reviews ↗
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-cream/15 bg-botanical">
            <iframe
              src={mapEmbedUrl}
              title="Map showing Healthy Diet Cafe, Calcutta Sweets Complex, Nalco Nagar, Angul, Odisha"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[320px] w-full border-0 md:h-full md:min-h-[420px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Instagram() {
  return (
    <section className="bg-sage">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-6 px-5 py-16 md:px-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-terracotta">Instagram</p>
          <h2 className="display-tight mt-2 text-3xl text-forest">See what’s fresh today</h2>
          <p className="mt-2 text-muted-foreground">Daily specials and cafe moments on our Instagram.</p>
        </div>
        <a
          href={business.instagramUrl}
          {...external}
          className={`inline-flex items-center gap-3 rounded-md border border-forest/30 px-6 py-3.5 text-sm font-bold uppercase tracking-[0.14em] text-forest transition-colors hover:border-terracotta hover:text-terracotta ${focusRing}`}
        >
          <InstagramIcon className="h-5 w-5" /> Follow us on Instagram
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-ink text-cream/70">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="display-tight text-3xl text-cream">Healthy Diet <span className="font-editorial text-terracotta">Cafe</span></p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed">
              Fresh bowls, shakes and everyday healthy meals in Nalco Nagar, Angul.
            </p>
          </div>
          <div className="md:col-span-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-cream/50">Visit</h3>
            <address className="mt-3 text-sm leading-relaxed not-italic">
              {business.addressLines.map((l) => <span key={l} className="block">{l}</span>)}
            </address>
            <a href={directionsLink} {...external} className={`mt-3 inline-block text-sm font-semibold text-terracotta hover:underline ${focusRing}`}>Get directions ↗</a>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-cream/50">Hours</h3>
            <ul className="mt-3 space-y-1.5 text-sm">
              {business.hours.map((h) => <li key={h.label}><span className="font-editorial">{h.label}</span> · {h.value}</li>)}
            </ul>
          </div>
          <div className="md:col-span-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-cream/50">Contact</h3>
            <a href={telLink} className={`mt-3 block text-sm font-semibold text-cream hover:text-terracotta ${focusRing}`}>{business.phoneDisplay}</a>
            <a href={business.instagramUrl} {...external} className={`mt-2 inline-flex items-center gap-2 text-sm text-cream hover:text-terracotta ${focusRing}`}>
              <InstagramIcon className="h-4 w-4" /> {business.instagramHandle}
            </a>
            <nav className="mt-4 flex flex-col gap-1.5 text-sm" aria-label="Footer">
              {navLinks.map((l) => <a key={l.href} href={l.href} className={`hover:text-terracotta ${focusRing}`}>{l.label}</a>)}
            </nav>
          </div>
        </div>
        <div className="mt-12 border-t border-cream/10 pt-6 text-xs uppercase tracking-[0.18em] text-cream/40">
          © {new Date().getFullYear()} Healthy Diet Cafe · Nalco Nagar, Angul, Odisha
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="overflow-x-clip">
      <Nav />
      <Hero />
      <TrustStrip />
      <Signature />
      <section id="menu" className="scroll-mt-20 bg-cream">
        <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
          <div className="mb-10 max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-terracotta">The full menu</p>
            <h2 className="display-tight mt-3 text-[clamp(2.5rem,6vw,4.5rem)] text-forest">Everything we make</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Ten sections, one simple idea: <span className="font-editorial text-forest">good food, fair prices.</span> Search or tap a category.
            </p>
          </div>
          <MenuBoard />
        </div>
      </section>
      <Story />
      <Hours />
      <Visit />
      <Instagram />
      <Footer />
    </main>
  );
}
