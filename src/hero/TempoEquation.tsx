/**
 * TempoEquation — la clé de lecture « 1 SECONDE = 1 MANA » (charte HERO V2 §6).
 * Texte réel dans le DOM (indexable), voix pixel. Aucune animation.
 */

import { useLang } from "../lib/lang";

const copy = {
  legend: {
    fr: "La matière première du temps contributif",
    en: "The raw material of contributive time",
  },
  aria: { fr: "1 seconde égale 1 MANA", en: "1 second equals 1 MANA" },
} as const;

export function TempoEquation() {
  const { lang } = useLang();

  return (
    <div className="tempo-equation">
      <p className="tempo-equation__row" aria-label={copy.aria[lang]}>
        <span className="tempo-equation__time">1&nbsp;SECONDE</span>
        <span className="tempo-equation__sign" aria-hidden="true">=</span>
        <span className="tempo-equation__mana">1&nbsp;MANA</span>
      </p>
      <p className="tempo-equation__legend">{copy.legend[lang]}</p>
    </div>
  );
}
