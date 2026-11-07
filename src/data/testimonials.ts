/**
 * Guest testimonials, carried over verbatim from the live site's
 * "Happy Travelers" section at lifeluxetravel.com/testimonials.
 *
 * THESE ARE REAL, AND SO ARE THE PEOPLE. The live site publishes a
 * first name, a home city and a photograph for each one, and those
 * are reproduced here as published. Do not edit the wording, do not
 * add more, and do not invent an attribution that is not on the
 * live page.
 *
 * An earlier version of this file carried only the trip, because I
 * had not found the published attributions. The Greece quote also
 * ended "everything ran smoothly", which is not what the live site
 * says — it is "everything worked like clockwork…air travel,
 * transfers, multiple hotels, boats, Covid testing, etc." Both are
 * corrected here against the page itself.
 *
 * `avatar` is the guest's own portrait. `image` is a photograph
 * from their journey — two different things, and the components
 * must not treat one as the other.
 */

export type Testimonial = {
  heading: string;
  quote: string[];
  /** As published on the live site: first name only. */
  name: string;
  location: string;
  avatar: string;
  avatarAlt: string;
  trip: string;
  image: string;
  imageAlt: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    heading: "The Greek Isles are simply amazing",
    quote: [
      "Our trip to Greece was wonderful. We flew into Athens, spent a couple days touring all the sites, then we went to Mykonos and stayed at a beautiful 5-star hotel.",
      "Our next stop was Santorini, where we rented a catamaran and sailed the Mediterranean and enjoyed the most spectacular sunset. All the details were attended to and everything worked like clockwork…air travel, transfers, multiple hotels, boats, Covid testing, etc.",
      "We created a lifetime of memories and are already planning another trip for next year!",
    ],
    name: "Florence",
    location: "Washington, DC",
    avatar: "/images/guest-florence.png",
    avatarAlt: "Florence, in a teal top and sunglasses, looking out to sea",
    trip: "Greece — Athens, Mykonos & Santorini",
    image: "/images/greece-caldera.jpg",
    imageAlt: "The Santorini caldera above deep blue Aegean water",
  },
  {
    heading: "Dubai was a trip of a lifetime",
    quote: [
      "The trip to Dubai was amazing!",
      "Logistically, there was not a single hiccup. The drivers arrived on-time, the hotel was spectacular and located near one of the best malls.",
      "The restaurant recommendations were on point!",
      "Our guide was incredibly knowledgeable and funny. We learned a great deal. I will return and refer others to Terry!",
    ],
    name: "Barbara",
    location: "Houston, TX",
    avatar: "/images/guest-barbara.png",
    avatarAlt: "Barbara, smiling in a straw sun hat",
    trip: "United Arab Emirates",
    image: "/images/terry-abu-dhabi.jpg",
    imageAlt:
      "The marble courtyard of the Sheikh Zayed Grand Mosque in Abu Dhabi",
  },
  {
    heading: "South Africa was life changing",
    quote: [
      "My family wanted to experience a family reunion that would change our lives and we accomplished just that.",
      "We spent 10 glorious days in Johannesburg, South Africa.",
      "It was life changing! We visited the Apartheid Museum, the house where Nelson Mandela was born, shopping in Gauteng and went on safari in Kruger National Park.",
      "We are eternally grateful to Terry for making our dream a reality.",
    ],
    name: "Tamu",
    location: "Tampa, FL",
    avatar: "/images/guest-tamu.png",
    avatarAlt: "Tamu, in dark sunglasses, smiling in the sun",
    trip: "South Africa — Johannesburg & Kruger",
    image: "/images/sa-game-lodge-group.jpg",
    imageAlt:
      "Five travellers standing together on a lawn beside a life-size elephant sculpture in South Africa",
  },
];
