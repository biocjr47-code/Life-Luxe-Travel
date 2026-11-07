/**
 * The hosted trip calendar and custom getaway categories.
 *
 * Taken verbatim from the live Group Trips page. Trips marked
 * `status: "preview"` are the ones the live site labels "Details
 * Coming Soon" — they are shown as previews rather than as bookable,
 * because that is what they are.
 */

export type TripStatus = "open" | "preview";

export type Trip = {
  year: string;
  title: string;
  where: string;
  when: string;
  blurb: string;
  status: TripStatus;
  image?: string;
  imageAlt?: string;
  /** object-position, for a source whose subject is off-centre. */
  imageFocus?: string;
  href?: string;
};

export const TRIPS: Trip[] = [
  {
    year: "2027",
    title: "Greece & the Greek Islands",
    where: "Athens · Mykonos · Santorini",
    when: "May 2027",
    blurb:
      "Sun-washed villages cascading into the Aegean, white-and-blue architecture at golden hour, and ancient history blended with effortless luxury. Timeless ruins, a sail between the islands, and sunset dinners perched above the sea in Santorini.",
    status: "open",
    image: "/images/dest-greece.jpg",
    imageAlt:
      "Oia on Santorini at dusk — blue-domed churches and whitewashed houses stepping down the caldera cliff above the sea",
    href: "https://lifeluxetravel.com/greece2027",
  },
  {
    year: "2027",
    title: "New Year's Eve at Sea",
    where: "Sail into 2028 with us",
    when: "December 2027",
    blurb:
      "A New Year's Eve sailing out of Miami. Terry hosted this voyage herself last season, which is the only reason it is on the calendar again.",
    status: "open",
    image: "/images/nye-2027-dress-up.png",
    imageAlt:
      "Five guests in evening dress raising champagne on a Virgin Voyages deck at dusk, the ship's red funnel behind them",
    href: "https://lifeluxetravel.com/nye-2027-cruise",
  },
  {
    year: "2027",
    title: "Austin, Texas",
    where: "Miraval Austin Resort & Spa",
    when: "2027",
    blurb:
      "A wellness retreat in the Texas Hill Country. Details coming soon.",
    status: "preview",
    image: "/images/dest-austin.jpg",
    imageAlt:
      "The Austin skyline at golden hour, reflected in Lady Bird Lake beneath the arches of the Lamar Boulevard bridge",
  },
  {
    year: "2028",
    title: "Australia",
    where: "Australia",
    when: "January 2028",
    blurb: "Details coming soon.",
    status: "preview",
    image: "/images/dest-australia.jpg",
    imageAlt:
      "Sydney Opera House and the Harbour Bridge lit at dusk, seen across the water",
  },
  {
    year: "2028",
    title: "The Kentucky Derby",
    where: "Louisville, Kentucky",
    when: "April / May 2028",
    blurb:
      "Churchill Downs on Derby day — a trip Terry has hosted before. Details coming soon.",
    status: "preview",
    image: "/images/derby-hats.jpg",
    imageAlt: "Two travellers in wide purple and pink Derby hats",
  },
  {
    year: "2028",
    title: "Rio de Janeiro, Brazil",
    where: "Culture · Cuisine · Iconic views",
    when: "September 2028",
    blurb:
      "Culture, cuisine, iconic views and unforgettable energy.",
    status: "open",
    image: "/images/dest-rio.jpg",
    imageAlt:
      "Rio de Janeiro from above — Ipanema beach curving into the Atlantic, the lagoon inland, and Christ the Redeemer on the ridge",
  },
  {
    year: "2029",
    title: "Ghana",
    where: "Culture · Heritage · Connection",
    when: "2029",
    blurb: "Culture, heritage, connection and celebration.",
    status: "open",
    image: "/images/dest-ghana.jpg",
    imageAlt:
      "A busy street in Accra, Ghana — families and traders walking between market stalls in bright sunlight",
  },
];

/** Private group trips, planned around your own occasion. */
export const CUSTOM_GETAWAYS = [
  {
    title: "Birthdays & anniversaries",
    when: "Any time of year",
    icon: "cake",
  },
  { title: "Spring break", when: "March – April", icon: "sun" },
  { title: "Summer vacations", when: "May – August", icon: "palmtree" },
  { title: "Ski groups", when: "January – March", icon: "snowflake" },
  { title: "Holiday trips", when: "November – December", icon: "gift" },
] as const;

/** Destinations the live homepage features as group-trip inspiration. */
export const DESTINATIONS = [
  "Bali, Indonesia",
  "Costa Rica",
  "Sedona, AZ",
  "Tulum, MX",
  "Ibiza, Spain",
  "Thailand",
  "Greece",
  "Portugal",
] as const;

/** Trips already run, as listed under "Past Highlights". */
export const PAST_HIGHLIGHTS = [
  "Dubai Dazzle",
  "Maldives Serenity",
  "Iceland",
  "Bali",
  "Los Cabos",
  "Greece",
] as const;
