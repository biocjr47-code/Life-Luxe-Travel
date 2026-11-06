import type { ReactNode } from "react";
import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";
import { Button } from "./Button";
import { LEADCONNECTOR } from "~/data/site";

/**
 * The closing ask.
 *
 * It sits on ink-soft, NOT on ink. The footer below it is ink, and
 * when both were the same black the two ran together into one
 * 1,200px slab with no boundary — the ask simply dissolved into the
 * privacy links. Warm charcoal over true black reads as two plates,
 * and puts the heaviest tone at the base of the page where it
 * belongs.
 */
export function CTASection({
  title = "Let's plan your group's journey",
  lede = "Tell us who is travelling and what the trip is for. We will come back with a shape for it — destinations, timing, and what it would take to run.",
  primaryLabel = "Book a consultation",
  primaryHref = LEADCONNECTOR.bookingWidget,
  secondary,
}: {
  title?: ReactNode;
  lede?: ReactNode;
  primaryLabel?: string;
  primaryHref?: string;
  secondary?: { label: string; to?: string; href?: string };
}) {
  return (
    <section className="bg-ink-soft py-24 lg:py-32">
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
