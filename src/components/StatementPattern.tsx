/**
 * Background illustration for the positioning statement.
 *
 * It draws the sentence it sits beside: "Travel is more than a
 * getaway. It is a gateway to connection, celebration and
 * transformation."
 *
 *   gateway       an arch, open, with a path running through it
 *   connection    the path continues beyond and joins two points
 *   celebration   a scatter of sparks above the arch
 *   transformation  what is on the far side: a horizon and a
 *                   rising sun, not the ground you started on
 *
 * Earlier versions were a constellation of dots (abstract, read as
 * geometry) and then a hot-air balloon (travel, but it says escape
 * rather than arrival, and nothing in it answers "gateway").
 *
 * Drawn, not licensed, in the same hand as the rest, and chosen to
 * avoid repeating what is used elsewhere: flight paths in the
 * footer, a trunk and boarding pass in the credentials, a folded
 * map in the ledger, the destinations themselves in the calendar, a
 * checklist by the form.
 *
 * THE Y VALUES ARE TUNED TO THE SLICE. The section renders around
 * 613px tall against this 860 viewBox, so `slice` scales to cover
 * and centres — showing roughly y 123..737 and discarding the rest.
 * Keep new motifs inside that band.
 *
 * Hidden below lg, where the columns stack and the space is gone.
 *
 * Decorative: aria-hidden.
 */
const SPARKS = [
  { x: 104, y: 246, r: 13 },
  { x: 196, y: 196, r: 9 },
  { x: 262, y: 268, r: 7 },
  { x: 44, y: 318, r: 8 },
  { x: 228, y: 344, r: 6 },
];

export function StatementPattern() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 860"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 -z-10 hidden size-full lg:block"
    >
      <defs>
        <linearGradient id="llt-stm-ink" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d1296a" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#d1296a" stopOpacity="0.10" />
        </linearGradient>
        <linearGradient id="llt-stm-warm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5c534a" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#5c534a" stopOpacity="0.07" />
        </linearGradient>
      </defs>

      {/* ── THE GATEWAY ──────────────────────────────── */}
      <g
        transform="translate(34 372)"
        stroke="url(#llt-stm-ink)"
        fill="none"
        strokeWidth="2.5"
        strokeLinejoin="round"
      >
        {/* the opening */}
        <path d="M18 330V118a86 86 0 0 1 172 0v212" />
        {/* the jambs, given depth by a second line */}
        <path d="M40 330V118a64 64 0 0 1 128 0v212" />
        {/* a keystone at the crown */}
        <path d="M92 33h24l6 20H86Z" />
        {/* plinths */}
        <path d="M4 330h48M156 330h48" />
        <path d="M10 344h36M162 344h36" />
      </g>

      {/* The path: up to the arch, through it, and away. */}
      <g
        stroke="url(#llt-stm-ink)"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="7 11"
      >
        <path d="M80 724C104 684 128 656 150 638" />
        <path d="M150 638C230 584 400 560 548 566" />
      </g>
      {/* Two points, joined — the connection the path makes. */}
      <g fill="url(#llt-stm-ink)">
        <circle cx="150" cy="638" r="6" />
        <circle cx="548" cy="566" r="6" />
      </g>

      {/* Sparks above the arch — the celebration. */}
      <g stroke="url(#llt-stm-ink)" fill="none" strokeWidth="2" strokeLinecap="round">
        {SPARKS.map((s) => (
          <path
            key={`${s.x}-${s.y}`}
            d={`M${s.x} ${s.y - s.r}V${s.y + s.r}M${s.x - s.r} ${s.y}H${s.x + s.r}`}
          />
        ))}
      </g>

      {/* ── What is on the far side ──────────────────── */}
      <g stroke="url(#llt-stm-warm)" fill="none" strokeWidth="2">
        <path d="M-40 690h1520" strokeDasharray="7 11" />
      </g>

      <g
        transform="translate(1300 300)"
        stroke="url(#llt-stm-warm)"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <circle r="78" />
        <circle r="104" strokeDasharray="3 10" />
        <path d="M0-132V-160M0 132v28M-132 0h-28M132 0h28M-93-93-113-113M93 93l20 20M93-93l20-20M-93 93l-20 20" />
      </g>
    </svg>
  );
}
