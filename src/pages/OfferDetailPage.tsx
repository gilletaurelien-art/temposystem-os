import { tempoOffers } from "../config/offers";
import { useLang, type Language } from "../lib/lang";
import "./offerDetail.css";

type Copy = Record<Language, string>;
type OfferDetail = { problem: readonly Copy[]; scenario: Copy; steps: readonly { title: Copy; body: Copy }[]; functions: readonly Copy[]; safeguards: readonly Copy[] };

const details: Record<string, OfferDetail> = {
  care: {
    problem: [
      { fr: "Les informations utiles sont dispersées entre les équipes, les proches et les partenaires.", en: "Useful information is scattered across teams, relatives and partners." },
      { fr: "Les actions informelles sont essentielles, mais restent souvent invisibles et difficiles à coordonner.", en: "Informal actions are essential, yet often invisible and difficult to coordinate." },
      { fr: "Les changements d'équipe fragilisent la continuité et obligent à reconstruire le contexte.", en: "Team changes weaken continuity and force people to rebuild context." },
    ],
    scenario: { fr: "Une personne accompagnée revient à domicile. Le service, les proches, une association locale et des bénévoles doivent organiser des visites, des déplacements et des temps de répit. TEMPOSYSTEM CARE donne à chacun une vue adaptée de ce qui doit être fait, sans remplacer le dossier métier ni la responsabilité des professionnels.", en: "A supported person returns home. The service, relatives, a local non-profit and volunteers must organise visits, transport and respite. TEMPOSYSTEM CARE gives everyone an appropriate view of what needs doing, without replacing professional records or responsibilities." },
    steps: [
      { title: { fr: "Qualifier le besoin", en: "Clarify the need" }, body: { fr: "L'équipe identifie la situation, le périmètre et les personnes habilitées à participer.", en: "The team identifies the situation, scope and people authorised to participate." } },
      { title: { fr: "Relier les acteurs", en: "Connect the actors" }, body: { fr: "Professionnels, proches et partenaires accèdent uniquement aux informations nécessaires à leur rôle.", en: "Professionals, relatives and partners access only the information required for their role." } },
      { title: { fr: "Coordonner les actions", en: "Coordinate actions" }, body: { fr: "Les besoins deviennent des actions attribuées, datées et suivies jusqu'à leur réalisation.", en: "Needs become assigned, dated actions followed through to completion." } },
      { title: { fr: "Conserver le fil", en: "Preserve continuity" }, body: { fr: "Les décisions, contributions et apprentissages utiles rejoignent une mémoire commune.", en: "Useful decisions, contributions and learning enter a shared memory." } },
    ],
    functions: [{ fr: "Coordination de situations et d'actions", en: "Situation and action coordination" }, { fr: "Cercles d'accès selon les responsabilités", en: "Role-based access circles" }, { fr: "Contributions en temps reconnues", en: "Recognised time contributions" }, { fr: "Journal des décisions et transmissions", en: "Decision and handover log" }],
    safeguards: [{ fr: "Validation humaine pour toute décision engageante", en: "Human validation for every binding decision" }, { fr: "Accès limité au rôle et au besoin d'en connaître", en: "Access limited by role and need-to-know" }, { fr: "Déploiement complémentaire aux outils métier", en: "Deployment complementary to professional tools" }],
  },
  civic: {
    problem: [
      { fr: "Un même besoin territorial mobilise plusieurs services et associations qui travaillent dans des outils séparés.", en: "One local need involves several services and non-profits working in separate tools." },
      { fr: "Les habitants ne savent pas toujours où proposer leur aide ni comment suivre une action utile.", en: "Residents do not always know where to offer help or follow a useful action." },
      { fr: "Les décisions et apprentissages se perdent entre les réunions, les mandats et les dispositifs.", en: "Decisions and learning get lost across meetings, mandates and programmes." },
    ],
    scenario: { fr: "Lors d'un épisode de forte chaleur, un CCAS, les services municipaux et plusieurs associations coordonnent le repérage des personnes isolées, les appels, les visites et les lieux d'accueil. TEMPOSYSTEM CIVIC relie les besoins signalés aux acteurs habilités et conserve une vue commune de l'action.", en: "During a heatwave, a social service, municipal teams and several non-profits coordinate identifying isolated people, calls, visits and welcome spaces. TEMPOSYSTEM CIVIC connects reported needs to authorised actors and preserves a shared view of the response." },
    steps: [
      { title: { fr: "Ouvrir un périmètre", en: "Define a scope" }, body: { fr: "La collectivité fixe le territoire, les partenaires, les règles et le premier usage.", en: "The authority defines the territory, partners, rules and first use." } },
      { title: { fr: "Faire remonter les besoins", en: "Surface needs" }, body: { fr: "Les services et structures habilités signalent les situations à coordonner dans un cadre commun.", en: "Authorised services and organisations report situations to coordinate in a shared framework." } },
      { title: { fr: "Mobiliser les réponses", en: "Mobilise responses" }, body: { fr: "Les actions sont proposées aux bonnes équipes, associations ou citoyens mobilisés.", en: "Actions are directed to the right teams, non-profits or engaged citizens." } },
      { title: { fr: "Partager le bilan", en: "Share the outcome" }, body: { fr: "La collectivité garde la trace des réponses, arbitrages et améliorations à apporter.", en: "The authority preserves responses, decisions and areas for improvement." } },
    ],
    functions: [{ fr: "Guichet partagé des besoins territoriaux", en: "Shared entry point for territorial needs" }, { fr: "Coordination interservices et interstructures", en: "Cross-service and cross-organisation coordination" }, { fr: "Mobilisation citoyenne encadrée", en: "Structured citizen mobilisation" }, { fr: "Mémoire des actions et arbitrages", en: "Memory of actions and decisions" }],
    safeguards: [{ fr: "Règles définies par la collectivité et ses partenaires", en: "Rules defined by the authority and its partners" }, { fr: "Citoyens et bénéficiaires jamais considérés comme des produits", en: "Citizens and beneficiaries never treated as products" }, { fr: "Démarrage sur un usage limité et réversible", en: "Start with a limited, reversible use" }],
  },
};

