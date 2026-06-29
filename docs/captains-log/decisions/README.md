# Architecture Decision Records

Ce dossier contient les Architecture Decision Records de TEMPOSYSTEM OS.

Un ADR est une trace courte, datée et durable d'une décision structurante. Il explique le contexte, le problème, la décision retenue, les alternatives étudiées et les conséquences attendues.

## Pourquoi TEMPOSYSTEM OS utilise des ADR

TEMPOSYSTEM OS considère la mémoire comme un actif stratégique. Les conversations aident à réfléchir, mais elles ne suffisent pas à conserver le contexte sur plusieurs années.

Les ADR permettent de comprendre pourquoi une direction a été prise sans devoir reconstruire l'historique depuis des échanges dispersés. Ils protègent la cohérence du système lorsque les personnes, les outils et les implémentations changent.

## Quand créer un ADR

Créer un ADR lorsqu'une décision :

- influence l'architecture ou la gouvernance du système ;
- engage la mémoire commune ;
- définit un rôle, un protocole ou une responsabilité durable ;
- écarte une alternative crédible ;
- risque d'être questionnée plus tard.

Ne pas créer d'ADR pour une tâche mineure, une correction évidente ou un détail réversible sans conséquence.

## Qui valide un ADR

Le Capitaine valide les ADR. Le Conseil de Bord peut éclairer, formuler les alternatives et signaler les risques, mais la validation finale reste humaine.

## Cycle de vie

- `Proposé` : décision en discussion.
- `Accepté` : décision validée et applicable.
- `Remplacé` : décision remplacée par un ADR plus récent.
- `Obsolète` : décision conservée pour mémoire mais plus applicable.

Un ADR accepté ne doit pas être réécrit pour changer le passé. Si une décision évolue, créer un nouvel ADR qui référence l'ancien.

## Index

- [ADR-0001 - Naissance de TEMPOSYSTEM OS](./ADR-0001-naissance-de-temposystem-os.md)
- [ADR-0002 - Architecture des rôles](./ADR-0002-architecture-des-roles.md)
- [ADR-0003 - La mémoire comme actif stratégique](./ADR-0003-memoire-comme-actif-strategique.md)
- [ADR-0005 - Équipage 2042 et extension des fonctions permanentes](./ADR-0005-equipage-2042-et-extension-des-fonctions-permanentes.md)
- [ADR-0006 - Interface publique vivante de TEMPOSYSTEM OS](./ADR-0006-interface-publique-vivante-de-temposystem-os.md)
- [ADR-0007 - Premier déploiement public](./ADR-0007-premier-deploiement-public.md)
- [ADR-0008 - Le Cockpit comme interface principale](./ADR-0008-le-cockpit-comme-interface-principale.md)
- [ADR-0009 - Cockpit 002 : Cortex vivant et poste de contrôle SVG natif](./ADR-0009-cockpit-002-cortex-vivant-svg-natif.md)
