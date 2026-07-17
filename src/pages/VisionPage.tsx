import { Section } from "../components/Section";
import { useLang } from "../lib/lang";

export function VisionPage() {
  const { lang } = useLang();
  const resources = lang === "fr" ? [
    ["Le manifeste", "Comprendre la vision du temps partagé et de l'action collective.", "https://temposystem.eu"],
    ["Le livre blanc", "Approfondir le modèle du temps donné, ses principes et ses limites.", "/livre-blanc.html"],
    ["Le registre des décisions", "Lire les ADR qui conservent les choix structurants de TEMPOsystem.", "https://github.com/gilletaurelien-art/temposystem-os/tree/main/docs/captains-log/decisions"],
    ["La documentation", "Consulter l'architecture, le journal du Capitaine et la feuille de route.", "https://github.com/gilletaurelien-art/temposystem-os/tree/main/docs"],
    ["MANAtimebank", "Découvrir l'infrastructure logicielle qui permet de configurer un espace temps.", "https://manatimebank.org"],
  ] : [
    ["Manifesto", "Understand the vision for shared time and collective action.", "https://temposystem.eu"],
    ["White paper", "Explore the given-time model, its principles and boundaries.", "/livre-blanc-en.html"],
    ["Decision register", "Read the ADRs preserving TEMPOsystem's structural choices.", "https://github.com/gilletaurelien-art/temposystem-os/tree/main/docs/captains-log/decisions"],
    ["Documentation", "Browse the architecture, Captain's log and roadmap.", "https://github.com/gilletaurelien-art/temposystem-os/tree/main/docs"],
    ["MANAtimebank", "Discover the software infrastructure used to configure a time space.", "https://manatimebank.org"],
  ];
  return <main><Section eyebrow={lang === "fr" ? "Ressources" : "Resources"} title={lang === "fr" ? "Explorer les fondations" : "Explore the foundations"} intro={lang === "fr" ? "TEMPOsystem documente publiquement sa vision, ses choix et ses limites. Ces ressources approfondissent le produit sans alourdir le premier parcours." : "TEMPOsystem publicly documents its vision, choices and boundaries. These resources go deeper without burdening the first journey."}><div className="civic-card-grid civic-card-grid--three">{resources.map(([title, body, href]) => <a key={title} href={href} className="civic-card civic-card--link"><h3>{title}</h3><p>{body}</p><span>{lang === "fr" ? "Ouvrir" : "Open"} →</span></a>)}</div></Section></main>;
}
