/**
 * HEALTHY DIET CAFE — CENTRAL BUSINESS CONFIG
 * Every phone / map / social link on the site reads from here.
 *
 * NOTES BEFORE LAUNCH
 * - googleMapsUrl is the share link supplied by the business. It has NOT yet been
 *   confirmed to open the exact café listing — open it on a phone before publishing.
 * - When a verified direct reviews URL or Business Profile URL exists, set
 *   googleReviewsUrl / googleBusinessProfileUrl below; components pick it up.
 * - No map embed: it would need a Google API key. External links are used instead.
 */
export const business = {
  name: "Healthy Diet Cafe",
  addressLines: ["Calcutta Sweets Complex,", "Nalco Nagar, Angul,", "Odisha, India"],
  phone: "7077514143",
  phoneDisplay: "70775 14143",
  instagramUrl: "https://www.instagram.com/healthydietcafe2026?vrfl=MXYwcTFseGZ5ZG9wZg==",
  instagramHandle: "@healthydietcafe2026",
  googleMapsUrl: "https://share.google/C6UemkWztxnmuHmbj",
  /** Falls back to googleMapsUrl until a verified directions/reviews URL is supplied. */
  googleDirectionsUrl: null as string | null,
  googleReviewsUrl: null as string | null,
  googleBusinessProfileUrl: null as string | null,
  hours: [
    { label: "Morning", value: "6:30 – 11:30 am" },
    { label: "Evening", value: "4:30 – 10:00 pm" },
  ],
} as const;

export const mapsLink = business.googleMapsUrl;
export const directionsLink = business.googleDirectionsUrl ?? business.googleMapsUrl;
export const reviewsLink = business.googleReviewsUrl ?? business.googleMapsUrl;
export const telLink = `tel:+91${business.phone}`;
export const external = { target: "_blank", rel: "noopener noreferrer" } as const;
