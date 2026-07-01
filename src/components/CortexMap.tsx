import { crewAgents } from "../config/agents";
import type { Agent } from "../types";
import { useState, type ReactNode } from "react";
import { useLang } from "../lib/lang";

const cortexCopy = {
  energyTitle: { fr: "Énergie du Conseil", en: "Council energy" },
  sessionSince: { fr: "Session active · Depuis", en: "Active session · Since" },
  consensusInProgress: { fr: "Consensus en cours", en: "Consensus in progress" },
  globalWaves: { fr: "Ondes globales", en: "Global waves" },
  energyFlow: { fr: "Flux d'énergie", en: "Energy flow" },
  high: { fr: "Élevée", en: "High" },
  luminousMemory: { fr: "Mémoire lumineuse", en: "Luminous memory" },
  activeSynapses: { fr: "Synapses actives", en: "Active synapses" },
  adrTraces: { fr: "Traces ADR", en: "ADR traces" },
  legendCaption: { fr: "Légende des neuf orbites TEMPOSYSTEM", en: "Legend of the nine TEMPOSYSTEM orbits" },
  thRole: { fr: "Rôle", en: "Role" },
  thMission: { fr: "Mission", en: "Mission" },
  thCrew: { fr: "Équipage", en: "Crew" },
  impulseInProgress: { fr: "Impulsion en cours", en: "Current impulse" },
  impulseQuestion: { fr: "Quelle priorité pour le prochain jalon système ?", en: "Which priority for the next system milestone?" },
  photonsCirculating: { fr: "Photons en circulation", en: "Photons in circulation" },
  energyState: { fr: "État énergétique", en: "Energy state" },
  linkedConstellations: { fr: "Constellations reliées", en: "Linked constellations" },
} as const;

const impulseOptions = [
  { label: { fr: "Performance", en: "Performance" }, score: "12%", highlight: false },
  { label: { fr: "Gouvernance", en: "Governance" }, score: "18%", highlight: false },
  { label: { fr: "Ouverture", en: "Openness" }, score: "82%", highlight: true },
  { label: { fr: "Sécurité", en: "Security" }, score: "8%", highlight: false },
];

type CortexVisual = {
  x: number;
  y: number;
  color: string;
  glyph:
    | "vision"
    | "helm"
    | "structure"
    | "shield"
    | "prism"
    | "map"
    | "horizon"
    | "ethics"
    | "message";
  labelY: number;
  roleLabel: string;
  crewLabel: string;
  mission: string;
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
    y: 74,
    color: "#818cf8",
    glyph: "vision",
    labelY: 78,
    roleLabel: "Vision",
    crewLabel: "Capitaine",
    mission: "Porte la vision et fixe le cap.",
    subtitle: "Capitaine",
  },
  helmsman: {
    x: 649,
    y: 132,
    color: "#5eead4",
    glyph: "helm",
    labelY: 74,
    roleLabel: "Cohérence",
    crewLabel: "Timonnier",
    mission:
      "Veille à la cohérence de l'ensemble et aide à garder le cap malgré les tempêtes.",
    subtitle: "Timonnier",
  },
  "master-illuminator": {
    x: 755,
    y: 277,
    color: "#7dd3fc",
    glyph: "prism",
    labelY: 74,
    roleLabel: "Graphisme",
    crewLabel: "Enlumineur",
    mission:
      "Donne une identité visuelle au projet, rend les idées lisibles, inspirantes et accessibles.",
    subtitle: "Enlumineur",
  },
  ambassador: {
    x: 718,
    y: 443,
    color: "#38bdf8",
    glyph: "message",
    labelY: -78,
    roleLabel: "Communication",
    crewLabel: "Messager",
    mission:
      "Fait circuler les idées, relie les intelligences et facilite le dialogue entre les humains, les territoires et les agents.",
    subtitle: "Messager",
  },
  "master-carpenter": {
    x: 556,
    y: 551,
    color: "#c084fc",
    glyph: "structure",
    labelY: -78,
    roleLabel: "Construction",
    crewLabel: "Charpentier",
    mission:
      "Conçoit, construit et fait évoluer l'infrastructure pour qu'elle traverse les décennies.",
    subtitle: "Charpentier",
  },
  "master-caulker": {
    x: 344,
    y: 551,
    color: "#f59e0b",
    glyph: "shield",
    labelY: -78,
    roleLabel: "Protection",
    crewLabel: "Calfat",
    mission:
      "Protège, répare, audite et renforce le système avant que les failles n'apparaissent.",
    subtitle: "Calfat",
  },
  chancellor: {
    x: 182,
    y: 443,
    color: "#f472b6",
    glyph: "ethics",
    labelY: -78,
    roleLabel: "Éthique",
    crewLabel: "Gardien",
    mission:
      "Veille au respect des principes fondateurs et questionne les décisions pour préserver le sens du projet.",
    subtitle: "Gardien",
  },
  cartographer: {
    x: 145,
    y: 277,
    color: "#a3e635",
    glyph: "map",
    labelY: 74,
    roleLabel: "Connaissance",
    crewLabel: "Cartographe",
    mission:
      "Observe, documente et relie les connaissances afin de construire la mémoire du TempoSystem.",
    subtitle: "Cartographe",
  },
  lookout: {
    x: 251,
    y: 132,
    color: "#fb7185",
    glyph: "horizon",
    labelY: 74,
    roleLabel: "Anticipation",
    crewLabel: "Vigie",
    mission:
      "Observe l'horizon, détecte les évolutions, les risques et les opportunités.",
    subtitle: "Vigie",
  },
};

