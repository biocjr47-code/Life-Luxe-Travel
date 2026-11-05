import { createFileRoute } from "@tanstack/react-router";
import { Layout } from "~/components/Layout";
import { PageHero } from "~/components/PageHero";
import { Container } from "~/components/Container";
import { SectionHeading } from "~/components/SectionHeading";
import { PhotoGrid } from "~/components/PhotoGrid";
import { Reveal } from "~/components/Reveal";
import { CTASection } from "~/components/CTASection";
import { seo } from "~/components/Seo";
import { JOURNEYS } from "~/data/journeys";

export const Route = createFileRoute("/gallery")({
  head: () =>
    seo({
      title: "Travel Gallery",
      description:
        "Photographs from real Life Luxe journeys — Cape Town, Greece, Marrakech, Bali, the Kentucky Derby, Abu Dhabi and New Year's Eve at sea.",
      path: "/gallery",
    }),
  component: Gallery,
});

function Gallery() {
  const count = JOURNEYS.reduce((n, j) => n + j.photos.length, 0);

  return (
    <Layout overlay>
      <PageHero
        size="full"
        image="/images/hero-cape-town.jpg"
        imageAlt="A Life Luxe traveller on a bench above the coast near Cape Town, watching surf break below the Twelve Apostles"
        title="Travel gallery"
        subtitle="Don't just take our word for it."
      />

      <section className="py-16 lg:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              title="Journeys we have hosted"
              lede={`${count} photographs from ${JOURNEYS.length} journeys — all taken on real Life Luxe trips, by the people who were there.`}
            />
          </Reveal>
        </Container>
      </section>

      {JOURNEYS.map((journey, i) => (
        <section
          key={journey.slug}
          id={journey.slug}
          className={`py-14 lg:py-20 ${
            i % 2 === 1 ? "border-y border-rule bg-ivory" : ""
          }`}
        >
          <Container wide>
            <Reveal>
              <div className="mb-10 flex flex-col gap-4 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <hr aria-hidden="true" className="rule-mark mb-6" />
                  <h2 className="text-title">{journey.title}</h2>
                  <p className="mt-2 text-[0.8125rem] font-bold tracking-[0.14em] text-brand-deep uppercase">
                    {journey.when}
                  </p>
                </div>
                <p className="measure text-warm lg:max-w-[46ch] lg:text-right">
                  {journey.blurb}
                </p>
              </div>
            </Reveal>
            <PhotoGrid photos={journey.photos} />
          </Container>
        </section>
      ))}

      {/* ── Send us yours ───────────────────────────────────── */}
      <section className="py-20 lg:py-24">
        <Container>
          <div className="mx-auto max-w-[44rem] text-center">
            <SectionHeading
              align="center"
              title="Travelled with us?"
              lede="We would love to see your journey. Send us your photographs and we will add them here, with your blessing."
            />
            <p className="mt-8">
              <a
                href="mailto:info@lifeluxetravel.com?subject=My%20Life%20Luxe%20journey%20photos"
                className="font-display text-[clamp(1.25rem,2.4vw,1.75rem)] text-brand-deep italic underline-offset-[6px]"
              >
                info@lifeluxetravel.com
              </a>
            </p>
          </div>
        </Container>
      </section>

      <CTASection
        title="Your group could be here next"
        secondary={{ label: "See hosted trips", to: "/group-trips" }}
      />
    </Layout>
  );
}
