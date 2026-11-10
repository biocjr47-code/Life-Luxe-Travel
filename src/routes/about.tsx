import { createFileRoute } from "@tanstack/react-router";
import { Globe, Map, Users } from "lucide-react";
import { Layout } from "~/components/Layout";
import { PageHero } from "~/components/PageHero";
import { Container } from "~/components/Container";
import { SectionHeading } from "~/components/SectionHeading";
import { Reveal } from "~/components/Reveal";
import { Button } from "~/components/Button";
import { CertificationStrip } from "~/components/CertificationStrip";
import { CTASection } from "~/components/CTASection";
import { seo } from "~/components/Seo";
import { LEADCONNECTOR, STATS } from "~/data/site";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Terry Powell",
      description:
        "Terry Powell founded Life Luxe Travel after 25 years as a corporate executive and the morning she survived the September 11th attack in her New York office. She now designs effortless group journeys for purpose-driven leaders.",
      image: "/images/terry-headshot.jpg",
      path: "/about",
    }),
  component: About,
});

const STAT_ICONS = { users: Users, map: Map, globe: Globe } as const;

/**
 * Terry's own "let's get acquainted" answers, taken from the live
 * About page.
 *
 * An earlier version of this list said her roots were New York. They
 * are HOUSTON — New York is where she was working on September 11th,
 * which is a different fact from a different paragraph. Atlanta and
 * Hawaii were missing entirely. Checked against
 * lifeluxetravel.com/about.
 */
const FACTS = [
  { label: "My roots", value: "Houston, Texas" },
  { label: "Loving life in", value: "Atlanta, Georgia" },
  { label: "Family", value: "Married, with one young adult daughter" },
  {
    label: "Favourite destinations",
    value:
      "Greece — Mykonos & Santorini · Hawaii — Maui · South Africa — Johannesburg & Cape Town",
  },
  { label: "Favourite pastimes", value: "Travelling, spas, golf, reading, dancing" },
  { label: "Favourite book", value: "Think and Grow Rich, Napoleon Hill" },
];

/**
 * The kinds of trip Terry names on the live page. The previous
 * version of this route compressed all eight into "trips of every
 * kind", which is the one phrase a group leader cannot find
 * themselves in.
 */
const TRIP_KINDS = [
  "Wellness retreats",
  "Church getaways",
  "Sorority & fraternity trips",
  "Birthday celebrations",
  "Sports team adventures",
  "Corporate incentive trips",
  "Golf getaways",
  "Dive excursions",
];

