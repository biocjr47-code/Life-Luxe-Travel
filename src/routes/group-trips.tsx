import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Cake,
  CalendarClock,
  Gem,
  Gift,
  HandHeart,
  Palmtree,
  ShieldCheck,
  Snowflake,
  Sparkles,
  Sun,
} from "lucide-react";
import { Layout } from "~/components/Layout";
import { PageHero } from "~/components/PageHero";
import { Container } from "~/components/Container";
import { SectionHeading } from "~/components/SectionHeading";
import { Button } from "~/components/Button";
import { Reveal } from "~/components/Reveal";
import { CTASection } from "~/components/CTASection";
import { EnquiryForm } from "~/components/EnquiryForm";
import { seo } from "~/components/Seo";
import { CUSTOM_GETAWAYS, PAST_HIGHLIGHTS, TRIPS } from "~/data/trips";
import { WHY_US } from "~/data/site";

export const Route = createFileRoute("/group-trips")({
  head: () =>
    seo({
      title: "Group Trips",
      description:
        "Hosted group journeys for 2027, 2028 and 2029 — Greece, a New Year's Eve sailing, the Kentucky Derby, Rio and Ghana — plus private trips planned around your own occasion.",
      image: "/images/greece-caldera.jpg",
      path: "/group-trips",
    }),
  component: GroupTrips,
});

const WHY_ICONS = {
  "badge-check": BadgeCheck,
  gem: Gem,
  "shield-check": ShieldCheck,
  "hand-heart": HandHeart,
  sparkles: Sparkles,
  "calendar-clock": CalendarClock,
} as const;

const GETAWAY_ICONS = {
  cake: Cake,
  sun: Sun,
  palmtree: Palmtree,
  snowflake: Snowflake,
  gift: Gift,
} as const;

function GroupTrips() {
  const years = [...new Set(TRIPS.map((t) => t.year))];

  return (
    <Layout overlay>
      <PageHero
        image="/images/greece-caldera.jpg"
        imageAlt="The Santorini caldera at golden hour, whitewashed buildings along the cliff edge above deep blue water"
        title="Group trips"
        subtitle="Join a hosted escape — or let us plan a private trip for your group."
      />

      {/* ── The calendar ────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading
              title="The travel calendar"
              lede="Hosted journeys open for bookings. Trips marked as a preview are confirmed destinations with dates and pricing still to come."
            />
          </Reveal>

          <div className="mt-14 space-y-16">
            {years.map((year) => (
              <div key={year}>
                <h3 className="tabular border-b border-rule pb-4 font-display text-[clamp(1.75rem,3vw,2.5rem)] text-ink">
                  {year}
                </h3>
                <ul className="mt-8 space-y-8">
                  {TRIPS.filter((t) => t.year === year).map((trip, i) => (
                    <Reveal as="li" key={trip.title} delay={i * 80}>
                      <article
                        className={`grid gap-7 overflow-hidden rounded-[var(--radius-card)] bg-ivory lg:grid-cols-[1fr_1.35fr] lg:gap-0 ${
                          trip.image ? "" : "lg:grid-cols-1"
                        }`}
                      >
                        {trip.image ? (
                          <img
                            src={trip.image}
                            alt={trip.imageAlt ?? ""}
                            loading="lazy"
                            decoding="async"
                            className="aspect-[16/10] size-full object-cover lg:aspect-auto lg:min-h-[290px]"
                          />
                        ) : null}
                        <div className="p-7 lg:p-10">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-[0.75rem] font-bold tracking-[0.16em] text-brand-deep uppercase">
                              {trip.when}
                            </span>
                            {trip.status === "preview" ? (
                              <span className="rounded-full border border-sand bg-cream px-3 py-1 text-[0.6875rem] font-bold tracking-[0.12em] text-muted uppercase">
                                Details coming soon
                              </span>
                            ) : null}
                          </div>
                          <h4 className="mt-3 text-[clamp(1.5rem,2.6vw,2.125rem)]">
                            {trip.title}
                          </h4>
                          <p className="mt-1.5 text-[0.9375rem] text-muted">
                            {trip.where}
                          </p>
                          <p className="measure mt-4 text-warm">{trip.blurb}</p>
                          {trip.href ? (
                            <a
                              href={trip.href}
                              className="group mt-6 inline-flex min-h-11 items-center gap-2 text-[0.8125rem] font-bold tracking-[0.14em] text-brand-deep uppercase no-underline"
                            >
                              Trip details
                              <ArrowRight
                                aria-hidden="true"
                                className="size-4 transition-transform duration-300 ease-luxe group-hover:translate-x-1"
                              />
                            </a>
                          ) : null}
                        </div>
                      </article>
                    </Reveal>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Custom getaways ─────────────────────────────────── */}
      <section className="border-y border-rule bg-ivory py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              title="Or plan something that is only yours"
              lede="Private group trips, built around your occasion and your people."
            />
          </Reveal>
          <ul className="mt-10 flex flex-wrap gap-4">
            {CUSTOM_GETAWAYS.map((g, i) => {
              const Icon = GETAWAY_ICONS[g.icon];
              return (
                <Reveal as="li" key={g.title} delay={i * 70}>
                  <div className="flex items-center gap-3.5 rounded-full border border-sand bg-cream py-3 pr-6 pl-4">
                    <Icon
                      aria-hidden="true"
                      className="size-[18px] shrink-0 text-brand-deep"
                    />
                    <span>
                      <span className="text-[0.9375rem] text-ink">
                        {g.title}
                      </span>
                      <span className="ml-2 text-[0.8125rem] text-muted">
                        {g.when}
                      </span>
                    </span>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </section>

      {/* ── Why us ──────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <Container>
          <Reveal>
            <SectionHeading title="Why travel with us" />
          </Reveal>
          <dl className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {WHY_US.map((item, i) => {
              const Icon = WHY_ICONS[item.icon as keyof typeof WHY_ICONS];
              return (
                <Reveal key={item.title} delay={(i % 2) * 80}>
                  <div className="flex gap-4">
                    <Icon
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-brand"
                      strokeWidth={1.6}
                    />
                    <div>
                      <dt className="font-display text-[1.25rem] text-ink">
                        {item.title}
                      </dt>
                      <dd className="measure mt-2 text-warm">{item.body}</dd>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </dl>
        </Container>
      </section>

      {/* ── Past highlights ─────────────────────────────────── */}
      <section className="border-t border-rule py-16">
        <Container>
          <h2 className="text-[0.75rem] font-bold tracking-[0.2em] text-muted uppercase">
            Past highlights
          </h2>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {PAST_HIGHLIGHTS.map((p) => (
              <li key={p} className="font-display text-[1.375rem] text-ink-soft">
                {p}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button to="/gallery" size="sm">
              See the photographs
            </Button>
          </div>
        </Container>
      </section>

      {/* ── Enquiry ─────────────────────────────────────────── */}
      <section id="enquire" className="bg-brand-wash py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <SectionHeading
                title="Tell us about your group"
                lede="A few details is all we need to come back with a shape for the trip — destinations, timing, and what it would take to run."
              />
              <p className="measure mt-6 text-warm">
                Prefer to talk it through? Book a consultation and we will
                walk through your group&apos;s vision together.
              </p>
            </Reveal>
            <Reveal delay={110}>
              <EnquiryForm />
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection secondary={{ label: "Read guest stories", to: "/testimonials" }} />
    </Layout>
  );
}
