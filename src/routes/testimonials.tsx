import { createFileRoute } from "@tanstack/react-router";
import { Quote } from "lucide-react";
import { Layout } from "~/components/Layout";
import { PageHero } from "~/components/PageHero";
import { Container } from "~/components/Container";
import { StatementPattern } from "~/components/StatementPattern";
import { SectionHeading } from "~/components/SectionHeading";
import { Reveal } from "~/components/Reveal";
import { CTASection } from "~/components/CTASection";
import { seo } from "~/components/Seo";
import { TESTIMONIALS } from "~/data/testimonials";

export const Route = createFileRoute("/testimonials")({
  head: () =>
    seo({
      title: "Testimonials",
      description:
        "Guests on Life Luxe journeys to Greece, Dubai and South Africa, in their own words.",
      image: "/images/sa-game-lodge-group.jpg",
      path: "/testimonials",
    }),
  component: Testimonials,
});

function Testimonials() {
  return (
    <Layout overlay>
      <PageHero
        image="/images/sa-table-mountain-view.jpg"
        imageAlt="The view out over Cape Town and the bay from the slopes of Table Mountain"
        title="Happy travellers"
        subtitle="In their own words, after the trip was over."
      />

      <section className="relative isolate overflow-clip py-20 lg:py-28">
        <span className="pointer-events-none absolute inset-0 -z-10 opacity-45">
          <StatementPattern />
        </span>
        <Container>
          <Reveal>
            <SectionHeading
              title="What guests say"
              lede="Three journeys, written up by the people who took them. Nothing here has been edited for marketing."
            />
          </Reveal>

          <div className="mt-16 space-y-20 lg:space-y-28">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.heading} delay={60}>
                <figure
                  className={`grid gap-9 lg:grid-cols-2 lg:items-center lg:gap-16 ${
                    i % 2 === 1 ? "lg:[&>img]:order-2" : ""
                  }`}
                >
                  <img
                    src={t.image}
                    alt={t.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-lift)]"
                  />
                  <div>
                    <Quote
                      aria-hidden="true"
                      className="size-8 text-brand"
                      strokeWidth={1.5}
                    />
                    <h3 className="mt-5 font-display text-[clamp(1.5rem,2.8vw,2.125rem)] text-ink italic">
                      {t.heading}
                    </h3>
                    <blockquote className="measure mt-5 space-y-4 text-warm">
                      {t.quote.map((p) => (
                        <p key={p.slice(0, 32)}>{p}</p>
                      ))}
                    </blockquote>
                    {/* The live site's "Happy Travelers" section
                        publishes a first name, a home city and a
                        portrait for each of these. Round, because
                        they are faces — the one exception to the
                        site's square geometry. */}
                    <figcaption className="mt-7 flex items-center gap-4">
                      <img
                        src={t.avatar}
                        alt={t.avatarAlt}
                        loading="lazy"
                        decoding="async"
                        className="size-16 shrink-0 rounded-full object-cover"
                      />
                      <span>
                        <span className="block font-display text-[1.25rem] leading-tight text-ink">
                          {t.name}
                        </span>
                        <span className="mt-0.5 block text-[0.9375rem] text-muted">
                          {t.location}
                        </span>
                        <span className="mt-1.5 block text-[0.75rem] font-bold tracking-[0.14em] text-brand-deep uppercase">
                          {t.trip}
                        </span>
                      </span>
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Write the next one"
        lede="Tell us who is travelling and what the trip is for. We will take it from there."
        secondary={{ label: "See the gallery", to: "/gallery" }}
      />
    </Layout>
  );
}
