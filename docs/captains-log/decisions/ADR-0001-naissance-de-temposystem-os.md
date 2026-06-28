# ADR-0001 - Naissance de TEMPOSYSTEM OS

## Numéro

ADR-0001

## Date

2026-06-28

## Statut

Accepté

## Décideur

Capitaine

## Contexte

Les projets de coopération entre humains et intelligences artificielles reposent souvent sur des conversations isolées. Ces conversations produisent du contexte, des arbitrages et des décisions, mais ce contexte se perd facilement lorsque l'outil, la session ou l'équipe change.

TEMPOSYSTEM OS naît pour donner une structure durable à cette coopération.

## Problème

Il faut distinguer le système de coopération des applications construites dessus.

Si TEMPOSYSTEM OS est traité comme une application unique, son architecture risque d'être enfermée dans le premier cas d'usage. Il deviendrait plus difficile de réutiliser ses principes pour d'autres domaines, d'autres équipes ou d'autres formes de gouvernance.

## Décision

TEMPOSYSTEM OS est défini comme un système d'exploitation de la coopération entre humains et intelligences artificielles.

Il est indépendant des applications qui l'utilisent. Le Conseil de Bord est son premier composant opérationnel. MANA est sa première application, mais ne définit pas à elle seule le périmètre du système.

## Alternatives étudiées

- Construire directement MANA comme application autonome : rejeté, car cela mélangerait le cas d'usage civique avec l'architecture générique de coopération.
- Définir TEMPOSYSTEM OS comme simple interface IA : rejeté, car l'objectif est de structurer des décisions, une mémoire et une gouvernance, pas seulement une interaction.

## Conséquences

- TEMPOSYSTEM OS doit rester générique, modulaire et réutilisable.
- Les composants comme le Conseil de Bord, le Timonier, la mémoire et le protocole de décision doivent être pensés au-delà de MANA.
- La documentation doit séparer clairement le socle TEMPOSYSTEM OS des applications construites dessus.

## Impact sur l'architecture

L'architecture doit distinguer le noyau de coopération, les applications, les rôles permanents, les implémentations interchangeables et la mémoire durable.

Le système doit pouvoir accueillir plusieurs applications sans réécrire ses principes fondateurs.

## Références

- [Vision](../00_VISION.md)
- [Architecture](../02_ARCHITECTURE.md)
- [Domaines](../03_DOMAINES.md)
