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
 * THESE ARE THE GUESTS. The live site's "Happy Travelers" section
 * publishes a first name, a home city and a portrait for each one,
 * so that is what the card carries. I had previously shown the trip
 * photograph here and said no attributions existed — they do, on
 * lifeluxetravel.com/testimonials, and these are reproduced as
 * published. Still no surnames and no star ratings, because the
 * live page has neither.
 *
 * ROUND, and this is the one place on the site that is. The house
 * geometry is square and a circle is the universal shorthand for
 * "this is a person's face" — which is precisely what these are.
 * The source files are pre-cropped circles with white or black
 * corners, so a square frame would show those corners anyway.
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
                <figcaption className="mt-6 flex items-center gap-3.5">
                  <img
                    src={t.avatar}
                    alt={t.avatarAlt}
                    loading="lazy"
                    decoding="async"
                    className="size-14 shrink-0 rounded-full object-cover"
                  />
                  <span>
                    <span className="block font-display text-[1.0625rem] leading-tight text-ink">
                      {t.name}
                    </span>
                    <span className="mt-0.5 block text-[0.8125rem] text-muted">
                      {t.location}
                    </span>
                    <span className="mt-1 block text-[0.6875rem] font-bold tracking-[0.12em] text-brand-deep uppercase">
                      {t.trip}
                    </span>
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
