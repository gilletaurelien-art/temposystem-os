# CHARTE GRAPHIQUE TEMPOSYSTEM — Le Temps Vivant

**Version fondatrice — juillet 2026** · Gravée au dépôt le 16/07/2026.
*Refonte de la charte « Cognitive Pixel Music » (voir [archive](00-charte-cognitive-pixel-music.md)).*
*Aperçu de référence : [planche-temps-vivant.html](planche-temps-vivant.html).*

---

## 0. Pourquoi cette refonte

« Cognitive Pixel Music » disait juste sur le fond (le temps, la mémoire, la coopération) mais parlait **froid, geek et daté** : bleu-noir spatial, néons cyan-violet, data qui clignote, police pixel-texte. TEMPOSYSTEM n'est pas un terminal de hacker ni un dashboard. C'est le **système d'exploitation du temps donné** — quelque chose de vivant, de chaud et de simple.

On garde le **pixel art** comme grammaire — mais on le remet au service de la **nature** (un ciel, un soleil, des nuages) au lieu de la donnée. Le froid devient jour ; le néon devient lumière.

## 1. Idée directrice

**LE TEMPS VIVANT**

Le temps n'est pas une donnée qui clignote — c'est **un ciel qui passe**. Le temps donné se comporte comme le vivant : il **respire**, il **coule** (les nuages dérivent), il **revient** (le cycle du jour). La coopération n'est pas une décharge électrique : c'est une **lumière** qui se donne et qu'on garde en mémoire.

