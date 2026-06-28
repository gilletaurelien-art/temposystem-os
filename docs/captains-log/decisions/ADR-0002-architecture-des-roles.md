# ADR-0002 - Architecture des rôles

## Numéro

ADR-0002

## Date

2026-06-28

## Statut

Accepté

## Décideur

Capitaine

## Contexte

Le Conseil de Bord réunit plusieurs expertises pour éclairer une décision. Les outils IA disponibles peuvent changer rapidement, mais les responsabilités nécessaires à une bonne gouvernance doivent rester stables.

TEMPOSYSTEM OS doit donc séparer les fonctions permanentes des modèles ou outils qui les implémentent.

## Problème

Si le Conseil de Bord dépend directement de noms de modèles IA, chaque changement d'outil fragilise la mémoire, le vocabulaire et les responsabilités.

Le système doit pouvoir remplacer une implémentation sans perdre le sens du rôle ni casser l'historique des décisions.

## Décision

Le Conseil de Bord est organisé autour de rôles permanents :

- Capitaine : humain, définit la vision, arbitre les désaccords et prend les décisions finales.
- Quartier-Maître : stratégie, architecture, cohérence globale, mémoire, documentation, gouvernance et vision produit.
- Maître Charpentier : développement, implémentation, refactoring et architecture logicielle.
- Maître Calfat : audit, sécurité, qualité, performance, CI/CD et tests.
- Maître Enlumineur : identité visuelle, design system, illustrations, culture, expérience utilisateur et documentation graphique.

Les implémentations IA actuelles sont interchangeables. ChatGPT, Claude, Codex, Gemini ou tout autre outil ne sont pas les rôles : ils ne sont que des moyens d'exécuter ces fonctions.

## Alternatives étudiées

- Nommer les membres du Conseil selon les modèles IA utilisés : rejeté, car cela rendrait l'architecture dépendante du marché des outils.
- Créer des rôles ad hoc à chaque décision : rejeté, car cela affaiblirait la mémoire et la cohérence du système.
- Laisser un seul assistant généraliste répondre à tout : rejeté, car cela masque les tensions utiles entre stratégie, construction, audit et design.

## Conséquences

- Les composants applicatifs doivent utiliser la configuration des rôles plutôt que des noms de modèles codés en dur.
- La documentation doit parler d'abord des fonctions permanentes.
- Les implémentations peuvent évoluer sans modifier les ADR historiques.

## Impact sur l'architecture

Les rôles deviennent une couche stable de l'architecture.

Les implémentations doivent rester configurables, remplaçables et documentées comme des choix d'exécution. Les décisions doivent rester lisibles même si les outils changent.

## Références

- [Configuration des agents](../../../src/config/agents.ts)
- [Contexte IA](../08_AI_CONTEXT.md)
- [Architecture](../02_ARCHITECTURE.md)
