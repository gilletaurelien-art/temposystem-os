import type { Language } from "../lib/lang";

export type TempoOffer = {
  slug: string;
  name: string;
  audience: Record<Language, string>;
  promise: Record<Language, string>;
  uses: Record<Language, readonly string[]>;
};

export const tempoOffers: readonly TempoOffer[] = [
  {
    slug: "care",
    name: "CARE",
    audience: { fr: "Établissements sociaux et médico-sociaux", en: "Social and care institutions" },
    promise: { fr: "Coordonner les professionnels, les proches, les aidants et les partenaires autour des besoins réels.", en: "Coordinate professionals, relatives, caregivers and partners around real needs." },
    uses: { fr: ["parcours et situations", "réseau d'aidants", "actions partagées"], en: ["care pathways", "caregiver networks", "shared actions"] },
  },
  {
    slug: "civic",
    name: "CIVIC",
    audience: { fr: "Collectivités, CCAS et CIAS", en: "Local authorities and social services" },
    promise: { fr: "Relier les besoins du territoire, les services, les associations et les citoyens mobilisés.", en: "Connect local needs, public services, non-profits and engaged citizens." },
    uses: { fr: ["solidarités locales", "participation citoyenne", "coopération interservices"], en: ["local solidarity", "citizen participation", "cross-service cooperation"] },
  },
  {
    slug: "asso",
    name: "ASSO",
    audience: { fr: "Associations et fédérations", en: "Non-profits and federations" },
    promise: { fr: "Organiser les missions, les bénévoles et la coopération entre structures sans alourdir le quotidien.", en: "Organise missions, volunteers and cooperation without adding administrative burden." },
    uses: { fr: ["missions bénévoles", "animation de réseau", "temps partagé"], en: ["volunteer missions", "network coordination", "shared time"] },
  },
  {
    slug: "territories",
    name: "TERRITORIES",
    audience: { fr: "Opérateurs et alliances territoriales", en: "Territorial operators and alliances" },
    promise: { fr: "Donner un cadre commun à plusieurs organisations tout en préservant leur autonomie.", en: "Give multiple organisations a shared framework while preserving their autonomy." },
    uses: { fr: ["coalitions territoriales", "programmes multi-acteurs", "mémoire commune"], en: ["territorial coalitions", "multi-stakeholder programmes", "shared memory"] },
  },
  {
    slug: "impact",
    name: "IMPACT",
    audience: { fr: "Fondations et financeurs", en: "Foundations and funders" },
    promise: { fr: "Suivre les actions soutenues, les contributions et les apprentissages sans réduire l'impact à un tableau de chiffres.", en: "Track supported actions, contributions and learning without reducing impact to a spreadsheet." },
    uses: { fr: ["programmes soutenus", "coopérations financées", "preuves d'impact"], en: ["funded programmes", "supported cooperation", "impact evidence"] },
  },
  {
    slug: "rse",
    name: "RSE",
    audience: { fr: "Entreprises engagées", en: "Purpose-driven companies" },
    promise: { fr: "Transformer le temps et les compétences des équipes en actions utiles, coordonnées et traçables.", en: "Turn teams' time and skills into useful, coordinated and traceable action." },
    uses: { fr: ["mécénat de compétences", "journées solidaires", "partenariats associatifs"], en: ["skills-based volunteering", "solidarity days", "non-profit partnerships"] },
  },
];
