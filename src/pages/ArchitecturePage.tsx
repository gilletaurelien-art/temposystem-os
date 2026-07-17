import { Section } from "../components/Section";
import { useLang } from "../lib/lang";

const content = {
  fr: {
    eyebrow: "Fonctionnement", title: "Du besoin à l'action, sans perdre le fil.",
    intro: "TEMPOsystem ne remplace pas les organisations ni leurs outils métiers. Il crée une continuité commune entre ce qui doit être compris, coordonné, réalisé et mémorisé.",
    steps: [
      ["Signaler", "Un besoin, une ressource ou une question entre dans un espace partagé."],
      ["Coordonner", "Les acteurs utiles accèdent au même contexte et définissent les responsabilités."],
      ["Agir", "L'action est attribuée, suivie et documentée jusqu'à son aboutissement."],
      ["Reconnaître", "Le temps utile laisse une trace visible, sans devenir une dette ou une monnaie spéculative."],
      ["Décider", "Une personne ou une instance humaine valide les arbitrages engageants."],
      ["Mémoriser", "Les résultats et enseignements restent disponibles pour les décisions futures."],
    ],
  },
  en: {
    eyebrow: "How it works", title: "From need to action, without losing the thread.",
    intro: "TEMPOsystem does not replace organisations or their business tools. It creates shared continuity between what must be understood, coordinated, delivered and remembered.",
    steps: [
      ["Signal", "A need, resource or question enters a shared space."],
      ["Coordinate", "Relevant actors access the same context and define responsibilities."],
      ["Act", "The action is assigned, monitored and documented through completion."],
      ["Recognise", "Useful time leaves a visible trace without becoming debt or a speculative currency."],
      ["Decide", "A person or human body validates binding decisions."],
      ["Remember", "Outcomes and learning remain available for future decisions."],
    ],
  },
} as const;

export function ArchitecturePage() {
  const { lang } = useLang(); const c = content[lang];
  return <main><Section eyebrow={c.eyebrow} title={c.title} intro={c.intro}>
    <div className="civic-card-grid civic-card-grid--three">{c.steps.map(([title, body], i) => <article key={title} className="civic-card"><span className="civic-index">0{i + 1}</span><h3>{title}</h3><p>{body}</p></article>)}</div>
  </Section></main>;
}
