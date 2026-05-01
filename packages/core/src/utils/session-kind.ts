import type { SessionId, SessionKind } from "../types.js";

function escapeRegex(input: string): string {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function deriveSessionKindFromMetadata(
  sessionId: SessionId,
  meta: Record<string, string>,
  sessionPrefix?: string,
): SessionKind {
  if (meta["role"] === "orchestrator") return "orchestrator";
  if (!sessionPrefix) return "worker";
  if (sessionId === `${sessionPrefix}-orchestrator`) return "orchestrator";
  if (new RegExp(`^${escapeRegex(sessionPrefix)}-orchestrator-\\d+$`).test(sessionId)) {
    return "orchestrator";
  }
  return "worker";
}
