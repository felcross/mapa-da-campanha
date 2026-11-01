import type { ErrorCode } from "../../../shared/schemas/errors";
import { ERROR_STATUS } from "../../../shared/schemas/errors";

export class AppError extends Error {
  readonly code: ErrorCode;
  readonly status: number;
  readonly details?: unknown;

  constructor(code: ErrorCode, message?: string, details?: unknown) {
    super(message ?? code);
    this.name = "AppError";
    this.code = code;
    this.status = ERROR_STATUS[code];
    this.details = details;
  }
}

/**
 * Detecção estrutural de ZodError: shared/ e backend/ têm cópias
 * distintas do zod, então instanceof não cruza instâncias.
 */
export function isZodError(error: unknown): error is { issues: unknown[] } {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { name?: unknown }).name === "ZodError" &&
    Array.isArray((error as { issues?: unknown }).issues)
  );
}
