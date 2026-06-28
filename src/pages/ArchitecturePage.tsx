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
        title="Une architecture de coopération, pas un simple assistant"
        intro="Le système sépare les fonctions permanentes, les implémentations IA, la mémoire durable et les applications construites dessus."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {layers.map((layer) => (
            <article
              key={layer}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-6"
            >
              <h3 className="text-xl font-semibold text-slate-50">{layer}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">
                Couche stable de TEMPOSYSTEM OS, documentée dans le journal de
                bord et extensible sans connexion externe dans le MVP.
              </p>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
