import { Section } from "../components/Section";
import { tempoOffers } from "../config/offers";
import { useLang, type Language } from "../lib/lang";

type Copy = Record<Language, string>;

type Formula = {
  slug: string;
  name: string;
  capacity: Copy;
  systems: Copy;
  audience: Copy;
  example: Copy;
  annualPrice: Copy;
  setupPrice: Copy;
  included: Record<Language, readonly string[]>;
};

const territorialRates = [
  { size: { fr: "Moins de 5 000 habitants", en: "Fewer than 5,000 residents" }, mana: { fr: "1 500 € / an", en: "€1,500 / year" }, tempo: { fr: "3 000 € / an", en: "€3,000 / year" } },
  { size: { fr: "5 000 à 20 000 habitants", en: "5,000 to 20,000 residents" }, mana: { fr: "0,35 € / habitant / an", en: "€0.35 / resident / year" }, tempo: { fr: "0,70 € / habitant / an", en: "€0.70 / resident / year" } },
  { size: { fr: "20 000 à 50 000 habitants", en: "20,000 to 50,000 residents" }, mana: { fr: "0,28 € / habitant / an", en: "€0.28 / resident / year" }, tempo: { fr: "0,56 € / habitant / an", en: "€0.56 / resident / year" } },
  { size: { fr: "Plus de 50 000 habitants", en: "More than 50,000 residents" }, mana: { fr: "0,22 € / habitant / an", en: "€0.22 / resident / year" }, tempo: { fr: "0,44 € / habitant / an", en: "€0.44 / resident / year" } },
] as const;

