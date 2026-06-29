import { Section } from "../components/Section";

export function VisionPage() {
  return (
    <main>
      <Section
        eyebrow="Vision"
        title="TEMPOSYSTEM est une énergie"
        intro="Une énergie produite par le temps partagé, synchronisée par les intelligences et éclairée par les décisions."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            "Transformer les conversations en impulsions de décision traçables.",
            "Préserver la mémoire pour que l'énergie collective ne se disperse pas.",
            "Permettre à plusieurs applications de s'alimenter au même protocole de coopération.",
          ].map((item) => (
            <article
              key={item}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-6"
            >
              <p className="text-lg leading-8 text-slate-200">{item}</p>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