const cortexLinks: CortexLink[] = [
  { from: "captain", to: "helmsman", strength: 9 },
  { from: "helmsman", to: "master-illuminator", strength: 9 },
  { from: "master-illuminator", to: "ambassador", strength: 9 },
  { from: "ambassador", to: "master-carpenter", strength: 9 },
  { from: "master-carpenter", to: "master-caulker", strength: 9 },
  { from: "master-caulker", to: "chancellor", strength: 9 },
  { from: "chancellor", to: "cartographer", strength: 9 },
  { from: "cartographer", to: "lookout", strength: 9 },
  { from: "lookout", to: "captain", strength: 9 },
  { from: "captain", to: "master-carpenter", strength: 7 },
  { from: "captain", to: "chancellor", strength: 7 },
  { from: "helmsman", to: "master-caulker", strength: 7 },
  { from: "helmsman", to: "cartographer", strength: 7 },
  { from: "master-illuminator", to: "cartographer", strength: 7 },
  { from: "ambassador", to: "lookout", strength: 7 },
  { from: "master-carpenter", to: "cartographer", strength: 7 },
  { from: "master-caulker", to: "ambassador", strength: 7 },
  { from: "chancellor", to: "ambassador", strength: 7 },
];

const fluxEvents = [
  {
    color: "#5eead4",
    label: "Timonnier -> Capitaine",
    detail: { fr: "Cohérence du cap", en: "Course coherence" },
    time: "14:31:58",
  },
  {
    color: "#c084fc",
    label: "Charpentier -> Calfat",
    detail: { fr: "Analyse d'impact", en: "Impact analysis" },
    time: "14:31:56",
  },
  {
    color: "#a3e635",
    label: "Cartographe -> Tous",
    detail: { fr: "Mémoire TempoSystem", en: "TempoSystem memory" },
    time: "14:31:54",
  },
  {
    color: "#7dd3fc",
    label: "Enlumineur -> Charpentier",
    detail: { fr: "Signal UX structure", en: "UX structure signal" },
    time: "14:31:52",
  },
  {
    color: "#818cf8",
    label: "Capitaine -> Tous",
    detail: { fr: "Point de synchronisation", en: "Synchronization point" },
    time: "14:31:50",
  },
];

const systemRows = [
  { label: { fr: "Conseil de Bord", en: "Bridge Council" }, state: { fr: "Opérationnel", en: "Operational" }, color: "#86efac" },
  { label: { fr: "Mémoire", en: "Memory" }, state: { fr: "Synchronisée", en: "Synchronized" }, color: "#86efac" },
  { label: { fr: "Gouvernance", en: "Governance" }, state: { fr: "Active", en: "Active" }, color: "#86efac" },
  { label: { fr: "Applications", en: "Applications" }, state: { fr: "1 active", en: "1 active" }, color: "#86efac" },
  { label: { fr: "Timonier", en: "Helmsman" }, state: { fr: "Prototype", en: "Prototype" }, color: "#facc15" },
  { label: { fr: "API IA", en: "AI API" }, state: { fr: "En attente", en: "Pending" }, color: "#facc15" },
];

