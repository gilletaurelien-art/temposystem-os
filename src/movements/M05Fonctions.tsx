/**
 * 05 — Les fonctions permanentes (RYTHME).
 * Résolution « 1 + 9 » : le Capitaine au centre, neuf fonctions en orbite.
 * « Les modèles changent. Les fonctions demeurent. »
 * L'illustration C (Cognitive Orbit) remplacera la grille par la constellation ;
 * la grille reste l'équivalent accessible et la mise en scène mobile.
 */

import { useLang } from "../lib/lang";
import { SectionShell } from "../components/ui/SectionShell";
import { IllustrationSlot } from "../components/ui/IllustrationSlot";
import { CORE_FUNCTION, ORBIT_FUNCTIONS } from "../config/functions";

const copy = {
  eyebrow: { fr: "Les fonctions permanentes", en: "The permanent functions" },
  title: { fr: "Les modèles changent. Les fonctions demeurent.", en: "Models change. Functions remain." },
  core: { fr: "Le cœur", en: "The core" },
  orbits: { fr: "Les neuf orbites", en: "The nine orbits" },
} as const;

function FunctionCard({ id, lang }: { id: string; lang: "fr" | "en" }) {
  const f = id === CORE_FUNCTION.id ? CORE_FUNCTION : ORBIT_FUNCTIONS.find((o) => o.id === id)!;
  return (
    <article
      style={{
        border: "1px solid var(--ts-signal-grid)",
        borderTop: `2px solid var(${f.color})`,
        borderRadius: 4,
        background: "var(--ts-midnight)",
        padding: "18px 16px",
        textAlign: "left",
      }}
    >
      <p className="t-label" style={{ color: `var(${f.color})`, marginBottom: 6 }}>{f.fonction[lang]}</p>
      <p style={{ fontWeight: 600, fontSize: 15 }}>{f.equipage[lang]}</p>
      <p className="t-body" style={{ fontSize: 13, lineHeight: 1.6, marginTop: 8 }}>{f.mission[lang]}</p>
      <p className="t-system" style={{ color: "var(--ts-ink-faint)", fontSize: 11, marginTop: 10 }}>
        ♪ {f.signature[lang]}
      </p>
    </article>
  );
}

export function M05Fonctions() {
  const { lang } = useLang();
  return (
    <SectionShell id="m05-fonctions" density="rythme" eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} center>
      <div style={{ marginBottom: 40 }}>
        <IllustrationSlot
          family="C"
          intent={
            lang === "fr"
              ? "Le cœur (Capitaine, battement lent) entouré de neuf orbites. Survoler une fonction fait jouer sa signature rythmique ; les autres s'estompent."
              : "The core (Captain, slow beat) surrounded by nine orbits. Hovering a function plays its rhythmic signature; the others fade."
          }
          aspect="16 / 8"
          accent="--ts-violet"
        />
      </div>

      {/* Équivalent textuel réel + mise en scène mobile (§24-25) */}
      <p className="t-label" style={{ marginBottom: 14 }}>{copy.core[lang]}</p>
      <div style={{ maxWidth: 420, margin: "0 auto 32px" }}>
        <FunctionCard id={CORE_FUNCTION.id} lang={lang} />
      </div>

      <p className="t-label" style={{ marginBottom: 14 }}>{copy.orbits[lang]}</p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: 12,
          maxWidth: 1080,
          margin: "0 auto",
        }}
      >
        {ORBIT_FUNCTIONS.map((f) => (
          <FunctionCard key={f.id} id={f.id} lang={lang} />
        ))}
      </div>
    </SectionShell>
  );
}
