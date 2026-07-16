/**
 * Les fonctions permanentes — résolution « 1 + 9 » (arbitrage Capitaine, 16/07/2026).
 *
 * Le CAPITAINE est le cœur : il n'orbite pas, il arbitre (battement central lent).
 * NEUF fonctions gravitent autour de lui — dont le Quartier-Maître, réintégré
 * (l'ancienne « légende des neuf orbites » plaçait le Capitaine en orbite et l'omettait).
 *
 * Les modèles d'IA changent ; les fonctions demeurent. La couleur CODE l'énergie
 * de la fonction (charte §7) ; la signature décrit son rythme visuel (charte §17).
 */

export type Bi = { fr: string; en: string };

export interface PermanentFunction {
  id: string;
  /** Nom de la fonction (ce qu'elle fait) */
  fonction: Bi;
  /** Nom d'équipage (métaphore maritime) */
  equipage: Bi;
  mission: Bi;
  /** Token couleur de la charte (var CSS, ex. "--ts-violet") */
  color: string;
  /** Signature rythmique (charte §17) — d'abord visuelle, sonore plus tard */
  signature: Bi;
}

/** Le cœur — n'orbite pas. */
export const CORE_FUNCTION: PermanentFunction = {
  id: "capitaine",
  fonction: { fr: "Vision", en: "Vision" },
  equipage: { fr: "Capitaine", en: "Captain" },
  mission: {
    fr: "Porte la vision, fixe le cap et arbitre les décisions.",
    en: "Carries the vision, sets the course and arbitrates decisions.",
  },
  color: "--ts-orange",
  signature: {
    fr: "Battement central lent et stable.",
    en: "Slow, steady central beat.",
  },
};

/** Les neuf orbites. */
export const ORBIT_FUNCTIONS: PermanentFunction[] = [
  {
    id: "timonier",
    fonction: { fr: "Cohérence", en: "Coherence" },
    equipage: { fr: "Timonier", en: "Helmsman" },
    mission: {
      fr: "Veille à la cohérence de l'ensemble et garde le cap malgré les tempêtes.",
      en: "Keeps the whole coherent and holds the course through storms.",
    },
    color: "--ts-violet",
    signature: { fr: "Rythme régulier qui réaligne les autres.", en: "Steady rhythm that realigns the others." },
  },
  {
    id: "quartier-maitre",
    fonction: { fr: "Stratégie", en: "Strategy" },
    equipage: { fr: "Quartier-Maître", en: "Quartermaster" },
    mission: {
      fr: "Architecture globale, gouvernance et synthèse des forces en présence.",
      en: "Global architecture, governance and synthesis of the forces at play.",
    },
    color: "--ts-white",
    signature: { fr: "Accord de synthèse reliant plusieurs signatures.", en: "Synthesis chord linking several signatures." },
  },
  {
    id: "charpentier",
    fonction: { fr: "Construction", en: "Construction" },
    equipage: { fr: "Charpentier", en: "Carpenter" },
    mission: {
      fr: "Conçoit, construit et fait évoluer l'infrastructure pour qu'elle traverse les décennies.",
      en: "Designs, builds and evolves the infrastructure to last decades.",
    },
    color: "--ts-blue",
    signature: { fr: "Séquence progressive et structurée.", en: "Progressive, structured sequence." },
  },
  {
    id: "calfat",
    fonction: { fr: "Protection", en: "Protection" },
    equipage: { fr: "Calfat", en: "Caulker" },
    mission: {
      fr: "Protège, répare, audite et renforce le système avant que les failles n'apparaissent.",
      en: "Protects, repairs, audits and hardens the system before flaws appear.",
    },
    color: "--ts-green",
    signature: { fr: "Impulsions courtes de contrôle et de correction.", en: "Short control-and-correction pulses." },
  },
  {
    id: "enlumineur",
    fonction: { fr: "Graphisme", en: "Design" },
    equipage: { fr: "Enlumineur", en: "Illuminator" },
    mission: {
      fr: "Donne une identité visuelle au système, rend les idées lisibles et inspirantes.",
      en: "Gives the system a visual identity, makes ideas legible and inspiring.",
    },
    color: "--ts-magenta",
    signature: { fr: "Variations chromatiques et harmoniques.", en: "Chromatic, harmonic variations." },
  },
  {
    id: "cartographe",
    fonction: { fr: "Connaissance", en: "Knowledge" },
    equipage: { fr: "Cartographe", en: "Cartographer" },
    mission: {
      fr: "Observe, documente et relie les connaissances pour construire la mémoire du système.",
      en: "Observes, documents and links knowledge to build the system's memory.",
    },
    color: "--ts-blue",
    signature: { fr: "Traces longues et connexions entre événements.", en: "Long traces and connections between events." },
  },
  {
    id: "vigie",
    fonction: { fr: "Anticipation", en: "Anticipation" },
    equipage: { fr: "Vigie", en: "Lookout" },
    mission: {
      fr: "Observe l'horizon, détecte les évolutions, les risques et les opportunités.",
      en: "Watches the horizon, detects shifts, risks and opportunities.",
    },
    color: "--ts-yellow",
    signature: { fr: "Signaux espacés provenant de l'horizon.", en: "Spaced signals arriving from the horizon." },
  },
  {
    id: "gardien",
    fonction: { fr: "Éthique", en: "Ethics" },
    equipage: { fr: "Gardien", en: "Guardian" },
    mission: {
      fr: "Veille aux principes fondateurs et questionne les décisions pour préserver le sens.",
      en: "Guards the founding principles and questions decisions to preserve meaning.",
    },
    color: "--ts-white",
    signature: { fr: "Pulsation grave, rare et protectrice.", en: "Deep, rare, protective pulse." },
  },
  {
    id: "messager",
    fonction: { fr: "Communication", en: "Communication" },
    equipage: { fr: "Messager", en: "Messenger" },
    mission: {
      fr: "Fait circuler les idées et relie les intelligences, les humains et les territoires.",
      en: "Circulates ideas and links intelligences, humans and territories.",
    },
    color: "--ts-cyan",
    signature: { fr: "Signaux rapides circulant entre les orbites.", en: "Fast signals travelling between orbits." },
  },
];

export const ALL_FUNCTIONS = [CORE_FUNCTION, ...ORBIT_FUNCTIONS];
