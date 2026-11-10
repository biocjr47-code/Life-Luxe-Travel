/**
 * The footer's background illustration: flight paths over a plotted
 * meridian grid.
 *
 * DRAWN, NOT PHOTOGRAPHED. A stock illustration here would be the
 * one piece of licensed art on a site whose argument is that the
 * pictures are its own. This is a few hundred bytes of SVG, it
 * scales to any footer height, it recolours with the brand, and it
 * costs no request.
 *
 * `slice` rather than `meet`, so it crops rather than squashing when
 * the footer is tall and narrow on a phone.
 *
 * Decorative: aria-hidden, and it carries no information that is not
 * already in the words beside it.
 */
export function FooterPattern() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 520"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 -z-10 size-full"
    >
      {/* The arcs fade out towards the bottom so the legal line at
          the foot sits on clean plum. */}
      <defs>
        <linearGradient id="llt-foot-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f08fb4" stopOpacity="0.5" />
          <stop offset="42%" stopColor="#f08fb4" stopOpacity="0.24" />
          <stop offset="68%" stopColor="#f08fb4" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="llt-foot-grid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.14" />
          <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Meridians — a globe implied rather than drawn. */}
      <g stroke="url(#llt-foot-grid)" strokeWidth="1" fill="none">
        <ellipse cx="1180" cy="250" rx="300" ry="300" />
        <ellipse cx="1180" cy="250" rx="150" ry="300" />
        <ellipse cx="1180" cy="250" rx="60" ry="300" />
        <path d="M880 250h600M905 150h550M905 350h550M975 70h410M975 430h410" />
      </g>

      {/* Flight paths. Dashed, because that is the universal mark for
          a route rather than a road. */}
      <g
        stroke="url(#llt-foot-fade)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeDasharray="7 9"
      >
        <path d="M-40 250C180 90 520 60 760 150s420 110 760 20" />
        <path d="M-40 340C240 240 430 262 700 238s500 -112 820 -96" />
        <path d="M60 392C220 306 460 330 660 296" />
      </g>

      {/* Waypoints. */}
      <g fill="#f08fb4" fillOpacity="0.5">
        <circle cx="182" cy="156" r="3.5" />
        <circle cx="760" cy="150" r="3.5" />
        <circle cx="700" cy="238" r="3.5" />
        <circle cx="1180" cy="210" r="4.5" />
      </g>

      {/* Two aircraft, set on the paths they follow. */}
      <g fill="#ffffff" fillOpacity="0.22">
        <path
          transform="translate(466 78) rotate(-12) scale(1.15)"
          d="M21 9.5 13.4 8 9.1 1.2a.9.9 0 0 0-.8-.4H6.7a.6.6 0 0 0-.6.8l2 6.1-4.6-.5-1.3-2a.6.6 0 0 0-.5-.3H.8a.6.6 0 0 0-.6.8l1.1 3.3-1.1 3.3a.6.6 0 0 0 .6.8h.9a.6.6 0 0 0 .5-.3l1.3-2 4.6-.5-2 6.1a.6.6 0 0 0 .6.8h1.6a.9.9 0 0 0 .8-.4l4.3-6.8L21 10.5a.5.5 0 0 0 0-1Z"
        />
        <path
          transform="translate(1046 214) rotate(8) scale(0.85)"
          d="M21 9.5 13.4 8 9.1 1.2a.9.9 0 0 0-.8-.4H6.7a.6.6 0 0 0-.6.8l2 6.1-4.6-.5-1.3-2a.6.6 0 0 0-.5-.3H.8a.6.6 0 0 0-.6.8l1.1 3.3-1.1 3.3a.6.6 0 0 0 .6.8h.9a.6.6 0 0 0 .5-.3l1.3-2 4.6-.5-2 6.1a.6.6 0 0 0 .6.8h1.6a.9.9 0 0 0 .8-.4l4.3-6.8L21 10.5a.5.5 0 0 0 0-1Z"
        />
      </g>
    </svg>
  );
}
