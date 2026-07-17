import { Section } from "../components/Section";
import { tempoOffers } from "../config/offers";
import { useLang, type Language } from "../lib/lang";

type Copy = Record<Language, string>;

type Plan = {
  name: Copy;
  count: Copy;
  audience: Copy;
  capacity: Copy;
  example: Copy;
  price: Copy;
  monthly: Copy;
  features: readonly Copy[];
  featured?: boolean;
};

const plans: readonly Plan[] = [
  {
    name: { fr: "Découverte", en: "Discovery" },
    count: { fr: "1 TEMPOSYSTEM ASSO", en: "1 ASSO TEMPOSYSTEM" },
    audience: { fr: "Très petite association", en: "Very small non-profit" },
    capacity: { fr: "De 1 à 9 utilisateurs actifs", en: "1 to 9 active users" },
    example: { fr: "Une petite association de 9 membres ouvre gratuitement un TEMPOSYSTEM ASSO pour répartir ses missions et garder la mémoire de ses actions.", en: "A small 9-member non-profit opens one free ASSO TEMPOSYSTEM to share missions and preserve the memory of its actions." },
    price: { fr: "Gratuit", en: "Free" },
    monthly: { fr: "sans carte bancaire", en: "no payment card required" },
    features: [
      { fr: "Un espace ASSO essentiel", en: "One essential ASSO space" },
      { fr: "Configuration autonome", en: "Self-service configuration" },
      { fr: "Hébergement et mises à jour inclus", en: "Hosting and updates included" },
    ],
  },
  {
    name: { fr: "Éclosion", en: "Seed" },
    count: { fr: "1 TEMPOSYSTEM", en: "1 TEMPOSYSTEM" },
    audience: { fr: "Premier usage, association ou établissement", en: "First use, non-profit or institution" },
    capacity: { fr: "De 10 à 99 utilisateurs actifs", en: "10 to 99 active users" },
    example: { fr: "Une association de 65 membres ouvre un TEMPOSYSTEM ASSO pour organiser ses missions, ses bénévoles et la mémoire de ses actions.", en: "A 65-member non-profit opens one ASSO TEMPOSYSTEM to organise missions, volunteers and the memory of its actions." },
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
    capacity: { fr: "De 100 à 499 utilisateurs actifs", en: "100 to 499 active users" },
    example: { fr: "Un CCAS et ses partenaires relient un TEMPOSYSTEM CIVIC pour l’isolement, un CARE pour les aidants et un ASSO pour les bénévoles.", en: "A social service and its partners connect one CIVIC TEMPOSYSTEM for isolation, one CARE space for caregivers and one ASSO space for volunteers." },
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
    capacity: { fr: "De 500 à 999 utilisateurs actifs", en: "500 to 999 active users" },
    example: { fr: "Une intercommunalité déploie huit espaces pour coordonner les solidarités, la mobilité, les aidants et les réseaux associatifs de plusieurs communes.", en: "An intermunicipal authority deploys eight spaces to coordinate solidarity, mobility, caregivers and non-profit networks across several towns." },
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
    audience: { fr: "Région, département, fondation ou réseau national", en: "Regional authority, foundation or national network" },
    capacity: { fr: "À partir de 1 000 utilisateurs actifs", en: "From 1,000 active users" },
    example: { fr: "Une Région relie les programmes de plusieurs départements et plus de vingt espaces locaux, tout en laissant à chaque territoire sa gouvernance et sa mémoire.", en: "A Region connects programmes across several departments and more than twenty local spaces while preserving each territory’s governance and memory." },
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
      <div><strong>{lang === "fr" ? "Un forfait par palier" : "Flat capacity bands"}</strong><span>{lang === "fr" ? "De 1 à 9, de 10 à 99, de 100 à 499, de 500 à 999, puis 1 000 et plus : le prix reste fixe dans chaque palier." : "From 1–9, 10–99, 100–499, 500–999, then 1,000 and above: the price remains fixed within each band."}</span></div>
      <div><strong>{lang === "fr" ? "Toutes les configurations" : "Every configuration"}</strong><span>{lang === "fr" ? "CARE, CIVIC, ASSO, TERRITORIES, IMPACT et RSE sont activables selon vos usages." : "CARE, CIVIC, ASSO, TERRITORIES, IMPACT and RSE can be enabled as needed."}</span></div>
      <div><strong>{lang === "fr" ? "Un périmètre lisible" : "A clear scope"}</strong><span>{lang === "fr" ? "L'abonnement, la mise en place et les options sont toujours distingués." : "Subscription, setup and options are always shown separately."}</span></div>
    </div>

    <div className="civic-card-grid civic-card-grid--three pricing-grid">
      {plans.map((plan) => <article className={`civic-card pricing-card${plan.featured ? " pricing-card--featured" : ""}`} key={plan.name.fr}>
        <span className="civic-index">{plan.featured && lang === "fr" ? "FORMULE RECOMMANDÉE" : plan.featured ? "RECOMMENDED PLAN" : plan.count[lang]}</span>
        <h2>{plan.name[lang]}</h2>
        <strong>{plan.count[lang]}</strong>
        <p>{plan.capacity[lang]} · {plan.audience[lang]}</p>
        <ul>{plan.features.map((feature) => <li key={feature.fr}>{feature[lang]}</li>)}</ul>
        <aside className="civic-note"><strong>{lang === "fr" ? "Mise en situation — " : "Example — "}</strong>{plan.example[lang]}</aside>
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
