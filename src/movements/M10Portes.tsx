/**
 * 10 — Entrer dans TEMPOsystem (RYTHME).
 * Six portes : chaque visiteur trouve la sienne.
 */

import { useLang } from "../lib/lang";
import { SectionShell } from "../components/ui/SectionShell";

const DOORS: { label: { fr: string; en: string }; href: string; color: string; external?: boolean }[] = [
  { label: { fr: "Explorer la vision", en: "Explore the vision" }, href: "#/manifeste", color: "--ts-violet" },
  { label: { fr: "Entrer dans le Conseil", en: "Enter the Council" }, href: "#/conseil", color: "--ts-orange" },
  { label: { fr: "Lire les ADR", en: "Read the ADRs" }, href: "#/memoire", color: "--ts-blue" },
  { label: { fr: "Ouvrir la documentation", en: "Open the documentation" }, href: "https://github.com/gilletaurelien-art/temposystem-os/tree/main/docs", color: "--ts-cyan", external: true },
  { label: { fr: "Découvrir l'architecture", en: "Discover the architecture" }, href: "#/moteur", color: "--ts-green" },
  { label: { fr: "Consulter GitHub", en: "Browse GitHub" }, href: "https://github.com/gilletaurelien-art/temposystem-os", color: "--ts-white", external: true },
];

const copy = {
  eyebrow: { fr: "Entrer dans TEMPOsystem", en: "Enter TEMPOsystem" },
  title: { fr: "Choisir une porte", en: "Choose a door" },
} as const;

export function M10Portes() {
  const { lang } = useLang();
  return (
    <SectionShell id="m10-portes" density="rythme" eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} center>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 12,
          maxWidth: 880,
          margin: "0 auto",
        }}
      >
        {DOORS.map((door) => (
          <a
            key={door.href}
            href={door.href}
            {...(door.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="t-data"
            style={{
              fontSize: 13,
              textDecoration: "none",
              color: "var(--ts-ink)",
              border: "1px solid var(--ts-signal-grid)",
              borderRadius: 4,
              padding: "22px 18px",
              background: "var(--ts-midnight)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span
              aria-hidden="true"
              style={{ width: "var(--ts-px-symbol)", height: "var(--ts-px-symbol)", background: `var(${door.color})`, opacity: 0.8 }}
            />
            {door.label[lang]}
            {door.external ? " ↗" : " →"}
          </a>
        ))}
      </div>
    </SectionShell>
  );
}
