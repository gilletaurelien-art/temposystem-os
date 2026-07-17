import { TempoHero } from "../hero/TempoHero";
import { useLang } from "../lib/lang";
import { tempoOffers } from "../config/offers";
import "./homeEditorial.css";

const capabilities = {
  fr: [
    ["Coordonner", "Rassemblez les besoins, les personnes et les organisations dans un même espace de travail."],
    ["Agir", "Transformez un besoin identifié en action attribuée, suivie et menée jusqu'à son aboutissement."],
    ["Mémoriser", "Conservez les contributions, les apprentissages et le contexte au-delà des outils et des équipes."],
    ["Décider", "Éclairez les choix, rendez les responsabilités visibles et gardez la validation humaine."],
  ],
  en: [
    ["Coordinate", "Bring needs, people and organisations together in one shared working space."],
    ["Act", "Turn an identified need into an assigned, monitored action carried through to completion."],
    ["Remember", "Preserve contributions, learning and context beyond tools and teams."],
    ["Decide", "Clarify choices, make responsibilities visible and keep human validation."],
  ],
} as const;

const audiences = {
  fr: [
    { title: "Collectivités · CCAS · CIAS", body: "Coordonner les acteurs de la solidarité et suivre les réponses apportées aux besoins du territoire.", solutions: [["CIVIC", "civic"]] },
    { title: "Associations · Fédérations", body: "Organiser les missions, coopérer entre structures et rendre le temps donné visible.", solutions: [["ASSO", "asso"]] },
    { title: "Établissements sociaux et médico-sociaux", body: "Relier professionnels, familles, aidants, bénévoles et partenaires autour d'une situation commune.", solutions: [["CARE", "care"]] },
    { title: "Réseaux ESS · Fondations", body: "Partager un cadre commun, relier plusieurs territoires et suivre les actions soutenues sans effacer l'autonomie de chacun.", solutions: [["TERRITORIES", "territories"], ["IMPACT", "impact"]] },
    { title: "Entreprises · Directions RSE · Mécènes", body: "Mobiliser le temps et les compétences des salariés, coordonner les partenariats associatifs et rendre les contributions visibles.", solutions: [["RSE", "rse"]] },
  ],
  en: [
    { title: "Local authorities · Social services", body: "Coordinate solidarity actors and follow how local needs are addressed.", solutions: [["CIVIC", "civic"]] },
    { title: "Non-profits · Federations", body: "Organise missions, cooperate across organisations and make given time visible.", solutions: [["ASSO", "asso"]] },
    { title: "Social and care institutions", body: "Connect professionals, families, caregivers, volunteers and partners around a shared situation.", solutions: [["CARE", "care"]] },
    { title: "Social economy networks · Foundations", body: "Share a common framework, connect territories and follow supported action without erasing local autonomy.", solutions: [["TERRITORIES", "territories"], ["IMPACT", "impact"]] },
    { title: "Companies · CSR teams · Patrons", body: "Mobilise employee time and skills, coordinate non-profit partnerships and make contributions visible.", solutions: [["RSE", "rse"]] },
  ],
} as const;

const journey = {
  fr: [
    ["01", "Un besoin apparaît", "Une personne, une équipe ou une organisation signale une situation qui appelle une réponse."],
    ["02", "Les acteurs se coordonnent", "Les organisations utiles partagent le contexte, les responsabilités et les ressources disponibles."],
    ["03", "L'action est menée", "Les personnes mobilisées savent qui fait quoi, quand, et peuvent suivre l'avancement."],
    ["04", "Le temps est reconnu", "Chaque contribution utile laisse une trace. Une trace, jamais une dette."],
    ["05", "La décision demeure", "Le résultat, les arbitrages et les enseignements rejoignent une mémoire commune."],
  ],
  en: [
    ["01", "A need emerges", "A person, team or organisation reports a situation that calls for a response."],
    ["02", "Actors coordinate", "Relevant organisations share context, responsibilities and available resources."],
    ["03", "Action is taken", "Those involved know who does what and when, and can monitor progress."],
    ["04", "Time is recognised", "Every useful contribution leaves a trace. A trace, never a debt."],
    ["05", "The decision remains", "Outcomes, decisions and learning enter a shared memory."],
  ],
} as const;

