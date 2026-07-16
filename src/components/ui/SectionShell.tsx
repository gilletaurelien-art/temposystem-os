/**
 * SectionShell — enveloppe d'un mouvement de la composition (charte §23, §27).
 *
 * `density` règle la respiration :
 *   silence    — beaucoup d'espace sombre, une phrase, quelques pixels ;
 *   rythme     — séquence visuelle mesurée ;
 *   intensite  — grande illustration centrale, révélation.
 *
 * Deux sections `intensite` ne doivent jamais se suivre (vérifié dans HomePage).
 */

import type { ReactNode } from "react";

export type Density = "silence" | "rythme" | "intensite";

const PADDING: Record<Density, string> = {
  silence: "clamp(7rem, 16vh, 12rem)",
  rythme: "clamp(4.5rem, 10vh, 7.5rem)",
  intensite: "clamp(5rem, 12vh, 9rem)",
};

interface SectionShellProps {
  id: string;
  density: Density;
  /** Label système au-dessus du titre (petites caps pixel). */
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  /** Contenu pleine largeur (illustrations qui dépassent la grille — charte §11). */
  bleed?: boolean;
  center?: boolean;
}

export function SectionShell({ id, density, eyebrow, title, children, bleed = false, center = false }: SectionShellProps) {
  return (
    <section
      id={id}
      data-density={density}
      className="relative"
      style={{ padding: `${PADDING[density]} 0` }}
    >
      <div
        style={{
          maxWidth: bleed ? "none" : "var(--ts-content-max)",
          margin: "0 auto",
          padding: bleed ? 0 : "0 var(--ts-gutter)",
          textAlign: center ? "center" : undefined,
        }}
      >
        {eyebrow && <p className="t-label" style={{ marginBottom: 16 }}>{eyebrow}</p>}
        {title && <h2 className="t-section" style={{ marginBottom: 28, marginLeft: center ? "auto" : undefined, marginRight: center ? "auto" : undefined }}>{title}</h2>}
        {children}
      </div>
    </section>
  );
}
