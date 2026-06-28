import type { Agent } from "../types";

export const councilAgents: Agent[] = [
  {
    id: "quartermaster",
    role: "quartermaster",
    title: "Quartier-Maître",
    symbol: "⚓",
    responsibilities: [
      "stratégie",
      "architecture",
      "cohérence globale",
      "mémoire",
      "documentation",
      "gouvernance",
      "vision produit",
    ],
    stance: "Relie chaque décision au cap, à la mémoire et à la cohérence du système.",
    currentImplementation: {
      name: "ChatGPT",
    },
  },
  {
    id: "master-carpenter",
    role: "masterCarpenter",
    title: "Maître Charpentier",
    symbol: "🔨",
    responsibilities: [
      "développement",
      "implémentation",
      "refactoring",
      "architecture logicielle",
    ],
    stance: "Transforme les intentions en structure logicielle concrète et maintenable.",
    currentImplementation: {
      name: "Claude",
    },
  },
  {
    id: "master-caulker",
    role: "masterCaulker",
    title: "Maître Calfat",
    symbol: "🧰",
    responsibilities: ["audit", "sécurité", "qualité", "performance", "CI/CD", "tests"],
    stance: "Cherche les failles, les risques et les points de fiabilité avant la mise à l'eau.",
    currentImplementation: {
      name: "Codex",
    },
  },
  {
    id: "master-illuminator",
    role: "masterIlluminator",
    title: "Maître Enlumineur",
    symbol: "🎨",
    responsibilities: [
      "identité visuelle",
      "design system",
      "illustrations",
      "culture",
      "expérience utilisateur",
      "documentation graphique",
    ],
    stance: "Veille à la lisibilité, au ton, à l'identité et à l'expérience vécue.",
    currentImplementation: {
      name: "Gemini",
    },
  },
];
