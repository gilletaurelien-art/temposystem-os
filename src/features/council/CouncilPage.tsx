import { useMemo, useState } from "react";
import { councilAgents, crew2042Agents } from "../../config/agents";
import type { CouncilSession, CouncilSessionStatus } from "../../types";
import { useLang } from "../../lib/lang";
import { TempoBriefing } from "../../hero/TempoBriefing";
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

const copy = {
  statusLabel: {
    fr: {
      draft: "Brouillon",
      consulted: "Conseil consulté",
      decided: "Décision validée",
    },
    en: {
      draft: "Draft",
      consulted: "Council consulted",
      decided: "Decision validated",
    },
  } satisfies Record<"fr" | "en", Record<CouncilSessionStatus, string>>,
  title: { fr: "Conseil de Bord", en: "Bridge Council" },
  questionLabel: { fr: "Question du Capitaine", en: "Captain's Question" },
  questionPlaceholder: {
    fr: "Quelle décision devons-nous éclairer aujourd'hui ?",
    en: "Which decision should we illuminate today?",
  },
  consult: { fr: "Consulter le Conseil", en: "Consult the Council" },
  permanentFunctions: { fr: "Fonctions permanentes", en: "Permanent functions" },
  currentImplementation: { fr: "Implémentation actuelle :", en: "Current implementation:" },
  recommendation: { fr: "Recommandation :", en: "Recommendation:" },
  awaitingConsultation: { fr: "En attente de consultation.", en: "Awaiting consultation." },
  extendedCrew: { fr: "Équipage étendu", en: "Extended crew" },
  capabilities2042: { fr: "Capacités 2042", en: "2042 capabilities" },
  notCalled: { fr: "Non sollicité", en: "Not called" },
  available: { fr: "Disponible", en: "Available" },
  consensus: { fr: "Consensus du Conseil", en: "Council consensus" },
  pointsOfAttention: { fr: "Points d'attention", en: "Points of attention" },
  awaitingSynthesis: { fr: "En attente de synthèse.", en: "Awaiting synthesis." },
  decisionLabel: { fr: "Décision du Capitaine", en: "Captain's Decision" },
  decisionPlaceholder: {
    fr: "Décision retenue, justification et prochain mouvement.",
    en: "Chosen decision, rationale and next move.",
  },
  validate: { fr: "Valider la décision", en: "Validate the decision" },
  decisionValidated: { fr: "Décision validée.", en: "Decision validated." },
  createIssue: { fr: "Créer une issue GitHub", en: "Create a GitHub issue" },
} as const;

