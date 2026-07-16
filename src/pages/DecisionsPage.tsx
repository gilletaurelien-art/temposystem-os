import { Section } from "../components/Section";
import { useLang } from "../lib/lang";

export function DecisionsPage() {
  const { lang } = useLang();
  const principles = lang === "fr" ? [
    ["Décision humaine", "La technologie peut préparer et synthétiser. Une personne ou une instance identifiée valide toute décision engageante."],
    ["Fonctions durables", "Les responsabilités demeurent même lorsque les fournisseurs, modèles d'IA ou outils techniques changent."],
    ["Mémoire explicable", "Chaque décision structurante conserve son contexte, ses alternatives et ses conséquences."],
    ["Participants protégés", "Citoyens, bénévoles et bénéficiaires ne sont ni des produits, ni des audiences publicitaires."],
    ["Déploiement progressif", "Un TEMPOSYSTEM commence par un périmètre limité, observable et réversible."],
    ["Transparence", "Les éléments réels, simulés, expérimentaux et prévus doivent toujours être distingués."],
  ] : [
    ["Human decision", "Technology may prepare and summarise. An identified person or human body validates every binding decision."],
    ["Durable functions", "Responsibilities remain even when providers, AI models or technical tools change."],
    ["Explainable memory", "Every major decision preserves its context, alternatives and consequences."],
    ["Protected participants", "Citizens, volunteers and beneficiaries are neither products nor advertising audiences."],
    ["Progressive deployment", "A TEMPOSYSTEM starts with a limited, observable and reversible scope."],
    ["Transparency", "Real, simulated, experimental and planned elements must always be distinguished."],
  ];
  return <main><Section eyebrow={lang === "fr" ? "Confiance" : "Trust"} title={lang === "fr" ? "La coopération a besoin de règles visibles." : "Cooperation needs visible rules."} intro={lang === "fr" ? "La confiance ne repose pas sur une promesse d'intelligence artificielle. Elle repose sur des responsabilités, des limites et une mémoire que chacun peut comprendre." : "Trust does not rest on a promise of artificial intelligence. It rests on responsibilities, boundaries and memory everyone can understand."}><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{principles.map(([title, body]) => <article key={title} className="rounded-lg border border-white/10 bg-white/[0.04] p-6"><h3 className="text-xl font-semibold text-slate-50">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{body}</p></article>)}</div><p className="mt-8 text-sm leading-7 text-slate-400">{lang === "fr" ? "Le registre des décisions d'architecture reste accessible dans la documentation publique du projet." : "The architecture decision register remains available in the project's public documentation."} <a className="text-amber-300" href="https://github.com/gilletaurelien-art/temposystem-os/tree/main/docs/captains-log/decisions">{lang === "fr" ? "Consulter les ADR" : "Browse ADRs"} ↗</a></p></Section></main>;
}
