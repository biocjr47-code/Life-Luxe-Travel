import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Container } from "./Container";
import { CalendarPattern } from "./CalendarPattern";
import { Button } from "./Button";
import { TRIPS } from "~/data/trips";

/**
 * The published season, 2027 through 2029.
 *
 * Each journey carries its photograph. Greece, the New Year's Eve
 * sailing and the Derby use Life Luxe's own; the trips that have not
 * happened yet use licensed destination photography, recorded in
 * public/images/SOURCES.md. A row with no image lets its text run
 * the full width rather than leaving a hole where a picture failed
 * to arrive.
 *
 * The year sits in its own column and sticks while its trips scroll
 * past, so you always know which season you are reading.
 *
 * THE SECTION USES overflow-clip, NOT overflow-hidden. `hidden`
 * makes this element a scroll container, and a scroll container
 * between a sticky child and the viewport stops the sticky dead —
 * the year froze in place the moment the background illustration
 * was wrapped in. `clip` crops identically with no such effect.
 *
 * Trips marked `preview` are the ones the live site labels "Details
 * Coming Soon". They are shown as previews rather than quietly
 * dropped, because a group leader planning 2028 wants to know the
 * destination is coming even when the dates are not set.
 */

/** The badge already says it; saying it again as the whole blurb
 *  left rows reading "Details coming soon · DETAILS COMING SOON". */
const TRAILING_SOON = /\s*Details coming soon\.?\s*$/i;

export function SeasonCalendar() {
  const years = [...new Set(TRIPS.map((t) => t.year))];

  return (
    <section className="relative isolate overflow-clip border-y border-rule bg-ivory py-24 lg:py-32">
      <CalendarPattern />
      <Container className="relative">
        <Reveal>
          <hr aria-hidden="true" className="rule-mark mb-7" />
          <h2 className="max-w-[20ch] font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.07] tracking-[-0.025em] text-ink italic">
            The travel calendar
          </h2>
          <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-warm">
            Hosted journeys you can join, planned years ahead so a group has
            time to save, book time off and actually turn up.
          </p>
        </Reveal>

        <div className="mt-16 space-y-16 lg:mt-20 lg:space-y-20">
          {years.map((year) => (
            <div
              key={year}
              className="grid gap-6 lg:grid-cols-[9rem_minmax(0,1fr)] lg:gap-14"
            >
              <Reveal>
                <h3 className="tabular font-display text-[clamp(2.5rem,5vw,3.75rem)] leading-none tracking-[-0.03em] text-brand-deep lg:sticky lg:top-28">
                  {year}
                </h3>
              </Reveal>

              <ul>
                {TRIPS.filter((t) => t.year === year).map((trip, i) => {
                  const preview = trip.status === "preview";
                  const blurb = preview
                    ? trip.blurb.replace(TRAILING_SOON, "").trim()
                    : trip.blurb;
                  // Austin is "2027" and Ghana is "2029" — printing
                  // that beside the year numeral says it twice.
                  const when = trip.when === trip.year ? null : trip.when;

                  return (
                    <Reveal as="li" key={trip.title} delay={i * 70}>
                      <article
                        className={`group grid gap-x-10 gap-y-5 border-t border-rule py-8 lg:py-10 ${
                          trip.image
                            ? "lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]"
                            : ""
                        }`}
                      >
                        {trip.image ? (
                          <figure className="overflow-hidden">
                            <img
                              src={trip.image}
                              alt={trip.imageAlt ?? ""}
                              loading="lazy"
                              decoding="async"
                              className="aspect-[4/3] w-full object-cover transition-transform duration-[1100ms] ease-luxe group-hover:scale-[1.05]"
                              style={
                                trip.imageFocus
                                  ? { objectPosition: trip.imageFocus }
                                  : undefined
                              }
                            />
                          </figure>
                        ) : null}

                        <div
                          className={
                            trip.image
                              ? ""
                              : "grid gap-x-10 gap-y-4 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
                          }
                        >
                          <div>
                            <h4 className="font-display text-[clamp(1.375rem,2.6vw,2rem)] leading-tight text-ink">
                              {trip.title}
                            </h4>
                            {/* The date sits under the title as a
                                detail line. Above it, an eyebrow. */}
                            {when || preview ? (
                              <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-[0.75rem] font-bold tracking-[0.16em] text-brand-deep uppercase">
                                {when}
                                {preview ? (
                                  <span className="border border-sand bg-cream px-2.5 py-1 tracking-[0.12em] text-muted">
                                    Details coming soon
                                  </span>
                                ) : null}
                              </p>
                            ) : null}
                            <p className="mt-2.5 text-[0.9375rem] text-muted">
                              {trip.where}
                            </p>
                          </div>

                          <div className={trip.image ? "mt-4" : ""}>
                            {blurb ? (
                              <p className="max-w-[56ch] text-[1rem] leading-relaxed text-warm">
                                {blurb}
                              </p>
                            ) : null}
                            {trip.href ? (
                              <a
                                href={trip.href}
                                className="mt-5 inline-flex min-h-11 items-center gap-2 text-[0.8125rem] font-bold tracking-[0.14em] text-brand-deep uppercase no-underline transition-[letter-spacing] duration-300 ease-luxe hover:tracking-[0.18em]"
                              >
                                Trip details
                                <ArrowRight
                                  aria-hidden="true"
                                  className="size-4 transition-transform duration-300 ease-luxe group-hover:translate-x-1"
                                />
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </article>
                    </Reveal>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <Reveal>
          <div className="mt-14 border-t border-rule pt-10">
            <Button to="/group-trips" variant="quiet" size="sm">
              See every hosted trip
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
