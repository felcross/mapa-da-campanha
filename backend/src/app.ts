import Fastify, { type FastifyBaseLogger, type FastifyInstance } from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import rateLimit from "@fastify/rate-limit";
import { Prisma } from "@prisma/client";
import { env } from "./config/env";
import { AppError, isZodError } from "./shared/errors";
import { logger } from "./shared/logger";
import { healthRoutes } from "./modules/health/health.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { charactersRoutes } from "./modules/characters/characters.routes";
import { NodemailerEmailService, type EmailService } from "./modules/auth/email.service";

export interface AppDeps {
  emailService?: EmailService;
}

export function buildApp(deps: AppDeps = {}): FastifyInstance {
  const emailService = deps.emailService ?? new NodemailerEmailService();

  const app = Fastify({
    loggerInstance: logger as unknown as FastifyBaseLogger,
    bodyLimit: 256 * 1024,
    genReqId: (req) => {
      const header = req.headers["x-request-id"];
      if (typeof header === "string" && header.length > 0 && header.length <= 128) {
        return header;
      }
      return crypto.randomUUID();
    },
  });

  app.addHook("onSend", async (request, reply, payload) => {
    reply.header("x-request-id", request.id);
    return payload;
  });

  app.register(helmet);
  app.register(cors, { origin: env.WEB_URL, credentials: true });
  app.register(cookie);
  app.register(rateLimit, {
    global: false,
    // o plugin lança o retorno como erro — precisa ser uma instância de Error
    errorResponseBuilder: () =>
      new AppError("RATE_LIMITED", "Muitas tentativas, tente novamente em instantes"),
  });

  app.setErrorHandler((error, request, reply) => {
    const requestId = request.id;

    if (isZodError(error)) {
      reply.status(400).send({
        error: {
          code: "VALIDATION_ERROR",
          message: "Dados inválidos",
          requestId,
          details: error.issues,
        },
      });
      return;
    }

    if (error instanceof AppError) {
      reply.status(error.status).send({
        error: {
          code: error.code,
          message: error.message,
          requestId,
          details: error.details,
        },
      });
      return;
    }

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        reply.status(409).send({
          error: { code: "VALIDATION_ERROR", message: "Conflito de unicidade", requestId },
        });
        return;
      }
      if (error.code === "P2025") {
        reply.status(404).send({
          error: { code: "NOT_FOUND", message: "Recurso não encontrado", requestId },
        });
        return;
      }
    }

    request.log.error({ err: error }, "erro não tratado");
    reply.status(500).send({
      error: { code: "INTERNAL_ERROR", message: "Erro interno", requestId },
    });
  });

  app.setNotFoundHandler((_request, reply) => {
    reply.status(404).send({
      error: { code: "NOT_FOUND", message: "Rota não encontrada" },
    });
  });

  app.register(healthRoutes);
  app.register(async (scope) => authRoutes(scope, { emailService }), {
    prefix: "/api/v1/auth",
  });
  app.register(charactersRoutes, { prefix: "/api/v1/characters" });

  return app;
}
