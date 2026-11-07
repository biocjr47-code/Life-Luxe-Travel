import { useEffect, useRef, useState } from "react";
import { Calendar, Mail, MessageCircle, Phone, X } from "lucide-react";
import { InstagramIcon } from "./BrandIcons";
import { LEADCONNECTOR, SITE } from "~/data/site";

/**
 * The floating contact bubble, pinned bottom-right on every page.
 *
 * IT IS NOT A CHAT INTEGRATION, and does not pretend to be. No chat
 * provider is configured on this site, so rather than draw a speech
 * bubble that opens nothing, it opens the ways Terry can actually
 * be reached today: phone, email, the booking calendar, Instagram.
 *
 * IF THE GOHIGHLEVEL CHAT WIDGET IS ADDED, its script injects its
 * own bubble into this same corner. Remove this component then, or
 * move it, so the two do not stack.
 *
 * The rotating seal briefly lived up here too. It belongs in the
 * hero, where it sits on a dark photograph and needs no plate of
 * its own — see CinematicHero.
 */
const PANEL_ID = "floating-contact-panel";

export function ContactBubble() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

  // Escape closes it, and a click outside dismisses it.
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

  const LINK =
    "flex min-h-11 items-center gap-3 px-4 text-[0.875rem] text-white no-underline transition-colors duration-200 hover:bg-white/10";

  return (
    <div
      ref={wrap}
      className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3 lg:right-8 lg:bottom-8"
    >
      <div
        id={PANEL_ID}
        hidden={!open}
        className="w-[15rem] overflow-hidden border border-white/12 bg-ink/95 py-2 shadow-[0_14px_40px_-12px_rgba(12,11,10,0.6)] backdrop-blur-sm"
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

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={PANEL_ID}
        aria-label={open ? "Close contact options" : "Contact Life Luxe Travel"}
        className="flex size-14 items-center justify-center rounded-full bg-brand text-white shadow-[0_10px_30px_-8px_rgba(209,41,106,0.7)] transition-[transform,background-color] duration-300 ease-luxe hover:scale-105 hover:bg-brand-deep"
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
