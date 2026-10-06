import { cn } from "@/lib/utils";

/**
 * Generated, on-brand cover illustrations used where photography has not been supplied yet
 * (article heroes, Life at Techyera tiles). Deterministic per `seed`, so they render identically
 * on server and client. Pass a real image via the parent component to replace them.
 */

type Motif = "network" | "bars" | "orbits" | "grid" | "loop" | "steps" | "rings" | "people";

const motifByCategory: Record<string, Motif> = {
  AI: "network",
  Data: "bars",
  Cloud: "orbits",
  "Software Engineering": "grid",
  DevOps: "loop",
  "Digital Transformation": "steps",
  "Technology Strategy": "rings",
};

function rng(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function CoverArt({
  seed,
  category,
  motif,
  tone = "light",
  className,
  label,
}: {
  seed: string;
  category?: string;
  motif?: Motif;
  tone?: "light" | "dark";
  className?: string;
  label?: string;
}) {
  const m: Motif = motif ?? motifByCategory[category ?? ""] ?? "grid";
  const r = rng(seed);
  const dark = tone === "dark";
  const bg = dark ? "#0b1b34" : "#eef2fd";
  const ink = dark ? "#ffffff" : "#0b1b34";
  const acc = dark ? "#6f8bff" : "#2447d6";
  const faint = dark ? "rgb(255 255 255 / 0.12)" : "rgb(36 71 214 / 0.14)";
  const id = `ca-${seed.replace(/[^a-z0-9]/gi, "").slice(0, 24)}`;

  const shapes: React.ReactNode[] = [];

  if (m === "network") {
    const pts = Array.from({ length: 12 }, (_, k) => [50 + (k % 4) * 100 + (r() - 0.5) * 60, 40 + Math.floor(k / 4) * 72 + (r() - 0.5) * 40] as const);
    pts.forEach((a, i) =>
      pts.slice(i + 1).forEach((b, j) => {
        const d = Math.hypot(a[0] - b[0], a[1] - b[1]);
        if (d < 135) shapes.push(<line key={`l${i}-${j}`} x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={acc} strokeOpacity={0.35} strokeWidth={1.2} />);
      }),
    );
    pts.forEach((p, i) => shapes.push(<circle key={`c${i}`} cx={p[0]} cy={p[1]} r={i % 4 === 0 ? 7 : 4} fill={i % 4 === 0 ? acc : "#fff"} stroke={acc} strokeWidth={1.5} />));
  }
  if (m === "bars") {
    const n = 14;
    for (let i = 0; i < n; i++) {
      const h = 30 + r() * 130;
      shapes.push(<rect key={i} x={40 + i * 23} y={200 - h} width={14} height={h} rx={3} fill={i % 5 === 3 ? acc : faint} />);
    }
    let d = "M40 150";
    for (let i = 0; i <= 8; i++) d += ` L ${40 + i * 40} ${70 + r() * 80}`;
    shapes.push(<path key="trend" d={d} fill="none" stroke={ink} strokeWidth={2} strokeLinejoin="round" />);
  }
  if (m === "orbits") {
    for (let i = 0; i < 5; i++) shapes.push(<circle key={i} cx={130 + i * 38} cy={112} r={40 + r() * 40} fill="none" stroke={i === 2 ? acc : faint} strokeWidth={i === 2 ? 2 : 1.5} />);
    shapes.push(<circle key="core" cx={206} cy={112} r={10} fill={acc} />);
  }
  if (m === "grid") {
    for (let x = 0; x < 9; x++)
      for (let y = 0; y < 5; y++) {
        const on = r() > 0.72;
        shapes.push(<rect key={`${x}-${y}`} x={30 + x * 40} y={18 + y * 40} width={30} height={30} rx={5} fill={on ? acc : "none"} stroke={on ? acc : faint} strokeWidth={1.5} fillOpacity={on ? 0.9 : 0} />);
      }
    shapes.push(<path key="br" d="M150 80 l-26 32 l26 32 M250 80 l26 32 l-26 32" fill="none" stroke={ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />);
  }
  if (m === "loop") {
    shapes.push(<path key="inf" d="M200 112 C 160 52, 80 52, 80 112 C 80 172, 160 172, 200 112 C 240 52, 320 52, 320 112 C 320 172, 240 172, 200 112 Z" fill="none" stroke={acc} strokeWidth={3} />);
    shapes.push(<path key="inf2" d="M200 112 C 168 70, 108 70, 108 112 C 108 154, 168 154, 200 112 C 232 70, 292 70, 292 112 C 292 154, 232 154, 200 112 Z" fill="none" stroke={faint} strokeWidth={1.5} />);
    [80, 200, 320].forEach((x, i) => shapes.push(<circle key={`n${i}`} cx={x} cy={112} r={6} fill="#fff" stroke={ink} strokeWidth={2} />));
  }
  if (m === "steps") {
    for (let i = 0; i < 6; i++) {
      const h = 28 + i * 26;
      shapes.push(<rect key={i} x={46 + i * 52} y={200 - h} width={40} height={h} rx={5} fill={i === 5 ? acc : faint} />);
    }
    shapes.push(<path key="arr" d="M60 150 L 330 40" stroke={ink} strokeWidth={2} strokeDasharray="5 6" />);
    shapes.push(<circle key="tip" cx={330} cy={40} r={6} fill={ink} />);
  }
  if (m === "rings") {
    for (let i = 1; i <= 5; i++) shapes.push(<circle key={i} cx={200} cy={112} r={i * 20} fill="none" stroke={i === 3 ? acc : faint} strokeWidth={i === 3 ? 2 : 1.5} />);
    shapes.push(<path key="needle" d="M200 112 L 262 62" stroke={ink} strokeWidth={2.5} strokeLinecap="round" />);
    shapes.push(<circle key="c" cx={200} cy={112} r={5} fill={acc} />);
    for (let i = 0; i < 6; i++) {
      const a = r() * Math.PI * 2;
      const rr = 20 * (1 + Math.floor(r() * 5));
      shapes.push(<circle key={`p${i}`} cx={200 + Math.cos(a) * rr} cy={112 + Math.sin(a) * rr} r={3.5} fill={acc} />);
    }
  }
  if (m === "people") {
    const count = 3 + Math.floor(r() * 3);
    const gap = 300 / count;
    for (let i = 0; i < count; i++) {
      const x = 50 + gap * i + gap / 2;
      const hl = i === Math.floor(count / 2);
      shapes.push(<circle key={`h${i}`} cx={x} cy={96} r={12} fill={hl ? acc : "#fff"} stroke={hl ? acc : faint} strokeWidth={2} />);
      shapes.push(<path key={`b${i}`} d={`M${x - 22} 150 a22 22 0 0 1 44 0`} fill={hl ? acc : "#fff"} fillOpacity={hl ? 0.9 : 1} stroke={hl ? acc : faint} strokeWidth={2} />);
    }
    shapes.push(<rect key="table" x={56} y={150} width={288} height={8} rx={4} fill={ink} fillOpacity={dark ? 0.35 : 0.85} />);
  }

  return (
    <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" className={cn("block h-full w-full", className)} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
      <defs>
        <pattern id={id} width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill={dark ? "rgb(255 255 255 / 0.10)" : "rgb(36 71 214 / 0.12)"} />
        </pattern>
      </defs>
      <rect width="400" height="225" fill={bg} />
      <rect width="400" height="225" fill={`url(#${id})`} />
      {shapes}
    </svg>
  );
}
