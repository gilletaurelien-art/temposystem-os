/**
 * HomePage — la composition (refonte « Le Temps Vivant »).
 *
 * Structure d'accueil :
 *   · fond FIXE (sunrise) posé derrière tout — on le découvre en scrollant ;
 *   · HERO = île en boucle (M01Signal), opaque, qui masque le fond au départ ;
 *   · bande de révélation transparente → laisse voir le sunrise fixe (parallaxe) ;
 *   · les onze mouvements, enveloppés dans un fond sombre (lisibilité).
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
import { useLang } from "../lib/lang";

export function HomePage() {
  const { lang } = useLang();
  const revealLine =
    lang === "fr" ? "Le temps donné revient toujours." : "Given time always returns.";

  return (
    <main>
      {/* Fond fixe (sunrise) — derrière le hero, découvert au scroll */}
      <div className="tempo-wallpaper" aria-hidden="true" />

      {/* HERO — île en boucle (opaque) */}
      <M01Signal />

      {/* Bande de révélation — transparente : on voit le fond fixe */}
      <section className="tempo-reveal" aria-hidden="true">
        <p className="tempo-reveal__line">{revealLine}</p>
      </section>

      {/* Les onze mouvements — enveloppés dans un fond sombre (lisibilité) */}
      <div className="tempo-movements">
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
      </div>
    </main>
  );
}
