import { Section } from "../components/Section";
import { useLang } from "../lib/lang";

const copy = {
  eyebrow: { fr: "Décisions d'Architecture (ADR)", en: "Architecture Decisions (ADR)" },
  title: { fr: "Les décisions transforment l'énergie en mémoire", en: "Decisions turn energy into memory" },
  intro: {
    fr: "Les Architecture Decision Records conservent le contexte, les alternatives et les conséquences des choix structurants, afin que l'énergie des échanges ne disparaisse pas.",
    en: "Architecture Decision Records keep the context, the alternatives and the consequences of structuring choices, so the energy of exchanges does not vanish.",
  },
  cardText: {
    fr: "Décision conservée dans le registre ADR : une trace durable de l'énergie de décision.",
    en: "Decision kept in the ADR register: a durable trace of the decision energy.",
  },
  decisions: {
    fr: [
      "ADR-0001 - Naissance de TEMPOSYSTEM OS",
      "ADR-0002 - Architecture des rôles",
      "ADR-0003 - La mémoire comme actif stratégique",
      "ADR-0005 - Équipage 2042",
      "ADR-0006 - Interface publique vivante",
      "ADR-0007 - Premier déploiement public",
      "ADR-0008 - Interface principale vivante",
      "ADR-0009 - Cortex vivant et énergie du Conseil",
      "ADR-0010 - TEMPOSYSTEM is energy",
    ],
    en: [
      "ADR-0001 - Birth of TEMPOSYSTEM OS",
      "ADR-0002 - Role architecture",
      "ADR-0003 - Memory as a strategic asset",
      "ADR-0005 - Crew 2042",
      "ADR-0006 - Living public interface",
      "ADR-0007 - First public deployment",
      "ADR-0008 - Living main interface",
      "ADR-0009 - Living Cortex and Council energy",
      "ADR-0010 - TEMPOSYSTEM is energy",
    ],
  },
} as const;

export function DecisionsPage() {
  const { lang } = useLang();
  return (
    <main>
      <Section eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} intro={copy.intro[lang]}>
        <div className="grid gap-4">
          {copy.decisions[lang].map((decision) => (
            <article key={decision} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <h3 className="text-lg font-semibold text-slate-50">{decision}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{copy.cardText[lang]}</p>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
