import { CortexMap } from "../components/CortexMap";
import HeroTransferScene from "../components/HeroTransferScene";
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
import { useLang } from "../lib/lang";

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

const copy = {
  hero: {
    description: {
      fr: "Une énergie produite par le temps partagé, synchronisée par la mémoire et orientée par les décisions collectives.",
      en: "An energy produced by shared time, synchronized by memory and steered by collective decisions.",
    },
    cta1: { fr: "Entrer dans le Conseil de Bord", en: "Enter the Bridge Council" },
    cta2: { fr: "Lire la vision", en: "Read the vision" },
    tags: {
      fr: ["Temps partagé", "Mémoire active", "Décisions éclairées"],
      en: ["Shared time", "Active memory", "Informed decisions"],
    },
    eqTime: { fr: "1 seconde", en: "1 second" },
    eqMana: { fr: "1 mana", en: "1 mana" },
    eqAria: { fr: "1 seconde égale 1 mana", en: "1 second equals 1 mana" },
  },
  why: {
    eyebrow: { fr: "Pourquoi TEMPOSYSTEM ?", en: "Why TEMPOSYSTEM?" },
    title: { fr: "Transformer le temps partagé en énergie collective", en: "Turning shared time into collective energy" },
    p1: {
      fr: "Chaque jour, des millions d'heures sont consacrées à aider, transmettre, organiser ou protéger.",
      en: "Every day, millions of hours go into helping, teaching, organizing or protecting.",
    },
    p2: {
      fr: "Cette coopération reste souvent fragmentée et difficile à coordonner. Son énergie existe déjà, mais elle circule rarement dans un système commun.",
      en: "This cooperation often stays fragmented and hard to coordinate. Its energy already exists, but it rarely flows through a common system.",
    },
    p3: {
      fr: "TEMPOSYSTEM propose une infrastructure ouverte permettant d'organiser cette énergie, de conserver la mémoire des décisions et de synchroniser le travail collectif entre humains et intelligences artificielles.",
      en: "TEMPOSYSTEM offers an open infrastructure to organize this energy, keep the memory of decisions and synchronize collective work between humans and artificial intelligences.",
    },
  },
  cortex: {
    title: { fr: "Le cœur énergétique de l'intelligence collective", en: "The energy core of collective intelligence" },
    intro: {
      fr: "Le Conseil n'est plus un tableau de bord. Il devient un système solaire cognitif : un cœur vivant alimenté par les échanges, la mémoire, les signaux et les consensus.",
      en: "The Council is no longer a dashboard. It becomes a cognitive solar system: a living core fed by exchanges, memory, signals and consensus.",
    },
  },
  etat: {
    eyebrow: { fr: "État de l'énergie coopérative", en: "State of the cooperative energy" },
    title: { fr: "Le système montre ce qui l'alimente", en: "The system shows what feeds it" },
    intro: {
      fr: "La phase expérimentale expose les signaux qui nourrissent le cœur : Conseil, mémoire, gouvernance, applications, orchestration et connexions futures.",
      en: "The experimental phase exposes the signals that feed the core: Council, memory, governance, applications, orchestration and future connections.",
    },
  },
  conseil: {
    eyebrow: { fr: "Conseil de Bord", en: "Bridge Council" },
    title: { fr: "Les décisions alimentent le cœur", en: "Decisions feed the core" },
    intro: {
      fr: "Le Conseil ne présente pas seulement des rôles. Chaque question, consensus et décision devient une impulsion qui nourrit la mémoire et rayonne dans tout le système.",
      en: "The Council does not just present roles. Every question, consensus and decision becomes an impulse that feeds the memory and radiates through the whole system.",
    },
    lastConsultation: { fr: "Dernière consultation", en: "Last consultation" },
    validated: { fr: "Décision validée", en: "Decision validated" },
    question: { fr: "Question", en: "Question" },
    consensus: { fr: "Consensus", en: "Consensus" },
    captainDecision: { fr: "Décision du Capitaine", en: "Captain's decision" },
    functions: { fr: "Fonctions consultées", en: "Functions consulted" },
  },
  adr: {
    eyebrow: { fr: "Décisions d'Architecture (ADR)", en: "Architecture Decisions (ADR)" },
    title: { fr: "La mémoire stabilise l'énergie", en: "Memory stabilizes the energy" },
    intro: {
      fr: "Chaque décision structurante conserve son contexte, ses alternatives et ses conséquences. L'énergie de la conversation devient une trace durable.",
      en: "Every structuring decision keeps its context, its alternatives and its consequences. The energy of the conversation becomes a durable trace.",
    },
    featured: { fr: "Décision mise en avant", en: "Featured decision" },
    date: { fr: "Date", en: "Date" },
    openRegister: { fr: "Ouvrir le registre ADR", en: "Open the ADR register" },
  },
  livre: {
    eyebrow: { fr: "Livre de Bord", en: "Logbook" },
    title: { fr: "L'énergie laisse une trace", en: "Energy leaves a trace" },
    intro: {
      fr: "Les jalons racontent comment TEMPOSYSTEM transforme le temps partagé en mémoire, en décisions et en énergie collective.",
      en: "The milestones tell how TEMPOSYSTEM turns shared time into memory, decisions and collective energy.",
    },
  },
  mana: {
    eyebrow: { fr: "Première application", en: "First application" },
    title: { fr: "MANA, premier terrain de l'énergie civique", en: "MANA, first ground of civic energy" },
    p1: {
      fr: "MANA est la première application civique construite sur TEMPOSYSTEM OS, dédiée à la reconnaissance du temps donné, de l'entraide et de la coopération territoriale.",
      en: "MANA is the first civic application built on TEMPOSYSTEM OS, dedicated to recognizing given time, mutual aid and territorial cooperation.",
    },
    p2: {
      fr: "MANA sert de premier cas d'usage : transformer le temps donné, l'entraide et les contributions locales en énergie visible, mémorisée et gouvernable.",
      en: "MANA serves as the first use case: turning given time, mutual aid and local contributions into visible, remembered and governable energy.",
    },
    discover: { fr: "Découvrir MANA →", en: "Discover MANA →" },
  },
} as const;

