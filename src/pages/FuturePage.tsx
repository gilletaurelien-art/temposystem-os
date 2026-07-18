import { useEffect, useState } from "react";
import { useLang } from "../lib/lang";
import "./futurePage.css";

/**
 * 2042 — « Une société qui se souvient d'avoir agi ensemble ».
 * Page à teneur académique : progression thèse · antithèse · synthèse,
 * triade Devenir · Convenir · Avenir, six horizons, garanties (contrepoint 1984),
 * et appareil de références (loi ESS, ONU, RGPD/CNIL, mémoire organisationnelle,
 * communs d'Ostrom, UNESCO, Constitution numérique TEMPOsystem).
 * Le header réutilise la scène d'île animée portée en tête de page.
 */

const ISLANDS = [
  "/islands/island-01-coordination-1400.jpg",
  "/islands/island-02-decision-1400.jpg",
  "/islands/island-03-memoire-1400.jpg",
];

/** Appel de note académique : ¹ ² ³ … reliés à la section Références. */
function Cite({ n }: { n: number }) {
  return (
    <sup className="future-cite">
      <a href={`#ref-${n}`} aria-label={`Référence ${n}`}>[{n}]</a>
    </sup>
  );
}

/** « 2042 » en pixel-art, tapé en boucle (machine à écrire : tape → pause →
 *  efface → recommence). Respecte prefers-reduced-motion (texte figé). */
function PixelType({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(text);
      return;
    }
    let i = 0;
    let dir = 1;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      setShown(text.slice(0, i));
      if (dir === 1) {
        if (i < text.length) { i += 1; timer = setTimeout(tick, 340); }
        else { dir = -1; timer = setTimeout(tick, 2600); }   // pause, nombre complet
      } else {
        if (i > 0) { i -= 1; timer = setTimeout(tick, 170); }
        else { dir = 1; timer = setTimeout(tick, 850); }      // pause avant de retaper
      }
    };
    tick();
    return () => clearTimeout(timer);
  }, [text]);
  return (
    <span aria-label={text}>
      <span aria-hidden="true">{shown}</span>
      <span className="future-caret" aria-hidden="true" />
    </span>
  );
}

