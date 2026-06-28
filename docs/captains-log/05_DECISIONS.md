# Décisions

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
