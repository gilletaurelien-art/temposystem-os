/**
 * TempoPixelDrumKit — le symbole central du HERO (V3, étape 1 : STRUCTURE).
 *
 * La métaphore du cœur est abandonnée : TEMPOSYSTEM = une batterie musicale
 * numérique en pixel art (TEMPO = pulsation, SYSTEM = coordination, ENERGY =
 * énergie du mouvement collectif).
 *
 * Étape 2 — LE TEMPO : mesure visuelle 4/4 à 60 BPM, 100 % CSS. La géométrie est
 * INCHANGÉE ; seuls des groupes <g> enveloppent les formes pour les animer
 * (baguettes, grosse caisse, toms). Baguette droite = chaque temps ; baguette
 * gauche = temps 2 et 4 ; grosse caisse = temps 1 et 3 ; toms en réponse.
 * Uniquement transform/opacity ; 5 éléments animés ; aucun JS, aucun effet
 * lumineux, aucun filtre. Voir les keyframes tempo-* dans tempoHero.css.
 *
 * Perf : un seul SVG, formes consolidées (un <path>/<polygon> par couleur quand
 * c'est lisible), aucune dépendance, aucun calcul au rendu. Décoratif → aria-hidden.
 */

import { TEMPO_PALETTE as P } from "./tempoHeroData";

// Couleurs de structure (sombres, peu contrastées) et accents hors palette stricte.
const STAND = "#2b3763"; // supports : bleu très sombre
const PORT = "#070b1d"; // évent de la grosse caisse
const MUTED = "#9299b5"; // centres discrets
const STICK = "#cdd2ea"; // baguettes : blanc atténué

// Supports consolidés en UN seul tracé (pieds, perches, montures).
const STANDS_D = [
  "M95 300 L95 470", // perche charleston
  "M68 470 L122 470", // base charleston
  "M112 156 L150 470", // pied cymbale gauche
  "M528 192 L500 470", // pied cymbale droite
  "M262 214 L300 250", // monture tom gauche
  "M378 214 L340 250", // monture tom droit
  "M244 452 L214 498", // ergot bas gauche
  "M396 452 L426 498", // ergot bas droit
  "M206 498 L434 498", // barre au sol
].join(" ");

export function TempoPixelDrumKit() {
  return (
    <div className="tempo-drum-kit">
      <svg
        className="tempo-drum-kit__svg"
        viewBox="0 0 640 520"
        aria-hidden="true"
        focusable="false"
        shapeRendering="crispEdges"
      >
        {/* ── Supports (derrière tout) ─────────────────────────────────── */}
        <path
          d={STANDS_D}
          fill="none"
          stroke={STAND}
          strokeWidth={6}
          strokeLinecap="square"
          strokeLinejoin="miter"
        />

        {/* ── Charleston (gauche, basse) ───────────────────────────────── */}
        <path
          d="M52 292 L148 288 L148 297 L52 301 Z M52 303 L148 300 L148 309 L52 312 Z"
          fill={P.cyan}
        />

        {/* ── Cymbale gauche (magenta, haute, plus petite) ─────────────── */}
        <polygon points="52,150 88,141 136,141 172,150 136,159 88,159" fill={P.magenta} />
        <rect x={107} y={145} width={10} height={10} fill={MUTED} />

        {/* ── Cymbale droite (orange, plus large, plus basse) ──────────── */}
        <polygon points="453,188 503,177 553,177 603,188 553,199 503,199" fill={P.orange} />
        <rect x={522} y={183} width={12} height={12} fill={MUTED} />

        {/* ── Grosse caisse (élément principal, octogone pixelisé) ─────── */}
        {/* Groupe animé : pulsation « BOUM » sur les temps 1 et 3 (géométrie inchangée). */}
        <g className="tempo-drum__kick">
          <polygon points="268,211 372,211 444,283 444,387 372,459 268,459 196,387 196,283" fill={P.orange} />
          <polygon points="273,223 367,223 432,288 432,382 367,447 273,447 208,382 208,288" fill={P.magenta} />
          {/* pattes de tension */}
          <path
            d="M246 246h8v8h-8z M386 246h8v8h-8z M212 327h8v8h-8z M420 327h8v8h-8z M246 408h8v8h-8z M386 408h8v8h-8z"
            fill={P.blue}
          />
          {/* évent central + reflet */}
          <polygon points="303,295 337,295 360,318 360,352 337,375 303,375 280,352 280,318" fill={PORT} />
          <rect x={312} y={327} width={16} height={16} fill={MUTED} />
        </g>

        {/* ── Tom gauche (violet, incliné vers le centre) — répond sur 2 et 4 ── */}
        <g className="tempo-drum__tom tempo-drum__tom--left">
          <polygon points="204,166 320,154 314,146 210,158" fill={P.blue} />
          <polygon points="204,166 320,154 302,216 214,222" fill={P.violet} />
        </g>

        {/* ── Tom droit (magenta, incliné vers le centre) — répond sur 1 et 3 ── */}
        <g className="tempo-drum__tom tempo-drum__tom--right">
          <polygon points="320,154 436,166 430,158 326,146" fill={P.pink} />
          <polygon points="320,154 436,166 426,222 338,216" fill={P.magenta} />
        </g>

        {/* ── Baguettes (groupes dédiés — prêtes à pivoter plus tard) ──── */}
        <g className="tempo-drum-kit__stick tempo-drum-kit__stick--left">
          <path d="M146 74 L156 66 L306 146 L296 154 Z" fill={STICK} />
          <path d="M296 154 L306 146 L320 154 L310 162 Z" fill={P.yellow} />
        </g>
        <g className="tempo-drum-kit__stick tempo-drum-kit__stick--right">
          <path d="M494 74 L484 66 L334 146 L344 154 Z" fill={STICK} />
          <path d="M344 154 L334 146 L320 154 L330 162 Z" fill={P.yellow} />
        </g>
      </svg>
    </div>
  );
}
