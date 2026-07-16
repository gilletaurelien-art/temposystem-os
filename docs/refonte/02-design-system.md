# Refonte TEMPOSYSTEM — Étape 3 : design system d'implémentation

*16/07/2026 — traduction technique de la [charte Cognitive Pixel Music](00-charte-cognitive-pixel-music.md).*
*La charte dit le QUOI et le POURQUOI ; ce document dit le COMMENT dans le code.*

---

## 1. Tokens (CSS custom properties)

Fichier unique `src/styles/tokens.css`, seule source de vérité. Aucune couleur en dur ailleurs.

```css
:root {
  /* — Fonds (charte §6) — */
  --ts-deep-space:      #030510;   /* fond absolu */
  --ts-midnight:        #070B1D;   /* fond système */
  --ts-orbital:         #0D132B;   /* surface élevée */
  --ts-signal-grid:     #1B2850;   /* lignes structurelles */

  /* — Couleurs énergétiques (charte §7) — chaque couleur CODE une fonction — */
  --ts-cyan:            #24D8FF;   /* transmission */
  --ts-blue:            #527BFF;   /* mémoire */
  --ts-violet:          #8B5CFF;   /* cohérence */
  --ts-magenta:         #F044C8;   /* impulsion humaine */
  --ts-orange:          #FF8A24;   /* décision */
  --ts-yellow:          #FFD84A;   /* anticipation */
  --ts-green:           #50E3A4;   /* validation */
  --ts-white:           #F2F5FF;   /* synchronisation complète */

  /* — Encres dérivées (lisibilité WCAG sur fonds sombres) — */
  --ts-ink:             var(--ts-white);
  --ts-ink-muted:       rgba(242,245,255,.64);
  --ts-ink-faint:       rgba(242,245,255,.40);

  /* — Dégradés à signification (charte §8) — */
  --ts-grad-contribution: linear-gradient(135deg, var(--ts-magenta), var(--ts-violet), var(--ts-blue));
      /* contribution → synchronisation → mémoire */
  --ts-grad-decision:     linear-gradient(135deg, var(--ts-violet), var(--ts-orange));
      /* cohérence → décision */

  /* — Pixel (charte §13) — */
  --ts-px-micro:  2px;
  --ts-px-signal: 4px;
  --ts-px-symbol: 12px;

  /* — Rythme (charte §15) — */
  --ts-beat:        4s;      /* pulsation fondamentale */
  --ts-transmit:    900ms;   /* transmission (600–1200) */
  --ts-sync:        3s;      /* synchronisation (2–4 s) */
  --ts-ease-pulse:  cubic-bezier(.45,0,.55,1);
  --ts-ease-signal: cubic-bezier(.22,1,.36,1);

  /* — Grille (charte §11) — */
  --ts-content-max: 1440px;
  --ts-gutter:      clamp(20px, 4vw, 64px);
  --ts-space-unit:  8px;     /* échelle d'espacement : multiples de 8 */
}
```

Interdits : couleur hors tokens, rouge hors incident réel (§20), dégradé hors dégradés à signification.

## 2. Typographie — trois voix

| Voix | Police | Chargement | Usage |
|---|---|---|---|
| **Principale** | **Space Grotesk** (400/500/700) | Google Fonts, `display=swap` | textes, nav, titres éditoriaux, boutons |
| **Pixel** | **Departure Mono** (OFL, auto-hébergée `public/fonts/`) | `@font-face`, woff2 ~30 Ko | valeurs, équation, labels système, séquences, micro-titres — **jamais de paragraphe** |
| **Système** | **IBM Plex Mono** (400/600) | Google Fonts | ADR, code, horodatages, métadonnées |

À terme : **TEMPO Pixel**, police propriétaire sur grille 8 px, remplacera Departure Mono.
Philosopher n'est **pas** utilisée ici : c'est la voix de l'univers MANA (le badge « propulsé par » la garde, lui).

