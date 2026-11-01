import { randomBytes, timingSafeEqual } from "node:crypto";
import type { FastifyReply, preHandlerHookHandler } from "fastify";
import type { AuthUser } from "../../../../shared/schemas/api";
import { env } from "../../config/env";
import { AppError } from "../../shared/errors";
import { getSessionUser, toAuthUser } from "./auth.service";

export const SESSION_COOKIE_NAME = "session";
export const CSRF_COOKIE_NAME = "csrf_token";

const THIRTY_DAYS_MS = 30 * 24 * 60 * 60 * 1000;

declare module "fastify" {
  interface FastifyRequest {
    user?: AuthUser;
    sessionRawToken?: string;
  }
}

function cookieOptions(httpOnly: boolean) {
  return {
    httpOnly,
    sameSite: "lax" as const,
    secure: env.NODE_ENV === "production",
    path: "/",
    // @fastify/cookie trabalha com maxAge em segundos (30 dias)
    maxAge: THIRTY_DAYS_MS / 1000,
  };
}

export function setSessionCookie(reply: FastifyReply, raw: string): void {
  reply.setCookie(SESSION_COOKIE_NAME, raw, cookieOptions(true));
}

export function setCsrfCookie(reply: FastifyReply): string {
  const token = randomBytes(32).toString("hex");
  reply.setCookie(CSRF_COOKIE_NAME, token, cookieOptions(false));
  return token;
}

export function clearSessionCookie(reply: FastifyReply): void {
  reply.clearCookie(SESSION_COOKIE_NAME, { path: "/" });
}

export function clearCsrfCookie(reply: FastifyReply): void {
  reply.clearCookie(CSRF_COOKIE_NAME, { path: "/" });
}

export const requireAuth: preHandlerHookHandler = async (request) => {
  const raw = request.cookies?.[SESSION_COOKIE_NAME];
  if (typeof raw !== "string" || raw.length === 0) {
    throw new AppError("UNAUTHENTICATED", "Sessão ausente");
  }
  const session = await getSessionUser(raw);
  if (!session) {
    throw new AppError("UNAUTHENTICATED", "Sessão inválida ou expirada");
  }
  request.user = toAuthUser(session.user);
  request.sessionRawToken = session.sessionRawToken;
};

function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length || ba.length === 0) return false;
  return timingSafeEqual(ba, bb);
}

/**
 * Double-submit cookie: o header X-CSRF-Token precisa bater com o cookie
 * legível csrf_token. Aplicado em métodos não seguros.
 */
export const csrfProtection: preHandlerHookHandler = async (request) => {
  const method = request.method.toUpperCase();
  if (method === "GET" || method === "HEAD" || method === "OPTIONS") return;

  const header = request.headers["x-csrf-token"];
  const cookie = request.cookies?.[CSRF_COOKIE_NAME];
  const headerValue = typeof header === "string" ? header : "";
  const cookieValue = typeof cookie === "string" ? cookie : "";

  if (!safeEqual(headerValue, cookieValue)) {
    throw new AppError("FORBIDDEN", "CSRF token inválido");
  }
};
