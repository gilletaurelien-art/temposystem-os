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
        </div>
      </Section>
    </main>
  );
}
