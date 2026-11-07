import { CERTIFICATIONS } from "~/data/site";

/**
 * A continuous marquee of the real accreditations.
 *
 * THE LOOP MATHS, because getting this wrong is what produced the
 * long empty gap it used to have:
 *
 * The animation translates the track by -50% and restarts. For that
 * to be invisible, the first half of the track must be at least as
 * wide as the viewport — otherwise the track runs out mid-scroll and
 * you watch blank ground go by until it snaps back.
 *
 * Five badges make a row roughly 1,100px wide. Two copies meant each
 * half WAS one row, so on any screen wider than ~1,100px the gap was
 * guaranteed. Four copies makes each half two rows (~2,200px), which
 * covers any realistic viewport.
 *
 * The duration scales with the distance: the track now travels twice
 * as far, so 38s became 72s to keep the same ~30px/s drift. Speeding
 * it up instead would have turned a quiet band into a conveyor belt.
 *
 * Only the first copy is read out; the rest are aria-hidden so a
 * screen reader hears the list once.
 */
const COPIES = 4;

export function MarqueeBand() {
  const row = (copy: number) => (
    <ul
      key={copy}
      aria-hidden={copy > 0 || undefined}
      className="flex shrink-0 items-center gap-14 pr-14 lg:gap-20 lg:pr-20"
    >
      {CERTIFICATIONS.map((c) => (
        <li key={`${copy}-${c.name}`}>
          <img
            src={c.src}
            alt={copy > 0 ? "" : c.alt}
            loading="lazy"
            decoding="async"
            className="h-12 w-auto max-w-none object-contain opacity-90 mix-blend-multiply lg:h-14"
          />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="border-y border-rule bg-ivory py-10 lg:py-12">
      <h2 className="sr-only">Travel professional certifications</h2>
      <div className="group relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        {/* bg-ivory here, not only on the section. The track is
            animated, so its transform makes it a stacking context —
            and mix-blend-multiply on the badges blends against THAT
            group, not the page behind it. Without a ground inside the
            group the white JPEG backgrounds stay white and every
            badge sits on a visible card. */}
        <div className="flex w-max animate-[marquee_72s_linear_infinite] bg-ivory group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {Array.from({ length: COPIES }, (_, i) => row(i))}
        </div>
      </div>
    </section>
  );
}
