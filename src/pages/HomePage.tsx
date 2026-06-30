import { CortexMap } from "../components/CortexMap";
import { Section } from "../components/Section";
import { StatusCard } from "../components/StatusCard";
import { crewAgents } from "../config/agents";
import {
  cockpitCouncilSnapshot,
  cockpitStatusCards,
  featuredArchitectureDecision,
  narrativeMilestones,
  publicDomains,
} from "../config/publicSite";

const roleById = (id: string) => crewAgents.find((agent) => agent.id === id);

const boardRoleIds = [
  "captain",
  "helmsman",
  "quartermaster",
  "master-carpenter",
  "master-caulker",
  "master-illuminator",
];

const boardRoles = boardRoleIds
  .map((id) => roleById(id))
  .filter((agent): agent is NonNullable<typeof agent> => Boolean(agent));

export function HomePage() {
  return (
    <main>
      <section className="relative border-b border-white/10">

        <div className="relative mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase text-[#a78bfa]">
              TEMPOSYSTEM IS ENERGY
            </p>
            <h1 className="mt-5 text-5xl font-semibold text-slate-50 sm:text-6xl lg:text-7xl">
              TEMPOSYSTEM OS
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Une énergie produite par le temps partagé, synchronisée par la
              mémoire et orientée par les décisions collectives.
            </p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-medium uppercase text-slate-300">
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2">
                Temps partagé
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2">
                Mémoire active
              </span>
              <span className="rounded-full border border-white/15 bg-white/5 px-3 py-2">
                Décisions éclairées
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#/council"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#6366f1] to-[#7c3aed] px-6 text-sm font-semibold text-white shadow-lg transition hover:from-[#818cf8] hover:to-[#8b5cf6]"
              >
                Entrer dans le Conseil de Bord
              </a>
              <a
                href="#/vision"
                className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 text-sm font-semibold text-slate-50 transition hover:bg-white/10"
              >
                Lire la vision
              </a>
            </div>
          </div>
        </div>
      </section>

      <Section
        id="pourquoi"
        eyebrow="Pourquoi TEMPOSYSTEM ?"
        title="Transformer le temps partagé en énergie collective"
      >
        <div className="max-w-4xl space-y-5 text-base leading-8 text-slate-300">
          <p>
            Chaque jour, des millions d'heures sont consacrées à aider,
            transmettre, organiser ou protéger.
          </p>
          <p>
            Cette coopération reste souvent fragmentée et difficile à
            coordonner. Son énergie existe déjà, mais elle circule rarement
            dans un système commun.
          </p>
          <p>
            TEMPOSYSTEM propose une infrastructure ouverte permettant
            d'organiser cette énergie, de conserver la mémoire des décisions
            et de synchroniser le travail collectif entre humains et
            intelligences artificielles.
          </p>
        </div>
      </Section>

      <Section
        id="cortex-vivant"
        eyebrow="TEMPOSYSTEM IS ENERGY"
        title="Le cœur énergétique de l'intelligence collective"
        intro="Le Conseil n'est plus un tableau de bord. Il devient un système solaire cognitif : un cœur vivant alimenté par les échanges, la mémoire, les signaux et les consensus."
        className="bg-[#030711]"
        wide
      >
        <CortexMap />
      </Section>

      <Section
        id="etat"
        eyebrow="État de l'énergie coopérative"
        title="Le système montre ce qui l'alimente"
        intro="La phase expérimentale expose les signaux qui nourrissent le cœur : Conseil, mémoire, gouvernance, applications, orchestration et connexions futures."
        className="bg-white/[0.025]"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cockpitStatusCards.map((card) => (
            <StatusCard key={card.title} {...card} />
          ))}
        </div>
      </Section>

      <Section
        id="conseil"
        eyebrow="Conseil de Bord"
        title="Les décisions alimentent le cœur"
        intro="Le Conseil ne présente pas seulement des rôles. Chaque question, consensus et décision devient une impulsion qui nourrit la mémoire et rayonne dans tout le système."
      >
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-sm">
            <div className="flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">
                  Dernière consultation
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-50">
                  {cockpitCouncilSnapshot.lastConsultation}
                </p>
              </div>
              <span className="w-fit rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase text-emerald-100">
                Décision validée
              </span>
            </div>

            <div className="mt-6 grid gap-5">
              <div>
                <p className="text-sm font-semibold uppercase text-[#a78bfa]">
                  Question
                </p>
                <p className="mt-2 text-base leading-7 text-slate-200">
                  {cockpitCouncilSnapshot.question}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase text-[#a78bfa]">
                  Consensus
                </p>
                <p className="mt-2 text-base leading-7 text-slate-300">
                  {cockpitCouncilSnapshot.consensus}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase text-[#a78bfa]">
                  Décision du Capitaine
                </p>
                <p className="mt-2 text-base leading-7 text-slate-200">
                  {cockpitCouncilSnapshot.decision}
                </p>
              </div>
              <a
                href={cockpitCouncilSnapshot.adr.href}
                className="inline-flex w-fit items-center rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-50 transition hover:bg-white/10 hover:text-[#a78bfa]"
              >
                {cockpitCouncilSnapshot.adr.label} ·{" "}
                {cockpitCouncilSnapshot.adr.title}
              </a>
            </div>
          </article>

          <aside className="rounded-lg border border-white/10 bg-[#07101d] p-5">
            <p className="text-sm font-semibold uppercase text-[#a78bfa]">
              Fonctions consultées
            </p>
            <div className="mt-5 grid gap-3">
              {boardRoles.map((agent) => (
                <div
                  key={agent.id}
                  className="rounded-md border border-white/10 bg-white/[0.035] px-4 py-3"
                >
                  <p className="font-semibold text-slate-50">
                    <span aria-hidden="true">{agent.emoji}</span> {agent.name}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    {agent.responsibilities.slice(0, 3).join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Section>

      <Section
        id="decisions-architecture"
        eyebrow="Décisions d'Architecture (ADR)"
        title="La mémoire stabilise l'énergie"
        intro="Chaque décision structurante conserve son contexte, ses alternatives et ses conséquences. L'énergie de la conversation devient une trace durable."
        className="bg-white/[0.025]"
      >
        <article className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-[#a78bfa]">
                Décision mise en avant
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-50">
                {featuredArchitectureDecision.number} ·{" "}
                {featuredArchitectureDecision.title}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Date : {featuredArchitectureDecision.date}
              </p>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                {featuredArchitectureDecision.summary}
              </p>
            </div>
            <a
              href={featuredArchitectureDecision.href}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-semibold text-slate-50 transition hover:bg-white/10 hover:text-[#a78bfa]"
            >
              Ouvrir le registre ADR
            </a>
          </div>
        </article>
      </Section>

      <Section
        id="mana"
        eyebrow="Première application"
        title="MANA, premier terrain de l'énergie civique"
        className="bg-white/[0.025]"
      >
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
            <p className="text-lg leading-8 text-slate-200">
              MANA est la première application civique construite sur
              TEMPOSYSTEM OS, dédiée à la reconnaissance du temps donné, de
              l'entraide et de la coopération territoriale.
            </p>
            <p className="mt-5 text-sm leading-6 text-slate-400">
              MANA sert de premier cas d'usage : transformer le temps donné,
              l'entraide et les contributions locales en énergie visible,
              mémorisée et gouvernable.
            </p>
          </div>
          <div className="grid gap-3">
            {publicDomains.map((domain) => (
              <div
                key={domain.domain}
                className="rounded-lg border border-white/10 bg-[#07101d] p-4"
              >
                <p className="font-semibold text-slate-50">{domain.domain}</p>
                <p className="mt-2 text-sm text-slate-400">{domain.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section
        id="livre-de-bord"
        eyebrow="Livre de Bord"
        title="L'énergie laisse une trace"
        intro="Les jalons racontent comment TEMPOSYSTEM transforme le temps partagé en mémoire, en décisions et en énergie collective."
      >
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {narrativeMilestones.map((milestone) => (
            <div
              key={milestone.title}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-2xl" aria-hidden="true">
                {milestone.icon}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-slate-50">
                {milestone.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {milestone.detail}
              </p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
