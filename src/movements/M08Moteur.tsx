/**
 * 08 — Le moteur (RYTHME).
 * Crédibiliser sans noyer : quatre principes d'architecture, sobres.
 * Le détail (états système, modules, GitHub) vit sur /moteur.
 */

import { useLang } from "../lib/lang";
import { SectionShell } from "../components/ui/SectionShell";
import { EnergyButton } from "../components/ui/EnergyButton";

const PRINCIPLES: { title: { fr: string; en: string }; body: { fr: string; en: string } }[] = [
  {
    title: { fr: "Fonctions ≠ modèles", en: "Functions ≠ models" },
    body: {
      fr: "Les fonctions permanentes sont durables ; les modèles d'IA qui les implémentent sont interchangeables.",
      en: "Permanent functions endure; the AI models implementing them are interchangeable.",
    },
  },
  {
    title: { fr: "Mémoire par ADR", en: "Memory through ADRs" },
    body: {
      fr: "Chaque décision structurante conserve son contexte, ses alternatives et ses conséquences.",
      en: "Every structuring decision keeps its context, alternatives and consequences.",
    },
  },
  {
    title: { fr: "Orchestration", en: "Orchestration" },
    body: {
      fr: "Les signaux circulent entre les fonctions ; le Conseil transforme les échanges en impulsions de décision.",
      en: "Signals travel between functions; the Council turns exchanges into decision impulses.",
    },
  },
  {
    title: { fr: "Ouverture", en: "Openness" },
    body: {
      fr: "Le moteur doit pouvoir soutenir d'autres applications, d'autres territoires et d'autres organisations.",
      en: "The engine must be able to power other applications, other territories, other organizations.",
    },
  },
];

const copy = {
  eyebrow: { fr: "Le moteur", en: "The engine" },
  title: { fr: "Une architecture modulaire et ouverte", en: "A modular, open architecture" },
  explore: { fr: "Explorer le moteur", en: "Explore the engine" },
} as const;

export function M08Moteur() {
  const { lang } = useLang();
  return (
    <SectionShell id="m08-moteur" density="rythme" eyebrow={copy.eyebrow[lang]} title={copy.title[lang]}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12, maxWidth: 1080 }}>
        {PRINCIPLES.map((p) => (
          <article
            key={p.title.en}
            style={{
              border: "1px solid var(--ts-signal-grid)",
              borderRadius: 4,
              background: "var(--ts-midnight)",
              padding: "20px 18px",
            }}
          >
            <h3 className="t-data" style={{ fontSize: 14, color: "var(--ts-ink)", marginBottom: 10 }}>{p.title[lang]}</h3>
            <p className="t-body" style={{ fontSize: 13, lineHeight: 1.65 }}>{p.body[lang]}</p>
          </article>
        ))}
      </div>
      <div style={{ marginTop: 30 }}>
        <EnergyButton href="#/moteur" variant="secondary">{copy.explore[lang]} →</EnergyButton>
      </div>
    </SectionShell>
  );
}
