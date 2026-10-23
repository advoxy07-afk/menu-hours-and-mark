/**
 * HEALTHY DIET CAFE — CENTRAL MENU DATA
 * Owners: edit names/prices here only. The whole site reads from this file.
 * Source: detailed green-and-cream menu (reference dataset).
 *
 * UNCONFIRMED ALTERNATIVE PRICES (second promotional design — NOT displayed):
 *   Chocolate Protein Shake ₹90 (main: ₹59) · Vanilla Protein Shake ₹90 (main: ₹59)
 *   Green Detox Shake ₹70 (main: ₹59) · Mixed Fruit Shake ₹75 (main: ₹55)
 *   Fruit Bowl ₹50 (main: ₹49) · Healthy Burger ₹70 · Sandwich (Veg/Paneer) ₹60
 *   Promo-only items, availability unconfirmed: Whey Protein Shake ₹80,
 *   Peanut Butter Shake ₹90, Banana Oats Shake ₹70, Mango Organic Shake ₹75,
 *   Moong Dal Chilla ₹50, Moong Dal Dosa ₹55, Salad Bowl ₹60, Oats Bowl ₹50.
 */

export type CategoryId =
  | "bowls" | "protein-shakes" | "organic-shakes" | "snacks" | "meals"
  | "dosas" | "burgers" | "sandwiches" | "add-ons" | "beverages" | "diet-plans";

export interface MenuCategory { id: CategoryId; name: string; visible: boolean }
export interface MenuItem { id: string; name: string; category: CategoryId; price: number }

/** Set diet-plans `visible: true` once the business confirms plans & prices. */
export const categories: MenuCategory[] = [
  { id: "bowls", name: "Protein Power Bowls", visible: true },
  { id: "protein-shakes", name: "Protein Shakes", visible: true },
  { id: "organic-shakes", name: "Organic Shakes", visible: true },
  { id: "snacks", name: "Healthy Snacks", visible: true },
  { id: "meals", name: "Healthy Meals", visible: true },
  { id: "dosas", name: "Dosas", visible: true },
  { id: "burgers", name: "Healthy Burgers", visible: true },
  { id: "sandwiches", name: "Sandwiches", visible: true },
  { id: "add-ons", name: "Add-ons", visible: true },
  { id: "beverages", name: "Beverages", visible: true },
  { id: "diet-plans", name: "Diet Plans", visible: false }, // provisional prices
];

const raw: [CategoryId, string, number][] = [
  ["bowls", "Oats Dry Fruit Mix", 45],
  ["bowls", "Muesli Dry Fruit Mix", 55],
  ["bowls", "Oats Muesli Mix (Special)", 65],
  ["protein-shakes", "Chocolate Protein Shake", 59],
  ["protein-shakes", "Vanilla Protein Shake", 59],
  ["protein-shakes", "Strawberry Protein Shake", 59],
  ["protein-shakes", "Banana Protein Shake", 65],
  ["protein-shakes", "Mango Protein Shake", 65],
  ["protein-shakes", "Peanut Butter Protein Shake", 75],
  ["protein-shakes", "Oats Protein Shake", 85],
  ["protein-shakes", "Mix Dry Fruits Shake", 45],
  ["protein-shakes", "High Protein (Mix)", 98],
  ["organic-shakes", "Fresh Lime & Mint", 45],
  ["organic-shakes", "Watermelon Shake", 49],
  ["organic-shakes", "Pineapple Shake", 49],
  ["organic-shakes", "Mixed Fruit Shake", 55],
  ["organic-shakes", "Mango Shake", 55],
  ["organic-shakes", "Apple Cinnamon Shake", 55],
  ["organic-shakes", "Green Detox Shake", 59],
  ["snacks", "Roasted Chana", 25],
  ["snacks", "Mixed Nuts (Small)", 39],
  ["snacks", "Mixed Nuts (Large)", 69],
  ["snacks", "Boiled Eggs (2 pcs)", 25],
  ["snacks", "Sprouts Bowl", 39],
  ["snacks", "Fruit Bowl", 49],
  ["snacks", "Veggie Sticks with Hummus", 49],
  ["snacks", "Healthy Trail Mix", 59],
  ["meals", "Quinoa Bowl", 85],
  ["meals", "Brown Rice Bowl", 85],
  ["meals", "Grilled Chicken Bowl", 129],
  ["meals", "Paneer Bowl", 115],
  ["meals", "Veg Protein Bowl", 89],
  ["meals", "Dahi & Salad Plate", 69],
  ["meals", "Khichdi (Moong / Masoor)", 59],
  ["dosas", "Plain Dosa", 49],
  ["dosas", "Masala Dosa", 59],
  ["dosas", "Ragi Dosa", 69],
  ["dosas", "Moong Dal Healthy Dosa", 69],
  ["dosas", "Paneer Dosa", 79],
  ["dosas", "Oats Dosa", 69],
  ["burgers", "Veg Burger", 59],
  ["burgers", "Paneer Burger", 69],
  ["burgers", "Grilled Chicken Burger", 79],
  ["burgers", "Low Carb Burger", 85],
  ["sandwiches", "Veg Sandwich", 45],
  ["sandwiches", "Grilled Veg Sandwich", 55],
  ["sandwiches", "Paneer Sandwich", 65],
  ["sandwiches", "Chicken Sandwich", 69],
  ["sandwiches", "Club Sandwich", 79],
  ["sandwiches", "Healthy Multigrain Sandwich", 75],
  ["add-ons", "Extra Protein", 25],
  ["add-ons", "Peanut Butter", 15],
  ["add-ons", "Oats", 10],
  ["add-ons", "Honey", 10],
  ["add-ons", "Boiled Egg", 15],
  ["beverages", "Green Tea", 25],
  ["beverages", "Herbal Tea", 19],
  ["beverages", "Black Coffee", 25],
  ["beverages", "Cold Coffee (Healthy)", 49],
  ["beverages", "Fresh Fruit Juice (Seasonal)", 59],
  ["diet-plans", "1 Week Plan", 999],
  ["diet-plans", "1 Month Plan", 2499],
  ["diet-plans", "3 Months Plan", 6999],
];

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const menuItems: MenuItem[] = raw.map(([category, name, price]) => ({
  id: `${category}--${slug(name)}`, name, category, price,
}));

export const visibleCategories = categories.filter((c) => c.visible);

export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function filterMenu(query: string, category: CategoryId | "all") {
  const q = query.trim().toLowerCase();
  const visible = new Set(visibleCategories.map((c) => c.id));
  return menuItems.filter(
    (i) => visible.has(i.category) &&
      (category === "all" || i.category === category) &&
      (!q || i.name.toLowerCase().includes(q)),
  );
}
