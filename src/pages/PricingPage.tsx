import { Section } from "../components/Section";
import { tempoOffers } from "../config/offers";
import { useLang } from "../lib/lang";

export function PricingPage() {
  const { lang } = useLang();

  return <Section
    eyebrow={lang === "fr" ? "Offres & tarifs" : "Offers & pricing"}
    title={lang === "fr" ? "Un socle commun. Une configuration adaptée à votre terrain." : "One shared foundation. A configuration adapted to your field."}
    intro={lang === "fr" ? "Le tarif dépend du nombre d'organisations, des usages activés, du niveau d'accompagnement et des connexions nécessaires. Nous préférons un périmètre explicite à un prix d'appel trompeur." : "Pricing depends on the number of organisations, enabled uses, support level and required integrations. We prefer a clear scope to a misleading entry price."}
  >
    <div className="pricing-principles">
      <div><strong>{lang === "fr" ? "Démarrage" : "Start"}</strong><span>{lang === "fr" ? "Un besoin réel, un périmètre maîtrisé, une première équipe." : "One real need, a controlled scope, one first team."}</span></div>
      <div><strong>{lang === "fr" ? "Déploiement" : "Deployment"}</strong><span>{lang === "fr" ? "Plusieurs services ou organisations coordonnés dans un même cadre." : "Several services or organisations coordinated in one framework."}</span></div>
      <div><strong>{lang === "fr" ? "Réseau" : "Network"}</strong><span>{lang === "fr" ? "Une infrastructure partagée à l'échelle d'un territoire ou d'une fédération." : "Shared infrastructure across a territory or federation."}</span></div>
    </div>
    <div className="civic-card-grid civic-card-grid--three pricing-grid">
      {tempoOffers.map((offer) => <article className="civic-card pricing-card" id={offer.slug} key={offer.slug}>
        <span className="civic-index">TEMPOSYSTEM</span>
        <h2>{offer.name}</h2>
        <strong>{offer.audience[lang]}</strong>
        <p>{offer.promise[lang]}</p>
        <ul>{offer.uses[lang].map((use) => <li key={use}>{use}</li>)}</ul>
        <div className="pricing-card__price"><span>{lang === "fr" ? "Tarif" : "Price"}</span><strong>{lang === "fr" ? "Sur devis" : "Custom quote"}</strong></div>
        <a className="civic-button civic-button--primary" href={`#/creer?offre=${offer.slug}`}>{lang === "fr" ? "Étudier mon besoin" : "Discuss my needs"}</a>
      </article>)}
    </div>
    <aside className="civic-note"><strong>{lang === "fr" ? "Ce que le devis rend visible : " : "What the quote makes clear: "}</strong>{lang === "fr" ? "mise en place, accompagnement, hébergement, maintenance, options et conditions d'évolution. Aucun participant ni bénéficiaire n'est monétisé comme un produit." : "setup, support, hosting, maintenance, options and scaling conditions. No participant or beneficiary is monetised as a product."}</aside>
  </Section>;
}
