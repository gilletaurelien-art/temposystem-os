/**
 * tempoHeroData.ts — données structurelles du HERO (Cognitive Pixel Music).
 *
 * Tout ce qui est calculable une fois pour toutes vit ici : aucun calcul continu,
 * aucune distance-au-centre recalculée au rendu (charte perf §8). Les cellules du
 * cœur sont PRÉ-FUSIONNÉES en bandes rectangulaires (charte §8 du brief HERO V2).
 */

/** Palette énergétique (§22 du brief) — dupliquée en JS pour teinter le SVG sans var(). */
export const TEMPO_PALETTE = {
  white: "#f4f6ff",
  cyan: "#24d8ff",
  blue: "#527bff",
  violet: "#8b5cff",
  magenta: "#f044c8",
  pink: "#ff3b8d",
  orange: "#ff8a24",
  yellow: "#ffd84a",
  green: "#50e3a4",
} as const;

export type TempoColor = keyof typeof TEMPO_PALETTE;

/**
 * Cœur pixelisé — grille 15 × 13 (§8). Chaque entrée est une BANDE horizontale
 * déjà fusionnée : [colonne de départ, ligne, largeur en cellules, couleur].
 * Le corps froid (violet → magenta) est posé d'abord, puis le foyer chaud
 * (orange → jaune → blanc) par-dessus : ~25 rectangles opaques, glow au centre.
 */
export const HEART_COLS = 15;
export const HEART_ROWS = 13;

export type HeartCell = [x: number, y: number, w: number, color: TempoColor];

export const HEART_CELLS: readonly HeartCell[] = [
  // ── corps froid (lobes + pointe) ──────────────────────────────────────────
  [2, 0, 3, "violet"], [11, 0, 3, "violet"], //  lobe gauche / droit (haut)
  [1, 1, 5, "violet"], [9, 1, 5, "violet"],
  [0, 2, 7, "magenta"], [8, 2, 7, "magenta"],
  [0, 3, 15, "magenta"],
  [0, 4, 15, "magenta"],
  [1, 5, 13, "magenta"],
  [2, 6, 11, "magenta"],
  [3, 7, 9, "magenta"],
  [4, 8, 7, "magenta"],
  [5, 9, 5, "violet"],
  [6, 10, 3, "violet"],
  [7, 11, 1, "violet"], // pointe
  // ── foyer chaud (posé par-dessus, glow vertical central) ───────────────────
  [5, 3, 5, "orange"],
  [4, 4, 7, "orange"],
  [4, 5, 7, "orange"],
  [4, 6, 5, "orange"],
  [5, 7, 3, "orange"],
  [6, 4, 3, "yellow"],
  [5, 5, 5, "yellow"],
  [6, 6, 3, "yellow"],
  // ── noyau incandescent ─────────────────────────────────────────────────────
  [7, 4, 1, "white"],
  [6, 5, 3, "white"],
];

/**
 * Nœuds lumineux fixes autour du cœur (§15). Coordonnées en % de la scène,
 * ≤ 6 nœuds. Aucun mouvement.
 */
export const SCENE_NODES: readonly { cx: number; cy: number; color: TempoColor }[] = [
  { cx: 26, cy: 30, color: "cyan" },
  { cx: 74, cy: 24, color: "orange" },
  { cx: 82, cy: 62, color: "yellow" },
  { cx: 18, cy: 66, color: "violet" },
  { cx: 60, cy: 80, color: "magenta" },
  { cx: 40, cy: 16, color: "blue" },
];

/** Hauteurs (0–1) des 16 barres du graphe de fréquence — statiques (§11). */
export const SIGNAL_BARS: readonly number[] = [
  0.30, 0.55, 0.40, 0.72, 0.48, 0.88, 0.62, 0.95,
  0.58, 0.80, 0.44, 0.68, 0.36, 0.60, 0.30, 0.50,
];

/** Impulsions en cours — rôles de l'OS (language-neutral), motif bilingue. */
export interface Impulse {
  from: string;
  to: string;
  fr: string;
  en: string;
  time: string;
  color: TempoColor;
}

export const IMPULSES: readonly Impulse[] = [
  { from: "Timonier", to: "Capitaine", fr: "Cohérence du cap", en: "Course coherence", time: "14:31", color: "cyan" },
  { from: "Charpentier", to: "Calfat", fr: "Analyse d'impact", en: "Impact analysis", time: "14:31", color: "orange" },
  { from: "Cartographe", to: "Tous", fr: "Mémoire du système", en: "System memory", time: "14:31", color: "green" },
  { from: "Enlumineur", to: "Charpentier", fr: "Signal UX structure", en: "UX structure signal", time: "14:31", color: "magenta" },
  { from: "Capitaine", to: "Tous", fr: "Point de synchronisation", en: "Synchronisation point", time: "14:31", color: "violet" },
];

/** État du système — paires déclaratives honnêtes (§17), aucun faux compteur. */
export interface SystemState {
  fr: string;
  en: string;
  valueFr: string;
  valueEn: string;
  color: TempoColor;
}

export const SYSTEM_STATES: readonly SystemState[] = [
  { fr: "Conseil de bord", en: "Bridge council", valueFr: "Opérationnel", valueEn: "Operational", color: "green" },
  { fr: "Mémoire", en: "Memory", valueFr: "Synchronisée", valueEn: "Synchronised", color: "green" },
  { fr: "Gouvernance", en: "Governance", valueFr: "Active", valueEn: "Active", color: "green" },
  { fr: "Applications", en: "Applications", valueFr: "1 active", valueEn: "1 active", color: "green" },
  { fr: "Timonier", en: "Helmsman", valueFr: "Prototype", valueEn: "Prototype", color: "yellow" },
  { fr: "API IA", en: "AI API", valueFr: "En attente", valueEn: "Standby", color: "orange" },
];

/** Constellations reliées — comptes structurels modestes (pas de métrique gonflée). */
export interface Constellation {
  count: string;
  fr: string;
  en: string;
  color: TempoColor;
}

export const CONSTELLATIONS: readonly Constellation[] = [
  { count: "12", fr: "Humains", en: "Humans", color: "cyan" },
  { count: "9", fr: "Orbites", en: "Orbits", color: "yellow" },
  { count: "4", fr: "Projets", en: "Projects", color: "violet" },
  { count: "2", fr: "Territoires", en: "Territories", color: "magenta" },
];
