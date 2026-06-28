# Décisions

Les décisions structurantes sont désormais conservées sous forme d'Architecture Decision Records dans [`decisions/`](./decisions/README.md).

Ce fichier garde une vue chronologique synthétique. Les ADR sont la source durable pour comprendre le contexte, les alternatives et les conséquences d'une décision importante.

## 2026-06-28 - Initialisation du socle

Le projet démarre avec React, Vite, TypeScript et TailwindCSS.

Les intégrations IA, GitHub et Supabase restent volontairement non connectées dans le MVP afin de valider d'abord la structure, le vocabulaire et l'expérience de décision.

## 2026-06-28 - Rôles permanents avant modèles

Le Conseil de Bord représente des fonctions permanentes, pas des modèles d'IA.

Les implémentations actuelles sont configurées dans `src/config/agents.ts`. Ce choix protège la mémoire du projet : une décision prise par le Quartier-Maître doit rester lisible même si son implémentation passe un jour de ChatGPT à un autre outil.

Le Capitaine conserve l'arbitrage final. Le consensus éclaire, la décision engage.

## 2026-06-28 - TEMPOSYSTEM OS dépasse le périmètre applicatif

TEMPOSYSTEM OS est défini comme un système d'exploitation de la coopération, pas comme une application unique.

MANA est la première application construite sur ce socle. Cette décision impose de garder l'architecture générique : Conseil de Bord, Timonier, mémoire commune, protocole de décision et gouvernance humaine doivent pouvoir servir d'autres domaines.

La mémoire durable est traitée comme un actif stratégique. Les conversations produisent des décisions ; les décisions doivent être conservées dans une mémoire exploitable, avec GitHub comme première cible prévue.

## 2026-06-28 - Mise en place des ADR

TEMPOSYSTEM OS adopte les Architecture Decision Records pour rendre les décisions importantes lisibles plusieurs années plus tard.

Premiers ADR :

- [ADR-0001 - Naissance de TEMPOSYSTEM OS](./decisions/ADR-0001-naissance-de-temposystem-os.md)
- [ADR-0002 - Architecture des rôles](./decisions/ADR-0002-architecture-des-roles.md)
- [ADR-0003 - La mémoire comme actif stratégique](./decisions/ADR-0003-memoire-comme-actif-strategique.md)

## 2026-06-28 - Équipage 2042

TEMPOSYSTEM OS déclare des rôles supplémentaires pour préparer le futur Timonier sans alourdir le Conseil de Bord actuel.

Les rôles 2042 ne sont pas consultés par défaut. Ils deviennent des capacités disponibles pour des consultations futures plus ciblées.

- [ADR-0005 - Équipage 2042 et extension des fonctions permanentes](./decisions/ADR-0005-equipage-2042-et-extension-des-fonctions-permanentes.md)

## 2026-06-28 - Interface publique vivante

TEMPOSYSTEM OS se dote d'une première interface publique pour se présenter avant toute connexion IA, GitHub ou Supabase.

Cette interface prépare le déploiement sur `temposystem.fr` et `temposystem.eu`.

- [ADR-0006 - Interface publique vivante de TEMPOSYSTEM OS](./decisions/ADR-0006-interface-publique-vivante-de-temposystem-os.md)

## 2026-06-28 - Launch 000

TEMPOSYSTEM OS prépare son premier déploiement public sans connexion IA, GitHub applicative ou Supabase.

Ce lancement affirme l'existence publique de l'infrastructure avant les fonctionnalités avancées.

- [ADR-0007 - Premier déploiement public](./decisions/ADR-0007-premier-deploiement-public.md)

## 2026-06-29 - Cockpit 001

TEMPOSYSTEM OS transforme son interface principale en cockpit d'infrastructure.

Le site ne se contente plus de présenter le système : il expose son état, son Conseil vivant, sa mémoire ADR, ses jalons et MANA comme première application active.

- [ADR-0008 - Le Cockpit comme interface principale](./decisions/ADR-0008-le-cockpit-comme-interface-principale.md)
