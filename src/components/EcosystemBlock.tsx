/**
 * EcosystemBlock — bloc écosystème commun à tout l'univers MANA.
 *
 * Porté depuis la version partagée (alliance / manatimebank / …), adapté ici en
 * thème sombre + bilingue FR/EN (temposystem-os a un toggle de langue).
 * Autonome : icônes SVG inline, styles inline, aucun asset. Se pose au-dessus
 * du footer. Maison mère MANAHOME.org → les 6 mondes (icône · nom · rôle).
 */

import type { Language } from "../lib/lang";

type Bi = { fr: string; en: string };

const WORLDS: { nom: string; role: Bi; href: string; icon: JSX.Element }[] = [
  {
    nom: "TEMPOSYSTEM.eu",
    role: { fr: "Le cœur", en: "The core" },
    href: "https://temposystem.eu",
    icon: <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />,
  },
  {
    nom: "TEMPOSYSTEM.fr",
    role: { fr: "L'orchestre", en: "The orchestra" },
    href: "https://temposystem.fr",
    icon: (
      <>
        <rect width="8" height="8" x="3" y="3" rx="2" />
        <path d="M7 11v4a2 2 0 0 0 2 2h4" />
        <rect width="8" height="8" x="13" y="13" rx="2" />
      </>
    ),
  },
  {
    nom: "ManaTimeBank.org",
    role: { fr: "Le concept international", en: "The international concept" },
    href: "https://manatimebank.org",
    icon: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </>
    ),
  },
  {
    nom: "Mana.bzh",
    role: { fr: "Le laboratoire breton", en: "The Breton laboratory" },
    href: "https://mana.bzh",
    icon: (
      <>
        <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
        <path d="M6.453 15h11.094" />
        <path d="M8.5 2h7" />
      </>
    ),
  },
  {
    nom: "ManaFamily.org",
    role: { fr: "Les cercles familiaux", en: "The family circles" },
    href: "https://manafamily.org",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    nom: "AllianceMANA.org",
    role: { fr: "Gouvernance & principes", en: "Governance & principles" },
    href: "https://alliancemana.org",
    icon: (
      <>
        <line x1="3" x2="21" y1="22" y2="22" />
        <line x1="6" x2="6" y1="18" y2="11" />
        <line x1="10" x2="10" y1="18" y2="11" />
        <line x1="14" x2="14" y1="18" y2="11" />
        <line x1="18" x2="18" y1="18" y2="11" />
        <polygon points="12 2 20 7 4 7" />
      </>
    ),
  },
];

const COPY = {
  universe: { fr: "L'univers MANA", en: "The MANA universe" },
  assistance: { fr: "L'assistance", en: "The assistance" },
  tagline: {
    fr: "« Rendre le soin visible, durable et transmissible. »",
    en: "« Making care visible, lasting and transmissible. »",
  },
};

// Palette sombre, alignée sur l'accent violet du site.
const c = {
  card: "rgba(255,255,255,0.045)",
  border: "rgba(255,255,255,0.14)",
  ink: "#F3EEFF",
  sub: "#a99cc9",
  label: "#CDA9FF",
  icon: "#CDA9FF",
  frame: "rgba(205,169,255,0.28)",
  frameBg: "rgba(205,169,255,0.03)",
};
const GRAD = "linear-gradient(110deg,#7C3AED,#9d5cf0,#C0A45C)";

export default function EcosystemBlock({ lang = "fr" }: { lang?: Language }) {
  return (
    <section
      aria-label="L'écosystème MANA"
      className="relative z-10"
      style={{
        padding: "3rem 1.25rem",
        borderTop: `1px solid ${c.border}`,
        fontFamily: "'Philosopher','Iowan Old Style',Georgia,serif",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <p
          style={{
            margin: "0 0 1.4rem",
            fontSize: "0.72rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            fontWeight: 700,
            color: c.label,
          }}
        >
          {COPY.universe[lang]}
        </p>

        {/* Maison mère */}
        <a
          href="https://manahome.org"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "1rem",
            textAlign: "left",
            textDecoration: "none",
            background: c.card,
            border: `1px solid ${c.border}`,
            borderRadius: 20,
            padding: "0.9rem 1.5rem 0.9rem 1rem",
            maxWidth: 460,
          }}
        >
          <span
            style={{
              width: 52,
              height: 52,
              flex: "none",
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              background: GRAD,
              boxShadow: "0 0 18px rgba(124,77,255,0.45)",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
              <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z" />
            </svg>
          </span>
          <span style={{ display: "block" }}>
            <span style={{ display: "flex", alignItems: "baseline", gap: "0.55rem", flexWrap: "wrap" }}>
              <span style={{ fontWeight: 700, fontSize: "0.98rem", letterSpacing: "0.14em", color: c.ink }}>
                MANAHOME.org
              </span>
              <span
                style={{
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  color: c.label,
                }}
              >
                {COPY.assistance[lang]}
              </span>
            </span>
            <span
              style={{
                display: "block",
                marginTop: "0.2rem",
                fontStyle: "italic",
                fontSize: "0.86rem",
                lineHeight: 1.5,
                background: GRAD,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {COPY.tagline[lang]}
            </span>
          </span>
        </a>

        <div style={{ fontSize: "1.15rem", color: c.icon, opacity: 0.55, margin: "0.5rem 0" }}>▼</div>

        {/* Les 6 mondes */}
        <div
          style={{
            position: "relative",
            border: `1px dashed ${c.frame}`,
            borderRadius: 20,
            padding: "1.6rem 1rem 1rem",
            background: c.frameBg,
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(155px,1fr))", gap: "0.7rem" }}>
            {WORLDS.map((w) => (
              <a
                key={w.nom}
                href={w.href}
                style={{
                  display: "block",
                  textDecoration: "none",
                  background: c.card,
                  border: `1px solid ${c.border}`,
                  borderRadius: 14,
                  padding: "0.9rem 0.7rem",
                }}
              >
                <span style={{ display: "flex", justifyContent: "center", marginBottom: "0.4rem" }}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={c.icon}
                    strokeWidth={1.6}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {w.icon}
                  </svg>
                </span>
                <span style={{ display: "block", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.1em", color: c.ink }}>
                  {w.nom}
                </span>
                <span style={{ display: "block", fontSize: "0.76rem", color: c.sub, marginTop: "0.15rem" }}>
                  {w.role[lang]}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
