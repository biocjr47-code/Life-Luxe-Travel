import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useGsap } from "~/lib/motion";

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
  focus = "center 42%",
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
        className="ch-img absolute inset-0 -z-10 size-full object-cover will-change-transform"
        style={{ objectPosition: focus }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(104deg, rgb(12 11 10 / .58) 0%, rgb(12 11 10 / .24) 42%, rgb(12 11 10 / 0) 64%)," +
            "linear-gradient(180deg, rgb(12 11 10 / .44) 0%, rgb(12 11 10 / .12) 28%, rgb(12 11 10 / .66) 70%, rgb(12 11 10 / .94) 100%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1180px] px-5 pt-36 pb-20 sm:px-8 lg:px-11 lg:pb-28">
        <h1 className="font-display text-[clamp(2.75rem,7.6vw,6rem)] leading-[1.02] tracking-[-0.03em] text-white italic">
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
          <a
            href={primary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[54px] items-center justify-center rounded-full bg-brand px-9 text-[0.9375rem] font-bold text-white no-underline transition-[background-color,transform] duration-300 ease-luxe hover:scale-[1.03] hover:bg-brand-deep"
          >
            {primary.label}
          </a>
          {secondary ? (
            <a
              href={secondary.href}
              className="group inline-flex min-h-[54px] items-center justify-center gap-2 rounded-full border border-white/35 px-8 text-[0.9375rem] text-white no-underline transition-colors duration-300 ease-luxe hover:border-white hover:bg-white hover:text-ink"
            >
              {secondary.label}
              <ArrowUpRight
                aria-hidden="true"
                className="size-4 transition-transform duration-300 ease-luxe group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          ) : null}
        </div>
      </div>

      {/* The rotating seal. Decorative, so it is hidden from assistive
          tech — the words in it are already in the page heading. */}
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
          <ArrowUpRight aria-hidden="true" className="size-6 text-white/80" />
        </span>
      </div>
    </section>
  );
}
