import { useRef, type ReactNode } from "react";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { Button } from "./Button";
import { useGsap } from "~/lib/motion";
import { LEADCONNECTOR } from "~/data/site";

/**
 * The closing ask, over a parallaxed photograph.
 *
 * THE IMAGE IS OVERSIZED ON PURPOSE. A parallaxed background has to
 * be taller than its frame or the drift exposes the edge — scale-115
 * plus a ±7% travel keeps the frame covered at both ends of the
 * scrub.
 *
 * The default photograph is Life Luxe's own: the Greek coast above
 * Santorini. It was chosen for what it does NOT have — the
 * embarkation shot that was here put five faces, a safety cone and
 * a steel gangway directly behind centred type, and a closing ask
 * needs quiet behind it, not a crowd. This frees that photograph
 * for the gallery, where faces are the point.
 *
 * SEPARATION FROM THE FOOTER. These two must not merge — when the
 * CTA and the ink footer shared a ground they ran together into one
 * 1,200px slab and the ask dissolved into the privacy links. The
 * scrim here stops at 72% rather than ramping to black, so the
 * photograph is still visibly a photograph where it meets the
 * footer's true black, and the footer carries its own top rule.
 *
 * The scrim is also what makes the white type legible: this
 * photograph is bright where the heading sits, and an earlier band
 * using it measured 2.83:1 before its gradient was deepened.
 */
export function CTASection({
  title = "Let's plan your group's journey",
  lede = "Tell us who is travelling and what the trip is for. We will come back with a shape for it — destinations, timing, and what it would take to run.",
  primaryLabel = "Book a consultation",
  primaryHref = LEADCONNECTOR.bookingWidget,
  secondary,
  image = "/images/greece-caldera.jpg",
  imageAlt = "The Greek coast from above — deep blue water, a headland, and boats moored below the cliff",
}: {
  title?: ReactNode;
  lede?: ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  secondary?: { label: string; to?: string; href?: string };
  image?: string;
  imageAlt?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGsap(
    ({ gsap, reduced }) => {
      if (reduced) return;
      gsap.fromTo(
        ".cta-media",
        { yPercent: -7 },
        {
          yPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        },
      );
    },
    root,
    [],
  );

  return (
    <section
      ref={root}
      className="relative isolate overflow-clip py-28 lg:py-40"
    >
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        decoding="async"
        className="cta-media absolute inset-0 -z-10 size-full scale-115 object-cover will-change-transform"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgb(12 11 10 / .62) 0%, rgb(12 11 10 / .58) 50%, rgb(12 11 10 / .66) 100%)",
        }}
      />

      <Container>
        <div className="mx-auto max-w-[46rem] text-center">
          <SectionHeading
            title={title}
            lede={lede}
            align="center"
            tone="dark"
            voice
          />
          {/* items-stretch on the stack, not items-center: centring
              shrinks each button to its own label width, so two
              buttons of different lengths sit ragged under each
              other. They fill the column on a phone and sit side by
              side from sm up. */}
          <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Button href={primaryHref} variant="onDark">
              {primaryLabel}
            </Button>
            {secondary ? (
              secondary.to ? (
                <Button to={secondary.to} variant="ghost">
                  {secondary.label}
                </Button>
              ) : (
                <Button href={secondary.href!} variant="ghost">
                  {secondary.label}
                </Button>
              )
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
