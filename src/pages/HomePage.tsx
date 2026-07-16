import { TempoHero } from "../hero/TempoHero";
import { useLang } from "../lib/lang";
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
    ["Collectivités · CCAS · CIAS", "Coordonner les acteurs de la solidarité et suivre les réponses apportées aux besoins du territoire."],
    ["Associations · Fédérations", "Organiser les missions, coopérer entre structures et rendre le temps donné visible."],
    ["Établissements sociaux et médico-sociaux", "Relier professionnels, familles, aidants, bénévoles et partenaires autour d'une situation commune."],
    ["Réseaux ESS · Fondations", "Partager un cadre commun tout en préservant l'autonomie de chaque antenne et de chaque territoire."],
  ],
  en: [
    ["Local authorities · Social services", "Coordinate solidarity actors and follow how local needs are addressed."],
    ["Non-profits · Federations", "Organise missions, cooperate across organisations and make given time visible."],
    ["Social and care institutions", "Connect professionals, families, caregivers, volunteers and partners around a shared situation."],
    ["Social economy networks · Foundations", "Share a common framework while preserving local and organisational autonomy."],
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

      <section className="editorial-intro" aria-labelledby="editorial-intro-title">
        <div className="editorial-wrap editorial-intro__grid">
          <div>
            <p className="editorial-kicker">TEMPOSYSTEM</p>
            <h1 id="editorial-intro-title">
              {lang === "fr"
                ? "L'infrastructure d'orchestration de l'action collective."
                : "The orchestration infrastructure for collective action."}
            </h1>
            <p className="editorial-lead">
              {lang === "fr"
                ? "TEMPOSYSTEM aide les collectivités, associations et établissements à coordonner des besoins, des personnes, des actions et des décisions dans une mémoire commune."
                : "TEMPOSYSTEM helps local authorities, non-profits and institutions coordinate needs, people, actions and decisions in a shared memory."}
            </p>
            <div className="editorial-actions">
              <a className="editorial-button editorial-button--primary" href="https://manatimebank.org/creer">
                {lang === "fr" ? "Créer mon TEMPOSYSTEM" : "Create my TEMPOSYSTEM"}
              </a>
              <a className="editorial-button editorial-button--secondary" href="#exemple">
                {lang === "fr" ? "Voir un exemple" : "See an example"}
              </a>
            </div>
          </div>
          <div className="editorial-promise" aria-label={lang === "fr" ? "Principes" : "Principles"}>
            <p>{lang === "fr" ? "La technologie facilite la coordination." : "Technology supports coordination."}</p>
            <strong>{lang === "fr" ? "Les humains gardent la décision." : "People keep the final decision."}</strong>
            <span>{lang === "fr" ? "Participants et bénéficiaires — jamais produits." : "Participants and beneficiaries — never products."}</span>
          </div>
        </div>
      </section>

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
          <div className="editorial-grid editorial-grid--two">
            {audiences[lang].map(([title, body]) => <article className="editorial-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="editorial-section" id="exemple">
        <div className="editorial-wrap">
          <header className="editorial-heading">
            <p className="editorial-kicker">{lang === "fr" ? "Un exemple concret" : "A concrete example"}</p>
            <h2>{lang === "fr" ? "Un besoin apparaît. Voici ce qui se passe ensuite." : "A need emerges. Here is what happens next."}</h2>
            <p>{lang === "fr" ? "Un CCAS, plusieurs associations et un établissement coordonnent une action contre l'isolement. TEMPOSYSTEM conserve le fil commun." : "A local social service, several non-profits and a care institution coordinate an action against isolation. TEMPOSYSTEM preserves the shared thread."}</p>
          </header>
          <ol className="editorial-journey">
            {journey[lang].map(([number, title, body]) => <li key={number}><span>{number}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className="editorial-section editorial-section--night" id="confiance">
        <div className="editorial-wrap editorial-trust">
          <div>
            <p className="editorial-kicker">{lang === "fr" ? "Maîtrise humaine" : "Human control"}</p>
            <h2>{lang === "fr" ? "La technologie éclaire. Elle ne gouverne pas." : "Technology informs. It does not govern."}</h2>
          </div>
          <div className="editorial-trust__points">
            <p>{lang === "fr" ? "Les fonctions d'assistance peuvent préparer, synthétiser, signaler et documenter." : "Assistance functions may prepare, summarise, flag and document."}</p>
            <p>{lang === "fr" ? "Les fournisseurs d'IA sont remplaçables. Les responsabilités, les règles et la mémoire demeurent." : "AI providers are replaceable. Responsibilities, rules and memory remain."}</p>
            <p><strong>{lang === "fr" ? "Toute décision engageante est validée par une personne ou une instance humaine identifiée." : "Every binding decision is validated by an identified person or human body."}</strong></p>
            <a href="#/memoire">{lang === "fr" ? "Découvrir la gouvernance et la mémoire" : "Explore governance and memory"} →</a>
          </div>
        </div>
      </section>

      <section className="editorial-section editorial-final">
        <div className="editorial-wrap">
          <p className="editorial-kicker">{lang === "fr" ? "Commencer" : "Get started"}</p>
          <h2>{lang === "fr" ? "Commencez par un usage réel." : "Start with one real use case."}</h2>
          <p>{lang === "fr" ? "Décrivez votre organisation, votre territoire et le premier besoin que vous souhaitez mieux coordonner. Votre espace sera préparé sur l'infrastructure MANAtimebank." : "Tell us about your organisation, community and the first need you want to coordinate better. Your space will be prepared on the MANAtimebank infrastructure."}</p>
          <div className="editorial-actions editorial-actions--center">
            <a className="editorial-button editorial-button--primary" href="https://manatimebank.org/creer">{lang === "fr" ? "Créer mon TEMPOSYSTEM" : "Create my TEMPOSYSTEM"}</a>
            <a className="editorial-button editorial-button--secondary" href="mailto:contact@manahome.org?subject=TEMPOSYSTEM">{lang === "fr" ? "Contacter l'équipe" : "Contact the team"}</a>
          </div>
        </div>
      </section>
    </main>
  );
}
