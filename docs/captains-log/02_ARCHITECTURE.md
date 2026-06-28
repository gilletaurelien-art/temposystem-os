# Architecture

Le MVP actuel est une interface React locale structurée par domaines. Il ne déclenche aucun appel IA, GitHub ou Supabase.

TEMPOSYSTEM OS lui-même n'est pas limité à cette interface : c'est une architecture de coopération destinée à orchestrer des humains, des fonctions IA, une mémoire commune et un protocole de décision.

## Séparation clé

Le Conseil de Bord est construit autour de fonctions permanentes. Les noms comme ChatGPT, Claude, Codex ou Gemini ne sont pas l'architecture : ce sont les implémentations actuelles déclarées dans `src/config/agents.ts`.

Cette séparation permet de remplacer un outil sans renommer les rôles, sans casser la mémoire et sans brouiller les responsabilités.

## Domaines

- `config/agents.ts` : équipage permanent et implémentations actuelles.
- `features/council` : interface, cycle local et réponses mockées.
- `features/agents` : futur domaine de gestion des rôles.
- `features/memory` : futur accès à la mémoire commune.
- `features/dispatcher` : futur Timonier, chargé de sélectionner les expertises nécessaires.
- `lib` : helpers transverses, dont la préparation Supabase.
- `types` : contrats TypeScript partagés.

## Architecture cible

TEMPOSYSTEM OS orchestrera progressivement :

- un Dispatcher, nommé Timonier ;
- plusieurs capacités spécialisées ;
- une mémoire commune ;
- un protocole de décision ;
- une gouvernance humaine où le Capitaine conserve toujours la décision finale.

## Équipage 2042

Les rôles 2042 sont déclarés dans `src/config/agents.ts` comme capacités disponibles. Ils ne sont pas membres principaux du Conseil de Bord par défaut.

Cette extension prépare le Timonier sans complexifier le MVP. Les rôles 2042 couvrent la mémoire, la gouvernance, les ressources, les relations extérieures, la veille, l'expérimentation et la cartographie du système.

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

GitHub est envisagé comme mémoire durable pour les décisions, les issues et les journaux opérationnels.

Les décisions structurantes sont enregistrées comme Architecture Decision Records dans [`decisions/`](./decisions/README.md). Un ADR doit être créé lorsqu'une décision modifie l'architecture, la gouvernance, les rôles, la mémoire ou les futurs connecteurs du système.
