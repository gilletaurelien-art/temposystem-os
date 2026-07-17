// Contenu bilingue FR/EN. Les champs traduisibles sont { fr, en } ; route/href/date
// restent neutres. Consommer via item.label[lang] ou pick(item.label, lang).

export const publicNavigation = [
  { label: { fr: "Accueil", en: "Home" }, route: "home", href: "#/" },
  { label: { fr: "Usages", en: "Use cases" }, route: "applications", href: "#/#applications" },
  { label: { fr: "Tarifs", en: "Pricing" }, route: "tarifs", href: "#/tarifs" },
  { label: { fr: "Partenaires", en: "Partners" }, route: "partenaires", href: "#/partenaires" },
  { label: { fr: "Fonctionnement", en: "How it works" }, route: "moteur", href: "#/moteur" },
  { label: { fr: "Confiance", en: "Trust" }, route: "memoire", href: "#/memoire" },
  { label: { fr: "Ressources", en: "Resources" }, route: "manifeste", href: "#/manifeste" },
];

export const cockpitStatusCards = [
  {
    signal: "🟢",
    title: { fr: "Conseil de Bord", en: "Bridge Council" },
    value: { fr: "Opérationnel", en: "Operational" },
    detail: { fr: "Dernière consultation : 29 juin 2026, 09:12.", en: "Last consultation: June 29, 2026, 09:12." },
    supportingDetail: {
      fr: "Les questions deviennent consensus, puis impulsions de décision.",
      en: "Questions become consensus, then decision impulses.",
    },
  },
  {
    signal: "🟢",
    title: { fr: "Mémoire", en: "Memory" },
    value: { fr: "GitHub synchronisé", en: "GitHub synced" },
    detail: { fr: "ADR disponibles.", en: "ADRs available." },
    supportingDetail: {
      fr: "La mémoire stabilise l'énergie des échanges.",
      en: "Memory stabilizes the energy of exchanges.",
    },
  },
  {
    signal: "🟢",
    title: { fr: "Gouvernance", en: "Governance" },
    value: { fr: "Architecture documentée", en: "Documented architecture" },
    detail: { fr: "Décisions traçables.", en: "Traceable decisions." },
    supportingDetail: {
      fr: "Le Capitaine oriente l'énergie collective.",
      en: "The Captain steers the collective energy.",
    },
  },
  {
    signal: "🟢",
    title: { fr: "Applications", en: "Applications" },
    value: { fr: "MANA", en: "MANA" },
    detail: { fr: "Première application active.", en: "First active application." },
    supportingDetail: {
      fr: "Le temps donné devient énergie civique visible.",
      en: "Given time becomes visible civic energy.",
    },
  },
  {
    signal: "🟡",
    title: { fr: "Timonier", en: "Helmsman" },
    value: { fr: "Prototype", en: "Prototype" },
    detail: { fr: "Dispatch local.", en: "Local dispatch." },
    supportingDetail: {
      fr: "Les signaux préparent l'orchestration future.",
      en: "Signals prepare future orchestration.",
    },
  },
  {
    signal: "🟡",
    title: { fr: "API IA", en: "AI APIs" },
    value: { fr: "Non connectées", en: "Not connected" },
    detail: { fr: "Architecture prête.", en: "Architecture ready." },
    supportingDetail: {
      fr: "Aucun appel externe pendant la phase expérimentale.",
      en: "No external calls during the experimental phase.",
    },
  },
];

export const cockpitCouncilSnapshot = {
  lastConsultation: { fr: "29 juin 2026 · 09:12", en: "June 29, 2026 · 09:12" },
  question: {
    fr: "Comment montrer que TEMPOsystem n'est pas une interface informatique, mais une énergie produite par l'intelligence collective ?",
    en: "How can we show that TEMPOsystem is not a software interface, but an energy produced by collective intelligence?",
  },
  consensus: {
    fr: "Le Conseil recommande de présenter le cœur, les agents, les flux et la mémoire comme un organisme vivant plutôt que comme des modules logiciels.",
    en: "The Council recommends presenting the core, the agents, the flows and the memory as a living organism rather than software modules.",
  },
  decision: {
    fr: "Le Capitaine valide la vision : TEMPOsystem est une énergie produite par le temps partagé, éclairée par les décisions et conservée par la mémoire.",
    en: "The Captain validates the vision: TEMPOsystem is an energy produced by shared time, illuminated by decisions and preserved by memory.",
  },
  adr: {
    label: "ADR-0007",
    title: { fr: "Premier déploiement public", en: "First public deployment" },
    href: "#/decisions",
  },
};

export const featuredArchitectureDecision = {
  number: "ADR-0007",
  title: { fr: "Premier déploiement public", en: "First public deployment" },
  date: "2026-06-28",
  href: "#/decisions",
  summary: {
    fr: "TEMPOsystem OS est publié avant les connexions IA afin de rendre visible son énergie fondatrice : gouvernance, mémoire, Conseil de Bord et temps partagé.",
    en: "TEMPOsystem OS is published before the AI connections in order to make visible its founding energy: governance, memory, Bridge Council and shared time.",
  },
};

export const publicDomains = [
  {
    domain: "temposystem.fr",
    purpose: { fr: "documentation et gouvernance françaises", en: "French documentation and governance" },
  },
  {
    domain: "temposystem.eu",
    purpose: { fr: "documentation et gouvernance internationales", en: "International documentation and governance" },
  },
  {
    domain: "manafrance.org",
    purpose: { fr: "première application civique", en: "first civic application" },
  },
  {
    domain: "mana.bzh",
    purpose: { fr: "territoire pilote et expérimentation", en: "pilot territory and experimentation" },
  },
];

export const narrativeMilestones = [
  {
    icon: "🏴",
    title: { fr: "Launch 000", en: "Launch 000" },
    detail: {
      fr: "TEMPOsystem OS affirme publiquement son existence comme socle vivant.",
      en: "TEMPOsystem OS publicly affirms its existence as a living foundation.",
    },
  },
  {
    icon: "⚓",
    title: { fr: "Premier Conseil", en: "First Council" },
    detail: {
      fr: "Le Conseil transforme les échanges en énergie de décision.",
      en: "The Council turns exchanges into decision energy.",
    },
  },
  {
    icon: "📜",
    title: { fr: "Première ADR", en: "First ADR" },
    detail: {
      fr: "Les décisions quittent les conversations pour devenir mémoire durable.",
      en: "Decisions leave conversations to become durable memory.",
    },
  },
  {
    icon: "🧭",
    title: { fr: "Gouvernance", en: "Governance" },
    detail: {
      fr: "Les fonctions permanentes sont séparées des implémentations IA.",
      en: "Permanent functions are separated from AI implementations.",
    },
  },
  {
    icon: "🌍",
    title: { fr: "Premier domaine", en: "First domain" },
    detail: {
      fr: "temposystem.fr et temposystem.eu préparent l'accueil public du système.",
      en: "temposystem.fr and temposystem.eu prepare the public reception of the system.",
    },
  },
  {
    icon: "🚀",
    title: { fr: "Première application", en: "First application" },
    detail: {
      fr: "MANA devient le premier terrain d'application civique.",
      en: "MANA becomes the first ground for civic application.",
    },
  },
  {
    icon: "🧠",
    title: { fr: "Étoile cognitive", en: "Cognitive star" },
    detail: {
      fr: "Le Conseil devient un cœur énergétique entouré d'agents en orbite.",
      en: "The Council becomes an energy core surrounded by orbiting agents.",
    },
  },
];
