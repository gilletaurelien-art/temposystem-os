/**
 * DataTag — étiquette de statut OBLIGATOIRE sur toute donnée dynamique (charte §19).
 * Jamais une simulation présentée comme une mesure réelle.
 */

export type DataStatus = "reel" | "simule" | "symbolique" | "prototype" | "declare";

const LABEL: Record<DataStatus, { fr: string; en: string; color: string }> = {
  reel: { fr: "réel", en: "live", color: "var(--ts-green)" },
  simule: { fr: "simulation", en: "simulation", color: "var(--ts-yellow)" },
  symbolique: { fr: "symbolique", en: "symbolic", color: "var(--ts-violet)" },
  prototype: { fr: "prototype", en: "prototype", color: "var(--ts-yellow)" },
  declare: { fr: "déclaré", en: "declared", color: "var(--ts-cyan)" },
};

export function DataTag({ status, lang = "fr" }: { status: DataStatus; lang?: "fr" | "en" }) {
  const l = LABEL[status];
  return (
    <span
      className="t-label"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontSize: 9,
        letterSpacing: "0.2em",
        color: l.color,
        border: `1px solid color-mix(in srgb, ${l.color} 35%, transparent)`,
        borderRadius: 3,
        padding: "3px 7px",
        verticalAlign: "middle",
      }}
    >
      <span
        aria-hidden="true"
        style={{ width: "var(--ts-px-micro)", height: "var(--ts-px-micro)", background: l.color, display: "inline-block" }}
      />
      {l[lang]}
    </span>
  );
}
