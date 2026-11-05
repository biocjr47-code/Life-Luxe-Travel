import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowUpRight, Globe, Map, Quote, Users } from "lucide-react";
import { Footer } from "~/components/Footer";
import { PillNav } from "~/components/PillNav";
import { CinematicHero } from "~/components/CinematicHero";
import { ScatterField, type Satellite } from "~/components/ScatterField";
import { SplitFeature } from "~/components/SplitFeature";
import { MarqueeBand } from "~/components/MarqueeBand";
import { GhlFormEmbed } from "~/integrations/GhlFormEmbed";
import { seo } from "~/components/Seo";
import { useGsap, useSmoothScroll } from "~/lib/motion";
import { LEADCONNECTOR, SITE, STATS } from "~/data/site";
import { TRIPS } from "~/data/trips";
import { TESTIMONIALS } from "~/data/testimonials";

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
  { src: "/images/marrakech-majorelle-pavilion.jpg", alt: "", caption: "", place: "", x: 3, y: 10, depth: 0.85, rotate: -6 },
  { src: "/images/bali-rice-terrace.jpg", alt: "", caption: "", place: "", x: 16, y: 48, depth: 0.45, rotate: 4, span: "wide" },
  { src: "/images/greece-erechtheion.jpg", alt: "", caption: "", place: "", x: 1, y: 72, depth: 0.62, rotate: 7 },
  { src: "/images/derby-hats.jpg", alt: "", caption: "", place: "", x: 20, y: 2, depth: 0.3, rotate: 9 },
  { src: "/images/sa-table-mountain.jpg", alt: "", caption: "", place: "", x: 80, y: 6, depth: 0.78, rotate: 5 },
  { src: "/images/nye-vv-2026-cozumel.jpg", alt: "", caption: "", place: "", x: 73, y: 44, depth: 0.4, rotate: -5, span: "wide" },
  { src: "/images/terry-abu-dhabi.jpg", alt: "", caption: "", place: "", x: 86, y: 68, depth: 0.68, rotate: -8 },
  { src: "/images/marrakech-mint-tea.jpg", alt: "", caption: "", place: "", x: 68, y: 84, depth: 0.34, rotate: 6 },
  { src: "/images/sa-waterfront.jpg", alt: "", caption: "", place: "", x: 10, y: 88, depth: 0.5, rotate: -4 },
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

  const quoteRef = useRef<HTMLElement>(null);
  useGsap(
    ({ gsap, reduced }) => {
      if (reduced) return;
      gsap.fromTo(
        ".q-part",
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: "expo.out", stagger: 0.1,
          scrollTrigger: { trigger: quoteRef.current, start: "top 78%" },
        },
      );
    },
    quoteRef,
    [],
  );

  const greece = TRIPS.find((t) => t.title.startsWith("Greece"))!;
  const nye = TRIPS.find((t) => t.title.startsWith("New Year"))!;

  return (
    <div className="flex min-h-screen flex-col">
      <PillNav />

      <main id="main" className="flex-1">
        <CinematicHero
          lines={["Bring your group's", "vision to life."]}
          subtitle="Wellness retreats, milestone celebrations, corporate escapes and hosted journeys — designed and run end to end, so you arrive as a guest at your own trip."
          image="/images/hero-cape-town.jpg"
          imageAlt="A Life Luxe traveller on a bench above the coast near Cape Town, watching surf break below the Twelve Apostles"
          primary={{ label: "Book a consultation", href: LEADCONNECTOR.bookingWidget }}
          secondary={{ label: "See the 2027 calendar", href: "/group-trips" }}
        />

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
          lede="Every photograph on this page was taken on a Life Luxe journey, by the people who were there. No stock, no staging — just what the trips actually look like."
        />

        <MarqueeBand />

        {/* ── Figures ──────────────────────────────────────── */}
        <section ref={statsRef} className="bg-cream py-20 lg:py-28">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-11">
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

        <SplitFeature
          heading="The Effortless Retreat Formula™"
          body={[
            "Destination research, itinerary design, supplier contracts, rooming lists, group air, payment plans, and someone reachable while you are in the air. All of it.",
            "You keep the part that matters — deciding who comes and what the trip is for. We take the six months of logistics that usually sit between a good idea and a group actually boarding.",
          ]}
          image="/images/greece-terry-by-the-water.jpg"
          imageAlt="Terry Powell, founder of Life Luxe Travel, standing by the water in Greece"
          footnote="Terry Powell · Founder"
        >
          <Link
            to="/about"
            className="group mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-full border border-sand px-7 text-[0.9375rem] text-ink no-underline transition-colors duration-300 ease-luxe hover:border-ink hover:bg-ink hover:text-white"
          >
            Meet Terry
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform duration-300 ease-luxe group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </SplitFeature>

        <SplitFeature
          flip
          heading={greece.title}
          body={[greece.blurb]}
          image={greece.image!}
          imageAlt={greece.imageAlt!}
          footnote={`${greece.when} · ${greece.where}`}
        >
          <a
            href={greece.href}
            className="group mt-8 inline-flex min-h-[52px] items-center gap-2 rounded-full bg-brand px-7 text-[0.9375rem] font-bold text-white no-underline transition-[background-color,transform] duration-300 ease-luxe hover:scale-[1.03] hover:bg-brand-deep"
          >
            Trip details
            <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </SplitFeature>

        {/* ── Full-bleed band ──────────────────────────────── */}
        <section className="relative isolate flex min-h-[72svh] items-end overflow-hidden">
          <img
            src="/images/nye-vv-group-embarkation.jpg"
            alt="The Life Luxe group at the Virgin Voyages terminal on embarkation day in Miami"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 -z-10 size-full object-cover"
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
                "linear-gradient(180deg, rgb(12 11 10 / .42) 0%, rgb(12 11 10 / .18) 26%, rgb(12 11 10 / .84) 66%, rgb(12 11 10 / .96) 100%)",
            }}
          />
          <div className="mx-auto w-full max-w-[1180px] px-5 pb-16 sm:px-8 lg:px-11 lg:pb-24">
            <h2 className="max-w-[20ch] font-display text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.06] tracking-[-0.025em] text-white italic">
              {nye.title}
            </h2>
            <p className="mt-5 max-w-[48ch] text-[1.0625rem] leading-relaxed text-white/85">
              {nye.blurb}
            </p>
            <a
              href={nye.href}
              className="mt-9 inline-flex min-h-[54px] items-center rounded-full bg-white px-9 text-[0.9375rem] font-bold text-ink no-underline transition-transform duration-300 ease-luxe hover:scale-[1.03]"
            >
              {nye.when}
            </a>
          </div>
        </section>

        {/* ── Testimonial ──────────────────────────────────── */}
        <section ref={quoteRef} className="bg-ivory py-24 lg:py-32">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-11">
            <figure className="mx-auto max-w-[56rem] text-center">
              <Quote aria-hidden="true" className="q-part mx-auto size-9 text-brand" strokeWidth={1.4} />
              <blockquote className="q-part mt-7">
                <p className="font-display text-[clamp(1.5rem,3.2vw,2.5rem)] leading-[1.34] tracking-[-0.018em] text-ink italic">
                  {TESTIMONIALS[0]!.quote[0]}
                </p>
              </blockquote>
              <figcaption className="q-part mt-7 text-[0.8125rem] font-bold tracking-[0.14em] text-muted uppercase">
                {TESTIMONIALS[0]!.trip}
              </figcaption>
              <Link
                to="/testimonials"
                className="q-part mt-9 inline-flex min-h-[52px] items-center gap-2 rounded-full border border-sand px-7 text-[0.9375rem] text-ink no-underline transition-colors duration-300 ease-luxe hover:border-ink hover:bg-ink hover:text-white"
              >
                Read more journeys
                <ArrowUpRight aria-hidden="true" className="size-4" />
              </Link>
            </figure>
          </div>
        </section>

        {/* ── Checklist opt-in ─────────────────────────────── */}
        <section className="bg-brand-wash py-24 lg:py-32">
          <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-11">
            <div>
              <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.06] tracking-[-0.024em] text-ink">
                The Ultimate Group Trip Planning Checklist
              </h2>
              <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-warm">
                Planning a group getaway doesn&apos;t have to be stressful. This
                free checklist walks you through every step — from choosing the
                right destination to getting everyone paid and packed.
              </p>
            </div>
            <GhlFormEmbed
              title="Get the free Group Trip Planning Checklist"
              minHeight={520}
            />
          </div>
        </section>

        {/* ── Close ────────────────────────────────────────── */}
        <section className="bg-ink py-24 text-center lg:py-32">
          <div className="mx-auto max-w-[46rem] px-5 sm:px-8">
            <h2 className="font-display text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.06] tracking-[-0.025em] text-white italic">
              Let&apos;s plan your group&apos;s journey
            </h2>
            <p className="mx-auto mt-6 max-w-[48ch] text-[1.0625rem] leading-relaxed text-white/75">
              Tell us who is travelling and what the trip is for. We will come
              back with a shape for it — destinations, timing, and what it
              would take to run.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <a
                href={LEADCONNECTOR.bookingWidget}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-white px-9 text-[0.9375rem] font-bold text-ink no-underline transition-transform duration-300 ease-luxe hover:scale-[1.03]"
              >
                Book a consultation
              </a>
              <Link
                to="/gallery"
                className="inline-flex min-h-[54px] items-center justify-center rounded-full border border-white/35 px-8 text-[0.9375rem] text-white no-underline transition-colors duration-300 ease-luxe hover:border-white hover:bg-white hover:text-ink"
              >
                See the gallery
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
