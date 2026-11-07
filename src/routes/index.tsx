import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { Globe, Map, Users } from "lucide-react";
import { Footer } from "~/components/Footer";
import { Navbar } from "~/components/Navbar";
import { CinematicHero } from "~/components/CinematicHero";
import { ScatterField, type Satellite } from "~/components/ScatterField";
import { SplitFeature } from "~/components/SplitFeature";
import { MarqueeBand } from "~/components/MarqueeBand";
import { StatementBand } from "~/components/StatementBand";
import { ServiceLedger } from "~/components/ServiceLedger";
import { SeasonCalendar } from "~/components/SeasonCalendar";
import { ValuePillars } from "~/components/ValuePillars";
import { DestinationIndex } from "~/components/DestinationIndex";
import { TestimonialWall } from "~/components/TestimonialWall";
import { JournalPreview } from "~/components/JournalPreview";
import { Button } from "~/components/Button";
import { CTASection } from "~/components/CTASection";
import { ChecklistForm } from "~/components/ChecklistForm";
import { seo } from "~/components/Seo";
import { useGsap, useSmoothScroll } from "~/lib/motion";
import { LEADCONNECTOR, SITE, STATS } from "~/data/site";
import { TRIPS } from "~/data/trips";

export const Route = createFileRoute("/")({
  head: () => seo({ title: SITE.name, description: SITE.description, path: "/" }),
  component: Home,
});

const STAT_ICONS = { users: Users, map: Map, globe: Globe } as const;

/**
 * The scatter field's satellites.
 *
 * Positions are authored to keep the centre column (roughly 30–70%)
 * clear and to balance both gutters. `depth` sets size, parallax
 * rate, saturation and opacity together, so near cards are bigger,
 * faster and more vivid — which is what makes it read as depth
 * rather than as drift.
 */
const SATELLITES: Satellite[] = [
  { src: "/images/marrakech-majorelle-pavilion.jpg", alt: "", caption: "", place: "", x: 4, y: 16, depth: 0.82, rotate: -6 },
  { src: "/images/bali-rice-terrace.jpg", alt: "", caption: "", place: "", x: 17, y: 47, depth: 0.45, rotate: 4, span: "wide", focus: "center 20%" },
  { src: "/images/greece-erechtheion.jpg", alt: "", caption: "", place: "", x: 3, y: 64, depth: 0.6, rotate: 7 },
  { src: "/images/derby-hats.jpg", alt: "", caption: "", place: "", x: 21, y: 10, depth: 0.3, rotate: 9 },
  { src: "/images/sa-table-mountain.jpg", alt: "", caption: "", place: "", x: 79, y: 14, depth: 0.74, rotate: 5 },
  { src: "/images/nye-vv-2026-cozumel.jpg", alt: "", caption: "", place: "", x: 72, y: 45, depth: 0.4, rotate: -5, span: "wide", focus: "center 30%" },
  { src: "/images/terry-abu-dhabi.jpg", alt: "", caption: "", place: "", x: 84, y: 63, depth: 0.64, rotate: -8 },
  { src: "/images/marrakech-mint-tea.jpg", alt: "", caption: "", place: "", x: 76, y: 79, depth: 0.34, rotate: 6 },
  { src: "/images/sa-waterfront.jpg", alt: "", caption: "", place: "", x: 12, y: 79, depth: 0.5, rotate: -4 },
];

