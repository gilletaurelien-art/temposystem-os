import { useLang } from "../lib/lang";
import "./tempoSelector.css";

export function TempoHero() {
  const { lang } = useLang();

  return <section className="selector-hero" aria-labelledby="selector-hero-title">
    <div className="selector-hero__wrap">
      <div className="selector-hero__intro">
        <p className="editorial-kicker">{lang === "fr" ? "TECHNOLOGIE CIVIQUE · CONÇUE EN FRANCE" : "CIVIC TECHNOLOGY · DESIGNED IN FRANCE"}</p>
        <h1 id="selector-hero-title">{lang === "fr" ? <>L'énergie de votre collectif. <em>Organisée autour de vos besoins.</em></> : <>The energy of your collective. <em>Organised around your needs.</em></>}</h1>
        <p>{lang === "fr" ? "TEMPOsystem réunit vos équipes, vos participants et vos actions dans un environnement numérique adapté à votre structure." : "TEMPOsystem brings your teams, participants and actions together in a digital environment adapted to your organisation."}</p>
        <p className="selector-hero__proof">{lang === "fr" ? "Simple à déployer · Sur mesure dans son apparence · Souverain dans ses données" : "Simple to deploy · Tailored in appearance · Sovereign by design"}</p>
      </div>

      <div className="selector-hero__actions">
        <a className="editorial-button editorial-button--primary" href="#/creer">{lang === "fr" ? "Rejoindre TEMPOsystem" : "Join TEMPOsystem"}</a>
        <a className="editorial-button editorial-button--secondary" href="#/tarifs">{lang === "fr" ? "Découvrir les offres" : "Explore the offers"}</a>
      </div>
    </div>
  </section>;
}
