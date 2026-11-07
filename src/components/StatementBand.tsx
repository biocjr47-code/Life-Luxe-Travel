import { Reveal } from "./Reveal";
import { Container } from "./Container";

/**
 * The positioning statement, directly after the accreditations.
 *
 * A luxury travel house says what it believes before it sells
 * anything. The copy is Terry's own, carried over verbatim from the
 * About page — nothing here is written to fill the space.
 *
 * Two columns at unequal weight: the belief set very large on the
 * left, the working detail small on the right. Equal columns would
 * make them read as two paragraphs of the same rank.
 */
export function StatementBand() {
  return (
    <section className="bg-white py-24 lg:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.35fr_0.85fr] lg:gap-24">
          <Reveal>
            <hr aria-hidden="true" className="rule-mark mb-9" />
            <h2 className="max-w-[20ch] font-display text-[clamp(1.875rem,4.2vw,3.25rem)] leading-[1.14] tracking-[-0.026em] text-ink italic">
              Travel is more than a getaway. It is a gateway to connection,
              celebration and transformation.
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <div className="measure space-y-5 text-[1.0625rem] leading-relaxed text-warm lg:pt-3">
              <p>
                We partner with visionary group leaders who want to bring
                people together — and we handle every detail, from
                destination sourcing to the last transfer home.
              </p>
              <p>
                Whether the goal is to unite a community, reward a team, or
                celebrate a milestone in style, the work is the same: a
                seamless blend of luxury, organisation and care.
              </p>
              <p className="font-display text-[1.25rem] leading-snug text-ink italic">
                We don&apos;t just plan trips. We create experiences that
                inspire, connect, and leave a lasting imprint.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
