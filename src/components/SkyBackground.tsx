/**
 * SkyBackground — le décor fondateur (charte « Le Temps Vivant » §3–§4).
 *
 * Ciel bleu pixel en bandes dures, FIXE : on ne « scrolle pas le ciel », on avance
 * dessous. Trois nuages blocky le traversent très lentement (trois vitesses, léger
 * flottement) ; le soleil pixel respire, posé dans le ciel. Un voile de lumière
 * assied le texte. Purement décoratif → aria-hidden, aucun listener, aucun calcul.
 *
 * Le mouvement respecte data-motion : au niveau 0, tokens.css coupe les animations
 * et chaque élément retombe sur sa position statique (posée, pas au hasard).
 */

type Span = [y: number, x1: number, x2: number];

/* Un nuage = des lignes de blocs pleines (spans), quatre tons pour le volume :
   lumière (sommet) · corps · volute (brassage interne) · ombre (base). */
function Cloud({ w, h, hi, body, swirl, shadow }: {
  w: number; h: number; hi: Span[]; body: Span[]; swirl: Span[]; shadow: Span[];
}) {
  const draw = (spans: Span[], cls: string) =>
    spans.map(([y, x1, x2]) => (
      <rect key={`${cls}${y}-${x1}`} className={cls} x={x1} y={y} width={x2 - x1 + 1} height={1} />
    ));
  return (
    <svg viewBox={`0 0 ${w} ${h}`} shapeRendering="crispEdges" aria-hidden="true">
      {draw(hi, "sky-c-hi")}
      {draw(body, "sky-c-w")}
      {draw(swirl, "sky-c-swirl")}
      {draw(shadow, "sky-c-s")}
    </svg>
  );
}

/* Le soleil pixel (§4) : disque en octogone de blocs, dégradé miel→soleil en
   pixel-shading (lumière en haut-gauche, ombre en bas-droite), rayons en blocs. */
function PixelSun() {
  // Octogone plein — spans du disque (13 cellules de large)
  const DISC: Span[] = [
    [0, 4, 8], [1, 3, 9], [2, 2, 10], [3, 1, 11], [4, 1, 11],
    [5, 0, 12], [6, 0, 12], [7, 0, 12], [8, 1, 11], [9, 1, 11],
    [10, 2, 10], [11, 3, 9], [12, 4, 8],
  ];
  // Lumière (haut-gauche) et ombre (bas-droite) — un ton au-dessus / en dessous
  const LIGHT: Span[] = [[1, 4, 6], [2, 3, 5], [3, 2, 4], [4, 2, 3]];
  const SHADE: Span[] = [[9, 8, 10], [10, 7, 9], [11, 6, 8], [12, 5, 8]];
  // Rayons : cardinaux (2 blocs, espacés d'un souffle) + diagonales (1 bloc)
  const RAYS: Span[] = [
    [-4, 6, 6], [-3, 6, 6],          // nord
    [16, 6, 6], [17, 6, 6],          // sud
    [6, -4, -3], [6, 16, 17],        // ouest · est
  ];
  const DIAG: Array<[number, number]> = [[-2, -2], [14, -2], [-2, 14], [14, 14]];
  return (
    <svg viewBox="-5 -5 23 23" shapeRendering="crispEdges" aria-hidden="true">
      {RAYS.map(([y, x1, x2]) => (
        <rect key={`r${y}-${x1}`} className="sky-sun-ray" x={x1} y={y} width={x2 - x1 + 1} height={1} />
      ))}
      {DIAG.map(([x, y]) => (
        <rect key={`d${x}-${y}`} className="sky-sun-ray" x={x} y={y} width={1} height={1} />
      ))}
      {DISC.map(([y, x1, x2]) => (
        <rect key={`b${y}`} className="sky-sun-body" x={x1} y={y} width={x2 - x1 + 1} height={1} />
      ))}
      {LIGHT.map(([y, x1, x2]) => (
        <rect key={`l${y}`} className="sky-sun-light" x={x1} y={y} width={x2 - x1 + 1} height={1} />
      ))}
      {SHADE.map(([y, x1, x2]) => (
        <rect key={`s${y}`} className="sky-sun-shade" x={x1} y={y} width={x2 - x1 + 1} height={1} />
      ))}
    </svg>
  );
}

/* Une mouette pixel, très fine : deux poses (plané / battement) échangées en
   animation d'images — elle plane au vent et bat de l'aile par petites rafales. */
function Gull() {
  const draw = (spans: Span[], cls: string) => (
    <g className={cls}>
      {spans.map(([y, x1, x2]) => (
        <rect key={`${y}-${x1}`} x={x1} y={y} width={x2 - x1 + 1} height={1} />
      ))}
    </g>
  );
  // Plané : ailes hautes, corps tendu · Battement : ailes rabattues sous le corps
  const GLIDE: Span[] = [[0, 0, 1], [0, 11, 12], [1, 1, 3], [1, 9, 11], [2, 3, 9]];
  const FLAP: Span[] = [[2, 3, 9], [3, 1, 3], [3, 9, 11], [4, 0, 1], [4, 11, 12]];
  return (
    <svg viewBox="0 0 13 5" shapeRendering="crispEdges" aria-hidden="true">
      {draw(GLIDE, "gull-glide")}
      {draw(FLAP, "gull-flap")}
    </svg>
  );
}

export function SkyBackground() {
  return (
    <div className="sky-bg" aria-hidden="true">
      <div className="sky-bg__sun"><PixelSun /></div>

      {/* Trois nuages, trois tailles, trois vitesses (§3) */}
      <div className="sky-bg__cloud sky-bg__cloud--1">
        <Cloud
          w={24} h={8}
          hi={[[0, 9, 12], [1, 7, 14]]}
          body={[[2, 5, 16], [3, 3, 18], [4, 1, 21], [5, 0, 22]]}
          swirl={[[4, 6, 9], [5, 13, 17]]}
          shadow={[[6, 0, 22], [7, 2, 19]]}
        />
      </div>
      <div className="sky-bg__cloud sky-bg__cloud--2">
        <Cloud
          w={20} h={6}
          hi={[[0, 7, 11]]}
          body={[[1, 4, 14], [2, 2, 17], [3, 1, 18]]}
          swirl={[[3, 5, 8]]}
          shadow={[[4, 1, 18], [5, 3, 15]]}
        />
      </div>
      <div className="sky-bg__cloud sky-bg__cloud--3">
        <Cloud
          w={14} h={6}
          hi={[[0, 5, 8]]}
          body={[[1, 3, 10], [2, 2, 11]]}
          swirl={[[2, 6, 8]]}
          shadow={[[3, 2, 11], [4, 4, 9]]}
        />
      </div>

      {/* Trois mouettes au vent — silhouettes fines, plané + petites rafales d'ailes */}
      <div className="sky-bg__gull sky-bg__gull--1"><Gull /></div>
      <div className="sky-bg__gull sky-bg__gull--2"><Gull /></div>
      <div className="sky-bg__gull sky-bg__gull--3"><Gull /></div>

      {/* Voile de lumière — assied le texte sur le ciel (§3) */}
      <div className="sky-bg__veil" />

      {/* Le monde marin — archipel ancré en bas, fondu dans le ciel en haut */}
      <img className="sky-bg__sea" src="/archipel-bandeau.jpg" alt="" aria-hidden="true" />

      {/* Le petit bateau — détouré de l'archipel, il flotte (tangage + dérive lente) */}
      <img className="sky-bg__boat" src="/boat-sprite.png" alt="" aria-hidden="true" />
    </div>
  );
}
