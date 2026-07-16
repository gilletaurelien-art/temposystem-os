/**
 * IllustrationSlot — placeholder INTENTIONNEL d'illustration (Étape 4 du brief).
 *
 * Aucune illustration générique n'est inventée ici : chaque emplacement déclare
 * sa famille (charte §22) et son intention, et sera composé ensemble, une par une
 * (HERO d'abord). Le slot est élégant : cadre pixel discret, respiration, silence.
 */

const FAMILY_LABEL: Record<string, string> = {
  A: "ENERGY CORE",
  B: "SIGNAL FLOW",
  C: "COGNITIVE ORBIT",
  D: "MEMORY TRACE",
  E: "DECISION PULSE",
  F: "ECOSYSTEM TRANSMISSION",
  G: "TIME SEQUENCE",
};

interface IllustrationSlotProps {
  /** Famille d'illustration de la charte §22 (A à G). */
  family: keyof typeof FAMILY_LABEL;
  /** Intention d'une ligne — ce que la personne doit ressentir. */
  intent: string;
  /** Ratio hauteur (desktop). */
  aspect?: string;
  /** Couleur d'accent du futur visuel (token). */
  accent?: string;
}

export function IllustrationSlot({ family, intent, aspect = "16 / 7", accent = "--ts-violet" }: IllustrationSlotProps) {
  return (
    <figure
      role="img"
      aria-label={`Illustration à venir — ${FAMILY_LABEL[family]} : ${intent}`}
      style={{
        margin: "0 auto",
        maxWidth: 1080,
        aspectRatio: aspect,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 14,
        border: "1px dashed var(--ts-signal-grid)",
        borderRadius: 4,
        background:
          "radial-gradient(ellipse at 50% 50%, color-mix(in srgb, var(" + accent + ") 5%, transparent), transparent 70%)",
      }}
    >
      {/* quatre pixels d'attente, aux coins du cœur */}
      <div aria-hidden="true" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            style={{
              width: "var(--ts-px-signal)",
              height: "var(--ts-px-signal)",
              background: `var(${accent})`,
              opacity: 0.5,
              animation: `ts-slot-pulse var(--ts-beat) var(--ts-ease-pulse) ${i * 0.5}s infinite`,
            }}
          />
        ))}
      </div>
      <figcaption className="t-label" style={{ fontSize: 10, color: "var(--ts-ink-faint)" }}>
        {family} · {FAMILY_LABEL[family]}
      </figcaption>
      <p className="t-system" style={{ color: "var(--ts-ink-faint)", maxWidth: 420, textAlign: "center", padding: "0 20px", fontSize: 12 }}>
        {intent}
      </p>
    </figure>
  );
}
