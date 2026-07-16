/**
 * MotionProvider — les trois niveaux d'intensité du mouvement (charte §16).
 *
 *  0 — Statique     : prefers-reduced-motion OU choix utilisateur.
 *  1 — Respiration  : défaut (halos, pulsations lentes, quelques particules).
 *  2 — Immersion    : opt-in (réactions pointeur, scroll-linked riches, parallaxe).
 *
 * Le niveau est posé en `data-motion` sur <html> : le CSS s'y accroche
 * (tokens.css coupe les animations au niveau 0), les canvas le lisent via useMotion().
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type MotionLevel = 0 | 1 | 2;

const STORAGE_KEY = "ts-motion";

const MotionContext = createContext<{ level: MotionLevel; setLevel: (l: MotionLevel) => void }>({
  level: 1,
  setLevel: () => {},
});

function initialLevel(): MotionLevel {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "0" || stored === "1" || stored === "2") return Number(stored) as MotionLevel;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  return 1;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [level, setLevelState] = useState<MotionLevel>(initialLevel);

  const setLevel = (l: MotionLevel) => {
    setLevelState(l);
    localStorage.setItem(STORAGE_KEY, String(l));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-motion", String(level));
  }, [level]);

  // Si l'OS passe en mouvement réduit en cours de session, on respecte (sauf choix explicite).
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      if (mq.matches && localStorage.getItem(STORAGE_KEY) === null) setLevelState(0);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return <MotionContext.Provider value={{ level, setLevel }}>{children}</MotionContext.Provider>;
}

export function useMotion() {
  return useContext(MotionContext);
}
