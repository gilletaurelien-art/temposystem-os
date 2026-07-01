import { useState, useEffect, useRef } from 'react';

function pad(n: number) { return String(n).padStart(2, '0'); }
function fmt(s: number) {
  return `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
}

const REF = 3600;
const LAP = 2; // durée d'un tour du ∞ (s)

// Traîne de la comète : points qui suivent le même chemin, décalés en phase derrière
// la tête. begin négatif « dans le passé » → toujours actifs (aucun flicker au load),
// la partie fractionnaire les place en retard. Rayon + opacité décroissants = queue.
const COMET = Array.from({ length: 18 }, (_, i) => {
  const k = i + 1;
  const lag = k * 0.026;                        // retard serré → blobs qui se chevauchent
  // teinte le long de la queue : blanc → lavande → cyan
  const grad = k < 6 ? 'hts-trail-w' : k < 12 ? 'hts-trail-l' : 'hts-trail-c';
  return {
    begin: `${(lag - LAP).toFixed(3)}s`,
    r: Math.max(1.5, 7 - k * 0.32),             // gros près de la tête → fin à la queue
    opacity: Math.max(0.04, 0.62 * (1 - k / 19)),
    grad,
  };
});

/**
 * Module auto-contenu « transfert de temps » : papillon-horloge + ∞ animé + compteurs.
 * Tout est positionné en % à l'intérieur d'une boîte au ratio du papillon (1066×992)
 * → le module scrolle avec la page, aucun élément en position: fixed.
 */
export default function HeroTransferScene() {
  const [elapsed, setElapsed] = useState(0);
  const moduleRef = useRef<HTMLDivElement>(null);
  const pointRef = useRef<SVGGElement>(null);
  const chargeRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const id = setInterval(() => setElapsed(e => (e + 1) % REF), 1000);
    return () => clearInterval(id);
  }, []);

  // L'éclair est DÉRIVÉ de la position réelle du point : il s'allume quand le point
  // approche le centre (l'horloge). Aucune timeline parallèle → synchro garantie.
  useEffect(() => {
    let raf = 0;
    const PEAK = 0.72;
    const tick = () => {
      const pt = pointRef.current, mod = moduleRef.current, charge = chargeRef.current;
      if (pt && mod && charge) {
        const pr = pt.getBoundingClientRect();
        const mr = mod.getBoundingClientRect();
        const cx = mr.left + (533 / 1066) * mr.width;   // centre ∞ (horloge) en px
        const cy = mr.top  + (425 / 992)  * mr.height;
        const d = Math.hypot(pr.left + pr.width / 2 - cx, pr.top + pr.height / 2 - cy);
        const R = 0.16 * mr.width;                       // rayon du « zap »
        const k = Math.max(0, 1 - d / R);
        charge.style.opacity = (k * k * PEAK).toFixed(3); // courbe nette près du centre
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const given = elapsed;
  const remaining = REF - elapsed;

  return (
    <div className="hts-module" ref={moduleRef}>
      {/* Couche 1 (fond du module) — le ∞ : un point lumineux parcourt le huit en 2 s.
          Placé AVANT le papillon → la lueur transparaît derrière le PNG. */}
      <svg
        className="hts-svg"
        viewBox="0 0 1066 992"
        aria-hidden="true"
      >
        <defs>
          {/* ∞ — un seul trait continu. Au nœud (horloge, 533,425) le point
              traverse en diagonale (X), il ne rebondit pas. */}
          <path id="hts-infinity"
            d="M 533,425
               C 586.1,470 676.0,515 742.9,512
               C 852.4,508 895.2,385 852.4,285
               C 806.1,206 641.8,248 533,425
               C 480.0,470 390.0,515 323.2,512
               C 213.7,508 170.8,385 213.7,285
               C 259.9,206 424.3,248 533,425 Z" />

          {/* Dégradé chronologique : cyan (droite) → blanc (nœud) → bleu (gauche) */}
          <linearGradient id="hts-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="#60A5FA" />
            <stop offset="50%"  stopColor="#E9D5FF" />
            <stop offset="100%" stopColor="#22D3EE" />
          </linearGradient>

          {/* Lueur du point CUITE dans un dégradé radial : aucun flou recalculé
              à chaque frame (≠ drop-shadow / feGaussianBlur) → fluide et léger. */}
          <radialGradient id="hts-halo">
            <stop offset="0%"   stopColor="rgba(255,255,255,1)" />
            <stop offset="22%"  stopColor="rgba(255,255,255,0.85)" />
            <stop offset="45%"  stopColor="rgba(233,213,255,0.45)" />
            <stop offset="70%"  stopColor="rgba(168,85,247,0.18)" />
            <stop offset="100%" stopColor="rgba(34,211,238,0)" />
          </radialGradient>

          {/* Blobs doux de la traînée — bords flous (dégradé), se fondent en ruban */}
          <radialGradient id="hts-trail-w">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hts-trail-l">
            <stop offset="0%" stopColor="#E9D5FF" stopOpacity="1" />
            <stop offset="50%" stopColor="#E9D5FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#E9D5FF" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hts-trail-c">
            <stop offset="0%" stopColor="#A9D8FF" stopOpacity="1" />
            <stop offset="50%" stopColor="#A9D8FF" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#A9D8FF" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Un seul point lumineux — UN seul groupe, UNE seule animation de mouvement.
            Halo + cœur translatés ensemble, sans filtre par frame. Tour en 2 s. */}
        {/* Traînée de la comète — blobs doux décalés en phase, se fondent en ruban effilé */}
        {COMET.map((c, i) => (
          <circle key={i} r={c.r} fill={`url(#${c.grad})`} opacity={c.opacity}>
            <animateMotion dur="2s" repeatCount="indefinite" begin={c.begin}>
              <mpath href="#hts-infinity" />
            </animateMotion>
          </circle>
        ))}

        <g ref={pointRef} style={{ willChange: 'transform' }}>
          {/* halo qui respire */}
          <circle r="40" fill="url(#hts-halo)">
            <animate attributeName="r" values="38;45;38" dur="2.6s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
            <animate attributeName="opacity" values="0.85;1;0.85" dur="2.6s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
          </circle>
          {/* éclat d'étoile délicat — la « magie » du point */}
          <path d="M0,-13 L2,-2 L13,0 L2,2 L0,13 L-2,2 L-13,0 L-2,-2 Z" fill="#fff" opacity="0.35">
            <animate attributeName="opacity" values="0.14;0.55;0.14" dur="2.1s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
            <animateTransform attributeName="transform" type="scale" values="0.78;1.18;0.78" dur="2.1s"
              repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
          </path>
          {/* cœur qui scintille */}
          <circle r="5" fill="#fff">
            <animate attributeName="r" values="4.3;5.7;4.3" dur="1.7s" repeatCount="indefinite"
              calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
          </circle>
          <circle r="2.4" fill="#fff" />
          <animateMotion dur="2s" repeatCount="indefinite">
            <mpath href="#hts-infinity" />
          </animateMotion>
        </g>
      </svg>

      {/* Couche 2 — papillon PNG (devant le flux, la lueur transparaît) */}
      <img
        src="/assets/temposystem-butterfly-transparent.png"
        className="hts-butterfly"
        alt=""
        aria-hidden="true"
      />

      {/* Couche 2b — « électrification » : copie teintée électrique, seule l'opacité
          pulse (1 s = chaque passage du point au centre). Filtre statique, blend screen. */}
      <img
        ref={chargeRef}
        src="/assets/temposystem-butterfly-transparent.png"
        className="hts-butterfly hts-butterfly-charge"
        alt=""
        aria-hidden="true"
      />

      {/* Couche 3 — Compteurs HTML, calés au cœur de chaque aile */}
      <div className="hts-counter hts-counter-left">
        <span className="hts-clock hts-amber">{fmt(remaining)}</span>
        <span className="hts-mana"><span className="hts-role">Donneur</span>−{given}<span className="hts-unit-mana hts-unit-d">MANA</span></span>
      </div>

      <div className="hts-counter hts-counter-right">
        <span className="hts-clock hts-green">{fmt(given)}</span>
        <span className="hts-mana"><span className="hts-role">Receveur</span>+{given}<span className="hts-unit-mana hts-unit-r">MANA</span></span>
      </div>
    </div>
  );
}
