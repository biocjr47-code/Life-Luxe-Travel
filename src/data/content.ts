/**
 * Blog posts and travel style guides.
 *
 * The two posts are Terry's own drafts, already written. Their
 * bodies still live as HTML on the GHL site, so each card links
 * out rather than pretending to a full post route this app does
 * not yet own. When the bodies move into this repo, swap `href`
 * for an internal route and add the content.
 */

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  imageAlt: string;
  href: string;
};

export const POSTS: Post[] = [
  {
    slug: "airline-ticket-myths",
    title:
      "Airline Ticket Myths: What I Know After Working for Delta Air Lines",
    excerpt:
      "There are a whole lot of myths floating around about buying airline tickets — about the day to book, the browser you use, and the price you are supposedly being shown.",
    category: "Insider tips",
    image: "/images/blog-airline-myths.jpg",
    imageAlt: "The wing of an airliner above cloud",
    href: "https://lifeluxetravel.com/travel-blog",
  },
  {
    slug: "global-entry-new-app",
    title: "Global Entry Travelers: There's a New App You Need to Know About",
    excerpt:
      "If you have Global Entry and use the mobile app when returning to the United States, there's an important update to know before your next international trip.",
    category: "Travel admin",
    image: "/images/blog-global-entry.jpg",
    imageAlt: "An airport terminal concourse seen through glass",
    href: "https://lifeluxetravel.com/travel-blog",
  },
];

/**
 * Travel Style Guides — packing lists built around real trips.
 *
 * Life Luxe is an Amazon Associate, which is why the guides carry a
 * disclosure. That disclosure is not optional dressing: it is an FTC
 * requirement and it is on the live site too.
 */
export type Guide = {
  title: string;
  blurb: string;
  sections: string[];
  image: string;
  imageAlt: string;
  href: string;
};

export const GUIDES: Guide[] = [
  {
    title: "South Africa Safari Journey",
    blurb:
      "What to actually pack for game drives, early starts and cool evenings on the reserve.",
    sections: ["Safari essentials", "Clothing", "Health & comfort"],
    image: "/images/sa-game-lodge-group.jpg",
    imageAlt: "Travellers together on a lawn beside a life-size elephant sculpture in South Africa",
    href: "https://lifeluxetravel.com/travel-style-guides",
  },
  {
    title: "Group Beach Getaway",
    blurb:
      "Built around a real Jack & Jill group beach trip — swimwear, cover-ups and everything that makes a group photo work.",
    sections: [
      "Swimsuits",
      "Beach essentials",
      "Bags & organisation",
      "Sun protection",
    ],
    image: "/images/bali-rice-terrace.jpg",
    imageAlt: "A traveller in a yellow dress on a path in Bali, green terraces behind",
    href: "https://lifeluxetravel.com/travel-style-guides",
  },
  {
    title: "Travel Comfort & Beauty",
    blurb:
      "The long-haul list: what makes the flight bearable and what survives a week in a suitcase.",
    sections: ["Travel comfort", "Travel beauty", "Tech essentials"],
    image: "/images/marrakech-mint-tea.jpg",
    imageAlt: "A silver teapot and a glass of mint tea on a red checked tablecloth",
    href: "https://lifeluxetravel.com/travel-style-guides",
  },
];

export const AMAZON_DISCLOSURE =
  "As an Amazon Associate we earn from qualifying purchases.";
