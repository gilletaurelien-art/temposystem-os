/**
 * TempoImpulsePanel — « Impulsions en cours » (charte HERO V2 §5, §17).
 *
 * Reprend les rôles de l'OS (dispatcher). Contenu STATIQUE : aucune animation
 * permanente, horaires figés (illustratifs). Une carte de données sobre.
 */

import { IMPULSES, TEMPO_PALETTE } from "./tempoHeroData";
import { useLang } from "../lib/lang";

const copy = {
  title: { fr: "Impulsions en cours", en: "Live impulses" },
} as const;

export function TempoImpulsePanel() {
  const { lang } = useLang();

  return (
    <section className="tempo-data-card tempo-impulse-card" aria-label={copy.title[lang]}>
      <h2 className="tempo-card-title">{copy.title[lang]}</h2>
      <ul className="tempo-impulse-list">
        {IMPULSES.map((imp, i) => (
          <li key={i} className="tempo-impulse">
            <span className="tempo-impulse__dot" style={{ background: TEMPO_PALETTE[imp.color] }} aria-hidden="true" />
            <span className="tempo-impulse__body">
              <span className="tempo-impulse__route">
                {imp.from} <span aria-hidden="true">→</span> {imp.to}
              </span>
              <span className="tempo-impulse__reason">{lang === "fr" ? imp.fr : imp.en}</span>
            </span>
            <time className="tempo-impulse__time">{imp.time}</time>
          </li>
        ))}
      </ul>
    </section>
  );
}
