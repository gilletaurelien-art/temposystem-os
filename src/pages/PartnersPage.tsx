import { useEffect, useState } from "react";
import { Section } from "../components/Section";
import EcosystemBlock from "../components/EcosystemBlock";
import { useLang } from "../lib/lang";

/** CTA doré qui se tape en machine à écrire une fois (caret qui s'efface). */
function TypeCTA({ href, text }: { href: string; text: string }) {
  const full = text + " →";
  const [shown, setShown] = useState("");
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(full);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      i += 1;
      setShown(full.slice(0, i));
      if (i < full.length) timer = setTimeout(tick, 55);
    };
    timer = setTimeout(tick, 400);
    return () => clearTimeout(timer);
  }, [full]);
  const done = shown.length >= full.length;
  return (
    <a href={href} aria-label={text}>
      <span aria-hidden="true">{shown}</span>
      <span className={`pt-caret${done ? " is-done" : ""}`} aria-hidden="true" />
    </a>
  );
}

const patronPacks = [
  { name: "Bronze", donation: "1 500 €", mana: "180 000 MANA", time: { fr: "50 heures", en: "50 hours" } },
  { name: "Argent", donation: "3 000 €", mana: "540 000 MANA", time: { fr: "150 heures", en: "150 hours" } },
  { name: "Or", donation: "6 000 €", mana: "1 620 000 MANA", time: { fr: "450 heures", en: "450 hours" } },
  { name: "Horizon", donation: "12 000 €", mana: "4 320 000 MANA", time: { fr: "1 200 heures", en: "1,200 hours" } },
] as const;

