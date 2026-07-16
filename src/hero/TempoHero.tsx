/**
 * TempoHero — le HERO de TEMPOSYSTEM, reconstruit en interface web légère
 * (brief « HERO V2 ultra-performant », 16/07/2026).
 *
 * On ne sert plus l'illustration : on en reconstruit l'ESPRIT en code (charte
 * §1-§3). Zéro WebGL/Canvas/RAF, zéro listener, quatre animations maximum
 * (transform + opacity uniquement). Le message est porté par de VRAIS textes
 * DOM (SEO §21) ; la scène centrale est décorative (aria-hidden).
 *
 * Colonnes : éditorial · scène (cœur + signal) · données système.
 */

import { useLang } from "../lib/lang";
import { TempoHeroVisual } from "./TempoHeroVisual";
import { TempoEquation } from "./TempoEquation";
import { TempoStatusPanel } from "./TempoStatusPanel";
import "./tempoHero.css";

const copy = {
  sub: { fr: "The Energy Operating System", en: "The Energy Operating System" },
  intro: {
    fr: "Une seconde de temps partagé devient une unité d'énergie collective.",
    en: "One second of shared time becomes one unit of collective energy.",
  },
  principles: {
    fr: ["Elle circule.", "Elle se mémorise.", "Elle oriente les décisions."],
    en: ["It circulates.", "It is remembered.", "It steers decisions."],
  },
  ctaCouncil: { fr: "Entrer dans le Conseil", en: "Enter the Council" },
  ctaVision: { fr: "Lire la vision", en: "Read the vision" },
  // Bloc battement (§6, §12) — 60 BPM.
  beatTitle: { fr: "Battement du système", en: "System heartbeat" },
  beatState: { fr: "Énergie synchronisée", en: "Energy synchronised" },
  // Description accessible de la scène décorative (§20).
  sceneDesc: {
    fr: "Le cœur énergétique du système : un signal pixelisé qui bat, relié à quelques nœuds, entouré du flux et de l'état du système.",
    en: "The energy core of the system: a pulsing pixel signal, linked to a few nodes, surrounded by the flow and state of the system.",
  },
} as const;

// Tracé ECG unique (§12) — un seul <path>, déplacé par translation du groupe.
const ECG_PATH =
  "M0 20 L25 20 L31 17 L36 25 L42 8 L49 30 L57 20 L90 20 L96 17 L101 24 L108 12 L115 27 L123 20 L160 20";

export function TempoHero() {
  const { lang } = useLang();
  const principles = copy.principles[lang];
  const principleColors = ["var(--tempo-cyan)", "var(--tempo-magenta)", "var(--tempo-orange)"];

  return (
    <section id="m01-signal" className="tempo-hero" aria-labelledby="tempo-hero-title">
      <div className="tempo-hero__layout">
        {/* ── Colonne éditoriale ─────────────────────────────────────────── */}
        <div className="tempo-hero__editorial">
          <h1 id="tempo-hero-title" className="tempo-hero__title">
            <span className="tempo-hero__title-mono">TEMPOSYSTEM</span>
            <span className="tempo-hero__title-energy">IS ENERGY</span>
          </h1>
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

          <nav className="tempo-hero__cta" aria-label={lang === "fr" ? "Actions principales" : "Primary actions"}>
            <a className="tempo-hero__cta-primary" href="#/conseil">
              {copy.ctaCouncil[lang]} <span aria-hidden="true">→</span>
            </a>
            <a className="tempo-hero__cta-secondary" href="#/manifeste">
              {copy.ctaVision[lang]} <span aria-hidden="true">↗</span>
            </a>
          </nav>

          {/* Battement du système — 60 BPM + tracé ECG (§6, §12) */}
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

        {/* ── Scène centrale ─────────────────────────────────────────────── */}
        <div className="tempo-hero__stage">
          <p className="tempo-sr-only">{copy.sceneDesc[lang]}</p>
          <TempoHeroVisual />
        </div>

        {/* ── Colonne de données ─────────────────────────────────────────── */}
        <TempoStatusPanel />
      </div>
    </section>
  );
}
