# ADR-0007 - Premier déploiement public

## Numéro

ADR-0007

## Date

2026-06-28

## Statut

Accepté

## Décideur

Capitaine

## Contexte

TEMPOSYSTEM OS possède désormais un Conseil de Bord local, un équipage 2042, des ADR, une mémoire documentaire, une vision stratégique et une interface publique vivante.

Le projet est prêt à être présenté sans connecter encore d'API IA, GitHub applicatif ou Supabase.

## Problème

Le système doit pouvoir affirmer son existence publiquement avant de promettre des fonctionnalités avancées.

Si le premier déploiement attend les connexions IA ou les automatisations externes, la gouvernance risque d'être perçue comme secondaire. Or TEMPOSYSTEM OS repose d'abord sur une architecture de coopération, une mémoire durable et des décisions lisibles.

## Décision

Lancer **Launch 000**, premier déploiement public limité de TEMPOSYSTEM OS.

Ce lancement présente :

- la vision de TEMPOSYSTEM OS ;
- le Conseil de Bord ;
- l'équipage 2042 ;
- la mémoire ADR ;
- MANA comme première application civique ;
- l'état volontairement local et non connecté du système.

Le système est publié avant les connexions IA pour rendre la gouvernance visible dès la fondation.

Vercel est retenu comme cible de premier déploiement public pour sa compatibilité native avec Vite, son intégration GitHub, sa gestion simple des domaines personnalisés et ses certificats SSL automatisés.

## Alternatives étudiées

- Attendre les connexions IA avant publication : rejeté, car cela ferait passer la fonctionnalité avant la gouvernance.
- Lancer uniquement une documentation statique : rejeté, car l'interface vivante rend le système immédiatement compréhensible.
- Ajouter une configuration Vercel spécifique : rejeté pour l'instant, car la configuration native Vite suffit.

## Conséquences

- TEMPOSYSTEM OS peut être importé dans Vercel depuis GitHub.
- La vitrine publique reste sobre, institutionnelle et sans appel externe.
- Le footer indique discrètement Launch 000, premier déploiement public, 2026.
- Les futures fonctionnalités devront respecter la séparation entre présentation publique, Conseil de Bord et mémoire durable.

## Impact sur l'architecture

L'application React porte désormais une surface publique stable en plus du Conseil de Bord local.

Le déploiement ne change pas le coeur fonctionnel. Il expose le socle, clarifie la gouvernance et prépare l'arrivée progressive des connexions futures.

## Références

- [README](../../../README.md)
- [Architecture](../02_ARCHITECTURE.md)
- [Vision](../00_VISION.md)
