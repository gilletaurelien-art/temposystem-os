import { Section } from "../components/Section";
import { useLang } from "../lib/lang";

const copy = {
  eyebrow: { fr: "Vision", en: "Vision" },
  title: { fr: "TEMPOSYSTEM est une énergie", en: "TEMPOSYSTEM is an energy" },
  intro: {
    fr: "Une énergie produite par le temps partagé, synchronisée par les intelligences et éclairée par les décisions.",
    en: "An energy produced by shared time, synchronized by intelligences and illuminated by decisions.",
  },
  items: {
    fr: [
      "Transformer les conversations en impulsions de décision traçables.",
      "Préserver la mémoire pour que l'énergie collective ne se disperse pas.",
      "Permettre à plusieurs applications de s'alimenter au même protocole de coopération.",
    ],
    en: [
      "Turn conversations into traceable decision impulses.",
      "Preserve memory so the collective energy does not scatter.",
      "Let several applications draw from the same cooperation protocol.",
    ],
  },
} as const;

export function VisionPage() {
  const { lang } = useLang();
  return (
    <main>
      <Section eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} intro={copy.intro[lang]}>
        <div className="grid gap-5 lg:grid-cols-3">
          {copy.items[lang].map((item) => (
            <article key={item} className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
              <p className="text-lg leading-8 text-slate-200">{item}</p>
            </article>
          ))}
        </div>
      </Section>
    </main>
  );
}
