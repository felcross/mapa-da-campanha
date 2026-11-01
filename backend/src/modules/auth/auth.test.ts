import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { FastifyInstance } from "fastify";
import { buildApp } from "../../app";
import { prisma } from "../../shared/prisma";
import { FakeEmailService } from "./email.service";

function extractToken(link: string): string {
  return new URL(link).searchParams.get("token") ?? "";
}

async function cleanDb(): Promise<void> {
  await prisma.character.deleteMany();
  await prisma.session.deleteMany();
  await prisma.loginToken.deleteMany();
  await prisma.user.deleteMany();
}

describe("auth (magic link + sessões)", () => {
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

  async function requestLink(email: string) {
    return app.inject({
      method: "POST",
      url: "/api/v1/auth/email/request",
      payload: { email },
    });
  }

  async function verify(token: string) {
    return app.inject({
      method: "POST",
      url: "/api/v1/auth/email/verify",
      payload: { token },
    });
  }

  async function loginFlow(email: string) {
    const req = await requestLink(email);
    expect(req.statusCode).toBe(202);
    const token = extractToken(emailService.sent.at(-1)!.link);
    const res = await verify(token);
    expect(res.statusCode).toBe(200);
    return res;
  }

  it("POST /email/request responde 202 uniforme mesmo para e-mail novo", async () => {
    const res = await requestLink("novo@exemplo.com");
    expect(res.statusCode).toBe(202);
    expect(res.json()).toEqual({ ok: true });
    expect(emailService.sent).toHaveLength(1);
    expect(emailService.sent[0].email).toBe("novo@exemplo.com");
  });

  it("e-mail é normalizado (trim + lowercase)", async () => {
    await requestLink("  Kaito@Exemplo.COM ");
    expect(emailService.sent[0].email).toBe("kaito@exemplo.com");
  });

  it("request com e-mail inválido devolve VALIDATION_ERROR", async () => {
    const res = await requestLink("nao-e-email");
    expect(res.statusCode).toBe(400);
    expect(res.json()).toMatchObject({ error: { code: "VALIDATION_ERROR" } });
  });

  it("verify com token válido cria usuário e sessão, com cookies corretos", async () => {
    const res = await loginFlow("kaito@exemplo.com");
    expect(res.json()).toMatchObject({
      user: { email: "kaito@exemplo.com", role: "player" },
    });

    const session = res.cookies.find((c) => c.name === "session");
    const csrf = res.cookies.find((c) => c.name === "csrf_token");
    expect(session?.httpOnly).toBe(true);
    expect(session?.sameSite).toBe("Lax");
    expect(session?.path).toBe("/");
    expect(session?.maxAge).toBe(30 * 24 * 60 * 60);
    expect(csrf?.httpOnly).toBeFalsy();
    expect(csrf?.sameSite).toBe("Lax");
  });

  it("verify com token desconhecido devolve 401 INVALID_TOKEN", async () => {
    const res = await verify("token-que-nao-existe");
    expect(res.statusCode).toBe(401);
    expect(res.json()).toMatchObject({ error: { code: "INVALID_TOKEN" } });
  });

  it("token é single-use — segundo verify com o mesmo link falha", async () => {
    await requestLink("kaito@exemplo.com");
    const token = extractToken(emailService.sent[0].link);
    expect((await verify(token)).statusCode).toBe(200);
    expect((await verify(token)).statusCode).toBe(401);
  });

  it("reenviar invalida o link anterior", async () => {
    await requestLink("kaito@exemplo.com");
    const firstToken = extractToken(emailService.sent[0].link);
    await requestLink("kaito@exemplo.com");
    const secondToken = extractToken(emailService.sent[1].link);

    expect((await verify(firstToken)).statusCode).toBe(401);
    expect((await verify(secondToken)).statusCode).toBe(200);
  });

  it("GET /me retorna o usuário e reemite o CSRF quando faltar", async () => {
    const login = await loginFlow("kaito@exemplo.com");
    const session = login.cookies.find((c) => c.name === "session")!.value;

    const me = await app.inject({
      method: "GET",
      url: "/api/v1/auth/me",
      cookies: { session },
    });
    expect(me.statusCode).toBe(200);
    expect(me.json()).toMatchObject({
      user: { email: "kaito@exemplo.com" },
      csrfToken: expect.any(String),
    });
  });

  it("GET /me sem sessão devolve 401 UNAUTHENTICATED", async () => {
    const res = await app.inject({ method: "GET", url: "/api/v1/auth/me" });
    expect(res.statusCode).toBe(401);
    expect(res.json()).toMatchObject({ error: { code: "UNAUTHENTICATED" } });
  });

  it("logout exige CSRF, destrói a sessão e limpa os cookies", async () => {
    const login = await loginFlow("kaito@exemplo.com");
    const session = login.cookies.find((c) => c.name === "session")!.value;
    const csrf = login.cookies.find((c) => c.name === "csrf_token")!.value;
    // o navegador envia os dois cookies juntos
    const cookies = { session, csrf_token: csrf };

    const semCsrf = await app.inject({
      method: "POST",
      url: "/api/v1/auth/logout",
      cookies: { session, csrf_token: csrf },
    });
    expect(semCsrf.statusCode).toBe(403);
    expect(semCsrf.json()).toMatchObject({ error: { code: "FORBIDDEN" } });

    const csrfErrado = await app.inject({
      method: "POST",
      url: "/api/v1/auth/logout",
      cookies,
      headers: { "x-csrf-token": "errado" },
    });
    expect(csrfErrado.statusCode).toBe(403);

    const ok = await app.inject({
      method: "POST",
      url: "/api/v1/auth/logout",
      cookies,
      headers: { "x-csrf-token": csrf },
    });
    expect(ok.statusCode).toBe(204);

    const meDepois = await app.inject({
      method: "GET",
      url: "/api/v1/auth/me",
      cookies: { session },
    });
    expect(meDepois.statusCode).toBe(401);
  });

  it("rate limit: 5 pedidos por ip+email em 15min; o 6º cai em 429", async () => {
    for (let i = 0; i < 5; i += 1) {
      const res = await requestLink("limite@exemplo.com");
      expect(res.statusCode).toBe(202);
    }
    const res = await requestLink("limite@exemplo.com");
    expect(res.statusCode).toBe(429);
    expect(res.json()).toMatchObject({ error: { code: "RATE_LIMITED" } });
  });

  it("falha no envio de e-mail devolve 503 sem vazar detalhes", async () => {
    const broken = buildApp({
      emailService: {
        sendMagicLink: async () => {
          throw new Error("smtp down");
        },
      },
    });
    const res = await broken.inject({
      method: "POST",
      url: "/api/v1/auth/email/request",
      payload: { email: "kaito@exemplo.com" },
    });
    expect(res.statusCode).toBe(503);
    expect(res.json()).toMatchObject({
      error: { code: "SERVICE_UNAVAILABLE" },
    });
    await broken.close();
  });
});
