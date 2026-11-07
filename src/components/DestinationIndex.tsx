import { ArrowUpRight, Cake, Gift, Palmtree, Snowflake, Sun } from "lucide-react";
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
 * The destinations were a wrapped type specimen with middots. It
 * looked composed and did nothing — the names carry their own
 * commas ("Bali, Indonesia"), so the separators had to be added just
 * to keep them legible, and a bullet stranded at the end of a
 * wrapped line is a typographic tell. They are now a ruled index
 * where each name is a link into the enquiry form, which is the
 * action the whole section exists to prompt.
 *
 * Still no photographs: there are none of Life Luxe's own for most
 * of these, and a grid of stock here would undo the gallery above.
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
              These are the destinations groups ask for most — pick one and
              tell us who is coming.
            </p>

            <ul className="mt-10 grid sm:grid-cols-2 sm:gap-x-12">
              {DESTINATIONS.map((place) => (
                <li key={place}>
                  <a
                    href={ENQUIRE}
                    className="group flex min-h-11 items-baseline justify-between gap-4 border-t border-rule py-3.5 no-underline"
                  >
                    <span className="font-display text-[clamp(1.125rem,2vw,1.5rem)] leading-tight text-ink-soft transition-colors duration-300 group-hover:text-brand-deep">
                      {place}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="size-4 shrink-0 self-center text-brand-deep opacity-0 transition-all duration-300 ease-luxe group-hover:translate-x-0.5 group-hover:opacity-100"
                    />
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-11">
              <Button href={ENQUIRE} size="sm">
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
            <ul className="mt-6">
              {PAST_HIGHLIGHTS.map((p) => (
                <li
                  key={p}
                  className="border-t border-rule py-3 font-display text-[1.125rem] text-ink-soft"
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
