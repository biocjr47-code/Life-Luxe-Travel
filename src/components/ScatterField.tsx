import { useRef } from "react";
import { useGsap } from "~/lib/motion";
import type { Photo } from "~/data/journeys";

/**
 * Spread's signature section: a centre card holds the frame while
 * satellite photographs scatter around it and drift at different
 * rates as you scroll.
 *
 * Why it suits this site better than it suits Spread: they are
 * illustrating "many marketplaces". Here each satellite is a real
 * journey, so the depth is carrying actual information.
 *
 * Positions are authored, not random. Random scatter clusters and
 * collides; these are placed to keep the centre card clear and to
 * balance the gutters. `depth` drives both the parallax rate and the
 * scale, so nearer cards are larger AND move faster — which is what
 * makes it read as space rather than as drift.
 */

type Satellite = Photo & {
  /** % from the left/top of the field. */
  x: number;
  y: number;
  /** 0 = far (small, slow), 1 = near (large, fast). */
  depth: number;
  rotate: number;
};

export function ScatterField({
  centre,
  satellites,
  heading,
  lede,
  /** Framing for the centre card. A group shot needs its heads kept. */
  centreFocus = "center 40%",
}: {
  centre: Photo;
  satellites: Satellite[];
  heading: string;
  lede: string;
  centreFocus?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGsap(
    ({ gsap, reduced }) => {
      if (reduced) return;

      // The centre card settles from slightly large, as the hero
      // image "hands over" to it.
      gsap.fromTo(
        ".sf-centre",
        { scale: 1.12, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        },
      );

      // Satellites fly in, staggered from the centre outward.
      gsap.fromTo(
        ".sf-sat",
        { opacity: 0, scale: 0.72, y: 40 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: "expo.out",
          stagger: { each: 0.07, from: "center" },
          scrollTrigger: { trigger: root.current, start: "top 72%" },
        },
      );

      // Scrubbed parallax. Each card gets its own rate from `depth`,
      // read off the DOM so the data stays the single source.
      gsap.utils.toArray<HTMLElement>(".sf-sat").forEach((el) => {
        const depth = Number(el.dataset.depth ?? 0.5);
        gsap.to(el, {
          yPercent: -26 * (0.35 + depth),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.1,
          },
        });
      });

      // The centre drifts the other way, which separates the planes.
      gsap.to(".sf-centre", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.1,
        },
      });
    },
    root,
    [],
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-cream py-24 lg:py-36"
      aria-labelledby="scatter-heading"
    >
      {/* THE FIELD — hidden from assistive tech and from small screens.
          Absolutely-positioned scatter has no sensible reading order,
          and on a phone there is no room for it. The same photographs
          appear in the gallery with captions, so nothing is lost. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden lg:block"
      >
        {satellites.map((s) => (
          <figure
            key={s.src}
            className="sf-sat absolute will-change-transform"
            data-depth={s.depth}
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: `${7 + s.depth * 9}vw`,
              transform: `rotate(${s.rotate}deg)`,
              filter: `saturate(${0.82 + s.depth * 0.18})`,
              opacity: 0.5 + s.depth * 0.5,
            }}
          >
            <img
              src={s.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full rounded-[14px] object-cover shadow-[0_4px_20px_rgba(12,11,10,0.12)]"
              style={{ aspectRatio: s.span === "wide" ? "3/2" : "3/4" }}
            />
          </figure>
        ))}
      </div>

      {/* THE CENTRE — the content, which is what everything else orbits */}
      <div className="relative mx-auto flex max-w-[1180px] flex-col items-center px-5 text-center sm:px-8">
        <figure className="sf-centre w-full max-w-[640px] will-change-transform">
          <img
            src={centre.src}
            alt={centre.alt}
            loading="lazy"
            decoding="async"
            className="aspect-[16/10] w-full rounded-[18px] object-cover shadow-[0_28px_70px_-18px_rgba(12,11,10,0.3)]"
            style={{ objectPosition: centreFocus }}
          />
        </figure>

        <h2
          id="scatter-heading"
          className="mt-14 max-w-[18ch] font-display text-[clamp(2.25rem,5.2vw,4rem)] leading-[1.04] tracking-[-0.025em] text-ink"
        >
          {heading}
        </h2>
        <p className="mt-6 max-w-[52ch] text-[clamp(1rem,1.4vw,1.1875rem)] leading-relaxed text-warm">
          {lede}
        </p>
      </div>
    </section>
  );
}

export type { Satellite };
