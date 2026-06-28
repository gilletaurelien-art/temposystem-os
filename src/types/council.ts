export type AgentRole =
  | "quartermaster"
  | "masterCarpenter"
  | "masterCaulker"
  | "masterIlluminator";

export type CouncilSessionStatus = "draft" | "consulted" | "decided";

export interface Agent {
  id: string;
  role: AgentRole;
  title: string;
  symbol: string;
  responsibilities: string[];
  stance: string;
  currentImplementation: {
    name: string;
    provider?: string;
  };
}

export interface CouncilQuestion {
  id: string;
  text: string;
  createdAt: string;
  captainId?: string;
}

export interface CouncilResponse {
  id: string;
  questionId: string;
  agentId: string;
  role: AgentRole;
  summary: string;
  risks: string[];
  recommendation: string;
  createdAt: string;
}

export interface CouncilConsensus {
  id: string;
  questionId: string;
  summary: string;
  alignment: string[];
  openQuestions: string[];
  createdAt: string;
}

export interface CouncilDecision {
  id: string;
  questionId: string;
  content: string;
  decidedBy: string;
  decidedAt: string;
  githubIssueUrl?: string;
}

export interface CouncilSession {
  id: string;
  question: CouncilQuestion;
  responses: CouncilResponse[];
  consensus: CouncilConsensus | null;
  decision: CouncilDecision | null;
  status: CouncilSessionStatus;
  createdAt: string;
  decidedAt?: string;
}
