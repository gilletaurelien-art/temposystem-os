import { crewAgents } from "../config/agents";
import type { Agent } from "../types";
import { useState, type ReactNode } from "react";

type CortexVisual = {
  x: number;
  y: number;
  color: string;
  glyph: "vision" | "anchor" | "structure" | "shield" | "prism";
  labelY: number;
  subtitle: string;
};

type CortexNode = Agent & CortexVisual;

type CortexLink = {
  from: string;
  to: string;
  strength: number;
};

type SynapsePath = {
  id: string;
  fromId: string;
  toId: string;
  d: string;
  color: string;
  isFuture: boolean;
  opacity: number;
  width: number;
  delay: number;
  duration: number;
};

type OrbitEnergyPath = {
  id: string;
  agentId: string;
  d: string;
  color: string;
  delay: number;
  duration: number;
  width: number;
};

const CORE_CENTER = {
  x: 450,
  y: 320,
};

const cortexVisuals: Record<string, CortexVisual> = {
  captain: {
    x: 450,
    y: 64,
    color: "#818cf8",
    glyph: "vision",
    labelY: 68,
    subtitle: "Vision & arbitrage",
  },
  "master-illuminator": {
    x: 704,
    y: 250,
    color: "#7dd3fc",
    glyph: "prism",
    labelY: 70,
    subtitle: "Perception & expérience",
  },
  quartermaster: {
    x: 607,
    y: 534,
    color: "#f0a6d5",
    glyph: "anchor",
    labelY: -70,
    subtitle: "Mémoire & cohérence",
  },
  "master-caulker": {
    x: 293,
    y: 534,
    color: "#a78bfa",
    glyph: "shield",
    labelY: -70,
    subtitle: "Sécurité & fiabilité",
  },
  "master-carpenter": {
    x: 196,
    y: 250,
    color: "#c084fc",
    glyph: "structure",
    labelY: 70,
    subtitle: "Structure & code",
  },
};

const cortexLinks: CortexLink[] = [
  { from: "captain", to: "quartermaster", strength: 11 },
  { from: "quartermaster", to: "master-carpenter", strength: 11 },
  { from: "master-carpenter", to: "master-illuminator", strength: 11 },
  { from: "master-illuminator", to: "master-caulker", strength: 11 },
  { from: "master-caulker", to: "captain", strength: 11 },
  { from: "captain", to: "master-carpenter", strength: 10 },
  { from: "captain", to: "master-illuminator", strength: 10 },
  { from: "master-carpenter", to: "master-caulker", strength: 10 },
  { from: "master-caulker", to: "quartermaster", strength: 10 },
  { from: "quartermaster", to: "master-illuminator", strength: 10 },
];

const fluxEvents = [
  {
    color: "#5eead4",
    label: "Timonier -> Capitaine",
    detail: "Proposition de séquence",
    time: "14:31:58",
  },
  {
    color: "#c084fc",
    label: "Charpentier -> Calfat",
    detail: "Analyse d'impact",
    time: "14:31:56",
  },
  {
    color: "#f0a6d5",
    label: "Quartier-Maître -> Tous",
    detail: "Rappel mémoire ADR-0009",
    time: "14:31:54",
  },
  {
    color: "#7dd3fc",
    label: "Enlumineur -> Charpentier",
    detail: "Signal UX structure",
    time: "14:31:52",
  },
  {
    color: "#818cf8",
    label: "Capitaine -> Tous",
    detail: "Point de synchronisation",
    time: "14:31:50",
  },
];

const systemRows = [
  ["Conseil de Bord", "Opérationnel", "#86efac"],
  ["Mémoire", "Synchronisée", "#86efac"],
  ["Gouvernance", "Active", "#86efac"],
  ["Applications", "1 active", "#86efac"],
  ["Timonier", "Prototype", "#facc15"],
  ["API IA", "En attente", "#facc15"],
];

const recentAdrs = [
  ["ADR-0010", "TEMPOSYSTEM is energy", "29/06/2026"],
  ["ADR-0009", "Cortex énergétique", "29/06/2026"],
  ["ADR-0008", "Interface vivante", "29/06/2026"],
];

const networkStats = [
  ["Humains", "12"],
  ["IA actives", "6"],
  ["Projets", "4"],
  ["Territoires", "2"],
];

const cortexAgentIds = Object.keys(cortexVisuals);

const cortexNodes = cortexAgentIds
  .map((id) => {
    const agent = crewAgents.find((candidate) => candidate.id === id);
    const visual = cortexVisuals[id];

    if (!agent || !visual) {
      return null;
    }

    return {
      ...agent,
      ...visual,
    };
  })
  .filter((node): node is CortexNode => Boolean(node));

const nodeById = new Map(cortexNodes.map((node) => [node.id, node]));

const bundleOffsets = [-72, -54, -38, -24, -12, 0, 12, 24, 38, 54, 72];
const motionDurations = [1.2, 3.7, 0.8, 5.4, 2.6, 4.9, 1.6, 6.1, 2.1, 3.3, 0.95, 4.2];
const pulseDurations = [6.8, 8.4, 5.6, 7.7, 9.1, 6.2];

const tissuePaths = [
  "M64 365 C138 148 302 78 448 108 S728 204 814 334 S640 546 424 520 S40 492 64 365",
  "M132 136 C230 70 386 88 500 160 S698 188 752 302 S632 442 486 408 S268 474 172 354 S34 218 132 136",
  "M118 408 C216 258 330 346 440 250 S676 132 786 256 S678 528 490 492 S232 540 118 408",
  "M92 248 C192 88 330 212 458 172 S616 82 780 188 S716 388 548 344 S248 436 92 248",
  "M196 96 C320 34 442 76 540 170 S692 338 572 434 S260 414 206 278 S94 148 196 96",
  "M210 484 C298 374 406 436 500 350 S620 254 750 370 S594 550 408 526 S122 548 210 484",
];

