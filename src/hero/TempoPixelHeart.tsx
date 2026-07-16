/**
 * TempoPixelHeart — le cœur pixelisé minimal (charte HERO V2 §8-§10).
 *
 * Un sprite SVG manuel : grille 15 × 13, cellules PRÉ-FUSIONNÉES en bandes
 * (≈ 25 <rect>, pas de <rect> par cellule, aucune génération mathématique).
 * Une seule animation sur le groupe entier (pulsation propre, transform+opacity).
 * Le glow et le filtre sont STATIQUES.
 */

import { HEART_CELLS, HEART_COLS, HEART_ROWS, TEMPO_PALETTE } from "./tempoHeroData";

const CELL = 10;

export function TempoPixelHeart() {
  return (
    <div className="tempo-heart-wrapper">
      <svg
        className="tempo-pixel-heart"
        viewBox={`0 0 ${HEART_COLS * CELL} ${HEART_ROWS * CELL}`}
        aria-hidden="true"
        focusable="false"
        shapeRendering="crispEdges"
      >
        <g className="tempo-pixel-heart__group">
          {HEART_CELLS.map(([x, y, w, color], i) => (
            <rect
              key={i}
              x={x * CELL}
              y={y * CELL}
              width={w * CELL}
              height={CELL}
              fill={TEMPO_PALETTE[color]}
            />
          ))}
        </g>
      </svg>
    </div>
  );
}
