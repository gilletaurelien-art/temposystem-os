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
    scenario: { fr: "Une personne accompagnée revient à domicile. Le service, les proches, une association locale et des bénévoles doivent organiser des visites, des déplacements et des temps de répit. TEMPOsystem CARE donne à chacun une vue adaptée de ce qui doit être fait, sans remplacer le dossier métier ni la responsabilité des professionnels.", en: "A supported person returns home. The service, relatives, a local non-profit and volunteers must organise visits, transport and respite. TEMPOsystem CARE gives everyone an appropriate view of what needs doing, without replacing professional records or responsibilities." },
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
    scenario: { fr: "Lors d'un épisode de forte chaleur, un CCAS, les services municipaux et plusieurs associations coordonnent le repérage des personnes isolées, les appels, les visites et les lieux d'accueil. TEMPOsystem CIVIC relie les besoins signalés aux acteurs habilités et conserve une vue commune de l'action.", en: "During a heatwave, a social service, municipal teams and several non-profits coordinate identifying isolated people, calls, visits and welcome spaces. TEMPOsystem CIVIC connects reported needs to authorised actors and preserves a shared view of the response." },
    steps: [
      { title: { fr: "Ouvrir un périmètre", en: "Define a scope" }, body: { fr: "La collectivité fixe le territoire, les partenaires, les règles et le premier usage.", en: "The authority defines the territory, partners, rules and first use." } },
      { title: { fr: "Faire remonter les besoins", en: "Surface needs" }, body: { fr: "Les services et structures habilités signalent les situations à coordonner dans un cadre commun.", en: "Authorised services and organisations report situations to coordinate in a shared framework." } },
      { title: { fr: "Mobiliser les réponses", en: "Mobilise responses" }, body: { fr: "Les actions sont proposées aux bonnes équipes, associations ou citoyens mobilisés.", en: "Actions are directed to the right teams, non-profits or engaged citizens." } },
      { title: { fr: "Partager le bilan", en: "Share the outcome" }, body: { fr: "La collectivité garde la trace des réponses, arbitrages et améliorations à apporter.", en: "The authority preserves responses, decisions and areas for improvement." } },
    ],
    functions: [{ fr: "Guichet partagé des besoins territoriaux", en: "Shared entry point for territorial needs" }, { fr: "Coordination interservices et interstructures", en: "Cross-service and cross-organisation coordination" }, { fr: "Mobilisation citoyenne encadrée", en: "Structured citizen mobilisation" }, { fr: "Mémoire des actions et arbitrages", en: "Memory of actions and decisions" }],
    safeguards: [{ fr: "Règles définies par la collectivité et ses partenaires", en: "Rules defined by the authority and its partners" }, { fr: "Citoyens et bénéficiaires jamais considérés comme des produits", en: "Citizens and beneficiaries never treated as products" }, { fr: "Démarrage sur un usage limité et réversible", en: "Start with a limited, reversible use" }],
  },
  asso: {
    problem: [
      { fr: "Les missions, disponibilités et compétences sont réparties entre messages, tableaux et habitudes locales.", en: "Missions, availability and skills are scattered across messages, spreadsheets and local habits." },
      { fr: "Les bénévoles ne voient pas toujours comment leur contribution s'inscrit dans l'action d'ensemble.", en: "Volunteers do not always see how their contribution fits into the wider action." },
      { fr: "Une fédération doit partager un cadre sans effacer l'autonomie de ses associations membres.", en: "A federation needs a shared framework without erasing the autonomy of member organisations." },
    ],
    scenario: { fr: "Une fédération organise une campagne nationale déclinée par vingt associations locales. Chaque structure garde ses équipes et ses priorités, tandis que TEMPOsystem ASSO rend visibles les missions, les besoins de renfort, les contributions et les apprentissages communs.", en: "A federation runs a national campaign through twenty local non-profits. Each organisation keeps its teams and priorities, while TEMPOsystem ASSO makes missions, support needs, contributions and shared learning visible." },
    steps: [
      { title: { fr: "Définir les missions", en: "Define missions" }, body: { fr: "Chaque structure publie des besoins précis, datés et rattachés à un responsable.", en: "Each organisation publishes precise, dated needs attached to an owner." } },
      { title: { fr: "Mobiliser les bonnes personnes", en: "Mobilise the right people" }, body: { fr: "Les bénévoles trouvent les actions compatibles avec leurs envies, compétences et disponibilités.", en: "Volunteers find actions matching their interests, skills and availability." } },
      { title: { fr: "Suivre sans surveiller", en: "Follow without monitoring" }, body: { fr: "L'équipe sait ce qui avance et où un soutien est nécessaire, sans transformer l'engagement en contrôle.", en: "The team sees progress and where support is needed without turning engagement into surveillance." } },
      { title: { fr: "Reconnaître et transmettre", en: "Recognise and share" }, body: { fr: "Le temps donné et les enseignements restent visibles pour les prochaines équipes.", en: "Given time and learning remain visible for future teams." } },
    ],
    functions: [{ fr: "Missions et besoins de renfort", en: "Missions and support needs" }, { fr: "Disponibilités et compétences", en: "Availability and skills" }, { fr: "Coordination entre antennes", en: "Coordination across chapters" }, { fr: "Mémoire des campagnes", en: "Campaign memory" }],
    safeguards: [{ fr: "Une contribution volontaire, jamais une dette", en: "A voluntary contribution, never a debt" }, { fr: "Autonomie préservée pour chaque association", en: "Autonomy preserved for every organisation" }, { fr: "Données limitées aux besoins de coordination", en: "Data limited to coordination needs" }],
  },
  territories: {
    problem: [
      { fr: "Les programmes multi-acteurs reposent sur des gouvernances, calendriers et outils différents.", en: "Multi-stakeholder programmes rely on different governance, calendars and tools." },
      { fr: "Personne ne dispose d'une vue commune suffisamment simple pour agir au quotidien.", en: "No one has a shared view simple enough for daily action." },
      { fr: "Les apprentissages d'un territoire circulent difficilement vers les autres.", en: "Learning from one territory travels poorly to others." },
    ],
    scenario: { fr: "Plusieurs intercommunalités, associations et opérateurs déploient un programme de mobilité solidaire. TEMPOsystem TERRITORIES fournit un cadre commun pour les besoins, les expérimentations, les décisions locales et les enseignements transférables, sans centraliser toutes les responsabilités.", en: "Several local authorities, non-profits and operators deploy a solidarity mobility programme. TEMPOsystem TERRITORIES provides a shared framework for needs, experiments, local decisions and transferable learning without centralising every responsibility." },
    steps: [
      { title: { fr: "Poser le cadre commun", en: "Set the shared framework" }, body: { fr: "Les partenaires définissent les objectifs, responsabilités, règles et marges d'autonomie.", en: "Partners define objectives, responsibilities, rules and autonomy." } },
      { title: { fr: "Décliner localement", en: "Adapt locally" }, body: { fr: "Chaque territoire configure ses acteurs, besoins et actions sans perdre le lien avec le programme.", en: "Each territory configures actors, needs and actions while staying connected to the programme." } },
      { title: { fr: "Synchroniser les décisions", en: "Synchronise decisions" }, body: { fr: "Les arbitrages utiles sont documentés et partagés au bon niveau.", en: "Useful decisions are documented and shared at the right level." } },
      { title: { fr: "Faire circuler l'expérience", en: "Circulate experience" }, body: { fr: "Les méthodes et résultats transférables deviennent accessibles aux autres territoires.", en: "Transferable methods and outcomes become available to other territories." } },
    ],
    functions: [{ fr: "Espaces territoriaux reliés", en: "Connected territorial spaces" }, { fr: "Programmes et actions multi-acteurs", en: "Multi-stakeholder programmes and actions" }, { fr: "Décisions à plusieurs niveaux", en: "Multi-level decisions" }, { fr: "Capitalisation interterritoriale", en: "Cross-territory learning" }],
    safeguards: [{ fr: "Subsidiarité et responsabilités explicites", en: "Subsidiarity and explicit responsibilities" }, { fr: "Autonomie locale inscrite dans le cadre", en: "Local autonomy built into the framework" }, { fr: "Accès différenciés selon les partenaires", en: "Partner-specific access" }],
  },
  impact: {
    problem: [
      { fr: "Le suivi demandé aux projets financés produit beaucoup de tableaux, mais peu de mémoire utile.", en: "Monitoring funded projects produces many spreadsheets but little useful memory." },
      { fr: "Les contributions humaines et les coopérations sont difficiles à représenter sans les réduire à un indicateur.", en: "Human contributions and cooperation are difficult to represent without reducing them to a metric." },
      { fr: "Les enseignements arrivent souvent trop tard pour améliorer le programme en cours.", en: "Learning often arrives too late to improve the current programme." },
    ],
    scenario: { fr: "Une fondation soutient douze projets contre l'isolement. TEMPOsystem IMPACT relie les objectifs, les actions menées, les contributions et les apprentissages de chaque porteur. La fondation obtient une vue transversale sans imposer un reporting identique à des réalités différentes.", en: "A foundation supports twelve projects addressing isolation. TEMPOsystem IMPACT connects objectives, actions, contributions and learning for each grantee. The foundation gains a cross-programme view without imposing identical reporting on different realities." },
    steps: [
      { title: { fr: "Définir ce qui compte", en: "Define what matters" }, body: { fr: "Financeur et porteurs choisissent ensemble les informations réellement utiles au pilotage.", en: "Funder and grantees jointly choose information genuinely useful for steering." } },
      { title: { fr: "Documenter au fil de l'action", en: "Document during action" }, body: { fr: "Les équipes relient faits, décisions et apprentissages à leur travail courant.", en: "Teams connect facts, decisions and learning to their everyday work." } },
      { title: { fr: "Lire les signaux communs", en: "Read shared signals" }, body: { fr: "Les convergences, obstacles et besoins d'appui apparaissent sans classement artificiel.", en: "Patterns, obstacles and support needs emerge without artificial rankings." } },
      { title: { fr: "Améliorer le programme", en: "Improve the programme" }, body: { fr: "Les enseignements alimentent les décisions avant le bilan final.", en: "Learning informs decisions before the final report." } },
    ],
    functions: [{ fr: "Suivi qualitatif et quantitatif", en: "Qualitative and quantitative monitoring" }, { fr: "Contributions et coopérations visibles", en: "Visible contributions and cooperation" }, { fr: "Vue programme et vues projets", en: "Programme and project views" }, { fr: "Mémoire des apprentissages", en: "Learning memory" }],
    safeguards: [{ fr: "Aucun score opaque des personnes ou structures", en: "No opaque scoring of people or organisations" }, { fr: "Indicateurs contextualisés et discutables", en: "Contextualised, discussable indicators" }, { fr: "Données définies avec les porteurs", en: "Data defined with grantees" }],
  },
  rse: {
    problem: [
      { fr: "Les programmes d'engagement sont souvent répartis entre RH, RSE, communication et partenaires associatifs.", en: "Engagement programmes are often split across HR, CSR, communications and non-profit partners." },
      { fr: "Les collaborateurs trouvent difficilement une action adaptée à leurs compétences et à leur disponibilité.", en: "Employees struggle to find actions suited to their skills and availability." },
      { fr: "La recherche de preuves d'impact peut prendre le pas sur la qualité du partenariat.", en: "The search for impact evidence can overshadow partnership quality." },
    ],
    scenario: { fr: "Une entreprise organise un programme annuel de mécénat de compétences avec plusieurs associations. TEMPOsystem RSE permet aux partenaires d'exprimer leurs besoins, aux équipes de proposer du temps et des compétences, et aux responsables de suivre les actions sans transformer l'engagement en opération de communication.", en: "A company runs an annual skills-based volunteering programme with several non-profits. TEMPOsystem RSE lets partners express needs, teams offer time and skills, and programme owners follow actions without turning engagement into a communications exercise." },
    steps: [
      { title: { fr: "Écouter les partenaires", en: "Listen to partners" }, body: { fr: "Les associations formulent les besoins utiles et les conditions d'une contribution adaptée.", en: "Non-profits express useful needs and conditions for appropriate support." } },
      { title: { fr: "Proposer les engagements", en: "Offer opportunities" }, body: { fr: "Les collaborateurs trouvent des missions compatibles avec leur temps et leurs compétences.", en: "Employees find missions matching their time and skills." } },
      { title: { fr: "Coordonner la réalisation", en: "Coordinate delivery" }, body: { fr: "Entreprise et associations suivent ensemble les actions et ajustent les moyens.", en: "Company and non-profits jointly follow actions and adjust resources." } },
      { title: { fr: "Rendre compte avec justesse", en: "Report accurately" }, body: { fr: "Le bilan relie contributions, résultats observés et apprentissages sans surpromesse.", en: "Reporting connects contributions, observed outcomes and learning without overclaiming." } },
    ],
    functions: [{ fr: "Catalogue de besoins associatifs", en: "Non-profit needs catalogue" }, { fr: "Mécénat de compétences et journées solidaires", en: "Skills-based volunteering and solidarity days" }, { fr: "Coordination des partenariats", en: "Partnership coordination" }, { fr: "Bilan des contributions et apprentissages", en: "Contribution and learning review" }],
    safeguards: [{ fr: "Les besoins associatifs guident les missions", en: "Non-profit needs guide missions" }, { fr: "Aucun classement individuel des collaborateurs", en: "No individual employee ranking" }, { fr: "Communication fondée sur des faits vérifiables", en: "Communications based on verifiable facts" }],
  },
};

