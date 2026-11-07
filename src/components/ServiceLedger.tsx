import { Reveal } from "./Reveal";
import { Container } from "./Container";

/**
 * What is actually handled, itemised.
 *
 * "We take care of everything" is the emptiest sentence in travel
 * marketing. This is the same promise with the work named, which is
 * the version a group leader can check against their own to-do list.
 *
 * The items come from Terry's published description of the
 * Effortless Retreat Formula and the White-Glove Planning entry on
 * the Group Trips page. Nothing is added to lengthen the list.
 *
 * Hairline rows, not cards. Seven cards would read as a pricing
 * table; seven ruled lines read as a ledger, which is what it is.
 *
 * On white rather than ink. As a dark slab this was 1,430px of the
 * page's tallest single block and it dragged the whole middle of
 * the scroll down with it; the ruled structure carries the section
 * on its own without needing a black ground to sit on.
 */
const WORK = [
  {
    name: "Destination research",
    gloss:
      "Finding the place that fits the group, the season and the budget — before anyone commits to it.",
  },
  {
    name: "Itinerary design",
    gloss:
      "Days shaped with room to breathe between the things that are worth getting up for.",
  },
  {
    name: "Supplier contracts",
    gloss:
      "Negotiated rates, private events and welcome receptions, and the terms that sit behind them.",
  },
  {
    name: "Rooming lists",
    gloss:
      "Who shares with whom, held and reworked every time the group changes shape.",
  },
  {
    name: "Group air",
    gloss:
      "Flights handled as one block rather than twenty separate bookings made at twenty different times.",
  },
  {
    name: "Payments",
    gloss:
      "Deposits and scheduled instalments, so guests can commit early and pay over time.",
  },
  {
    name: "On-trip support",
    gloss:
      "Someone reachable while you are in the air, and still reachable once you have landed.",
  },
] as const;

export function ServiceLedger() {
  return (
    <section className="border-y border-rule bg-white py-24 lg:py-32">
      <Container>
        <Reveal>
          <hr aria-hidden="true" className="rule-mark mb-7" />
          <h2 className="max-w-[18ch] font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.07] tracking-[-0.025em] text-ink italic">
            Everything between the idea and the arrival
          </h2>
          <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-warm">
            You keep the part that matters — deciding who comes and what the
            trip is for. This is the rest of it.
          </p>
        </Reveal>

        <ol className="mt-14 lg:mt-20">
          {WORK.map((item, i) => (
            <Reveal as="li" key={item.name} delay={i * 60}>
              <div className="grid grid-cols-[2.5rem_1fr] items-baseline gap-x-5 border-t border-rule py-7 lg:grid-cols-[4rem_minmax(0,20rem)_1fr] lg:gap-x-10 lg:py-8">
                {/* The index is decorative — an ordered list already
                    announces position, so reading "01" aloud would
                    say it twice. */}
                <span
                  aria-hidden="true"
                  className="tabular text-[0.75rem] font-bold tracking-[0.2em] text-brand-deep"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-[clamp(1.25rem,2.4vw,1.75rem)] leading-tight text-ink">
                  {item.name}
                </h3>
                <p className="col-start-2 mt-2.5 max-w-[52ch] text-[0.9375rem] leading-relaxed text-warm lg:col-start-3 lg:mt-0">
                  {item.gloss}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
