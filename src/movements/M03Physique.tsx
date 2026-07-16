/**
 * 03 — La physique (RYTHME).
 * La chaîne TEMPS → ACTION : structure narrative et visuelle centrale du système.
 * L'illustration B (Signal Flow scroll-linked) viendra habiller la chaîne ;
 * la chaîne elle-même est déjà réelle, textuelle et accessible.
 */

import { useLang } from "../lib/lang";
import { SectionShell } from "../components/ui/SectionShell";

const CHAIN: { fr: string; en: string; note: { fr: string; en: string }; color: string }[] = [
  { fr: "Temps", en: "Time", note: { fr: "une durée", en: "a duration" }, color: "--ts-ink-faint" },
  { fr: "Temps partagé", en: "Shared time", note: { fr: "un geste vers l'autre", en: "a gesture towards others" }, color: "--ts-magenta" },
  { fr: "Contribution", en: "Contribution", note: { fr: "un temps reconnu", en: "recognized time" }, color: "--ts-magenta" },
  { fr: "Signal", en: "Signal", note: { fr: "une impulsion qui circule", en: "a travelling impulse" }, color: "--ts-cyan" },
  { fr: "Mémoire", en: "Memory", note: { fr: "une trace qui demeure", en: "a trace that remains" }, color: "--ts-blue" },
  { fr: "Synchronisation", en: "Synchronization", note: { fr: "un rythme commun", en: "a common rhythm" }, color: "--ts-violet" },
  { fr: "Énergie collective", en: "Collective energy", note: { fr: "une force perceptible", en: "a perceptible force" }, color: "--ts-white" },
  { fr: "Décision", en: "Decision", note: { fr: "une orientation", en: "an orientation" }, color: "--ts-orange" },
  { fr: "Action", en: "Action", note: { fr: "le mouvement du monde", en: "the world set in motion" }, color: "--ts-orange" },
];

const copy = {
  eyebrow: { fr: "La physique", en: "The physics" },
  title: { fr: "Comment le temps devient une énergie", en: "How time becomes energy" },
} as const;

export function M03Physique() {
  const { lang } = useLang();
  return (
    <SectionShell id="m03-physique" density="rythme" eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} center>
      <ol
        style={{
          listStyle: "none",
          margin: "0 auto",
          padding: 0,
          maxWidth: 460,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {CHAIN.map((step, i) => (
          <li key={step.en} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 18,
                padding: "13px 18px",
                border: "1px solid var(--ts-signal-grid)",
                borderRadius: 4,
                background: "var(--ts-midnight)",
              }}
            >
              <span className="t-data" style={{ color: `var(${step.color})`, fontSize: 15 }}>
                {step[lang]}
              </span>
              <span className="t-system" style={{ color: "var(--ts-ink-faint)", fontSize: 12 }}>
                {step.note[lang]}
              </span>
            </div>
            {i < CHAIN.length - 1 && (
              <span
                aria-hidden="true"
                style={{
                  width: "var(--ts-px-micro)",
                  height: 18,
                  background: `linear-gradient(180deg, var(${step.color}), var(${CHAIN[i + 1].color}))`,
                  opacity: 0.6,
                }}
              />
            )}
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
