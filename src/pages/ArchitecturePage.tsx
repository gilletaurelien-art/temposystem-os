import { Section } from "../components/Section";
import { useLang } from "../lib/lang";

const copy = {
  eyebrow: { fr: "Architecture", en: "Architecture" },
  title: { fr: "Une architecture pour faire circuler l'énergie", en: "An architecture to circulate the energy" },
  intro: {
    fr: "Le système sépare les fonctions permanentes, les implémentations IA, la mémoire durable et les applications afin que l'énergie collective reste lisible et gouvernable.",
    en: "The system separates permanent functions, AI implementations, durable memory and applications so the collective energy stays readable and governable.",
  },
  layers: {
    fr: ["Capitaine", "Conseil de Bord", "Timonier", "Équipage 2042", "Mémoire Git + ADR", "Applications"],
    en: ["Captain", "Bridge Council", "Helmsman", "Crew 2042", "Git Memory + ADR", "Applications"],
  },
  layerText: {
    fr: "Couche stable de TEMPOSYSTEM OS : elle capte, oriente ou mémorise une part de l'énergie produite par la coopération.",
    en: "A stable layer of TEMPOSYSTEM OS: it captures, steers or stores a share of the energy produced by cooperation.",
  },
} as const;

export function ArchitecturePage() {
  const { lang } = useLang();
  return (
    <main>
      <Section eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} intro={copy.intro[lang]}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {copy.layers[lang].map((layer) => (
            <article key={layer} className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
              <h3 className="text-xl font-semibold text-slate-50">{layer}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{copy.layerText[lang]}</p>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
