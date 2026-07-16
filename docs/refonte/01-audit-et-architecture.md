# Refonte TEMPOSYSTEM — Étape 1 (audit) & Étape 2 (architecture)

*16/07/2026 — préparé par le Charpentier, pour arbitrage du Capitaine.*
*Réfère : [00-charte-cognitive-pixel-music.md](00-charte-cognitive-pixel-music.md) + brief « Tailler le diamant ».*

---

## ÉTAPE 1 — AUDIT DE L'EXISTANT

### 1.1 Découverte critique : ce qui est réellement déployé

Le `vercel.json` du dépôt ne construit **pas** l'application React. Il sert le dossier statique `site/`
(one-pager « TEMPOSYSTEM.fr — Le Cortex », 461 lignes de HTML). L'app React (`src/`, le vrai OS avec
Conseil, CortexMap, LULLABY…) **n'existe qu'en local**.

→ Toute la refonte doit trancher ce point d'abord : **basculer le déploiement sur l'app React**
(`vite build` → `dist/`) et retirer la façade statique, sinon on redessine un site que personne ne voit.
**Recommandation : bascule sur l'app React, la façade statique part aux archives.**

### 1.2 Verdicts composant par composant

| Élément | Lignes | Verdict | Détail |
|---|---|---|---|
| `HeroTransferScene` (LULLABY ∞ + papillon) | 199 | **CONSERVER, requalifier** | Belle mécanique, synchro réelle point/éclair. Mais les compteurs Donneur/Receveur miment une mesure. Requalifier en **G. Time Sequence** symbolique, étiqueté conceptuel (charte §15). Candidat pour le mouvement 02 (l'équation), pas forcément le HERO. |
| `CortexMap` | **1338** | **RECONSTRUIRE** | Monolithe. Données fausses codées en dur : `82 %` de consensus, session `00:28:47`, `12 458` synapses, scores d'impulsion incohérents (82/12/18/82/8). Photons décoratifs. À éclater en composants du design system (FunctionOrbit, ConsensusSpectrum, SignalFlow) avec données réelles ou étiquetées. |
| `AppShell` (header + burger + footer) | 222 | **CONSERVER, restyler** | Le menu hamburger (16/07) est neuf et sain. Re-tokens couleurs/typo selon charte. |
| `EcosystemBlock` (16/07) | 255 | **CONSERVER, réécrire les rôles** | Les rôles datent d'avant la clarification : « .eu = Le cœur / .fr = L'orchestre ». Nouvelle hiérarchie : TEMPOSYSTEM = moteur, MANAtimebank = plateforme, MANA* = applications. |
| `StatusCard` + `cockpitStatusCards` | 35 | **DÉPLACER → /moteur** | États système utiles mais pas en home. Emojis 🟢🟡 → états pixel (§20). Chaque état reçoit un `DataTag` (réel/déclaré). |
| Section Conseil (snapshot home) | — | **CONSERVER le contenu, redessiner** | La consultation ADR-0007 est réelle. Redesign en **E. Decision Pulse** (question → convocation → consensus → arbitrage → ADR). |
| Section ADR + `DecisionsPage` | 57 | **CONSERVER, relier au réel** | La liste ADR-0001→0010 est du texte sans lien. Relier au registre réel (GitHub / `docs/captains-log`). Renommer la page **Mémoire**. |
| `narrativeMilestones` (Livre de Bord) | — | **DÉPLACER → page Mémoire** | Contenu narratif de qualité. Emojis tolérés ici (§14 : espaces narratifs). Plus sa place en home. |
| Section MANA + `publicDomains` | — | **RÉÉCRIRE** | Présente MANA comme *la* définition de TEMPOSYSTEM. `publicDomains` décrit temposystem.fr comme « documentation française » (obsolète). **MANAtimebank n'apparaît nulle part** alors que c'est l'étage produit. → mouvement 09 « Ce que le moteur alimente ». |
| `VisionPage` | 40 | **RECONSTRUIRE → Manifeste** | 3 cartes maigres. Devient le manifeste (canonique .eu à terme). |
| `ManaPage` | 42 | **RENOMMER → /applications** | Et réécrire selon la hiérarchie moteur → plateforme → applications. |
| `ArchitecturePage` | 37 | **ÉTOFFER → /moteur** | Accueille : architecture modulaire, états système (les StatusCards déplacées), accès GitHub/docs. |
| `CouncilPage` + `mockCouncil` | 384+109 | **CONSERVER, étiqueter SIMULATION** | Le simulateur est honnête dans le code (`generateMockCouncilResponses`) mais rien ne le dit à l'écran. Bandeau/badge **PROTOTYPE · réponses simulées** obligatoire (§19). |
| Wallpaper MANA (`mana-wallpaper`) | — | **RETIRER d'ici** | C'est la signature *MANA*. TEMPOSYSTEM doit avoir son propre fond (grille pixel + poussière d'étoiles Cognitive Pixel Music). Séparation des identités. |
| Papillon bioluminescent (pages internes) | — | **CONSERVER en ambiance, discret** | Emblème historique du produit ; la spirale devient le symbole *système*. Les deux coexistent : spirale = moteur, papillon = mascotte/marque produit. |
| `index.css` | ~700 | **REFACTORER en tokens** | Couleurs arbitraires dispersées → variables CSS de la charte (§6-7). |
| Typo actuelle (Inter + Philosopher + SF Mono) | — | **REMPLACER** | → Space Grotesk (voix principale) + Departure Mono (voix pixel) + IBM Plex Mono (voix système). Philosopher reste la voix de l'univers *MANA*, pas de TEMPOSYSTEM. |

### 1.3 Incohérence des orbites : 9 vs 10 — analyse et résolution

**Constat** (à ne pas masquer) :
- La « légende des neuf orbites » du site place le **Capitaine sur une orbite** (Vision) et **omet le Quartier-Maître** ;
- `config/agents.ts` compte bien le Quartier-Maître parmi les fonctions ;
- la charte (§17) donne des signatures rythmiques à **10** fonctions ;
- coquille récurrente : « Timonnier » → **Timonier**.

**Résolution proposée — « 1 + 9 »** : le **Capitaine au centre** (il n'orbite pas : il est le cœur qui
arbitre, battement central lent — §17) et **neuf fonctions en orbite** : Timonier, Quartier-Maître,
Charpentier, Calfat, Enlumineur, Cartographe, Vigie, Gardien, Messager. La légende devient
« Le cœur et les neuf orbites ». Le chiffre 9 historique est conservé, le Quartier-Maître retrouve
sa place, la métaphore est plus juste (le Capitaine ne gravite pas autour de lui-même).

### 1.4 Inventaire des données affichées (règle §19 : jamais de simulation non déclarée)

| Donnée | Nature réelle | Traitement |
|---|---|---|
| `82 %` consensus, `00:28:47` session | **Fiction** | **Supprimer** |
| `12 458` synapses, photons | **Fiction** | **Supprimer** |
| Scores d'impulsion 82/12/18/8 | **Fiction incohérente** | **Supprimer** |
| Compteurs LULLABY 60:00/00:00 | Symbolique (timer visite réel) | Conserver + étiquette *symbolique* |
| Consultation ADR-0007 (question/consensus/décision) | **Réelle** | Conserver, sourcer |
| Registre ADR-0001→0010 | Réel mais non relié | Relier aux documents |
| Réponses du Conseil (CouncilPage) | Simulées | Badge **SIMULATION** |
| Statuts système (🟢 opérationnel…) | Déclaratifs | DataTag *déclaré* + date |

Le design system introduit un composant **`DataTag`** (statut : `réel · simulé · symbolique · prototype · déclaré`)
appliqué à **toute** valeur dynamique.

### 1.5 Tension d'infrastructure à arbitrer : .eu / .fr

Le brief assigne des rôles distincts à **temposystem.eu** (manifeste, théorie, international) et
**temposystem.fr** (OS, Conseil, technique). Or la décision de fusion de juillet acte
« un seul site temposystem.fr, .eu → redirection 301 » (repo `temposystem-eu`).

**Options** :
1. **Réactiver .eu** comme site-manifeste distinct (revient sur la fusion) ;
2. **Un seul site, deux ailes** : temposystem.fr porte tout, avec `/manifeste` (ton .eu) et le reste (ton OS) ; .eu → 301 vers `/manifeste`. *(Recommandé : zéro infra en plus, la distinction devient éditoriale — et si le manifeste grandit, on ressort l'aile en site .eu plus tard sans rien casser.)*

---

## ÉTAPE 2 — ARCHITECTURE ÉDITORIALE & FONCTIONNELLE

### 2.1 Hiérarchie de l'écosystème (référence pour tout le contenu)

```text
Alliance MANA        — la gouvernance (Constitution, éthique, transparence, continuité)
TEMPOSYSTEM          — le moteur profond (temps, signaux, mémoire, décisions, fonctions permanentes)
MANAtimebank         — le produit logiciel (banques de temps, SaaS, marque blanche, API)   [→ manatimebank.org]
Applications         — MANA France · MANA Breizh · MANA Family · territoires · marque blanche
```

TEMPOSYSTEM n'est ni une banque de temps, ni une plateforme de bénévolat, ni un outil de gestion.
MANA est *la première application civique alimentée par TEMPOSYSTEM* — pas sa définition.
La proposition commerciale vit sur manatimebank.org et n'est **pas** recréée ici.

### 2.2 Fil conceptuel (structure narrative et visuelle centrale)

```text
TEMPS → TEMPS PARTAGÉ → CONTRIBUTION → SIGNAL → MÉMOIRE → SYNCHRONISATION → ÉNERGIE COLLECTIVE → DÉCISION → ACTION
```

### 2.3 Arborescence & navigation

```text
/                 Accueil — la composition (11 mouvements, voir 2.4)
/conseil          Le Conseil de Bord — mécanique vivante + prototype interactif (badge SIMULATION)
/memoire          La Mémoire — cycle conversation→ADR, registre ADR relié, Livre de Bord
/moteur           Le Moteur — architecture modulaire, états système, fonctions permanentes en détail, GitHub
/applications     Ce que le moteur alimente — MANAtimebank (produit) + MANA France/Breizh/Family + marque blanche
/manifeste        Le Manifeste — vision internationale, physique de la coopération (ton .eu)
```

Navigation header : `Accueil · Conseil · Mémoire · Moteur · Applications · Manifeste` + toggle FR/EN + Se connecter avec MANA.
Renommages : Décisions→Mémoire, Architecture→Moteur, Vision→Manifeste, MANA→Applications.
Routage hash conservé (redirections `#/decisions`→`#/memoire`, etc.).

### 2.4 La composition — home en 11 mouvements

Notation par mouvement : **objectif · message · contenu · interaction · illustration (famille §22) · mobile · données · liaison**.
Densité (§23) indiquée : SILENCE / RYTHME / INTENSITÉ.

**01 — Signal d'entrée** *(INTENSITÉ)*
- Objectif : saisir. Faire ressentir « quelque chose vit ici ».
- Message : `TEMPOSYSTEM — THE ENERGY OPERATING SYSTEM` + `TEMPOSYSTEM IS ENERGY`.
- Contenu : quasi aucun texte. La spirale énergétique naît à l'écran (états 1→3 de la charte §3 : signal → synchronisation → énergie).
- Interaction : niveau 2 = légère réaction au pointeur ; bouton « Écouter TEMPOSYSTEM » (préparé, inactif au lancement).
- Illustration : **A. Energy Core** (spirale pixel, pulsation 4 s).
- Mobile : spirale plein cadre, titre en dessous ; états raccourcis.
- Données : aucune.
- Liaison : la spirale émet une impulsion qui « tombe » vers le mouvement 02 au scroll.

**02 — L'équation** *(SILENCE)*
- Objectif : donner la clé de lecture minimale.
- Message : « Le temps seul est une durée. Le temps partagé devient une contribution reconnue. » puis `1 seconde = 1 MANA`.
- Contenu : deux phrases + l'équation en voix pixel. Contexte anti-crypto (§4).
- Interaction : chaque seconde réelle, un `+1` discret apparaît (étiquette *symbolique*).
- Illustration : **G. Time Sequence** — le module LULLABY requalifié, ou une séquence de pixels s'accumulant.
- Mobile : équation seule, `+1` conservé.
- Données : timer de visite (symbolique, étiqueté).
- Liaison : les pixels accumulés s'alignent et partent en flux vers 03.

**03 — La physique** *(RYTHME)*
- Objectif : expliquer la transformation.
- Message : la chaîne TEMPS → … → ACTION (2.2).
- Contenu : la chaîne en 9 étapes, chacune 1 mot + 1 ligne. C'est la **structure narrative centrale**.
- Interaction : au scroll, l'impulsion parcourt la chaîne étape par étape (scroll-linked).
- Illustration : **B. Signal Flow** vertical — un pixel magenta (contribution) qui devient signal cyan, trace bleue, énergie blanche, décision orange.
- Mobile : chaîne verticale native (aucune adaptation à faire — elle est déjà verticale).
- Données : aucune.
- Liaison : l'impulsion arrivée à ACTION déclenche la pulsation du mouvement 04.

**04 — Le rythme** *(INTENSITÉ)*
- Objectif : montrer (pas dire) la synchronisation.
- Message : « Les signaux synchronisés produisent une énergie collective. »
- Contenu : visualisation quasi pure.
- Interaction : des pixels battent en désordre, puis se synchronisent (2–4 s, §15) ; niveau 2 : le pointeur peut perturber puis laisser la resynchronisation se faire.
- Illustration : **B. Signal Flow** en grille séquenceur (polyrythmie → accord).
- Mobile : grille réduite 4×8, même narration.
- Données : aucune.
- Liaison : l'accord final « éclaire » les 10 fonctions du mouvement 05.

**05 — Les fonctions permanentes** *(RYTHME)*
- Objectif : présenter le système cognitif sans jargon IA.
- Message : « Les modèles changent. Les fonctions demeurent. »
- Contenu : le cœur (Capitaine) + 9 orbites (résolution 1.3). Chaque fonction : icône pixel 16×16 (§14), nom de fonction, nom d'équipage, mission d'une ligne, **signature rythmique** (§17) jouée sur son orbe.
- Interaction : survol/tap = la fonction joue sa signature ; les autres s'estompent.
- Illustration : **C. Cognitive Orbit** (desktop : constellation ; les couleurs codent les fonctions §7).
- Mobile : carrousel focalisé, une fonction à la fois (§24 — pas de constellation écrasée).
- Données : aucune.
- Liaison : le Messager envoie une impulsion vers le mouvement 06 (une question arrive au Conseil).

**06 — Le Conseil de Bord** *(INTENSITÉ)*
- Objectif : montrer la mécanique question → décision.
- Message : « Une question devient un consensus. Un consensus devient une décision. Une décision devient une impulsion. »
- Contenu : la **vraie** dernière consultation (ADR-0007, contenu réel existant) mise en scène : question · fonctions convoquées · spectre de consensus · arbitrage du Capitaine · ADR produite. Aucun pourcentage inventé.
- Interaction : séquence scroll-linked en 5 temps (E. Decision Pulse) ; CTA « ENTRER DANS LE CONSEIL → » vers /conseil.
- Illustration : **E. Decision Pulse** — signaux magenta/violet convergent, deviennent orange, rayonnent.
- Mobile : les 5 temps en vertical, un par écran.
- Données : consultation réelle (sourcée ADR-0007) ; le prototype interactif reste sur /conseil avec badge SIMULATION.
- Liaison : la décision « ralentit, devient bleue » et glisse vers la mémoire (transition §15).

**07 — La mémoire** *(SILENCE puis RYTHME)*
- Objectif : le cœur émotionnel — rien ne disparaît.
- Message : « Rien ne disparaît. Chaque décision importante devient mémoire. »
- Contenu : le cycle Conversation → Question → Analyse → Décision → ADR → Mémoire → Connaissance → Décision future. Puis 3 ADR réelles (0007, 0009, 0010) reliées au registre.
- Interaction : les impulsions mobiles se figent une à une en traces bleues persistantes qui forment une strate.
- Illustration : **D. Memory Trace** (bleu dominant, violet secondaire, blanc = traces consolidées — §8).
- Mobile : cycle vertical + une seule ADR mise en avant.
- Données : ADR réelles (liens registre / GitHub).
- Liaison : les strates de mémoire deviennent le socle sur lequel s'élève le mouvement 08.

**08 — Le moteur** *(RYTHME)*
- Objectif : crédibiliser techniquement sans noyer.
- Message : « Une architecture modulaire et ouverte. Les fonctions sont permanentes, les implémentations sont interchangeables. »
- Contenu : 3-4 principes d'architecture (fonctions ≠ modèles, mémoire ADR, orchestration, ouverture) + états système honnêtes (DataTag) + lien /moteur et GitHub.
- Interaction : sobre — cartes système (§19).
- Illustration : grille structurelle discrète (Signal Grid), pas de grande scène.
- Mobile : cartes empilées.
- Données : états déclarés, datés.
- Liaison : le moteur « alimente » — les lignes de la grille partent vers le mouvement 09.

**09 — Ce que le moteur alimente** *(INTENSITÉ)*
- Objectif : situer TEMPOSYSTEM ↔ MANAtimebank ↔ applications sans confusion de marque.
- Message : « Le moteur alimente une plateforme. La plateforme permet des mondes. »
- Contenu : le schéma hiérarchique TEMPOSYSTEM (moteur) ⤓ MANAtimebank (infrastructure logicielle) ⤓ MANA France · MANA Breizh · MANA Family · marque blanche · futurs projets. **Pas tous au même niveau orbital.**
- Interaction : une impulsion orange part du moteur, se divise en flux cyan/bleu vers chaque étage.
- Illustration : **F. Ecosystem Transmission**.
- Mobile : cascade verticale à 3 étages.
- Données : liens sortants réels (manatimebank.org, manafrance.org, mana.bzh, manafamily.org).
- Liaison : les flux se referment en orbite : « et demain, d'autres » — ouverture vers 10.

**10 — Entrer dans TEMPOSYSTEM** *(RYTHME)*
- Objectif : router chaque visiteur vers sa porte.
- Message : « Choisir une porte. »
- Contenu : 6 portes — Explorer la vision (/manifeste) · Entrer dans le Conseil (/conseil) · Lire les ADR (/memoire) · Ouvrir la documentation · Découvrir l'architecture (/moteur) · Consulter GitHub.
- Interaction : cartes système, impulsion au survol.
- Illustration : 6 icônes pixel 24×24, pas de scène.
- Mobile : grille 2×3.
- Données : aucune.
- Liaison : silence… puis le battement final.

**11 — Battement final** *(SILENCE)*
- Objectif : laisser une empreinte.
- Message : « Les applications changent. Les intelligences changent. Les territoires changent. **La mémoire demeure.** »
- Contenu : la phrase, la spirale en état 4 (rayonnement) très ralentie, la signature.
- Interaction : aucune. Le silence est l'interaction.
- Illustration : **A. Energy Core**, minimal.
- Mobile : identique.
- Données : aucune.
- Liaison : footer (EcosystemBlock univers MANA réécrit + footer système).

**Respiration d'ensemble** : INT · SIL · RYT · INT · RYT · INT · SIL/RYT · RYT · INT · RYT · SIL — jamais deux INTENSITÉ consécutives (§23). ✓

### 2.5 Pages intérieures (résumé)

- **/conseil** : la mécanique complète (§13 du brief) — question formulée → fonctions convoquées → arguments-signaux reliés → contradictions visibles → spectre de consensus → arbitrage → ADR → impulsion. Le prototype interactif actuel (mockCouncil) reste, **badgé PROTOTYPE · réponses simulées**.
- **/memoire** : cycle complet + registre ADR relié aux documents réels + Livre de Bord (milestones, emojis tolérés).
- **/moteur** : architecture, états système (DataTag), fonctions permanentes en fiches détaillées, liens GitHub/docs.
- **/applications** : hiérarchie 2.1 développée ; renvoi clair vers manatimebank.org pour tout ce qui est offre/tarifs/démo (rien de commercial ici).
- **/manifeste** : la physique de la coopération, ton prospectif international ; sert de canonique « .eu » (cf. arbitrage 1.5).

### 2.6 Ce qui sort de la home actuelle

Cockpit/StatusCards → /moteur · Milestones → /memoire · Liste de domaines → /applications + footer ·
Détail des rôles → /moteur (fiches) · Le tableau-légende 9 orbites → remplacé par le mouvement 05.
