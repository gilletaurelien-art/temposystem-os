import { Section } from "../components/Section";
import { useLang } from "../lib/lang";

const copy = {
  eyebrow: { fr: "MANA", en: "MANA" },
  title: { fr: "La première application de l'énergie civique", en: "The first application of civic energy" },
  intro: {
    fr: "MANA reconnaît le temps donné, l'entraide et la coopération territoriale comme une énergie commune.",
    en: "MANA recognizes given time, mutual aid and territorial cooperation as a common energy.",
  },
  p1: {
    fr: "MANA permet de mettre TEMPOSYSTEM OS à l'épreuve d'un terrain réel : coopération civique, territoires pilotes, reconnaissance des contributions et gouvernance humaine. Le temps partagé devient un signal visible.",
    en: "MANA puts TEMPOSYSTEM OS to the test of a real field: civic cooperation, pilot territories, recognition of contributions and human governance. Shared time becomes a visible signal.",
  },
  p2: {
    fr: "Le socle reste volontairement générique pour que d'autres domaines puissent transformer leur coopération en énergie mémorisée et gouvernable.",
    en: "The foundation stays deliberately generic so that other fields can turn their cooperation into remembered and governable energy.",
  },
  discover: { fr: "Découvrir MANA →", en: "Discover MANA →" },
} as const;

export function ManaPage() {
  const { lang } = useLang();
  return (
    <main>
      <Section eyebrow={copy.eyebrow[lang]} title={copy.title[lang]} intro={copy.intro[lang]}>
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <p className="text-lg leading-8 text-slate-200">{copy.p1[lang]}</p>
          <p className="mt-5 text-sm leading-6 text-slate-400">{copy.p2[lang]}</p>
          <a
            href="https://manafrance.org"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-gradient-to-r from-[#6366f1] to-[#7c3aed] px-5 text-sm font-semibold text-white transition hover:from-[#818cf8] hover:to-[#8b5cf6]"
          >
            {copy.discover[lang]}
          </a>
        </div>
      </Section>
    </main>
  );
}
