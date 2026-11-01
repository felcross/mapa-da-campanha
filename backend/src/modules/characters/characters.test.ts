import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildApp } from "../../app";
import { prisma } from "../../shared/prisma";
import { FakeEmailService } from "../auth/email.service";
import type { CharacterData } from "../../../../shared/schemas/character";

const validData = (name = "Kaito"): CharacterData => ({
  schemaVersion: 1,
  name,
  imageUrl: "https://example.com/kaito.png",
  autoridades: {
    velocidade: "1d8",
    forca: "1d6",
    resistencia: "1d6",
    reflexo: "1d10",
    movimento: "1d4",
    yin: "1d6",
    yang: "1d6",
  },
  resources: {
    chi: { current: 3, max: 5 },
    prana: { current: 2, max: 4 },
    vida: { current: 10, max: 10 },
  },
  selections: {
    postura: "serpente",
    estilo: "fluxo-inversivo",
    manobraEstilo: "fintar",
    manobrasEspeciais: ["corrida-cinetica"],
  },
  diceProgression: {
    manobraEstilo: "1d6",
    manobraEspecial: "1d4",
    faJin: "1d8",
  },
});

async function cleanDb(): Promise<void> {
  await prisma.character.deleteMany();
  await prisma.session.deleteMany();
  await prisma.loginToken.deleteMany();
  await prisma.user.deleteMany();
}

interface Session {
  cookies: Record<string, string>;
  csrf: string;
  user: { id: string; email: string };
}