const sparkColors = ["#818cf8", "#5eead4", "#7dd3fc", "#c084fc", "#f0a6d5", "#a78bfa"];

const backgroundSynapses = Array.from({ length: 120 }, (_, index) => {
  const startAngle = index * 1.714;
  const endAngle = startAngle + 1.18 + (index % 5) * 0.23;
  const startRadius = 72 + ((index * 37) % 308);
  const endRadius = 88 + ((index * 53) % 286);
  const startX = 450 + Math.cos(startAngle) * startRadius * 1.18;
  const startY = 320 + Math.sin(startAngle) * startRadius * 0.72;
  const endX = 450 + Math.cos(endAngle) * endRadius * 1.18;
  const endY = 320 + Math.sin(endAngle) * endRadius * 0.72;
  const controlX = 450 + Math.cos(startAngle + 0.72) * (120 + (index % 9) * 19);
  const controlY = 320 + Math.sin(endAngle - 0.48) * (66 + (index % 7) * 15);

  return {
    d: `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`,
    color: sparkColors[index % sparkColors.length],
    opacity: 0.045 + (index % 6) * 0.012,
    width: index % 8 === 0 ? 0.74 : 0.42,
  };
});

const cortexSparks = Array.from({ length: 260 }, (_, index) => {
  const angle = index * 2.399963;
  const radius = 52 + ((index * 29) % 286);
  const stretch = index % 3 === 0 ? 1.34 : 1;

  return {
    x: 450 + Math.cos(angle) * radius * stretch,
    y: 320 + Math.sin(angle) * radius * 0.72,
    r: index % 9 === 0 ? 2 : index % 5 === 0 ? 1.45 : 0.9,
    color: sparkColors[index % sparkColors.length],
    opacity: 0.18 + (index % 7) * 0.055,
  };
});

const makePath = (
  from: CortexNode,
  to: CortexNode,
  offset: number,
  curveBias: number,
) => {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const length = Math.max(Math.hypot(dx, dy), 1);
  const normalX = (-dy / length) * offset;
  const normalY = (dx / length) * offset;
  const midX = (from.x + to.x) / 2 + normalX;
  const midY = (from.y + to.y) / 2 + normalY - curveBias;
  const pullX = (from.x + to.x) / 2 - normalX * 0.42;
  const pullY = (from.y + to.y) / 2 - normalY * 0.42 + curveBias * 0.26;

  return `M ${from.x} ${from.y} C ${midX} ${midY}, ${pullX} ${pullY}, ${to.x} ${to.y}`;
};

const makeOrbitEnergyPath = (
  agent: CortexNode,
  offset: number,
  bend: number,
) => {
  const dx = CORE_CENTER.x - agent.x;
  const dy = CORE_CENTER.y - agent.y;
  const length = Math.max(Math.hypot(dx, dy), 1);
  const unitX = dx / length;
  const unitY = dy / length;
  const normalX = -unitY * offset;
  const normalY = unitX * offset;
  const startX = agent.x + unitX * 62 + normalX;
  const startY = agent.y + unitY * 62 + normalY;
  const endX = CORE_CENTER.x - unitX * 52 + normalX * 0.16;
  const endY = CORE_CENTER.y - unitY * 52 + normalY * 0.16;
  const control1X = agent.x + unitX * length * 0.38 + normalX * 1.8 + unitY * bend;
  const control1Y = agent.y + unitY * length * 0.38 + normalY * 1.8 - unitX * bend;
  const control2X = agent.x + unitX * length * 0.74 - normalX * 0.62 - unitY * bend * 0.4;
  const control2Y = agent.y + unitY * length * 0.74 - normalY * 0.62 + unitX * bend * 0.4;

  return `M ${startX} ${startY} C ${control1X} ${control1Y}, ${control2X} ${control2Y}, ${endX} ${endY}`;
};

const synapsePaths: SynapsePath[] = cortexLinks.flatMap((link, linkIndex) => {
  const from = nodeById.get(link.from);
  const to = nodeById.get(link.to);

  if (!from || !to) {
    return [];
  }

  const isFuture = from.status === "future" || to.status === "future";
  const pathCount = Math.min(Math.max(link.strength, 6), bundleOffsets.length);
  const start = Math.floor((bundleOffsets.length - pathCount) / 2);

  return bundleOffsets.slice(start, start + pathCount).map((offset, index) => {
    const direction = index % 2 === 0 ? 1 : -1;
    const curveBias = 20 + ((linkIndex + index) % 6) * 12 * direction;

    return {
      id: `synapse-${link.from}-${link.to}-${index}`,
      fromId: link.from,
      toId: link.to,
      d: makePath(from, to, offset, curveBias),
      color: from.color,
      isFuture,
      opacity: isFuture ? 0.07 + index * 0.005 : 0.09 + index * 0.015,
      width: isFuture ? 0.55 : index % 3 === 0 ? 1.15 : 0.72,
      delay: (linkIndex * 0.37 + index * 0.19) % 2.6,
      duration: motionDurations[(linkIndex * 3 + index) % motionDurations.length],
    };
  });
});

const orbitEnergyOffsets = [-22, -8, 8, 22];

