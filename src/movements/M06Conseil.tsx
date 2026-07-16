/**
 * 06 — Le Conseil de Bord (INTENSITÉ).
 * La mécanique question → décision, mise en scène avec la VRAIE dernière
 * consultation (ADR-0007). Aucun pourcentage inventé.
 * Illustration E · Decision Pulse habillera les cinq temps.
 */

import { useLang } from "../lib/lang";
import { SectionShell } from "../components/ui/SectionShell";
import { IllustrationSlot } from "../components/ui/IllustrationSlot";
import { EnergyButton } from "../components/ui/EnergyButton";
import { DataTag } from "../components/ui/DataTag";
import { cockpitCouncilSnapshot } from "../config/publicSite";

const copy = {
  eyebrow: { fr: "Le Conseil de Bord", en: "The Bridge Council" },
  title: {
    fr: "Une question devient un consensus. Un consensus devient une décision.",
    en: "A question becomes a consensus. A consensus becomes a decision.",
  },
  question: { fr: "La question", en: "The question" },
  consensus: { fr: "Le consensus", en: "The consensus" },
  decision: { fr: "L'arbitrage du Capitaine", en: "The Captain's ruling" },
  trace: { fr: "La trace", en: "The trace" },
  consult: { fr: "Consultation réelle du", en: "Actual consultation of" },
  enter: { fr: "Entrer dans le Conseil", en: "Enter the Council" },
} as const;

export function M06Conseil() {
  const { lang } = useLang();
  const snap = cockpitCouncilSnapshot;

  const steps = [
    { label: copy.question[lang], text: snap.question[lang], color: "--ts-magenta" },
    { label: copy.consensus[lang], text: snap.consensus[lang], color: "--ts-violet" },
    { label: copy.decision[lang], text: snap.decision[lang], color: "--ts-orange" },
  ];

  return (
    <SectionShell id="m06-conseil" density="intensite" eyebrow={copy.eyebrow[lang]} title={copy.title[lang]}>
      <div style={{ marginBottom: 44 }}>
        <IllustrationSlot
          family="E"
          intent={
            lang === "fr"
              ? "Des signaux magenta et violets convergent vers le cœur, deviennent orange (décision), puis rayonnent en onde — la décision devient impulsion."
              : "Magenta and violet signals converge to the core, turn orange (decision), then radiate as a wave — the decision becomes an impulse."
          }
          aspect="16 / 6"
          accent="--ts-orange"
        />
      </div>

      <p className="t-system" style={{ color: "var(--ts-ink-faint)", marginBottom: 18, display: "flex", gap: 10, alignItems: "center" }}>
        {copy.consult[lang]} {snap.lastConsultation[lang]}
        <DataTag status="reel" lang={lang} />
      </p>

      <div style={{ display: "grid", gap: 12, maxWidth: 880 }}>
        {steps.map((s) => (
          <article
            key={s.label}
            style={{
              border: "1px solid var(--ts-signal-grid)",
              borderLeft: `2px solid var(${s.color})`,
              borderRadius: 4,
              background: "var(--ts-midnight)",
              padding: "16px 20px",
            }}
          >
            <p className="t-label" style={{ color: `var(${s.color})`, marginBottom: 8 }}>{s.label}</p>
            <p className="t-body" style={{ fontSize: 14 }}>{s.text}</p>
          </article>
        ))}
        <article
          style={{
            border: "1px solid var(--ts-signal-grid)",
            borderLeft: "2px solid var(--ts-blue)",
            borderRadius: 4,
            background: "var(--ts-midnight)",
            padding: "16px 20px",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <div>
            <p className="t-label" style={{ color: "var(--ts-blue)", marginBottom: 8 }}>{copy.trace[lang]}</p>
            <p className="t-system">{snap.adr.label} · {snap.adr.title[lang]}</p>
          </div>
          <EnergyButton href="#/memoire" variant="secondary">ADR →</EnergyButton>
        </article>
      </div>

      <div style={{ marginTop: 34 }}>
        <EnergyButton href="#/conseil">{copy.enter[lang]} →</EnergyButton>
      </div>
    </SectionShell>
  );
}
