import { Section } from "../components/Section";
import { tempoOffers } from "../config/offers";
import { useLang, type Language } from "../lib/lang";

type Copy = Record<Language, string>;

type Plan = {
  name: Copy;
  count: Copy;
  audience: Copy;
  price: Copy;
  monthly: Copy;
  features: readonly Copy[];
  featured?: boolean;
};

const plans: readonly Plan[] = [
  {
    name: { fr: "Éclosion", en: "Seed" },
    count: { fr: "1 TEMPOSYSTEM", en: "1 TEMPOSYSTEM" },
    audience: { fr: "Premier usage, association ou établissement", en: "First use, non-profit or institution" },
    price: { fr: "1 200 € / an", en: "€1,200 / year" },
    monthly: { fr: "soit 100 € / mois", en: "equivalent to €100 / month" },
    features: [
      { fr: "Un espace autonome configuré pour votre usage", en: "One autonomous space configured for your use case" },
      { fr: "Une organisation administratrice", en: "One administering organisation" },
      { fr: "Hébergement, maintenance et support standard", en: "Hosting, maintenance and standard support" },
    ],
  },
  {
    name: { fr: "Coopération", en: "Cooperation" },
    count: { fr: "3 TEMPOSYSTEMS", en: "3 TEMPOSYSTEMS" },
    audience: { fr: "CCAS, commune ou réseau associatif", en: "Local authority or non-profit network" },
    price: { fr: "3 600 € / an", en: "€3,600 / year" },
    monthly: { fr: "soit 300 € / mois", en: "equivalent to €300 / month" },
    featured: true,
    features: [
      { fr: "Trois usages, équipes ou périmètres reliés", en: "Three connected uses, teams or scopes" },
      { fr: "Plusieurs organisations partenaires", en: "Multiple partner organisations" },
      { fr: "Vue commune et mémoires distinctes", en: "Shared overview and separate memories" },
    ],
  },
  {
    name: { fr: "Territoire", en: "Territory" },
    count: { fr: "8 TEMPOSYSTEMS", en: "8 TEMPOSYSTEMS" },
    audience: { fr: "Intercommunalité, fédération ou programme territorial", en: "Federation or territorial programme" },
    price: { fr: "7 800 € / an", en: "€7,800 / year" },
    monthly: { fr: "soit 650 € / mois", en: "equivalent to €650 / month" },
    features: [
      { fr: "Huit espaces coordonnés dans un cadre commun", en: "Eight spaces coordinated in one framework" },
      { fr: "Gouvernance et accès multi-organisations", en: "Multi-organisation governance and access" },
      { fr: "Accompagnement et bilan annuel", en: "Support and annual review" },
    ],
  },
  {
    name: { fr: "Alliance", en: "Alliance" },
    count: { fr: "20 TEMPOSYSTEMS et plus", en: "20+ TEMPOSYSTEMS" },
    audience: { fr: "Département, fondation ou réseau national", en: "Regional authority, foundation or national network" },
    price: { fr: "Dès 15 000 € / an", en: "From €15,000 / year" },
    monthly: { fr: "périmètre défini ensemble", en: "scope defined together" },
    features: [
      { fr: "Architecture multi-territoires ou multi-programmes", en: "Multi-territory or multi-programme architecture" },
      { fr: "Accompagnement renforcé et intégrations", en: "Enhanced support and integrations" },
      { fr: "Conditions dégressives selon le déploiement", en: "Volume pricing based on deployment" },
    ],
  },
];

const setup = [
  {
    name: { fr: "Démarrage guidé", en: "Guided start" },
    scope: { fr: "Cadrage, configuration et formation d'une première équipe", en: "Scoping, configuration and training for one first team" },
    price: { fr: "900 €", en: "€900" },
  },
  {
    name: { fr: "Déploiement collectif", en: "Collective deployment" },
    scope: { fr: "Plusieurs espaces, gouvernance et formation des référents", en: "Multiple spaces, governance and lead training" },
    price: { fr: "2 500 €", en: "€2,500" },
  },
  {
    name: { fr: "Déploiement territorial", en: "Territorial deployment" },
    scope: { fr: "Architecture multi-acteurs, accompagnement et premier bilan", en: "Multi-stakeholder architecture, support and first review" },
    price: { fr: "Dès 6 000 €", en: "From €6,000" },
  },
] as const;

