/**
 * 11 — Battement final (SILENCE).
 * Le silence est l'interaction. La spirale en état 4, très ralentie, viendra ici.
 */

import { useLang } from "../lib/lang";
import { SectionShell } from "../components/ui/SectionShell";

const copy = {
  lines: {
    fr: ["Les applications changent.", "Les intelligences changent.", "Les territoires changent."],
    en: ["Applications change.", "Intelligences change.", "Territories change."],
  },
  final: { fr: "La mémoire demeure.", en: "Memory remains." },
} as const;

export function M11Battement() {
  const { lang } = useLang();
  return (
    <SectionShell id="m11-battement" density="silence" center>
      <p className="t-body" style={{ margin: "0 auto", textAlign: "center", color: "var(--ts-ink-faint)" }}>
        {copy.lines[lang].map((line) => (
          <span key={line} style={{ display: "block" }}>{line}</span>
        ))}
      </p>
      <p className="t-section" style={{ marginTop: 28 }}>{copy.final[lang]}</p>

      {/* battement : un seul pixel, pulsation fondamentale */}
      <div
        aria-hidden="true"
        style={{
          width: "var(--ts-px-signal)",
          height: "var(--ts-px-signal)",
          background: "var(--ts-white)",
          margin: "52px auto 0",
          animation: "ts-slot-pulse var(--ts-beat) var(--ts-ease-pulse) infinite",
        }}
      />
      <p className="t-label" style={{ marginTop: 34 }}>TEMPOSYSTEM IS ENERGY</p>
    </SectionShell>
  );
}
