# Architecture

Le MVP est une application React statique structurée par domaines.

## Domaines

- `features/council` : interface du Conseil de Bord.
- `features/agents` : définition des agents spécialisés.
- `features/memory` : futur accès à la mémoire commune.
- `features/dispatcher` : future orchestration des questions et réponses.
- `lib` : helpers transverses, dont la préparation Supabase.
- `types` : contrats TypeScript partagés.

## Flux prévu

1. Le Capitaine formule une question.
2. Le dispatcher transmet la question aux agents.
3. Les agents produisent leurs réponses.
4. Le Conseil synthétise un consensus.
5. Le Capitaine valide une décision.
6. La décision peut être persistée et transformée en issue GitHub.
