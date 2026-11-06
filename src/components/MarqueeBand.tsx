import { CERTIFICATIONS } from "~/data/site";

/**
 * A continuous marquee of the real accreditations.
 *
 * Duplicated once and translated by -50%, which is what makes the
 * loop seamless; the copy is aria-hidden so a screen reader hears
 * the list once. Pauses on hover so a badge can actually be read.
 */
export function MarqueeBand() {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-14 pr-14 lg:gap-20 lg:pr-20"
    >
      {CERTIFICATIONS.map((c) => (
        <li key={c.name + String(hidden)}>
          <img
            src={c.src}
            alt={hidden ? "" : c.alt}
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
        {/* bg-ivory here, not only on the section. The marquee is
            animated, so its transform makes it a stacking context —
            and mix-blend-multiply on the badges blends against THAT
            group, not the page behind it. Without a ground inside the
            group the white JPEG backgrounds stay white and every badge
            sits on a visible card. */}
        <div className="flex animate-[marquee_38s_linear_infinite] bg-ivory group-hover:[animation-play-state:paused] motion-reduce:animate-none">
          {row(false)}
          {row(true)}
        </div>
      </div>
    </section>
  );
}
