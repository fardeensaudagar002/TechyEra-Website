"use client";

import { useEffect, useRef } from "react";
import { CircleCheck, GitBranch } from "lucide-react";

/**
 * Original hero illustration: a live "target architecture" diagram.
 * Data packets travel between channels, the API gateway, services, data and AI.
 * Pure SVG + CSS/SMIL — no images, no canvas. Motion stops under prefers-reduced-motion.
 */

type Glyph = "apps" | "partners" | "gateway" | "services" | "data" | "ai";

const nodes: { id: string; x: number; y: number; label: string; sub: string; glyph: Glyph; primary?: boolean }[] = [
  { id: "apps", x: 20, y: 92, label: "Web & mobile", sub: "Channels", glyph: "apps" },
  { id: "partners", x: 20, y: 334, label: "Partner APIs", sub: "Integrations", glyph: "partners" },
  { id: "gateway", x: 200, y: 213, label: "API gateway", sub: "Auth · routing", glyph: "gateway", primary: true },
  { id: "services", x: 388, y: 92, label: "Microservices", sub: "Kubernetes", glyph: "services" },
  { id: "data", x: 388, y: 213, label: "Data platform", sub: "Lakehouse", glyph: "data" },
  { id: "ai", x: 388, y: 334, label: "AI / ML models", sub: "Inference", glyph: "ai" },
];
const W = 152;
const H = 54;

// connection paths (node edge to node edge)
const edges = [
  { id: "e1", d: "M172 119 C 190 119, 186 240, 200 240" },
  { id: "e2", d: "M172 361 C 190 361, 186 240, 200 240" },
  { id: "e3", d: "M352 240 C 372 240, 368 119, 388 119" },
  { id: "e4", d: "M352 240 L 388 240" },
  { id: "e5", d: "M352 240 C 372 240, 368 361, 388 361" },
  { id: "e6", d: "M464 146 L 464 213" },
  { id: "e7", d: "M464 267 L 464 334" },
];

const packets = [
  { edge: "e1", dur: "2.8s", begin: "0s" },
  { edge: "e2", dur: "3.4s", begin: "1.1s" },
  { edge: "e3", dur: "2.6s", begin: "0.6s" },
  { edge: "e4", dur: "1.8s", begin: "0.2s" },
  { edge: "e5", dur: "3s", begin: "1.6s" },
  { edge: "e6", dur: "2.2s", begin: "0.9s" },
  { edge: "e7", dur: "2.4s", begin: "2s" },
];

function NodeGlyph({ g, x, y, light }: { g: Glyph; x: number; y: number; light?: boolean }) {
  const s = light ? "#fff" : "var(--color-accent)";
  const common = { stroke: s, strokeWidth: 1.6, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <g transform={`translate(${x} ${y})`}>
      {g === "apps" && (<><rect x="2" y="3" width="11" height="14" rx="2" {...common} /><rect x="9" y="6" width="9" height="11" rx="1.6" {...common} /></>)}
      {g === "partners" && (<><circle cx="6" cy="10" r="4" {...common} /><circle cx="14" cy="10" r="4" {...common} /></>)}
      {g === "gateway" && (<><path d="M10 2 L18 10 L10 18 L2 10 Z" {...common} /><path d="M7 10h6" {...common} /></>)}
      {g === "services" && (<><rect x="2" y="2" width="7" height="7" rx="1.5" {...common} /><rect x="11" y="2" width="7" height="7" rx="1.5" {...common} /><rect x="2" y="11" width="7" height="7" rx="1.5" {...common} /><rect x="11" y="11" width="7" height="7" rx="1.5" {...common} /></>)}
      {g === "data" && (<><ellipse cx="10" cy="5" rx="7" ry="2.6" {...common} /><path d="M3 5v10c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V5M3 10c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6" {...common} /></>)}
      {g === "ai" && (<><circle cx="4" cy="15" r="2" {...common} /><circle cx="16" cy="15" r="2" {...common} /><circle cx="10" cy="4" r="2" {...common} /><path d="M5.2 13.4 8.8 5.7M14.8 13.4 11.2 5.7M6 15h8" {...common} /></>)}
    </g>
  );
}