export function PartnersPage() {
  const { lang } = useLang();
  const [path, setPath] = useState<"public" | "private" | "individual">("public");

  return <><Section
    eyebrow={lang === "fr" ? "Partenaires" : "Partners"}
    title={lang === "fr" ? "Un même écosystème. Trois manières d’y prendre part." : "One ecosystem. Three ways to take part."}
  >
    <div className="partner-choice">
      <p className="partner-choice__label">{lang === "fr" ? "Choisissez votre situation" : "Choose your situation"}</p>
      <div className="partner-switch" role="tablist" aria-label={lang === "fr" ? "Type de partenaire" : "Partner type"}>
        <button type="button" role="tab" aria-selected={path === "public"} className={path === "public" ? "is-active" : ""} onClick={() => setPath("public")}><span>01</span><strong>{lang === "fr" ? "Partenaire public" : "Public partner"}</strong><small>{lang === "fr" ? "Collectivité · Institution" : "Authority · Institution"}</small></button>
        <button type="button" role="tab" aria-selected={path === "private"} className={path === "private" ? "is-active" : ""} onClick={() => setPath("private")}><span>02</span><strong>{lang === "fr" ? "Mécène privé" : "Private patron"}</strong><small>{lang === "fr" ? "Entreprise · Fondation" : "Company · Foundation"}</small></button>
        <button type="button" role="tab" aria-selected={path === "individual"} className={path === "individual" ? "is-active" : ""} onClick={() => setPath("individual")}><span>03</span><strong>{lang === "fr" ? "Donateur particulier" : "Individual donor"}</strong><small>{lang === "fr" ? "Ponctuel · Régulier" : "One-off · Recurring"}</small></button>
      </div>
    </div>

    {path === "public" ? <section className="partner-path" role="tabpanel">
      <div className="partner-path__heading"><div><p className="editorial-kicker">{lang === "fr" ? "Collectivités & institutions" : "Local authorities & institutions"}</p><h2>{lang === "fr" ? "Ouvrir un réseau civique sur votre territoire." : "Open a civic network in your territory."}</h2></div><p>{lang === "fr" ? "Rejoignez MANAfrance pour accéder au réseau mutualisé, ou TEMPOsystem pour disposer en plus de votre propre environnement numérique. MANAfrance est inclus dans chaque licence territoriale TEMPOsystem." : "Join MANAfrance for the shared network, or TEMPOsystem to add your own digital environment. MANAfrance is included with every territorial TEMPOsystem licence."}</p></div>
      <div className="partner-public-grid">
        <article><small>MANAfrance</small><strong>{lang === "fr" ? "Dès 1 500 € / an" : "From €1,500 / year"}</strong><p>{lang === "fr" ? "Réseau civique mutualisé pour les habitants, les associations et les missions du territoire." : "A shared civic network for residents, non-profits and local missions."}</p><TypeCTA href="https://manafrance.org" text={lang === "fr" ? "Rejoindre MANAfrance" : "Join MANAfrance"} /></article>
        <article><span className="partner-badge">{lang === "fr" ? "MANAfrance inclus" : "MANAfrance included"}</span><small>TEMPOsystem</small><strong>{lang === "fr" ? "Dès 3 000 € / an" : "From €3,000 / year"}</strong><p>{lang === "fr" ? "Le réseau civique, votre extranet, votre application et un environnement adapté à votre organisation." : "The civic network, your extranet, app and an environment adapted to your organisation."}</p><TypeCTA href="#/tarifs#territoires" text={lang === "fr" ? "Voir la grille territoriale" : "See territorial pricing"} /></article>
      </div>
    </section> : path === "private" ? <section className="partner-path" role="tabpanel">
      <div className="partner-path__heading"><div><p className="editorial-kicker">{lang === "fr" ? "Entreprises mécènes" : "Corporate patrons"}</p><h2>{lang === "fr" ? "Des MANA pour vos salariés. Du temps pour les associations." : "MANA for your employees. Time for non-profits."}</h2></div><p>{lang === "fr" ? "Votre don finance l’infrastructure commune. Une dotation de MANA est confiée à votre entreprise pour mobiliser vos salariés et soutenir les associations de votre choix." : "Your donation funds the shared infrastructure. Your company receives a MANA allocation to mobilise employees and support chosen non-profits."}</p></div>
      <div className="patron-grid">
        {patronPacks.map((pack) => <article className="patron-card" key={pack.name}>
          <small>{lang === "fr" ? "Pack mécène" : "Patron pack"}</small><h3>{pack.name}</h3>
          <strong>{pack.donation}<span>{lang === "fr" ? "don annuel" : "annual donation"}</span></strong>
          <dl><div><dt>{lang === "fr" ? "Dotation" : "Allocation"}</dt><dd>{pack.mana}</dd></div><div><dt>{lang === "fr" ? "Temps correspondant" : "Equivalent time"}</dt><dd>{pack.time[lang]}</dd></div></dl>
          <p>{lang === "fr" ? "À répartir entre vos salariés. Les MANA immobiles soutiennent chaque nuit les associations choisies." : "Distribute among employees. Unused MANA supports chosen non-profits each night."}</p>
          {pack.name === "Horizon" && <p className="patron-card__advantage"><strong>{lang === "fr" ? "Avantage Horizon" : "Horizon benefit"}</strong>{lang === "fr" ? "−20 % sur la première année d’abonnement TEMPOsystem, hors mise en service et développements spécifiques." : "20% off the first year of a TEMPOsystem subscription, excluding setup and custom development."}</p>}
          <a href={`mailto:contact@manahome.org?subject=${encodeURIComponent(`Devenir mécène MANAfrance — Pack ${pack.name}`)}`}>{lang === "fr" ? `Choisir ${pack.name}` : `Choose ${pack.name}`} →</a>
        </article>)}
      </div>
      <p className="partner-clarification">{lang === "fr" ? "Le don finance l’infrastructure : il ne constitue pas un achat de MANA. Les unités sont inconvertibles en euros et restent soumises aux règles de circulation solidaire de MANAfrance." : "The donation funds the infrastructure; it is not a purchase of MANA. Units cannot be converted into euros and remain subject to MANAfrance solidarity circulation rules."}</p>
    </section> : <section className="partner-path partner-path--individual" role="tabpanel">
      <div className="partner-path__heading partner-path__heading--single"><div><p className="editorial-kicker">{lang === "fr" ? "Donateurs particuliers" : "Individual donors"}</p><h2>{lang === "fr" ? "Soutenir librement l'infrastructure commune." : "Freely support the shared infrastructure."}</h2></div></div>
      <div className="partner-public-grid">
        <article><small>{lang === "fr" ? "Soutien libre" : "Flexible support"}</small><strong>{lang === "fr" ? "Don ponctuel" : "One-off donation"}</strong><p>{lang === "fr" ? "Contribuer une fois, librement, au développement de l'infrastructure commune." : "Make a one-time contribution to the development of the shared infrastructure."}</p><a href={`mailto:contact@manahome.org?subject=${encodeURIComponent(lang === "fr" ? "Je souhaite faire un don ponctuel" : "I would like to make a one-off donation")}`}>{lang === "fr" ? "Préparer mon soutien" : "Prepare my support"} →</a></article>
        <article><small>{lang === "fr" ? "Soutien dans la durée" : "Long-term support"}</small><strong>{lang === "fr" ? "Contribution régulière" : "Recurring contribution"}</strong><p>{lang === "fr" ? "Soutenir chaque mois la continuité du développement, de la documentation et des expérimentations." : "Support continued development, documentation and experiments each month."}</p><a href={`mailto:contact@manahome.org?subject=${encodeURIComponent(lang === "fr" ? "Je souhaite soutenir MANA régulièrement" : "I would like to support MANA regularly")}`}>{lang === "fr" ? "Préparer mon soutien" : "Prepare my support"} →</a></article>
      </div>
      <div className="partner-clarification partner-clarification--support">
        <p>{lang === "fr" ? "Aucun paiement n'est réalisé sur ce site pour le moment. Votre messagerie s'ouvre avec une demande que vous pouvez relire avant l'envoi. Aucun avantage fiscal n'est annoncé à ce stade." : "No payment is currently processed on this site. Your email app opens with a request you can review before sending. No tax benefit is advertised at this stage."}</p>
        <p>{lang === "fr" ? "Votre soutien aide MANAfrance et TEMPOsystem à développer les outils civiques communs, documenter les expérimentations et accompagner les premiers territoires." : "Your support helps MANAfrance and TEMPOsystem develop shared civic tools, document experiments and support the first territories."}</p>
      </div>
    </section>}
  </Section><EcosystemBlock lang={lang} /></>;
}
