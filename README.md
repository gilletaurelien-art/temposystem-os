# TEMPOSYSTEM OS

TEMPOSYSTEM OS est le système d'exploitation de la coopération. Il pose un Conseil de Bord local où des fonctions permanentes éclairent une question, produisent un consensus et laissent au Capitaine la décision finale.

Ce MVP ne connecte aucune API IA, aucun appel GitHub et aucune connexion Supabase. Tout fonctionne localement avec des données mockées.

## Vision

Le but est de transformer une question en décision traçable. TEMPOSYSTEM OS privilégie la mémoire longue aux conversations éphémères : une décision utile doit pouvoir être retrouvée, comprise et reliée au cap du projet.

## Conseil de Bord

Le Conseil de Bord ne représente pas des modèles d'IA. Il représente des rôles durables :

- Quartier-Maître : stratégie, architecture, cohérence, mémoire, gouvernance.
- Maître Charpentier : développement, implémentation, refactoring, architecture logicielle.
- Maître Calfat : audit, sécurité, qualité, performance, CI/CD, tests.
- Maître Enlumineur : identité visuelle, design system, culture, expérience utilisateur.

Les modèles actuels sont seulement des implémentations configurables de ces fonctions. Ils vivent dans `src/config/agents.ts` afin de pouvoir changer d'outil sans changer l'architecture du Conseil.

## Cycle Décisionnel

1. Le Capitaine écrit une question.
2. Il consulte le Conseil.
3. Chaque rôle produit une réponse simulée selon sa spécialité.
4. Le système génère un consensus local.
5. Le Capitaine rédige et valide sa décision.
6. La session passe au statut `decided`.

## Mémoire GitHub

GitHub est prévu comme mémoire opérationnelle : issues, décisions, journal de bord, backlog et historique des arbitrages. Le bouton "Créer une issue GitHub" reste désactivé tant que l'intégration n'est pas volontairement branchée.

## Rôle du Capitaine

Le Capitaine définit la vision, arbitre les désaccords et prend les décisions finales. Les membres du Conseil éclairent le choix, mais ne remplacent jamais la responsabilité humaine.

## Stack

- React + Vite + TypeScript
- TailwindCSS
- Préparation Supabase via variables d'environnement
- Architecture simple par domaines fonctionnels

## Prochaines étapes

1. Persister les sessions du Conseil dans Supabase.
2. Transformer une décision validée en issue GitHub.
3. Ajouter l'historique local des sessions.
4. Brancher une première implémentation IA réelle derrière un rôle permanent.
5. Ajouter des tests ciblés autour des transitions `draft`, `consulted` et `decided`.
