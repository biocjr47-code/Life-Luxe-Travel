import { useEffect, useRef, useState } from "react";
import { Calendar, ChevronRight, Mail, MessageCircle, Phone, X } from "lucide-react";
import { InstagramIcon } from "./BrandIcons";
import { LEADCONNECTOR, SITE } from "~/data/site";

/**
 * The floating contact card, pinned bottom-right on every page.
 *
 * IT IS NOT A CHAT INTEGRATION, and does not pretend to be. No chat
 * provider is configured on this site, so rather than draw a
 * message box that sends nothing, it offers the ways Terry can
 * actually be reached today. The greeting is a prompt, not a
 * conversation, and there is no input field implying someone is
 * waiting at the other end.
 *
 * No response-time claim either — "usually replies in minutes" is
 * the standard flourish here and there is nothing to support it.
 *
 * IF THE GOHIGHLEVEL CHAT WIDGET IS ADDED, its script injects its
 * own bubble into this same corner. Remove this component then, or
 * move it, so the two do not stack.
 *
 * ROUNDED, like the guest portraits and unlike everything else.
 * The house geometry is square, but a chat card and its launcher
 * are a UI convention people recognise by shape — squaring them off
 * would make it read as a dropdown rather than as a way to talk to
 * somebody.
 */
const PANEL_ID = "floating-contact-panel";

const ACTIONS = [
  {
    icon: Phone,
    label: "Call us",
    detail: SITE.phone,
    href: SITE.phoneHref,
    external: false,
  },
  {
    icon: Mail,
    label: "Email us",
    detail: SITE.email,
    href: `mailto:${SITE.email}`,
    external: false,
  },
  {
    icon: Calendar,
    label: "Book a consultation",
    detail: "Pick a time with Terry",
    href: LEADCONNECTOR.bookingWidget,
    external: true,
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    detail: "@lifeluxetravel1",
    href: "https://www.instagram.com/lifeluxetravel1/",
    external: true,
  },
] as const;

export function ContactBubble() {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={wrap}
      className="fixed right-5 bottom-5 z-50 flex flex-col items-end gap-3 lg:right-8 lg:bottom-8"
    >
      <div
        id={PANEL_ID}
        hidden={!open}
        className="w-[min(21rem,calc(100vw-2.5rem))] overflow-hidden rounded-3xl bg-white shadow-[0_24px_60px_-18px_rgba(12,11,10,0.45)] ring-1 ring-ink/10"
      >
        {/* ── Header ──────────────────────────────────── */}
        <div className="flex items-center gap-3 bg-plum px-5 py-4">
          <img
            src="/images/llt-logo.png"
            alt=""
            width={44}
            height={44}
            className="size-11 shrink-0 rounded-full object-contain"
          />
          <span className="min-w-0">
            <span className="block font-display text-[1.0625rem] leading-tight text-white">
              {SITE.name}
            </span>
            <span className="mt-0.5 block truncate text-[0.75rem] text-white/70">
              {SITE.founder} · Founder
            </span>
          </span>
        </div>

        {/* ── The greeting, as an incoming bubble ─────── */}
        <div className="px-5 pt-5">
          <p className="relative inline-block max-w-[17rem] rounded-2xl rounded-bl-md bg-brand-wash px-4 py-3 text-[0.875rem] leading-relaxed text-ink">
            Hello — how would you like to reach us?
          </p>
        </div>

        {/* ── The ways through ────────────────────────── */}
        <ul className="px-3 pt-3 pb-4">
          {ACTIONS.map((a) => {
            const Icon = a.icon;
            return (
              <li key={a.label}>
                <a
                  href={a.href}
                  {...(a.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex min-h-14 items-center gap-3.5 rounded-2xl px-3 no-underline transition-colors duration-200 hover:bg-brand-wash"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-wash text-brand-deep transition-colors duration-200 group-hover:bg-brand group-hover:text-white">
                    <Icon aria-hidden="true" className="size-[17px]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.875rem] font-bold text-ink">
                      {a.label}
                    </span>
                    <span className="mt-0.5 block truncate text-[0.8125rem] text-muted">
                      {a.detail}
                    </span>
                  </span>
                  <ChevronRight
                    aria-hidden="true"
                    className="size-4 shrink-0 text-muted transition-transform duration-200 ease-luxe group-hover:translate-x-0.5 group-hover:text-brand-deep"
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ── The launcher ──────────────────────────────── */}
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
