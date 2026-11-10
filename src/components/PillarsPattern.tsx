/**
 * Background illustration for the credentials section.
 *
 * The first version was stamp rings and a compass rose, which read
 * as abstract geometry rather than as travel. These are objects you
 * can name: a steamer trunk, a boarding pass, and a routed aircraft.
 *
 * Drawn, not licensed — a few hundred bytes of SVG in the same hand
 * as the footer's flight paths, and it recolours with the brand.
 *
 * Placement is deliberate: the trunk sits in the left gutter above
 * the heading, the boarding pass runs off the right edge, and the
 * route crosses the foot. All three stay clear of the two text
 * columns, and the strongest stroke is 11% brand. Contrast was
 * re-measured after it went in.
 *
 * Decorative: aria-hidden, and it says nothing the words do not.
 */
export function PillarsPattern() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 760"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 -z-10 size-full"
    >
      <defs>
        <linearGradient id="llt-pil-ink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d1296a" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#d1296a" stopOpacity="0.10" />
        </linearGradient>
        <linearGradient id="llt-pil-warm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5c534a" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#5c534a" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* A steamer trunk, left gutter. Latches, straps, handle. */}
      <g
        transform="translate(60 44) rotate(-6)"
        stroke="url(#llt-pil-warm)"
        fill="none"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <rect x="0" y="34" width="208" height="134" rx="6" />
        <path d="M0 74h208" />
        <path d="M46 34v134M162 34v134" />
        <rect x="88" y="56" width="32" height="24" rx="3" />
        <path d="M78 34V22a26 26 0 0 1 52 0v12" />
        <path d="M14 168v12M194 168v12" />
      </g>

      {/* A boarding pass, running off the right edge. */}
      <g
        transform="translate(1152 178) rotate(9)"
        stroke="url(#llt-pil-ink)"
        fill="none"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <path d="M0 0h336a8 8 0 0 1 8 8v40a22 22 0 0 0 0 44v40a8 8 0 0 1-8 8H0Z" />
        <path d="M232 0v140" strokeDasharray="6 8" />
        <path d="M26 36h120M26 62h86M26 88h148" strokeDasharray="4 7" />
        <path d="M264 48h48M264 72h30" strokeDasharray="4 7" />
      </g>

      {/* The route and its aircraft, across the foot. */}
      <g
        stroke="url(#llt-pil-ink)"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="6 10"
      >
        <path d="M-40 716C280 628 560 690 860 644s380 -78 660 -104" />
      </g>
      <g fill="#d1296a" fillOpacity="0.26">
        <circle cx="236" cy="672" r="5" />
        <circle cx="1046" cy="620" r="5" />
        <path
          transform="translate(636 636) rotate(-6) scale(1.4)"
          d="M21 9.5 13.4 8 9.1 1.2a.9.9 0 0 0-.8-.4H6.7a.6.6 0 0 0-.6.8l2 6.1-4.6-.5-1.3-2a.6.6 0 0 0-.5-.3H.8a.6.6 0 0 0-.6.8l1.1 3.3-1.1 3.3a.6.6 0 0 0 .6.8h.9a.6.6 0 0 0 .5-.3l1.3-2 4.6-.5-2 6.1a.6.6 0 0 0 .6.8h1.6a.9.9 0 0 0 .8-.4l4.3-6.8L21 10.5a.5.5 0 0 0 0-1Z"
        />
      </g>
    </svg>
  );
}