export function HomePage() {
  const { lang } = useLang();

  return (
    <main className="editorial-home">
      <TempoHero />

      <section className="editorial-section" id="produit">
        <div className="editorial-wrap">
          <header className="editorial-heading">
            <p className="editorial-kicker">{lang === "fr" ? "Le produit" : "The product"}</p>
            <h2>{lang === "fr" ? "Un même espace pour passer du besoin à l'action" : "One space to move from need to action"}</h2>
            <p>{lang === "fr" ? "Quatre capacités forment un cycle continu. Chacune peut être activée progressivement, selon votre organisation." : "Four capabilities form one continuous cycle. Each can be introduced progressively to fit your organisation."}</p>
          </header>
          <div className="editorial-grid editorial-grid--four">
            {capabilities[lang].map(([title, body], index) => (
              <article className="editorial-card editorial-card--capability" key={title}>
                <span>0{index + 1}</span><h3>{title}</h3><p>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-section--tint" id="usages">
        <div className="editorial-wrap">
          <header className="editorial-heading">
            <p className="editorial-kicker">{lang === "fr" ? "Pour qui ?" : "Who is it for?"}</p>
            <h2>{lang === "fr" ? "Conçu pour celles et ceux qui font tenir les territoires" : "Built for those who hold communities together"}</h2>
          </header>
          <div className="editorial-grid editorial-grid--two editorial-audiences">
            {audiences[lang].map((audience) => <article className="editorial-card editorial-audience" key={audience.title}>
              <h3>{audience.title}</h3>
              <p>{audience.body}</p>
              <div className="editorial-audience__links">
                {audience.solutions.map(([name, slug]) => <a href={`#/offres/${slug}`} key={slug}>{lang === "fr" ? "En savoir plus" : "Learn more"} · TEMPOsystem {name}<span aria-hidden="true"> →</span></a>)}
              </div>
            </article>)}
          </div>
          <aside className="editorial-partner-bridge">
            <div>
              <p className="editorial-kicker">{lang === "fr" ? "Soutenir l'écosystème" : "Support the ecosystem"}</p>
              <h3>{lang === "fr" ? "Entreprises mécènes et donateurs particuliers rendent aussi l'infrastructure possible." : "Corporate patrons and individual donors also make the infrastructure possible."}</h3>
              <p>{lang === "fr" ? "Les mécènes financent et mobilisent leur entreprise. Les particuliers peuvent soutenir MANAfrance par un don ponctuel ou régulier." : "Patrons fund and mobilise their company. Individuals can support MANAfrance through a one-off or recurring donation."}</p>
            </div>
            <a className="editorial-button editorial-button--secondary" href="#/partenaires">{lang === "fr" ? "Découvrir les partenariats" : "Explore partnerships"} →</a>
          </aside>
        </div>
      </section>

      <section className="editorial-section editorial-offers" id="offres">
        <div className="editorial-wrap">
          <header className="editorial-heading">
            <p className="editorial-kicker">{lang === "fr" ? "Les déclinaisons" : "Solutions"}</p>
            <h2>{lang === "fr" ? "Un même socle, adapté à chaque terrain d'action" : "One foundation, adapted to every field of action"}</h2>
            <p>{lang === "fr" ? "Chaque TEMPOsystem active les mêmes capacités durables — coordonner, agir, mémoriser et décider — avec le vocabulaire et les usages de votre secteur." : "Every TEMPOsystem activates the same lasting capabilities — coordinate, act, remember and decide — with the language and uses of your sector."}</p>
          </header>
          <div className="editorial-offers__grid">
            {tempoOffers.map((offer) => <a className="editorial-offer" href={`#/offres/${offer.slug}`} key={offer.slug}>
              <span>TEMPOsystem</span><h3>{offer.name}</h3><strong>{offer.audience[lang]}</strong><p>{offer.promise[lang]}</p><em>{lang === "fr" ? "Découvrir l'offre" : "Explore the offer"} →</em>
            </a>)}
          </div>
          <div className="editorial-actions"><a className="editorial-button editorial-button--secondary" href="#/tarifs">{lang === "fr" ? "Comparer les offres et les tarifs" : "Compare offers and pricing"}</a></div>
        </div>
      </section>

      <section className="editorial-section" id="exemple">
        <div className="editorial-wrap">
          <header className="editorial-heading">
            <p className="editorial-kicker">{lang === "fr" ? "Un exemple concret" : "A concrete example"}</p>
            <h2>{lang === "fr" ? "Un besoin apparaît. Voici ce qui se passe ensuite." : "A need emerges. Here is what happens next."}</h2>
            <p>{lang === "fr" ? "Un CCAS, plusieurs associations et un établissement coordonnent une action contre l'isolement. TEMPOsystem conserve le fil commun." : "A local social service, several non-profits and a care institution coordinate an action against isolation. TEMPOsystem preserves the shared thread."}</p>
          </header>
          <ol className="editorial-journey">
            {journey[lang].map(([number, title, body]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className="editorial-section editorial-section--night" id="confiance">
        <div className="editorial-wrap editorial-trust">
          <div>
            <p className="editorial-kicker">{lang === "fr" ? "Gouvernance" : "Governance"}</p>
            <h2>{lang === "fr" ? "Nos limites sont écrites, avant la première ligne de code." : "Our limits are written, before the first line of code."}</h2>
          </div>
          <div className="editorial-trust__points">
            <p>{lang === "fr" ? "TEMPOsystem s'inscrit sous une Constitution commune à l'univers MANA : seize articles qui fixent les limites que le pouvoir des machines ne franchira pas." : "TEMPOsystem stands under a Constitution shared across the MANA universe: sixteen articles fixing the limits the power of machines will not cross."}</p>
            <p><strong>{lang === "fr" ? "Toute décision engageante reste validée par une personne ou une instance humaine identifiée." : "Every binding decision remains validated by an identified person or human body."}</strong></p>
            <a href="https://constitution.temposystem.fr/" target="_blank" rel="noopener">{lang === "fr" ? "Lire la Constitution" : "Read the Constitution"} →</a>
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-final">
        <div className="editorial-wrap">
          <p className="editorial-kicker">{lang === "fr" ? "Commencer" : "Get started"}</p>
          <h2>{lang === "fr" ? "Commencez par un usage réel." : "Start with one real use case."}</h2>
          <p>{lang === "fr" ? "Décrivez votre organisation, votre territoire et le premier besoin que vous souhaitez mieux coordonner. Votre espace sera préparé sur l'infrastructure MANAtimebank." : "Tell us about your organisation, community and the first need you want to coordinate better. Your space will be prepared on the MANAtimebank infrastructure."}</p>
          <div className="editorial-actions editorial-actions--center">
            <a className="editorial-button editorial-button--primary" href="#/creer">{lang === "fr" ? "Rejoindre TEMPOsystem" : "Join TEMPOsystem"}</a>
            <a className="editorial-button editorial-button--secondary" href="mailto:contact@manahome.org?subject=TEMPOsystem">{lang === "fr" ? "Contacter l'équipe" : "Contact the team"}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
