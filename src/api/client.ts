import type { ApiErrorBody, ErrorCode } from "../../shared/schemas/errors";

export class ApiError extends Error {
  readonly code: ErrorCode | "NETWORK_ERROR";
  readonly status: number;
  readonly requestId?: string;
  readonly details?: unknown;

  constructor(
    code: ErrorCode | "NETWORK_ERROR",
    message: string,
    status: number,
    requestId?: string,
    details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
    this.code = code;
    this.status = status;
    this.requestId = requestId;
    this.details = details;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}

const STATUS_FALLBACK: Record<number, ErrorCode | "NETWORK_ERROR"> = {
  400: "VALIDATION_ERROR",
  401: "UNAUTHENTICATED",
  403: "FORBIDDEN",
  404: "NOT_FOUND",
  429: "RATE_LIMITED",
  503: "SERVICE_UNAVAILABLE",
};

export function getCsrfToken(): string | null {
  const match = /(?:^|;\s*)csrf_token=([^;]*)/.exec(document.cookie);
  if (!match?.[1]) return null;
  try {
    return decodeURIComponent(match[1]);
  } catch {
    return match[1];
  }
}

type UnauthorizedHandler = () => void;
let unauthorizedHandler: UnauthorizedHandler | null = null;

/** Registrado pelo SessionGate: 401 em qualquer chamada volta para o login. */
export function setUnauthorizedHandler(handler: UnauthorizedHandler | null): void {
  unauthorizedHandler = handler;
}

type RequestOptions = Omit<RequestInit, "body"> & { body?: unknown };

async function request<T>(path: string, init: RequestOptions = {}): Promise<T> {
  const headers = new Headers(init.headers);
  const { body, ...rest } = init;
  const hasBody = body !== undefined;
  if (hasBody) headers.set("Content-Type", "application/json");

  const method = (init.method ?? "GET").toUpperCase();
  if (method !== "GET" && method !== "HEAD") {
    const csrf = getCsrfToken();
    if (csrf) headers.set("X-CSRF-Token", csrf);
  }

  let response: Response;
  try {
    response = await fetch(`/api/v1${path}`, {
      ...rest,
      headers,
      credentials: "include",
      ...(hasBody ? { body: JSON.stringify(body) } : {}),
    });
  } catch {
    throw new ApiError("NETWORK_ERROR", "Falha de rede", 0);
  }

  if (response.status === 204) return undefined as T;

  const text = await response.text();
  let payload: unknown = undefined;
  if (text) {
    try {
      payload = JSON.parse(text);
    } catch {
      payload = undefined;
    }
  }

  if (!response.ok) {
    const body = payload as ApiErrorBody | undefined;
    const code = body?.error?.code ?? STATUS_FALLBACK[response.status] ?? "INTERNAL_ERROR";
    if (code === "UNAUTHENTICATED") unauthorizedHandler?.();
    throw new ApiError(
      code,
      body?.error?.message ?? "Erro inesperado",
      response.status,
      body?.error?.requestId,
      body?.error?.details,
    );
  }

  return payload as T;
}

export function apiGet<T>(path: string): Promise<T> {
  return request<T>(path);
}

export function apiSend<T>(
  path: string,
  method: "POST" | "PUT" | "PATCH" | "DELETE",
  body?: unknown,
): Promise<T> {
  return request<T>(path, { method, ...(body !== undefined ? { body } : {}) });
}
