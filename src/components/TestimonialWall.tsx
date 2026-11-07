import { Quote } from "lucide-react";
import { Reveal } from "./Reveal";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { Button } from "./Button";
import { TESTIMONIALS } from "~/data/testimonials";

/**
 * Guest accounts, three across.
 *
 * This was a full-width lead quote with a pair beneath it, which ran
 * to about 1,700px — you had to scroll to get through three short
 * testimonials. One row, one paragraph each, and it fits in a
 * screen.
 *
 * Ruled columns rather than boxed cards. Three identical boxes make
 * real praise look like placeholder text; three ruled columns read
 * as a page of a magazine. Only the first paragraph of each is shown
 * — the full accounts are a click away and nothing is reworded to
 * fit.
 *
 * THE PICTURES ARE THE TRIPS, NOT THE GUESTS. There are no guest
 * portraits, and the live site credits these by journey rather than
 * by name, so no face, name or star rating is invented to make this
 * look more like a review widget. Square, because a circle is the
 * universal shorthand for a person's face.
 */
export function TestimonialWall() {
  return (
    <section className="bg-white py-20 lg:py-24">
      <Container>
        <Reveal>
          <SectionHeading
            title="Guest stories"
            lede="Three journeys, in the words of the people who travelled them."
            align="center"
            voice
          />
        </Reveal>

        <div className="mt-12 grid gap-x-12 gap-y-0 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-x-14">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.trip} delay={i * 90}>
              <figure className="flex h-full flex-col border-t border-rule py-8">
                <Quote
                  aria-hidden="true"
                  className="size-5 shrink-0 text-brand"
                  strokeWidth={1.5}
                />
                <h3 className="mt-4 font-display text-[1.3125rem] leading-snug text-ink italic">
                  {t.heading}
                </h3>
                <blockquote className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-warm">
                  <p>{t.quote[0]}</p>
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3">
                  <img
                    src={t.image}
                    alt={t.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="size-11 shrink-0 object-cover"
                  />
                  <span className="text-[0.6875rem] font-bold tracking-[0.14em] text-muted uppercase">
                    {t.trip}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-10 text-center">
            <Button to="/testimonials" variant="quiet" size="sm">
              Read every account
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
