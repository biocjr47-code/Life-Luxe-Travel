import { useEffect } from "react";

/**
 * The motion layer, modelled on joinspread.app: Lenis for weighted
 * smooth scroll, GSAP ScrollTrigger for scrubbed parallax.
 *
 * Three rules hold throughout:
 *
 * 1. CLIENT ONLY. GSAP and Lenis both touch window on import, so
 *    everything here is dynamically imported inside an effect. A
 *    top-level import would break SSR.
 *
 * 2. REDUCED MOTION IS A HARD STOP, not a shortened duration. If the
 *    visitor asked their OS for less motion they get the finished
 *    layout immediately — no smooth-scroll hijack, no scrub. Hijacking
 *    the scrollbar is exactly what that setting exists to prevent.
 *
 * 3. EVERY ELEMENT STARTS VISIBLE. Animations set their own `from`
 *    state in JS. Nothing is hidden in CSS, so a failed script or a
 *    blocked CDN leaves a readable page rather than a blank one.
 */

const EASE = "expo.out";
/** Matches --ease-luxe, and matches Spread's own curve. */
export const EASE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";

function prefersReduced() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Weighted smooth scroll. Spread uses Lenis at a long duration, which
 * is what gives the page its slow, expensive feel — the parallax reads
 * as deliberate rather than jittery because the scroll itself is eased.
 */
export function useSmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let frame = 0;
    let cancelled = false;

    (async () => {
      const Lenis = (await import("lenis")).default;
      if (cancelled) return;
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Never on touch. Phones already have momentum scrolling and
        // overriding it feels broken.
        syncTouch: false,
      });
      const raf = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(raf);
      };
      frame = requestAnimationFrame(raf);

      // ScrollTrigger must read positions from Lenis, not the native
      // scroll, or every trigger fires at the wrong moment.
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      // @ts-expect-error — lenis' emitter types are loose
      lenis.on?.("scroll", ScrollTrigger.update);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);
}

/**
 * Registers GSAP once and hands the caller a context to build in.
 * gsap.context() scopes every selector to the root element and
 * reverts the whole lot on unmount, which is what stops ScrollTriggers
 * leaking between client-side route changes.
 */
export function useGsap(
  build: (ctx: {
    gsap: typeof import("gsap").gsap;
    ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
    reduced: boolean;
  }) => void,
  root: React.RefObject<HTMLElement | null>,
  deps: unknown[] = [],
) {
  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    let cancelled = false;

    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled || !root.current) return;
      gsap.registerPlugin(ScrollTrigger);
      const reduced = prefersReduced();
      ctx = gsap.context(() => build({ gsap, ScrollTrigger, reduced }), root.current);
      // Images settle after layout; stale trigger positions are the
      // usual cause of "the animation fires too early".
      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

export { EASE };
