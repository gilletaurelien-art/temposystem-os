import { Section } from "../components/Section";

const decisions = [
  "ADR-0001 - Naissance de TEMPOSYSTEM OS",
  "ADR-0002 - Architecture des rôles",
  "ADR-0003 - La mémoire comme actif stratégique",
  "ADR-0005 - Équipage 2042",
  "ADR-0006 - Interface publique vivante",
  "ADR-0007 - Premier déploiement public",
  "ADR-0008 - Interface principale vivante",
  "ADR-0009 - Cortex vivant et énergie du Conseil",
  "ADR-0010 - TEMPOSYSTEM is energy",
];

export function DecisionsPage() {
  return (
    <main>
      <Section
        eyebrow="Décisions d'Architecture (ADR)"
        title="Les décisions transforment l'énergie en mémoire"
        intro="Les Architecture Decision Records conservent le contexte, les alternatives et les conséquences des choix structurants, afin que l'énergie des échanges ne disparaisse pas."
      >
        <div className="grid gap-4">
          {decisions.map((decision) => (
            <article
              key={decision}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
            >
              <h3 className="text-lg font-semibold text-slate-50">
                {decision}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Décision conservée dans le registre ADR : une trace durable de
                l'énergie de décision.
              </p>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
