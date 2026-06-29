export const publicNavigation = [
  { label: "Accueil", route: "home", href: "#/" },
  { label: "Conseil de Bord", route: "council", href: "#/council" },
  { label: "Vision", route: "vision", href: "#/vision" },
  { label: "Architecture", route: "architecture", href: "#/architecture" },
  { label: "Décisions", route: "decisions", href: "#/decisions" },
  { label: "MANA", route: "mana", href: "#/mana" },
];

export const cockpitStatusCards = [
  {
    signal: "🟢",
    title: "Conseil de Bord",
    value: "Opérationnel",
    detail: "Dernière consultation : 29 juin 2026, 09:12.",
    supportingDetail: "Les questions deviennent consensus, puis impulsions de décision.",
  },
  {
    signal: "🟢",
    title: "Mémoire",
    value: "GitHub synchronisé",
    detail: "ADR disponibles.",
    supportingDetail: "La mémoire stabilise l'énergie des échanges.",
  },
  {
    signal: "🟢",
    title: "Gouvernance",
    value: "Architecture documentée",
    detail: "Décisions traçables.",
    supportingDetail: "Le Capitaine oriente l'énergie collective.",
  },
  {
    signal: "🟢",
    title: "Applications",
    value: "MANA",
    detail: "Première application active.",
    supportingDetail: "Le temps donné devient énergie civique visible.",
  },
  {
    signal: "🟡",
    title: "Timonier",
    value: "Prototype",
    detail: "Dispatch local.",
    supportingDetail: "Les signaux préparent l'orchestration future.",
  },
  {
    signal: "🟡",
    title: "API IA",
    value: "Non connectées",
    detail: "Architecture prête.",
    supportingDetail: "Aucun appel externe pendant la phase expérimentale.",
  },
];

export const cockpitCouncilSnapshot = {
  lastConsultation: "29 juin 2026 · 09:12",
  question:
    "Comment montrer que TEMPOSYSTEM n'est pas une interface informatique, mais une énergie produite par l'intelligence collective ?",
  consensus:
    "Le Conseil recommande de présenter le cœur, les agents, les flux et la mémoire comme un organisme vivant plutôt que comme des modules logiciels.",
  decision:
    "Le Capitaine valide la vision : TEMPOSYSTEM est une énergie produite par le temps partagé, éclairée par les décisions et conservée par la mémoire.",
  adr: {
    label: "ADR-0007",
    title: "Premier déploiement public",
    href: "#/decisions",
  },
};

export const featuredArchitectureDecision = {
  number: "ADR-0007",
  title: "Premier déploiement public",
  date: "2026-06-28",
  href: "#/decisions",
  summary:
    "TEMPOSYSTEM OS est publié avant les connexions IA afin de rendre visible son énergie fondatrice : gouvernance, mémoire, Conseil de Bord et temps partagé.",
};

export const publicDomains = [
  {
    domain: "temposystem.fr",
    purpose: "documentation et gouvernance françaises",
  },
  {
    domain: "temposystem.eu",
    purpose: "documentation et gouvernance internationales",
  },
  {
    domain: "manafrance.org",
    purpose: "première application civique",
  },
  {
    domain: "mana.bzh",
    purpose: "territoire pilote et expérimentation",
  },
];

export const narrativeMilestones = [
  {
    icon: "🏴",
    title: "Launch 000",
    detail: "TEMPOSYSTEM OS affirme publiquement son existence comme socle vivant.",
  },
  {
    icon: "⚓",
    title: "Premier Conseil",
    detail: "Le Conseil transforme les échanges en énergie de décision.",
  },
  {
    icon: "📜",
    title: "Première ADR",
    detail: "Les décisions quittent les conversations pour devenir mémoire durable.",
  },
  {
    icon: "🧭",
    title: "Gouvernance",
    detail: "Les fonctions permanentes sont séparées des implémentations IA.",
  },
  {
    icon: "🌍",
    title: "Premier domaine",
    detail: "temposystem.fr et temposystem.eu préparent l'accueil public du système.",
  },
  {
    icon: "🚀",
    title: "Première application",
    detail: "MANA devient le premier terrain d'application civique.",
  },
  {
    icon: "🧠",
    title: "Étoile cognitive",
    detail: "Le Conseil devient un cœur énergétique entouré d'agents en orbite.",
  },
];
