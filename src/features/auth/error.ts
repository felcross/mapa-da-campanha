import { isApiError } from "../../api/client";
import { strings } from "./strings";

/** Mapeia error.code → mensagem segura para o usuário. */
export function errorStateMessage(error: unknown): string {
  if (isApiError(error)) {
    if (error.code === "NETWORK_ERROR") return strings.errors.networkMessage;
    if (error.code === "RATE_LIMITED") return strings.errors.rateLimitedMessage;
    if (error.code === "INTERNAL_ERROR" || error.code === "SERVICE_UNAVAILABLE") {
      const ref = error.requestId
        ? ` (${strings.errors.referenceLabel} ${error.requestId})`
        : "";
      return `${strings.errors.genericMessage}${ref}`;
    }
    if (error.code === "UNAUTHENTICATED" || error.code === "INVALID_TOKEN") {
      return strings.errors.unauthenticatedMessage;
    }
    if (error.code === "FORBIDDEN") return strings.errors.forbiddenMessage;
    if (error.code === "NOT_FOUND") return strings.errors.notFoundMessage;
    if (error.code === "VALIDATION_ERROR") return strings.errors.validationMessage;
  }
  return strings.errors.genericMessage;
}
