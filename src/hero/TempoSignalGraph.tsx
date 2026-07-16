/**
 * TempoSignalGraph — graphe de fréquence léger (charte HERO V2 §11).
 *
 * 16 barres statiques dans un SVG unique. Aucune barre n'est animée
 * individuellement : le GROUPE entier a une respiration lente (scaleX + opacity)
 * — c'est la 2ᵉ des quatre animations du HERO.
 */

import { SIGNAL_BARS, TEMPO_PALETTE } from "./tempoHeroData";

const W = 320;
const H = 64;
const GAP = 4;
const BAR_W = (W - GAP * (SIGNAL_BARS.length - 1)) / SIGNAL_BARS.length;

// Teinte des barres : dégradé froid → chaud, pré-calculé (pas de calcul au rendu).
const BAR_COLORS = [
  TEMPO_PALETTE.blue,
  TEMPO_PALETTE.violet,
  TEMPO_PALETTE.magenta,
  TEMPO_PALETTE.orange,
] as const;

export function TempoSignalGraph({ label }: { label: string }) {
  return (
    <svg
      className="tempo-signal-graph"
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label={label}
      preserveAspectRatio="none"
    >
      <g className="tempo-signal-graph__group">
        {SIGNAL_BARS.map((v, i) => {
          const h = Math.max(3, v * H);
          return (
            <rect
              key={i}
              x={i * (BAR_W + GAP)}
              y={H - h}
              width={BAR_W}
              height={h}
              fill={BAR_COLORS[i % BAR_COLORS.length]}
              opacity={0.55 + v * 0.45}
            />
          );
        })}
      </g>
    </svg>
  );
}
