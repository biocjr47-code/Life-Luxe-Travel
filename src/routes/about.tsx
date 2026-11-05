import { createFileRoute } from "@tanstack/react-router";
import { Globe, Map, Users } from "lucide-react";
import { Layout } from "~/components/Layout";
import { PageHero } from "~/components/PageHero";
import { Container } from "~/components/Container";
import { SectionHeading } from "~/components/SectionHeading";
import { Reveal } from "~/components/Reveal";
import { CertificationStrip } from "~/components/CertificationStrip";
import { CTASection } from "~/components/CTASection";
import { seo } from "~/components/Seo";
import { STATS } from "~/data/site";

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About Terry Powell",
      description:
        "Terry Powell founded Life Luxe Travel after 25 years as a corporate executive and a life-changing morning in New York on September 11th. She now designs effortless group journeys for purpose-driven leaders.",
      image: "/images/greece-terry-by-the-water.jpg",
      path: "/about",
    }),
  component: About,
});

const STAT_ICONS = { users: Users, map: Map, globe: Globe } as const;

/** Terry's own "get acquainted" answers, from the live About page. */
const FACTS = [
  { label: "My roots", value: "New York" },
  { label: "Family", value: "Married, with one young adult daughter" },
  {
    label: "Favourite destinations",
    value: "Greece — Mykonos & Santorini · South Africa — Johannesburg & Cape Town",
  },
  { label: "Favourite pastimes", value: "Traveling, spas, golf, reading, dancing" },
  { label: "Favourite book", value: "Think and Grow Rich, Napoleon Hill" },
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

      {/* ── The story ───────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1.25fr_0.75fr] lg:gap-20">
            <Reveal>
              <SectionHeading title="Where travel meets transformation" />
              <div className="measure mt-7 space-y-5 text-warm">
                <p>
                  I&apos;m Terry Powell, the proud founder of Life Luxe Travel,
                  LLC and Luxe Retreat Planners — where I specialise in helping
                  group leaders plan and execute effortless, extraordinary
                  trips of every kind.
                </p>
                <p>
                  After a 25-year career as a corporate executive, where I
                  trained and mentored high-performing teams, I had a
                  life-changing wake-up call. I was working in my New York
                  office on September 11th, and I survived.
                </p>
                <p>
                  I began to question the long hours, the lack of freedom, and
                  the fact that I was building someone else&apos;s dream while
                  mine sat on the back burner. Over time I moved into
                  entrepreneurship.
                </p>
                <p>
                  My ah-ha moment? Realising I could help other purpose-driven
                  leaders — like you — bring their vision to life without the
                  stress and overwhelm.
                </p>
                <p>
                  Through my signature{" "}
                  <strong className="font-bold text-ink">
                    Effortless Retreat Formula™
                  </strong>
                  , I help leaders design immersive, seamless and impactful
                  group experiences that their guests will rave about for
                  years to come.
                </p>
                <p>
                  If you&apos;re a group leader ready to host a trip that
                  reflects your vision and values — without getting buried in
                  logistics — you&apos;re in the right place.
                </p>
                <p className="font-display text-[1.375rem] text-ink italic">
                  Let&apos;s co-create effortless group trips and extraordinary
                  experiences.
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
              <div className="lg:sticky lg:top-10">
                <img
                  src="/images/terry-portrait.jpg"
                  alt="Terry Powell, founder of Life Luxe Travel"
                  loading="lazy"
                  decoding="async"
                  width={300}
                  height={400}
                  className="aspect-[3/4] w-full max-w-[280px] rounded-[var(--radius-card)] object-cover shadow-[var(--shadow-lift)]"
                />
                <dl className="mt-9 space-y-5">
                  {FACTS.map((f) => (
                    <div key={f.label}>
                      <dt className="text-[0.75rem] font-bold tracking-[0.16em] text-brand-deep uppercase">
                        {f.label}
                      </dt>
                      <dd className="mt-1.5 text-[0.9375rem] text-warm">
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

      {/* ── Figures ─────────────────────────────────────────── */}
      <section className="border-y border-rule bg-ivory py-16 lg:py-20">
        <Container>
          <ul className="grid gap-10 sm:grid-cols-3">
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

      {/* ── The mission ─────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <Reveal>
              <img
                src="/images/sa-game-lodge-group.jpg"
                alt="Five travellers together on a lawn beside a life-size elephant sculpture in South Africa"
                loading="lazy"
                decoding="async"
                className="aspect-[4/5] w-full rounded-[var(--radius-card)] object-cover"
              />
            </Reveal>
            <Reveal delay={110}>
              <SectionHeading title="Designing extraordinary group experiences" />
              <div className="measure mt-7 space-y-5 text-warm">
                <p>
                  At Life Luxe Travel, we believe travel is more than a
                  getaway — it&apos;s a gateway to connection, celebration and
                  transformation. We partner with visionary group leaders who
                  want to bring people together.
                </p>
                <p>
                  Our mission is simple: to make group travel effortless and
                  extraordinary. We handle every detail, from destination
                  sourcing to the last transfer home.
                </p>
                <p>
                  Whether your goal is to unite your community, reward your
                  team, or celebrate life&apos;s milestones in style,
                  we&apos;ll bring your vision to life through a seamless
                  blend of luxury, organisation and care.
                </p>
                <p>
                  Because at Life Luxe Travel, we don&apos;t just plan trips —
                  we create experiences that inspire, connect, and leave a
                  lasting imprint.
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <CertificationStrip />

      <CTASection
        title="It's your time to lead"
        lede="Your group's story deserves to be celebrated, and their memories deserve to be extraordinary. Are you ready to plan your next life-changing experience?"
        secondary={{ label: "See hosted trips", to: "/group-trips" }}
      />
    </Layout>
  );
}
