import type { Agent } from "../types";

interface RoleCardProps {
  agent: Agent;
  compact?: boolean;
}

export function RoleCard({ agent, compact = false }: RoleCardProps) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.045] p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-50">
            <span aria-hidden="true">{agent.emoji}</span> {agent.name}
          </h3>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            {agent.description}
          </p>
        </div>
        <span className="shrink-0 rounded-full border border-white/10 px-3 py-1 text-xs font-medium text-slate-300">
          {agent.status === "active"
            ? "Actif"
            : agent.status === "available"
              ? "Disponible"
              : "Futur"}
        </span>
      </div>

      {!compact ? (
        <div className="mt-5 flex flex-wrap gap-2">
          {agent.responsibilities.slice(0, 6).map((responsibility) => (
            <span
              key={responsibility}
              className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-100"
            >
              {responsibility}
            </span>
          ))}
        </div>
      ) : null}
    </article>
  );
}
