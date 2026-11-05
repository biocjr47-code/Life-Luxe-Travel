/**
 * The gallery, grouped by journey.
 *
 * Every photograph here is Terry's own, taken on a Life Luxe trip.
 * Captions describe what is actually in the frame — two are
 * deliberately vague ("Looking out to sea", "In the highlands")
 * because the source data did not support more than that, and a
 * guessed caption is worse than a modest one.
 *
 * `span` drives the masonry rhythm: "wide" tiles take two columns on
 * desktop. Mixing them is what stops the grid reading as a
 * contact sheet.
 */

export type Photo = {
  src: string;
  alt: string;
  caption: string;
  place: string;
  span?: "wide";
};

export type Journey = {
  slug: string;
  title: string;
  when: string;
  blurb: string;
  photos: Photo[];
};

export const JOURNEYS: Journey[] = [
  {
    slug: "cape-town",
    title: "South Africa",
    when: "September 2026",
    blurb:
      "Cape Town and the Cape Peninsula — Table Mountain, the waterfront, and a game lodge inland. A family reunion that became something larger.",
    photos: [
      {
        src: "/images/hero-cape-town.jpg",
        alt: "A Life Luxe traveller sitting on a bench above the coast near Cape Town, watching surf break below the Twelve Apostles",
        caption: "The long view",
        place: "Camps Bay, Cape Town",
        span: "wide",
      },
      {
        src: "/images/sa-table-mountain.jpg",
        alt: "Table Mountain rising behind Cape Town under heavy cloud",
        caption: "Table Mountain, under its tablecloth",
        place: "Cape Town",
      },
      {
        src: "/images/sa-game-lodge-group.jpg",
        alt: "The Life Luxe group gathered together at a South African game lodge",
        caption: "The whole group, at the lodge",
        place: "South Africa",
      },
      {
        src: "/images/sa-waterfront.jpg",
        alt: "Boats and buildings along the V&A Waterfront in Cape Town",
        caption: "Along the waterfront",
        place: "V&A Waterfront, Cape Town",
      },
      {
        src: "/images/sa-city-hall-balcony.jpg",
        alt: "The balcony of Cape Town City Hall, where Nelson Mandela gave his first speech after release",
        caption: "The balcony",
        place: "Cape Town City Hall",
      },
      {
        src: "/images/sa-table-mountain-view.jpg",
        alt: "The view out over Cape Town and the bay from the slopes of Table Mountain",
        caption: "Above the bay",
        place: "Table Mountain",
        span: "wide",
      },
    ],
  },
  {
    slug: "greece",
    title: "Greece & the Greek Islands",
    when: "Athens · Mykonos · Santorini",
    blurb:
      "Ancient sites in Athens, then the Cyclades — a catamaran across the Mediterranean and the caldera at golden hour.",
    photos: [
      {
        src: "/images/greece-caldera.jpg",
        alt: "The Santorini caldera, with whitewashed buildings on the cliff edge above deep blue water",
        caption: "The caldera",
        place: "Santorini",
        span: "wide",
      },
      {
        src: "/images/greece-erechtheion.jpg",
        alt: "The Caryatid columns of the Erechtheion on the Athens Acropolis",
        caption: "The Erechtheion",
        place: "Acropolis, Athens",
      },
      {
        src: "/images/greece-terry-by-the-water.jpg",
        alt: "Terry Powell standing by the water in Greece",
        caption: "Looking out to sea",
        place: "Greece",
      },
      {
        src: "/images/terry-santorini.jpg",
        alt: "Terry Powell in a flowing blue gown on a Santorini terrace above the blue-domed churches",
        caption: "Golden hour, blue dress",
        place: "Santorini",
      },
    ],
  },
  {
    slug: "marrakech",
    title: "Marrakech",
    when: "Morocco",
    blurb:
      "The medina, the Majorelle gardens and the YSL museum — colour, tilework and mint tea in the late afternoon.",
    photos: [
      {
        src: "/images/marrakech-majorelle-pavilion.jpg",
        alt: "The cobalt blue pavilion at the Jardin Majorelle in Marrakech",
        caption: "Majorelle blue",
        place: "Jardin Majorelle",
      },
      {
        src: "/images/marrakech-painted-ceiling.jpg",
        alt: "An intricately painted and carved Moroccan ceiling",
        caption: "Overhead",
        place: "Marrakech",
      },
      {
        src: "/images/marrakech-bab-agnaou.jpg",
        alt: "The carved stone gateway of Bab Agnaou in the Marrakech medina walls",
        caption: "Bab Agnaou",
        place: "Marrakech medina",
      },
      {
        src: "/images/marrakech-mint-tea.jpg",
        alt: "A pot of Moroccan mint tea poured into glasses on a patterned table",
        caption: "Mint tea, poured high",
        place: "Marrakech",
      },
      {
        src: "/images/marrakech-ysl.jpg",
        alt: "The terracotta brickwork facade of the Yves Saint Laurent museum in Marrakech",
        caption: "The YSL museum",
        place: "Marrakech",
      },
      {
        src: "/images/marrakech-bamboo-bench.jpg",
        alt: "A shaded bench surrounded by bamboo in a Marrakech garden",
        caption: "Shade, found",
        place: "Marrakech",
        span: "wide",
      },
    ],
  },
  {
    slug: "nye-at-sea",
    title: "New Year's Eve at Sea",
    when: "December 2026 – January 2027",
    blurb:
      "Virgin Voyages out of Miami, with Cozumel on the way. Terry sailed it first — which is why she is hosting it again for 2027.",
    photos: [
      {
        src: "/images/nye-vv-group-embarkation.jpg",
        alt: "The Life Luxe group at the Virgin Voyages terminal on embarkation day",
        caption: "Boarding day",
        place: "Miami",
        span: "wide",
      },
      {
        src: "/images/nye-vv-2026-cozumel.jpg",
        alt: "The Virgin Voyages ship alongside the pier at Cozumel",
        caption: "Alongside in Cozumel",
        place: "Cozumel, Mexico",
      },
      {
        src: "/images/nye-vv-terry-ship.jpg",
        alt: "Terry Powell on deck aboard the Virgin Voyages ship",
        caption: "On deck",
        place: "At sea",
      },
      {
        src: "/images/nye-vv-new-year-shore.jpg",
        alt: "Ashore on New Year's Day during the Virgin Voyages sailing",
        caption: "New Year's Day ashore",
        place: "Caribbean",
      },
    ],
  },
  {
    slug: "bali",
    title: "Bali",
    when: "Indonesia",
    blurb:
      "Rice terraces in the highlands, temple gates at dawn, and the jungle swing above the valley.",
    photos: [
      {
        src: "/images/bali-rice-terrace.jpg",
        alt: "Stepped green rice terraces on a Balinese hillside",
        caption: "In the highlands",
        place: "Bali",
        span: "wide",
      },
      {
        src: "/images/bali-temple-gate.jpg",
        alt: "A split candi bentar temple gate in Bali framing the landscape beyond",
        caption: "The split gate",
        place: "Bali",
      },
      {
        src: "/images/bali-jungle-swing.jpg",
        alt: "A traveller on a jungle swing above a forested Balinese valley",
        caption: "Out over the valley",
        place: "Bali",
      },
    ],
  },
  {
    slug: "kentucky-derby",
    title: "The Kentucky Derby",
    when: "Louisville, Kentucky",
    blurb:
      "Churchill Downs on Derby day — hats, the paddock, and the walk down to trackside.",
    photos: [
      {
        src: "/images/derby-our-group.jpg",
        alt: "The Life Luxe group together in Derby day outfits at Churchill Downs",
        caption: "Our group, Derby day",
        place: "Churchill Downs",
        span: "wide",
      },
      {
        src: "/images/derby-hats.jpg",
        alt: "Derby day hats in the stands at Churchill Downs",
        caption: "The hats",
        place: "Churchill Downs",
      },
      {
        src: "/images/derby-day-churchill-downs.jpg",
        alt: "The twin spires and crowds at Churchill Downs on Derby day",
        caption: "Churchill Downs",
        place: "Louisville, Kentucky",
      },
      {
        src: "/images/terry-derby.jpg",
        alt: "Terry Powell beside the Secretariat statue at Churchill Downs",
        caption: "Beside Secretariat",
        place: "Churchill Downs",
      },
      {
        src: "/images/derby-trackside.jpg",
        alt: "The view down to the track at Churchill Downs",
        caption: "Trackside",
        place: "Churchill Downs",
      },
    ],
  },
  {
    slug: "uae",
    title: "The Emirates",
    when: "United Arab Emirates",
    blurb:
      "Abu Dhabi and the Sheikh Zayed Grand Mosque — marble, inlay and a courtyard that holds the light.",
    photos: [
      {
        src: "/images/terry-abu-dhabi.jpg",
        alt: "Terry Powell in a blue and gold gown in the courtyard of the Sheikh Zayed Grand Mosque, Abu Dhabi",
        caption: "The Grand Mosque courtyard",
        place: "Abu Dhabi",
      },
    ],
  },
];
