/**
 * Background illustration for the positioning statement.
 *
 * The sentence is about connection, so the motif is a constellation
 * — places as points, joined. It deliberately avoids repeating the
 * objects already used elsewhere: the footer has flight paths, the
 * credentials section a trunk and a boarding pass, the ledger a
 * folded map, the calendar the destinations themselves.
 *
 * Drawn, not licensed, in the same hand as those.
 *
 * It occupies the two dead zones this section has on a wide screen:
 * the band beneath the statement, which runs to four lines at most
 * and leaves the lower third empty, and the right margin past the
 * copy column. Nothing sits under either text block.
 *
 * Hidden below lg, where the two columns stack and that space is no
 * longer empty.
 *
 * Decorative: aria-hidden.
 */
const NODES = [
  { x: 128, y: 598, r: 7 },
  { x: 332, y: 664, r: 5 },
  { x: 236, y: 742, r: 4 },
  { x: 536, y: 612, r: 6 },
  { x: 470, y: 726, r: 4 },
  { x: 712, y: 680, r: 5 },
] as const;

export function StatementPattern() {
  // The joined pairs, authored rather than generated, so the shape
  // reads as a route network and not as a scatter.
  const nodes = NODES;
  const edges = [
    [0, 1],
    [1, 2],
    [1, 3],
    [3, 4],
    [3, 5],
  ] as const;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 1440 860"
      preserveAspectRatio="xMidYMid slice"
      className="pointer-events-none absolute inset-0 hidden size-full lg:block"
    >
      <defs>
        <linearGradient id="llt-stm-ink" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d1296a" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#d1296a" stopOpacity="0.10" />
        </linearGradient>
        <linearGradient id="llt-stm-warm" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5c534a" stopOpacity="0.24" />
          <stop offset="100%" stopColor="#5c534a" stopOpacity="0.07" />
        </linearGradient>
      </defs>

      {/* The network, under the statement. */}
      <g stroke="url(#llt-stm-ink)" strokeWidth="1.5" strokeDasharray="5 8" fill="none">
        {edges.map(([a, b]) => {
          const p = nodes[a];
          const q = nodes[b];
          if (!p || !q) return null;
          return <line key={`${a}-${b}`} x1={p.x} y1={p.y} x2={q.x} y2={q.y} />;
        })}
      </g>
      <g fill="url(#llt-stm-ink)">
        {nodes.map((n) => (
          <circle key={`${n.x}-${n.y}`} cx={n.x} cy={n.y} r={n.r} />
        ))}
      </g>
      {/* Rings around the two anchor points, like a signal. */}
      <g stroke="url(#llt-stm-ink)" fill="none" strokeWidth="1.5">
        <circle cx={128} cy={598} r={22} />
        <circle cx={128} cy={598} r={38} strokeDasharray="3 7" />
        <circle cx={536} cy={612} r={18} strokeDasharray="3 7" />
      </g>

      {/* A long meridian sweeping the right margin, past the copy. */}
      <g stroke="url(#llt-stm-warm)" fill="none" strokeWidth="1.5">
        <ellipse cx={1452} cy={398} rx={300} ry={300} />
        <ellipse cx={1452} cy={398} rx={150} ry={300} />
        <path d="M1152 398h600" strokeDasharray="6 10" />
        <path d="M1208 236h500M1208 560h500" strokeDasharray="6 10" />
      </g>
    </svg>
  );
}
