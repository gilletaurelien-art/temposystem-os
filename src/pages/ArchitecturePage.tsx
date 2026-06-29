import { Section } from "../components/Section";

const layers = [
  "Capitaine",
  "Conseil de Bord",
  "Timonier",
  "Équipage 2042",
  "Mémoire Git + ADR",
  "Applications",
];

export function ArchitecturePage() {
  return (
    <main>
      <Section
        eyebrow="Architecture"
        title="Une architecture pour faire circuler l'énergie"
        intro="Le système sépare les fonctions permanentes, les implémentations IA, la mémoire durable et les applications afin que l'énergie collective reste lisible et gouvernable."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {layers.map((layer) => (
            <article
              key={layer}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-6"
            >
              <h3 className="text-xl font-semibold text-slate-50">{layer}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Couche stable de TEMPOSYSTEM OS : elle capte, oriente ou
                mémorise une part de l'énergie produite par la coopération.
              </p>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
