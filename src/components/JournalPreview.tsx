import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { Container } from "./Container";
import { Button } from "./Button";
import { AMAZON_DISCLOSURE, GUIDES, POSTS } from "~/data/content";

/**
 * Terry's own writing and packing guides.
 *
 * Both sets link out to lifeluxetravel.com, because the bodies still
 * live there as HTML — better an honest outbound link than a stub
 * route pretending to hold an article it does not have.
 *
 * The Amazon disclosure is not decoration. Life Luxe is an Amazon
 * Associate and the guides carry affiliate links, so the disclosure
 * appears wherever the guides do. It is an FTC requirement, and it
 * is on the live site for the same reason.
 */
export function JournalPreview() {
  return (
    <section className="border-y border-rule bg-ivory py-24 lg:py-32">
      <Container>
        <Reveal>
          <hr aria-hidden="true" className="rule-mark mb-7" />
          <h2 className="max-w-[20ch] font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.07] tracking-[-0.025em] text-ink italic">
            What Terry knows
          </h2>
          <p className="measure mt-6 text-[1.0625rem] leading-relaxed text-warm">
            Twenty-five years in corporate life, a stretch at Delta Air Lines,
            and a hundred trips since. Some of it is worth passing on.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-16 lg:gap-14">
          {POSTS.map((post, i) => (
            <Reveal as="article" key={post.slug} delay={i * 100}>
              <a href={post.href} className="group block no-underline">
                <div className="overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-6 max-w-[26ch] font-display text-[clamp(1.25rem,2.2vw,1.625rem)] leading-tight text-ink">
                  {post.title}
                </h3>
                <p className="mt-3 text-[0.75rem] font-bold tracking-[0.16em] text-brand-deep uppercase">
                  {post.category}
                </p>
                <p className="mt-4 max-w-[52ch] text-[0.9375rem] leading-relaxed text-warm">
                  {post.excerpt}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-[0.8125rem] font-bold tracking-[0.14em] text-ink uppercase">
                  Read it
                  <ArrowUpRight
                    aria-hidden="true"
                    className="size-4 transition-transform duration-300 ease-luxe group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        {/* ── Packing guides ──────────────────────────────── */}
        <Reveal>
          <h3 className="mt-20 border-t border-rule pt-10 text-[0.75rem] font-bold tracking-[0.2em] text-muted uppercase">
            Travel style guides
          </h3>
        </Reveal>

        <ul className="mt-2">
          {GUIDES.map((guide, i) => (
            <Reveal as="li" key={guide.title} delay={i * 70}>
              <a
                href={guide.href}
                className="group grid grid-cols-[5rem_minmax(0,1fr)] items-center gap-5 border-b border-rule py-6 no-underline lg:grid-cols-[6rem_minmax(0,17rem)_minmax(0,1fr)] lg:gap-10"
              >
                <div className="overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.06]"
                  />
                </div>
                <h4 className="font-display text-[1.25rem] leading-tight text-ink">
                  {guide.title}
                </h4>
                <div className="col-start-2 lg:col-start-3">
                  <p className="max-w-[48ch] text-[0.9375rem] leading-relaxed text-warm">
                    {guide.blurb}
                  </p>
                  <p className="mt-2.5 text-[0.75rem] font-bold tracking-[0.14em] text-brand-deep uppercase">
                    {guide.sections.join(" · ")}
                  </p>
                </div>
              </a>
            </Reveal>
          ))}
        </ul>

        <Reveal>
          <p className="mt-6 text-[0.8125rem] text-muted">
            {AMAZON_DISCLOSURE}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button to="/blog" variant="quiet" size="sm">
              The journal
            </Button>
            <Button to="/travel-style-guides" variant="quiet" size="sm">
              All style guides
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
