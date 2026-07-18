import { Section } from "../components/Section";
import { useLang } from "../lib/lang";

/** Le principe : un moteur invisible, une expérience vécue (doctrine « mana is not money »). */
const engine = {
  fr: [
    ["LE MOTEUR", "TEMPOsystem", "Le grand livre du temps donné. Invisible, générique, réutilisable — il compte, relie et mémorise sans jamais se mettre en avant."],
    ["L'EXPÉRIENCE", "MANA", "Ce que les gens vivent. Pas un solde à dépenser, un état lumineux : le temps donné devient énergie collective visible."],
  ],
  en: [
    ["THE ENGINE", "TEMPOsystem", "The ledger of given time. Invisible, generic, reusable — it counts, connects and remembers without ever stepping forward."],
    ["THE EXPERIENCE", "MANA", "What people live. Not a balance to spend, a luminous state: given time becomes visible collective energy."],
  ],
} as const;

/** La galerie des mondes MANA — chacun bâti sur le même moteur. */
const worlds = [
  { name: "MANAHOME.org", url: "https://manahome.org",
    role: { fr: "La maison mère", en: "The common home" },
    desc: { fr: "Le manifeste, la constitution et le hall d'entrée de l'univers. Le socle commun où chaque monde puise ses principes.", en: "The manifesto, the constitution and the entrance hall of the universe. The common ground every world draws its principles from." } },
  { name: "MANAtimebank.org", url: "https://manatimebank.org",
    role: { fr: "L'infrastructure", en: "The infrastructure" },
    desc: { fr: "Le grand livre mondial du temps donné — la couche que TEMPOsystem fait tourner sous chaque application.", en: "The global ledger of given time — the layer TEMPOsystem runs beneath every application." } },
  { name: "MANAfrance.org", url: "https://manafrance.org",
    role: { fr: "Action territoriale", en: "Territorial action" },
    desc: { fr: "La solidarité civique : CCAS, associations, bénévoles. Chaque mission accomplie laisse une trace de temps utile, visible.", en: "Civic solidarity: social services, non-profits, volunteers. Every completed mission leaves a visible trace of useful time." } },
  { name: "MANA.bzh", url: "https://mana.bzh",
    role: { fr: "Laboratoire breton", en: "Breton laboratory" },
    desc: { fr: "Le terrain d'expérimentation grandeur nature, où les usages se testent avant d'essaimer ailleurs.", en: "The full-scale testing ground, where uses are trialled before spreading elsewhere." } },
  { name: "MANAfamily.org", url: "https://manafamily.org",
    role: { fr: "Cercles familiaux", en: "Family circles" },
    desc: { fr: "L'entraide entre proches et aidants. Ici, TEMPOsystem compte la présence — jamais l'argent.", en: "Mutual aid between relatives and caregivers. Here TEMPOsystem counts presence — never money." } },
  { name: "AllianceMANA.org", url: "https://alliancemana.org",
    role: { fr: "Gouvernance & principes", en: "Governance & principles" },
    desc: { fr: "Le cadre partagé qui tient l'univers cohérent : mêmes valeurs, autonomie locale préservée.", en: "The shared framework that keeps the universe coherent: same values, local autonomy preserved." } },
] as const;

/** Ce que l'univers rend déjà possible sur le terrain. */
const grounds = {
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

const copy = {
  fr: {
    eyebrow: "Applications",
    title: "Un moteur invisible, un univers bien réel.",
    intro: "TEMPOsystem ne se voit pas : il compte le temps donné, en silence. Ce qui se vit, c'est MANA — le premier univers d'applications bâti sur ce moteur, et aujourd'hui la meilleure preuve de ce qu'il sait faire.",
    worldsKicker: "L'univers MANA",
    worldsTitle: "Un seul moteur, plusieurs mondes.",
    worldsIntro: "Chacun de ces mondes garde son rôle et son autonomie. Tous tournent sur la même infrastructure de temps.",
    groundsKicker: "Sur le terrain",
    groundsTitle: "Ce que MANA rend déjà possible.",
    proofKicker: "Un moteur, autant de mondes que d'intentions",
    proofTitle: "Le prochain monde pourrait être le vôtre.",
    proofText: "MANA prouve que TEMPOsystem peut faire battre un univers entier à partir d'un seul moteur. Une collectivité, un réseau, une fédération : chacun peut y déployer son propre terrain d'action.",
    join: "Rejoindre TEMPOsystem",
    talk: "Parler de mon territoire",
    visit: "Visiter",
  },
  en: {
    eyebrow: "Applications",
    title: "An invisible engine, a very real universe.",
    intro: "TEMPOsystem stays out of sight: it counts given time, quietly. What people experience is MANA — the first universe of applications built on that engine, and today the clearest proof of what it can do.",
    worldsKicker: "The MANA universe",
    worldsTitle: "One engine, several worlds.",
    worldsIntro: "Each of these worlds keeps its role and its autonomy. They all run on the same time infrastructure.",
    groundsKicker: "On the ground",
    groundsTitle: "What MANA already makes possible.",
    proofKicker: "One engine, as many worlds as intentions",
    proofTitle: "The next world could be yours.",
    proofText: "MANA proves that TEMPOsystem can power an entire universe from a single engine. A local authority, a network, a federation: each can deploy its own field of action on it.",
    join: "Join TEMPOsystem",
    talk: "Discuss my community",
    visit: "Visit",
  },
} as const;

export function ManaPage() {
  const { lang } = useLang();
  const c = copy[lang];

  return (
    <main>
      <Section eyebrow={c.eyebrow} title={c.title} intro={c.intro}>
        {/* Le principe : moteur ↔ expérience */}
        <div className="civic-card-grid civic-card-grid--two">
          {engine[lang].map(([role, name, body]) => (
            <article key={name} className="civic-card">
              <span className="civic-index">{role}</span>
              <h3>{name}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>

        {/* La galerie des mondes */}
        <div className="app-block">
          <div className="app-block__head">
            <p className="os-eyebrow">{c.worldsKicker}</p>
            <h2>{c.worldsTitle}</h2>
            <p>{c.worldsIntro}</p>
          </div>
          <div className="civic-card-grid civic-card-grid--three">
            {worlds.map((w) => (
              <a key={w.name} className="civic-card civic-card--link" href={w.url} target="_blank" rel="noopener noreferrer">
                <span className="civic-index">{w.role[lang]}</span>
                <h3>{w.name}</h3>
                <p>{w.desc[lang]}</p>
                <span>{c.visit} →</span>
              </a>
            ))}
          </div>
        </div>

        {/* Sur le terrain */}
        <div className="app-block">
          <div className="app-block__head">
            <p className="os-eyebrow">{c.groundsKicker}</p>
            <h2>{c.groundsTitle}</h2>
          </div>
          <div className="civic-card-grid civic-card-grid--two">
            {grounds[lang].map(([title, body]) => (
              <article key={title} className="civic-card">
                <h3>{title}</h3>
                <p>{body}</p>
              </article>
            ))}
          </div>
        </div>

        {/* Preuve + appel */}
        <div className="app-block">
          <div className="app-block__head">
            <p className="os-eyebrow">{c.proofKicker}</p>
            <h2>{c.proofTitle}</h2>
            <p>{c.proofText}</p>
          </div>
          <div className="civic-actions">
            <a href="#/creer" className="civic-button civic-button--primary">{c.join}</a>
            <a href="mailto:contact@manahome.org?subject=TEMPOsystem" className="civic-button civic-button--secondary">{c.talk}</a>
          </div>
        </div>
      </Section>
    </main>
  );
}
