import { councilAgents } from "../../config/agents";
import type {
  Agent,
  CouncilConsensus,
  CouncilQuestion,
  CouncilResponse,
} from "../../types";

const makeId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

export function generateMockCouncilResponses(
  question: CouncilQuestion,
  agents: Agent[] = councilAgents,
): CouncilResponse[] {
  const createdAt = new Date().toISOString();

  return agents.map((agent) => {
    const base = {
      id: makeId("response"),
      questionId: question.id,
      agentId: agent.id,
      role: agent.role,
      createdAt,
    };

    switch (agent.role) {
      case "quartermaster":
        return {
          ...base,
          summary:
            "La question doit être reliée au cap produit, à la gouvernance et à la mémoire commune avant toute exécution.",
          risks: [
            "Décider trop vite sans trace durable.",
            "Mélanger rôle permanent et modèle d'implémentation.",
          ],
          recommendation:
            "Formuler l'enjeu, nommer le principe directeur et inscrire la décision dans le journal de bord.",
        };
      case "masterCarpenter":
        return {
          ...base,
          summary:
            "Le besoin peut être traité par un flux local simple, composé d'un état de session et de fonctions pures mockées.",
          risks: [
            "Créer une orchestration prématurée.",
            "Multiplier les abstractions avant le premier usage réel.",
          ],
          recommendation:
            "Construire le cycle draft, consulted, decided avec des types explicites et des composants sobres.",
        };
      case "masterCaulker":
        return {
          ...base,
          summary:
            "Le MVP doit rester fiable en évitant tout appel externe et en rendant les transitions de statut visibles.",
          risks: [
            "Valider une décision sans question ni consensus.",
            "Introduire des dépendances inutiles ou des effets réseau cachés.",
          ],
          recommendation:
            "Désactiver les actions tant que les préconditions ne sont pas remplies et vérifier build plus audit.",
        };
      case "masterIlluminator":
        return {
          ...base,
          summary:
            "L'interface doit rendre l'équipage compréhensible : fonction permanente d'abord, implémentation actuelle ensuite.",
          risks: [
            "Faire croire que le Conseil représente directement des marques d'IA.",
            "Noyer la décision dans une interface trop bavarde.",
          ],
          recommendation:
            "Hiérarchiser Question, Conseil, Consensus puis Décision avec des libellés calmes et lisibles.",
        };
      default:
        return {
          ...base,
          summary: `${agent.name} peut éclairer cette question selon sa mission : ${agent.description}`,
          risks: [
            "Rôle disponible mais non intégré au Conseil par défaut.",
            "Sollicitation prématurée sans règle de dispatch explicite.",
          ],
          recommendation:
            "Laisser le Timonier décider quand cette capacité doit rejoindre une consultation.",
        };
    }
  });
}

export function generateMockCouncilConsensus(
  question: CouncilQuestion,
  responses: CouncilResponse[],
): CouncilConsensus {
  return {
    id: makeId("consensus"),
    questionId: question.id,
    summary:
      "Le Conseil recommande une avancée locale, traçable et minimale : clarifier la question, consulter les fonctions permanentes, synthétiser leurs angles, puis laisser le Capitaine arbitrer.",
    alignment: responses.map(
      (response) => `Réponse ${response.agentId} intégrée au consensus.`,
    ),
    openQuestions: [
      "Quelle trace doit rejoindre la mémoire longue après validation ?",
      "Quel connecteur devra être branché en premier lorsque le flux local sera stable ?",
    ],
    createdAt: new Date().toISOString(),
  };
}
