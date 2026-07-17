import { useEffect, useState } from "react";
import { Section } from "../components/Section";
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
  const [path, setPath] = useState<"public" | "private">("public");

  return <Section
    eyebrow={lang === "fr" ? "Partenaires" : "Partners"}
    title={lang === "fr" ? "Un même écosystème. Deux manières de le soutenir." : "One ecosystem. Two ways to support it."}
    intro={lang === "fr" ? "Une collectivité ouvre le réseau à son territoire. Une entreprise mécène dote ses salariés et les associations qu’elle choisit. Sélectionnez votre situation pour accéder directement aux offres correspondantes." : "A local authority opens the network to its territory. A corporate patron supports its employees and chosen non-profits. Select your situation to see the relevant offers."}
  >
    <div className="partner-switch" role="tablist" aria-label={lang === "fr" ? "Type de partenaire" : "Partner type"}>
      <button type="button" role="tab" aria-selected={path === "public"} className={path === "public" ? "is-active" : ""} onClick={() => setPath("public")}><span>01</span>{lang === "fr" ? "Partenaire public" : "Public partner"}</button>
      <button type="button" role="tab" aria-selected={path === "private"} className={path === "private" ? "is-active" : ""} onClick={() => setPath("private")}><span>02</span>{lang === "fr" ? "Mécène privé" : "Private patron"}</button>
    </div>

    {path === "public" ? <section className="partner-path" role="tabpanel">
      <div className="partner-path__heading"><div><p className="editorial-kicker">{lang === "fr" ? "Collectivités & institutions" : "Local authorities & institutions"}</p><h2>{lang === "fr" ? "Ouvrir un réseau civique sur votre territoire." : "Open a civic network in your territory."}</h2></div><p>{lang === "fr" ? "Rejoignez MANAfrance pour accéder au réseau mutualisé, ou TEMPOsystem pour disposer en plus de votre propre environnement numérique. MANAfrance est inclus dans chaque licence territoriale TEMPOsystem." : "Join MANAfrance for the shared network, or TEMPOsystem to add your own digital environment. MANAfrance is included with every territorial TEMPOsystem licence."}</p></div>
      <div className="partner-public-grid">
        <article><small>MANAfrance</small><strong>{lang === "fr" ? "Dès 1 500 € / an" : "From €1,500 / year"}</strong><p>{lang === "fr" ? "Réseau civique mutualisé pour les habitants, les associations et les missions du territoire." : "A shared civic network for residents, non-profits and local missions."}</p><TypeCTA href="https://manafrance.org" text={lang === "fr" ? "Rejoindre MANAfrance" : "Join MANAfrance"} /></article>
        <article><span className="partner-badge">{lang === "fr" ? "MANAfrance inclus" : "MANAfrance included"}</span><small>TEMPOsystem</small><strong>{lang === "fr" ? "Dès 3 000 € / an" : "From €3,000 / year"}</strong><p>{lang === "fr" ? "Le réseau civique, votre extranet, votre application et un environnement adapté à votre organisation." : "The civic network, your extranet, app and an environment adapted to your organisation."}</p><TypeCTA href="#/tarifs#territoires" text={lang === "fr" ? "Voir la grille territoriale" : "See territorial pricing"} /></article>
      </div>
    </section> : <section className="partner-path" role="tabpanel">
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
    </section>}
  </Section>;
}