function About() {
  return (
    <Layout overlay>
      <PageHero
        image="/images/greece-terry-by-the-water.jpg"
        imageAlt="Terry Powell, founder of Life Luxe Travel, standing by the water in Greece"
        focus="center 32%"
        title="Hi, I'm Terry"
        subtitle="Founder, travel expert, and your partner in creating extraordinary group experiences."
      />

      {/* ── The welcome ─────────────────────────────────────── */}
      <section className="pt-20 pb-4 lg:pt-28">
        <Container>
          <Reveal>
            <p className="mx-auto max-w-[52rem] text-center font-display text-[clamp(1.375rem,2.6vw,1.875rem)] leading-[1.4] text-ink italic">
              So glad you&rsquo;re here! Now, let&rsquo;s get better acquainted
              and begin our journey of creating unforgettable group travel
              experiences that leave lasting memories and meaningful
              connections.
            </p>
            <p className="mt-6 text-center text-[0.8125rem] font-bold tracking-[0.2em] text-brand-deep uppercase">
              I&rsquo;ll go first
            </p>
          </Reveal>
        </Container>
      </section>

      {/* ── The story ───────────────────────────────────────── */}
      <section className="py-14 lg:py-20">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
            <Reveal>
              <SectionHeading title="Where travel meets transformation" />
              <div className="measure mt-7 space-y-5 text-warm">
                <p>
                  I&rsquo;m Terry Powell, the proud founder of Life Luxe
                  Travel, LLC and Luxe Retreat Planners — where I specialise in
                  helping group leaders plan and execute effortless,
                  extraordinary trips of every kind.
                </p>
                <p>
                  After a 25-year career as a corporate executive — where I
                  trained and mentored high-performing teams — I had a
                  life-changing wake-up call. I was working in my NYC office on
                  September 11th and survived the terrorist attack. That moment
                  shifted everything.
                </p>
                <p>
                  I began to question the long hours, the lack of freedom, and
                  the fact that I was building someone else&rsquo;s dream while
                  mine sat on the back burner. Over time, I transitioned into
                  entrepreneurship, started several businesses, and eventually
                  discovered a way to align my passion for travel, purpose and
                  people into one transformational path.
                </p>
                <p>
                  My ah-ha moment? Realising I could help other purpose-driven
                  leaders — like you — bring their vision to life without the
                  stress and overwhelm. I built my online travel business to
                  support those who are creating meaningful experiences for
                  their communities, but don&rsquo;t have the time, systems or
                  support to plan the kind of trip their community truly
                  deserves.
                </p>
                <p>
                  Through my signature{" "}
                  <strong className="font-bold text-ink">
                    Effortless Retreat Formula&trade;
                  </strong>
                  , I help leaders design immersive, seamless and impactful
                  group experiences that their guests will rave about for years
                  to come.
                </p>
                <p>
                  If you&rsquo;re a group leader ready to host a trip that
                  reflects your vision and values — without getting buried in
                  logistics — you&rsquo;re in the right place.
                </p>
                <p className="font-display text-[1.375rem] text-ink italic">
                  Let&rsquo;s co-create effortless group trips and extraordinary
                  experiences!
                </p>
                <p className="text-[0.9375rem]">
                  With gratitude and wanderlust,
                  <br />
                  <span className="font-display text-[1.25rem] text-ink not-italic">
                    Terry
                  </span>
                </p>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div className="lg:sticky lg:top-28">
                <img
                  src="/images/terry-headshot.jpg"
                  alt="Terry Powell, founder of Life Luxe Travel"
                  loading="lazy"
                  decoding="async"
                  width={600}
                  height={600}
                  className="w-full max-w-[320px] object-cover shadow-[var(--shadow-lift)]"
                />
                <dl className="mt-9 space-y-5">
                  {FACTS.map((f) => (
                    <div key={f.label}>
                      <dt className="text-[0.75rem] font-bold tracking-[0.16em] text-brand-deep uppercase">
                        {f.label}
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem] leading-relaxed text-warm">
                        {f.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* ── Who she plans for ───────────────────────────────── */}
      <section className="border-y border-rule bg-ivory py-20 lg:py-24">
        <Container>
          <Reveal>
            <SectionHeading
              title="Where unforgettable journeys begin"
              lede="What kind of experience do you envision for your group — connection, celebration, renewal, or adventure? Whether it's a sun-kissed beach retreat, a faith-based getaway, a birthday celebration, a team-building escape, or a fraternity, sorority, or sports trip, I help group leaders like you bring those travel dreams to life — effortlessly."
            />
          </Reveal>
          <ul className="mt-12 grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-4">
            {TRIP_KINDS.map((kind, i) => (
              <Reveal as="li" key={kind} delay={(i % 4) * 70}>
                <p className="border-t border-rule py-4 font-display text-[1.125rem] leading-snug text-ink">
                  {kind}
                </p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── Figures ─────────────────────────────────────────── */}
      <section className="py-16 lg:py-20">
        <Container>
          <Reveal>
            <h2 className="max-w-[26ch] font-display text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.14] tracking-[-0.022em] text-ink italic">
              Where travel meets transformation, for you and your community
            </h2>
          </Reveal>
          <ul className="mt-12 grid gap-10 sm:grid-cols-3">
            {STATS.map((stat, i) => {
              const Icon = STAT_ICONS[stat.icon];
              return (
                <Reveal as="li" key={stat.label} delay={i * 90}>
                  <div className="flex items-baseline gap-3">
                    <Icon
                      aria-hidden="true"
                      className="size-5 shrink-0 translate-y-[-2px] text-brand-deep"
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

      {/* ── The company ─────────────────────────────────────── */}
      <section className="border-y border-rule bg-ivory py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <Reveal>
              <img
                src="/images/sa-game-lodge-group.jpg"
                alt="Five travellers together on a lawn beside a life-size elephant sculpture in South Africa"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full object-cover"
              />
            </Reveal>
            <Reveal delay={110}>
              <SectionHeading title="Designing extraordinary group experiences" />
              <div className="measure mt-7 space-y-5 text-warm">
                <p>
                  At Life Luxe Travel, we believe travel is more than a getaway
                  — it&rsquo;s a gateway to connection, celebration and
                  transformation. We partner with visionary group leaders who
                  want to bring people together through unforgettable travel
                  experiences.
                </p>
                <p>
                  Our mission is simple: to make group travel effortless and
                  extraordinary. With years of expertise and a passion for
                  creating meaningful connections, we handle every detail — from
                  destination sourcing and itinerary design to payments,
                  logistics and on-site coordination — so you can focus on what
                  matters most: your people and your purpose.
                </p>
                <p>
                  Whether your goal is to unite your community, reward your
                  team, or celebrate life&rsquo;s milestones in style,
                  we&rsquo;ll bring your vision to life through a seamless blend
                  of luxury, organisation and care.
                </p>
                <p>
                  Because at Life Luxe Travel, we don&rsquo;t just plan trips —
                  we create experiences that inspire, connect, and leave a
                  lasting imprint.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CertificationStrip />

      {/* ── The checklist ───────────────────────────────────── */}
      <section className="bg-brand-wash py-20 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16">
            <Reveal>
              <SectionHeading
                title="Free Retreat Planning Checklist"
                lede="Plan extraordinary group trips with ease, using the secrets trusted by travel pros. Start creating unforgettable group experiences — without the stress."
              />
            </Reveal>
            <Reveal delay={110}>
              <div className="lg:text-right">
                <Button href={LEADCONNECTOR.checklistForm}>
                  Get access now
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection
        title="It's your time to lead, connect and create memories"
        lede="It's your time to lead with intention — and your turn to host an experience that brings people together in meaningful ways. Your group's story deserves to be celebrated, and their memories deserve to be extraordinary."
        secondary={{ label: "See hosted trips", to: "/group-trips" }}
      />
    </Layout>
  );
}