export function PricingPage() {
  const { lang } = useLang();

  return <Section
    eyebrow={lang === "fr" ? "Formules & tarifs" : "Plans & pricing"}
    title={lang === "fr" ? "Un socle commun. Plusieurs TEMPOSYSTEMS pour agir." : "One shared foundation. Multiple TEMPOSYSTEMS to act."}
    intro={lang === "fr"
      ? "Chaque espace répond à un usage, une équipe ou un territoire. Commencez avec un besoin réel, puis ajoutez de nouveaux TEMPOSYSTEMS à mesure que la coopération grandit."
      : "Each space serves one use case, team or territory. Start with one real need, then add new TEMPOSYSTEMS as cooperation grows."}
  >
    <div className="pricing-principles">
      <div><strong>{lang === "fr" ? "Sans prix par utilisateur" : "No per-user pricing"}</strong><span>{lang === "fr" ? "Les citoyens, bénévoles et bénéficiaires ne sont jamais facturés comme des produits." : "Citizens, volunteers and beneficiaries are never billed as products."}</span></div>
      <div><strong>{lang === "fr" ? "Toutes les configurations" : "Every configuration"}</strong><span>{lang === "fr" ? "CARE, CIVIC, ASSO, TERRITORIES, IMPACT et RSE sont activables selon vos usages." : "CARE, CIVIC, ASSO, TERRITORIES, IMPACT and RSE can be enabled as needed."}</span></div>
      <div><strong>{lang === "fr" ? "Un périmètre lisible" : "A clear scope"}</strong><span>{lang === "fr" ? "L'abonnement, la mise en place et les options sont toujours distingués." : "Subscription, setup and options are always shown separately."}</span></div>
    </div>

    <div className="civic-card-grid civic-card-grid--three pricing-grid">
      {plans.map((plan) => <article className={`civic-card pricing-card${plan.featured ? " pricing-card--featured" : ""}`} key={plan.name.fr}>
        <span className="civic-index">{plan.featured && lang === "fr" ? "FORMULE RECOMMANDÉE" : plan.featured ? "RECOMMENDED PLAN" : plan.count[lang]}</span>
        <h2>{plan.name[lang]}</h2>
        <strong>{plan.count[lang]}</strong>
        <p>{plan.audience[lang]}</p>
        <ul>{plan.features.map((feature) => <li key={feature.fr}>{feature[lang]}</li>)}</ul>
        <div className="pricing-card__price"><span>{lang === "fr" ? "Abonnement" : "Subscription"}</span><strong>{plan.price[lang]}</strong><small>{plan.monthly[lang]}</small></div>
        <a className="civic-button civic-button--primary" href="#/creer">{lang === "fr" ? "Préparer mon premier usage" : "Prepare my first use"}</a>
      </article>)}
    </div>

    <aside className="civic-note">
      <strong>{lang === "fr" ? "Besoin d'un espace supplémentaire ? " : "Need an additional space? "}</strong>
      {lang === "fr"
        ? "Ajoutez un TEMPOSYSTEM sans changer immédiatement de formule : 900 €/an avec Éclosion, 750 €/an avec Coopération et 600 €/an avec Territoire."
        : "Add a TEMPOSYSTEM without immediately changing plan: €900/year with Seed, €750/year with Cooperation and €600/year with Territory."}
    </aside>

    <header className="section-heading">
      <span>{lang === "fr" ? "MISE EN PLACE" : "SETUP"}</span>
      <h2>{lang === "fr" ? "Un cadre bien préparé avant le premier abonnement." : "A well-prepared framework before the first subscription."}</h2>
      <p>{lang === "fr" ? "Le travail initial est facturé une seule fois. Son niveau dépend du nombre d'acteurs et de la gouvernance à construire." : "Initial work is billed once. Its level depends on the number of stakeholders and the governance to establish."}</p>
    </header>
    <div className="civic-card-grid civic-card-grid--three pricing-grid">
      {setup.map((item) => <article className="civic-card pricing-card" key={item.name.fr}>
        <span className="civic-index">{lang === "fr" ? "UNE FOIS" : "ONE-OFF"}</span>
        <h2>{item.name[lang]}</h2>
        <p>{item.scope[lang]}</p>
        <div className="pricing-card__price"><span>{lang === "fr" ? "Mise en place" : "Setup"}</span><strong>{item.price[lang]}</strong></div>
      </article>)}
    </div>

    <header className="section-heading">
      <span>{lang === "fr" ? "CONFIGURATIONS" : "CONFIGURATIONS"}</span>
      <h2>{lang === "fr" ? "Choisissez les usages, pas plusieurs abonnements." : "Choose use cases, not multiple subscriptions."}</h2>
      <p>{lang === "fr" ? "Chaque formule permet de combiner les configurations nécessaires à votre terrain." : "Every plan lets you combine the configurations required in your field."}</p>
    </header>
    <div className="civic-card-grid civic-card-grid--three">
      {tempoOffers.map((offer) => <article className="civic-card" id={offer.slug} key={offer.slug}>
        <span className="civic-index">TEMPOSYSTEM</span>
        <h2>{offer.name}</h2>
        <strong>{offer.audience[lang]}</strong>
        <p>{offer.promise[lang]}</p>
        <a className="civic-button" href={`#/offres/${offer.slug}`}>{lang === "fr" ? "Découvrir la configuration" : "Explore the configuration"}</a>
      </article>)}
    </div>

    <aside className="civic-note">
      <strong>{lang === "fr" ? "Notre principe : " : "Our principle: "}</strong>
      {lang === "fr"
        ? "nous facturons l'infrastructure, sa configuration et l'accompagnement. Jamais le nombre de citoyens, de bénévoles ou de bénéficiaires."
        : "we charge for infrastructure, configuration and support. Never for the number of citizens, volunteers or beneficiaries."}
    </aside>
  </Section>;
}
