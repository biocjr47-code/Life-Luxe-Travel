import { useRef } from "react";
import { ArrowUpRight, Cake, Gift, Palmtree, Snowflake, Sun } from "lucide-react";
import { Reveal } from "./Reveal";
import { Container } from "./Container";
import { Button } from "./Button";
import { useGsap } from "~/lib/motion";
import { CUSTOM_GETAWAYS, DESTINATIONS, PAST_HIGHLIGHTS } from "~/data/trips";

/**
 * For groups whose trip is not on the calendar.
 *
 * Three real lists and no invented ones: the destinations the live
 * homepage offers as inspiration, the occasions Life Luxe plans
 * private trips around, and the journeys already run.
 *
 * On a parallaxed photograph now, like the closing CTA and the New
 * Year's Eve band. scale-115 plus a ±7% travel keeps the frame
 * covered at both ends of the scrub.
 *
 * THE PHOTOGRAPH IS LIFE LUXE'S OWN TRAVELLERS. It was a stock
 * airport silhouette, which was men with roller cases — not the
 * people this agency actually takes away. This is the group at the
 * cruise terminal on embarkation day, which matches the audience
 * and needs no licence.
 *
 * THE SCRIM IS NOT DECORATION. The sunset in this frame is close to
 * pure white, so a thin veil would have left small type sitting on
 * blown highlights. It holds around .74 throughout, which measures
 * roughly 9:1 for white.
 *
 * Links are white rather than brand-lift: that pink measures about
 * 4.2:1 over this backdrop, under the 4.5 floor for text. The pink
 * stays on the rule and the occasion icons, which are not text.
 *
 * The destinations are a ruled index where each name links into the
 * enquiry — the action the whole section exists to prompt.
 */
const OCCASION_ICONS = {
  cake: Cake,
  sun: Sun,
  palmtree: Palmtree,
  snowflake: Snowflake,
  gift: Gift,
} as const;

const ENQUIRE = "/group-trips#enquire";

export function DestinationIndex() {
  const root = useRef<HTMLElement>(null);

  useGsap(
    ({ gsap, reduced }) => {
      if (reduced) return;
      gsap.fromTo(
        ".di-media",
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        },
      );
    },
    root,
    [],
  );

  return (
    <section
      ref={root}
      className="relative isolate overflow-hidden py-24 lg:py-32"
    >
      <img
        src="/images/nye-vv-group-embarkation.jpg"
        alt="The Life Luxe group at the cruise terminal in Miami on embarkation day"
        loading="lazy"
        decoding="async"
        className="di-media absolute inset-0 -z-10 size-full scale-115 object-cover will-change-transform"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            // Two layers. The vertical one is the floor; the
            // horizontal one deepens toward the RIGHT, where the
            // ship's white hull and the group are brightest and
            // where both right-hand lists sit. One flat veil left
            // that column fighting the photograph.
            "linear-gradient(90deg, rgb(12 11 10 / .10) 0%, rgb(12 11 10 / .26) 46%, rgb(12 11 10 / .42) 100%)," +
            "linear-gradient(180deg, rgb(12 11 10 / .74) 0%, rgb(12 11 10 / .72) 46%, rgb(12 11 10 / .80) 100%)",
        }}
      />

      <Container className="relative">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <Reveal>
            <hr aria-hidden="true" className="rule-mark rule-mark-lift mb-7" />
            <h2 className="max-w-[18ch] font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.07] tracking-[-0.025em] text-white italic">
              Or somewhere else entirely
            </h2>
            <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-white/80">
              A private trip, planned around your group and your occasion.
              These are the destinations groups ask for most — pick one and
              tell us who is coming.
            </p>

            <ul className="mt-10 grid sm:grid-cols-2 sm:gap-x-12">
              {DESTINATIONS.map((place) => (
                <li key={place}>
                  <a
                    href={ENQUIRE}
                    className="group flex min-h-11 items-baseline justify-between gap-4 border-t border-white/20 py-3.5 no-underline"
                  >
                    <span className="font-display text-[clamp(1.125rem,2vw,1.5rem)] leading-tight text-white transition-colors duration-300 group-hover:text-brand-lift">
                      {place}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 self-center text-brand-lift opacity-0 transition-all duration-300 ease-luxe group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-11">
              <Button href={ENQUIRE} variant="accent" size="sm">
                Plan a private trip
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="text-[0.75rem] font-bold tracking-[0.2em] text-white/70 uppercase">
              Occasions we plan around
            </h3>
            <ul className="mt-6">
              {CUSTOM_GETAWAYS.map((g) => {
                const Icon = OCCASION_ICONS[g.icon];
                return (
                  <li
                    key={g.title}
                    className="flex items-center gap-4 border-t border-white/20 py-4"
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-[18px] shrink-0 text-brand-lift"
                      strokeWidth={1.5}
                    />
                    <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="text-[0.9375rem] text-white">
                        {g.title}
                      </span>
                      <span className="text-[0.8125rem] text-white/70">
                        {g.when}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <h3 className="mt-12 text-[0.75rem] font-bold tracking-[0.2em] text-white/70 uppercase">
              Already run
            </h3>
            <ul className="mt-6">
              {PAST_HIGHLIGHTS.map((p) => (
                <li
                  key={p}
                  className="border-t border-white/20 py-3 font-display text-[1.125rem] text-white/90"
                >
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
