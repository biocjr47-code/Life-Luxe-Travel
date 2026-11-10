import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight, Check } from "lucide-react";
import { Layout } from "~/components/Layout";
import { PageHero } from "~/components/PageHero";
import { Container } from "~/components/Container";
import { PillarsPattern } from "~/components/PillarsPattern";
import { SectionHeading } from "~/components/SectionHeading";
import { Reveal } from "~/components/Reveal";
import { CTASection } from "~/components/CTASection";
import { seo } from "~/components/Seo";
import { AMAZON_DISCLOSURE, GUIDES } from "~/data/content";

export const Route = createFileRoute("/travel-style-guides")({
  head: () =>
    seo({
      title: "Travel Style Guides",
      description:
        "Packing lists built around real Life Luxe trips — safari essentials, group beach getaways, and the long-haul comfort list.",
      image: "/images/marrakech-mint-tea.jpg",
      path: "/travel-style-guides",
    }),
  component: StyleGuides,
});

function StyleGuides() {
  return (
    <Layout overlay>
      <PageHero
        image="/images/marrakech-majorelle-pavilion.jpg"
        imageAlt="The cobalt blue pavilion at the Jardin Majorelle in Marrakech"
        focus="center 45%"
        title="Travel style guides"
        subtitle="What to actually pack, for the trips we actually run."
      />

      <section className="relative isolate overflow-clip py-20 lg:py-28">
        <span className="pointer-events-none absolute inset-0 -z-10 opacity-45">
          <PillarsPattern />
        </span>
        <Container>
          <Reveal>
            <SectionHeading
              title="Packing, solved"
              lede="Every list here was built for a real journey — not a generic checklist. Start from the trip closest to yours."
            />
          </Reveal>

          <div className="mt-14 space-y-12 lg:space-y-16">
            {GUIDES.map((guide, i) => (
              <Reveal key={guide.title} delay={i * 90}>
                <article className="grid gap-8 overflow-hidden rounded-[var(--radius-card)] bg-ivory lg:grid-cols-[0.85fr_1.15fr] lg:gap-0">
                  <img
                    src={guide.image}
                    alt={guide.imageAlt}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] size-full object-cover lg:aspect-auto lg:min-h-[280px]"
                  />
                  <div className="p-7 lg:p-10">
                    <h3 className="text-[clamp(1.5rem,2.6vw,2rem)]">
                      {guide.title}
                    </h3>
                    <p className="measure mt-4 text-warm">{guide.blurb}</p>
                    <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5">
                      {guide.sections.map((s) => (
                        <li
                          key={s}
                          className="flex items-center gap-2 text-[0.9375rem] text-ink-soft"
                        >
                          <Check
                            aria-hidden="true"
                            className="size-4 shrink-0 text-brand"
                          />
                          {s}
                        </li>
                      ))}
                    </ul>
                    <a
                      href={guide.href}
                      className="group mt-7 inline-flex min-h-11 items-center gap-1.5 text-[0.8125rem] font-bold tracking-[0.14em] text-brand-deep uppercase no-underline"
                    >
                      Open the guide
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-300 ease-luxe group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* FTC requires this disclosure wherever affiliate links appear. */}
          <p className="measure mt-14 border-t border-rule pt-8 text-[0.875rem] text-muted">
            {AMAZON_DISCLOSURE}
          </p>
        </Container>
      </section>

      <CTASection secondary={{ label: "Read the blog", to: "/blog" }} />
    </Layout>
  );
}
