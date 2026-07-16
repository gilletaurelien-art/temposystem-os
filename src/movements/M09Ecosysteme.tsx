/**
 * 09 — Ce que le moteur alimente (INTENSITÉ).
 * La hiérarchie clarifiée : TEMPOSYSTEM (moteur) → MANAtimebank (plateforme)
 * → applications. Pas tous au même niveau orbital. Rien de commercial ici :
 * l'offre vit sur manatimebank.org.
 * Illustration F · Ecosystem Transmission habillera la cascade.
 */

import { useLang } from "../lib/lang";
import { SectionShell } from "../components/ui/SectionShell";
import { IllustrationSlot } from "../components/ui/IllustrationSlot";

const copy = {
  eyebrow: { fr: "L'écosystème", en: "The ecosystem" },
  title: { fr: "Le moteur alimente une plateforme. La plateforme permet des mondes.", en: "The engine powers a platform. The platform enables worlds." },
  engine: { fr: "Le moteur", en: "The engine" },
  engineDesc: {
    fr: "Orchestre le temps, les signaux, la mémoire et les décisions.",
    en: "Orchestrates time, signals, memory and decisions.",
  },
  feeds: { fr: "alimente", en: "powers" },
  platform: { fr: "L'infrastructure logicielle", en: "The software infrastructure" },
  platformDesc: {
    fr: "Banques de temps, communautés, reconnaissance des contributions, marque blanche, API.",
    en: "Time banks, communities, contribution recognition, white label, APIs.",
  },
  enables: { fr: "permet", en: "enables" },
  apps: { fr: "Les applications", en: "The applications" },
  governance: {
    fr: "Et au-dessus de tout : Alliance MANA, la gouvernance — Constitution, éthique, transparence, continuité.",
    en: "And above it all: Alliance MANA, the governance — Constitution, ethics, transparency, continuity.",
  },
} as const;

const APPS = [
  { name: "MANA France", href: "https://manafrance.org" },
  { name: "MANA Breizh", href: "https://mana.bzh" },
  { name: "MANA Family", href: "https://manafamily.org" },
  { name: { fr: "Marque blanche & futurs projets", en: "White label & future projects" }, href: "https://manatimebank.org" },
];

function Tier({ label, name, desc, color, href }: { label: string; name: string; desc: string; color: string; href?: string }) {
  const inner = (
    <>
      <p className="t-label" style={{ color: `var(${color})`, marginBottom: 8 }}>{label}</p>
      <p className="t-data" style={{ fontSize: 18, color: "var(--ts-ink)" }}>{name}</p>
      <p className="t-body" style={{ fontSize: 13, margin: "8px auto 0", textAlign: "center" }}>{desc}</p>
    </>
  );
  const style = {
    display: "block",
    textDecoration: "none",
    color: "inherit",
    border: "1px solid var(--ts-signal-grid)",
    borderTop: `2px solid var(${color})`,
    borderRadius: 4,
    background: "var(--ts-midnight)",
    padding: "22px 26px",
    maxWidth: 560,
    margin: "0 auto",
  } as const;
  return href ? <a href={href} target="_blank" rel="noopener noreferrer" style={style}>{inner}</a> : <div style={style}>{inner}</div>;
}

export function M09Ecosysteme() {
  const { lang } = useLang();
  return (
    <SectionShell id="m09-ecosysteme" density="intensite" eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} center>
      <div style={{ marginBottom: 44 }}>
        <IllustrationSlot
          family="F"
          intent={
            lang === "fr"
              ? "Une impulsion orange part du moteur, se divise en flux cyan et bleus qui alimentent chaque étage — la source ne s'épuise pas en se partageant."
              : "An orange impulse leaves the engine, splitting into cyan and blue flows feeding each tier — the source is not depleted by being shared."
          }
          aspect="16 / 6"
          accent="--ts-orange"
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 0, alignItems: "center" }}>
        <Tier label={copy.engine[lang]} name="TEMPOSYSTEM" desc={copy.engineDesc[lang]} color="--ts-orange" />
        <p className="t-label" aria-hidden="true" style={{ margin: "14px 0", color: "var(--ts-ink-faint)" }}>↓ {copy.feeds[lang]}</p>
        <Tier label={copy.platform[lang]} name="MANAtimebank" desc={copy.platformDesc[lang]} color="--ts-cyan" href="https://manatimebank.org" />
        <p className="t-label" aria-hidden="true" style={{ margin: "14px 0", color: "var(--ts-ink-faint)" }}>↓ {copy.enables[lang]}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", maxWidth: 720 }}>
          {APPS.map((app) => (
            <a
              key={app.href + (typeof app.name === "string" ? app.name : app.name.fr)}
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="t-data"
              style={{
                fontSize: 13,
                textDecoration: "none",
                color: "var(--ts-ink-muted)",
                border: "1px solid var(--ts-signal-grid)",
                borderRadius: 3,
                padding: "10px 16px",
                background: "var(--ts-midnight)",
              }}
            >
              {typeof app.name === "string" ? app.name : app.name[lang]}
            </a>
          ))}
        </div>
      </div>

      <p className="t-body" style={{ margin: "36px auto 0", textAlign: "center", fontSize: 13, color: "var(--ts-ink-faint)" }}>
        {copy.governance[lang]}
      </p>
    </SectionShell>
  );
}
