/**
 * TempoHeroVisual — la scène centrale, charte « Le Temps Vivant » (§4).
 *
 * Le SOLEIL vit désormais dans le CIEL (arrière-plan, derrière les nuages — voir
 * TempoHero > PixelSun). La scène centrale ne garde que le signal symbolique
 * « +1 MANA », qui flotte devant le soleil. Aucun calcul JS, aucun listener.
 *
 * Décoratif → aria-hidden ; le sens est porté par le texte HTML du HERO.
 */

import { useLang } from "../lib/lang";

const copy = {
  mana: { fr: "+1 MANA", en: "+1 MANA" },
  each: { fr: "Chaque seconde partagée", en: "Every shared second" },
} as const;

export function TempoHeroVisual() {
  const { lang } = useLang();

  return (
    <div className="tempo-hero__visual" aria-hidden="true">
      {/* Signal symbolique (§13) — jamais un vrai compteur — flotte devant le soleil */}
      <p className="tempo-mana-signal">
        <span className="tempo-mana-signal__value">{copy.mana[lang]}</span>
        <span className="tempo-mana-signal__each">{copy.each[lang]}</span>
      </p>
    </div>
  );
}
