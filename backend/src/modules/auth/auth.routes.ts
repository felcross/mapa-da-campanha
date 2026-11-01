import type { FastifyInstance, FastifyRequest } from "fastify";
import { ZodError, z } from "zod";
import type { EmailService } from "./email.service";
import { AppError } from "../../shared/errors";
import { maskEmail } from "../../shared/logger";
import {
  destroySession,
  requestVerification,
  toAuthUser,
  verifyToken,
} from "./auth.service";
import {
  clearCsrfCookie,
  clearSessionCookie,
  csrfProtection,
  requireAuth,
  setCsrfCookie,
  setSessionCookie,
} from "./auth.middleware";

const emailRequestSchema = z.object({
  email: z.string().trim().email("E-mail inválido"),
});

const verifyBodySchema = z.object({
  token: z.string().min(1, "Token obrigatório"),
});

function rateLimitKey(req: FastifyRequest): string {
  const body = req.body as { email?: unknown } | undefined;
  const email =
    typeof body?.email === "string" ? body.email.trim().toLowerCase() : "unknown";
  return `${req.ip}:${email}`;
}

export async function authRoutes(
  app: FastifyInstance,
  opts: { emailService: EmailService },
): Promise<void> {
  const { emailService } = opts;

  // Anti-enumeração: SEMPRE 202, revele ou não o e-mail exista.
  app.post(
    "/email/request",
    {
      config: {
        rateLimit: {
          max: 5,
          timeWindow: "15 minutes",
          keyGenerator: rateLimitKey,
        },
      },
    },
    async (request, reply) => {
      const { email } = emailRequestSchema.parse(request.body);
      try {
        await requestVerification(email, emailService);
      } catch (err) {
        if (err instanceof AppError || err instanceof ZodError) throw err;
        request.log.error({ err, email: maskEmail(email) }, "falha ao enviar e-mail");
        throw new AppError("SERVICE_UNAVAILABLE", "Serviço de e-mail indisponível");
      }
      reply.status(202);
      return { ok: true };
    },
  );

  app.post("/email/verify", async (request, reply) => {
    const { token } = verifyBodySchema.parse(request.body);
    const { user, sessionRawToken } = await verifyToken(token);
    setSessionCookie(reply, sessionRawToken);
    setCsrfCookie(reply);
    return { user: toAuthUser(user) };
  });

  app.post(
    "/logout",
    { preHandler: [requireAuth, csrfProtection] },
    async (request, reply) => {
      const raw = request.sessionRawToken;
      if (raw) await destroySession(raw);
      clearSessionCookie(reply);
      clearCsrfCookie(reply);
      reply.status(204);
      return null;
    },
  );

  app.get("/me", { preHandler: [requireAuth] }, async (request, reply) => {
    const existing = request.cookies?.csrf_token;
    const csrfToken =
      typeof existing === "string" && existing.length > 0
        ? existing
        : setCsrfCookie(reply);
    return { user: request.user, csrfToken };
  });
}
