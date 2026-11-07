import { useRef } from "react";
import { useGsap } from "~/lib/motion";

/**
 * Image card beside text, alternating sides down the page — the
 * pattern Spread uses for its middle third.
 *
 * The image is a square-cornered card, not a full-bleed panel, and it
 * parallaxes gently against the copy. Alternating `flip` is what
 * stops six of these reading as a list.
 */
export function SplitFeature({
  heading,
  body,
  image,
  imageAlt,
  flip = false,
  footnote,
  media = "cover",
  imageFocus,
  children,
}: {
  heading: string;
  body: string[];
  image: string;
  imageAlt: string;
  flip?: boolean;
  footnote?: string;
  /**
   * "cover" fills the column — right for a landscape of a place.
   * "portrait" holds the image to 340px on an offset sand panel.
   * A 600px headshot stretched across a half-page column is a
   * face at roughly life size, which is not a portrait, it is a
   * poster.
   */
  media?: "cover" | "portrait";
  /** object-position, for when the default centre crop is wrong. */
  imageFocus?: string;
  children?: React.ReactNode;
}) {
  const root = useRef<HTMLElement>(null);

  useGsap(
    ({ gsap, reduced }) => {
      if (reduced) return;
      gsap.fromTo(
        ".sp-media",
        { opacity: 0, y: 56, scale: 0.97 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 78%" },
        },
      );
      gsap.fromTo(
        ".sp-copy > *",
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 76%" },
        },
      );
      // The image drifts slower than the page, so the pair separates.
      gsap.to(".sp-media img", {
        yPercent: -9,
        ease: "none",
        scrollTrigger: {
          trigger: root.current, start: "top bottom", end: "bottom top", scrub: 1.1,
        },
      });
    },
    root,
    [],
  );

  return (
    <section ref={root} className="py-20 lg:py-32">
      <div className="mx-auto grid max-w-[1180px] items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-20 lg:px-11">
        {media === "portrait" ? (
          <figure className={`sp-media ${flip ? "lg:order-2" : ""}`}>
            <div className="relative isolate w-full max-w-[340px]">
              {/* An offset plate, square like everything else, so
                  the portrait sits ON something instead of floating
                  in the column. */}
              <div
                aria-hidden="true"
                className="absolute inset-0 -z-10 translate-x-4 translate-y-4 bg-sand"
              />
              <div className="overflow-hidden">
                <img
                  src={image}
                  alt={imageAlt}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full scale-[1.06] object-cover will-change-transform"
                  style={imageFocus ? { objectPosition: imageFocus } : undefined}
                />
              </div>
            </div>
          </figure>
        ) : (
          <figure
            className={`sp-media overflow-hidden ${flip ? "lg:order-2" : ""}`}
          >
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              className="aspect-[4/5] w-full scale-[1.12] object-cover will-change-transform"
              style={imageFocus ? { objectPosition: imageFocus } : undefined}
            />
          </figure>
        )}

        <div className="sp-copy">
          <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.06] tracking-[-0.024em] text-ink">
            {heading}
          </h2>
          {body.map((p) => (
            <p key={p.slice(0, 28)} className="measure mt-5 text-[1.0625rem] leading-relaxed text-warm">
              {p}
            </p>
          ))}
          {children}
          {footnote ? (
            <p className="mt-7 text-[0.8125rem] font-bold tracking-[0.14em] text-brand-deep uppercase">
              {footnote}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