export function OfferDetailPage() {
  const { lang } = useLang();
  const slug = window.location.hash.replace("#/offres/", "").split("?")[0];
  const offer = tempoOffers.find((item) => item.slug === slug);
  const detail = details[slug];
  if (!offer || !detail) return <main className="offer-missing"><h1>{lang === "fr" ? "Cette offre arrive bientôt." : "This offer is coming soon."}</h1><a href="#/tarifs">{lang === "fr" ? "Voir toutes les offres" : "See all offers"}</a></main>;

  return <main className="offer-detail">
    <header className="offer-hero"><div><p className="editorial-kicker">TEMPOsystem</p><h1>{offer.name}</h1><strong>{offer.audience[lang]}</strong><p>{offer.promise[lang]}</p><div className="offer-hero__actions"><a className="editorial-button editorial-button--primary" href={`#/creer?offre=${offer.slug}`}>{lang === "fr" ? `Rejoindre TEMPOsystem ${offer.name}` : `Join TEMPOsystem ${offer.name}`}</a><a className="editorial-button editorial-button--secondary" href="#situation">{lang === "fr" ? "Voir une situation" : "See a situation"}</a></div></div><div className="offer-hero__rings" aria-hidden="true"><i /><i /><i /><b /></div></header>
    <section className="offer-section"><div className="offer-wrap"><p className="editorial-kicker">{lang === "fr" ? "Le problème" : "The problem"}</p><h2>{lang === "fr" ? "La coopération existe déjà. Il lui manque un fil commun." : "Cooperation already exists. It needs a shared thread."}</h2><div className="offer-problems">{detail.problem.map((text, index) => <article key={text.fr}><span>0{index+1}</span><p>{text[lang]}</p></article>)}</div></div></section>
    <section className="offer-section offer-section--tint" id="situation"><div className="offer-wrap offer-scenario"><div><p className="editorial-kicker">{lang === "fr" ? "Situation représentative" : "Representative situation"}</p><h2>{lang === "fr" ? "Un usage concret, sans scénario miracle." : "A concrete use, without a miracle scenario."}</h2></div><p>{detail.scenario[lang]}</p></div></section>
    <section className="offer-section"><div className="offer-wrap"><p className="editorial-kicker">{lang === "fr" ? "Fonctionnement" : "How it works"}</p><h2>{lang === "fr" ? "Du besoin signalé à la mémoire partagée" : "From reported need to shared memory"}</h2><ol className="offer-steps">{detail.steps.map((item,index) => <li key={item.title.fr}><span>0{index+1}</span><div><h3>{item.title[lang]}</h3><p>{item.body[lang]}</p></div></li>)}</ol></div></section>
    <section className="offer-section offer-section--night"><div className="offer-wrap offer-columns"><div><p className="editorial-kicker">{lang === "fr" ? "Capacités mobilisées" : "Enabled capabilities"}</p><h2>{lang === "fr" ? "Ce que l'espace permet" : "What the space enables"}</h2><ul>{detail.functions.map((item)=><li key={item.fr}>{item[lang]}</li>)}</ul></div><div><p className="editorial-kicker">{lang === "fr" ? "Cadre de confiance" : "Trust framework"}</p><h2>{lang === "fr" ? "Ce qu'il ne doit pas contourner" : "What it must not bypass"}</h2><ul>{detail.safeguards.map((item)=><li key={item.fr}>{item[lang]}</li>)}</ul></div></div></section>
    <section className="offer-section offer-cta"><div className="offer-wrap"><p className="editorial-kicker">{lang === "fr" ? "Premier déploiement" : "First deployment"}</p><h2>{lang === "fr" ? "Commencez avec un besoin, une équipe et un périmètre maîtrisé." : "Start with one need, one team and a controlled scope."}</h2><p>{lang === "fr" ? "Le cadrage précise les acteurs, les règles d'accès, les actions à coordonner et les critères d'un premier bilan." : "Scoping clarifies actors, access rules, actions to coordinate and criteria for a first review."}</p><a className="editorial-button editorial-button--primary" href={`#/creer?offre=${offer.slug}`}>{lang === "fr" ? "Préparer mon premier usage" : "Prepare my first use"}</a></div></section>
  </main>;
}
