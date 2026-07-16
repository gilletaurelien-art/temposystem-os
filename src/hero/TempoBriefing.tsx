/**
 * TempoBriefing — les modules d'information DÉPLACÉS du HERO vers la page Conseil
 * (16/07/2026, demande du Capitaine « déplace tous les modules du hero dans Conseil »).
 *
 * Le HERO ne garde plus que la scène (ciel · soleil · arbre) et le titre. Tout le
 * reste vit ici : sous-titre · intro · trois verbes · équation · signal · actions ·
 * battement · panneau de données. Panneau « jour » autonome (fond clair) posé sur
 * la page Conseil. Réutilise les classes/tokens du hero (tempoHero.css).
 */

import { useLang } from "../lib/lang";
import { TempoEquation } from "./TempoEquation";
import { TempoStatusPanel } from "./TempoStatusPanel";
import "./tempoHero.css";

const copy = {
  sub: {
    fr: "L'infrastructure d'orchestration de l'action collective",
    en: "The orchestration infrastructure for collective action",
  },
  intro: {
    fr: "Chaque seconde partagée devient une trace vivante — une mémoire qui avance sans se perdre. Une trace, jamais une créance.",
    en: "Every shared second becomes a living trace — a memory that moves forward without being lost. A trace, never a debt.",
  },
  principles: {
    fr: ["Il respire.", "Il passe.", "Il revient."],
    en: ["It breathes.", "It passes.", "It returns."],
  },
  mana: { fr: "+1 MANA", en: "+1 MANA" },
  manaEach: { fr: "Chaque seconde partagée", en: "Every shared second" },
  ctaCouncil: { fr: "Entrer dans le Conseil", en: "Enter the Council" },
  ctaVision: { fr: "Lire la vision", en: "Read the vision" },
  beatTitle: { fr: "Battement du système", en: "System heartbeat" },
  beatState: { fr: "Temps synchronisé", en: "Time synchronised" },
  actions: { fr: "Actions principales", en: "Primary actions" },
} as const;

// Tracé ECG unique (§12) — un seul <path>, déplacé par translation du groupe.
const ECG_PATH =
  "M0 20 L25 20 L31 17 L36 25 L42 8 L49 30 L57 20 L90 20 L96 17 L101 24 L108 12 L115 27 L123 20 L160 20";

export function TempoBriefing() {
  const { lang } = useLang();
  const principles = copy.principles[lang];
  const principleColors = ["var(--ts-tide)", "var(--ts-terracotta)", "var(--ts-sun)"];

  return (
    <div className="tempo-briefing">
      <div className="tempo-briefing__grid">
        {/* Éditorial + équation + actions + battement */}
        <div className="tempo-hero__editorial">
          <p className="tempo-hero__sub">{copy.sub[lang]}</p>

          <p className="tempo-hero__intro">{copy.intro[lang]}</p>

          <ul className="tempo-hero__principles">
            {principles.map((line, i) => (
              <li key={line}>
                <span className="tempo-hero__principle-mark" style={{ color: principleColors[i] }} aria-hidden="true">
                  +
                </span>
                {line}
              </li>
            ))}
          </ul>

          <TempoEquation />

          <p className="tempo-mana-signal" aria-hidden="true">
            <span className="tempo-mana-signal__value">{copy.mana[lang]}</span>
            <span className="tempo-mana-signal__each">{copy.manaEach[lang]}</span>
          </p>

          <nav className="tempo-hero__cta" aria-label={copy.actions[lang]}>
            <a className="tempo-hero__cta-primary" href="#/conseil">
              {copy.ctaCouncil[lang]} <span aria-hidden="true">→</span>
            </a>
            <a className="tempo-hero__cta-secondary" href="#/manifeste">
              {copy.ctaVision[lang]} <span aria-hidden="true">↗</span>
            </a>
          </nav>

          <div className="tempo-beat" aria-label={`${copy.beatTitle[lang]} — 60 BPM`}>
            <div className="tempo-beat__head">
              <span className="tempo-beat__label">{copy.beatTitle[lang]}</span>
              <span className="tempo-beat__bpm">60&nbsp;BPM</span>
            </div>
            <svg className="tempo-ecg" viewBox="0 0 160 40" preserveAspectRatio="none" aria-hidden="true">
              <g className="tempo-ecg-track">
                <path className="tempo-ecg-line" d={ECG_PATH} />
                <path className="tempo-ecg-line" d={ECG_PATH} transform="translate(160 0)" />
              </g>
            </svg>
            <span className="tempo-beat__state">{copy.beatState[lang]}</span>
          </div>
        </div>

        {/* Panneau de données système */}
        <TempoStatusPanel />
      </div>
    </div>
  );
}
