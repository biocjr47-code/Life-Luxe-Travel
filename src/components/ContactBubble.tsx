import { useEffect, useRef, useState } from "react";
import {
  Calendar,
  ChevronRight,
  Mail,
  MessageCircle,
  Phone,
  Send,
  X,
} from "lucide-react";
import { InstagramIcon } from "./BrandIcons";
import { LEADCONNECTOR, SITE } from "~/data/site";

/**
 * The floating contact card, pinned bottom-right on every page.
 *
 * IT IS NOT A LIVE CHAT, and does not pretend to be. There is no
 * agent at the other end and nothing here suggests one — no typing
 * indicator, no "online now", no response-time claim.
 *
 * NO EMAIL FIELD. The composer hands the message to the visitor's
 * own mail client with the body already filled in, so their address
 * comes from the account they send it from. Asking them to type it
 * a second time added a field, added a validation state, and pushed
 * the card past the height of the window.
 *
 * That also means there is nothing to post and nothing to configure
 * — no server route, no CRM credentials, no silent failure mode
 * where a message is accepted and quietly dropped.
 *
 * NO SCROLL. The card is sized to fit inside a short window on its
 * own; if anything is added to it, check that again rather than
 * reaching for overflow-y-auto.
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
  const [message, setMessage] = useState("");
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

  function onSend(e: React.FormEvent) {
    e.preventDefault();
    const body = message.trim();
    if (!body) return;
    // encodeURIComponent, not encodeURI: an ampersand or a hash in
    // someone's message would otherwise truncate the mail body.
    window.location.href =
      `mailto:${SITE.email}` +
      `?subject=${encodeURIComponent("Website enquiry")}` +
      `&body=${encodeURIComponent(body)}`;
  }

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
          <p className="inline-block max-w-[17rem] rounded-2xl rounded-bl-md bg-brand-wash px-4 py-3 text-[0.875rem] leading-relaxed text-ink">
            Hello — how would you like to reach us?
          </p>
        </div>

        {/* ── The ways through ────────────────────────── */}
        <ul className="px-3 pt-3">
          {ACTIONS.map((a) => {
            const Icon = a.icon;
            return (
              <li key={a.label}>
                <a
                  href={a.href}
                  {...(a.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex min-h-13 items-center gap-3.5 rounded-2xl px-3 py-1.5 no-underline transition-colors duration-200 hover:bg-brand-wash"
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

        {/* ── The composer ────────────────────────────── */}
        <form
          onSubmit={onSend}
          className="mt-3 border-t border-rule px-5 pt-4 pb-5"
        >
          <label htmlFor="cb-message" className="sr-only">
            Write a message to Life Luxe Travel
          </label>
          <div className="flex items-end gap-2">
            <textarea
              id="cb-message"
              rows={1}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message…"
              className="max-h-28 min-h-11 w-full resize-y rounded-2xl border border-rule bg-white px-4 py-2.5 text-[0.875rem] text-ink transition-colors duration-200 placeholder:text-muted/70 focus:border-brand focus:outline-none"
            />
            {/* The caption that used to sit here explained that
                this opens a mail client. It is gone at Terry's
                request, so the explanation lives in the accessible
                name instead — a screen reader still announces where
                the button leads before it is pressed. */}
            <button
              type="submit"
              disabled={!message.trim()}
              aria-label={`Send this message by email to ${SITE.email}`}
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-[background-color,opacity] duration-200 hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send aria-hidden="true" className="size-4" />
            </button>
          </div>
        </form>
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
          <X aria-hidden="true" className="size-[18px]" strokeWidth={2} />
        ) : (
          <MessageCircle aria-hidden="true" className="size-6" strokeWidth={1.75} />
        )}
      </button>
    </div>
  );
}
