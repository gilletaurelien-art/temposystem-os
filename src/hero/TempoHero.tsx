import { useMemo, useState } from "react";
import { tempoOffers } from "../config/offers";
import { useLang } from "../lib/lang";
import "./tempoSelector.css";

const organisations = {
  fr: [
    ["", "Choisissez votre organisation"], ["civic", "Collectivité, CCAS ou CIAS"], ["asso", "Association ou fédération"],
    ["care", "Établissement social ou médico-social"], ["territories", "Opérateur ou alliance territoriale"],
    ["impact", "Fondation ou financeur"], ["rse", "Entreprise"],
  ],
  en: [
    ["", "Choose your organisation"], ["civic", "Local authority or social service"], ["asso", "Non-profit or federation"],
    ["care", "Social or care institution"], ["territories", "Territorial operator or alliance"],
    ["impact", "Foundation or funder"], ["rse", "Company"],
  ],
} as const;

export function TempoHero() {
  const { lang } = useLang();
  const [organisation, setOrganisation] = useState("");
  const result = useMemo(() => tempoOffers.find((offer) => offer.slug === organisation), [organisation]);
  const isTerritorial = organisation === "civic" || organisation === "territories";
  const isAssociation = organisation === "asso";

  return <section className="selector-hero" aria-labelledby="selector-hero-title">
    <div className="selector-hero__wrap">
      <div className="selector-hero__intro">
        <p className="editorial-kicker">{lang === "fr" ? "TECHNOLOGIE CIVIQUE · CONÇUE EN FRANCE" : "CIVIC TECHNOLOGY · DESIGNED IN FRANCE"}</p>
        <h1 id="selector-hero-title">{lang === "fr" ? <>L'énergie de votre collectif. <em>Organisée autour de vos besoins.</em></> : <>The energy of your collective. <em>Organised around your needs.</em></>}</h1>
        <p>{lang === "fr" ? "TEMPOsystem réunit vos équipes, vos participants et vos actions dans un environnement numérique adapté à votre structure." : "TEMPOsystem brings your teams, participants and actions together in a digital environment adapted to your organisation."}</p>
        <p className="selector-hero__proof">{lang === "fr" ? "Simple à déployer · Sur mesure dans son apparence · Souverain dans ses données" : "Simple to deploy · Tailored in appearance · Sovereign by design"}</p>
      </div>

      <div className="selector-pipe" aria-label={lang === "fr" ? "Trouver mon point de départ" : "Find my starting point"}>
        <div className="selector-pipe__step">
          <span className="selector-pipe__number">01</span>
          <label htmlFor="tempo-organisation">{lang === "fr" ? "Vous êtes…" : "You are…"}</label>
          <select id="tempo-organisation" value={organisation} onChange={(event) => setOrganisation(event.target.value)}>
            {organisations[lang].map(([value, label]) => <option value={value} key={value}>{label}</option>)}
          </select>
          <p>{lang === "fr" ? "Une seule réponse suffit pour afficher les voies réellement accessibles à votre structure." : "One answer is enough to show the paths genuinely available to your organisation."}</p>
        </div>

        <div className="selector-pipe__choices" aria-live="polite">
          {!organisation && <div className="selector-pipe__placeholder">
            <span className="selector-pipe__number">02</span>
            <strong>{lang === "fr" ? "Deux manières de commencer" : "Two ways to begin"}</strong>
            <p>{lang === "fr" ? "Sélectionnez votre organisation pour comparer une entrée dans le réseau commun et un environnement dédié." : "Select your organisation to compare joining the shared network with a dedicated environment."}</p>
          </div>}

          {(isTerritorial || isAssociation) && <>
            <article className="selector-choice selector-choice--mana">
              <span className="selector-pipe__number">02 · MANAfrance</span>
              <small>{lang === "fr" ? "Le réseau civique prêt à rejoindre" : "The civic network ready to join"}</small>
              <strong>{isAssociation ? (lang === "fr" ? "Accès essentiel gratuit" : "Free essential access") : (lang === "fr" ? "Dès 1 500 € / an" : "From €1,500 / year")}</strong>
              <p>{lang === "fr" ? "Citoyens, associations, missions et temps partagé dans un réseau commun." : "Citizens, organisations, missions and shared time in one common network."}</p>
              <a href="https://manafrance.org">{lang === "fr" ? "Rejoindre MANAfrance" : "Join MANAfrance"} →</a>
            </article>
            <article className="selector-choice selector-choice--tempo">
              <span className="selector-choice__badge">{lang === "fr" ? "MANAfrance inclus" : "MANAfrance included"}</span>
              <span className="selector-pipe__number">03 · TEMPOsystem</span>
              <small>{lang === "fr" ? "Le réseau civique + votre environnement dédié" : "The civic network + your dedicated environment"}</small>
              <strong>{isAssociation ? (lang === "fr" ? "Dès 1 200 € / an" : "From €1,200 / year") : (lang === "fr" ? "Dès 3 000 € / an" : "From €3,000 / year")}</strong>
              <p>{result?.promise[lang]}</p>
              <a href={isTerritorial ? "#/tarifs#territoires" : `#/tarifs#${result?.slug}`}>{lang === "fr" ? "Comparer l’offre complète" : "Compare the full offer"} →</a>
            </article>
          </>}

          {organisation && !isTerritorial && !isAssociation && result && <article className="selector-choice selector-choice--tempo selector-choice--single">
            <span className="selector-pipe__number">02 · {lang === "fr" ? "Votre point de départ" : "Your starting point"}</span>
            <small>TEMPOsystem {result.name}</small>
            <strong>{result.audience[lang]}</strong>
            <p>{result.promise[lang]}</p>
            <a href={`#/tarifs#${result.slug}`}>{lang === "fr" ? "Voir l’offre et son périmètre" : "See the offer and scope"} →</a>
          </article>}
        </div>
      </div>

      <p className="selector-hero__relationship">{lang === "fr" ? <><strong>MANAfrance fonctionne grâce à TEMPOsystem.</strong> Rejoignez le réseau commun, ou choisissez TEMPOsystem pour disposer en plus de votre propre environnement.</> : <><strong>MANAfrance is powered by TEMPOsystem.</strong> Join the shared network, or choose TEMPOsystem to add your own dedicated environment.</>}</p>
      <div className="selector-hero__actions">
        <a className="editorial-button editorial-button--primary" href={result ? `#/creer?offre=${result.slug}` : "#/creer"}>{lang === "fr" ? "Rejoindre TEMPOsystem" : "Join TEMPOsystem"}</a>
        <a className="editorial-button editorial-button--secondary" href="#/tarifs">{lang === "fr" ? "Comparer les offres et les tarifs" : "Compare offers and pricing"}</a>
      </div>
    </div>
  </section>;
}
