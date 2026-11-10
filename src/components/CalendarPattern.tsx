/**
 * Background illustration for the travel calendar.
 *
 * The first version was passport date stamps, which came out as
 * plain rings with lines through them — neither beautiful nor
 * obviously travel. These are the places instead: a Santorini
 * cluster of blue domes and a windmill, a ship on the water, and a
 * palm horizon, strung along a dashed route down the right margin.
 *
 * They are drawn in the same hand as the footer's flight paths, the
 * credentials section's trunk and the ledger's folded map, and they
 * echo the journeys actually listed beside them — Greece at the
 * top, the New Year's Eve sailing in the middle, Rio and Ghana
 * below.
 *
 * Everything sits right of x≈1150, clear of the row titles and the
 * gloss column, and the SVG pins its RIGHT edge (xMax). The section
 * renders far taller than the viewBox, so `slice` scales to cover
 * and discards width — centred, that threw the whole illustration
 * off screen.
 *
 * Hidden below lg. With the right edge pinned there are no gutters
 * left on a phone, and the artwork landed under the row text —
 * "Trip details" measured 4.03:1 there against a 4.5 floor.
 *
 * Decorative: aria-hidden.
 */
export function CalendarPattern() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 2200"
      preserveAspectRatio="xMaxYMid slice"
      className="pointer-events-none absolute inset-0 -z-10 hidden size-full lg:block"
    >
      <defs>
        <linearGradient id="llt-cal-ink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d1296a" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#d1296a" stopOpacity="0.10" />
        </linearGradient>
        <linearGradient id="llt-cal-warm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5c534a" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#5c534a" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* The route that strings them together. */}
      <g
        stroke="url(#llt-cal-ink)"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="7 12"
      >
        <path d="M1420 96C1250 360 1372 620 1282 900s-96 470 78 760" />
      </g>

      {/* ── Santorini: two domes, a bell tower, a windmill ──── */}
      <g
        transform="translate(1186 128)"
        stroke="url(#llt-cal-ink)"
        fill="none"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        {/* bell tower */}
        <path d="M18 150V62l24-22 24 22v88" />
        <path d="M30 84h24M42 40V22M34 22h16" />
        <circle cx="42" cy="104" r="9" />
        {/* big dome */}
        <path d="M86 150v-34a34 34 0 0 1 68 0v34" />
        <path d="M120 82V60M110 60h20" />
        <path d="M78 150h84" />
        {/* small dome */}
        <path d="M168 150v-22a22 22 0 0 1 44 0v22" />
        <path d="M190 106V90" />
        <path d="M162 150h56" />
        {/* cliff line */}
        <path d="M0 150h236" strokeDasharray="6 9" />
      </g>

      {/* Windmill, just below the village. */}
      <g
        transform="translate(1278 316)"
        stroke="url(#llt-cal-warm)"
        fill="none"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <path d="M22 94V46a22 22 0 0 1 44 0v48Z" />
        <path d="M14 94h60" />
        <path d="M44 34 44 2M44 34 16 18M44 34 72 18M44 34 44 34" />
        <circle cx="44" cy="34" r="5" />
      </g>

      {/* ── A ship on the water, mid-column ─────────────────── */}
      <g
        transform="translate(1142 886)"
        stroke="url(#llt-cal-ink)"
        fill="none"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <path d="M14 86h242l-26 44H40Z" />
        <path d="M44 86V52h168v34" />
        <path d="M66 52V30h124v22" />
        <path d="M92 30V14h28v16" />
        {/* portholes */}
        <path d="M70 68h12M100 68h12M130 68h12M160 68h12M190 68h12" />
        {/* water */}
        <path
          d="M-10 150c34-12 56 12 90 0s56 12 90 0 56 12 90 0"
          strokeDasharray="7 9"
        />
        <path
          d="M-10 174c34-12 56 12 90 0s56 12 90 0 56 12 90 0"
          strokeDasharray="7 9"
        />
      </g>

      {/* ── A palm horizon, lower right ─────────────────────── */}
      <g
        transform="translate(1176 1664)"
        stroke="url(#llt-cal-warm)"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M58 180V74" />
        <path d="M58 74C34 58 18 62 4 78M58 74c24-16 40-12 54 4M58 74c-10-22-6-38 6-50M58 74c14-20 32-22 50-14" />
        <path d="M150 180v-74" />
        <path d="M150 106c-18-12-30-9-40 3M150 106c18-12 30-9 40 3M150 106c-7-16-4-28 5-36" />
        <path d="M-20 180h280" strokeDasharray="6 9" />
      </g>

    </svg>
  );
}
