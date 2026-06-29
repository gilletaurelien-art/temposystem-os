# TEMPOSYSTEM OS

TEMPOSYSTEM OS n'est pas une application. C'est un système d'exploitation de la coopération entre humains et intelligences artificielles.

TEMPOSYSTEM est une énergie : une énergie produite par le temps partagé, la mémoire, les décisions et l'intelligence collective. Son interface publique doit donner la sensation d'observer le cœur vivant de cette coopération.

Le Conseil de Bord est le premier composant de cette architecture. Il permet à des fonctions permanentes d'éclairer une question, de produire un consensus et de laisser au Capitaine la décision finale.

Ce MVP ne connecte aucune API IA, aucun appel GitHub et aucune connexion Supabase. Tout fonctionne localement avec des données mockées.

## Interface publique

La page d'accueil présente TEMPOSYSTEM OS comme interface vivante pour `temposystem.fr` et `temposystem.eu`.

Elle explique la vision énergétique, l'état du système, le Conseil de Bord, l'équipage 2042, le rôle de MANA et les derniers jalons du livre de bord. Le routage reste volontairement minimal avec des liens `#/...`, sans librairie supplémentaire.

## Vision

Le but est de transformer une conversation en décision traçable. Les conversations servent à réfléchir et produire des arbitrages ; les décisions doivent ensuite rejoindre une mémoire durable afin que le système puisse évoluer sans reconstruire son contexte à chaque session.

MANA est la première application construite sur TEMPOSYSTEM OS. Le système doit rester assez générique pour accueillir d'autres applications et d'autres domaines de coopération.

## Conseil de Bord

Le Conseil de Bord ne représente pas des modèles d'IA. Il représente des rôles durables :

- Quartier-Maître : stratégie, architecture, cohérence, mémoire, gouvernance.
- Maître Charpentier : développement, implémentation, refactoring, architecture logicielle.
- Maître Calfat : audit, sécurité, qualité, performance, CI/CD, tests.
- Maître Enlumineur : identité visuelle, design system, culture, expérience utilisateur.

Les modèles actuels sont seulement des implémentations configurables de ces fonctions. Ils vivent dans `src/config/agents.ts` afin de pouvoir changer d'outil sans changer l'architecture du Conseil.

L'équipage 2042 ajoute des rôles disponibles pour le futur Timonier : Archiviste, Chancelier, Intendant, Ambassadeur, Vigie, Maître d'Essais et Cartographe. Ils sont déclarés et typés, mais ne sont pas consultés par défaut dans le Conseil actuel.

## Cycle Décisionnel

1. Le Capitaine écrit une question.
2. Il consulte le Conseil.
3. Chaque rôle produit une réponse simulée selon sa spécialité.
4. Le système génère un consensus local.
5. Le Capitaine rédige et valide sa décision.
6. La session passe au statut `decided`.

## Mémoire GitHub

GitHub est prévu comme mémoire durable : issues, décisions, journal de bord, backlog et historique des arbitrages. Cette mémoire est un actif stratégique du projet. Le bouton "Créer une issue GitHub" reste désactivé tant que l'intégration n'est pas volontairement branchée.

Les décisions structurantes sont conservées sous forme d'Architecture Decision Records dans [docs/captains-log/decisions](docs/captains-log/decisions/README.md).

## Rôle du Capitaine

Le Capitaine définit la vision, arbitre les désaccords et prend les décisions finales. Les membres du Conseil éclairent le choix, mais ne remplacent jamais la responsabilité humaine.

## Architecture Cible

À terme, TEMPOSYSTEM OS orchestrera :

- un Dispatcher, nommé Timonier, chargé de sélectionner les expertises nécessaires ;
- plusieurs capacités spécialisées ;
- une mémoire commune ;
- un protocole de décision ;
- une gouvernance humaine où le Capitaine conserve toujours la décision finale.

## Domaines Prévus

- `temposystem.eu` : documentation et gouvernance internationales en anglais.
- `temposystem.fr` : documentation et gouvernance françaises.
- `manafrance.org` : première application civique construite sur TEMPOSYSTEM OS.
- `mana.bzh` : territoire pilote et environnement d'expérimentation.

## Stack

- React + Vite + TypeScript
- TailwindCSS
- Préparation Supabase via variables d'environnement
- Architecture simple par domaines fonctionnels

## Déploiement Vercel

Le projet est prêt pour **Launch 000**, premier déploiement public Vercel avec Vite.

Configuration attendue :

- commande de build : `npm run build`
- dossier de sortie : `dist`
- framework : Vite
- aucun `vercel.json` nécessaire à ce stade

Procédure :

1. Importer le dépôt GitHub dans Vercel avec le preset Vite.
2. Vérifier que la commande de build est `npm run build` et que le dossier de sortie est `dist`.
3. Ajouter `temposystem.fr` dans Vercel Domains.
4. Ajouter `temposystem.eu` dans Vercel Domains.
5. Configurer les DNS chez le registrar selon les instructions affichées par Vercel.
6. Vérifier l'activation SSL et les redirections.

Références utiles :

- [Vercel pour Vite](https://vercel.com/docs/frameworks/vite)
- [Domaines Vercel](https://vercel.com/docs/domains)

## Prochaines étapes

1. Persister les sessions du Conseil dans Supabase.
2. Transformer une décision validée en issue GitHub.
3. Ajouter l'historique local des sessions.
4. Activer progressivement le Timonier sur les rôles 2042.
5. Brancher une première implémentation IA réelle derrière un rôle permanent.
6. Ajouter des tests ciblés autour des transitions `draft`, `consulted` et `decided`.
