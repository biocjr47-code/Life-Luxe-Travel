import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * The page's one authored motion moment: content settles upward once
 * as it enters, then stops.
 *
 * Two deliberate choices:
 *  - It renders VISIBLE on the server and only hides itself once the
 *    observer is attached. A reveal that starts hidden in SSR output
 *    leaves the whole page blank if JavaScript never arrives.
 *  - It unobserves after firing, so scrolling back up does not
 *    replay it. Repeating entrances are the tell of scattered motion.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "article";
}) {
  const ref = useRef<HTMLElement>(null);
  const [armed, setArmed] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShown(true);
      return;
    }
    setArmed(true);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          io.unobserve(el);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`${armed ? "reveal" : ""} ${shown ? "is-in" : ""} ${className}`}
      style={delay && armed ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
