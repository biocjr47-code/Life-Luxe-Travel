/**
 * The gallery, grouped by journey.
 *
 * ── A CORRECTION, AND THE RULE THAT CAME OUT OF IT ──────────────
 * The first version of this file described each photograph from its
 * FILENAME. That was wrong, and several descriptions were simply
 * false: `bali-rice-terrace.jpg` is a woman in a yellow dress beside
 * a statue; `sa-waterfront.jpg` is someone inside a "Cape Town"
 * sculpture; `sa-game-lodge-group.jpg` is the group beside an
 * elephant sculpture on a lawn, not inside a lodge.
 *
 * Alt text that describes something not in the photograph is worse
 * than no alt text at all — a screen-reader user is told a thing
 * that is not there. Every line below was written after looking at
 * the image.
 *
 * Filenames were left alone: they are referenced in the GHL media
 * library and renaming them would break the live site.
 *
 * Where the location cannot be confirmed from the image, the caption
 * says less rather than guessing.
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
      "Cape Town and the Cape Peninsula — Table Mountain, the city below it, and a group that came back changed.",
    photos: [
      {
        src: "/images/hero-cape-town.jpg",
        alt: "A traveller sitting on a bench above the coast near Cape Town, watching surf break below the mountains",
        caption: "The long view",
        place: "Camps Bay, Cape Town",
        span: "wide",
      },
      {
        src: "/images/sa-table-mountain-view.jpg",
        alt: "A traveller on a hillside path, arm outstretched towards Cape Town and the mountains across the valley",
        caption: "Pointing it out",
        place: "Above Cape Town",
      },
      {
        src: "/images/sa-game-lodge-group.jpg",
        alt: "Five travellers standing together on a lawn beside a life-size elephant sculpture",
        caption: "The group, and the elephant",
        place: "South Africa",
      },
      {
        src: "/images/sa-waterfront.jpg",
        alt: "A traveller standing inside a large sculpted bench that spells out Cape Town",
        caption: "In the letters",
        place: "Cape Town",
      },
      {
        src: "/images/sa-city-hall-balcony.jpg",
        alt: "The balcony of Cape Town City Hall, where Nelson Mandela spoke on the day of his release",
        caption: "The balcony",
        place: "Cape Town City Hall",
      },
      {
        src: "/images/sa-table-mountain.jpg",
        alt: "A traveller framed inside a yellow photo frame marked Table Mountain, Cape Town, South Africa",
        caption: "Through the frame",
        place: "Table Mountain, Cape Town",
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
        alt: "The Santorini caldera, whitewashed buildings along the cliff edge above deep blue water",
        caption: "The caldera",
        place: "Santorini",
        span: "wide",
      },
      {
        src: "/images/greece-erechtheion.jpg",
        alt: "A traveller standing in front of the columns of the Erechtheion on the Athens Acropolis",
        caption: "At the Erechtheion",
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
        alt: "The cobalt blue pavilion at the Jardin Majorelle, with yellow and red planters on its terrace",
        caption: "Majorelle blue",
        place: "Jardin Majorelle",
      },
      {
        src: "/images/marrakech-painted-ceiling.jpg",
        alt: "An intricately painted and gilded Moroccan dome ceiling seen from directly below",
        caption: "Overhead",
        place: "Marrakech",
      },
      {
        src: "/images/marrakech-bab-agnaou.jpg",
        alt: "The carved stone archway of Bab Agnaou, with a yellow taxi passing on the road in front",
        caption: "Bab Agnaou",
        place: "Marrakech medina",
      },
      {
        src: "/images/marrakech-mint-tea.jpg",
        alt: "A silver teapot and a glass of mint tea on a red checked tablecloth",
        caption: "Mint tea",
        place: "Marrakech",
      },
      {
        src: "/images/marrakech-ysl.jpg",
        alt: "A traveller in a white shirt and hat standing beside the YSL monogram on a pink wall",
        caption: "At the YSL museum",
        place: "Marrakech",
      },
      {
        src: "/images/marrakech-bamboo-bench.jpg",
        alt: "A traveller seated on a pale green bench surrounded by tall bamboo",
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
        alt: "The Life Luxe group gathered at the cruise terminal on embarkation day",
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
      "Terraced hillsides, temple courtyards, and a flower swing out over the valley.",
    photos: [
      {
        src: "/images/bali-jungle-swing.jpg",
        alt: "A traveller in orange on a swing ringed with flowers, suspended above palm forest",
        caption: "Out over the valley",
        place: "Bali",
        span: "wide",
      },
      {
        src: "/images/bali-temple-gate.jpg",
        alt: "A traveller holding up a green fruit in a temple courtyard hung with vines",
        caption: "In the courtyard",
        place: "Bali",
      },
      {
        src: "/images/bali-rice-terrace.jpg",
        alt: "A traveller in a yellow dress on a paved path beside a carved stone figure, green terraces behind",
        caption: "On the path",
        place: "Bali",
      },
    ],
  },
  {
    slug: "kentucky-derby",
    title: "The Kentucky Derby",
    when: "Louisville, Kentucky",
    blurb:
      "Churchill Downs on Derby day — hats, the rail, and the walk down to trackside.",
    photos: [
      {
        src: "/images/derby-our-group.jpg",
        alt: "The Life Luxe group together in Derby day hats and suits, beside the coach at Churchill Downs",
        caption: "Our group, Derby day",
        place: "Churchill Downs",
        span: "wide",
      },
      {
        src: "/images/derby-hats.jpg",
        alt: "Two travellers in wide purple and pink Derby hats, smiling at the camera",
        caption: "The hats",
        place: "Churchill Downs",
      },
      {
        src: "/images/derby-day-churchill-downs.jpg",
        alt: "A traveller in a green hat at the rail, with horses and the grandstand behind",
        caption: "At the rail",
        place: "Churchill Downs",
      },
      {
        src: "/images/terry-derby.jpg",
        alt: "Terry Powell in an orange dress beside the Secretariat statue at Churchill Downs",
        caption: "Beside Secretariat",
        place: "Churchill Downs",
      },
      {
        src: "/images/derby-trackside.jpg",
        alt: "A traveller in a purple hat and patterned outfit standing at the trackside rail",
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
        alt: "Terry Powell in a blue and gold gown in the marble courtyard of the Sheikh Zayed Grand Mosque",
        caption: "The Grand Mosque courtyard",
        place: "Abu Dhabi",
      },
    ],
  },
];
