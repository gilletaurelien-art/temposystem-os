/**
 * EnergyButton — boutons de la charte (§19).
 * Primaire : fond lumineux maîtrisé, impulsion traversante au survol.
 * Secondaire : transparent, bordure fine, lueur au focus/survol seulement.
 */

import type { ReactNode } from "react";
import "./energyButton.css";

interface EnergyButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}

export function EnergyButton({ href, children, variant = "primary", external = false }: EnergyButtonProps) {
  return (
    <a
      href={href}
      className={`ts-btn ts-btn-${variant}`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span className="ts-btn-label">{children}</span>
      {variant === "primary" && <span className="ts-btn-impulse" aria-hidden="true" />}
    </a>
  );
}
