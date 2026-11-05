/**
 * Site-wide truth: navigation, contact details, and the hosted
 * LeadConnector endpoints.
 *
 * Everything here is taken from the live lifeluxetravel.com. Nothing
 * is invented. If a number or a claim changes, change it here — it is
 * the single source for every page.
 */

export const SITE = {
  name: "Life Luxe Travel",
  legalName: "Life Luxe Travel, LLC",
  tagline: "Effortless Group Trips. Extraordinary Experiences.",
  description:
    "Life Luxe Travel plans effortless, extraordinary group journeys — wellness retreats, milestone celebrations, corporate escapes and hosted trips — designed and run end to end by Terry Powell.",
  url: "https://lifeluxetravel.com",
  phone: "(470) 993-0955",
  phoneHref: "tel:+14709930955",
  email: "info@lifeluxetravel.com",
  founder: "Terry Powell",
} as const;

/**
 * LeadConnector hosted endpoints.
 *
 * These are PUBLIC by design — they are the same URLs the live site
 * exposes in its own markup. No API token is involved, which is why
 * this file is safe to commit. Lead capture posts straight into the
 * CRM with no server of our own in the path.
 */
export const LEADCONNECTOR = {
  bookingWidget:
    "https://link.lifeluxetravel.com/widget/bookings/book-with-terry-powell",
  packingGuide: "https://lifeluxetravel.com/free-effortless-packing-guide",
  /** The Group Trip Planning Checklist opt-in. */
  checklistForm:
    "https://link.lifeluxetravel.com/widget/form/6cRl8fSsuta2G67SCnG9",
  formEmbedScript: "https://link.lifeluxetravel.com/js/form_embed.js",
} as const;

export const SOCIAL = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/lifeluxetravel1/",
    handle: "@lifeluxetravel1",
  },
  { name: "Facebook", href: "https://www.facebook.com/lifeluxetravel" },
  { name: "YouTube", href: "https://www.youtube.com/@lifeluxetravel" },
  { name: "Pinterest", href: "https://www.pinterest.com/lifeluxetravel" },
] as const;

export const NAV = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Group Trips", to: "/group-trips" },
  { label: "Gallery", to: "/gallery" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "Style Guides", to: "/travel-style-guides" },
  { label: "Blog", to: "/blog" },
] as const;

/**
 * Terry's published figures, carried over verbatim from the live
 * About page. Not estimates and not rounded by us.
 */
export const STATS = [
  { value: "2,500+", label: "Lives impacted", icon: "users" },
  { value: "100+", label: "Trips planned", icon: "map" },
  { value: "34+", label: "Destinations visited", icon: "globe" },
] as const;

/**
 * Real industry accreditations. The badge artwork is Terry's own,
 * pulled from the live site's media library.
 */
export const CERTIFICATIONS = [
  {
    src: "/images/badge-clia.jpg",
    alt: "Cruise Lines International Association member, 2026",
    name: "CLIA Member 2026",
  },
  {
    src: "/images/badge-asta.jpg",
    alt: "American Society of Travel Advisors member",
    name: "ASTA Member",
  },
  {
    src: "/images/badge-virgin-voyages.jpg",
    alt: "Virgin Voyages Certified First Mate",
    name: "Virgin Voyages Certified First Mate",
  },
  {
    src: "/images/badge-natgeo-lindblad.jpg",
    alt: "National Geographic and Lindblad Expeditions certified advisor",
    name: "Nat Geo / Lindblad Expeditions",
  },
  {
    src: "/images/badge-los-cabos.jpg",
    alt: "Los Cabos Specialist certification",
    name: "Los Cabos Specialist",
  },
] as const;

/** From the live Group Trips page, verbatim. */
export const WHY_US = [
  {
    title: "Certified Group Expert",
    body: "Group travel is its own discipline. Contracts, rooming lists, and group air are handled by someone who does this every week.",
    icon: "badge-check",
  },
  {
    title: "Certified Luxury Advisor",
    body: "Access to properties, upgrades and amenities that are not available to the general public.",
    icon: "gem",
  },
  {
    title: "IATA Accredited",
    body: "A recognised travel agency with direct supplier relationships, not a reseller.",
    icon: "shield-check",
  },
  {
    title: "White-Glove Planning",
    body: "Destination research, itinerary design, bookings, payments and on-trip support — all of it, start to finish.",
    icon: "hand-heart",
  },
  {
    title: "Group Privileges",
    body: "Negotiated rates, private events, welcome receptions and the extras that make a group feel hosted.",
    icon: "sparkles",
  },
  {
    title: "Payment Plans Available",
    body: "Deposits and scheduled instalments so guests can commit early and pay over time.",
    icon: "calendar-clock",
  },
] as const;