export function HomePage() {
  const { lang } = useLang();

  return (
    <main>
      <section className="os-hero relative border-b border-white/10">
        <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl flex-col items-center justify-center gap-5 px-5 py-14 text-center sm:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#a78bfa]">
            TEMPOSYSTEM IS ENERGY
          </p>
          <h1 className="text-5xl font-semibold text-slate-50 sm:text-6xl lg:text-7xl">
            TEMPOSYSTEM OS
          </h1>

          <p className="source-equation" aria-label={copy.hero.eqAria[lang]}>
            <span className="eq-part eq-time">{copy.hero.eqTime[lang]}</span>
            <span className="eq-sign">=</span>
            <span className="eq-part eq-mana">{copy.hero.eqMana[lang]}</span>
          </p>

          {/* Module LULLABY — papillon-comète + compteurs de transfert */}
          <HeroTransferScene />

          <p className="max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
            {copy.hero.description[lang]}
          </p>

          <div className="mt-1 flex flex-col gap-3 sm:flex-row">
            <a
              href="#/council"
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#6366f1] to-[#7c3aed] px-6 text-sm font-semibold text-white shadow-lg transition hover:from-[#818cf8] hover:to-[#8b5cf6]"
            >
              {copy.hero.cta1[lang]}
            </a>
            <a
              href="#/vision"
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/20 bg-white/5 px-6 text-sm font-semibold text-slate-50 transition hover:bg-white/10"
            >
              {copy.hero.cta2[lang]}
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-2 text-xs font-medium uppercase text-slate-300">
            {copy.hero.tags[lang].map((tag) => (
              <span key={tag} className="rounded-full border border-white/15 bg-white/5 px-3 py-2">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Section id="pourquoi" eyebrow={copy.why.eyebrow[lang]} title={copy.why.title[lang]}>
        <div className="max-w-4xl space-y-5 text-base leading-8 text-slate-300">
          <p>{copy.why.p1[lang]}</p>
          <p>{copy.why.p2[lang]}</p>
          <p>{copy.why.p3[lang]}</p>
        </div>
      </Section>

      <Section
        id="cortex-vivant"
        eyebrow="TEMPOSYSTEM IS ENERGY"
        title={copy.cortex.title[lang]}
        intro={copy.cortex.intro[lang]}
        className="bg-[#030711]"
        wide
      >
        <CortexMap />
      </Section>

      <Section
        id="etat"
        eyebrow={copy.etat.eyebrow[lang]}
        title={copy.etat.title[lang]}
        intro={copy.etat.intro[lang]}
        className="bg-white/[0.025]"
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cockpitStatusCards.map((card) => (
            <StatusCard
              key={card.title.fr}
              signal={card.signal}
              title={card.title[lang]}
              value={card.value[lang]}
              detail={card.detail[lang]}
              supportingDetail={card.supportingDetail[lang]}
            />
          ))}
        </div>
      </Section>

      <Section id="conseil" eyebrow={copy.conseil.eyebrow[lang]} title={copy.conseil.title[lang]} intro={copy.conseil.intro[lang]}>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
          <article className="rounded-lg border border-white/10 bg-white/[0.04] p-6 shadow-sm">
            <div className="flex flex-col gap-2 border-b border-white/10 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-400">{copy.conseil.lastConsultation[lang]}</p>
                <p className="mt-1 text-lg font-semibold text-slate-50">
                  {cockpitCouncilSnapshot.lastConsultation[lang]}
                </p>
              </div>
              <span className="w-fit rounded-full border border-emerald-300/20 bg-emerald-300/10 px-3 py-1 text-xs font-semibold uppercase text-emerald-100">
                {copy.conseil.validated[lang]}
              </span>
            </div>

            <div className="mt-6 grid gap-5">
              <div>
                <p className="text-sm font-semibold uppercase text-[#a78bfa]">{copy.conseil.question[lang]}</p>
                <p className="mt-2 text-base leading-7 text-slate-200">{cockpitCouncilSnapshot.question[lang]}</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase text-[#a78bfa]">{copy.conseil.consensus[lang]}</p>
                <p className="mt-2 text-base leading-7 text-slate-300">{cockpitCouncilSnapshot.consensus[lang]}</p>
              </div>
              <div>
                <p className="text-sm font-semibold uppercase text-[#a78bfa]">{copy.conseil.captainDecision[lang]}</p>
                <p className="mt-2 text-base leading-7 text-slate-200">{cockpitCouncilSnapshot.decision[lang]}</p>
              </div>
              <a
                href={cockpitCouncilSnapshot.adr.href}
                className="inline-flex w-fit items-center rounded-lg border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-50 transition hover:bg-white/10 hover:text-[#a78bfa]"
              >
                {cockpitCouncilSnapshot.adr.label} · {cockpitCouncilSnapshot.adr.title[lang]}
              </a>
            </div>
          </article>

          <aside className="rounded-lg border border-white/10 bg-[#07101d] p-5">
            <p className="text-sm font-semibold uppercase text-[#a78bfa]">{copy.conseil.functions[lang]}</p>
            <div className="mt-5 grid gap-3">
              {boardRoles.map((agent) => (
                <div key={agent.id} className="rounded-md border border-white/10 bg-white/[0.035] px-4 py-3">
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
        eyebrow={copy.adr.eyebrow[lang]}
        title={copy.adr.title[lang]}
        intro={copy.adr.intro[lang]}
        className="bg-white/[0.025]"
      >
        <article className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
          <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase text-[#a78bfa]">{copy.adr.featured[lang]}</p>
              <h3 className="mt-3 text-2xl font-semibold text-slate-50">
                {featuredArchitectureDecision.number} · {featuredArchitectureDecision.title[lang]}
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                {copy.adr.date[lang]} : {featuredArchitectureDecision.date}
              </p>
              <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">
                {featuredArchitectureDecision.summary[lang]}
              </p>
            </div>
            <a
              href={featuredArchitectureDecision.href}
              className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/5 px-4 text-sm font-semibold text-slate-50 transition hover:bg-white/10 hover:text-[#a78bfa]"
            >
              {copy.adr.openRegister[lang]}
            </a>
          </div>
        </article>
      </Section>

      <Section id="livre-de-bord" eyebrow={copy.livre.eyebrow[lang]} title={copy.livre.title[lang]} intro={copy.livre.intro[lang]}>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {narrativeMilestones.map((milestone) => (
            <div key={milestone.title.fr} className="rounded-lg border border-white/10 bg-white/[0.04] p-5">
              <p className="text-2xl" aria-hidden="true">{milestone.icon}</p>
              <h3 className="mt-3 text-lg font-semibold text-slate-50">{milestone.title[lang]}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-400">{milestone.detail[lang]}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="mana" eyebrow={copy.mana.eyebrow[lang]} title={copy.mana.title[lang]} className="bg-white/[0.025]">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-lg border border-white/10 bg-white/[0.04] p-6">
            <p className="text-lg leading-8 text-slate-200">{copy.mana.p1[lang]}</p>
            <p className="mt-5 text-sm leading-6 text-slate-400">{copy.mana.p2[lang]}</p>
            <a
              href="https://manafrance.org"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-gradient-to-r from-[#6366f1] to-[#7c3aed] px-5 text-sm font-semibold text-white transition hover:from-[#818cf8] hover:to-[#8b5cf6]"
            >
              {copy.mana.discover[lang]}
            </a>
          </div>
          <div className="grid gap-3">
            {publicDomains.map((domain) => (
              <a
                key={domain.domain}
                href={`https://${domain.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-lg border border-white/10 bg-[#07101d] p-4 transition hover:border-[#a78bfa]/30 hover:bg-white/[0.06]"
              >
                <p className="font-semibold text-slate-50 transition group-hover:text-[#a78bfa]">
                  {domain.domain} ↗
                </p>
                <p className="mt-2 text-sm text-slate-400">{domain.purpose[lang]}</p>
              </a>
            ))}
          </div>
        </div>
      </Section>
    </main>
  );
}
