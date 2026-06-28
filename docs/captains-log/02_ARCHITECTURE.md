# Architecture

Le MVP est une application React locale structurée par domaines. Il ne déclenche aucun appel IA, GitHub ou Supabase.

## Séparation clé

Le Conseil de Bord est construit autour de fonctions permanentes. Les noms comme ChatGPT, Claude, Codex ou Gemini ne sont pas l'architecture : ce sont les implémentations actuelles déclarées dans `src/config/agents.ts`.

Cette séparation permet de remplacer un outil sans renommer les rôles, sans casser la mémoire et sans brouiller les responsabilités.

## Domaines

- `config/agents.ts` : équipage permanent et implémentations actuelles.
- `features/council` : interface, cycle local et réponses mockées.
- `features/agents` : futur domaine de gestion des rôles.
- `features/memory` : futur accès à la mémoire commune.
- `features/dispatcher` : future orchestration réelle des questions et réponses.
- `lib` : helpers transverses, dont la préparation Supabase.
- `types` : contrats TypeScript partagés.

## Cycle local

1. La session démarre en statut `draft`.
2. Le Capitaine formule une question.
3. `generateMockCouncilResponses()` produit une réponse par rôle.
4. Un consensus local est généré.
5. La session passe en statut `consulted`.
6. Le Capitaine rédige sa décision.
7. La validation passe la session en statut `decided`.

## Mémoire

La mémoire est prioritaire sur la conversation. Une conversation aide à réfléchir, mais la mémoire conserve ce qui engage le projet : questions, réponses, consensus, décisions, dates et traces futures.
