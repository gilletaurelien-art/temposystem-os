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

const needs = {
  fr: [
    ["", "Choisissez votre priorité"], ["coordinate", "Coordonner plusieurs acteurs"], ["volunteers", "Mobiliser des contributeurs ou bénévoles"],
    ["care", "Organiser un parcours d'accompagnement"], ["impact", "Suivre les actions et leur impact"], ["engagement", "Engager les équipes de l'entreprise"],
  ],
  en: [
    ["", "Choose your priority"], ["coordinate", "Coordinate multiple stakeholders"], ["volunteers", "Mobilise contributors or volunteers"],
    ["care", "Organise a support pathway"], ["impact", "Track actions and their impact"], ["engagement", "Engage company teams"],
  ],
} as const;

function recommend(organisation: string, need: string) {
  if (need === "care") return "care";
  if (need === "engagement" || organisation === "rse") return "rse";
  if (need === "impact" && organisation !== "civic") return "impact";
  if (need === "volunteers" && organisation !== "civic") return "asso";
  if (need === "coordinate" && organisation === "territories") return "territories";
  return organisation;
}

export function TempoHero() {
  const { lang } = useLang();
  const [organisation, setOrganisation] = useState("");
  const [need, setNeed] = useState("");
  const result = useMemo(() => tempoOffers.find((offer) => offer.slug === recommend(organisation, need)), [organisation, need]);

  return <section className="selector-hero" aria-labelledby="selector-hero-title">
    <div className="selector-hero__wrap">
      <div className="selector-hero__intro">
        <p className="editorial-kicker">{lang === "fr" ? "TECHNOLOGIE CIVIQUE · CONÇUE EN FRANCE" : "CIVIC TECHNOLOGY · DESIGNED IN FRANCE"}</p>
        <h1 id="selector-hero-title">{lang === "fr" ? <>L'énergie de votre collectif. <em>Organisée autour de vos besoins.</em></> : <>The energy of your collective. <em>Organised around your needs.</em></>}</h1>
        <p>{lang === "fr" ? "TEMPOsystem réunit vos équipes, vos participants et vos actions dans un environnement numérique adapté à votre structure." : "TEMPOsystem brings your teams, participants and actions together in a digital environment adapted to your organisation."}</p>
        <p className="selector-hero__proof">{lang === "fr" ? "Simple à déployer · Sur mesure dans son apparence · Souverain dans ses données" : "Simple to deploy · Tailored in appearance · Sovereign by design"}</p>
      </div>
      <div className="selector-pipe" aria-label={lang === "fr" ? "Trouver mon TEMPOsystem" : "Find my TEMPOsystem"}>
        <div className="selector-pipe__step">
          <span className="selector-pipe__number">01</span>
          <label htmlFor="tempo-organisation">{lang === "fr" ? "Votre organisation" : "Your organisation"}</label>
          <select id="tempo-organisation" value={organisation} onChange={(event) => setOrganisation(event.target.value)}>
            {organisations[lang].map(([value, label]) => <option value={value} key={value}>{label}</option>)}
          </select>
        </div>
        <span className="selector-pipe__link" aria-hidden="true" />
        <div className="selector-pipe__step">
          <span className="selector-pipe__number">02</span>
          <label htmlFor="tempo-need">{lang === "fr" ? "Votre priorité" : "Your priority"}</label>
          <select id="tempo-need" value={need} onChange={(event) => setNeed(event.target.value)}>
            {needs[lang].map(([value, label]) => <option value={value} key={value}>{label}</option>)}
          </select>
        </div>
        <span className="selector-pipe__link" aria-hidden="true" />
        <div className={`selector-pipe__result${result ? " is-ready" : ""}`} aria-live="polite">
          <span className="selector-pipe__number">03</span>
          {result ? <>
            <small>{lang === "fr" ? "Votre point de départ" : "Your starting point"}</small>
            <strong>TEMPOsystem <b>{result.name}</b></strong>
            <p>{result.promise[lang]}</p>
            <a href={`#/tarifs#${result.slug}`}>{lang === "fr" ? "Voir l'offre et son périmètre" : "See the offer and scope"} →</a>
          </> : <>
            <small>{lang === "fr" ? "Votre recommandation" : "Your recommendation"}</small>
            <strong>{lang === "fr" ? "À préciser" : "To be determined"}</strong>
            <p>{lang === "fr" ? "Sélectionnez votre organisation pour identifier le bon point de départ." : "Select your organisation to identify the right starting point."}</p>
          </>}
        </div>
      </div>
      <div className="selector-hero__actions">
        <a className="editorial-button editorial-button--primary" href={result ? `#/creer?offre=${result.slug}` : "#/creer"}>{lang === "fr" ? "Créer mon TEMPOsystem" : "Create my TEMPOsystem"}</a>
        <a className="editorial-button editorial-button--secondary" href="#/tarifs">{lang === "fr" ? "Découvrir les formules" : "Explore plans"}</a>
      </div>
    </div>
  </section>;
}