export function HeroVisual() {
  const wrap = useRef<HTMLDivElement>(null);

  // gentle pointer parallax (desktop only, disabled for reduced motion)
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !window.matchMedia("(pointer: fine)").matches) return;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        el.style.setProperty("--px", `${(dx * 10).toFixed(2)}px`);
        el.style.setProperty("--py", `${(dy * 10).toFixed(2)}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div ref={wrap} className="relative mx-auto w-full max-w-[600px] [--px:0px] [--py:0px]">
      {/* soft accent glow */}
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-[40px] bg-[radial-gradient(60%_55%_at_60%_45%,rgb(36_71_214/0.10),transparent_70%)]" />

      <figure
        className="relative overflow-hidden rounded-[16px] border border-line bg-white shadow-[var(--shadow-lift)] transition-transform duration-500 ease-out"
        style={{ transform: "translate3d(calc(var(--px) * -0.4), calc(var(--py) * -0.4), 0)" }}
      >
        <figcaption className="flex items-center justify-between border-b border-line px-5 py-3 text-[0.8125rem]">
          <span className="font-semibold text-ink">Target architecture</span>
          <span className="inline-flex items-center gap-1.5 text-muted">
            <span className="relative inline-flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success/50 motion-reduce:hidden" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
            </span>
            All systems operational
          </span>
        </figcaption>

        <div className="blueprint">
          <svg viewBox="0 0 560 450" className="block h-auto w-full" role="img" aria-labelledby="hv-title hv-desc">
            <title id="hv-title">Illustration of a modern software architecture</title>
            <desc id="hv-desc">Web, mobile and partner systems connect through an API gateway to microservices, a data platform and AI models running in the cloud.</desc>

            {/* cloud boundary */}
            <rect x="186" y="62" width="364" height="352" rx="14" fill="rgb(36 71 214 / 0.035)" stroke="var(--color-accent-line)" strokeDasharray="5 6" />
            <g transform="translate(200 80)">
              <path d="M5 11a4 4 0 0 1 .6-7.95A5 5 0 0 1 15 4.5 3.3 3.3 0 0 1 15 11Z" fill="none" stroke="var(--color-accent)" strokeWidth="1.5" strokeLinejoin="round" />
              <text x="24" y="10.5" fontSize="12" fontWeight="600" fill="var(--color-accent-strong)">Cloud platform</text>
            </g>

            {/* edges */}
            {edges.map((e) => (
              <g key={e.id}>
                <path id={e.id} d={e.d} fill="none" stroke="var(--color-line-strong)" strokeWidth="1.5" />
                <path d={e.d} fill="none" stroke="var(--color-accent)" strokeOpacity="0.55" strokeWidth="1.5" strokeDasharray="4 6" className="animate-dash motion-reduce:hidden" />
              </g>
            ))}

            {/* moving packets */}
            <g className="motion-reduce:hidden">
              {packets.map((p, i) => (
                <circle key={i} r="3.6" fill="var(--color-accent)" stroke="#fff" strokeWidth="1.5">
                  <animateMotion dur={p.dur} begin={p.begin} repeatCount="indefinite" rotate="auto">
                    <mpath href={`#${p.edge}`} />
                  </animateMotion>
                </circle>
              ))}
            </g>

            {/* nodes */}
            {nodes.map((n) => (
              <g key={n.id}>
                <rect x={n.x} y={n.y} width={W} height={H} rx="9" fill={n.primary ? "var(--color-ink)" : "#fff"} stroke={n.primary ? "var(--color-ink)" : "var(--color-line-strong)"} />
                <rect x={n.x + 10} y={n.y + 11} width="32" height="32" rx="7" fill={n.primary ? "rgb(255 255 255 / 0.12)" : "var(--color-accent-soft)"} />
                <NodeGlyph g={n.glyph} x={n.x + 16} y={n.y + 17} light={n.primary} />
                <text x={n.x + 52} y={n.y + 24} fontSize="13" fontWeight="600" fill={n.primary ? "#fff" : "var(--color-ink)"}>{n.label}</text>
                <text x={n.x + 52} y={n.y + 40} fontSize="11" fill={n.primary ? "rgb(255 255 255 / 0.65)" : "var(--color-muted)"}>{n.sub}</text>
              </g>
            ))}

            {/* edge nodes */}
            {[[172, 119], [172, 361], [200, 240], [352, 240], [388, 119], [388, 240], [388, 361]].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="3.2" fill="#fff" stroke="var(--color-accent)" strokeWidth="1.5" />
            ))}
          </svg>
        </div>
      </figure>

      {/* floating status chips */}
      <div
        aria-hidden
        className="absolute -top-7 right-6 hidden sm:block"
        style={{ transform: "translate3d(calc(var(--px) * 0.8), calc(var(--py) * 0.8), 0)" }}
      >
        <div className="animate-float flex items-center gap-2.5 rounded-[10px] border border-line bg-white px-3.5 py-2.5 shadow-[var(--shadow-lift)] motion-reduce:animate-none">
          <CircleCheck className="h-[18px] w-[18px] text-success" />
          <div className="leading-tight">
            <p className="text-[0.8125rem] font-semibold text-ink">Model evaluation passed</p>
            <p className="text-[0.75rem] text-muted">Accuracy within threshold</p>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        className="absolute -left-4 bottom-[-18px] hidden sm:block"
        style={{ transform: "translate3d(calc(var(--px) * 1.1), calc(var(--py) * 1.1), 0)" }}
      >
        <div className="animate-float flex items-center gap-2.5 rounded-[10px] border border-line bg-white px-3.5 py-2.5 shadow-[var(--shadow-lift)] [animation-delay:-3s] motion-reduce:animate-none">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-[7px] bg-accent-soft text-accent"><GitBranch className="h-4 w-4" /></span>
          <div className="leading-tight">
            <p className="text-[0.8125rem] font-semibold text-ink">Release deployed</p>
            <p className="text-[0.75rem] text-muted">CI/CD pipeline · all checks green</p>
          </div>
        </div>
      </div>
    </div>
  );
}
