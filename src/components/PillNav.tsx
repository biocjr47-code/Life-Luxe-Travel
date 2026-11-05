import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LEADCONNECTOR, NAV, SITE } from "~/data/site";

/**
 * A floating header bar, after joinspread.app's collapsing nav —
 * but squared, because the house geometry has no rounded corners.
 *
 * It sits over the hero on a translucent, blurred pill and COLLAPSES
 * on scroll: the link set drops away and only the wordmark and the
 * CTA remain. That collapse is the whole trick — it keeps the top of
 * the viewport almost empty once you are reading.
 *
 * Collapsed state is driven off a scroll listener rather than
 * ScrollTrigger, so the header still behaves correctly if GSAP has
 * not finished loading.
 */
export function PillNav() {
  const [collapsed, setCollapsed] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setCollapsed(window.scrollY > 120);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center px-4 lg:top-6">
      <nav
        aria-label="Main"
        /* The pill floats over whatever is behind it, so its ground
           cannot be a fixed translucency. At 35% over the dark hero
           it reads correctly; over the cream sections further down
           it washes out to light grey and the white label drops to
           roughly 2:1. Once scrolled it goes near-solid, which holds
           on any section. */
        className={`pointer-events-auto flex max-w-[min(100%,66rem)] flex-col items-stretch overflow-hidden border shadow-[0_4px_20px_rgba(12,11,10,0.1)] backdrop-blur-xl transition-[background-color,border-color] duration-500 ease-luxe lg:flex-row lg:items-center ${
          collapsed || open
            ? "border-white/12 bg-ink/95"
            : "border-white/25 bg-ink/35"
        }`}
      >
        <div className="flex items-center gap-2 p-1.5 lg:gap-1 lg:p-2">
          {/* The mark, not a text wordmark. The artwork is already a
              white disc, so it needs no plate behind it — adding one
              produced a second ring that read as a sticker. */}
          <Link
            to="/"
            aria-label={`${SITE.name}, home`}
            className="shrink-0 px-1.5 py-0.5"
          >
            <img
              src="/images/llt-logo.png"
              alt=""
              width={56}
              height={56}
              className="size-14 object-contain transition-transform duration-[350ms] ease-luxe hover:scale-105 lg:size-[68px]"
            />
          </Link>

          {/* The collapsing link set. grid-rows 0fr → 1fr animates to
              auto width without a hard-coded pixel value. */}
          <div
            className={`hidden overflow-hidden transition-all duration-[650ms] ease-luxe lg:grid ${
              collapsed
                ? "max-w-0 opacity-0"
                : "max-w-[46rem] opacity-100"
            }`}
          >
            <ul className="flex items-center gap-0.5 whitespace-nowrap">
              {NAV.filter((n) => n.to !== "/").map((item) => {
                const current = pathname.startsWith(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      aria-current={current ? "page" : undefined}
                      className={`inline-flex items-center px-4 py-2.5 text-[0.8125rem] font-bold tracking-[0.1em] uppercase no-underline transition-colors duration-300 ${
                        current
                          ? "bg-white/15 text-white"
                          : "text-white/80 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <a
            href={LEADCONNECTOR.bookingWidget}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex min-h-11 shrink-0 items-center border border-brand bg-brand px-5 text-[0.6875rem] font-bold tracking-[0.18em] whitespace-nowrap text-white uppercase no-underline transition-[background-color,color,letter-spacing] duration-300 ease-luxe hover:bg-transparent hover:tracking-[0.22em] hover:text-white lg:ml-1 lg:px-6"
          >
            Plan your trip
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="pill-nav-panel"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-11 shrink-0 items-center justify-center border border-white/30 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>

        {/* Mobile panel, inside the same capsule so it reads as one
            object expanding rather than a second bar appearing. */}
        <div
          id="pill-nav-panel"
          className={`${open ? "block" : "hidden"} border-t border-white/15 px-2 pt-2 pb-3 lg:hidden`}
        >
          <ul className="flex flex-col">
            {NAV.map((item) => {
              const current =
                item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    aria-current={current ? "page" : undefined}
                    className={`flex min-h-12 items-center px-4 text-[0.875rem] font-bold tracking-[0.1em] uppercase no-underline transition-colors ${
                      current ? "bg-white/15 text-white" : "text-white/85"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </header>
  );
}
