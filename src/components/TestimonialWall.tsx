import { Quote } from "lucide-react";
import { Reveal } from "./Reveal";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { Button } from "./Button";
import { TESTIMONIALS } from "~/data/testimonials";

/**
 * Guest accounts.
 *
 * It needs a heading. Without one this was a large italic sentence
 * floating under a quote glyph, and it read as the site talking
 * about itself rather than as somebody else's words.
 *
 * THE PICTURES ARE THE TRIPS, NOT THE GUESTS. There are no guest
 * portraits, and the live site credits these by journey rather than
 * by name — so no face, no name and no star rating is invented to
 * make the layout look more like a review widget. Each thumbnail is
 * the photograph from that journey and its alt text says so.
 *
 * Square, like everything else here. A circular thumbnail is the
 * universal shorthand for "this is a person's face", which is
 * exactly the thing these images are not.
 *
 * The wording is verbatim. One lead account and a pair beneath it,
 * rather than three equal columns: three identical boxes make real
 * praise look like placeholder text.
 */
export function TestimonialWall() {
  const [lead, ...rest] = TESTIMONIALS;
  if (!lead) return null;

  return (
    <section className="bg-white py-24 lg:py-32">
      <Container>
        <Reveal>
          <SectionHeading
            title="Guest stories"
            lede="Three journeys, in the words of the people who travelled them. Credited by trip, which is how they were given to us."
            align="center"
            voice
          />
        </Reveal>

        <Reveal delay={90}>
          <figure className="mx-auto mt-16 max-w-[52rem] text-center">
            <Quote
              aria-hidden="true"
              className="mx-auto size-9 text-brand"
              strokeWidth={1.4}
            />
            <h3 className="mt-6 font-display text-[clamp(1.625rem,3.2vw,2.5rem)] leading-[1.18] tracking-[-0.022em] text-ink italic">
              {lead.heading}
            </h3>
            <blockquote className="measure mx-auto mt-6 space-y-4 text-[1.0625rem] leading-relaxed text-warm">
              {lead.quote.slice(0, 2).map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </blockquote>
            <figcaption className="mt-8 flex items-center justify-center gap-4">
              <img
                src={lead.image}
                alt={lead.imageAlt}
                loading="lazy"
                decoding="async"
                className="size-16 shrink-0 object-cover"
              />
              <span className="text-left text-[0.8125rem] font-bold tracking-[0.14em] text-brand-deep uppercase">
                {lead.trip}
              </span>
            </figcaption>
          </figure>
        </Reveal>

        <div className="mt-20 grid gap-x-16 gap-y-0 sm:grid-cols-2">
          {rest.map((t, i) => (
            <Reveal key={t.trip} delay={i * 100}>
              <figure className="border-t border-rule py-10">
                <Quote
                  aria-hidden="true"
                  className="size-6 text-brand/70"
                  strokeWidth={1.4}
                />
                <h3 className="mt-4 font-display text-[1.5rem] leading-tight text-ink italic">
                  {t.heading}
                </h3>
                <blockquote className="mt-4 space-y-3.5 text-[0.9375rem] leading-relaxed text-warm">
                  {t.quote.slice(0, 2).map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3.5">
                  <img
                    src={t.image}
                    alt={t.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="size-12 shrink-0 object-cover"
                  />
                  <span className="text-[0.75rem] font-bold tracking-[0.14em] text-muted uppercase">
                    {t.trip}
                  </span>
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
