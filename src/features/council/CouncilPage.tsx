import { useMemo, useState } from "react";
import { councilAgents, crew2042Agents } from "../../config/agents";
import type { CouncilSession, CouncilSessionStatus } from "../../types";
import {
  generateMockCouncilConsensus,
  generateMockCouncilResponses,
} from "./mockCouncil";

const makeLocalId = (prefix: string) =>
  `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const createDraftSession = (): CouncilSession => {
  const createdAt = new Date().toISOString();

  return {
    id: makeLocalId("session"),
    question: {
      id: makeLocalId("question"),
      text: "",
      createdAt,
    },
    responses: [],
    consensus: null,
    decision: null,
    status: "draft",
    createdAt,
  };
};

const statusLabel: Record<CouncilSessionStatus, string> = {
  draft: "Brouillon",
  consulted: "Conseil consulté",
  decided: "Décision validée",
};

export function CouncilPage() {
  const [session, setSession] = useState<CouncilSession>(() =>
    createDraftSession(),
  );
  const [decisionText, setDecisionText] = useState("");

  const responsesByAgent = useMemo(
    () =>
      new Map(
        session.responses.map((response) => [response.agentId, response]),
      ),
    [session.responses],
  );

  const canConsult = session.question.text.trim().length > 0;
  const canValidate =
    session.status === "consulted" &&
    Boolean(session.consensus) &&
    decisionText.trim().length > 0;

  const updateQuestion = (text: string) => {
    if (session.status !== "draft") {
      setDecisionText("");
    }

    setSession((currentSession) => {
      if (currentSession.status === "draft") {
        return {
          ...currentSession,
          question: {
            ...currentSession.question,
            text,
          },
        };
      }

      const createdAt = new Date().toISOString();

      return {
        id: makeLocalId("session"),
        question: {
          id: makeLocalId("question"),
          text,
          createdAt,
        },
        responses: [],
        consensus: null,
        decision: null,
        status: "draft",
        createdAt,
      };
    });
  };

  const consultCouncil = () => {
    const questionText = session.question.text.trim();

    if (!questionText) {
      return;
    }

    const question = {
      ...session.question,
      text: questionText,
    };
    const responses = generateMockCouncilResponses(question);
    const consensus = generateMockCouncilConsensus(question, responses);

    setDecisionText("");
    setSession({
      ...session,
      question,
      responses,
      consensus,
      decision: null,
      status: "consulted",
      decidedAt: undefined,
    });
  };

  const validateDecision = () => {
    const content = decisionText.trim();

    if (!session.consensus || !content) {
      return;
    }

    const decidedAt = new Date().toISOString();

    setSession({
      ...session,
      decision: {
        id: makeLocalId("decision"),
        questionId: session.question.id,
        content,
        decidedBy: "Capitaine",
        decidedAt,
      },
      status: "decided",
      decidedAt,
    });
  };

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
            {statusLabel[session.status]}
          </span>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="flex min-w-0 flex-col gap-6">
            <label className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-slate-800">
                Question du Capitaine
              </span>
              <textarea
                value={session.question.text}
                onChange={(event) => updateQuestion(event.target.value)}
                className="min-h-40 resize-y rounded-lg border border-slate-300 bg-white px-4 py-3 text-base leading-7 shadow-sm outline-none transition focus:border-harbor focus:ring-4 focus:ring-teal-100"
                placeholder="Quelle décision devons-nous éclairer aujourd'hui ?"
              />
            </label>

            <button
              type="button"
              disabled={!canConsult}
              onClick={consultCouncil}
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-harbor px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-800 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
            >
              Consulter le Conseil
            </button>

            <section
              aria-labelledby="council-heading"
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 id="council-heading" className="text-xl font-semibold">
                  Conseil de Bord
                </h2>
                <span className="rounded-full border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-600">
                  Fonctions permanentes
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {councilAgents.map((agent) => {
                  const response = responsesByAgent.get(agent.id);

                  return (
                    <article
                      key={agent.id}
                      className="flex min-h-64 flex-col justify-between rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-semibold">
                              <span aria-hidden="true">{agent.emoji}</span>{" "}
                              {agent.name}
                            </h3>
                            <p className="mt-1 text-sm text-slate-600">
                              {agent.responsibilities.join(", ")}
                            </p>
                          </div>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-slate-700">
                          {agent.description}
                        </p>
                        <p className="mt-3 text-xs font-medium text-slate-500">
                          Implémentation actuelle :{" "}
                          {agent.implementation.name}
                        </p>
                      </div>

                      <div className="mt-5 rounded-md border border-dashed border-slate-300 bg-slate-50 px-3 py-3 text-sm text-slate-600">
                        {response ? (
                          <div className="flex flex-col gap-3">
                            <p className="leading-6">{response.summary}</p>
                            <p>
                              <span className="font-semibold">
                                Recommandation :
                              </span>{" "}
                              {response.recommendation}
                            </p>
                          </div>
                        ) : (
                          <p>En attente de consultation.</p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section
              aria-labelledby="extended-crew-heading"
              className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <h2
                  id="extended-crew-heading"
                  className="text-base font-semibold"
                >
                  Équipage étendu
                </h2>
                <span className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600">
                  Capacités 2042
                </span>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {crew2042Agents.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-center justify-between gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-slate-800">
                        <span aria-hidden="true">{agent.emoji}</span>{" "}
                        {agent.name}
                      </p>
                      <p className="truncate text-xs text-slate-500">
                        {agent.responsibilities.slice(0, 3).join(", ")}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-white px-2 py-1 text-xs font-medium text-slate-600">
                      {agent.status === "future" ? "Non sollicité" : "Disponible"}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="flex min-w-0 flex-col gap-5">
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold">Consensus du Conseil</h2>
              <div className="mt-3 min-h-36 rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                {session.consensus ? (
                  <div className="flex flex-col gap-3">
                    <p>{session.consensus.summary}</p>
                    <div>
                      <p className="font-semibold text-slate-800">
                        Points d'attention
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5">
                        {session.consensus.openQuestions.map((question) => (
                          <li key={question}>{question}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500">En attente de synthèse.</p>
                )}
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <label className="flex flex-col gap-3">
                <span className="text-lg font-semibold">
                  Décision du Capitaine
                </span>
                <textarea
                  value={decisionText}
                  onChange={(event) => setDecisionText(event.target.value)}
                  readOnly={session.status === "decided"}
                  className="min-h-36 resize-y rounded-md border border-slate-300 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-harbor focus:ring-4 focus:ring-teal-100"
                  placeholder="Décision retenue, justification et prochain mouvement."
                />
              </label>
              <button
                type="button"
                disabled={!canValidate}
                onClick={validateDecision}
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-signal px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-600"
              >
                Valider la décision
              </button>
              {session.status === "decided" && session.decision ? (
                <p className="mt-3 rounded-md bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">
                  Décision validée.
                </p>
              ) : null}
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