const formulas: readonly Formula[] = [
  {
    slug: "decouverte",
    name: "Découverte",
    capacity: { fr: "Jusqu’à 9 utilisateurs actifs", en: "Up to 9 active users" },
    systems: { fr: "1 TEMPOsystem ASSO", en: "1 TEMPOsystem ASSO" },
    audience: { fr: "Pour une petite association qui souhaite commencer simplement.", en: "For a small non-profit ready to start simply." },
    example: { fr: "Exemple : une association locale de 9 membres.", en: "Example: a local non-profit with 9 members." },
    annualPrice: { fr: "Gratuit", en: "Free" },
    setupPrice: { fr: "Autonome et gratuite", en: "Self-service and free" },
    included: {
      fr: ["une adresse nom-association.temposystem.fr", "une application PWA essentielle", "le nom et le logo de l’association", "la charte graphique TEMPOsystem standard", "l’hébergement et les mises à jour", "le support documentaire"],
      en: ["a name.temposystem.fr address", "an essential installable PWA", "the organisation’s name and logo", "the standard TEMPOsystem visual identity", "hosting and updates", "documentation support"],
    },
  },
  {
    slug: "eclosion",
    name: "Éclosion",
    capacity: { fr: "Jusqu’à 99 utilisateurs actifs", en: "Up to 99 active users" },
    systems: { fr: "2 TEMPOsystemS inclus", en: "2 TEMPOsystemS included" },
    audience: { fr: "Pour une association structurée ou une première équipe territoriale.", en: "For an established non-profit or a first territorial team." },
    example: { fr: "Exemple : 60 bénévoles coordonnés avec ASSO et IMPACT.", en: "Example: 60 volunteers coordinated with ASSO and IMPACT." },
    annualPrice: { fr: "1 200 € / an", en: "€1,200 / year" },
    setupPrice: { fr: "900 €", en: "€900" },
    included: {
      fr: ["l’extranet structure.temposystem.fr", "l’application structure-app.temposystem.fr", "la déclinaison de votre identité graphique", "2 configurations au choix", "les statistiques essentielles et l’export des données", "une formation à distance pour les référents", "le support standard"],
      en: ["the structure.temposystem.fr coordination extranet", "the structure-app.temposystem.fr participant app", "adaptation of your visual identity", "2 configurations of your choice", "essential statistics and data export", "one remote training session for coordinators", "standard support"],
    },
  },
  {
    slug: "cooperation",
    name: "Coopération",
    capacity: { fr: "Jusqu’à 499 utilisateurs actifs", en: "Up to 499 active users" },
    systems: { fr: "4 TEMPOsystemS inclus", en: "4 TEMPOsystemS included" },
    audience: { fr: "Pour un réseau local, une fédération ou plusieurs structures partenaires.", en: "For a local network, federation or several partner organisations." },
    example: { fr: "Exemple : 12 associations et 350 participants dans un même environnement.", en: "Example: 12 organisations and 350 participants in one environment." },
    annualPrice: { fr: "3 600 € / an", en: "€3,600 / year" },
    setupPrice: { fr: "2 500 €", en: "€2,500" },
    included: {
      fr: ["l’extranet et l’application PWA personnalisés", "4 configurations au choix", "plusieurs responsables et organisations partenaires", "le tableau d’impact avancé", "une formation sur site", "le support renforcé", "l’hébergement, la maintenance et les sauvegardes"],
      en: ["a personalised extranet and installable PWA", "4 configurations of your choice", "multiple coordinators and partner organisations", "the advanced impact dashboard", "one on-site training day", "enhanced support", "hosting, maintenance and backups"],
    },
  },
  {
    slug: "territoire",
    name: "Territoire",
    capacity: { fr: "Jusqu’à 999 utilisateurs actifs", en: "Up to 999 active users" },
    systems: { fr: "6 TEMPOsystemS inclus", en: "6 TEMPOsystemS included" },
    audience: { fr: "Pour une collectivité, une intercommunalité ou un programme territorial.", en: "For a local authority or territorial programme." },
    example: { fr: "Exemple : une communauté de communes coordonnant 800 participants.", en: "Example: a group of municipalities coordinating 800 participants." },
    annualPrice: { fr: "7 200 € / an", en: "€7,200 / year" },
    setupPrice: { fr: "Dès 6 000 €", en: "From €6,000" },
    included: {
      fr: ["les 6 configurations CARE, CIVIC, ASSO, TERRITORIES, IMPACT et RSE", "l’extranet, l’application PWA et l’identité graphique adaptée", "un tableau de pilotage territorial", "la migration initiale des données", "l’accompagnement au déploiement", "deux journées de formation", "le support prioritaire"],
      en: ["all 6 configurations: CARE, CIVIC, ASSO, TERRITORIES, IMPACT and RSE", "the extranet, installable PWA and adapted visual identity", "a territorial steering dashboard", "initial data migration", "deployment support", "two training days", "priority support"],
    },
  },
  {
    slug: "alliance",
    name: "Alliance",
    capacity: { fr: "À partir de 1 000 utilisateurs actifs", en: "From 1,000 active users" },
    systems: { fr: "Environnements reliés selon le projet", en: "Connected environments tailored to the project" },
    audience: { fr: "Pour une région, un grand réseau ou une fédération nationale.", en: "For a region, large network or national federation." },
    example: { fr: "Exemple : une coordination régionale avec plusieurs territoires autonomes.", en: "Example: regional coordination across several autonomous territories." },
    annualPrice: { fr: "Sur devis", en: "Custom quote" },
    setupPrice: { fr: "Sur devis", en: "Custom quote" },
    included: {
      fr: ["une gouvernance régionale ou nationale", "plusieurs espaces territoriaux autonomes et reliés", "les tableaux d’impact consolidés", "l’authentification SSO", "les connexions aux outils existants", "l’accompagnement et la formation des équipes", "un support dédié"],
      en: ["regional or national governance", "multiple autonomous, connected territorial spaces", "consolidated impact dashboards", "SSO authentication", "connections to existing tools", "team support and training", "dedicated support"],
    },
  },
];

