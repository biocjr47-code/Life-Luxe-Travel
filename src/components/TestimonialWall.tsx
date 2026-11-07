import { Link } from "@tanstack/react-router";
import { ArrowRight, Quote } from "lucide-react";
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
 * as a page of a magazine.
 *
 * EQUAL EXCERPTS, NOT EQUAL BOXES. These three accounts are very
 * different lengths — Florence writes four sentences about Santorini
 * where Barbara opens with six words. Showing whole paragraphs made
 * the columns ragged; forcing a min-height on them fixed the ragged
 * captions by leaving a block of dead white space above each short
 * one, which was worse.
 *
 * So every card shows the same number of characters, cut from the
 * full account at a word boundary, and says so with a link to the
 * rest. Nothing is reworded and nothing is padded: the cut is
 * mechanical and the whole thing is one click away.
 *
 * The trip label still reserves two lines, because Greece and South
 * Africa wrap where the Emirates does not and the portraits would
 * otherwise sit at three different heights.
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
/**
 * The same character budget for every card, cut at a word boundary
 * so no excerpt ends mid-word. Punctuation left dangling by the cut
 * is trimmed before the ellipsis.
 */
const EXCERPT = 188;

function excerpt(paragraphs: string[]) {
  const full = paragraphs.join(" ");
  if (full.length <= EXCERPT) return { text: full, cut: false };
  const head = full.slice(0, EXCERPT);
  const space = head.lastIndexOf(" ");
  // \s, NOT s. Written through a shell heredoc this lost its
  // backslash once already and quietly stripped a trailing letter
  // "s" instead of whitespace — "Our next stop was" came out as
  // "Our next stop wa…".
  const body = (space > 0 ? head.slice(0, space) : head).replace(
    /[\s,;:.!?—–-]+$/u,
    "",
  );
  return { text: `${body}…`, cut: true };
}

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
                  <p>{excerpt(t.quote).text}</p>
                  {excerpt(t.quote).cut ? (
                    <Link
                      to="/testimonials"
                      className="group/more mt-3 inline-flex items-center gap-1.5 text-[0.8125rem] font-bold tracking-[0.08em] text-brand-deep no-underline"
                    >
                      Read {t.name}&apos;s story
                      <ArrowRight
                        aria-hidden="true"
                        className="size-3.5 transition-transform duration-300 ease-luxe group-hover/more:translate-x-0.5"
                      />
                    </Link>
                  ) : null}
                </blockquote>
                <figcaption className="mt-6 flex items-start gap-3.5">
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
                    <span className="mt-1.5 block text-[0.6875rem] leading-[1.45] font-bold tracking-[0.12em] text-brand-deep uppercase lg:min-h-[2rem]">
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
