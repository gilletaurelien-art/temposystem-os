import { Section } from "../components/Section";
import { useLang } from "../lib/lang";

const uses = {
  fr: [
    ["Solidarité territoriale", "Relier un CCAS, des associations, des établissements et des bénévoles autour des besoins du territoire."],
    ["Soin et présence", "Coordonner professionnels, familles, aidants et partenaires sans remplacer les outils de soin."],
    ["Vie associative", "Organiser les missions, coopérer entre structures et reconnaître le temps bénévole."],
    ["Réseaux et fédérations", "Partager un cadre et une mémoire communs tout en maintenant l'autonomie locale."],
  ],
  en: [
    ["Local solidarity", "Connect social services, non-profits, institutions and volunteers around local needs."],
    ["Care and presence", "Coordinate professionals, families, caregivers and partners without replacing care tools."],
    ["Non-profit action", "Organise missions, cooperate across organisations and recognise volunteer time."],
    ["Networks and federations", "Share a common framework and memory while preserving local autonomy."],
  ],
} as const;

export function ManaPage() { const { lang } = useLang(); return <main><Section
  eyebrow={lang === "fr" ? "Usages" : "Use cases"}
  title={lang === "fr" ? "Commencer par un problème réel" : "Start with one real problem"}
  intro={lang === "fr" ? "Chaque TEMPOSYSTEM est configuré autour d'un périmètre clair, d'acteurs identifiés et d'un premier résultat observable." : "Each TEMPOSYSTEM is configured around a clear scope, identified actors and a first observable outcome."}>
  <div className="civic-card-grid civic-card-grid--two">{uses[lang].map(([title, body]) => <article key={title} className="civic-card"><h3>{title}</h3><p>{body}</p></article>)}</div>
  <div className="civic-actions"><a href="https://manatimebank.org/creer" className="civic-button civic-button--primary">{lang === "fr" ? "Créer mon TEMPOSYSTEM" : "Create my TEMPOSYSTEM"}</a><a href="mailto:contact@manahome.org?subject=TEMPOSYSTEM" className="civic-button civic-button--secondary">{lang === "fr" ? "Parler de mon territoire" : "Discuss my community"}</a></div>
  </Section></main>; }
