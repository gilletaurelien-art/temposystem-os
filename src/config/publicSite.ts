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
    supportingDetail: "Cycle local prêt : question, consensus, décision.",
  },
  {
    signal: "🟢",
    title: "Mémoire",
    value: "GitHub synchronisé",
    detail: "ADR disponibles.",
    supportingDetail: "Livre de Bord actif.",
  },
  {
    signal: "🟢",
    title: "Gouvernance",
    value: "Architecture documentée",
    detail: "Décisions traçables.",
    supportingDetail: "Le Capitaine conserve l'arbitrage final.",
  },
  {
    signal: "🟢",
    title: "Applications",
    value: "MANA",
    detail: "Première application active.",
    supportingDetail: "Cas d'usage civique et territorial.",
  },
  {
    signal: "🟡",
    title: "Timonier",
    value: "Prototype",
    detail: "Dispatch local.",
    supportingDetail: "Règles simples, sans connexion IA.",
  },
  {
    signal: "🟡",
    title: "API IA",
    value: "Non connectées",
    detail: "Architecture prête.",
    supportingDetail: "Aucun appel externe dans Cockpit 001.",
  },
];

export const cockpitCouncilSnapshot = {
  lastConsultation: "29 juin 2026 · 09:12",
  question:
    "Comment transformer TEMPOSYSTEM OS en infrastructure publique vivante sans connecter encore d'API externe ?",
  consensus:
    "Le Conseil recommande d'exposer l'état du système, la mémoire ADR, la gouvernance et MANA comme signaux opérationnels plutôt que comme promesses produit.",
  decision:
    "Le Capitaine valide Cockpit 001 : TEMPOSYSTEM présente désormais son fonctionnement en cours, avec des données locales mockées et une mémoire durable.",
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
    "TEMPOSYSTEM OS est publié avant les connexions IA afin de rendre visible sa gouvernance, sa mémoire et son Conseil de Bord dès sa fondation.",
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
    detail: "TEMPOSYSTEM OS affirme publiquement son existence.",
  },
  {
    icon: "⚓",
    title: "Premier Conseil",
    detail: "Le Conseil de Bord local éclaire les décisions du Capitaine.",
  },
  {
    icon: "📜",
    title: "Première ADR",
    detail: "Les décisions structurantes quittent les conversations pour la mémoire durable.",
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
];
