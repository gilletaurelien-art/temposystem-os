export type AgentRole = "strategy" | "builder" | "auditor" | "identity";

export interface Agent {
  id: string;
  name: string;
  role: AgentRole;
  symbol: string;
  domain: string;
  stance: string;
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
  summary: string;
  risks: string[];
  recommendation: string;
  createdAt: string;
}

export interface CouncilDecision {
  id: string;
  questionId: string;
  consensus: string;
  decision: string;
  decidedBy: string;
  decidedAt: string;
  githubIssueUrl?: string;
}
