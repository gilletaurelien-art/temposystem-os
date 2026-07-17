/**
 * 07 — La mémoire (SILENCE → RYTHME).
 * Le cœur émotionnel : rien ne disparaît. Cycle + trois ADR réelles.
 * Illustration D · Memory Trace (bleu dominant — charte §8).
 */

import { useLang } from "../lib/lang";
import { SectionShell } from "../components/ui/SectionShell";
import { IllustrationSlot } from "../components/ui/IllustrationSlot";

const CYCLE: { fr: string; en: string }[] = [
  { fr: "Conversation", en: "Conversation" },
  { fr: "Question", en: "Question" },
  { fr: "Analyse", en: "Analysis" },
  { fr: "Décision", en: "Decision" },
  { fr: "ADR", en: "ADR" },
  { fr: "Mémoire", en: "Memory" },
  { fr: "Connaissance", en: "Knowledge" },
  { fr: "Décision future", en: "Future decision" },
];

const FEATURED_ADR = [
  { num: "ADR-0007", title: { fr: "Premier déploiement public", en: "First public deployment" }, date: "2026-06-28" },
  { num: "ADR-0009", title: { fr: "Cortex énergétique", en: "Energy cortex" }, date: "2026-06-29" },
  { num: "ADR-0010", title: { fr: "TEMPOsystem is energy", en: "TEMPOsystem is energy" }, date: "2026-06-29" },
];

const copy = {
  eyebrow: { fr: "La mémoire", en: "The memory" },
  title: { fr: "Rien ne disparaît.", en: "Nothing disappears." },
  body: {
    fr: "Chaque décision importante devient mémoire. La mémoire ne fige pas le système : elle lui évite de recommencer éternellement les mêmes débats et lui permet d'évoluer avec cohérence.",
    en: "Every important decision becomes memory. Memory does not freeze the system: it keeps it from endlessly reopening the same debates and lets it evolve coherently.",
  },
  register: { fr: "Ouvrir le registre", en: "Open the register" },
} as const;

export function M07Memoire() {
  const { lang } = useLang();
  return (
    <SectionShell id="m07-memoire" density="rythme" eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} center>
      <p className="t-body" style={{ margin: "0 auto 44px", textAlign: "center" }}>{copy.body[lang]}</p>

      {/* Le cycle — impulsion mobile qui ralentit, devient bleue, rejoint une trace */}
      <ol
        aria-label={lang === "fr" ? "Cycle de la mémoire" : "Memory cycle"}
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 auto 44px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 8,
          maxWidth: 900,
        }}
      >
        {CYCLE.map((step, i) => (
          <li key={step.en} style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              className="t-data"
              style={{
                fontSize: 12,
                padding: "7px 12px",
                border: "1px solid var(--ts-signal-grid)",
                borderRadius: 3,
                color: i >= 4 ? "var(--ts-blue)" : "var(--ts-ink-muted)",
                background: "var(--ts-midnight)",
              }}
            >
              {step[lang]}
            </span>
            {i < CYCLE.length - 1 && <span aria-hidden="true" style={{ color: "var(--ts-ink-faint)" }}>→</span>}
          </li>
        ))}
      </ol>

      <div style={{ marginBottom: 44 }}>
        <IllustrationSlot
          family="D"
          intent={
            lang === "fr"
              ? "Des impulsions mobiles ralentissent, deviennent bleues et se figent une à une en traces persistantes — les strates de la mémoire."
              : "Moving impulses slow down, turn blue and settle one by one into persistent traces — the strata of memory."
          }
          aspect="16 / 5"
          accent="--ts-blue"
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12, maxWidth: 880, margin: "0 auto" }}>
        {FEATURED_ADR.map((adr) => (
          <a
            key={adr.num}
            href="#/memoire"
            style={{
              textDecoration: "none",
              color: "inherit",
              border: "1px solid var(--ts-signal-grid)",
              borderRadius: 4,
              background: "var(--ts-midnight)",
              padding: "16px 18px",
              textAlign: "left",
            }}
          >
            <p className="t-system" style={{ color: "var(--ts-blue)" }}>{adr.num}</p>
            <p style={{ fontWeight: 600, fontSize: 14, marginTop: 6 }}>{adr.title[lang]}</p>
            <p className="t-system" style={{ color: "var(--ts-ink-faint)", fontSize: 11, marginTop: 6 }}>{adr.date}</p>
          </a>
        ))}
      </div>
    </SectionShell>
  );
}
