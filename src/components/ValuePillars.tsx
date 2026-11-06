import {
  BadgeCheck,
  CalendarClock,
  Gem,
  HandHeart,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { WHY_US } from "~/data/site";

/**
 * The six reasons, verbatim from the live Group Trips page.
 *
 * Two columns with a hairline over each item, not a six-card grid.
 * These are credentials — IATA accreditation, a group certification —
 * and credentials look stronger set as a list than boxed up like
 * feature tiles.
 *
 * Shared by the homepage and the Group Trips page so the claims
 * cannot drift apart between them.
 */
const ICONS = {
  "badge-check": BadgeCheck,
  gem: Gem,
  "shield-check": ShieldCheck,
  "hand-heart": HandHeart,
  sparkles: Sparkles,
  "calendar-clock": CalendarClock,
} as const;

export function ValuePillars({
  title = "Why travel with us",
  lede,
  className = "py-20 lg:py-28",
}: {
  title?: string;
  lede?: string;
  className?: string;
}) {
  return (
    <section className={className}>
      <Container>
        <Reveal>
          <SectionHeading title={title} lede={lede} />
        </Reveal>
        <dl className="mt-14 grid gap-x-14 gap-y-0 sm:grid-cols-2">
          {WHY_US.map((item, i) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS];
            return (
              <Reveal key={item.title} delay={(i % 2) * 80}>
                <div className="flex gap-5 border-t border-rule py-8">
                  <Icon
                    aria-hidden="true"
                    className="mt-1 size-5 shrink-0 text-brand"
                    strokeWidth={1.5}
                  />
                  <div>
                    <dt className="font-display text-[1.3125rem] leading-tight text-ink">
                      {item.title}
                    </dt>
                    <dd className="mt-2.5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-warm">
                      {item.body}
                    </dd>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
