import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * The house button.
 *
 * SQUARE. No border-radius, here or anywhere that uses it. This is
 * the established Life Luxe geometry, shared with the NYE and
 * Greece landing pages, and the reason a visitor moving between a
 * campaign page and this site sees one hand.
 *
 * Square, 1px border, tracked-out uppercase, and the tracking OPENS
 * on hover rather than the fill changing abruptly — the same
 * geometry used across the Life Luxe landing pages, so a visitor
 * moving between this site and a campaign page sees one hand.
 *
 * Variants exist because a single fill cannot survive every ground:
 *   solid  — pink on light surfaces
 *   accent — pink over photography or ink. Same fill as solid, but
 *            it empties to WHITE rather than to brand-deep: that
 *            pink is 5.8:1 on ivory and nowhere near it on a dark
 *            ground, so the light variant's hover cannot be reused.
 *   onDark — white on ink
 *   ghost  — outlined, for use over photography
 */

type Variant = "solid" | "accent" | "onDark" | "ghost" | "quiet";
type Size = "md" | "sm";

const BASE =
  "group inline-flex min-h-11 items-center justify-center gap-2 font-sans font-bold uppercase " +
  "no-underline border cursor-pointer text-center " +
  "transition-[background-color,color,border-color,letter-spacing] duration-400 ease-luxe " +
  "disabled:opacity-45 disabled:cursor-not-allowed disabled:tracking-[0.22em]";

const SIZES: Record<Size, string> = {
  md: "px-8 py-3.5 text-[0.6875rem] tracking-[0.2em] hover:tracking-[0.25em]",
  sm: "px-6 py-3 text-[0.6875rem] tracking-[0.16em] hover:tracking-[0.2em]",
};

const VARIANTS: Record<Variant, string> = {
  solid:
    "bg-brand border-brand text-white hover:bg-transparent hover:text-brand-deep",
  accent:
    "bg-brand border-brand text-white hover:bg-transparent hover:text-white",
  onDark:
    "bg-white border-white text-ink hover:bg-transparent hover:text-white",
  ghost:
    "bg-transparent border-white/60 text-white hover:bg-white hover:border-white hover:text-ink",
  /* Secondary action on a light ground. Outlined in ink rather than
     pink, so it never competes with the primary button beside it. */
  quiet:
    "bg-transparent border-ink/25 text-ink hover:bg-ink hover:border-ink hover:text-white",
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

type ButtonProps = CommonProps & {
  to?: never;
  href?: never;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

type InternalLinkProps = CommonProps & {
  /** An in-app route. Uses TanStack Link so navigation stays client-side. */
  to: string;
  href?: never;
};

type ExternalLinkProps = CommonProps & {
  /** An off-site URL — booking widget, GHL funnel, social. */
  href: string;
  to?: never;
};

export type Props = ButtonProps | InternalLinkProps | ExternalLinkProps;

export function Button(props: Props) {
  const {
    children,
    variant = "solid",
    size = "md",
    className = "",
  } = props;
  const cls = `${BASE} ${SIZES[size]} ${VARIANTS[variant]} ${className}`;

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} className={cls}>
        {children}
      </Link>
    );
  }

  if ("href" in props && props.href) {
    const external = /^https?:/.test(props.href);
    return (
      <a
        href={props.href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  const { onClick, type = "button", disabled } = props as ButtonProps;
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
