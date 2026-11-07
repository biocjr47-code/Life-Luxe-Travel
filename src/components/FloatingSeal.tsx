import { useEffect, useRef, useState } from "react";
import { ArrowUp, Calendar, Mail, MessageCircle, Phone, X } from "lucide-react";
import { InstagramIcon } from "./BrandIcons";
import { LEADCONNECTOR, SITE } from "~/data/site";

/**
 * The rotating seal, lifted out of the hero and pinned to the
 * viewport so it stays with you up and down the page, with a
 * contact bubble beneath it.
 *
 * IT CARRIES ITS OWN GROUND. In the hero the seal was white type
 * over a dark photograph. Fixed to the viewport it passes over
 * white, cream, ivory and plum in turn, so white-on-nothing would
 * vanish four times a scroll. The ink disc travels with it and the
 * contrast holds everywhere.
 *
 * The seal is the back-to-top control. A persistent badge that does
 * nothing is decoration taking up a corner; on a page this long,
 * returning to the top is the thing a floating control should do.
 * It is a real <button> with a label, not a clickable div.
 *
 * THE BUBBLE IS NOT A CHAT INTEGRATION, and does not pretend to be.
 * There is no chat provider configured on this site, so rather than
 * draw a speech bubble that opens nothing, it opens the ways Terry
 * can actually be reached today: phone, email, the booking calendar
 * and Instagram. If the GoHighLevel chat widget is added later, its
 * script injects its own bubble in this corner — delete this one,
 * or move it, so the two do not stack.
 */
const PANEL_ID = "floating-contact-panel";

export function FloatingSeal({
  sealText = "LIFE LUXE TRAVEL · EFFORTLESS GROUP TRIPS · ",
}: {
  sealText?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  // Escape closes it, and focus is not left on a hidden control.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onDown = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open]);

  const toTop = () => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };

  const LINK =
    "flex min-h-11 items-center gap-3 px-4 text-[0.875rem] text-white no-underline transition-colors duration-200 hover:bg-white/10";

  return (
    <div
      ref={wrap}
      className="pointer-events-none fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3 lg:right-8 lg:bottom-8"
    >
      {/* ── The seal ─────────────────────────────────────── */}
      <button
        type="button"
        onClick={toTop}
        aria-label="Back to top"
        className="group pointer-events-auto relative hidden size-[108px] rounded-full bg-ink/85 shadow-[0_10px_34px_-10px_rgba(12,11,10,0.55)] backdrop-blur-sm transition-transform duration-[350ms] ease-luxe hover:scale-[1.04] sm:block lg:size-[124px]"
      >
        <svg
          viewBox="0 0 132 132"
          aria-hidden="true"
          className="size-full animate-[sealSpin_22s_linear_infinite]"
        >
          <defs>
            <path
              id="floatingSealPath"
              d="M66,66 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0"
              fill="none"
            />
          </defs>
          <text
            className="fill-white/80"
            style={{ fontSize: 10, letterSpacing: "0.2em", fontWeight: 700 }}
          >
            <textPath href="#floatingSealPath">{sealText}</textPath>
          </text>
        </svg>

        <span className="absolute inset-0 flex items-center justify-center">
          <img
            src="/images/llt-logo.png"
            alt=""
            width={68}
            height={68}
            className="size-[68px] object-contain opacity-90 mix-blend-screen [filter:grayscale(1)_invert(1)_contrast(1.15)] transition-opacity duration-300 group-hover:opacity-0 lg:size-[78px]"
          />
          <ArrowUp
            aria-hidden="true"
            className="absolute size-6 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            strokeWidth={1.5}
          />
        </span>
      </button>

      {/* ── The contact panel ────────────────────────────── */}
      <div
        id={PANEL_ID}
        hidden={!open}
        className="pointer-events-auto w-[15rem] overflow-hidden border border-white/12 bg-ink/95 py-2 shadow-[0_14px_40px_-12px_rgba(12,11,10,0.6)] backdrop-blur-sm"
      >
        <a href={SITE.phoneHref} className={LINK}>
          <Phone aria-hidden="true" className="size-4 shrink-0 text-brand-lift" />
          {SITE.phone}
        </a>
        <a href={`mailto:${SITE.email}`} className={LINK}>
          <Mail aria-hidden="true" className="size-4 shrink-0 text-brand-lift" />
          Email us
        </a>
        <a
          href={LEADCONNECTOR.bookingWidget}
          target="_blank"
          rel="noopener noreferrer"
          className={LINK}
        >
          <Calendar aria-hidden="true" className="size-4 shrink-0 text-brand-lift" />
          Book a consultation
        </a>
        <a
          href="https://www.instagram.com/lifeluxetravel1/"
          target="_blank"
          rel="noopener noreferrer"
          className={LINK}
        >
          <InstagramIcon className="size-4 shrink-0 text-brand-lift" />
          @lifeluxetravel1
        </a>
      </div>

      {/* ── The bubble ───────────────────────────────────── */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? "Close contact options" : "Contact Life Luxe Travel"}
        className="pointer-events-auto flex size-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_30px_-8px_rgba(209,41,106,0.7)] transition-[transform,background-color] duration-300 ease-luxe hover:scale-105 hover:bg-brand-deep"
      >
        {open ? (
          <X aria-hidden="true" className="size-6" strokeWidth={1.75} />
        ) : (
          <MessageCircle aria-hidden="true" className="size-6" strokeWidth={1.75} />
        )}
      </button>
    </div>
  );
}
