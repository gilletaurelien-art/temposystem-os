/**
 * TempoHero — le HERO (« header ») de TEMPOSYSTEM OS, charte « Le Temps Vivant ».
 *
 * Bannière 16:9 : boucle lente de trois illustrations de l'île TEMPOSYSTEM,
 * enchaînées en FONDUS CSS (opacity uniquement, ~24 s, aucun JavaScript, ni vidéo
 * ni GIF) — 01 coordination en cours → 02 décision validée → 03 mémoire nocturne.
 * Les images ne sont pas modifiées graphiquement (object-fit: contain, île entière).
 * Le titre reste du vrai texte dans le DOM (SEO/a11y). prefers-reduced-motion : 02 seule.
 */

import { useLang } from "../lib/lang";
import "./tempoHero.css";

const copy = {
  // Description accessible de la bannière décorative (§20).
  sceneDesc: {
    fr: "L'île TEMPOSYSTEM : les habitants se coordonnent, une décision se valide, la nuit garde la mémoire — le temps donné qui passe et revient.",
    en: "The TEMPOSYSTEM island: people coordinate, a decision is validated, night keeps the memory — given time that passes and returns.",
  },
} as const;

// Les trois plans de la boucle (assets optimisés dans public/islands/).
const FRAMES = [
  { n: 1, base: "island-01-coordination" },
  { n: 2, base: "island-02-decision" },
  { n: 3, base: "island-03-memoire" },
] as const;

export function TempoHero() {
  const { lang } = useLang();

  return (
    <section id="m01-signal" className="tempo-hero" aria-labelledby="tempo-hero-title">
      {/* Boucle lente d'illustrations (16:9) — fondus CSS opacity, ~24 s, sans JS */}
      <div className="tempo-island" aria-hidden="true">
        {FRAMES.map((f) => (
          <img
            key={f.n}
            className={`tempo-island__frame tempo-island__frame--${f.n}`}
            src={`/islands/${f.base}-1400.jpg`}
            srcSet={`/islands/${f.base}-840.jpg 840w, /islands/${f.base}-1400.jpg 1400w`}
            sizes="100vw"
            width={1672}
            height={941}
            alt=""
            loading={f.n === 1 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
          />
        ))}
      </div>

      {/* Titre — vrai texte dans le DOM, incrusté sur la bannière */}
      <div className="tempo-hero__layout tempo-hero__layout--scene">
        <h1 id="tempo-hero-title" className="tempo-hero__title">
          <span className="tempo-hero__title-brand">TEMPOSYSTEM</span>
          <span className="tempo-hero__title-concept">
            Le temps <em>vivant</em>
          </span>
        </h1>
        <p className="tempo-sr-only">{copy.sceneDesc[lang]}</p>
      </div>
    </section>
  );
}
