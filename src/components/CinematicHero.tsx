import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGsap } from "~/lib/motion";
import { Button } from "./Button";

/**
 * The full-bleed opener, after joinspread.app.
 *
 * Three borrowed moves:
 *  · the photograph fills the viewport and the type sits inside it
 *  · the headline is very large, very tight, and breaks across lines
 *    the designer chose, not the browser
 *  · a slow rotating seal anchors the empty bottom-right corner
 *
 * The Life Luxe parts: Playfair italic instead of a geometric sans,
 * and the pink carried in the primary pill and the subtitle.
 *
 * Headline words animate in as a masked rise — each line is clipped
 * and its content slides up from below. That is the one place on the
 * page where motion is the point rather than the garnish.
 */
export function CinematicHero({
  lines,
  subtitle,
  image,
  imageAlt,
  focus = "30% 42%",
  primary,
  secondary,
  sealText = "LIFE LUXE TRAVEL · EFFORTLESS GROUP TRIPS · ",
}: {
  /** Pre-broken headline lines. Authored breaks, not reflow. */
  lines: string[];
  subtitle: string;
  image: string;
  imageAlt: string;
  focus?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  sealText?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGsap(
    ({ gsap, reduced }) => {
      if (reduced) return;

      gsap.fromTo(
        ".ch-line > span",
        { yPercent: 115 },
        { yPercent: 0, duration: 1.25, ease: "expo.out", stagger: 0.09, delay: 0.15 },
      );
      gsap.fromTo(
        ".ch-fade",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1, ease: "expo.out", stagger: 0.12, delay: 0.55 },
      );
      // A slow push-in on the photograph. 1.06 → 1 over the whole
      // hero, scrubbed, so it reads as the frame settling rather than
      // a Ken Burns loop.
      gsap.fromTo(
        ".ch-img",
        { scale: 1.08 },
        {
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
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
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden"
    >
      <img
        src={image}
        alt={imageAlt}
        fetchPriority="high"
        decoding="async"
        className="ch-img absolute inset-0 -z-10 size-full object-cover [filter:brightness(1.04)_contrast(1.06)_saturate(1.14)] will-change-transform"
        style={{ objectPosition: focus }}
      />
      {/* The top stop is .26, not .44: the header carries its own
          scrim down to roughly 215px, and two dark layers over the
          same sky flattened the mountains to a silhouette. The foot
          stops are unchanged — they are what the subtitle sits on. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            // A COOL POOL, NOT A WARM WASH. The brand's near-black
            // is warm, and over dull overcast grass that mixes to
            // olive mud — which is what made the hero look dirty
            // rather than moody. A blue-grey of the same density
            // sends the shadow side slate instead of brown.
            //
            // A POOL, NOT A WASH. Two broad gradients dark enough to
            // carry the type also dimmed the mountains and the
            // breaking wave, which are the reason to use this
            // photograph at all. The broad layers are now thin, and
            // a radial anchored at the bottom-left does the actual
            // work — it puts the density only where the headline,
            // the subtitle and the buttons sit, and reaches zero
            // before it touches the surf on the right.
            // MOBILE IS THE BINDING CONSTRAINT, not desktop. On a
            // 390px viewport the subtitle sits over the brightest
            // part of the frame — sky and open sea — where a photo
            // pixel can be 250+. Desktop puts the same text over
            // the mountain. Every stop below is set from the mobile
            // measurement, not from how it looks on a laptop.
            "radial-gradient(112% 88% at 7% 84%, rgb(14 20 30 / .84) 0%, rgb(14 20 30 / .66) 36%, rgb(14 20 30 / .34) 62%, rgb(14 20 30 / 0) 82%)," +
            "linear-gradient(100deg, rgb(14 20 30 / .32) 0%, rgb(14 20 30 / .14) 38%, rgb(14 20 30 / 0) 62%)," +
            "linear-gradient(180deg, rgb(14 20 30 / .08) 0%, rgb(14 20 30 / .02) 34%, rgb(14 20 30 / .34) 76%, rgb(14 20 30 / .58) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1180px] px-5 pt-36 pb-20 sm:px-8 lg:px-11 lg:pb-28">
        <h1 className="max-w-[17ch] font-display text-[clamp(2.125rem,5.2vw,4.125rem)] leading-[1.06] tracking-[-0.026em] text-white italic">
          {lines.map((line) => (
            // Each line is its own clipping mask, so the rise reads
            // as type emerging from behind an edge.
            <span key={line} className="ch-line block overflow-hidden pb-[0.08em]">
              <span className="block">{line}</span>
            </span>
          ))}
        </h1>

        <p className="ch-fade mt-7 max-w-[44ch] text-[clamp(1.0625rem,1.6vw,1.3125rem)] leading-relaxed text-white/85">
          {subtitle}
        </p>

        <div className="ch-fade mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Button href={primary.href} variant="accent">
            {primary.label}
          </Button>
          {secondary ? (
            <Button href={secondary.href} variant="ghost">
              {secondary.label}
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Button>
          ) : null}
        </div>
      </div>


      {/* The rotating seal. Decorative, so it is hidden from
          assistive tech — the words in it are already in the page
          heading. It sits on the hero photograph and needs no plate
          behind it; pinning it to the viewport meant giving it an
          ink disc to survive the light sections, which made it a
          badge rather than part of the picture.

          The mark is a REAL WHITE KNOCKOUT ASSET, not a filtered
          one. CSS cannot make a white-only mark out of artwork that
          is already a white disc: grayscale+invert turns the disc
          black, and the mix-blend-screen meant to drop that black
          out is isolated by the stacking context GSAP creates here,
          so the logo wore a black plate. llt-logo-white.png is
          generated from the source by driving alpha off darkness —
          the off-white disc clears, the mark survives in white. */}
      <div
        aria-hidden="true"
        className="ch-fade pointer-events-none absolute right-8 bottom-24 hidden size-[132px] lg:block"
      >
        <svg viewBox="0 0 132 132" className="size-full animate-[sealSpin_22s_linear_infinite]">
          <defs>
            <path
              id="sealPath"
              d="M66,66 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0"
              fill="none"
            />
          </defs>
          <text
            className="fill-white/75"
            style={{ fontSize: 10, letterSpacing: "0.22em", fontWeight: 700 }}
          >
            <textPath href="#sealPath">{sealText}</textPath>
          </text>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center">
          <img
            src="/images/llt-logo-white.png"
            alt=""
            width={80}
            height={80}
            className="size-20 object-contain opacity-95"
          />
        </span>
      </div>
    </section>
  );
}