export function FuturePage() {
  const { lang } = useLang();
  const fr = lang === "fr";

  return (
    <main className="future">
      {/* ------------------------------------------------------------------ */}
      {/* Header : l'île animée en tête de page                               */}
      {/* ------------------------------------------------------------------ */}
      <header className="future-hero">
        <div className="future-hero__frames" aria-hidden="true">
          {ISLANDS.map((src, i) => (
            <img key={src} className={`future-hero__frame future-hero__frame--${i + 1}`} src={src} alt="" loading="eager" />
          ))}
        </div>
        <div className="future-hero__veil" aria-hidden="true" />
        <div className="future-hero__copy">
          <h1 className="future-hero__title"><PixelType text="2042" /></h1>
          <p className="future-hero__sub">
            {fr
              ? "— L'avenir appartient aux collectifs capables de se souvenir."
              : "— The future belongs to collectives able to remember."}
          </p>
        </div>
      </header>

      <div className="future-body">
        <div className="future-wrap">

          <p className="future-lede future-lede--center">
            {fr
              ? "Un avenir institutionnel, civique et profondément humain, construit depuis les principes actuels de l'économie sociale et solidaire."
              : "An institutional, civic and deeply human future, built from the present principles of the social and solidarity economy."}
          </p>

          {/* ---- Contraste 1984 / 2042 ---- */}
          <section className="future-section">
            <div className="future-section__head">
              <span className="future-index">{fr ? "Le point de départ" : "The starting point"}</span>
              <h2>{fr ? <>Deux mémoires, <em>deux avenirs.</em></> : <>Two memories, <em>two futures.</em></>}</h2>
            </div>
            <p>
              {fr
                ? "Orwell a écrit 1984 comme un avertissement : une société dans laquelle le pouvoir confisque la mémoire, modifie le passé et réduit la capacité des personnes à penser ensemble"
                : "Orwell wrote 1984 as a warning: a society in which power confiscates memory, alters the past and diminishes people's capacity to think together"}
              <Cite n={1} />{fr ? ". Le contrepoint n'est pas l'oubli, mais une mémoire d'un autre ordre." : ". The counterpoint is not forgetting, but memory of a different order."}
            </p>
            <div className="future-contrast">
              <div className="future-contrast__col future-contrast__col--now">
                <span className="future-contrast__tag">1984</span>
                <strong>{fr ? "Une mémoire confisquée par le pouvoir." : "A memory confiscated by power."}</strong>
                <p>{fr ? "Surveillance généralisée, passé réécrit, personnes empêchées de penser ensemble." : "Generalized surveillance, a rewritten past, people prevented from thinking together."}</p>
              </div>
              <div className="future-contrast__col future-contrast__col--us">
                <span className="future-contrast__tag">2042</span>
                <strong>{fr ? "Une mémoire gouvernée par les collectifs." : "A memory governed by collectives."}</strong>
                <p>{fr ? "Les collectifs conservent la mémoire de ce qu'ils ont décidé, accompli et appris — et en gardent la maîtrise." : "Collectives preserve the memory of what they decided, achieved and learned — and keep control of it."}</p>
              </div>
            </div>
          </section>

          {/* ---- I. THÈSE ---- */}
          <section className="future-section">
            <div className="future-section__head">
              <span className="future-index">{fr ? "I · Thèse" : "I · Thesis"}</span>
              <h2>{fr ? <>L'ESS produit déjà une <em>énergie collective d'utilité sociale.</em></> : <>The SSE already produces a <em>collective energy of social utility.</em></>}</h2>
            </div>
            <p>
              {fr
                ? "En 2026, l'économie sociale et solidaire affirme une évidence : l'activité humaine peut poursuivre une finalité autre que le seul partage des bénéfices. La loi française place au centre l'utilité sociale, la coopération, la gouvernance démocratique et la primauté des personnes"
                : "In 2026, the social and solidarity economy asserts an evidence: human activity can pursue an aim other than the mere sharing of profits. French law places social utility, cooperation, democratic governance and the primacy of people at its centre"}
              <Cite n={2} />{fr ? ". Cette finalité est désormais reconnue jusqu'au niveau international" : ". This aim is now recognized up to the international level"}<Cite n={3} />.
            </p>
            <p>
              {fr
                ? "Tout collectif porte davantage de possibilités qu'il n'en perçoit : des besoins cherchent une réponse, des personnes portent des talents, du temps peut être partagé, des organisations souhaitent coopérer. Cette énergie existe. Elle est réelle. Elle est déjà à l'œuvre."
                : "Every collective holds more possibilities than it perceives: needs seek answers, people carry talents, time can be shared, organizations wish to cooperate. This energy exists. It is real. It is already at work."}
            </p>
          </section>

          {/* ---- II. ANTITHÈSE ---- */}
          <section className="future-section">
            <div className="future-section__head">
              <span className="future-index">{fr ? "II · Antithèse" : "II · Antithesis"}</span>
              <h2>{fr ? <>Sans mémoire, l'énergie se perd — <em>mais une mémoire totale devient un pouvoir.</em></> : <>Without memory, energy is lost — <em>yet total memory becomes a power.</em></>}</h2>
            </div>
            <p>
              {fr
                ? "Une fragilité demeure : les collectifs agissent, puis oublient. Les équipes changent. Les outils disparaissent. Les décisions perdent leur contexte. Les talents restent invisibles. Les expériences se dispersent. Chaque génération recommence une partie du chemin. La recherche sur la mémoire organisationnelle le documente depuis longtemps : ce qu'un collectif a appris se stocke, se déforme et se perd s'il n'est pas délibérément conservé"
                : "A fragility remains: collectives act, then forget. Teams change. Tools disappear. Decisions lose their context. Talents stay invisible. Experiences scatter. Each generation restarts part of the path. Research on organizational memory has long documented this: what a collective learns is stored, distorted and lost unless deliberately preserved"}
              <Cite n={4} />.
            </p>
            <p>
              {fr
                ? "Mais la réponse naïve — tout enregistrer, tout centraliser — reconduit précisément le cauchemar de 1984. Une mémoire totale, opaque et détenue par un tiers devient un instrument de surveillance, de profilage et de pouvoir. C'est pourquoi la protection des personnes n'est pas une option, mais une condition : droit d'accès, de rectification, d'effacement et de portabilité"
                : "But the naive answer — record everything, centralize everything — reproduces precisely the nightmare of 1984. A total, opaque memory held by a third party becomes an instrument of surveillance, profiling and power. This is why the protection of persons is not an option but a condition: rights of access, rectification, erasure and portability"}
              <Cite n={5} />.
            </p>
          </section>

          {/* ---- III. SYNTHÈSE ---- */}
          <section className="future-section">
            <div className="future-section__head">
              <span className="future-index">{fr ? "III · Synthèse" : "III · Synthesis"}</span>
              <h2>{fr ? <>Une mémoire <em>utile, minimale, transmissible</em> — gouvernée par ceux qui la produisent.</> : <>A memory that is <em>useful, minimal, transmissible</em> — governed by those who produce it.</>}</h2>
            </div>
            <p>
              {fr
                ? "TEMPOsystem naît de cette question : comment permettre aux collectifs de conserver la mémoire de l'énergie qu'ils mettent en mouvement, sans reconduire ni l'oubli ni la surveillance ? La réponse s'inspire des travaux sur la gouvernance des communs : une ressource partagée peut être administrée durablement par la communauté qui la produit, dès lors qu'elle en fixe elle-même les règles"
                : "TEMPOsystem arises from this question: how can collectives keep the memory of the energy they set in motion, without reproducing either forgetting or surveillance? The answer draws on the study of commons governance: a shared resource can be sustainably administered by the community that produces it, provided that community sets its own rules"}
              <Cite n={6} />{fr ? ". La mémoire devient alors un commun." : ". Memory thus becomes a commons."}
            </p>
            <p>
              {fr
                ? "TEMPOsystem ne décide pas pour le collectif : il conserve les conditions dans lesquelles le collectif peut décider. La technologie doit devenir plus discrète à mesure que la capacité d'agir du collectif grandit. Préserver la mémoire de ce que des personnes rendent possible ensemble est un geste ancien, que l'UNESCO reconnaît comme patrimoine"
                : "TEMPOsystem does not decide for the collective: it preserves the conditions in which the collective can decide. Technology must become more discreet as the collective's capacity to act grows. Preserving the memory of what people make possible together is an ancient gesture, one that UNESCO recognizes as heritage"}
              <Cite n={7} />{fr ? ". Ces principes ne sont pas seulement affirmés : ils sont inscrits dans notre Constitution numérique" : ". These principles are not merely asserted: they are written into our digital Constitution"}<Cite n={8} />.
            </p>
          </section>

          {/* ---- Triade Devenir · Convenir · Avenir ---- */}
          <section className="future-section">
            <div className="future-section__head">
              <span className="future-index">{fr ? "Le mouvement" : "The movement"}</span>
              <h2>{fr ? <>Devenir · Convenir · <em>Avenir.</em></> : <>Becoming · Agreeing · <em>Future.</em></>}</h2>
            </div>
            <div className="future-triad">
              <article className="future-triad__card">
                <p className="future-triad__word">{fr ? "Devenir" : "Becoming"}</p>
                <p className="future-triad__gloss">{fr ? "Rendre visible" : "Make visible"}</p>
                <p>{fr ? "Révéler ce qu'un collectif peut accomplir. TEMPOsystem rend visibles les besoins, les talents et le temps partagé, et leur donne un cadre d'action." : "Reveal what a collective can achieve. TEMPOsystem makes needs, talents and shared time visible, and gives them a framework for action."}</p>
              </article>
              <article className="future-triad__card">
                <p className="future-triad__word">{fr ? "Convenir" : "Agreeing"}</p>
                <p className="future-triad__gloss">{fr ? "Décider ensemble" : "Decide together"}</p>
                <p>{fr ? "Construire ce qui peut être décidé et accompli ensemble. Convenir, c'est à la fois parvenir à un accord et être adapté à la situation — sans penser pareil ni abandonner son autonomie." : "Build what can be decided and achieved together. To agree is both to reach an accord and to be fit for the situation — without thinking alike or surrendering autonomy."}</p>
              </article>
              <article className="future-triad__card">
                <p className="future-triad__word">{fr ? "Avenir" : "Future"}</p>
                <p className="future-triad__gloss">{fr ? "Transmettre" : "Transmit"}</p>
                <p>{fr ? "Transformer l'expérience passée en capacité d'agir suivante. Une action terminée laisse des méthodes, des relations, des erreurs et des enseignements : une mémoire transmissible." : "Turn past experience into the next capacity to act. A finished action leaves methods, relationships, mistakes and lessons: a transmissible memory."}</p>
              </article>
            </div>
          </section>

          {/* ---- Équation « mémoire énergétique » ---- */}
          <section className="future-section">
            <div className="future-section__head">
              <span className="future-index">{fr ? "La définition" : "The definition"}</span>
              <h2>{fr ? <>Ce que signifie <em>« mémoire énergétique ».</em></> : <>What <em>"energetic memory"</em> means.</>}</h2>
            </div>
            <p>{fr ? "L'énergie d'un collectif n'est ni une monnaie ni une valeur attribuée aux personnes. Elle désigne ce que le collectif met réellement en mouvement." : "A collective's energy is neither a currency nor a value assigned to people. It designates what the collective actually sets in motion."}</p>
            <div className="future-equation">
              <div className="future-equation__row">
                <span className="future-equation__label">{fr ? "L'énergie mise en mouvement" : "The energy set in motion"}</span>
                <p className="future-equation__terms">
                  {fr ? "Besoins" : "Needs"} <span>+</span> {fr ? "talents" : "talents"} <span>+</span> {fr ? "temps partagé" : "shared time"} <span>+</span> {fr ? "décisions" : "decisions"} <span>+</span> {fr ? "coopération" : "cooperation"} <span>+</span> {fr ? "actions" : "actions"}
                </p>
              </div>
              <div className="future-equation__row">
                <span className="future-equation__label">{fr ? "Ce que la mémoire conserve" : "What the memory preserves"}</span>
                <p className="future-equation__terms">
                  {fr ? "Contexte" : "Context"} <span>+</span> {fr ? "responsabilités" : "responsibilities"} <span>+</span> {fr ? "réalisations" : "achievements"} <span>+</span> {fr ? "enseignements" : "lessons"} <span>+</span> {fr ? "transmission" : "transmission"}
                </p>
              </div>
              <p className="future-equation__note">
                {fr
                  ? <><strong>TEMPOsystem ne mesure pas la valeur humaine.</strong> Il préserve la mémoire de ce que les personnes rendent possible ensemble.</>
                  : <><strong>TEMPOsystem does not measure human worth.</strong> It preserves the memory of what people make possible together.</>}
              </p>
            </div>
          </section>

          {/* ---- Six horizons ---- */}
          <section className="future-section">
            <div className="future-section__head">
              <span className="future-index">{fr ? "Notre 2042" : "Our 2042"}</span>
              <h2>{fr ? <>Six horizons <em>concrets.</em></> : <>Six <em>concrete</em> horizons.</>}</h2>
            </div>
            <div className="future-horizons">
              {(fr ? [
                ["Territoires", "Une commune ne devrait plus perdre son expérience à chaque alternance."],
                ["Solidarités", "Une association ne devrait plus dépendre de la mémoire d'une seule personne."],
                ["Crises", "Un territoire devrait pouvoir s'appuyer sur ce qu'il a appris lors de la précédente."],
                ["Transmission", "Un talent transmis ne devrait plus disparaître avec celui ou celle qui le portait."],
                ["Démocratie", "Une décision publique devrait conserver son contexte, ses responsabilités et ses conséquences."],
                ["Communs", "Une action locale utile devrait inspirer ailleurs sans devenir un modèle imposé."],
              ] : [
                ["Territories", "A municipality should no longer lose its experience at each change of governance."],
                ["Solidarities", "A non-profit should no longer depend on the memory of a single person."],
                ["Crises", "A territory should be able to rely on what it learned during the previous one."],
                ["Transmission", "A transmitted talent should no longer vanish with the person who carried it."],
                ["Democracy", "A public decision should keep its context, its responsibilities and its consequences."],
                ["Commons", "A useful local action should inspire elsewhere without becoming an imposed model."],
              ]).map(([k, body]) => (
                <article key={k} className="future-horizon">
                  <span className="future-horizon__k">{k}</span>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* ---- Cinq questions ---- */}
          <section className="future-section">
            <div className="future-section__head">
              <span className="future-index">{fr ? "La continuité" : "Continuity"}</span>
              <h2>{fr ? <>En 2042, chaque collectif devrait pouvoir répondre à <em>cinq questions.</em></> : <>By 2042, every collective should be able to answer <em>five questions.</em></>}</h2>
            </div>
            <ol className="future-questions">
              {(fr ? [
                "De quoi avons-nous besoin ?",
                "Quels talents pouvons-nous mobiliser ?",
                "Qu'avons-nous décidé ?",
                "Qu'avons-nous accompli ?",
                "Qu'avons-nous appris pour la suite ?",
              ] : [
                "What do we need?",
                "Which talents can we mobilize?",
                "What did we decide?",
                "What did we achieve?",
                "What did we learn for what comes next?",
              ]).map((q) => <li key={q}>{q}</li>)}
            </ol>
          </section>

          {/* ---- Garanties (contrepoint 1984) ---- */}
          <section className="future-section">
            <div className="future-section__head">
              <span className="future-index">{fr ? "Nos garanties" : "Our guarantees"}</span>
              <h2>{fr ? <>Notre différence <em>avec 1984.</em></> : <>Our difference <em>from 1984.</em></>}</h2>
            </div>
            <p>{fr ? "Ce contraste introduit immédiatement nos garanties. L'avenir que nous refusons serait une technologie omniprésente ; celui que nous construisons rend le pouvoir aux collectifs." : "This contrast immediately introduces our guarantees. The future we refuse would be an omnipresent technology; the one we build returns power to collectives."}</p>
            <ul className="future-guarantees">
              <li className="is-neg">{fr ? "Pas de surveillance généralisée" : "No generalized surveillance"}</li>
              <li className="is-neg">{fr ? "Pas de profilage des personnes" : "No profiling of persons"}</li>
              <li className="is-neg">{fr ? "Pas de classement individuel" : "No individual ranking"}</li>
              <li className="is-neg">{fr ? "Pas de décision automatisée engageante" : "No binding automated decision"}</li>
              <li className="is-neg">{fr ? "Pas d'appropriation privée de la mémoire commune" : "No private appropriation of the common memory"}</li>
              <li>{fr ? "Droit d'accès, de retrait et de transmission" : "Right of access, withdrawal and transmission"}</li>
              <li>{fr ? "Gouvernance humaine et explicable" : "Human, explainable governance"}</li>
              <li>{fr ? "Une technologie plus discrète à mesure que le collectif grandit" : "A technology that fades as the collective grows"}</li>
            </ul>
          </section>
        </div>

        {/* ---- Phrase fondatrice ---- */}
        <section className="future-manifesto">
          <p className="future-manifesto__triad">
            {fr ? <>Devenir. Convenir. <span>Avenir.</span></> : <>Becoming. Agreeing. <span>Future.</span></>}
          </p>
          <p className="future-manifesto__lines">
            {fr
              ? <>Révéler ce que nous pouvons accomplir.<br />Décider de ce que nous voulons construire ensemble.<br />Conserver ce que l'action nous a appris.</>
              : <>Reveal what we can achieve.<br />Decide what we want to build together.<br />Keep what action has taught us.</>}
          </p>
          <span className="future-manifesto__sign">
            {fr ? <><b>2042</b> — L'avenir appartient aux collectifs capables de se souvenir.</> : <><b>2042</b> — The future belongs to collectives able to remember.</>}
          </span>
        </section>

        {/* ---- Références ---- */}
        <div className="future-wrap">
          <section className="future-refs" aria-label={fr ? "Références" : "References"}>
            <h2>{fr ? "Références & fondations" : "References & foundations"}</h2>
            <p className="future-refs__intro">
              {fr
                ? "Cette vision s'ancre dans le droit, les institutions et la recherche. Les sources ci-dessous sont citées dans le texte."
                : "This vision is anchored in law, institutions and research. The sources below are cited in the text."}
            </p>
            <ol className="future-ref-list">
              <li id="ref-1" className="future-ref">
                George Orwell, <cite>1984</cite>, Secker &amp; Warburg, 1949.
              </li>
              <li id="ref-2" className="future-ref">
                {fr ? "Loi n° 2014-856 du 31 juillet 2014 relative à l'économie sociale et solidaire, art. 2 (définition de l'utilité sociale)." : "French Law No. 2014-856 of 31 July 2014 on the social and solidarity economy, art. 2 (definition of social utility)."}{" "}
                <a href="https://www.legifrance.gouv.fr/loda/id/JORFTEXT000029313296" target="_blank" rel="noopener noreferrer">Légifrance ↗</a>
              </li>
              <li id="ref-3" className="future-ref">
                {fr ? "Assemblée générale des Nations unies, résolution A/RES/77/281, « Promouvoir l'économie sociale et solidaire au service du développement durable », 18 avril 2023." : "United Nations General Assembly, resolution A/RES/77/281, \"Promoting the social and solidarity economy for sustainable development\", 18 April 2023."}{" "}
                <a href="https://docs.un.org/en/A/RES/77/281" target="_blank" rel="noopener noreferrer">docs.un.org ↗</a>
              </li>
              <li id="ref-4" className="future-ref">
                Walsh, J. P. &amp; Ungson, G. R., <cite>Organizational Memory</cite>, Academy of Management Review, {fr ? "vol. 16, n° 1" : "vol. 16, no. 1"}, 1991, p. 57–91.{" "}
                <a href="https://journals.aom.org/doi/10.5465/amr.1991.4278992" target="_blank" rel="noopener noreferrer">AOM ↗</a>
              </li>
              <li id="ref-5" className="future-ref">
                {fr ? "Règlement (UE) 2016/679 (RGPD) ; CNIL — droits d'accès, de rectification, d'effacement et à la portabilité des données." : "Regulation (EU) 2016/679 (GDPR); CNIL — rights of access, rectification, erasure and data portability."}{" "}
                <a href="https://www.cnil.fr/fr/reglement-europeen-protection-donnees" target="_blank" rel="noopener noreferrer">CNIL ↗</a>
              </li>
              <li id="ref-6" className="future-ref">
                Elinor Ostrom, <cite>Governing the Commons: The Evolution of Institutions for Collective Action</cite>, Cambridge University Press, 1990{fr ? " (prix Nobel d'économie, 2009)." : " (Nobel Prize in Economics, 2009)."}
              </li>
              <li id="ref-7" className="future-ref">
                {fr ? "UNESCO, programme « Mémoire du monde » (Memory of the World), depuis 1992." : "UNESCO, \"Memory of the World\" programme, since 1992."}{" "}
                <a href="https://www.unesco.org/en/memory-world" target="_blank" rel="noopener noreferrer">UNESCO ↗</a>
              </li>
              <li id="ref-8" className="future-ref">
                {fr ? "Constitution numérique TEMPOsystem — texte fondateur des principes de gouvernance, de mémoire et de protection des personnes." : "TEMPOsystem digital Constitution — founding text of the principles of governance, memory and protection of persons."}{" "}
                <a href="https://constitution.temposystem.fr/" target="_blank" rel="noopener noreferrer">constitution.temposystem.fr ↗</a>
              </li>
            </ol>

            <div className="future-foundation">
              <span className="future-foundation__tag">{fr ? "Texte fondateur" : "Founding text"}</span>
              <strong>{fr ? "La Constitution numérique" : "The digital Constitution"}</strong>
              <p>
                {fr
                  ? "Les garanties énoncées ici — gouvernance humaine, non-surveillance, droit de retrait, mémoire comme commun — ne sont pas des promesses marketing. Elles sont inscrites dans la Constitution numérique de TEMPOsystem, qui en constitue la base juridique et morale."
                  : "The guarantees stated here — human governance, non-surveillance, right of withdrawal, memory as a commons — are not marketing promises. They are written into TEMPOsystem's digital Constitution, which forms their legal and moral foundation."}
              </p>
              <a className="civic-button civic-button--primary" href="https://constitution.temposystem.fr/" target="_blank" rel="noopener noreferrer">
                {fr ? "Lire la Constitution" : "Read the Constitution"} ↗
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
