import { Section } from "../components/Section";

export function VisionPage() {
  return (
    <main>
      <Section
        eyebrow="Vision"
        title="TEMPOSYSTEM OS n'est pas une application"
        intro="C'est un système d'exploitation de la coopération entre humains et intelligences artificielles."
      >
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            "Transformer les conversations en décisions traçables.",
            "Préserver la mémoire comme actif stratégique.",
            "Permettre à plusieurs applications de s'appuyer sur un même protocole de coopération.",
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