const orbitEnergyPaths: OrbitEnergyPath[] = cortexNodes.flatMap((agent, agentIndex) =>
  orbitEnergyOffsets.map((offset, laneIndex) => ({
    id: `orbit-feed-${agent.id}-${laneIndex}`,
    agentId: agent.id,
    d: makeOrbitEnergyPath(
      agent,
      offset,
      (agentIndex % 2 === 0 ? 1 : -1) * (12 + laneIndex * 4),
    ),
    color: agent.color,
    delay: (agentIndex * 1.37 + laneIndex * 0.43) % 6.4,
    duration: 0.82 + ((agentIndex + laneIndex) % 4) * 0.18,
    width: laneIndex % 2 === 0 ? 1.4 : 0.95,
  })),
);

const statusLabel = (agent: Agent) =>
  agent.status === "active"
    ? "Actif"
    : agent.status === "available"
      ? "Disponible"
      : "Futur";

function CortexGlyph({ agent }: { agent: CortexNode }) {
  const strokeWidth = agent.status === "future" ? 1.2 : 1.8;
  const opacity = agent.status === "future" ? 0.58 : 0.96;

  if (agent.glyph === "vision") {
    return (
      <g stroke={agent.color} strokeWidth={1.5} opacity={opacity}>
        <circle cx="0" cy="0" r="21" fill="none" />
        <circle cx="0" cy="0" r="12" fill="none" opacity="0.62" />
        <path d="M 0 -16 L 15 11 H -15 Z" fill="none" />
        <path d="M 0 -22 V -16 M 0 11 V 23" />
      </g>
    );
  }

  if (agent.glyph === "anchor") {
    return (
      <g stroke={agent.color} strokeWidth={1.5} opacity={opacity}>
        <circle cx="0" cy="-18" r="5" fill="none" />
        <path d="M 0 -13 V 17 M -15 -2 H 15" />
        <path d="M -21 9 C -17 24 17 24 21 9" fill="none" />
        <path d="M -21 9 L -14 8 M 21 9 L 14 8" />
      </g>
    );
  }

  if (agent.glyph === "structure") {
    return (
      <g stroke={agent.color} strokeWidth={1.5} opacity={opacity}>
        <path d="M -22 0 H 22 M 0 -22 V 22" />
        <path d="M -15 -15 L 15 15 M 15 -15 L -15 15" opacity="0.74" />
        <path d="M -22 -7 H -7 V -22 M 22 7 H 7 V 22" fill="none" />
        <path d="M -22 7 H -7 V 22 M 22 -7 H 7 V -22" fill="none" opacity="0.55" />
      </g>
    );
  }

  if (agent.glyph === "shield") {
    return (
      <g stroke={agent.color} strokeWidth={1.5} opacity={opacity}>
        <path d="M 0 -23 L 20 -11 V 11 L 0 23 L -20 11 V -11 Z" fill="none" />
        <path d="M 0 -15 L 13 -8 V 8 L 0 15 L -13 8 V -8 Z" fill="none" opacity="0.62" />
        <circle cx="0" cy="0" r="3.5" fill={agent.color} opacity="0.9" />
        <path d="M -26 0 H -20 M 20 0 H 26" />
      </g>
    );
  }

  if (agent.glyph === "prism") {
    return (
      <g stroke={agent.color} strokeWidth={1.5} opacity={opacity}>
        <path d="M -23 0 C -10 -18 10 -18 23 0 C 10 18 -10 18 -23 0 Z" fill="none" />
        <path d="M -16 -10 L 16 10 M -16 10 L 16 -10" />
        <path d="M -4 -17 L 4 17 M -23 0 H 23" opacity="0.58" />
        <circle cx="0" cy="0" r="4" fill="none" />
      </g>
    );
  }

  return (
    <g stroke={agent.color} strokeWidth={strokeWidth} opacity={opacity}>
      <circle cx="0" cy="0" r="18" fill="none" />
    </g>
  );
}

function HudPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-lg border border-white/10 bg-slate-950/55 p-4 shadow-sm backdrop-blur-xl ${className}`}
    >
      {children}
    </section>
  );
}

export function CortexMap() {
  const [activeAgentId, setActiveAgentId] = useState<string | null>(null);
  const activeSynapsePaths = activeAgentId
    ? synapsePaths.filter(
        (synapse) =>
          synapse.fromId === activeAgentId || synapse.toId === activeAgentId,
      )
    : [];

  return (
    <div
      className={`cortex-energy-field overflow-hidden rounded-lg border border-white/10 bg-[#030712] shadow-2xl shadow-black/30 ${
        activeAgentId ? "cortex-is-focused" : ""
      }`}
    >
      <div className="relative min-h-[760px] overflow-hidden bg-[#030712]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(214,180,106,0.16),transparent_32%),radial-gradient(circle_at_72%_48%,rgba(94,234,212,0.12),transparent_28%),radial-gradient(circle_at_28%_50%,rgba(192,132,252,0.13),transparent_30%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,7,18,0.2),rgba(3,7,18,0.92))]" />

        <div className="relative grid gap-4 p-4 lg:grid-cols-[300px_minmax(0,1fr)_300px] xl:grid-cols-[330px_minmax(0,1fr)_330px]">
          <aside className="order-2 grid gap-3 lg:order-none">
            <HudPanel>
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-[#818cf8]/30 bg-[#818cf8]/10">
                  <span className="h-4 w-4 rounded-full border-2 border-[#818cf8]" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase text-slate-50">
                    Énergie du Conseil
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    Session active · Depuis 00:28:47
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                <span className="text-slate-400">Consensus en cours</span>
                <span className="font-semibold text-emerald-300">82%</span>
              </div>
            </HudPanel>

            <HudPanel>
              <p className="text-sm font-semibold uppercase text-slate-50">
                Ondes globales
              </p>
              <svg className="mt-4 h-24 w-full" viewBox="0 0 260 96" aria-hidden="true">
                <path d="M0 50 C24 12 46 80 70 42 S116 22 140 52 S188 78 214 35 S246 46 260 26" fill="none" stroke="#818cf8" strokeWidth="1.5" opacity="0.82" />
                <path d="M0 62 C28 42 44 20 74 54 S124 78 150 36 S196 18 218 58 S246 66 260 42" fill="none" stroke="#7dd3fc" strokeWidth="1.2" opacity="0.7" />
                <path d="M0 36 C30 70 54 10 86 36 S130 66 160 38 S202 68 228 24 S250 34 260 30" fill="none" stroke="#c084fc" strokeWidth="1.1" opacity="0.62" />
                <path d="M0 70 C26 62 56 78 92 52 S142 32 176 56 S224 74 260 50" fill="none" stroke="#5eead4" strokeWidth="1" opacity="0.66" />
              </svg>
            </HudPanel>

            <HudPanel>
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold uppercase text-slate-50">
                  Flux d'énergie
                </p>
                <span className="text-xs font-semibold text-emerald-300">
                  Élevée
                </span>
              </div>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-[#60a5fa] via-[#818cf8] to-[#5eead4]" />
              </div>
            </HudPanel>

            <HudPanel>
              <p className="text-sm font-semibold uppercase text-slate-50">
                Mémoire lumineuse
              </p>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-sm text-slate-400">Synapses actives</span>
                <span className="text-2xl font-semibold text-slate-50">
                  12,458
                </span>
              </div>
            </HudPanel>

            <HudPanel>
              <p className="text-sm font-semibold uppercase text-slate-50">
                Traces ADR
              </p>
              <div className="mt-4 grid gap-3">
                {recentAdrs.map(([id, title, date]) => (
                  <div
                    key={id}
                    className="grid grid-cols-[72px_minmax(0,1fr)_72px] gap-2 text-xs leading-5"
                  >
                    <span className="text-slate-500">{id}</span>
                    <span className="text-slate-300">{title}</span>
                    <span className="text-right text-slate-500">{date}</span>
                  </div>
                ))}
              </div>
            </HudPanel>
          </aside>

          <div className="order-1 min-w-0 lg:order-none">
            <div className="relative min-h-[620px] overflow-hidden rounded-xl border border-white/10 bg-[#030712]">
              <img
                src="/assets/temposystem-butterfly-transparent.png"
                className="absolute h-[88%] w-auto object-contain pointer-events-none select-none"
                aria-hidden="true"
                alt=""
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  opacity: 0.42,
                  filter:
                    'drop-shadow(0 0 18px rgba(99,102,241,0.95)) drop-shadow(0 0 48px rgba(139,92,246,0.8)) drop-shadow(0 0 96px rgba(59,130,246,0.55)) drop-shadow(0 0 180px rgba(168,85,247,0.35))',
                  animation: 'osButterfly 7s ease-in-out infinite',
                }}
              />
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 900 620"
                role="img"
                aria-labelledby="cortex-title cortex-description"
              >
                <title id="cortex-title">Cortex vivant de TEMPOSYSTEM OS</title>
                <desc id="cortex-description">
                  Cartographie SVG dense des fonctions permanentes du Conseil,
                  reliées par des faisceaux synaptiques et des influx lumineux.
                </desc>
                <defs>
                  <radialGradient id="cortex-glow" cx="50%" cy="48%" r="66%">
                    <stop offset="0%" stopColor="#172554" stopOpacity="0.76" />
                    <stop offset="48%" stopColor="#07101d" stopOpacity="0.72" />
                    <stop offset="100%" stopColor="#030712" stopOpacity="0" />
                  </radialGradient>
                  <filter id="cortex-soft-glow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur stdDeviation="26" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="1 0 0 0 0 0 1 0 0 0.04 0 0 1 0 0.14 0 0 0 1 0"
                    />
                  </filter>
                  <filter id="cortex-node-glow" x="-80%" y="-80%" width="260%" height="260%">
                    <feGaussianBlur stdDeviation="6" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <filter id="cortex-photon-glow" x="-120%" y="-120%" width="340%" height="340%">
                    <feGaussianBlur stdDeviation="2.8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <radialGradient id="core-decision-wave" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f8fafc" stopOpacity="0.32" />
                    <stop offset="42%" stopColor="#818cf8" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#5eead4" stopOpacity="0" />
                  </radialGradient>
                  <radialGradient id="core-inner-light" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#facc15" stopOpacity="1" />
                    <stop offset="34%" stopColor="#fff1a8" stopOpacity="1" />
                    <stop offset="66%" stopColor="#ffffff" stopOpacity="0.98" />
                    <stop offset="100%" stopColor="#fff7cc" stopOpacity="0.9" />
                  </radialGradient>
                  <radialGradient id="core-solar-heart" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#facc15" stopOpacity="1" />
                    <stop offset="36%" stopColor="#fff1a8" stopOpacity="0.92" />
                    <stop offset="70%" stopColor="#ffffff" stopOpacity="0.38" />
                    <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
                  </radialGradient>
                  <filter id="cortex-core-glow" x="-140%" y="-140%" width="380%" height="380%">
                    <feGaussianBlur stdDeviation="8" result="blur" />
                    <feColorMatrix
                      in="blur"
                      type="matrix"
                      values="1 0 0 0 0.18 0 1 0 0 0.12 0 0 1 0 0.02 0 0 0 1 0"
                    />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                <circle cx="450" cy="320" r="326" fill="url(#cortex-glow)" />

                <g className="cognitive-space" aria-hidden="true">
                  <ellipse
                    className="energy-orbit-ring energy-orbit-ring-1"
                    cx="450"
                    cy="320"
                    rx="322"
                    ry="214"
                    fill="none"
                    stroke="#818cf8"
                    strokeOpacity="0.13"
                    strokeWidth="0.8"
                  />
                  <ellipse
                    className="energy-orbit-ring energy-orbit-ring-2"
                    cx="450"
                    cy="320"
                    rx="274"
                    ry="182"
                    fill="none"
                    stroke="#7dd3fc"
                    strokeOpacity="0.11"
                    strokeWidth="0.7"
                  />
                  <ellipse
                    className="energy-orbit-ring energy-orbit-ring-3"
                    cx="450"
                    cy="320"
                    rx="224"
                    ry="150"
                    fill="none"
                    stroke="#f0a6d5"
                    strokeOpacity="0.1"
                    strokeWidth="0.7"
                  />
                  <path
                    className="energy-nebula-line"
                    d="M118 392 C236 270 336 350 454 238 S666 128 792 262"
                    fill="none"
                    stroke="#fff7cc"
                    strokeOpacity="0.09"
                    strokeWidth="0.7"
                  />
                  <path
                    className="energy-nebula-line energy-nebula-line-2"
                    d="M98 240 C230 110 350 232 478 178 S656 84 806 188"
                    fill="none"
                    stroke="#5eead4"
                    strokeOpacity="0.08"
                    strokeWidth="0.6"
                  />
                </g>

                <g className="cortex-atmosphere" filter="url(#cortex-soft-glow)" opacity="0.82">
                  <path d="M64 365 C138 148 302 78 448 108 S728 204 814 334 S640 546 424 520 S40 492 64 365" fill="#1e40af" opacity="0.24" />
                  <path d="M132 136 C230 70 386 88 500 160 S698 188 752 302 S632 442 486 408 S268 474 172 354 S34 218 132 136" fill="#06b6d4" opacity="0.18" />
                  <path d="M276 394 C356 274 540 246 650 330 S558 500 410 468 S194 486 276 394" fill="#ec4899" opacity="0.18" />
                  <path d="M320 86 C430 18 518 74 560 154 S408 220 332 176 S226 144 320 86" fill="#818cf8" opacity="0.2" />
                </g>

                <g opacity="0.44">
                  {tissuePaths.map((path, index) => (
                    <path
                      key={path}
                      d={path}
                      fill="none"
                      stroke={index % 2 === 0 ? "#38bdf8" : "#818cf8"}
                      strokeOpacity={index % 2 === 0 ? 0.12 : 0.1}
                      strokeWidth={index % 2 === 0 ? 0.8 : 0.58}
                    />
                  ))}
                </g>

                <g>
                  {backgroundSynapses.map((synapse, index) => (
                    <path
                      key={`${synapse.d}-${index}`}
                      d={synapse.d}
                      fill="none"
                      stroke={synapse.color}
                      strokeLinecap="round"
                      strokeOpacity={synapse.opacity}
                      strokeWidth={synapse.width}
                    />
                  ))}
                </g>

                <g>
                  {cortexSparks.map((spark, index) => (
                    <circle
                      key={`${spark.x}-${spark.y}-${index}`}
                      className="cortex-spark"
                      cx={spark.x}
                      cy={spark.y}
                      r={spark.r}
                      fill={spark.color}
                      opacity={spark.opacity}
                    >
                      <animate
                        attributeName="opacity"
                        values={`${spark.opacity};${Math.min(spark.opacity + 0.36, 0.86)};${spark.opacity}`}
                        dur={`${pulseDurations[index % pulseDurations.length]}s`}
                        begin={`${(index % 12) * 0.13}s`}
                        repeatCount="indefinite"
                      />
                    </circle>
                  ))}
                </g>

                <g className="cognitive-system-orbit">
                <g>
                  {synapsePaths.map((synapse) => (
                    <path
                      key={synapse.id}
                      id={synapse.id}
                      d={synapse.d}
                      fill="none"
                      stroke={synapse.color}
                      strokeLinecap="round"
                      strokeOpacity={synapse.opacity}
                      strokeWidth={synapse.width}
                    />
                  ))}
                </g>

                <g>
                  {synapsePaths
                    .filter((synapse) => !synapse.isFuture)
                    .filter((_, index) => index % 2 === 0)
                    .map((synapse, index) => (
                      <path
                        key={`${synapse.id}-flux`}
                        d={synapse.d}
                        fill="none"
                        stroke={synapse.color}
                        strokeLinecap="round"
                        strokeWidth={index % 3 === 0 ? 2 : 1.35}
                        className={`cortex-flow ${
                          index % 4 === 0 ? "cortex-flow-hot" : "cortex-flow-cool"
                        }`}
                        style={{ animationDelay: `${synapse.delay}s` }}
                      />
                    ))}
                </g>

                <g filter="url(#cortex-photon-glow)">
                  {synapsePaths
                    .filter((synapse) => !synapse.isFuture)
                    .map((synapse, index) => (
                      <circle
                        key={`${synapse.id}-photon`}
                        r={index % 4 === 0 ? 2.8 : 1.8}
                        fill={synapse.color}
                        opacity={index % 5 === 0 ? 0.92 : 0.64}
                        className="cortex-photon"
                      >
                        <animateMotion
                          dur={`${synapse.duration}s`}
                          begin={`${synapse.delay}s`}
                          repeatCount="indefinite"
                          path={synapse.d}
                        />
                      </circle>
                    ))}
                  {synapsePaths
                    .filter((synapse) => !synapse.isFuture)
                    .filter((_, index) => index % 2 === 0)
                    .map((synapse, index) => (
                      <circle
                        key={`${synapse.id}-reverse-photon`}
                        r={index % 3 === 0 ? 2.3 : 1.35}
                        fill={index % 2 === 0 ? "#818cf8" : synapse.color}
                        opacity={index % 5 === 0 ? 0.78 : 0.5}
                        className="cortex-photon"
                      >
                        <animateMotion
                          dur={`${motionDurations[(index + 5) % motionDurations.length]}s`}
                          begin={`${(synapse.delay + 0.47) % 2.9}s`}
                          repeatCount="indefinite"
                          path={synapse.d}
                          keyPoints="1;0"
                          keyTimes="0;1"
                          calcMode="linear"
                        />
                      </circle>
                    ))}
                  {synapsePaths
                    .filter((synapse) => !synapse.isFuture)
                    .filter((_, index) => index % 3 === 0)
                    .map((synapse, index) => (
                      <circle
                        key={`${synapse.id}-deep-photon`}
                        r="1.05"
                        fill="#f8fafc"
                        opacity="0.42"
                        className="cortex-photon"
                      >
                        <animateMotion
                          dur={`${motionDurations[(index + 9) % motionDurations.length] + 1.8}s`}
                          begin={`${(synapse.delay + 1.11) % 3.4}s`}
                          repeatCount="indefinite"
                          path={synapse.d}
                        />
                      </circle>
                    ))}
                </g>

                {activeAgentId ? (
                  <g className="cortex-convergence" filter="url(#cortex-photon-glow)">
                    {activeSynapsePaths.map((synapse, index) => (
                      <path
                        key={`${synapse.id}-converge`}
                        d={synapse.d}
                        fill="none"
                        stroke={synapse.color}
                        strokeLinecap="round"
                        strokeWidth={index % 2 === 0 ? 3.2 : 2.2}
                        className="cortex-converge-flow"
                        style={{ animationDelay: `${index * 0.08}s` }}
                      />
                    ))}
                  </g>
                ) : null}
                </g>

                <g
                  className="orbit-energy-system"
                  filter="url(#cortex-photon-glow)"
                  aria-hidden="true"
                >
                  <g className="orbit-feed-threads">
                    {orbitEnergyPaths.map((feed) => (
                      <path
                        key={`${feed.id}-thread`}
                        d={feed.d}
                        fill="none"
                        stroke={feed.color}
                        strokeLinecap="round"
                        strokeOpacity="0.11"
                        strokeWidth="0.72"
                      />
                    ))}
                  </g>

                  <g className="orbit-feed-independent">
                    {orbitEnergyPaths.map((feed, index) => (
                      <path
                        key={`${feed.id}-wave`}
                        d={feed.d}
                        fill="none"
                        stroke="#f8fafc"
                        strokeLinecap="round"
                        strokeWidth={feed.width}
                        className={`orbit-feed-wave orbit-feed-wave-${index % 3}`}
                        style={{
                          animationDelay: `${feed.delay}s`,
                          animationDuration: `${feed.duration}s`,
                        }}
                      />
                    ))}
                  </g>

                  <g className="orbit-feed-bursts">
                    {orbitEnergyPaths.map((feed, index) => (
                      <path
                        key={`${feed.id}-burst`}
                        d={feed.d}
                        fill="none"
                        stroke={index % 2 === 0 ? "#ffffff" : "#fff7cc"}
                        strokeLinecap="round"
                        strokeWidth={index % 2 === 0 ? 4.2 : 2.8}
                        className="orbit-feed-burst"
                        style={{ animationDelay: `${(index % 4) * 0.025}s` }}
                      />
                    ))}
                  </g>

                  <g className="orbit-feed-particles">
                    {orbitEnergyPaths.flatMap((feed, index) =>
                      [0, 1].map((packet) => {
                        const duration = feed.duration + packet * 0.24;
                        const begin = feed.delay + packet * 0.31 + (index % 3) * 0.08;

                        return (
                          <circle
                            key={`${feed.id}-particle-${packet}`}
                            className="orbit-feed-particle"
                            r={packet === 0 ? 2.2 : 1.35}
                            fill={packet === 0 ? "#ffffff" : "#fff7cc"}
                          >
                            <animateMotion
                              dur={`${duration}s`}
                              begin={`${begin}s`}
                              repeatCount="indefinite"
                              path={feed.d}
                            />
                            <animate
                              attributeName="opacity"
                              values="0;0.92;0.28;0"
                              keyTimes="0;0.18;0.62;1"
                              dur={`${duration}s`}
                              begin={`${begin}s`}
                              repeatCount="indefinite"
                            />
                          </circle>
                        );
                      }),
                    )}
                  </g>

                  <g className="orbit-feed-burst-particles">
                    {orbitEnergyPaths.map((feed, index) => (
                      <circle
                        key={`${feed.id}-burst-particle`}
                        className="orbit-feed-burst-particle"
                        r={index % 2 === 0 ? 2.8 : 2.1}
                        fill="#ffffff"
                      >
                        <animateMotion
                          dur="11.9s"
                          repeatCount="indefinite"
                          path={feed.d}
                          keyPoints="0;0;1;1"
                          keyTimes="0;0.7;0.82;1"
                          calcMode="linear"
                        />
                        <animate
                          attributeName="opacity"
                          values="0;0;1;0.72;0"
                          keyTimes="0;0.68;0.73;0.82;1"
                          dur="11.9s"
                          repeatCount="indefinite"
                        />
                        <animate
                          attributeName="r"
                          values="1;1;3.4;2.2;1"
                          keyTimes="0;0.68;0.73;0.82;1"
                          dur="11.9s"
                          repeatCount="indefinite"
                        />
                      </circle>
                    ))}
                  </g>
                </g>

                <g className="core-scale">
                  <g className="core-overdrive">
                    <g className="core-pulsar" filter="url(#cortex-core-glow)">
                      <g className="core-self-rotor">
                      <circle
                        className="core-decision-wave"
                        cx="450"
                        cy="320"
                        r="34"
                        fill="url(#core-decision-wave)"
                      />
                      <circle
                        className="core-solar-aura-wide"
                        cx="450"
                        cy="320"
                        r="118"
                        fill="url(#core-solar-heart)"
                      />
                      <circle
                        className="core-solar-aura"
                        cx="450"
                        cy="320"
                        r="78"
                        fill="url(#core-solar-heart)"
                      />
                      <g
                        className="core-solar-rays"
                        fill="none"
                        stroke="#c4b5fd"
                        strokeLinecap="round"
                      >
                        <path
                          className="solar-spiral solar-spiral-1"
                          d="M450 246 C476 250 492 270 490 296 C488 327 516 343 548 336"
                        />
                        <path
                          className="solar-spiral solar-spiral-2"
                          d="M503 268 C516 291 509 317 486 332 C460 349 464 381 490 405"
                        />
                        <path
                          className="solar-spiral solar-spiral-3"
                          d="M524 320 C510 344 486 353 462 342 C433 328 407 350 406 386"
                        />
                        <path
                          className="solar-spiral solar-spiral-4"
                          d="M503 372 C477 375 456 360 452 334 C447 302 416 294 386 313"
                        />
                        <path
                          className="solar-spiral solar-spiral-5"
                          d="M450 394 C424 389 408 368 411 342 C414 311 386 295 352 302"
                        />
                        <path
                          className="solar-spiral solar-spiral-6"
                          d="M397 372 C383 349 391 323 413 308 C440 289 435 258 409 235"
                        />
                        <path
                          className="solar-spiral solar-spiral-7"
                          d="M376 320 C390 296 414 287 438 298 C467 311 493 290 494 254"
                        />
                        <path
                          className="solar-spiral solar-spiral-8"
                          d="M397 268 C424 265 444 280 448 306 C453 338 484 346 514 327"
                        />
                        <g className="solar-fireworks" fill="#fff7cc">
                          <circle className="solar-spark solar-spark-1" cx="548" cy="336" r="1.8" />
                          <circle className="solar-spark solar-spark-2" cx="490" cy="405" r="1.45" />
                          <circle className="solar-spark solar-spark-3" cx="406" cy="386" r="1.65" />
                          <circle className="solar-spark solar-spark-4" cx="386" cy="313" r="1.35" />
                          <circle className="solar-spark solar-spark-5" cx="352" cy="302" r="1.7" />
                          <circle className="solar-spark solar-spark-6" cx="409" cy="235" r="1.4" />
                          <circle className="solar-spark solar-spark-7" cx="494" cy="254" r="1.55" />
                          <circle className="solar-spark solar-spark-8" cx="514" cy="327" r="1.35" />
                        </g>
                      </g>
                      <circle cx="450" cy="320" r="62" fill="#ffffff" opacity="0.88" />
                      <circle
                        className="core-solar-fill"
                        cx="450"
                        cy="320"
                        r="48"
                        fill="url(#core-inner-light)"
                        stroke="#818cf8"
                        strokeOpacity="0.76"
                        strokeWidth="1.4"
                      />
                      <circle
                        className="inner-temporal-ring"
                        cx="450"
                        cy="320"
                        r="34"
                        fill="none"
                        stroke="#818cf8"
                        strokeOpacity="0.78"
                        strokeWidth="1.2"
                        strokeDasharray="5 7"
                      />
                      <circle
                        className="outer-temporal-ring"
                        cx="450"
                        cy="320"
                        r="42"
                        fill="none"
                        stroke="#7dd3fc"
                        strokeOpacity="0.42"
                        strokeWidth="1.1"
                        strokeDasharray="2 9"
                      />
                      <circle
                        cx="450"
                        cy="320"
                        r="24"
                        fill="none"
                        stroke="#f8fafc"
                        strokeOpacity="0.12"
                        strokeWidth="0.8"
                      />
                      <g
                        className="core-filaments"
                        stroke="#d97706"
                        strokeWidth="3.1"
                        strokeLinecap="round"
                      >
                        <line className="filament-1" x1="434" y1="307" x2="434" y2="333" />
                        <line className="filament-2" x1="442" y1="302" x2="442" y2="338" />
                        <line className="filament-3" x1="450" y1="298" x2="450" y2="342" />
                        <line className="filament-4" x1="458" y1="302" x2="458" y2="338" />
                        <line className="filament-5" x1="466" y1="307" x2="466" y2="333" />
                      </g>
                      </g>
                    </g>
                  </g>
                </g>

                <g className="cognitive-system-orbit">
                {cortexNodes.map((agent) => {
                  const isActive = activeAgentId === agent.id;
                  const isDimmed = Boolean(activeAgentId && !isActive);

                  return (
                    <g
                      key={agent.id}
                      transform={`translate(${agent.x} ${agent.y})`}
                      className={`${agent.status === "future" ? "cortex-node-future" : "cortex-node"} ${
                        isActive ? "cortex-node-active" : ""
                      } ${isDimmed ? "cortex-node-dimmed" : ""}`}
                      filter={agent.status === "future" ? undefined : "url(#cortex-node-glow)"}
                      role="img"
                      aria-label={`${agent.name} : ${agent.subtitle}`}
                      tabIndex={0}
                      onMouseEnter={() => setActiveAgentId(agent.id)}
                      onMouseLeave={() => setActiveAgentId(null)}
                      onFocus={() => setActiveAgentId(agent.id)}
                      onBlur={() => setActiveAgentId(null)}
                    >
                    <circle
                      className="agent-orbit-aura"
                      r={agent.status === "future" ? 42 : 68}
                      fill="none"
                      stroke={agent.color}
                      strokeOpacity={agent.status === "future" ? 0.12 : 0.24}
                      strokeWidth={agent.status === "future" ? 0.8 : 1.2}
                    />
                    <circle r={agent.status === "future" ? 34 : 56} fill={agent.color} opacity={agent.status === "future" ? 0.07 : 0.16} />
                    <circle r={agent.status === "future" ? 25 : 39} fill="#030712" stroke={agent.color} strokeOpacity={agent.status === "future" ? 0.52 : 0.94} strokeWidth={agent.status === "future" ? 1.2 : 1.7} />
                    <circle r={agent.status === "future" ? 16 : 23} fill="none" stroke={agent.color} strokeOpacity={agent.status === "future" ? 0.24 : 0.48} strokeWidth="0.8" strokeDasharray="3 5" />
                    <CortexGlyph agent={agent} />
                    <text
                      x="0"
                      y={agent.labelY}
                      textAnchor="middle"
                      className="cortex-label fill-white text-[13px] font-bold uppercase tracking-[0.1em]"
                      stroke="#020617"
                      strokeWidth="3"
                      paintOrder="stroke"
                    >
                      {agent.name}
                    </text>
                    <text
                      x="0"
                      y={agent.labelY + 17}
                      textAnchor="middle"
                      className="cortex-label fill-slate-100 text-[10px] font-medium"
                      stroke="#020617"
                      strokeWidth="2.2"
                      paintOrder="stroke"
                    >
                      {agent.subtitle}
                    </text>
                  </g>
                  );
                })}
                </g>
              </svg>

              <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-slate-950/70 px-3 py-1.5 text-xs font-medium uppercase text-slate-400 backdrop-blur">
                TEMPOSYSTEM_IS_ENERGY // COGNITIVE_STAR
              </div>

            </div>
          </div>

          <aside className="order-3 grid gap-3 lg:order-none">
            <HudPanel className="border-[#818cf8]/20 bg-slate-950/70">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase text-[#818cf8]">
                    Impulsion en cours
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-100">
                    Quelle priorité pour le prochain jalon système ?
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-xs font-semibold text-emerald-100">
                  82%
                </span>
              </div>
              <div className="mt-4 grid gap-2">
                {[
                  ["Performance", "12%"],
                  ["Gouvernance", "18%"],
                  ["Ouverture", "82%"],
                  ["Sécurité", "8%"],
                ].map(([option, score]) => (
                  <div
                    key={option}
                    className={`grid grid-cols-[minmax(0,1fr)_44px] items-center gap-3 rounded-md border px-3 py-2 text-xs ${
                      option === "Ouverture"
                        ? "border-[#818cf8]/70 bg-[#818cf8]/15 text-[#c4b5fd]"
                        : "border-white/10 bg-white/[0.04] text-slate-400"
                    }`}
                  >
                    <span>{option}</span>
                    <span className="text-right font-semibold">{score}</span>
                  </div>
                ))}
              </div>
            </HudPanel>

            <HudPanel>
              <p className="text-sm font-semibold uppercase text-slate-50">
                Photons en circulation
              </p>
              <div className="mt-4 grid gap-3">
                {fluxEvents.map((event) => (
                  <div
                    key={`${event.label}-${event.time}`}
                    className="grid grid-cols-[14px_minmax(0,1fr)_58px] gap-2 border-b border-white/5 pb-3 last:border-b-0 last:pb-0"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 rounded-full shadow-[0_0_14px_currentColor]"
                      style={{ color: event.color, backgroundColor: event.color }}
                    />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-200">
                        {event.label}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {event.detail}
                      </p>
                    </div>
                    <span className="text-right text-xs text-slate-500">
                      {event.time}
                    </span>
                  </div>
                ))}
              </div>
            </HudPanel>

            <HudPanel>
              <p className="text-sm font-semibold uppercase text-slate-50">
                État énergétique
              </p>
              <div className="mt-4 grid gap-2">
                {systemRows.map(([label, state, color]) => (
                  <div
                    key={label}
                    className="grid grid-cols-[14px_minmax(0,1fr)_96px] gap-2 text-sm"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 rounded-full shadow-[0_0_12px_currentColor]"
                      style={{ color, backgroundColor: color }}
                    />
                    <span className="text-slate-400">{label}</span>
                    <span className="text-right font-medium" style={{ color }}>
                      {state}
                    </span>
                  </div>
                ))}
              </div>
            </HudPanel>

            <HudPanel>
              <p className="text-sm font-semibold uppercase text-slate-50">
                Constellations reliées
              </p>
              <div className="mt-4 grid gap-2">
                {networkStats.map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-slate-500">{label}</span>
                    <span className="font-medium text-slate-200">{value}</span>
                  </div>
                ))}
              </div>
              <svg className="mt-4 h-28 w-full rounded-md bg-white/[0.025]" viewBox="0 0 260 112" aria-hidden="true">
                <path d="M18 78 C58 34 92 96 132 56 S204 20 242 78" fill="none" stroke="#5eead4" strokeOpacity="0.3" />
                <path d="M26 88 C74 58 96 40 128 72 S194 98 236 52" fill="none" stroke="#818cf8" strokeOpacity="0.26" />
                <circle cx="132" cy="64" r="12" fill="#5eead4" opacity="0.12" />
                <circle cx="132" cy="64" r="4" fill="#5eead4" opacity="0.72" />
                <circle cx="205" cy="40" r="3" fill="#818cf8" opacity="0.7" />
                <circle cx="58" cy="70" r="3" fill="#7dd3fc" opacity="0.68" />
              </svg>
            </HudPanel>
          </aside>
        </div>
      </div>
    </div>
  );
}
