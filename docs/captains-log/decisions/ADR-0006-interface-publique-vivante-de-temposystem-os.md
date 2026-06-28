# ADR-0006 - Interface publique vivante de TEMPOSYSTEM OS

## Numéro

ADR-0006

## Date

2026-06-28

## Statut

Accepté

## Décideur

Capitaine

## Contexte

TEMPOSYSTEM OS possède désormais un Conseil de Bord local, un équipage 2042, des ADR, une mémoire documentaire et une vision stratégique.

Le système doit pouvoir être compris par un visiteur extérieur sans lire immédiatement tout le journal de bord.

## Problème

Sans interface publique, TEMPOSYSTEM OS reste lisible uniquement pour les personnes qui connaissent déjà le projet ou explorent directement le dépôt.

Le projet a besoin d'une surface claire pour expliquer ce qu'il est, pourquoi il existe, quels rôles il organise, quel est son état et pourquoi MANA est la première application construite dessus.

## Décision

Créer une interface publique vivante pour TEMPOSYSTEM OS.

Cette interface présente :

- la vision de TEMPOSYSTEM OS ;
- l'état du système ;
- le Conseil de Bord ;
- l'équipage 2042 ;
- MANA comme première application civique ;
- les jalons du livre de bord ;
- les liens vers la vision, l'architecture et les décisions.

Elle précède les connexions IA, GitHub et Supabase afin de clarifier le récit, la gouvernance et la structure avant les intégrations.

Vercel est retenu comme première cible de déploiement public pour sa compatibilité simple avec Vite, GitHub, les domaines personnalisés et les certificats SSL automatisés.

## Alternatives étudiées

- Attendre les connexions IA avant de publier : rejeté, car le système doit d'abord savoir se présenter clairement.
- Publier uniquement la documentation Markdown : rejeté, car une interface vivante rend le projet plus immédiatement compréhensible.
- Ajouter un framework de routing ou de site statique : rejeté pour l'instant, car un routage hash minimal suffit au MVP public.

## Conséquences

- La page d'accueil devient la première surface publique de TEMPOSYSTEM OS.
- Le Conseil de Bord reste accessible sans être cassé ni remplacé.
- Le projet reste sans API externe et sans dépendance supplémentaire.
- La procédure de déploiement Vercel est documentée dans le README.

## Impact sur l'architecture

L'application React porte désormais deux usages :

- une interface publique de présentation ;
- un Conseil de Bord local fonctionnel.

Le routage reste volontairement minimal. Les futures connexions devront préserver cette séparation entre présentation publique, mémoire documentaire et cycle décisionnel.

## Références

- [README](../../../README.md)
- [Architecture](../02_ARCHITECTURE.md)
- [Vision](../00_VISION.md)
