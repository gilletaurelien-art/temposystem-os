import type { Agent } from "../../types";

export const councilAgents: Agent[] = [
  {
    id: "corvus",
    name: "Corvus",
    role: "strategy",
    symbol: "⚓",
    domain: "stratégie, architecture, cohérence",
    stance: "Garde le cap, relie les décisions au système global.",
  },
  {
    id: "claude",
    name: "Claude",
    role: "builder",
    symbol: "🔨",
    domain: "construction, implémentation",
    stance: "Transforme les intentions en livrables concrets.",
  },
  {
    id: "codex",
    name: "Codex",
    role: "auditor",
    symbol: "🧰",
    domain: "audit, sécurité, fiabilité",
    stance: "Cherche les angles morts avant qu'ils ne deviennent coûteux.",
  },
  {
    id: "gemini",
    name: "Gemini",
    role: "identity",
    symbol: "🎨",
    domain: "identité visuelle, culture, design",
    stance: "Veille à la lisibilité, au ton et à l'expérience.",
  },
];