Trois verbes fondateurs — **Respirer** (rien n'est immobile), **Passer** (le temps s'écoule et laisse une trace), **Revenir** (le cycle, la mémoire, l'éternel retour du jour).

## 2. Personnalité visuelle

TEMPOSYSTEM doit être : **tendre**, mais rigoureux · **lumineux**, mais jamais criard · **simple**, mais profond · **vivant**, sans être un jeu vidéo · **pixel**, mais chaud et naturel · **calme**, mais habité · **poétique**, sans être vague · humain avant d'être technique.

Ce qu'il **n'est pas** : un terminal de hacker, un dashboard SaaS, un univers cyberpunk, une plateforme crypto, un jeu arcade rétro, une landing page d'IA générique. *La technologie apparaît comme une force de coopération, pas comme un instrument de domination.*

## 3. Le décor fondateur — le ciel &amp; ses nuages

Le fond de l'univers TEMPOSYSTEM est un **ciel bleu clair en pixel art**, rendu en **bandes horizontales** (dégradé à paliers durs, jamais lissé) qui évoquent le ciel des jeux 8-bit — tendre, immédiat, universel.

Trois **nuages blancs** de tailles différentes le traversent en permanence, **très lentement**, en arrière-plan fixe (le contenu défile, le ciel reste). Les nuages sont **blocky** (rectangles nets, une ombre bleutée en bas). Ils sont le visage du temps qui passe : *une seconde partagée, un nuage de plus qui passe.*

- Le ciel est **fixe** (`position: fixed`) : on ne « scrolle pas le ciel », on avance dessous.
- Les nuages **dérivent** lentement (68–130 s pour traverser) à trois vitesses distinctes (légère parallaxe) + un **flottement** vertical de quelques pixels.
- Un **voile de lumière** (dégradé blanc translucide, du transparent en haut vers laiteux en bas) assied le texte sur le ciel sans l'écraser.

## 4. Le symbole central — le soleil pixel

Le cœur d'énergie devient un **soleil en pixel art** : un disque construit en **octogone de blocs** (dégradé du miel au soleil), entouré de **rayons pixel** et d'un **halo d'anneaux** fins. Il **respire** (pulsation ≈ 5 s), posé dans le ciel.

**Ce qu'il représente** : l'énergie donnée, l'aube, la source, la présence. C'est la version compacte du logo (favicon, avatar, indicateur de chargement, bouton du Conseil).

**Interdits** : soleil réaliste photographique · dégradé arc-en-ciel · lens-flare 3D · soleil « souriant » cartoon · rayons animés qui tournent en permanence (le mouvement est un souffle, pas un moulin).

## 5. Signature

- Signature principale : **LE TEMPS VIVANT**
- Signature descriptive : **Le système d'exploitation du temps donné.**
- Équation fondatrice : **1 seconde = 1 MANA** — toujours contextualisée pour n'évoquer ni cryptomonnaie ni devise. Formulation recommandée : *« Une seconde partagée devient une trace vivante — pas une créance. »*
- Formule-mantra : *une seconde partagée — un nuage qui passe.*

## 6. Palette — le ciel &amp; le cycle du jour

**Deux familles : le ciel qui porte, la lumière qui se donne.**

### Ciel &amp; matière (fonds &amp; encres)

| Nom | Hex | Usage |
|---|---|---|
| **Ciel haut** | `#8CCBEE` | fond, bande supérieure |
| **Ciel** | `#A0D5F1` / `#B3DEF4` | bandes intermédiaires |
| **Ciel horizon** | `#C6E8F7` | fond, bande basse |
| **Nuage** | `#FEFFFF` | nuages, points de lumière |
| **Ombre de nuage** | `#C7DEEF` | face inférieure des nuages (pixel-shading) |
| **Parchemin** | `#FBFAF5` | cartes, panneaux, surfaces de lecture |
| **Parchemin alt** | `#F3EFE4` | surfaces secondaires |
| **Encre** | `#2A2620` | texte (brun d'encre chaud, jamais noir pur) |

### Le cycle du jour (accents — chaque couleur code une fonction)

| Couleur | Hex | Code |
|---|---|---|
| **Soleil** | `#F2A73B` | énergie donnée, décision, aube, source |
| **Miel** | `#E7B441` | anticipation, horizon, signal faible |
| **Terre cuite** | `#D6704A` | présence humaine, contribution, matière, chaleur |
| **Sève** | `#7E9A4F` | croissance, validation, état opérationnel |
| **Marée** | `#3E8F86` | flux, transmission, circulation, données en mouvement |
| **Crépuscule** | `#5B6BA6` | mémoire, trace, archivage, nuit, ADR |

### Nuit tiède (espaces système / immersifs, optionnel)

Pour les espaces techniques profonds (Conseil, Livre de Bord, mode immersif), une **nuit tiède** — brun d'encre chaud `#171310` / panneau `#241C15` — remplace l'ancien bleu-noir spatial. Le jour reste le mode par défaut ; la nuit tiède est une exception intentionnelle, jamais le froid d'avant.

**Rouge** : réservé **exclusivement** aux incidents réels (§20). Jamais décoratif.

## 7. Règles de couleur

Une section n'utilise jamais tout le cycle en même temps. Règle : **le ciel (fond) + le parchemin (surface) + une dominante d'accent + une couleur d'impulsion + l'encre**.

- *Section Mémoire* : crépuscule dominant, marée pour les nouvelles informations, encre pour les traces consolidées.
- *Section Conseil* : terre cuite (présence humaine) + soleil (décisions) + sève (validations).
- *Section Écosystème* : soleil comme source, marée/crépuscule pour les transmissions.

Les dégradés expriment une **transformation réelle** : `Terre cuite → Soleil → Miel` = contribution → énergie → horizon ; `Soleil → Marée → Crépuscule` = aube → écoulement → mémoire. Jamais de dégradé purement décoratif.

## 8. Typographie — trois voix, plus chaudes

| Voix | Police | Usage |
|---|---|---|
| **Manifeste** | **Fraunces** (axes optiques `opsz`, `SOFT`, `WONK`) | titres, manifeste, moments d'émotion. Serif organique, vivante, intemporelle. L'italique `SOFT`/`WONK` colore un mot-clé (souvent en terre cuite). |
| **Courante** | **Instrument Sans** (humaniste) | textes, navigation, descriptions, boutons. Chaleureuse et lisible — un grotesque **humaniste**, jamais une géométrique froide. |
| **Système** | **IBM Plex Mono** | ADR, code, horodatages, labels système, équation, données. |

**Changement majeur vs Pixel Music** : on **abandonne la police pixel/bitmap pour le texte** (le signal « geek »). Le pixel vit désormais dans l'**image** (ciel, soleil, nuages, icônes), plus dans les lettres.

### Hiérarchie

- *Titre manifeste* : Fraunces, très grand, peu de mots (« Le Temps **Vivant** »).
- *Titre de section* : Fraunces, éditorial, 4–8 mots.
- *Label système* : IBM Plex Mono, petites capitales, tracking `.22em` (`MÉMOIRE ACTIVE · ADR-0011`).
- *Donnée* : IBM Plex Mono (`+1 MANA · 00:00:01 · SYNCHRONISÉ`).
- *Corps* : Instrument Sans, largeur contenue **62–68 caractères**.

## 9. La grille

- **Desktop** : 12 colonnes, contenu max **1180–1440 px**, marges généreuses. Le ciel et les nuages débordent librement (sensation d'expansion, d'air).
- **Tablette** : 8 colonnes. **Mobile** : 4 colonnes — le ciel reste, un seul nuage visible à la fois, narration verticale.
- Espacement sur une échelle de **8 px**.

## 10. Formes — un vocabulaire du ciel &amp; de l'eau

Le **soleil** (énergie donnée) · le **nuage** (temps qui passe) · l'**onde** (rythme, propagation) · la **marée** (flux, transmission) · la **graine** (présence, potentiel) · les **strates** (traces persistantes, ADR) · le **point de lumière** (signal, présence). Toutes dessinées en **pixel** ou en courbe douce. Éviter les formes décoratives sans fonction ; éviter la grille froide et l'orbite mécanique d'avant.

## 11. Style pixel — tendre, pas technique

Le pixel reste net (`shape-rendering: crispEdges`, `image-rendering: pixelated`), mais il dessine des **choses vivantes** : un ciel, un soleil, un nuage, une graine. Blocs francs, ombres simples d'un ton en dessous (pixel-shading). Pas de flou général ; les halos peuvent entourer, le cœur reste net.

**Échelles** : *micro* 1–2 px (poussière de lumière) · *signal* 3–5 px (détails) · *symbolique* 8–16 px (icônes, nuages, soleil) · *macro* exceptionnel (moments manifestes).

## 12. Iconographie

Grille **16×16 ou 24×24 px**, contour ou blocs pixel, un symbole central, animation limitée, lisibilité immédiate. Exemples : Mémoire = strates · Vision/Anticipation = horizon + soleil bas · Cohérence = deux ondes qui s'accordent · Transmission = marée · Présence = graine · Temps = nuage. **Éviter les emojis** comme langage principal du site public (tolérés dans le Livre de Bord).

## 13. Mouvement — respirer, dériver, revenir

Le mouvement imite le **ciel**, jamais la machine. Lent, doux, hypnotique. La page respire.

- **Dérive** *(défaut, ambiant)* : les nuages traversent le ciel en 68–130 s, trois vitesses.
- **Souffle** : le soleil et les éléments vivants inspirent/expirent, cycle ≈ **5,2 s** (plus lent et organique que l'ancien 4 s).
- **Flottement** : léger bob vertical (± 8 px, 7–11 s) — rien n'est parfaitement immobile.
- **Passage** : un nuage/signal qui traverse d'un bord à l'autre, jamais un clignotement.
- **Seconde contributive** : un `+1` discret **symbolique** peut apparaître au fil du temps — jamais un compteur mensonger.

### Trois intensités (`data-motion="0|1|2"`)

- **0 — Statique** : `prefers-reduced-motion`, appareils modestes. Ciel figé, nuages posés, soleil au repos (état signifiant, pas un gel au hasard).
- **1 — Respiration** *(défaut)* : dérive lente des nuages + souffle du soleil.
- **2 — Immersion** : parallaxe des nuages au pointeur/scroll, réactions douces. Opt-in.

## 14. Son (préparé, pas au lancement)

Silencieux par défaut. Contrôle explicite **« Écouter TEMPOSYSTEM »**. Son minimal, doux, spatial, génératif — comme du vent, un souffle, une note tenue. Jamais d'autoplay, jamais de basses agressives ni de bruitages arcade. Le passage d'un nuage peut devenir une note tenue.

## 15. Composants d'interface

- **Bouton principal** : dégradé du soleil (`Terre cuite → Soleil → Miel`), texte encre sombre, coins très arrondis (999px), impulsion douce au survol.
- **Bouton secondaire** : parchemin translucide, bordure fine, lueur au focus.
- **Carte / panneau** : parchemin `#FBFAF5` translucide (`backdrop-filter`), bordure `hairline`, coins généreux (22–26px), ombre portée douce et basse — la carte flotte comme une feuille de papier dans le ciel.
- **Donnée dynamique** : toujours accompagnée de son nom, sa source, son statut, sa date. **Les simulations sont identifiées comme telles** (`DataTag`).

## 16. États système

Opérationnel = **sève** discrète · En synchronisation = **marée** animée · En construction = **soleil** doux · Prototype = **miel** · En attente = **crépuscule** · Incident = **rouge** (réel uniquement, jamais décoratif). Un état ne repose **jamais** sur la seule couleur : toujours une pastille **+ un libellé**.

## 17. Photographie &amp; illustration

Priorité à l'illustration pixel dessinée. Photos rares. Présence humaine : silhouettes, mains, gestes, foules — jamais de photo corporate générique.

**Familles d'illustrations** : *Ciel du jour* (le décor vivant) · *Soleil* (l'énergie, le HERO) · *Nuages* (le temps qui passe, les transitions) · *Marée* (transmission, API, circulation) · *Strates* (mémoire, ADR, Livre de Bord) · *Graine* (présence, contribution) · *Cycle jour→nuit* (l'équation, le temps contributif).

## 18. Densité &amp; composition

La page respire comme une journée : **Silence** (beaucoup de ciel, une phrase) · **Rythme** (une séquence mesurée) · **Intensité** (un grand soleil, une marée, une révélation). Deux sections très intenses ne se suivent jamais.

**Cinq questions par section** : Quelle énergie entre ? Quelle transformation ? Quelle trace reste ? Quelle énergie sort ? Comment nourrit-elle la suivante ?

## 19. Responsive

Desktop = ciel large, expérience ample. Mobile = **une fenêtre sur le ciel** : le décor demeure, un seul nuage à la fois, un seul signal, narration verticale. Le mobile n'est pas une version appauvrie : c'est un **cadrage** différent et intentionnel. Les essentiels demeurent : le ciel, le soleil, l'équation, les fonctions, la mémoire.

## 20. Accessibilité

La beauté ne dépend jamais **exclusivement** de la couleur, du mouvement, du son ou d'un contraste faible. Prévoir : contraste WCAG (encre `#2A2620` sur ciel/parchemin ≥ 4.5:1), focus clavier visible, textes alternatifs, descriptions des visualisations, désactivation du son, `prefers-reduced-motion` → niveau 0, pause des animations, données accessibles en texte, états toujours libellés.

## 21. Règle de données (bloquante)

Aucune valeur affichée sans **`DataTag`** (nom, source, statut, date). Les fictions de l'ancien site (82 %, 12 458 synapses, 00:28:47…) **ne migrent pas**. Une phase expérimentale peut afficher « démonstration / simulation / prototype » — c'est la transparence qui crédibilise le système.

## 22. Rapport à l'univers MANA

TEMPOSYSTEM tient l'axe **lumineux** de la charte-mère MANA, mais l'exprime en **jour chaud** plutôt qu'en froid : le ciel bleu clair et le soleil doré marient le froid (ciel, marée, crépuscule) et le chaud (soleil, terre cuite, miel). L'équation « 1 seconde = 1 MANA » relie l'expérience MANA (l'état lumineux) à la comptabilité TEMPOSYSTEM (la trace). *Une trace, pas une créance.*

## 23. Ce qu'on garde de Cognitive Pixel Music

Le pixel comme grammaire · les 3 voix typographiques (réchauffées) · IBM Plex Mono en voix système · les 3 niveaux de mouvement (`data-motion`) · la règle du `DataTag` · la doctrine « mana n'est pas de l'argent, une trace pas une créance » · l'exigence d'accessibilité · la composition en cinq questions.

## 24. Promesse visuelle

À l'entrée : *« Il fait beau ici. »* — En poursuivant : *« Ce ciel a une mémoire. »* — Puis : *« Chaque seconde que je donne y laisse une trace. »* — Enfin : *« Je peux entrer et contribuer à ce jour qui dure. »*

## 25. Signature finale

Une seconde est un souffle.
Un nuage est une trace.
Le jour revient toujours.

**LE TEMPS VIVANT.**
