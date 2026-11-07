/**
 * Background illustration for the credentials section.
 *
 * The section is about accreditation — IATA, CLIA, a group
 * certification — so the motif is the thing those credentials get
 * you through: passport pages. Concentric stamp rings, a compass
 * rose and a dotted route, drawn rather than licensed, in the same
 * hand as the footer's flight paths.
 *
 * It is held very low (the strongest stroke is 10% brand) and kept
 * to the right-hand margin and the top-left corner, clear of the
 * two columns of text. The credentials themselves measured clean
 * after it was added.
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
      className="pointer-events-none absolute inset-0 size-full"
    >
      <defs>
        <linearGradient id="llt-pil-ink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d1296a" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#d1296a" stopOpacity="0.03" />
        </linearGradient>
        <linearGradient id="llt-pil-warm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5c534a" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#5c534a" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* A stamp, far right, mostly off the edge. */}
      <g
        transform="translate(1286 196)"
        stroke="url(#llt-pil-ink)"
        fill="none"
        strokeWidth="1.5"
      >
        <circle r="150" />
        <circle r="124" strokeDasharray="3 7" />
        <circle r="74" />
        <path d="M-150 0h300M0-150v300" strokeDasharray="5 11" />
      </g>

      {/* A compass rose, top left, in the gutter above the heading. */}
      <g
        transform="translate(126 108)"
        stroke="url(#llt-pil-warm)"
        fill="none"
        strokeWidth="1.5"
      >
        <circle r="62" />
        <circle r="40" strokeDasharray="2 6" />
        <path d="M0-74V74M-74 0H74" />
        <path d="M-46-46 46 46M46-46-46 46" strokeDasharray="4 8" />
        <path d="M0-62 13-13 62 0 13 13 0 62-13 13-62 0-13-13Z" />
      </g>

      {/* A route crossing the foot, well below both text columns. */}
      <g
        stroke="url(#llt-pil-ink)"
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="6 10"
      >
        <path d="M-40 712C260 628 520 690 820 650s400 -92 700 -118" />
      </g>
    </svg>
  );
}
