/**
 * Background illustration for the positioning statement.
 *
 * A hot-air balloon climbing away on a dashed line, with birds and
 * a horizon. The sentence beside it is about transformation and
 * celebration — rising, rather than arriving — and a balloon is the
 * one piece of travel iconography that carries that instead of
 * logistics.
 *
 * The first version here was a constellation of joined dots. It was
 * meant to say "connection" and read as abstract geometry; nothing
 * in it was recognisably travel.
 *
 * Drawn, not licensed, in the same hand as the rest, and chosen to
 * avoid repeating what is already used: flight paths in the footer,
 * a trunk and boarding pass in the credentials, a folded map in the
 * ledger, the destinations themselves in the calendar, a checklist
 * by the form.
 *
 * It occupies the two dead zones this section has on a wide screen:
 * the band beneath the statement, which runs to four lines at most,
 * and the right margin past the copy column.
 *
 * THE Y VALUES ARE TUNED TO THE SLICE. The section renders around
 * 613px tall against this 860 viewBox, so `slice` scales to cover
 * and centres — showing roughly y 123..737 and discarding the rest.
 * The balloon first sat at 540..790 and lost its basket off the
 * bottom. Keep new motifs inside that band.
 *
 * Hidden below lg, where the columns stack and that space is gone.
 *
 * Decorative: aria-hidden.
 */
export function StatementPattern() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 860"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 hidden size-full lg:block"
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

      {/* ── The balloon, lower left ───────────────────── */}
      <g
        transform="translate(126 398)"
        stroke="url(#llt-stm-ink)"
        fill="none"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        {/* envelope: a circle flattened into a teardrop by two
            gores drawn as mirrored arcs */}
        <path d="M78 4a74 74 0 0 1 74 74c0 38-30 74-56 104l-18 20-18-20C34 152 4 116 4 78A74 74 0 0 1 78 4Z" />
        <path d="M78 4c-26 26-34 100 0 202M78 4c26 26 34 100 0 202" />
        <path d="M11 110h134" strokeDasharray="6 9" />
        {/* the basket and its ropes */}
        <path d="M60 206l8 20M96 206l-8 20" />
        <path d="M64 226h28l-4 24H68Z" />
      </g>

      {/* The climb it came up on. */}
      <g
        stroke="url(#llt-stm-ink)"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="7 11"
      >
        <path d="M204 706C250 648 196 596 232 540" />
      </g>

      {/* Birds, further out and smaller, so the eye reads depth. */}
      <g
        stroke="url(#llt-stm-warm)"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
      >
        <path d="M470 470c10-11 20-11 30 0 10-11 20-11 30 0" />
        <path d="M566 534c7-8 15-8 22 0 7-8 15-8 22 0" />
        <path d="M662 486c6-6 12-6 18 0 6-6 12-6 18 0" />
      </g>

      {/* A horizon under all of it. */}
      <g stroke="url(#llt-stm-warm)" fill="none" strokeWidth="2">
        <path d="M-40 690h1520" strokeDasharray="7 11" />
      </g>

      {/* ── The sun, right margin past the copy ───────── */}
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
