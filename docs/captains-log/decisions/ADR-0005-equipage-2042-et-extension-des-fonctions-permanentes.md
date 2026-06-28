# ADR-0005 - Équipage 2042 et extension des fonctions permanentes

## Numéro

ADR-0005

## Date

2026-06-28

## Statut

Accepté

## Décideur

Capitaine

## Contexte

TEMPOSYSTEM OS possède un Conseil de Bord local fonctionnel, une architecture de rôles permanents, un Timonier en préparation, un système ADR et une mémoire documentaire structurée.

Le Conseil actuel repose sur quatre fonctions principales : Quartier-Maître, Maître Charpentier, Maître Calfat et Maître Enlumineur. Cette base est volontairement simple.

Le système doit cependant anticiper des besoins futurs : mémoire approfondie, conformité, ressources, relations extérieures, veille, expérimentation et cartographie vivante.

## Problème

Si ces capacités ne sont pas déclarées tôt, le futur Timonier risque d'être conçu autour d'un équipage trop limité.

À l'inverse, si tous les rôles sont activés dans le Conseil actuel, l'interface et le protocole de décision deviennent trop lourds pour le MVP.

## Décision

TEMPOSYSTEM OS ajoute l'équipage 2042 comme extension des fonctions permanentes.

Les nouveaux rôles sont :

- Archiviste : mémoire, ADR, journal, traçabilité, décisions passées et continuité historique.
- Chancelier : droit, conformité, éthique, gouvernance, licences et cadre institutionnel.
- Intendant : ressources, budget, capacité, priorités, charge IA et soutenabilité.
- Ambassadeur : partenaires, citoyens, collectivités, traduction, communication et relations extérieures.
- Vigie : veille, signaux faibles, tendances, recherche, anticipation et risques émergents.
- Maître d'Essais : expérimentation, prototypes, A/B tests, validation terrain et apprentissages rapides.
- Cartographe : cartographie système, dépendances, flux, architecture vivante, domaines et interfaces.

Ces rôles sont déclarés dans la configuration et typés dans le code, mais ils ne sont pas membres principaux du Conseil par défaut.

Ils deviennent des capacités disponibles pour le futur Timonier.

## Alternatives étudiées

- Attendre que le Timonier soit complet avant de déclarer ces rôles : rejeté, car cela retarderait la structuration des responsabilités.
- Afficher tous les rôles comme membres principaux du Conseil : rejeté, car cela complexifierait l'UX et diluerait le MVP.
- Lier les nouveaux rôles à des modèles IA précis : rejeté, car les fonctions doivent rester indépendantes des implémentations.

## Conséquences

- L'équipage complet est visible dans `src/config/agents.ts`.
- Les quatre rôles principaux restent les seuls membres consultés par défaut.
- Les rôles 2042 peuvent être référencés par les règles locales du futur Timonier.
- L'interface principale affiche l'équipage étendu de manière compacte, sans lui donner le même poids que le Conseil actuel.

## Impact sur l'architecture

Le type `AgentRole` couvre désormais les fonctions de commandement, d'orchestration, de coeur et les capacités spécialisées 2042.

Chaque agent possède un statut, une catégorie et un indicateur `isDefaultCouncilMember`. Cette distinction permet au Timonier de composer des consultations plus fines sans modifier le Conseil de Bord par défaut.

Les implémentations IA restent remplaçables. Les rôles sont la structure durable ; les outils ne sont que des moyens d'exécution.

## Références

- [Architecture des rôles](./ADR-0002-architecture-des-roles.md)
- [Architecture](../02_ARCHITECTURE.md)
- [Domaines](../03_DOMAINES.md)
- [Configuration des agents](../../../src/config/agents.ts)
