/**
 * TempoHeroVisual — la scène centrale (charte HERO V2 §5, §15).
 *
 * Décor 100 % statique (une seule croix de fréquence, trois lignes de connexion,
 * six nœuds fixes) rendu dans UN svg de fond, surmonté du cœur pixelisé et du
 * signal « +1 MANA ». Aucun calcul JS, aucun listener. Budget DOM < 45 éléments.
 *
 * Décoratif → aria-hidden ; le sens est porté par le texte HTML du HERO.
 */

import { SCENE_NODES, TEMPO_PALETTE } from "./tempoHeroData";
import { TempoPixelHeart } from "./TempoPixelHeart";
import { useLang } from "../lib/lang";

const copy = {
  mana: { fr: "+1 MANA", en: "+1 MANA" },
  each: { fr: "Chaque seconde", en: "Every second" },
} as const;

// Trois lignes de connexion centre → nœud (indices dans SCENE_NODES).
const LINKS = [0, 2, 3] as const;

export function TempoHeroVisual() {
  const { lang } = useLang();

  return (
    <div className="tempo-hero__visual" aria-hidden="true">
      {/* Décor statique : croix + lignes + nœuds */}
      <svg className="tempo-scene" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* croix de fréquence */}
        <line className="tempo-scene__cross" x1="50" y1="4" x2="50" y2="96" />
        <line className="tempo-scene__cross" x1="6" y1="50" x2="94" y2="50" />
        {/* lignes de connexion centre → nœud */}
        {LINKS.map((n) => (
          <line
            key={`l${n}`}
            className="tempo-scene__link"
            x1="50"
            y1="50"
            x2={SCENE_NODES[n].cx}
            y2={SCENE_NODES[n].cy}
            stroke={TEMPO_PALETTE[SCENE_NODES[n].color]}
          />
        ))}
        {/* nœuds lumineux fixes */}
        {SCENE_NODES.map((node, i) => (
          <rect
            key={`n${i}`}
            className="tempo-scene__node"
            x={node.cx - 1.3}
            y={node.cy - 1.3}
            width={2.6}
            height={2.6}
            fill={TEMPO_PALETTE[node.color]}
          />
        ))}
      </svg>

      {/* Le cœur */}
      <TempoPixelHeart />

      {/* Signal symbolique (§13) — jamais un vrai compteur */}
      <p className="tempo-mana-signal">
        <span className="tempo-mana-signal__value">{copy.mana[lang]}</span>
        <span className="tempo-mana-signal__each">{copy.each[lang]}</span>
      </p>
    </div>
  );
}
