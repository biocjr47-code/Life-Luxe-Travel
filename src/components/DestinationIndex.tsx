import { Cake, Gift, Palmtree, Snowflake, Sun } from "lucide-react";
import { Reveal } from "./Reveal";
import { Container } from "./Container";
import { Button } from "./Button";
import { CUSTOM_GETAWAYS, DESTINATIONS, PAST_HIGHLIGHTS } from "~/data/trips";

/**
 * For groups whose trip is not on the calendar.
 *
 * Three real lists and no invented ones: the destinations the live
 * homepage offers as inspiration, the occasions Life Luxe plans
 * private trips around, and the journeys already run.
 *
 * The destinations are set as a type specimen rather than as cards.
 * There is no photograph for most of them in the archive, and a grid
 * of stock images on a page whose whole argument is "these are our
 * own photographs" would undo the gallery above it.
 */
const OCCASION_ICONS = {
  cake: Cake,
  sun: Sun,
  palmtree: Palmtree,
  snowflake: Snowflake,
  gift: Gift,
} as const;

export function DestinationIndex() {
  return (
    <section className="border-y border-rule bg-ivory py-24 lg:py-32">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <Reveal>
            <hr aria-hidden="true" className="rule-mark mb-7" />
            <h2 className="max-w-[18ch] font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.07] tracking-[-0.025em] text-ink italic">
              Or somewhere else entirely
            </h2>
            <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-warm">
              A private trip, planned around your group and your occasion.
              These are the destinations groups ask for most.
            </p>

            <ul className="mt-10 flex flex-wrap items-baseline gap-x-5 gap-y-3">
              {DESTINATIONS.map((place, i) => (
                <li
                  key={place}
                  className="flex items-baseline gap-5 font-display text-[clamp(1.25rem,2.4vw,1.875rem)] leading-tight text-ink-soft"
                >
                  {place}
                  {i < DESTINATIONS.length - 1 ? (
                    <span aria-hidden="true" className="text-[0.75em] text-brand/55">
                      &bull;
                    </span>
                  ) : null}
                </li>
              ))}
            </ul>

            <div className="mt-11">
              <Button href="/group-trips#enquire" size="sm">
                Plan a private trip
              </Button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <h3 className="text-[0.75rem] font-bold tracking-[0.2em] text-muted uppercase">
              Occasions we plan around
            </h3>
            <ul className="mt-6">
              {CUSTOM_GETAWAYS.map((g) => {
                const Icon = OCCASION_ICONS[g.icon];
                return (
                  <li
                    key={g.title}
                    className="flex items-center gap-4 border-t border-rule py-4"
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-[18px] shrink-0 text-brand-deep"
                      strokeWidth={1.5}
                    />
                    <span className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="text-[0.9375rem] text-ink">
                        {g.title}
                      </span>
                      <span className="text-[0.8125rem] text-muted">
                        {g.when}
                      </span>
                    </span>
                  </li>
                );
              })}
            </ul>

            <h3 className="mt-12 text-[0.75rem] font-bold tracking-[0.2em] text-muted uppercase">
              Already run
            </h3>
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
              {PAST_HIGHLIGHTS.map((p) => (
                <li
                  key={p}
                  className="font-display text-[1.25rem] text-ink-soft"
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
