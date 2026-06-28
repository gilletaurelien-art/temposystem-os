import { RoleCard } from "../components/RoleCard";
import { Section } from "../components/Section";
import { StatusCard } from "../components/StatusCard";
import { crew2042Agents, crewAgents } from "../config/agents";
import { logMilestones, publicDomains, systemStatusCards } from "../config/publicSite";

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
      <section className="relative overflow-hidden border-b border-white/10">
        <img
          src="/assets/temposystem-hero.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[#050914]/55" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#050914_0%,rgba(5,9,20,0.82)_38%,rgba(5,9,20,0.22)_100%)]" />

        <div className="relative mx-auto flex min-h-[calc(100vh-12rem)] w-full max-w-7xl items-center px-5 py-20 sm:px-8 lg:px-10">
          <div className="max-w-4xl">
            <p className="text-sm font-semibold uppercase text-[#d6b46a]">
              Interface vivante
            </p>
            <h1 className="mt-5 text-5xl font-semibold text-slate-50 sm:text-6xl lg:text-7xl">
              TEMPOSYSTEM OS
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Le système d'exploitation de la coopération entre humains et
              intelligences artificielles.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#/council"
                className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#d6b46a] px-6 text-sm font-semibold text-[#07101d] shadow-sm transition hover:bg-[#e4c77f]"
              >
                Explorer le Conseil de Bord
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
        id="etat"
        eyebrow="État du système"
        title="Un socle local, documenté et prêt à évoluer"
        intro="La première version publique montre ce qui existe déjà et ce qui est préparé pour les prochains jalons."
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {systemStatusCards.map((card) => (
            <StatusCard key={card.title} {...card} />
          ))}
        </div>
      </Section>

      <Section
        id="conseil"
        eyebrow="Conseil de Bord"
        title="Des fonctions permanentes, pas des marques d'IA"
        intro="Le Conseil de Bord réunit les responsabilités nécessaires à une décision claire. Les implémentations peuvent changer ; les fonctions restent."
        className="bg-white/[0.025]"
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {boardRoles.map((agent) => (
            <RoleCard key={agent.id} agent={agent} />
          ))}
        </div>
      </Section>

      <Section
        id="equipage-2042"
        eyebrow="Équipage 2042"
        title="Des capacités disponibles pour le futur Timonier"
        intro="Ces rôles ne sont pas membres principaux du Conseil actuel. Ils sont déclarés pour préparer des consultations plus fines."
      >
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {crew2042Agents.map((agent) => (
            <RoleCard key={agent.id} agent={agent} compact />
          ))}
        </div>
      </Section>

      <Section
        id="mana"
        eyebrow="Première application"
        title="MANA, le premier terrain d'application"
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
              MANA sert de premier cas d'usage sans enfermer TEMPOSYSTEM OS
              dans un seul domaine. Le socle doit rester réutilisable pour
              d'autres formes de coopération.
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
        title="Derniers jalons"
        intro="La mémoire documentaire conserve les étapes importantes plutôt que de les laisser disparaître dans les conversations."
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {logMilestones.map((milestone, index) => (
            <div
              key={milestone}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-5"
            >
              <p className="text-sm font-semibold text-[#d6b46a]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-slate-50">
                {milestone}
              </h3>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}
