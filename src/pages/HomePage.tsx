/**
 * HomePage — la composition (refonte Cognitive Pixel Music, Étape 4 : squelette).
 *
 * Onze mouvements, comme une pièce musicale (docs/refonte/01-audit-et-architecture.md §2.4).
 * Densités : INT · SIL · RYT · INT · RYT · INT · RYT · RYT · INT · RYT · SIL
 * — jamais deux INTENSITÉ consécutives (charte §23).
 *
 * Les illustrations (familles A-G) sont des emplacements déclarés (IllustrationSlot),
 * composés ensemble un par un — HERO d'abord.
 */

import { M01Signal } from "../movements/M01Signal";
import { M02Equation } from "../movements/M02Equation";
import { M03Physique } from "../movements/M03Physique";
import { M04Rythme } from "../movements/M04Rythme";
import { M05Fonctions } from "../movements/M05Fonctions";
import { M06Conseil } from "../movements/M06Conseil";
import { M07Memoire } from "../movements/M07Memoire";
import { M08Moteur } from "../movements/M08Moteur";
import { M09Ecosysteme } from "../movements/M09Ecosysteme";
import { M10Portes } from "../movements/M10Portes";
import { M11Battement } from "../movements/M11Battement";

export function HomePage() {
  return (
    <main>
      <M01Signal />
      <M02Equation />
      <M03Physique />
      <M04Rythme />
      <M05Fonctions />
      <M06Conseil />
      <M07Memoire />
      <M08Moteur />
      <M09Ecosysteme />
      <M10Portes />
      <M11Battement />
    </main>
  );
}
