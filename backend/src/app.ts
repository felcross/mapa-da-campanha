import Fastify, { type FastifyBaseLogger, type FastifyInstance } from "fastify";
import helmet from "@fastify/helmet";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { env } from "./config/env";
import { AppError } from "./shared/errors";
import { logger } from "./shared/logger";
import { healthRoutes } from "./modules/health/health.routes";

export function buildApp(): FastifyInstance {
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

  app.setErrorHandler((error, request, reply) => {
    const requestId = request.id;

    if (error instanceof ZodError) {
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

  return app;
}
