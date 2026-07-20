import { Section } from "../components/Section";
import { useLang } from "../lib/lang";

export function DecisionsPage() {
  const { lang } = useLang();
  const principles = lang === "fr" ? [
    ["Décision humaine", "La technologie peut préparer et synthétiser. Une personne ou une instance identifiée valide toute décision engageante."],
    ["Responsabilités durables", "Les responsabilités demeurent même lorsque les fournisseurs ou les outils techniques changent."],
    ["Mémoire explicable", "Chaque décision structurante conserve son contexte, ses alternatives et ses conséquences."],
    ["Participants protégés", "Citoyens, bénévoles et bénéficiaires ne sont ni des produits, ni des audiences publicitaires."],
    ["Déploiement progressif", "Un TEMPOsystem commence par un périmètre limité, observable et réversible."],
    ["Transparence", "Les éléments réels, simulés, expérimentaux et prévus doivent toujours être distingués."],
  ] : [
    ["Human decision", "Technology may prepare and summarise. An identified person or human body validates every binding decision."],
    ["Durable responsibilities", "Responsibilities remain even when providers or technical tools change."],
    ["Explainable memory", "Every major decision preserves its context, alternatives and consequences."],
    ["Protected participants", "Citizens, volunteers and beneficiaries are neither products nor advertising audiences."],
    ["Progressive deployment", "A TEMPOsystem starts with a limited, observable and reversible scope."],
    ["Transparency", "Real, simulated, experimental and planned elements must always be distinguished."],
  ];
  const eu = lang === "fr"
    ? "Notre engagement de souveraineté numérique est détaillé sur temposystem.eu : pourquoi la nationalité juridique de l'opérateur prime sur la géographie des serveurs (CLOUD Act, arrêt Schrems II), notre exigence d'un hébergement français non soumis au droit extraterritorial avec pour horizon la qualification SecNumCloud, notre code ouvert et auditable, la portabilité de vos données, et notre trajectoire de société à mission agréée ESUS."
    : "Our digital-sovereignty commitment is detailed on temposystem.eu: why the operator's legal nationality matters more than server geography (CLOUD Act, Schrems II ruling), our requirement for French hosting outside extraterritorial law aiming for SecNumCloud qualification, our open and auditable code, your data portability, and our path toward a mission-led company with ESUS accreditation.";
  return <main><Section eyebrow={lang === "fr" ? "Confiance" : "Trust"} title={lang === "fr" ? "La coopération a besoin de règles visibles." : "Cooperation needs visible rules."} intro={lang === "fr" ? "La confiance repose sur des responsabilités, des limites et une mémoire que chacun peut comprendre." : "Trust rests on responsibilities, boundaries and memory everyone can understand."}><div className="civic-card-grid civic-card-grid--three">{principles.map(([title, body]) => <article key={title} className="civic-card"><h3>{title}</h3><p>{body}</p></article>)}</div><p className="civic-note">{eu} <a href="https://temposystem.eu">{lang === "fr" ? "Lire notre engagement de souveraineté" : "Read our sovereignty commitment"} ↗</a></p><p className="civic-note">{lang === "fr" ? "Le registre des décisions d'architecture reste accessible dans la documentation publique du projet." : "The architecture decision register remains available in the project's public documentation."} <a href="https://github.com/gilletaurelien-art/temposystem-os/tree/main/docs/captains-log/decisions">{lang === "fr" ? "Consulter les ADR" : "Browse ADRs"} ↗</a></p></Section></main>;
}
