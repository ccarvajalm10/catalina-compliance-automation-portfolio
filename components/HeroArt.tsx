/**
 * Original isometric "assessment landscape": glossy iso columns for control
 * coverage, with a floating trend line of nodes above. Inline SVG, no assets,
 * no watermark. Reads on the dark gradient hero.
 */
export function HeroArt({ className = "" }: { className?: string }) {
  // isometric unit vectors
  const ux = [0.866, 0.5]; // +x -> right & down
  const uy = [-0.866, 0.5]; // +y -> left & down
  const ox = 260;
  const oy = 150;
  const S = 30; // tile size

  const p = (gx: number, gy: number, gz = 0): [number, number] => [
    ox + gx * S * ux[0] + gy * S * uy[0],
    oy + gx * S * ux[1] + gy * S * uy[1] - gz * S,
  ];

  // 5 columns along the grid diagonal, heights = a rising "coverage" profile
  const heights = [1.4, 2.3, 1.8, 3.1, 2.6];

  function column(i: number, h: number) {
    const gx = i;
    const gy = i;
    const w = 0.8;
    const A = p(gx, gy, h); // top back
    const B = p(gx + w, gy, h); // top right
    const C = p(gx + w, gy + w, h); // top front
    const D = p(gx, gy + w, h); // top left
    const Bb = p(gx + w, gy, 0);
    const Cb = p(gx + w, gy + w, 0);
    const Db = p(gx, gy + w, 0);
    return (
      <g key={i}>
        {/* right face */}
        <path
          d={`M${B} L${C} L${Cb} L${Bb} Z`}
          fill={`url(#face-r-${i})`}
        />
        {/* left face */}
        <path
          d={`M${D} L${C} L${Cb} L${Db} Z`}
          fill={`url(#face-l-${i})`}
        />
        {/* top */}
        <path
          d={`M${A} L${B} L${C} L${D} Z`}
          fill={`url(#face-t-${i})`}
        />
      </g>
    );
  }

  // floating trend nodes above the columns
  const nodes = heights.map((h, i) => p(i + 0.4, i + 0.4, h + 1.1));

  return (
    <svg
      className={className}
      viewBox="0 0 520 430"
      fill="none"
      role="img"
      aria-label="An isometric chart: rising columns of control coverage with a trend line of findings above."
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="plate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#6d4bff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#2a6bff" stopOpacity="0.15" />
        </linearGradient>
        {heights.map((_, i) => (
          <g key={i}>
            <linearGradient id={`face-t-${i}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#a9c2ff" />
              <stop offset="1" stopColor="#5b8bff" />
            </linearGradient>
            <linearGradient id={`face-r-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#4f79f0" />
              <stop offset="1" stopColor="#2f4bc4" />
            </linearGradient>
            <linearGradient id={`face-l-${i}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#6b93ff" />
              <stop offset="1" stopColor="#3f63e0" />
            </linearGradient>
          </g>
        ))}
        <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="9" />
        </filter>
      </defs>

      {/* glow */}
      <ellipse cx="255" cy="300" rx="200" ry="90" fill="#6d4bff" opacity="0.28" filter="url(#soft)" />

      {/* base plate */}
      <path
        d={`M${p(-0.4, -0.4)} L${p(6.2, -0.4)} L${p(6.2, 6.2)} L${p(-0.4, 6.2)} Z`}
        fill="url(#plate)"
        stroke="#ffffff2e"
        strokeWidth="1"
      />
      {/* plate grid */}
      {[0, 1, 2, 3, 4, 5, 6].map((k) => (
        <g key={k} stroke="#ffffff22" strokeWidth="0.75">
          <line x1={p(k - 0.4, -0.4)[0]} y1={p(k - 0.4, -0.4)[1]} x2={p(k - 0.4, 6.2)[0]} y2={p(k - 0.4, 6.2)[1]} />
          <line x1={p(-0.4, k - 0.4)[0]} y1={p(-0.4, k - 0.4)[1]} x2={p(6.2, k - 0.4)[0]} y2={p(6.2, k - 0.4)[1]} />
        </g>
      ))}

      {heights.map((h, i) => column(i, h))}

      {/* trend line */}
      <polyline
        points={nodes.map((n) => n.join(",")).join(" ")}
        fill="none"
        stroke="#ffffffcc"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n[0]} cy={n[1]} r="8" fill={i === 3 ? "#ff6b4a" : i === 1 ? "#b48bff" : "#ffffff"} />
          <circle cx={n[0]} cy={n[1]} r="8" fill="none" stroke="#ffffff55" strokeWidth="1.5" />
        </g>
      ))}
    </svg>
  );
}