function Home() {
  // Weighted smooth scroll, as on the reference. Disabled outright
  // under prefers-reduced-motion.
  useSmoothScroll();

  const statsRef = useRef<HTMLElement>(null);
  useGsap(
    ({ gsap, reduced }) => {
      if (reduced) return;
      gsap.fromTo(
        ".stat-item",
        { opacity: 0, y: 34 },
        {
          opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.12,
          scrollTrigger: { trigger: statsRef.current, start: "top 82%" },
        },
      );
    },
    statsRef,
    [],
  );

  const nye = TRIPS.find((t) => t.title.startsWith("New Year"))!;

  // The full-bleed band parallaxes like the closing CTA. scale-115
  // plus a ±7% travel keeps the frame covered at both ends.
  const bandRef = useRef<HTMLElement>(null);
  useGsap(
    ({ gsap, reduced }) => {
      if (reduced) return;
      gsap.fromTo(
        ".band-media",
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: bandRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        },
      );
    },
    bandRef,
    [],
  );

  return (
    <div className="flex min-h-screen flex-col">
      {/* The house header: the two-tier contact rail + link bar from
          landing-pages/travel-gallery-v2.html, over the hero photograph.
          Same component the other six pages use, so the header no longer
          changes shape when you leave the homepage. */}
      <Navbar overlay />

      <main id="main" className="flex-1">
        <CinematicHero
          lines={["Bring your group's", "vision to life."]}
          subtitle="Wellness retreats, milestone celebrations, corporate escapes and hosted journeys — designed and run end to end, so you arrive as a guest at your own trip."
          image="/images/hero-cape-town.jpg"
          imageAlt="A Life Luxe traveller on a bench above the coast near Cape Town, watching surf break below the Twelve Apostles"
          primary={{ label: "Book a consultation", href: LEADCONNECTOR.bookingWidget }}
          secondary={{ label: "See the 2027 calendar", href: "/group-trips" }}
        />

        {/* The accreditations sit directly under the hero: the first
            thing after the promise should be the evidence for it.
            Ivory against the dark hero also gives the eye a hard
            edge to land on as the photograph ends. */}
        <MarqueeBand />

        <StatementBand />

        <ScatterField
          centre={{
            // A LANDSCAPE source. The game-lodge group shot is 3:4,
            // and forcing it into this 16:10 card cut everyone's
            // heads off — the one thing a group photograph cannot
            // survive.
            src: "/images/derby-our-group.jpg",
            alt: "The Life Luxe group together in Derby day outfits at Churchill Downs",
            caption: "",
            place: "",
          }}
          centreFocus="center 34%"
          satellites={SATELLITES}
          heading="One hundred trips. Thirty-four countries. Not one of them planned by you."
          lede="These were all taken on Life Luxe journeys, by the people who were there. No stock, no staging — just what the trips actually look like."
        />

        {/* ── Figures ──────────────────────────────────────── */}
        <section ref={statsRef} className="bg-cream py-20 lg:py-28">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-11">
            <h2 className="sr-only">Life Luxe Travel in numbers</h2>
            <ul className="grid gap-12 sm:grid-cols-3">
              {STATS.map((stat) => {
                const Icon = STAT_ICONS[stat.icon];
                return (
                  <li key={stat.label} className="stat-item">
                    <div className="flex items-baseline gap-3">
                      <Icon aria-hidden="true" className="size-5 shrink-0 -translate-y-0.5 text-brand" />
                      <span className="tabular font-display text-[clamp(2.75rem,5.5vw,4rem)] leading-none tracking-[-0.03em] text-ink">
                        {stat.value}
                      </span>
                    </div>
                    <p className="mt-3 text-[0.8125rem] font-bold tracking-[0.14em] text-muted uppercase">
                      {stat.label}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        <ServiceLedger />

        <SplitFeature
          heading="The Effortless Retreat Formula™"
          body={[
            "Destination research, itinerary design, supplier contracts, rooming lists, group air, payment plans, and someone reachable while you are in the air. All of it.",
            "You keep the part that matters — deciding who comes and what the trip is for. We take the six months of logistics that usually sit between a good idea and a group actually boarding.",
          ]}
          image="/images/terry-headshot.jpg"
          imageAlt="Terry Powell, founder of Life Luxe Travel, in a studio portrait — dark sleeveless top, pearl necklace, shoulder-length curls"
          media="portrait"
          imageFocus="center 28%"
          footnote="Terry Powell · Founder"
        >
          <div className="mt-8">
            <Button to="/about" variant="quiet" size="sm">
              Meet Terry
            </Button>
          </div>
        </SplitFeature>

        {/* ── Full-bleed band ──────────────────────────────── */}
        <section
          ref={bandRef}
          className="relative isolate flex min-h-[72svh] items-end overflow-hidden"
        >
          <img
            src="/images/nye-2027-brilliant-lady.png"
            alt="Virgin Voyages' Brilliant Lady sailing past the lit Miami skyline under fireworks"
            loading="lazy"
            decoding="async"
            className="band-media absolute inset-0 -z-10 size-full scale-115 object-cover will-change-transform"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10"
            /* Deeper than it looks like it needs to be. The terminal
               photograph is bright exactly where the heading sits,
               and the first version measured 2.83:1 against the 3.0
               large-text floor. */
            style={{
              background:
                "linear-gradient(180deg, rgb(12 11 10 / .14) 0%, rgb(12 11 10 / .06) 24%, rgb(12 11 10 / .80) 62%, rgb(12 11 10 / .95) 100%)",
            }}
          />
          <div className="mx-auto w-full max-w-[1180px] px-5 pb-16 sm:px-8 lg:px-11 lg:pb-24">
            <h2 className="max-w-[20ch] font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.06] tracking-[-0.025em] text-white italic">
              {nye.title}
            </h2>
            {/* The date sits AFTER the heading as a detail line, not
                above it as a kicker. */}
            {/* White, not brand-lift. The pink tint measures 8.7:1
                on flat ink but only 3.09:1 here, because the terminal
                photograph stays bright behind the gradient. White is
                6.5:1 on the same pixels. */}
            <p className="mt-4 text-[0.8125rem] font-bold tracking-[0.16em] text-white/90 uppercase">
              {nye.when} · {nye.where}
            </p>
            <p className="mt-4 max-w-[48ch] text-[1.0625rem] leading-relaxed text-white/85">
              {nye.blurb}
            </p>
            <div className="mt-9">
              <Button href={nye.href!} variant="accent">
                See the sailing
              </Button>
            </div>
          </div>
        </section>

        <SeasonCalendar />

        <ValuePillars
          lede="Group travel is its own discipline. These are the credentials behind it."
          className="bg-white py-24 lg:py-32"
        />

        <DestinationIndex />

        <TestimonialWall />

        <JournalPreview />

        {/* ── Checklist opt-in ─────────────────────────────── */}
        <section className="bg-brand-wash py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1180px] items-start gap-12 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16 lg:px-11">
            <div className="lg:pt-4">
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.06] tracking-[-0.024em] text-ink">
                The Ultimate Group Trip Planning Checklist
              </h2>
              <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-warm">
                Planning a group getaway doesn&apos;t have to be stressful. This
                free checklist walks you through every step — from choosing the
                right destination to getting everyone paid and packed.
              </p>
            </div>
            <ChecklistForm />
          </div>
        </section>

        {/* The shared closing ask. This used to be a hand-written
            copy of CTASection with the same title, lede and buttons,
            which meant any change to the ending had to be made in two
            places and had already drifted (no rule mark here). */}
        <CTASection secondary={{ label: "See the gallery", to: "/gallery" }} />
      </main>

      <Footer />
    </div>
  );
}
