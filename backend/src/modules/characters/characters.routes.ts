import type { FastifyInstance, FastifyRequest } from "fastify";
import { z } from "zod";
import type { AuthUser } from "../../../../shared/schemas/api";
import { csrfProtection, requireAuth } from "../auth/auth.middleware";
import {
  createCharacter,
  deleteCharacter,
  getCharacter,
  listCharacters,
  updateCharacter,
} from "./characters.service";

const listQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

const idParamSchema = z.object({
  id: z.string().uuid("id deve ser um UUID"),
});

function userOf(request: FastifyRequest): AuthUser {
  // requireAuth garante a presença do usuário autenticado
  return request.user as AuthUser;
}

export async function charactersRoutes(app: FastifyInstance): Promise<void> {
  app.addHook("preHandler", requireAuth);

  app.get("/", async (request) => {
    const { page, limit } = listQuerySchema.parse(request.query);
    return listCharacters(userOf(request), page, limit);
  });

  app.get("/:id", async (request) => {
    const { id } = idParamSchema.parse(request.params);
    return getCharacter(userOf(request), id);
  });

  app.post("/", { preHandler: [csrfProtection] }, async (request, reply) => {
    const record = await createCharacter(userOf(request), request.body);
    reply.status(201);
    return record;
  });

  app.put("/:id", { preHandler: [csrfProtection] }, async (request) => {
    const { id } = idParamSchema.parse(request.params);
    return updateCharacter(userOf(request), id, request.body);
  });

  app.delete("/:id", { preHandler: [csrfProtection] }, async (request, reply) => {
    const { id } = idParamSchema.parse(request.params);
    await deleteCharacter(userOf(request), id);
    reply.status(204);
    return null;
  });
}