Classes utilitaires : `.t-manifesto` (Space Grotesk 700, clamp(2.8rem→5.5rem), lettres serrées) ·
`.t-section` (Space Grotesk 500, 4–8 mots) · `.t-label` (petites caps, tracking .22em, Departure Mono) ·
`.t-data` (Departure Mono) · `.t-body` (Space Grotesk 400, **max-width 68ch**) · `.t-system` (IBM Plex Mono).

## 3. Grille & responsive

- Desktop : 12 colonnes, contenu max 1440 px, gouttières `--ts-gutter`. Les illustrations peuvent déborder (`.bleed` : full-bleed contrôlé).
- Tablette (≥768) : 8 colonnes. Mobile (<768) : 4 colonnes.
- **Règle §24** : chaque visualisation a DEUX mises en scène déclarées (orchestrale / solo), pas un scale-down. Concrètement : chaque composant de visualisation expose une prop `stage: "orchestral" | "solo"` et le choix se fait par media query au niveau de la section.

## 4. Mouvement — trois niveaux d'intensité (charte §16)

Implémentation : attribut `data-motion="0|1|2"` sur `<html>`, piloté par un `MotionProvider` :

```
niveau 0  ← prefers-reduced-motion:reduce  OU  choix utilisateur (persisté localStorage ts-motion)
niveau 1  ← défaut
niveau 2  ← opt-in utilisateur (« Immersion ») — réactions pointeur, parallaxe, scroll-linked riches
```

