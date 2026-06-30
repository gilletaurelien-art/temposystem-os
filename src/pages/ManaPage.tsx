import { Section } from "../components/Section";

export function ManaPage() {
  return (
    <main>
      <Section
        eyebrow="MANA"
        title="La première application de l'énergie civique"
        intro="MANA reconnaît le temps donné, l'entraide et la coopération territoriale comme une énergie commune."
      >
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <p className="text-lg leading-8 text-slate-200">
            MANA permet de mettre TEMPOSYSTEM OS à l'épreuve d'un terrain réel :
            coopération civique, territoires pilotes, reconnaissance des
            contributions et gouvernance humaine. Le temps partagé devient un
            signal visible.
          </p>
          <p className="mt-5 text-sm leading-6 text-slate-400">
            Le socle reste volontairement générique pour que d'autres domaines
            puissent transformer leur coopération en énergie mémorisée et
            gouvernable.
          </p>
          <a
            href="https://manafrance.org"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-gradient-to-r from-[#6366f1] to-[#7c3aed] px-5 text-sm font-semibold text-white transition hover:from-[#818cf8] hover:to-[#8b5cf6]"
          >
            Découvrir MANA →
          </a>
        </div>
      </Section>
    </main>
  );
}
