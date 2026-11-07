import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Mail, Menu, Phone, X } from "lucide-react";
import { InstagramIcon } from "./BrandIcons";
import { Container } from "./Container";
import { LEADCONNECTOR, NAV, SITE } from "~/data/site";

/**
 * Two-tier header: a contact rail, then the mark and the links.
 *
 * On a page with a photographic hero it floats over the image with
 * no background of its own; everywhere else it sits on ink. The
 * `overlay` prop is what switches between those, and the scrim
 * below is what makes the floating case legible — measured over a
 * bright sky, even plain white text came out at 3.88:1 and failed.
 */
export function Navbar({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  // Close the panel on navigation, or it stays open over the new page.
  useEffect(() => setOpen(false), [pathname]);

  // Escape closes it and focus is not stranded at the top of the document.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={
        overlay
          ? "absolute inset-x-0 top-0 z-40"
          : "relative z-40 bg-ink"
      }
    >
      {/* The scrim. Only needed when the header floats over an image;
          on ink the bar already has a ground. It fades to nothing so
          it reads as light on the photograph, not as a bar. */}
      {overlay ? (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 top-0 -z-10 transition-[background] duration-300 ${
            open ? "bottom-0 bg-ink/95" : "-bottom-28"
          }`}
          style={
            open
              ? undefined
              : {
                  // A RAMP, NOT A BAND. At .86 holding to 52% and
                  // then cutting off twelve pixels below the bar,
                  // this painted a hard-edged dark strip across the
                  // sky — it read as weather rather than as a
                  // header. The top is lighter and the falloff runs
                  // much further, so it dissolves into the
                  // photograph instead of ending on a line.
                  background:
                    "linear-gradient(180deg, rgb(12 11 10 / .62) 0%, rgb(12 11 10 / .50) 34%, rgb(12 11 10 / .30) 60%, rgb(12 11 10 / .10) 82%, rgb(12 11 10 / 0) 100%)",
                }
          }
        />
      ) : null}

      {/* ── Tier 1: contact rail ─────────────────────────────── */}
      <div className="border-b border-white/15">
        <Container className="flex min-h-[26px] items-center justify-between gap-4 py-2.5">
          <div className="flex items-center gap-5 sm:gap-7">
            <a
              href={SITE.phoneHref}
              className="inline-flex min-h-11 items-center gap-2 text-[0.8125rem] whitespace-nowrap text-white/90 no-underline transition-colors hover:text-white lg:min-h-0"
            >
              <Phone aria-hidden="true" className="size-[15px] shrink-0" />
              {SITE.phone}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="hidden min-h-11 items-center gap-2 text-[0.8125rem] whitespace-nowrap text-white/90 no-underline transition-colors hover:text-white sm:inline-flex lg:min-h-0"
            >
              <Mail aria-hidden="true" className="size-[15px] shrink-0" />
              {SITE.email}
            </a>
          </div>

          <div className="flex items-center gap-5">
            <a
              href="https://www.instagram.com/lifeluxetravel1/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 text-[0.8125rem] whitespace-nowrap text-white/90 no-underline transition-colors hover:text-white lg:inline-flex"
            >
              <InstagramIcon className="size-[15px] shrink-0" />
              @lifeluxetravel1
            </a>
            <a
              href={LEADCONNECTOR.packingGuide}
              /* The house gesture is that the FILL DROPS OUT and the
                 tracking opens — the border stays and the label keeps
                 its colour. This one filled white and flipped its
                 label to ink instead, which is the opposite move and
                 the reason it read as a different button. Text stays
                 white rather than going brand-deep as the solid
                 variant does on light grounds: that pink cannot reach
                 4.5:1 over the header scrim. min-h-11 because it
                 measured 39px, under the 44px touch target. */
              className="inline-flex min-h-11 items-center border border-brand bg-brand px-4 text-[0.6875rem] font-bold tracking-[0.14em] whitespace-nowrap text-white uppercase no-underline transition-[background-color,color,letter-spacing] duration-300 ease-luxe hover:bg-transparent hover:tracking-[0.18em] hover:text-white sm:px-5"
            >
              Free Packing Guide
            </a>
          </div>
        </Container>
      </div>

      {/* ── Tier 2: mark and links ───────────────────────────── */}
      <nav aria-label="Main">
        <Container className="flex min-h-[104px] flex-wrap items-center justify-between gap-6 py-4 lg:min-h-[124px] lg:flex-nowrap lg:py-0">
          <Link
            to="/"
            className="shrink-0"
            aria-label={`${SITE.name}, home`}
          >
            <img
              src="/images/llt-logo.png"
              alt=""
              width={96}
              height={96}
              className="size-[72px] object-contain transition-transform duration-[350ms] ease-luxe hover:scale-105 lg:size-[96px]"
            />
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="primary-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex size-11 items-center justify-center border border-white/40 text-white lg:hidden"
          >
            {open ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>

          {/* basis-full makes the panel take its own row on mobile.
              Without it the links are squeezed into a narrow column
              beside the logo. */}
          <div
            id="primary-nav"
            className={`${open ? "block" : "hidden"} basis-full border-t border-white/15 pt-2 pb-4 lg:block lg:basis-auto lg:border-0 lg:p-0`}
          >
            <ul className="flex flex-col lg:flex-row lg:items-center lg:gap-5 xl:gap-[30px]">
              {NAV.map((item) => {
                const current =
                  item.to === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.to);
                return (
                  <li key={item.to}>
                    <Link
                      to={item.to}
                      aria-current={current ? "page" : undefined}
                      /* Regular weight, not bold. Seven bold
                         uppercase items in a row read as a toolbar;
                         Lato 400 with the tracking opened out reads
                         as a masthead. The size floor stays at 12px
                         and the colour is unchanged, so the measured
                         contrast over the header scrim holds. */
                      className={`block border-b border-white/10 py-3.5 text-sm font-normal tracking-[0.14em] whitespace-nowrap uppercase no-underline transition-colors duration-200 lg:border-0 lg:py-1.5 lg:text-[0.6875rem] lg:tracking-[0.15em] xl:text-[0.75rem] xl:tracking-[0.18em] ${
                        current
                          // The pink marked the current page by
                          // colour alone, and over the softened
                          // scrim it measured 3.08:1 against a 4.5
                          // floor. White label, pink rule: the text
                          // passes and the accent still shows.
                          ? "text-white underline decoration-brand-lift decoration-2 underline-offset-[7px]"
                          : "text-white hover:text-brand-lift"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </Container>
      </nav>
    </header>
  );
}