export function OfferDetailPage() {
  const { lang } = useLang();
  const slug = window.location.hash.replace("#/offres/", "").split("?")[0];
  const offer = tempoOffers.find((item) => item.slug === slug);
  const detail = details[slug];
  if (!offer || !detail) return <main className="offer-missing"><h1>{lang === "fr" ? "Cette offre arrive bientôt." : "This offer is coming soon."}</h1><a href="#/tarifs">{lang === "fr" ? "Voir toutes les offres" : "See all offers"}</a></main>;

  return <main className="offer-detail">
    <header className="offer-hero"><div><p className="editorial-kicker">TEMPOSYSTEM</p><h1>{offer.name}</h1><strong>{offer.audience[lang]}</strong><p>{offer.promise[lang]}</p><div className="offer-hero__actions"><a className="editorial-button editorial-button--primary" href={`#/creer?offre=${offer.slug}`}>{lang === "fr" ? `Créer mon TEMPOSYSTEM ${offer.name}` : `Create my TEMPOSYSTEM ${offer.name}`}</a><a className="editorial-button editorial-button--secondary" href="#situation">{lang === "fr" ? "Voir une situation" : "See a situation"}</a></div></div><div className="offer-hero__rings" aria-hidden="true"><i /><i /><i /><b /></div></header>
    <section className="offer-section"><div className="offer-wrap"><p className="editorial-kicker">{lang === "fr" ? "Le problème" : "The problem"}</p><h2>{lang === "fr" ? "La coopération existe déjà. Il lui manque un fil commun." : "Cooperation already exists. It needs a shared thread."}</h2><div className="offer-problems">{detail.problem.map((text, index) => <article key={text.fr}><span>0{index+1}</span><p>{text[lang]}</p></article>)}</div></div></section>
    <section className="offer-section offer-section--tint" id="situation"><div className="offer-wrap offer-scenario"><div><p className="editorial-kicker">{lang === "fr" ? "Situation représentative" : "Representative situation"}</p><h2>{lang === "fr" ? "Un usage concret, sans scénario miracle." : "A concrete use, without a miracle scenario."}</h2></div><p>{detail.scenario[lang]}</p></div></section>
    <section className="offer-section"><div className="offer-wrap"><p className="editorial-kicker">{lang === "fr" ? "Fonctionnement" : "How it works"}</p><h2>{lang === "fr" ? "Du besoin signalé à la mémoire partagée" : "From reported need to shared memory"}</h2><ol className="offer-steps">{detail.steps.map((item,index) => <li key={item.title.fr}><span>0{index+1}</span><div><h3>{item.title[lang]}</h3><p>{item.body[lang]}</p></div></li>)}</ol></div></section>
    <section className="offer-section offer-section--night"><div className="offer-wrap offer-columns"><div><p className="editorial-kicker">{lang === "fr" ? "Capacités mobilisées" : "Enabled capabilities"}</p><h2>{lang === "fr" ? "Ce que l'espace permet" : "What the space enables"}</h2><ul>{detail.functions.map((item)=><li key={item.fr}>{item[lang]}</li>)}</ul></div><div><p className="editorial-kicker">{lang === "fr" ? "Cadre de confiance" : "Trust framework"}</p><h2>{lang === "fr" ? "Ce qu'il ne doit pas contourner" : "What it must not bypass"}</h2><ul>{detail.safeguards.map((item)=><li key={item.fr}>{item[lang]}</li>)}</ul></div></div></section>
    <section className="offer-section offer-cta"><div className="offer-wrap"><p className="editorial-kicker">{lang === "fr" ? "Premier déploiement" : "First deployment"}</p><h2>{lang === "fr" ? "Commencez avec un besoin, une équipe et un périmètre maîtrisé." : "Start with one need, one team and a controlled scope."}</h2><p>{lang === "fr" ? "Le cadrage précise les acteurs, les règles d'accès, les actions à coordonner et les critères d'un premier bilan." : "Scoping clarifies actors, access rules, actions to coordinate and criteria for a first review."}</p><a className="editorial-button editorial-button--primary" href={`#/creer?offre=${offer.slug}`}>{lang === "fr" ? "Préparer mon premier usage" : "Prepare my first use"}</a></div></section>
  </main>;
}
