# ADR-0003 - La mémoire comme actif stratégique

## Numéro

ADR-0003

## Date

2026-06-28

## Statut

Accepté

## Décideur

Capitaine

## Contexte

TEMPOSYSTEM OS produit des décisions à partir de conversations, de consultations du Conseil de Bord et d'arbitrages humains.

Ces échanges sont utiles, mais ils ne constituent pas une mémoire durable. Ils sont souvent dispersés, dépendants d'un outil, difficiles à relire et insuffisants pour comprendre une décision plusieurs années plus tard.

## Problème

Le projet a besoin d'une mémoire qui conserve les décisions, leurs raisons, leurs alternatives et leurs conséquences.

Sans trace durable, le système devra reconstruire son contexte à chaque session. Cela augmente le risque de répétition, d'incohérence et de perte de gouvernance.

## Décision

La mémoire est traitée comme un actif stratégique de TEMPOSYSTEM OS.

GitHub devient la cible prévue pour la mémoire durable opérationnelle : issues, décisions, journal de bord, backlog et historique des arbitrages.

Les conversations ne sont pas la mémoire. Elles servent à produire des décisions. Chaque décision importante doit laisser une trace durable, notamment sous forme d'ADR lorsqu'elle touche l'architecture, la gouvernance ou les responsabilités du système.

## Alternatives étudiées

- Conserver uniquement les conversations : rejeté, car elles sont trop fragiles et trop difficiles à synthétiser dans le temps.
- Documenter seulement dans un README général : rejeté, car les décisions structurantes doivent être datées, numérotées et isolées.
- Attendre une intégration GitHub complète avant d'écrire la mémoire : rejeté, car la discipline de décision peut commencer localement.

## Conséquences

- Les décisions structurantes doivent être enregistrées dans `docs/captains-log/decisions/`.
- Les conversations doivent être synthétisées en décisions plutôt que conservées comme source principale de vérité.
- La mémoire devra progressivement être reliée à GitHub lorsque l'intégration sera activée.

## Impact sur l'architecture

La mémoire devient un domaine central du système, pas une annexe documentaire.

Les futurs modules Supabase, GitHub et Dispatcher devront respecter cette priorité : produire, retrouver et relier des décisions durables.

## Références

- [Journal de bord](../06_JOURNAL.md)
- [Décisions](../05_DECISIONS.md)
- [Architecture](../02_ARCHITECTURE.md)
