import { crewAgents } from "../../config/agents";
import type { Agent, AgentRole } from "../../types";

export const dispatchKeywords: Record<AgentRole, string[]> = {
  captain: ["vision", "arbitrage", "décision", "priorité"],
  helmsman: ["dispatch", "orchestration", "routage", "expertise"],
  quartermaster: ["stratégie", "architecture", "cohérence", "gouvernance"],
  masterCarpenter: ["développement", "implémentation", "refactoring", "logiciel"],
  masterCaulker: ["audit", "sécurité", "qualité", "performance", "test", "CI/CD"],
  masterIlluminator: ["design", "identité", "culture", "UX", "documentation graphique"],
  archivist: ["mémoire", "ADR", "journal", "historique", "décision passée"],
  chancellor: ["légal", "droit", "conformité", "éthique", "licence", "RGPD"],
  steward: ["budget", "coût", "ressources", "capacité", "priorité", "soutenable"],
  ambassador: [
    "partenaires",
    "communication",
    "collectivité",
    "citoyen",
    "traduction",
    "public",
  ],
  lookout: [
    "veille",
    "tendance",
    "risque émergent",
    "prospective",
    "anticipation",
  ],
  testMaster: [
    "prototype",
    "test",
    "expérimentation",
    "validation terrain",
    "A/B test",
  ],
  cartographer: [
    "dépendance",
    "flux",
    "domaine",
    "architecture système",
    "interface",
    "mapping",
  ],
};

export function suggestDispatchAgents(question: string): Agent[] {
  const normalizedQuestion = question.toLocaleLowerCase("fr-FR");

  return crewAgents.filter((agent) =>
    dispatchKeywords[agent.role].some((keyword) =>
      normalizedQuestion.includes(keyword.toLocaleLowerCase("fr-FR")),
    ),
  );
}
