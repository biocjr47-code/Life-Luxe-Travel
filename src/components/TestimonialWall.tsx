import { Quote } from "lucide-react";
import { Reveal } from "./Reveal";
import { Container } from "./Container";
import { Button } from "./Button";
import { TESTIMONIALS } from "~/data/testimonials";

/**
 * All three guest accounts, not one.
 *
 * The wording is verbatim and the attribution is by trip, because
 * that is how the live site credits them — no names have been
 * attached that Terry did not publish, and no fourth testimonial
 * has been written to balance the layout.
 *
 * One lead quote and a pair beneath it, rather than three equal
 * columns: three identical boxes make real praise look like
 * placeholder text.
 */
export function TestimonialWall() {
  const [lead, ...rest] = TESTIMONIALS;
  if (!lead) return null;

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <Reveal>
          <figure className="mx-auto max-w-[52rem] text-center">
            <Quote
              aria-hidden="true"
              className="mx-auto size-9 text-brand"
              strokeWidth={1.4}
            />
            <h2 className="mt-7 font-display text-[clamp(1.75rem,3.6vw,2.75rem)] leading-[1.18] tracking-[-0.022em] text-ink italic">
              {lead.heading}
            </h2>
            <blockquote className="measure mx-auto mt-7 space-y-4 text-[1.0625rem] leading-relaxed text-warm">
              {lead.quote.slice(0, 2).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </blockquote>
            <figcaption className="mt-7 text-[0.8125rem] font-bold tracking-[0.14em] text-brand-deep uppercase">
              {lead.trip}
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-20 grid gap-x-16 gap-y-0 sm:grid-cols-2">
          {rest.map((t, i) => (
            <Reveal key={t.trip} delay={i * 100}>
              <figure className="border-t border-rule py-10">
                <h3 className="font-display text-[1.5rem] leading-tight text-ink italic">
                  {t.heading}
                </h3>
                <blockquote className="mt-4 space-y-3.5 text-[0.9375rem] leading-relaxed text-warm">
                  {t.quote.slice(0, 2).map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </blockquote>
                <figcaption className="mt-5 text-[0.75rem] font-bold tracking-[0.14em] text-muted uppercase">
                  {t.trip}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 text-center">
            <Button to="/testimonials" variant="quiet" size="sm">
              Read every account
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
