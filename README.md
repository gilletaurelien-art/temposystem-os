# TEMPOSYSTEM OS

TEMPOSYSTEM OS est le socle d'un Conseil de Bord IA : un espace de décision où plusieurs agents spécialisés peuvent analyser une même question, confronter leurs angles de vue et produire une recommandation commune.

Ce premier jalon reste volontairement statique. Il pose l'interface, les types TypeScript, la structure documentaire et les points d'extension sans connecter d'API IA, GitHub ou Supabase.

## Vision

TEMPOSYSTEM OS vise à devenir une couche d'orchestration légère pour transformer une intuition du Capitaine en décision traçable. Le système doit aider à clarifier les enjeux, distribuer les rôles, conserver la mémoire et faire émerger un consensus actionnable.

## Conseil de Bord

Le Conseil de Bord réunit quatre agents initiaux :

- Corvus : stratégie, architecture, cohérence.
- Claude : construction, implémentation.
- Codex : audit, sécurité, fiabilité.
- Gemini : identité visuelle, culture, design.

Dans le MVP, leurs réponses sont des espaces réservés. La prochaine étape sera de brancher ces agents sur des fournisseurs IA ou des workflows internes.

## Mémoire GitHub

GitHub est prévu comme mémoire opérationnelle : issues, décisions, journal de bord, backlog et historique des arbitrages. Le bouton "Créer une issue GitHub" est déjà présent mais désactivé tant que l'intégration n'est pas branchée.

## Rôle du Capitaine

Le Capitaine formule la question, lit le consensus, tranche la décision finale et conserve la responsabilité du cap. Les agents assistent, mais ne remplacent pas l'arbitrage humain.

## Stack

- React + Vite + TypeScript
- TailwindCSS
- Préparation Supabase via variables d'environnement
- Architecture simple par domaines fonctionnels

## Prochaines étapes

1. Connecter une première source IA pour générer des réponses d'agents.
2. Persister les questions, réponses et décisions dans Supabase.
3. Créer des issues GitHub depuis une décision validée.
4. Enrichir le journal de bord avec les décisions structurantes.
5. Ajouter des tests ciblés autour des types et des flux critiques.