export function CouncilPage() {
  const { lang } = useLang();
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
    <main className="relative z-10 min-h-screen text-slate-100">
      {/* Fond fixe (moonrise) — le pendant nuit du sunrise d'accueil */}
      <div className="tempo-wallpaper tempo-wallpaper--moon" aria-hidden="true" />

      {/* Modules déplacés du HERO (16/07/2026) : le briefing « jour » ouvre le Conseil. */}
      <div className="mx-auto w-full max-w-6xl px-5 pt-8 sm:px-8 lg:px-10">
        <TempoBriefing />
      </div>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-8 lg:px-10">
        <aside className="rounded-lg border border-amber-300/30 bg-amber-300/10 px-4 py-3 text-sm leading-6 text-amber-100" role="status">
          <strong>{lang === "fr" ? "PROTOTYPE PUBLIC" : "PUBLIC PROTOTYPE"}</strong>
          {lang === "fr"
            ? " · Réponses simulées localement. Aucune IA externe n'est appelée et aucune décision n'est enregistrée."
            : " · Responses are simulated locally. No external AI is called and no decision is recorded."}
        </aside>
        <header className="flex flex-col gap-3 border-b border-white/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-[#a78bfa]">
              TEMPOsystem
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">
              {copy.title[lang]}
            </h1>
          </div>
          <span className="w-fit rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium text-slate-300">
            {copy.statusLabel[lang][session.status]}
          </span>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
          <div className="flex min-w-0 flex-col gap-6">
            <label className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-slate-200">
                {copy.questionLabel[lang]}
              </span>
              <textarea
                value={session.question.text}
                onChange={(event) => updateQuestion(event.target.value)}
                className="min-h-40 resize-y rounded-lg border border-white/12 bg-white/[0.04] px-4 py-3 text-base leading-7 text-slate-100 placeholder:text-slate-500 outline-none transition backdrop-blur-sm focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20"
                placeholder={copy.questionPlaceholder[lang]}
              />
            </label>

            <button
              type="button"
              disabled={!canConsult}
              onClick={consultCouncil}
              className="inline-flex min-h-12 items-center justify-center rounded-lg bg-gradient-to-r from-[#6366f1] to-[#7c3aed] px-5 text-sm font-semibold text-white transition hover:from-[#818cf8] hover:to-[#8b5cf6] disabled:cursor-not-allowed disabled:bg-none disabled:bg-white/10 disabled:text-slate-500"
            >
              {copy.consult[lang]}
            </button>

            <section
              aria-labelledby="council-heading"
              className="flex flex-col gap-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h2 id="council-heading" className="text-xl font-semibold text-white">
                  {copy.title[lang]}
                </h2>
                <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-xs font-medium text-slate-300">
                  {copy.permanentFunctions[lang]}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {councilAgents.map((agent) => {
                  const response = responsesByAgent.get(agent.id);

                  return (
                    <article
                      key={agent.id}
                      className="flex min-h-64 flex-col justify-between rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              <span aria-hidden="true">{agent.emoji}</span>{" "}
                              {agent.name}
                            </h3>
                            <p className="mt-1 text-sm text-slate-400">
                              {agent.responsibilities.join(", ")}
                            </p>
                          </div>
                        </div>
                        <p className="mt-4 text-sm leading-6 text-slate-300">
                          {agent.description}
                        </p>
                        <p className="mt-3 text-xs font-medium text-slate-500">
                          {copy.currentImplementation[lang]}{" "}
                          {agent.implementation.name}
                        </p>
                      </div>

                      <div className="mt-5 rounded-md border border-dashed border-white/15 bg-white/[0.03] px-3 py-3 text-sm text-slate-400">
                        {response ? (
                          <div className="flex flex-col gap-3">
                            <p className="leading-6 text-slate-300">{response.summary}</p>
                            <p className="text-slate-400">
                              <span className="font-semibold text-slate-200">
                                {copy.recommendation[lang]}
                              </span>{" "}
                              {response.recommendation}
                            </p>
                          </div>
                        ) : (
                          <p>{copy.awaitingConsultation[lang]}</p>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>

            <section
              aria-labelledby="extended-crew-heading"
              className="flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-4 backdrop-blur-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <h2
                  id="extended-crew-heading"
                  className="text-base font-semibold text-white"
                >
                  {copy.extendedCrew[lang]}
                </h2>
                <span className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-slate-300">
                  {copy.capabilities2042[lang]}
                </span>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {crew2042Agents.map((agent) => (
                  <div
                    key={agent.id}
                    className="flex items-start justify-between gap-3 rounded-md border border-white/10 bg-white/[0.03] px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium leading-5 text-slate-200">
                        <span aria-hidden="true">{agent.emoji}</span>{" "}
                        {agent.name}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-500">
                        {agent.responsibilities.slice(0, 3).join(", ")}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full border border-white/10 bg-white/[0.06] px-2 py-1 text-xs font-medium text-slate-400">
                      {agent.status === "future" ? copy.notCalled[lang] : copy.available[lang]}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="flex min-w-0 flex-col gap-5">
            <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <h2 className="text-lg font-semibold text-white">{copy.consensus[lang]}</h2>
              <div className="mt-3 min-h-36 rounded-md border border-dashed border-white/15 bg-white/[0.03] p-4 text-sm leading-6 text-slate-400">
                {session.consensus ? (
                  <div className="flex flex-col gap-3">
                    <p className="text-slate-300">{session.consensus.summary}</p>
                    <div>
                      <p className="font-semibold text-slate-200">
                        {copy.pointsOfAttention[lang]}
                      </p>
                      <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-400">
                        {session.consensus.openQuestions.map((question) => (
                          <li key={question}>{question}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <p className="text-slate-500">{copy.awaitingSynthesis[lang]}</p>
                )}
              </div>
            </section>

            <section className="rounded-lg border border-white/10 bg-white/[0.04] p-5 backdrop-blur-sm">
              <label className="flex flex-col gap-3">
                <span className="text-lg font-semibold text-white">
                  {copy.decisionLabel[lang]}
                </span>
                <textarea
                  value={decisionText}
                  onChange={(event) => setDecisionText(event.target.value)}
                  readOnly={session.status === "decided"}
                  className="min-h-36 resize-y rounded-md border border-white/12 bg-white/[0.04] px-4 py-3 text-sm leading-6 text-slate-100 placeholder:text-slate-500 outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-500/20"
                  placeholder={copy.decisionPlaceholder[lang]}
                />
              </label>
              <button
                type="button"
                disabled={!canValidate}
                onClick={validateDecision}
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-gradient-to-r from-[#3b82f6] to-[#6366f1] px-5 text-sm font-semibold text-white transition hover:from-[#60a5fa] hover:to-[#818cf8] disabled:cursor-not-allowed disabled:bg-none disabled:bg-white/10 disabled:text-slate-500"
              >
                {copy.validate[lang]}
              </button>
              {session.status === "decided" && session.decision ? (
                <p className="mt-3 rounded-md bg-emerald-900/25 px-3 py-2 text-sm font-medium text-emerald-300">
                  {copy.decisionValidated[lang]}
                </p>
              ) : null}
            </section>

            <button
              type="button"
              disabled
              className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] px-5 text-sm font-semibold text-slate-500"
            >
              {copy.createIssue[lang]}
            </button>
          </aside>
        </section>
      </div>
    </main>
  );
}
