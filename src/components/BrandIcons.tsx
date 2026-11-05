import type { SVGProps } from "react";

/**
 * Social marks, drawn to match Lucide.
 *
 * Lucide v1 removed brand logos, so these are authored here rather
 * than pulled from a second icon set. Same 24 viewBox, same 1.5
 * stroke, same round caps and joins — mixing icon systems in one
 * row is immediately visible, and a Unicode glyph in their place
 * would be worse.
 */

const base = (props: SVGProps<SVGSVGElement>) => ({
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: "false" as const,
  ...props,
});

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <path d="M15.5 3h-2.2A4.3 4.3 0 0 0 9 7.3V10H6.5v3.4H9V21h3.4v-7.6h2.6l.5-3.4h-3.1V7.6c0-.7.4-1.2 1.2-1.2h2V3Z" />
    </svg>
  );
}

export function YoutubeIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <rect x="2.5" y="6" width="19" height="12" rx="3.6" />
      <path d="m10.4 9.6 4.4 2.4-4.4 2.4V9.6Z" />
    </svg>
  );
}

export function PinterestIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.6 20.2c-.5-1.4-.2-3 .1-4.4l1-4.2" />
      <path d="M8.9 10.3c0-2.2 1.7-4 4-4a3.6 3.6 0 0 1 3.7 3.8c0 2.6-1.4 4.6-3.4 4.6-1 0-1.8-.8-1.6-1.8" />
    </svg>
  );
}

export const SOCIAL_ICONS = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
  YouTube: YoutubeIcon,
  Pinterest: PinterestIcon,
} as const;
