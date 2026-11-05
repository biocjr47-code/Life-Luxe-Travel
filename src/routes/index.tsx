import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Globe, Map, Quote, Users } from "lucide-react";
import { Layout } from "~/components/Layout";
import { PageHero } from "~/components/PageHero";
import { Container } from "~/components/Container";
import { SectionHeading } from "~/components/SectionHeading";
import { Button } from "~/components/Button";
import { Reveal } from "~/components/Reveal";
import { CertificationStrip } from "~/components/CertificationStrip";
import { CTASection } from "~/components/CTASection";
import { GhlFormEmbed } from "~/integrations/GhlFormEmbed";
import { seo } from "~/components/Seo";
import { LEADCONNECTOR, SITE, STATS } from "~/data/site";
import { DESTINATIONS, TRIPS } from "~/data/trips";
import { TESTIMONIALS } from "~/data/testimonials";

export const Route = createFileRoute("/")({
  head: () =>
    seo({
      title: SITE.name,
      description: SITE.description,
      path: "/",
    }),
  component: Home,
});

const STAT_ICONS = { users: Users, map: Map, globe: Globe } as const;

function Home() {
  const open = TRIPS.filter((t) => t.status === "open" && t.image).slice(0, 2);

  return (
    <Layout overlay>
      <PageHero
        size="full"
        image="/images/hero-cape-town.jpg"
        imageAlt="A Life Luxe traveller on a bench above the coast near Cape Town, watching surf break below the Twelve Apostles"
        title={
          <>
            Bring your group&apos;s
            <br />
            vision to life
          </>
        }
        subtitle="Effortless group trips. Extraordinary experiences."
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href={LEADCONNECTOR.bookingWidget}>
            Book a consultation
          </Button>
          <Button to="/group-trips" variant="ghost">
            See the 2027 calendar
          </Button>
        </div>
      </PageHero>

      {/* ── The promise ─────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
            <Reveal>
              <SectionHeading
                as="h2"
                title="Planned with heart and precision"
                lede={
                  <>
                    Whether you are planning a wellness retreat, a birthday
                    celebration, a corporate getaway or a sisterhood escape,
                    we make it effortless to bring your vision to life.
                  </>
                }
              />
              <p className="measure mt-6 text-warm">
                Through our signature{" "}
                <strong className="font-bold text-ink">
                  Effortless Retreat Formula™
                </strong>{" "}
                and proven group travel systems, we handle every detail — from
                destination research and itinerary design to bookings,
                payments and on-trip support.
              </p>
              <p className="measure mt-5 text-warm">
                Because when travel is planned with heart and precision, it
                doesn&apos;t just change scenery. It changes lives.
              </p>
              <div className="mt-9">
                <Button to="/about" size="sm">
                  Meet Terry
                </Button>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <figure className="relative">
                <img
                  src="/images/greece-terry-by-the-water.jpg"
                  alt="Terry Powell, founder of Life Luxe Travel, standing by the water in Greece"
                  loading="lazy"
                  decoding="async"
                  width={1200}
                  height={1600}
                  className="aspect-[4/5] w-full rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-lift)]"
                />
              </figure>
            </Reveal>
          </div>
        </Container>
      </section>

      <CertificationStrip />

      {/* ── Figures ─────────────────────────────────────────── */}
      <section className="bg-cream py-16 lg:py-20">
        <Container>
          <ul className="grid gap-10 sm:grid-cols-3">
            {STATS.map((stat, i) => {
              const Icon = STAT_ICONS[stat.icon];
              return (
                <Reveal as="li" key={stat.label} delay={i * 90}>
                  <div className="flex items-baseline gap-3">
                    <Icon
                      aria-hidden="true"
                      className="size-5 shrink-0 translate-y-[-2px] text-brand"
                    />
                    <span className="tabular font-display text-[clamp(2.5rem,5vw,3.5rem)] leading-none text-ink">
                      {stat.value}
                    </span>
                  </div>
                  <p className="mt-3 text-[0.8125rem] font-bold tracking-[0.14em] text-muted uppercase">
                    {stat.label}
                  </p>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ── Next journeys ───────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              title="Where we are going next"
              lede="Join a hosted escape — or let us plan a private trip for your group."
            />
          </Reveal>

          <div className="mt-12 grid gap-8 lg:grid-cols-2 lg:gap-10">
            {open.map((trip, i) => (
              <Reveal as="article" key={trip.title} delay={i * 110}>
                <a
                  href={trip.href}
                  className="group block h-full overflow-hidden rounded-[var(--radius-card)] bg-ivory no-underline shadow-[var(--shadow-lift)] transition-shadow duration-500 ease-luxe hover:shadow-[var(--shadow-raise)]"
                >
                  <div className="overflow-hidden">
                    <img
                      src={trip.image!}
                      alt={trip.imageAlt ?? ""}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[16/10] w-full object-cover transition-transform duration-[900ms] ease-luxe group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="p-7 lg:p-9">
                    <p className="text-[0.75rem] font-bold tracking-[0.16em] text-brand-deep uppercase">
                      {trip.when}
                    </p>
                    <h3 className="mt-3 text-[clamp(1.5rem,2.4vw,2rem)]">
                      {trip.title}
                    </h3>
                    <p className="mt-1.5 text-[0.9375rem] text-muted">
                      {trip.where}
                    </p>
                    <p className="measure mt-4 text-warm">{trip.blurb}</p>
                    <span className="mt-6 inline-flex min-h-11 items-center gap-2 text-[0.8125rem] font-bold tracking-[0.14em] text-brand-deep uppercase">
                      Trip details
                      <ArrowRight
                        aria-hidden="true"
                        className="size-4 transition-transform duration-300 ease-luxe group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-12">
              <Button to="/group-trips" size="sm">
                All hosted trips
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Destinations ────────────────────────────────────── */}
      <section className="border-y border-rule bg-ivory py-16 lg:py-20">
        <Container>
          <Reveal>
            <SectionHeading
              title="Destinations that inspire connection"
              lede="Whether your group is seeking relaxation, celebration or adventure, these are the backdrops we return to."
            />
          </Reveal>
          <Reveal delay={100}>
            <ul className="mt-9 flex flex-wrap gap-x-3 gap-y-3">
              {DESTINATIONS.map((d) => (
                <li
                  key={d}
                  className="rounded-full border border-sand bg-cream px-5 py-2.5 text-[0.875rem] text-ink-soft"
                >
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </section>

      {/* ── One testimonial, in full ────────────────────────── */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <figure className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-16">
              <img
                src={TESTIMONIALS[0]!.image}
                alt={TESTIMONIALS[0]!.imageAlt}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full rounded-[var(--radius-card)] object-cover"
              />
              <div>
                <Quote
                  aria-hidden="true"
                  className="size-8 text-brand"
                  strokeWidth={1.5}
                />
                <blockquote className="mt-5">
                  <p className="font-display text-[clamp(1.375rem,2.6vw,1.875rem)] leading-[1.42] text-ink italic">
                    {TESTIMONIALS[0]!.quote[0]}
                  </p>
                  <p className="measure mt-5 text-warm">
                    {TESTIMONIALS[0]!.quote[2]}
                  </p>
                </blockquote>
                <figcaption className="mt-6 text-[0.8125rem] font-bold tracking-[0.14em] text-muted uppercase">
                  {TESTIMONIALS[0]!.trip}
                </figcaption>
                <Link
                  to="/testimonials"
                  className="mt-7 inline-flex min-h-11 items-center gap-2 text-[0.8125rem] font-bold tracking-[0.14em] text-brand-deep uppercase no-underline"
                >
                  Read more journeys
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </figure>
          </Reveal>
        </Container>
      </section>

      {/* ── Checklist opt-in ────────────────────────────────── */}
      <section className="bg-brand-wash py-20 lg:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-16">
            <Reveal>
              <SectionHeading
                title="The Ultimate Group Trip Planning Checklist"
                lede="Planning a group getaway doesn't have to be stressful. This free checklist walks you through every step — from choosing the right destination to getting everyone paid and packed."
              />
              <p className="measure mt-6 text-warm">
                Everything you need to plan a stress-free, unforgettable group
                getaway — from vision to takeoff.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <GhlFormEmbed
                title="Get the free Group Trip Planning Checklist"
                minHeight={520}
              />
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection
        secondary={{ label: "See the gallery", to: "/gallery" }}
      />
    </Layout>
  );
}
