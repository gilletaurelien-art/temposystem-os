/**
 * TempoStatusPanel — la colonne de données système (charte HERO V2 §5, §16-§17).
 *
 * Quatre cartes compactes, dans l'ordre de l'œuvre de référence :
 *   1. État énergétique  (déclaratif + flux = graphe qui respire)
 *   2. Impulsions        (TempoImpulsePanel)
 *   3. État du système   (paires honnêtes, aucun faux compteur)
 *   4. Constellations    (comptes structurels modestes)
 *
 * Toutes les valeurs sont DÉCLARATIVES : pas de « 12 458 037 photons » ni de
 * pourcentage inventé (§17). Une seule animation ici : la respiration du graphe.
 */

import { CONSTELLATIONS, SYSTEM_STATES, TEMPO_PALETTE } from "./tempoHeroData";
import { TempoImpulsePanel } from "./TempoImpulsePanel";
import { TempoSignalGraph } from "./TempoSignalGraph";
import { useLang } from "../lib/lang";

const copy = {
  energyTitle: { fr: "État énergétique", en: "Energy state" },
  energyState: { fr: "Système actif", en: "System active" },
  flux: { fr: "Flux d'énergie", en: "Energy flow" },
  fluxAria: { fr: "Flux d'énergie du système", en: "System energy flow" },
  systemTitle: { fr: "État du système", en: "System state" },
  constellationTitle: { fr: "Constellations reliées", en: "Linked constellations" },
} as const;

export function TempoStatusPanel() {
  const { lang } = useLang();

  return (
    <aside className="tempo-hero__aside" aria-label={lang === "fr" ? "Données du système" : "System data"}>
      {/* 1 — État énergétique */}
      <section className="tempo-data-card tempo-energy-card" aria-label={copy.energyTitle[lang]}>
        <div className="tempo-card-head">
          <h2 className="tempo-card-title">{copy.energyTitle[lang]}</h2>
          <span className="tempo-live" aria-hidden="true">
            <span className="tempo-live__dot" />
            {copy.energyState[lang]}
          </span>
        </div>
        <p className="tempo-energy-label">{copy.flux[lang]}</p>
        <TempoSignalGraph label={copy.fluxAria[lang]} />
      </section>

      {/* 2 — Impulsions */}
      <TempoImpulsePanel />

      {/* 3 — État du système */}
      <section className="tempo-data-card tempo-status-card" aria-label={copy.systemTitle[lang]}>
        <h2 className="tempo-card-title">{copy.systemTitle[lang]}</h2>
        <ul className="tempo-status-list">
          {SYSTEM_STATES.map((s, i) => (
            <li key={i} className="tempo-status-row">
              <span className="tempo-status-row__key">
                <span className="tempo-status-row__dot" style={{ background: TEMPO_PALETTE[s.color] }} aria-hidden="true" />
                {lang === "fr" ? s.fr : s.en}
              </span>
              <span className="tempo-status-row__val" style={{ color: TEMPO_PALETTE[s.color] }}>
                {lang === "fr" ? s.valueFr : s.valueEn}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* 4 — Constellations reliées */}
      <section className="tempo-data-card tempo-constellation-card" aria-label={copy.constellationTitle[lang]}>
        <h2 className="tempo-card-title">{copy.constellationTitle[lang]}</h2>
        <ul className="tempo-constellation-grid">
          {CONSTELLATIONS.map((c, i) => (
            <li key={i} className="tempo-constellation">
              <span className="tempo-constellation__count" style={{ color: TEMPO_PALETTE[c.color] }}>{c.count}</span>
              <span className="tempo-constellation__label">{lang === "fr" ? c.fr : c.en}</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}
