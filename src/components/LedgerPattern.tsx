/**
 * Background illustration for the "everything between the idea and
 * the arrival" ledger.
 *
 * The section is an itinerary in list form, so the motif is an
 * itinerary: a folded paper map in the top-right dead space beside
 * the lede, and a dashed route running the full height of the right
 * margin, dropping a pin beside roughly every other row.
 *
 * Drawn, not licensed, in the same hand as the footer's flight
 * paths and the credentials section's trunk.
 *
 * The section is tall, so the viewBox is tall and the route is
 * built to stretch with it. Everything sits right of x=1040, clear
 * of the numerals, the row titles and the gloss column, and the
 * strongest stroke is 10% brand.
 *
 * Decorative: aria-hidden.
 */
export function LedgerPattern() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 1430"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 size-full"
    >
      <defs>
        <linearGradient id="llt-led-ink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d1296a" stopOpacity="0.30" />
          <stop offset="70%" stopColor="#d1296a" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#d1296a" stopOpacity="0.08" />
        </linearGradient>
        <linearGradient id="llt-led-warm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#5c534a" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#5c534a" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* A folded paper map, top right, in the space beside the
          lede. The creases are what make it read as paper rather
          than as a rectangle. */}
      <g
        transform="translate(1066 70) rotate(-7)"
        stroke="url(#llt-led-warm)"
        fill="none"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <path d="M0 26 96 0l96 26 96-26v192l-96 26-96-26-96 26Z" />
        <path d="M96 0v218M192 26v218" />
        {/* contours */}
        <path
          d="M26 128c34-30 62 10 96-14s62 16 96-10"
          strokeDasharray="5 8"
        />
        <path
          d="M26 166c38-26 58 8 96-12s66 14 96-8"
          strokeDasharray="5 8"
        />
        <path d="M44 72c26-18 52 6 74-8" strokeDasharray="4 7" />
      </g>

      {/* The route down the right margin, with pins. */}
      <g
        stroke="url(#llt-led-ink)"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="7 11"
      >
        <path d="M1372 332C1300 470 1408 560 1340 700s-96 206 -30 330 80 190 26 296" />
      </g>

      {/* Pins. The teardrop is drawn once and placed four times. */}
      <g fill="url(#llt-led-ink)">
        {/* Objects, not tuples: destructuring a number[] is
            possibly-undefined under noUncheckedIndexedAccess. */}
        {[
          { x: 1366, y: 332 },
          { x: 1336, y: 700 },
          { x: 1316, y: 1024 },
          { x: 1368, y: 1322 },
        ].map(({ x, y }) => (
          <path
            key={`${x}-${y}`}
            transform={`translate(${x - 11} ${y - 28}) scale(1.1)`}
            d="M10 0a10 10 0 0 0-10 10c0 7.5 10 20 10 20s10-12.5 10-20A10 10 0 0 0 10 0Zm0 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8Z"
          />
        ))}
      </g>
    </svg>
  );
}