export function PricingPage() {
  const { lang } = useLang();

  return <Section
    eyebrow={lang === "fr" ? "Offres & tarifs" : "Offers & pricing"}
    title={lang === "fr" ? "Rejoindre le réseau commun. Ou disposer de votre environnement." : "Join the shared network. Or add your own environment."}
  >
    <aside className="civic-note pricing-note">{lang === "fr" ? "MANAfrance fonctionne grâce à TEMPOsystem. Rejoignez le réseau commun, ou choisissez TEMPOsystem pour disposer en plus de votre propre environnement." : "MANAfrance runs on TEMPOsystem. Join the shared network, or choose TEMPOsystem to also get your own environment."}</aside>
    <div className="pricing-principles">
      <div><strong>{lang === "fr" ? "La formule" : "The plan"}</strong><span>{lang === "fr" ? "Elle fixe la capacité et le nombre de TEMPOsystemS inclus." : "It sets capacity and the number of included TEMPOsystemS."}</span></div>
      <div><strong>{lang === "fr" ? "La mise en place" : "Setup"}</strong><span>{lang === "fr" ? "Elle construit votre environnement et décline votre identité graphique." : "It builds your environment and adapts your visual identity."}</span></div>
      <div><strong>{lang === "fr" ? "Les besoins particuliers" : "Specific needs"}</strong><span>{lang === "fr" ? "Ils font l’objet d’un chiffrage explicite avant tout engagement." : "They receive transparent pricing before any commitment."}</span></div>
    </div>

    <section className="territorial-pricing" id="territoires" aria-labelledby="territorial-pricing-title">
      <div className="territorial-pricing__heading">
        <div>
          <p className="editorial-kicker">{lang === "fr" ? "Collectivités & territoires" : "Local authorities & territories"}</p>
          <h2 id="territorial-pricing-title">{lang === "fr" ? "Deux niveaux. Un même écosystème." : "Two levels. One ecosystem."}</h2>
        </div>
        <p>{lang === "fr" ? "MANAfrance donne accès au réseau civique mutualisé. TEMPOsystem comprend cet accès et ajoute un environnement numérique dédié à votre organisation." : "MANAfrance provides access to the shared civic network. TEMPOsystem includes that access and adds a digital environment dedicated to your organisation."}</p>
      </div>
      <div className="territorial-pricing__table-wrap">
        <table className="territorial-pricing__table">
          <thead><tr>
            <th>{lang === "fr" ? "Taille du territoire" : "Territory size"}</th>
            <th>MANAfrance<span>{lang === "fr" ? "Réseau civique mutualisé" : "Shared civic network"}</span></th>
            <th>TEMPOsystem<span>{lang === "fr" ? "MANAfrance inclus" : "MANAfrance included"}</span></th>
          </tr></thead>
          <tbody>{territorialRates.map((rate) => <tr key={rate.size.fr}>
            <th scope="row">{rate.size[lang]}</th>
            <td>{rate.mana[lang]}</td>
            <td><strong>{rate.tempo[lang]}</strong></td>
          </tr>)}</tbody>
          <tfoot><tr>
            <td aria-hidden="true"></td>
            <td><a className="civic-button civic-button--secondary" href="https://manafrance.org">{lang === "fr" ? "Rejoindre MANAfrance" : "Join MANAfrance"}</a></td>
            <td><a className="civic-button civic-button--primary" href="#/devis?offre=territories">{lang === "fr" ? "Demander un devis" : "Request a quote"}</a></td>
          </tr></tfoot>
        </table>
      </div>
      <p className="territorial-pricing__note">{lang === "fr" ? "Tarifs annuels indicatifs, à calibrer territoire par territoire. Les éventuels kiosques MANA constituent un investissement séparé. Les citoyens, bénévoles et bénéficiaires ne sont jamais facturés individuellement." : "Indicative annual pricing, calibrated for each territory. Any MANA kiosks are a separate investment. Citizens, volunteers and beneficiaries are never billed individually."}</p>
    </section>

    <div className="pricing-subheading">
      <p className="editorial-kicker">{lang === "fr" ? "Associations & organisations" : "Non-profits & organisations"}</p>
      <h2>{lang === "fr" ? "Des formules adaptées à la taille de votre équipe." : "Plans adapted to the size of your team."}</h2>
      <p>{lang === "fr" ? "Ces formules s’appliquent aux structures et réseaux qui ne déploient pas une licence territoriale calculée sur la population." : "These plans apply to organisations and networks that are not deploying a population-based territorial licence."}</p>
    </div>
    <aside className="civic-note pricing-note"><strong>{lang === "fr" ? "Extranet pro.MANAfrance.org inclus" : "pro.MANAfrance.org extranet included"}</strong>{lang === "fr" ? " dans chaque offre." : " in every plan."}</aside>
    <div className="civic-card-grid civic-card-grid--three pricing-grid">
      {formulas.map((formula) => <article className="civic-card pricing-card" id={formula.slug} key={formula.slug}>
        <span className="civic-index">{formula.capacity[lang]}</span>
        <h2>{formula.name}</h2>
        <strong>{formula.systems[lang]}</strong>
        <p>{formula.audience[lang]}</p>
        <p><em>{formula.example[lang]}</em></p>
        <h3>{lang === "fr" ? `Inclus dans la formule ${formula.name}` : `Included in the ${formula.name} plan`}</h3>
        <ul>{formula.included[lang].map((item) => <li key={item}>{item}</li>)}</ul>
        <div className="pricing-card__price"><span>{lang === "fr" ? "Abonnement" : "Subscription"}</span><strong>{formula.annualPrice[lang]}</strong></div>
        <p><strong>{lang === "fr" ? "Mise en place : " : "Setup: "}</strong>{formula.setupPrice[lang]}</p>
        <a className="civic-button civic-button--primary pricing-card__cta" href={formula.slug === "decouverte" ? "#/devis?formule=decouverte" : `#/devis?formule=${formula.slug}`}>{lang === "fr" ? `Rejoindre TEMPOsystem ${formula.name}` : `Join TEMPOsystem ${formula.name}`}</a>
      </article>)}
    </div>

    <section className="offer-section">
      <div className="offer-wrap">
        <p className="editorial-kicker">{lang === "fr" ? "Configurations disponibles" : "Available configurations"}</p>
        <h2>{lang === "fr" ? "Composez votre environnement selon vos usages." : "Compose your environment around your needs."}</h2>
        <p>{lang === "fr" ? "CARE, CIVIC, ASSO, TERRITORIES, IMPACT et RSE ne sont pas six abonnements séparés : ce sont les TEMPOsystemS que vous réunissez dans votre formule." : "CARE, CIVIC, ASSO, TERRITORIES, IMPACT and RSE are not six separate subscriptions: they are the TEMPOsystemS brought together in your plan."}</p>
        <figure className="configurations-archipelago">
          <img
            src="/illustrations/configurations-archipel.png"
            alt={lang === "fr" ? "Six îles reliées représentent les configurations CARE, CIVIC, ASSO, TERRITORIES, IMPACT et RSE réunies dans un même environnement TEMPOsystem." : "Six connected islands represent the CARE, CIVIC, ASSO, TERRITORIES, IMPACT and RSE configurations brought together in one TEMPOsystem environment."}
            loading="lazy"
            decoding="async"
          />
          <figcaption>{lang === "fr" ? "Six usages spécialisés. Un même environnement relié." : "Six specialised uses. One connected environment."}</figcaption>
        </figure>
        <nav className="configurations-links" aria-label={lang === "fr" ? "Découvrir les configurations" : "Explore configurations"}>
          {tempoOffers.map((offer) => <a href={`#/offres/${offer.slug}`} key={offer.slug}>TEMPOsystem {offer.name}<span aria-hidden="true"> →</span></a>)}
        </nav>
      </div>
    </section>

    <aside className="civic-note"><strong>{lang === "fr" ? "Inclus dans toutes les formules payantes : " : "Included in every paid plan: "}</strong>{lang === "fr" ? "hébergement sécurisé en Europe, HTTPS, maintenance, mises à jour, sauvegardes, gestion des rôles et accès, export des données, documentation RGPD de base et mention discrète « Propulsé par TEMPOsystem »." : "secure European hosting, HTTPS, maintenance, updates, backups, role and access management, data export, baseline GDPR documentation and a discreet “Powered by TEMPOsystem” mention."}</aside>
  </Section>;
}
