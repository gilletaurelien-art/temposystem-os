export const publicNavigation = [
  { label: "Accueil", route: "home", href: "#/" },
  { label: "Conseil de Bord", route: "council", href: "#/council" },
  { label: "Vision", route: "vision", href: "#/vision" },
  { label: "Architecture", route: "architecture", href: "#/architecture" },
  { label: "Décisions", route: "decisions", href: "#/decisions" },
  { label: "MANA", route: "mana", href: "#/mana" },
];

export const systemStatusCards = [
  {
    title: "Conseil de Bord",
    value: "Actif localement",
    detail: "Cycle décisionnel draft, consulted, decided.",
  },
  {
    title: "Timonier",
    value: "Règles locales",
    detail: "Préparation du dispatch par mots-clés.",
  },
  {
    title: "Mémoire",
    value: "Git + ADR",
    detail: "Décisions durables et journal de bord.",
  },
  {
    title: "Applications",
    value: "MANA",
    detail: "Premier projet construit sur le socle.",
  },
  {
    title: "Domaines",
    value: "FR / EU",
    detail: "temposystem.fr et temposystem.eu.",
  },
];

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

export const logMilestones = [
  "Initialisation projet",
  "Conseil de Bord",
  "Architecture des rôles",
  "Vision stratégique",
  "ADR",
  "Équipage 2042",
  "Launch 000",
];
