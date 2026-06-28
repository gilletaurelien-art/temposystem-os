import { councilAgents } from "../agents/agents";

export function CouncilPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-ink">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-3 border-b border-slate-200 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-harbor">
              TEMPOSYSTEM OS
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-ink sm:text-4xl">
              Conseil de Bord
            </h1>
          </div>
          <span className="w-fit rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">
            MVP statique
          </span>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="flex flex-col gap-6">
            <label className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-stone-800">
                Question du Capitaine
              </span>
              <textarea
                className="min-h-40 resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-base leading-7 shadow-sm outline-none transition focus:border-harbor focus:ring-4 focus:ring-teal-100"
                placeholder="Quelle décision devons-nous éclairer aujourd'hui ?"
              />
            </label>

            <section aria-labelledby="agents-heading" className="flex flex-col gap-4">
              <div className="flex items-center justify-between gap-3">
                <h2 id="agents-heading" className="text-xl font-semibold">
                  Agents
                </h2>
                <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                  4 rôles
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {councilAgents.map((agent) => (
                  <article
                    key={agent.id}
                    className="flex min-h-48 flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-semibold">
                            <span aria-hidden="true">{agent.symbol}</span>{" "}
                            {agent.name}
                          </h3>
                          <p className="mt-1 text-sm text-slate-600">
                            {agent.domain}
                          </p>
                        </div>
                      </div>
                      <p className="mt-4 text-sm leading-6 text-slate-700">
                        {agent.stance}
                      </p>
                    </div>
                    <p className="mt-5 rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-500">
                      En attente de réponse.
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="flex flex-col gap-5">
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Consensus</h2>
              <p className="mt-3 min-h-32 rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-sm leading-6 text-slate-500">
                En attente de synthèse.
              </p>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <label className="flex flex-col gap-3">
                <span className="text-lg font-semibold">
                  Décision du Capitaine
                </span>
                <textarea
                  className="min-h-36 resize-y rounded-md border border-slate-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-harbor focus:ring-4 focus:ring-teal-100"
                  placeholder="Décision retenue, justification et prochain mouvement."
                />
              </label>
            </section>

            <button
              type="button"
              disabled
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-slate-300 px-5 text-sm font-semibold text-slate-600 shadow-sm"
            >
              Créer une issue GitHub
            </button>
          </aside>
        </section>
      </div>
    </main>
  );
}