const recentAdrs = [
  { id: "ADR-0010", title: { fr: "TEMPOSYSTEM is energy", en: "TEMPOSYSTEM is energy" }, date: "29/06/2026" },
  { id: "ADR-0009", title: { fr: "Cortex énergétique", en: "Energy Cortex" }, date: "29/06/2026" },
  { id: "ADR-0008", title: { fr: "Interface vivante", en: "Living interface" }, date: "29/06/2026" },
];

const networkStats = [
  { label: { fr: "Humains", en: "Humans" }, value: "12" },
  { label: { fr: "Orbites", en: "Orbits" }, value: "9" },
  { label: { fr: "Projets", en: "Projects" }, value: "4" },
  { label: { fr: "Territoires", en: "Territories" }, value: "2" },
];

const energyOrbitRings = [
  { rx: 334, ry: 222, color: "#d6b46a" },
  { rx: 310, ry: 206, color: "#5eead4" },
  { rx: 286, ry: 190, color: "#7dd3fc" },
  { rx: 262, ry: 174, color: "#38bdf8" },
  { rx: 238, ry: 158, color: "#c084fc" },
  { rx: 214, ry: 142, color: "#f59e0b" },
  { rx: 190, ry: 126, color: "#f472b6" },
  { rx: 166, ry: 110, color: "#a3e635" },
  { rx: 142, ry: 94, color: "#fb7185" },
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

const cortexLegendOrder = [
  "captain",
  "helmsman",
  "master-carpenter",
  "master-caulker",
  "master-illuminator",
  "cartographer",
  "lookout",
  "chancellor",
  "ambassador",
];

const cortexLegendRows = cortexLegendOrder
  .map((id) => cortexNodes.find((node) => node.id === id))
  .filter((node): node is CortexNode => Boolean(node));

const nodeById = new Map(cortexNodes.map((node) => [node.id, node]));

const bundleOffsets = [-72, -54, -38, -24, -12, 0, 12, 24, 38, 54, 72];
const motionDurations = [1.2, 3.7, 0.8, 5.4, 2.6, 4.9, 1.6, 6.1, 2.1, 3.3, 0.95, 4.2];
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

  const isFuture = false;
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

  if (agent.glyph === "helm") {
    return (
      <g stroke={agent.color} strokeWidth={1.5} opacity={opacity}>
        <circle cx="0" cy="0" r="21" fill="none" />
        <circle cx="0" cy="0" r="7" fill="none" opacity="0.72" />
        <path d="M 0 -26 V -14 M 0 14 V 26 M -26 0 H -14 M 14 0 H 26" />
        <path d="M -18 -18 L -10 -10 M 18 -18 L 10 -10 M -18 18 L -10 10 M 18 18 L 10 10" />
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

  if (agent.glyph === "map") {
    return (
      <g stroke={agent.color} strokeWidth={1.5} opacity={opacity}>
        <path d="M -24 -17 L -8 -22 L 8 -17 L 24 -22 V 17 L 8 22 L -8 17 L -24 22 Z" fill="none" />
        <path d="M -8 -22 V 17 M 8 -17 V 22" />
        <path d="M -18 -6 C -10 -11 -3 -10 5 -5 S17 0 21 -5" fill="none" opacity="0.72" />
        <circle cx="-12" cy="8" r="2.8" fill={agent.color} opacity="0.9" />
        <circle cx="13" cy="-8" r="2.2" fill="none" />
      </g>
    );
  }

  if (agent.glyph === "horizon") {
    return (
      <g stroke={agent.color} strokeWidth={1.5} opacity={opacity}>
        <path d="M -25 9 C -12 1 12 1 25 9" fill="none" />
        <path d="M -20 18 H 20 M -12 24 H 12" opacity="0.72" />
        <path d="M 0 -23 V -8 M -14 -15 L -5 -7 M 14 -15 L 5 -7" />
        <circle cx="0" cy="-3" r="5" fill="none" />
        <path d="M -7 -3 H -23 M 7 -3 H 23" opacity="0.58" />
      </g>
    );
  }

  if (agent.glyph === "ethics") {
    return (
      <g stroke={agent.color} strokeWidth={1.5} opacity={opacity}>
        <path d="M 0 -24 V 23 M -17 -13 H 17 M -12 23 H 12" />
        <path d="M -17 -13 L -27 6 H -7 Z M 17 -13 L 7 6 H 27 Z" fill="none" />
        <path d="M -24 8 C -20 13 -14 13 -10 8 M 10 8 C 14 13 20 13 24 8" fill="none" />
        <circle cx="0" cy="-13" r="3.5" fill={agent.color} opacity="0.86" />
      </g>
    );
  }

  if (agent.glyph === "message") {
    return (
      <g stroke={agent.color} strokeWidth={1.5} opacity={opacity}>
        <path d="M -24 -15 H 24 V 9 H 6 L -5 20 V 9 H -24 Z" fill="none" />
        <path d="M -14 -5 H 14 M -14 3 H 7" />
        <circle cx="-20" cy="20" r="2.8" fill={agent.color} opacity="0.88" />
        <circle cx="0" cy="24" r="2.4" fill={agent.color} opacity="0.68" />
        <circle cx="20" cy="20" r="2.8" fill={agent.color} opacity="0.88" />
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
  const { lang } = useLang();
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
                    {cortexCopy.energyTitle[lang]}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {cortexCopy.sessionSince[lang]} 00:28:47
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                <span className="text-slate-400">{cortexCopy.consensusInProgress[lang]}</span>
                <span className="font-semibold text-emerald-300">82%</span>
              </div>
            </HudPanel>

            <HudPanel>
              <p className="text-sm font-semibold uppercase text-slate-50">
                {cortexCopy.globalWaves[lang]}
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
                  {cortexCopy.energyFlow[lang]}
                </p>
                <span className="text-xs font-semibold text-emerald-300">
                  {cortexCopy.high[lang]}
                </span>
              </div>
              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">
                <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-[#60a5fa] via-[#818cf8] to-[#5eead4]" />
              </div>
            </HudPanel>

            <HudPanel>
              <p className="text-sm font-semibold uppercase text-slate-50">
                {cortexCopy.luminousMemory[lang]}
              </p>
              <div className="mt-4 flex items-end justify-between">
                <span className="text-sm text-slate-400">{cortexCopy.activeSynapses[lang]}</span>
                <span className="text-2xl font-semibold text-slate-50">
                  12,458
                </span>
              </div>
            </HudPanel>

            <HudPanel>
              <p className="text-sm font-semibold uppercase text-slate-50">
                {cortexCopy.adrTraces[lang]}
              </p>
              <div className="mt-4 grid gap-3">
                {recentAdrs.map(({ id, title, date }) => (
                  <div
                    key={id}
                    className="grid grid-cols-[72px_minmax(0,1fr)_72px] gap-2 text-xs leading-5"
                  >
                    <span className="text-slate-500">{id}</span>
                    <span className="text-slate-300">{title[lang]}</span>
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
                  Cartographie SVG dense des neuf fonctions permanentes du
                  Conseil, reliées par des faisceaux synaptiques et des influx
                  lumineux.
                </desc>
                <defs>
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

                <g className="cognitive-space" aria-hidden="true">
                  {energyOrbitRings.map((ring, index) => (
                    <ellipse
                      key={`${ring.rx}-${ring.ry}`}
                      className={`energy-orbit-ring energy-orbit-ring-${index + 1}`}
                      cx="450"
                      cy="320"
                      rx={ring.rx}
                      ry={ring.ry}
                      fill="none"
                      stroke={ring.color}
                      strokeOpacity={0.15 - index * 0.008}
                      strokeWidth={index < 3 ? 0.8 : 0.58}
                    />
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
                      className={`cortex-node ${
                        isActive ? "cortex-node-active" : ""
                      } ${isDimmed ? "cortex-node-dimmed" : ""}`}
                      filter="url(#cortex-node-glow)"
                      role="img"
                      aria-label={`${agent.roleLabel} : ${agent.crewLabel}. ${agent.mission}`}
                      tabIndex={0}
                      onMouseEnter={() => setActiveAgentId(agent.id)}
                      onMouseLeave={() => setActiveAgentId(null)}
                      onFocus={() => setActiveAgentId(agent.id)}
                      onBlur={() => setActiveAgentId(null)}
                    >
                    <circle
                      className="agent-orbit-aura"
                      r="68"
                      fill="none"
                      stroke={agent.color}
                      strokeOpacity="0.24"
                      strokeWidth="1.2"
                    />
                    <circle r="56" fill={agent.color} opacity="0.16" />
                    <circle r="39" fill="#030712" stroke={agent.color} strokeOpacity="0.94" strokeWidth="1.7" />
                    <circle r="23" fill="none" stroke={agent.color} strokeOpacity="0.48" strokeWidth="0.8" strokeDasharray="3 5" />
                    <CortexGlyph agent={agent} />
                    <text
                      x="0"
                      y={agent.labelY}
                      textAnchor="middle"
                      className="cortex-label fill-white text-[12px] font-bold uppercase"
                      stroke="#020617"
                      strokeWidth="3"
                      paintOrder="stroke"
                    >
                      {agent.roleLabel}
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
                      {agent.crewLabel}
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

            <div className="mt-4 overflow-hidden rounded-lg border border-white/10 bg-slate-950/55 backdrop-blur-xl">
              <div className="overflow-x-auto">
                <table className="min-w-[760px] w-full border-collapse text-left">
                  <caption className="sr-only">
                    {cortexCopy.legendCaption[lang]}
                  </caption>
                  <thead>
                    <tr className="border-b border-white/10 bg-white/[0.04] text-xs font-semibold uppercase text-slate-400">
                      <th className="w-[150px] px-4 py-3">{cortexCopy.thRole[lang]}</th>
                      <th className="px-4 py-3">{cortexCopy.thMission[lang]}</th>
                      <th className="w-[140px] px-4 py-3">{cortexCopy.thCrew[lang]}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cortexLegendRows.map((agent) => (
                      <tr
                        key={`${agent.id}-legend`}
                        className="border-b border-white/5 text-sm last:border-b-0"
                      >
                        <td className="px-4 py-3 font-semibold text-slate-50">
                          <span className="flex items-center gap-2">
                            <span
                              className="h-2.5 w-2.5 rounded-full shadow-[0_0_12px_currentColor]"
                              style={{
                                color: agent.color,
                                backgroundColor: agent.color,
                              }}
                            />
                            {agent.roleLabel}
                          </span>
                        </td>
                        <td className="px-4 py-3 leading-6 text-slate-300">
                          {agent.mission}
                        </td>
                        <td className="px-4 py-3 font-medium text-slate-100">
                          {agent.crewLabel}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <aside className="order-3 grid gap-3 lg:order-none">
            <HudPanel className="border-[#818cf8]/20 bg-slate-950/70">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase text-[#818cf8]">
                    {cortexCopy.impulseInProgress[lang]}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-100">
                    {cortexCopy.impulseQuestion[lang]}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-xs font-semibold text-emerald-100">
                  82%
                </span>
              </div>
              <div className="mt-4 grid gap-2">
                {impulseOptions.map((option) => (
                  <div
                    key={option.label.fr}
                    className={`grid grid-cols-[minmax(0,1fr)_44px] items-center gap-3 rounded-md border px-3 py-2 text-xs ${
                      option.highlight
                        ? "border-[#818cf8]/70 bg-[#818cf8]/15 text-[#c4b5fd]"
                        : "border-white/10 bg-white/[0.04] text-slate-400"
                    }`}
                  >
                    <span>{option.label[lang]}</span>
                    <span className="text-right font-semibold">{option.score}</span>
                  </div>
                ))}
              </div>
            </HudPanel>

            <HudPanel>
              <p className="text-sm font-semibold uppercase text-slate-50">
                {cortexCopy.photonsCirculating[lang]}
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
                        {event.detail[lang]}
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
                {cortexCopy.energyState[lang]}
              </p>
              <div className="mt-4 grid gap-2">
                {systemRows.map(({ label, state, color }) => (
                  <div
                    key={label.fr}
                    className="grid grid-cols-[14px_minmax(0,1fr)_96px] gap-2 text-sm"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 rounded-full shadow-[0_0_12px_currentColor]"
                      style={{ color, backgroundColor: color }}
                    />
                    <span className="text-slate-400">{label[lang]}</span>
                    <span className="text-right font-medium" style={{ color }}>
                      {state[lang]}
                    </span>
                  </div>
                ))}
              </div>
            </HudPanel>

            <HudPanel>
              <p className="text-sm font-semibold uppercase text-slate-50">
                {cortexCopy.linkedConstellations[lang]}
              </p>
              <div className="mt-4 grid gap-2">
                {networkStats.map(({ label, value }) => (
                  <div key={label.fr} className="flex justify-between text-sm">
                    <span className="text-slate-500">{label[lang]}</span>
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
