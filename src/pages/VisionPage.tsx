import { Section } from "../components/Section";
import { useLang } from "../lib/lang";

export function VisionPage() {
  const { lang } = useLang();
  const resources = lang === "fr" ? [
    ["Le manifeste", "Comprendre la vision du temps partagé et de l'action collective.", "https://temposystem.eu"],
    ["Le livre blanc", "Approfondir le modèle du temps donné, ses principes et ses limites.", "/livre-blanc.html"],
    ["Le Conseil de Bord", "Explorer le prototype public de préparation et de documentation d'une décision.", "#/conseil"],
    ["Le registre des décisions", "Lire les ADR qui conservent les choix structurants de TEMPOSYSTEM.", "https://github.com/gilletaurelien-art/temposystem-os/tree/main/docs/captains-log/decisions"],
    ["La documentation", "Consulter l'architecture, le journal du Capitaine et la feuille de route.", "https://github.com/gilletaurelien-art/temposystem-os/tree/main/docs"],
    ["MANAtimebank", "Découvrir l'infrastructure logicielle qui permet de configurer un espace temps.", "https://manatimebank.org"],
  ] : [
    ["Manifesto", "Understand the vision for shared time and collective action.", "https://temposystem.eu"],
    ["White paper", "Explore the given-time model, its principles and boundaries.", "/livre-blanc-en.html"],
    ["Bridge Council", "Explore the public prototype for preparing and documenting a decision.", "#/conseil"],
    ["Decision register", "Read the ADRs preserving TEMPOSYSTEM's structural choices.", "https://github.com/gilletaurelien-art/temposystem-os/tree/main/docs/captains-log/decisions"],
    ["Documentation", "Browse the architecture, Captain's log and roadmap.", "https://github.com/gilletaurelien-art/temposystem-os/tree/main/docs"],
    ["MANAtimebank", "Discover the software infrastructure used to configure a time space.", "https://manatimebank.org"],
  ];
  return <main><Section eyebrow={lang === "fr" ? "Ressources" : "Resources"} title={lang === "fr" ? "Explorer les fondations" : "Explore the foundations"} intro={lang === "fr" ? "TEMPOSYSTEM documente publiquement sa vision, ses choix et ses limites. Ces ressources approfondissent le produit sans alourdir le premier parcours." : "TEMPOSYSTEM publicly documents its vision, choices and boundaries. These resources go deeper without burdening the first journey."}><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">{resources.map(([title, body, href]) => <a key={title} href={href} className="rounded-lg border border-white/10 bg-white/[0.04] p-6 text-inherit no-underline"><h3 className="text-xl font-semibold text-slate-50">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{body}</p><span className="mt-5 inline-block text-sm font-bold text-amber-300">{lang === "fr" ? "Ouvrir" : "Open"} →</span></a>)}</div></Section></main>;
}
