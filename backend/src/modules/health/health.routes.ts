import type { FastifyInstance } from "fastify";
import { prisma } from "../../shared/prisma";

export async function healthRoutes(app: FastifyInstance): Promise<void> {
  app.get("/health", async () => ({ status: "ok" }));

  app.get("/ready", async (_request, reply) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      return { status: "ok" };
    } catch {
      reply.status(503);
      return { status: "unavailable" };
    }
  });
}
