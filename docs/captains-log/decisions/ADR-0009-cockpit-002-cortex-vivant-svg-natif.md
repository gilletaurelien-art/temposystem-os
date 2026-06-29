# ADR-0009 - Cockpit 002 : Cortex vivant et poste de contrôle SVG natif

## Numéro

ADR-0009

## Date

2026-06-29

## Statut

Accepté

## Décideur

Capitaine

## Contexte

Cockpit 001 a transformé la page d'accueil en interface principale d'infrastructure.

Le Maître Enlumineur a proposé un Cortex vivant pour représenter les fonctions permanentes comme un réseau synaptique. La première proposition utilisait une scène 3D avec Three.js et React Three Fiber.

La première version SVG s'est révélée trop proche d'un schéma technique. Elle ne racontait pas suffisamment l'idée d'une infrastructure en fonctionnement.

## Problème

Une scène 3D peut renforcer l'impression d'infrastructure vivante, mais elle ajoute des dépendances, des risques de performance, des contraintes mobiles et une surface de maintenance plus large.

TEMPOSYSTEM OS doit tester la valeur visuelle du Cortex sans alourdir le socle ni rompre la sobriété institutionnelle du cockpit.

Le problème n'est pas seulement de relier les rôles. Le visiteur doit sentir un système qui calcule, mémorise, consulte et décide.

## Décision

Créer Cockpit 002 sous forme de poste de contrôle vivant en SVG natif et CSS.

Cette version :

- consomme `src/config/agents.ts` comme source de vérité ;
- limite le mapping visuel aux positions et couleurs par identifiant d'agent ;
- représente les fonctions permanentes par des nœuds abstraits en line art ;
- représente les relations par des faisceaux de micro-chemins SVG ;
- ajoute une brume lumineuse organique par filtres et dégradés SVG ;
- anime les flux par CSS léger et photons SVG ;
- transforme le noyau `|||||` en pulsar temporel avec double couronne élastique, onde de décision et filaments asynchrones ;
- ajoute des panneaux de cockpit : Conseil de Bord, activité globale, mémoire vive, ADR récents, flux en temps réel, état du système et réseaux connectés ;
- affiche une décision en cours pour relier la visualisation au protocole du Conseil ;
- respecte `prefers-reduced-motion` ;
- n'ajoute aucune dépendance.

La 3D volumétrique reste une option future à réévaluer après validation de l'usage et de la valeur narrative.

## Alternatives étudiées

- Implémenter directement Three.js et React Three Fiber : rejeté pour ce jalon, car la dépendance est prématurée.
- Conserver un SVG minimal : rejeté, car le rendu ne portait pas assez l'idée d'une infrastructure vivante.
- Ne pas visualiser le Cortex : rejeté, car Cockpit 002 doit tester la lisibilité d'un Conseil vivant.
- Hardcoder les rôles dans le composant : rejeté, car les rôles permanents doivent rester gouvernés par la configuration centrale.

## Conséquences

- Le cockpit gagne une représentation vivante et instrumentée sans coût de dépendance.
- Le cœur du cockpit exprime visuellement le cycle décisionnel : accumulation, tension temporelle, synchronisation, décision, réirradiation.
- Les rôles affichés restent alignés avec la configuration existante.
- La performance et le rendu mobile restent simples à contrôler.
- Le rendu teste une esthétique plus dense avant tout passage éventuel à la 3D.
- Une future version 3D pourra reprendre les mêmes données visuelles si le Capitaine l'arbitre.

## Impact sur l'architecture

Un composant dédié porte la visualisation du Cortex et les panneaux de cockpit associés.

La configuration des agents reste la source fonctionnelle. La couche visuelle ne contient que des coordonnées, couleurs et relations d'affichage.

## Références

- [Configuration des agents](../../../src/config/agents.ts)
- [Cockpit 001](./ADR-0008-le-cockpit-comme-interface-principale.md)
- [AI Context](../08_AI_CONTEXT.md)
