import { createFileRoute } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Layout } from "~/components/Layout";
import { PageHero } from "~/components/PageHero";
import { Container } from "~/components/Container";
import { LedgerPattern } from "~/components/LedgerPattern";
import { SectionHeading } from "~/components/SectionHeading";
import { Reveal } from "~/components/Reveal";
import { CTASection } from "~/components/CTASection";
import { seo } from "~/components/Seo";
import { POSTS } from "~/data/content";

export const Route = createFileRoute("/blog")({
  head: () =>
    seo({
      title: "Travel Blog",
      description:
        "Insider notes from Terry Powell — airline ticket myths from 25 years inside the industry, Global Entry updates, and what actually makes group travel work.",
      image: "/images/blog-airline-myths.jpg",
      path: "/blog",
    }),
  component: Blog,
});

function Blog() {
  return (
    <Layout overlay>
      <PageHero
        image="/images/blog-global-entry.jpg"
        imageAlt="An airport terminal concourse seen through glass"
        focus="center 50%"
        title="Travel blog"
        subtitle="Notes from the other side of the booking desk."
      />

      <section className="relative isolate overflow-clip py-20 lg:py-28">
        <span className="pointer-events-none absolute inset-0 -z-10 opacity-45">
          <LedgerPattern />
        </span>
        <Container>
          <Reveal>
            <SectionHeading
              title="Latest notes"
              lede="Practical travel writing from someone who spent 25 years in the industry before she started planning trips."
            />
          </Reveal>

          <ul className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-12">
            {POSTS.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={i * 100}>
                <article className="group h-full">
                  <a href={post.href} className="block no-underline">
                    <div className="overflow-hidden rounded-[var(--radius-card)]">
                      <img
                        src={post.image}
                        alt={post.imageAlt}
                        loading="lazy"
                        decoding="async"
                        className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]"
                      />
                    </div>
                    <p className="mt-6 text-[0.75rem] font-bold tracking-[0.16em] text-brand-deep uppercase">
                      {post.category}
                    </p>
                    <h3 className="mt-3 text-[clamp(1.375rem,2.2vw,1.75rem)] leading-snug">
                      {post.title}
                    </h3>
                    <p className="measure mt-4 text-warm">{post.excerpt}</p>
                    <span className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-[0.8125rem] font-bold tracking-[0.14em] text-brand-deep uppercase">
                      Read the post
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-300 ease-luxe group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </a>
                </article>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={120}>
            <p className="measure mt-16 border-t border-rule pt-8 text-[0.9375rem] text-muted">
              More posts live on the main site while we move them across.{" "}
              <a
                href="https://lifeluxetravel.com/travel-blog"
                className="font-bold text-brand-deep"
              >
                Browse the full blog
              </a>
              .
            </p>
          </Reveal>
        </Container>
      </section>

      <CTASection secondary={{ label: "Travel style guides", to: "/travel-style-guides" }} />
    </Layout>
  );
}