describe("characters CRUD + ownership", () => {
  let app: FastifyInstance;
  let emailService: FakeEmailService;

  beforeEach(async () => {
    await cleanDb();
    emailService = new FakeEmailService();
    app = buildApp({ emailService });
  });

  afterEach(async () => {
    await app.close();
  });

  async function login(email: string): Promise<Session> {
    const req = await app.inject({
      method: "POST",
      url: "/api/v1/auth/email/request",
      payload: { email },
    });
    expect(req.statusCode).toBe(202);
    const link = emailService.sent.at(-1)!.link;
    const token = new URL(link).searchParams.get("token")!;
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/auth/email/verify",
      payload: { token },
    });
    expect(res.statusCode).toBe(200);
    const sessionCookie = res.cookies.find((c) => c.name === "session")!.value;
    const csrf = res.cookies.find((c) => c.name === "csrf_token")!.value;
    return {
      cookies: { session: sessionCookie, csrf_token: csrf },
      csrf,
      user: res.json().user,
    };
  }

  function createReq(s: Session, data: unknown = validData()) {
    return app.inject({
      method: "POST",
      url: "/api/v1/characters",
      cookies: s.cookies,
      headers: { "x-csrf-token": s.csrf },
      payload: data as object,
    });
  }

  it("cria personagem e retorna o registro completo", async () => {
    const s = await login("kaito@exemplo.com");
    const res = await createReq(s);
    expect(res.statusCode).toBe(201);
    const body = res.json();
    expect(body).toMatchObject({
      name: "Kaito",
      imageUrl: "https://example.com/kaito.png",
      characterData: validData(),
    });
    expect(body.id).toBeTruthy();
  });

  it("rejeita dados inválidos com VALIDATION_ERROR", async () => {
    const s = await login("kaito@exemplo.com");
    const invalid = { ...validData(), name: "" };
    const res = await createReq(s, invalid);
    expect(res.statusCode).toBe(400);
    expect(res.json()).toMatchObject({ error: { code: "VALIDATION_ERROR" } });
  });

  it("métodos de mutação exigem CSRF", async () => {
    const s = await login("kaito@exemplo.com");
    const res = await app.inject({
      method: "POST",
      url: "/api/v1/characters",
      cookies: s.cookies,
      payload: validData(),
    });
    expect(res.statusCode).toBe(403);
    expect(res.json()).toMatchObject({ error: { code: "FORBIDDEN" } });
  });

  it("sem sessão devolve 401", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/characters" });
    expect(res.statusCode).toBe(401);
    expect(res.json()).toMatchObject({ error: { code: "UNAUTHENTICATED" } });
  });

  it("lista só os personagens do próprio usuário, com resumo", async () => {
    const s = await login("kaito@exemplo.com");
    const outro = await login("inimigo@exemplo.com");
    await createReq(s, validData("Kaito"));
    await createReq(s, validData("Yumi"));
    await createReq(outro, validData("Rival"));

    const res = await app.inject({
      method: "GET",
      url: "/api/v1/characters",
      cookies: s.cookies,
    });
    expect(res.statusCode).toBe(200);
    const body = res.json();
    expect(body.total).toBe(2);
    expect(body.data.map((c: { name: string }) => c.name).sort()).toEqual(["Kaito", "Yumi"]);
    // resumo: só nome/imagem/seleções
    expect(body.data[0]).not.toHaveProperty("characterData");
    expect(body.data[0]).not.toHaveProperty("autoridades");
    expect(body.data[0]).toHaveProperty("selections");
  });

  it("paginação page/limit ordena por updated_at desc", async () => {
    const s = await login("kaito@exemplo.com");
    for (const name of ["A", "B", "C"]) {
      await createReq(s, validData(name));
    }
    const res = await app.inject({
      method: "GET",
      url: "/api/v1/characters?page=2&limit=2",
      cookies: s.cookies,
    });
    const body = res.json();
    expect(body.page).toBe(2);
    expect(body.limit).toBe(2);
    expect(body.total).toBe(3);
    expect(body.data).toHaveLength(1);
  });

  it("get/update/delete do próprio personagem funcionam; limit acima de 50 é rejeitado", async () => {
    const s = await login("kaito@exemplo.com");
    const created = (await createReq(s)).json();

    const get = await app.inject({
      method: "GET",
      url: `/api/v1/characters/${created.id}`,
      cookies: s.cookies,
    });
    expect(get.statusCode).toBe(200);
    expect(get.json().characterData.name).toBe("Kaito");

    const updated = await app.inject({
      method: "PUT",
      url: `/api/v1/characters/${created.id}`,
      cookies: s.cookies,
      headers: { "x-csrf-token": s.csrf },
      payload: validData("Kaito Renomeado"),
    });
    expect(updated.statusCode).toBe(200);
    expect(updated.json().name).toBe("Kaito Renomeado");

    const badLimit = await app.inject({
      method: "GET",
      url: "/api/v1/characters?limit=51",
      cookies: s.cookies,
    });
    expect(badLimit.statusCode).toBe(400);

    const del = await app.inject({
      method: "DELETE",
      url: `/api/v1/characters/${created.id}`,
      cookies: s.cookies,
      headers: { "x-csrf-token": s.csrf },
    });
    expect(del.statusCode).toBe(204);

    const depois = await app.inject({
      method: "GET",
      url: `/api/v1/characters/${created.id}`,
      cookies: s.cookies,
    });
    expect(depois.statusCode).toBe(404);
  });

  it("personagem de outro usuário devolve 404 em get/update/delete", async () => {
    const dono = await login("kaito@exemplo.com");
    const atacante = await login("inimigo@exemplo.com");
    const created = (await createReq(dono)).json();

    for (const [method, url, payload] of [
      ["GET", `/api/v1/characters/${created.id}`, undefined],
      ["PUT", `/api/v1/characters/${created.id}`, validData("Hackeado")],
      ["DELETE", `/api/v1/characters/${created.id}`, undefined],
    ] as const) {
      const res = await app.inject({
        method,
        url,
        cookies: atacante.cookies,
        headers: { "x-csrf-token": atacante.csrf },
        ...(payload ? { payload } : {}),
      });
      expect(res.statusCode).toBe(404);
      expect(res.json()).toMatchObject({ error: { code: "NOT_FOUND" } });
    }

    // e o registro do dono continua intacto
    const get = await app.inject({
      method: "GET",
      url: `/api/v1/characters/${created.id}`,
      cookies: dono.cookies,
    });
    expect(get.json().characterData.name).toBe("Kaito");
  });
});
