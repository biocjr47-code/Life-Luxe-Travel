/**
 * Background illustration for the Group Trip Planning Checklist.
 *
 * The section offers a checklist, so the motif is one: a sheet with
 * ticked lines, a pencil, and a dashed route running off to a pin —
 * the plan and the trip it turns into. Same drawn hand as the
 * footer's flight paths, the credentials trunk, the ledger's map and
 * the calendar's domes.
 *
 * It lives in the left column's dead space BELOW the lede. That
 * column is heading and three lines of copy against a tall form, so
 * the bottom two-thirds of it is empty on a wide screen.
 *
 * Hidden below lg: on a phone the two columns stack and there is no
 * dead space left to draw into — the artwork would sit under the
 * form.
 *
 * Decorative: aria-hidden.
 */
export function ChecklistPattern() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 820"
      preserveAspectRatio="xMinYMid slice"
      className="pointer-events-none absolute inset-0 -z-10 hidden size-full lg:block"
    >
      <defs>
        <linearGradient id="llt-chk-ink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d1296a" stopOpacity="0.26" />
          <stop offset="100%" stopColor="#d1296a" stopOpacity="0.09" />
        </linearGradient>
        <linearGradient id="llt-chk-warm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5c534a" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#5c534a" stopOpacity="0.07" />
        </linearGradient>
      </defs>

      {/* The sheet, with a folded corner. */}
      <g
        transform="translate(150 404) rotate(-5)"
        stroke="url(#llt-chk-warm)"
        fill="none"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <path d="M0 0h196l44 44v264H0Z" />
        <path d="M196 0v44h44" />
      </g>

      {/* Ticks and their lines, sitting on the sheet. */}
      <g
        transform="translate(150 404) rotate(-5)"
        stroke="url(#llt-chk-ink)"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m28 84 14 14 24-28M84 92h118" />
        <path d="m28 142 14 14 24-28M84 150h96" />
        <path d="m28 200 14 14 24-28M84 208h126" />
        <path d="M30 258h30M84 266h78" strokeDasharray="5 8" />
      </g>

      {/* A pencil laid across the foot of the sheet. */}
      <g
        transform="translate(292 676) rotate(-28)"
        stroke="url(#llt-chk-warm)"
        fill="none"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <path d="M0 0h118v22H0Z" />
        <path d="M118 0l26 11-26 11ZM0 0v22" />
        <path d="M104 0v22" strokeDasharray="4 6" />
      </g>

      {/* The route the plan becomes, and where it lands. */}
      <g
        stroke="url(#llt-chk-ink)"
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="7 11"
      >
        <path d="M430 700C536 616 520 492 626 430" />
      </g>
      <path
        transform="translate(616 372)"
        fill="url(#llt-chk-ink)"
        d="M14 0A14 14 0 0 0 0 14c0 10.5 14 28 14 28s14-17.5 14-28A14 14 0 0 0 14 0Zm0 19.6a5.6 5.6 0 1 1 0-11.2 5.6 5.6 0 0 1 0 11.2Z"
      />
    </svg>
  );
}
