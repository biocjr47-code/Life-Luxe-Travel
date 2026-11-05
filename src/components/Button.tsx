import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

/**
 * The house button.
 *
 * Square, 1px border, tracked-out uppercase, and the tracking OPENS
 * on hover rather than the fill changing abruptly — the same
 * geometry used across the Life Luxe landing pages, so a visitor
 * moving between this site and a campaign page sees one hand.
 *
 * Variants exist because a single fill cannot survive every ground:
 *   solid  — pink on light surfaces
 *   onDark — white on ink; pink would fail contrast there
 *   ghost  — outlined, for use over photography
 */

type Variant = "solid" | "onDark" | "ghost";
type Size = "md" | "sm";

const BASE =
  "group inline-flex items-center justify-center gap-2 font-sans font-bold uppercase " +
  "no-underline border cursor-pointer text-center " +
  "transition-[background-color,color,border-color,letter-spacing] duration-400 ease-luxe " +
  "disabled:opacity-45 disabled:cursor-not-allowed disabled:tracking-[0.22em]";

const SIZES: Record<Size, string> = {
  md: "px-11 py-5 text-[0.6875rem] tracking-[0.22em] hover:tracking-[0.27em]",
  sm: "px-7 py-3.5 text-[0.6875rem] tracking-[0.18em] hover:tracking-[0.22em]",
};

const VARIANTS: Record<Variant, string> = {
  solid:
    "bg-brand border-brand text-white hover:bg-transparent hover:text-brand-deep",
  onDark:
    "bg-white border-white text-ink hover:bg-transparent hover:text-white",
  ghost:
    "bg-transparent border-white/60 text-white hover:bg-white hover:border-white hover:text-ink",
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
