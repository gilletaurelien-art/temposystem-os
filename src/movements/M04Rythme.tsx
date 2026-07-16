/**
 * 04 — Le rythme (INTENSITÉ).
 * Montrer, pas dire : des pixels désordonnés trouvent un rythme commun.
 * Illustration B · Signal Flow en grille séquenceur (polyrythmie → accord).
 */

import { useLang } from "../lib/lang";
import { SectionShell } from "../components/ui/SectionShell";
import { IllustrationSlot } from "../components/ui/IllustrationSlot";

const copy = {
  title: {
    fr: "Les signaux synchronisés produisent une énergie collective",
    en: "Synchronized signals produce a collective energy",
  },
} as const;

export function M04Rythme() {
  const { lang } = useLang();
  return (
    <SectionShell id="m04-rythme" density="intensite" center>
      <h2 className="t-section" style={{ maxWidth: 640, margin: "0 auto 44px" }}>{copy.title[lang]}</h2>
      <IllustrationSlot
        family="B"
        intent={
          lang === "fr"
            ? "Grille séquenceur : des pixels battent en désordre, puis se synchronisent (2–4 s). Au niveau Immersion, le pointeur peut perturber le rythme — la resynchronisation se fait d'elle-même."
            : "Sequencer grid: pixels beat out of phase, then synchronize (2–4 s). At Immersion level the pointer can disturb the rhythm — resynchronization happens on its own."
        }
        aspect="16 / 6"
        accent="--ts-cyan"
      />
    </SectionShell>
  );
}
