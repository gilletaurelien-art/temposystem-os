import { Section } from "../components/Section";

export function ManaPage() {
  return (
    <main>
      <Section
        eyebrow="MANA"
        title="La première application civique construite sur TEMPOSYSTEM OS"
        intro="MANA est dédiée à la reconnaissance du temps donné, de l'entraide et de la coopération territoriale."
      >
        <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <p className="text-lg leading-8 text-slate-200">
            MANA permet de mettre TEMPOSYSTEM OS à l'épreuve d'un terrain réel :
            coopération civique, territoires pilotes, reconnaissance des
            contributions et gouvernance humaine.
          </p>
          <p className="mt-5 text-sm leading-6 text-slate-400">
            Le socle reste volontairement générique pour accueillir d'autres
            applications au-delà du premier domaine civique.
          </p>
        </div>
      </Section>
    </main>
  );
}
