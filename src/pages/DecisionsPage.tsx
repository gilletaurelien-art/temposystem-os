import { Section } from "../components/Section";

const decisions = [
  "ADR-0001 - Naissance de TEMPOSYSTEM OS",
  "ADR-0002 - Architecture des rôles",
  "ADR-0003 - La mémoire comme actif stratégique",
  "ADR-0005 - Équipage 2042",
  "ADR-0006 - Interface publique vivante",
];

export function DecisionsPage() {
  return (
    <main>
      <Section
        eyebrow="Décisions"
        title="Les décisions importantes doivent survivre aux conversations"
        intro="Les ADR conservent le contexte, les alternatives et les conséquences des choix structurants."
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
                Décision conservée dans le registre ADR du journal de bord.
              </p>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
