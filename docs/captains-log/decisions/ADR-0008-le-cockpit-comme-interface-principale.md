# ADR-0008 - Le Cockpit comme interface principale

## Numéro

ADR-0008

## Date

2026-06-29

## Statut

Accepté

## Décideur

Capitaine

## Contexte

TEMPOSYSTEM OS possède déjà un Conseil de Bord local, une mémoire ADR, une interface publique, un équipage 2042 et un premier déploiement public préparé.

La première interface publique expliquait le système. Cockpit 001 doit désormais montrer TEMPOSYSTEM comme une infrastructure déjà en fonctionnement, même lorsque certaines données restent simulées localement.

## Problème

Une simple landing page donne l'impression d'une vitrine ou d'une promesse.

TEMPOSYSTEM OS doit au contraire donner l'impression d'un centre de commandement : état de l'infrastructure, Conseil vivant, mémoire des décisions, applications reliées au socle et jalons narratifs.

## Décision

Faire du Cockpit l'interface principale de TEMPOSYSTEM OS.

La page d'accueil expose désormais :

- l'état de l'infrastructure ;
- une consultation mockée du Conseil de Bord ;
- une décision du Capitaine ;
- une référence ADR associée ;
- MANA comme première application active ;
- une chronologie narrative du système.

Les données restent locales et mockées. Elles servent à rendre visible l'architecture actuelle sans connecter d'API IA, GitHub applicative ou Supabase.

## Alternatives étudiées

- Conserver une landing page classique : rejeté, car elle présente le système sans montrer son fonctionnement.
- Connecter immédiatement des données externes : rejeté, car la gouvernance et la mémoire doivent rester stables avant les intégrations.
- Ajouter un framework ou une couche de dashboard dédiée : rejeté, car React, Vite et la configuration locale suffisent pour ce jalon.

## Conséquences

- TEMPOSYSTEM OS se présente comme une infrastructure vivante plutôt que comme un site public.
- Le visiteur comprend plus vite ce que le système fait : coordonner, mémoriser, décider et évoluer.
- Les futures données réelles pourront remplacer les mocks sans changer la philosophie d'interface.
- La séparation reste stricte entre présentation publique, Conseil local et futures connexions.

## Impact sur l'architecture

La configuration publique devient la source locale des signaux cockpit.

L'interface publique conserve une architecture simple : composants React existants, données statiques typées par inférence et aucune dépendance supplémentaire.

## Références

- [README](../../../README.md)
- [Décisions](../05_DECISIONS.md)
- [AI Context](../08_AI_CONTEXT.md)