Règles de code :
- Toute animation CSS est conditionnée : `[data-motion="0"] & { animation: none }` — chaque visualisation définit son **état statique signifiant** (pas un écran gelé au hasard : l'état 3 « Énergie » de la spirale, la chaîne complète, etc.).
- Canvas/rAF : boucle **pausée hors viewport** (IntersectionObserver) et coupée au niveau 0.
- Budgets : particules ≤ 800 desktop / ≤ 200 mobile ; 1 seul canvas actif par viewport ; 60 fps cible, dégradation à 30 fps sans à-coup ; poids par illustration ≤ 60 Ko JS + assets.
- Timings imposés : pulsation `--ts-beat`, transmission `--ts-transmit`, synchronisation `--ts-sync`. Pas de constante magique locale.

## 5. Le son (préparation, pas d'implémentation au lancement)

Architecture prévue : un `SoundBus` (pub/sub) où chaque visualisation **publie** ses événements
(impulsion, synchro, décision) sans savoir s'ils sonnent. Un module WebAudio optionnel s'y abonnera
plus tard. Bouton « Écouter TEMPOSYSTEM » présent mais désactivé/masqué au lancement.
Jamais d'autoplay. Volume persisté. Se coupe au niveau 0.

## 6. Composants du design system

### 6.1 Primitives visuelles (le vocabulaire §12)

| Composant | Rôle | Technique |
|---|---|---|
| `PixelField` | fond ambiant : grille + poussière de micro-pixels | Canvas 2D, densité par niveau |
| `SignalDot` | un point lumineux, une impulsion | CSS/SVG |
| `SignalPath` | transmission entre deux points | SVG + animate, durée `--ts-transmit` |
| `PulseCore` | cœur qui respire (pulsation 4 s) | CSS |
| `EnergySpiral` | LE symbole — spirale pixel, 4 états (`state: 1|2|3|4`) | Canvas 2D (des pixels, pas un path lissé) |
| `SequencerGrid` | grille rythmique, polyrythmie → synchro | Canvas 2D |
| `WaveLine` | onde/spectre d'activité | SVG |
| `OrbitRing` | orbite (cercle incomplet si processus actif) | SVG |
| `MemoryStrata` | traces persistantes accumulées | SVG |

### 6.2 Composants d'interface (§19-20)

| Composant | Notes |
|---|---|
| `SectionShell` | wrapper de mouvement : `density: "silence"|"rythme"|"intensite"`, gère espacements, eyebrow, liaison d'entrée/sortie |
| `EnergyButton` | primaire (impulsion traversante au hover) / secondaire (bordure fine, lueur focus) |
| `SystemCard` | carte système : `--ts-midnight`, bordure `--ts-signal-grid`, ligne énergétique optionnelle (`edge: "cyan"|…`) |
| `ManifestoCard` | carte ouverte sans bordure |
| `DataTag` | **obligatoire sur toute donnée dynamique** : `status: "réel"|"simulé"|"symbolique"|"prototype"|"déclaré"` + source + date. Rendu : petit label pixel discret |
| `StateBadge` | états §20 : `operational` vert · `syncing` cyan/violet animé · `building` orange · `prototype` jaune · `waiting` bleu-gris · `incident` rouge (réel uniquement) |
| `PixelIcon` | icônes grille 16×16 / 24×24, contour pixel, 1 symbole (remplace les emojis du site public) |
| `FunctionOrb` | une fonction permanente : icône + couleur codée + **signature rythmique** (§17) jouée sur l'orbe |
| `ConsensusSpectrum` | spectre de consensus du Conseil (jamais de % inventé : n'affiche que des positions réelles/simulées étiquetées) |
| `ADRCard` | numéro (voix système) + titre + date + lien registre |
| `ChainStep` | une étape de la chaîne TEMPS→ACTION |

### 6.3 Données & contenu

- `src/config/functions.ts` — les 10 fonctions permanentes (1 cœur + 9 orbites), couleur, icône, signature rythmique, mission FR/EN. Remplace la dispersion actuelle agents.ts / CortexMap / publicSite.
- `src/config/adr.ts` — registre ADR relié aux documents réels.
- `src/config/ecosystem.ts` — hiérarchie moteur → plateforme → applications.
- Tout texte bilingue `{ fr, en }` comme aujourd'hui.

## 7. Accessibilité (charte §25)

- Contraste : encres sur `--ts-deep-space` ≥ 4.5:1 (vérifié : `--ts-ink-muted` passe, `--ts-ink-faint` réservé au décoratif).
- Chaque visualisation : `role="img"` + `aria-label` descriptif + équivalent textuel (la chaîne, la liste des fonctions, etc. existent toujours en texte réel dans le DOM).
- Focus clavier visible (anneau `--ts-cyan` 2px), skip-link, navigation intégrale au clavier (carrousel mobile inclus).
- Les états ne reposent jamais sur la seule couleur : toujours libellé (`StateBadge` = pastille + texte).
- `prefers-reduced-motion` → niveau 0 automatique.

## 8. Performance

- Lazy : chaque mouvement de la home est un composant chargé `React.lazy` en dessous de la ligne de flottaison ; canvas instancié à l'approche (IO rootMargin 200px).
- Fonts : 2 familles Google + 1 woff2 local, `font-display: swap`, subset latin.
- Images : aucune image raster dans les mouvements (tout est dessiné) hors mascotte papillon éventuelle.
- Cible Lighthouse : ≥ 90 perf mobile. Zéro dépendance ajoutée (pas de lib d'animation : CSS + rAF + SVG suffisent).

## 9. Structure de fichiers cible

```text
src/
  styles/tokens.css            ← source de vérité
  styles/typography.css
  components/system/           ← primitives (EnergySpiral, SignalPath, SequencerGrid, …)
  components/ui/               ← interface (EnergyButton, SystemCard, DataTag, StateBadge, …)
  config/functions.ts          ← 1 cœur + 9 orbites
  config/adr.ts
  config/ecosystem.ts
  movements/                   ← les 11 mouvements de la home (M01Signal.tsx … M11Battement.tsx)
  pages/                       ← conseil, memoire, moteur, applications, manifeste
  lib/motion.tsx               ← MotionProvider (niveaux 0/1/2)
  lib/soundBus.ts              ← événements (silencieux au lancement)
```

## 10. Règles de données (rappel bloquant)

Aucune valeur affichée sans `DataTag`. Les fictions actuelles (82 %, 12 458 synapses, 00:28:47,
photons) **ne migrent pas**. Une phase expérimentale peut tout à fait afficher « démonstration /
simulation / prototype / donnée illustrative » — c'est la transparence qui crédibilise le moteur.
