import { afterAll, beforeAll, describe, expect, it } from "vitest";
import { buildApp } from "../../app";

describe("health routes", () => {
  let app: ReturnType<typeof buildApp>;

  beforeAll(() => {
    app = buildApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /health responde ok", async () => {
    const res = await app.inject({ method: "GET", url: "/health" });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ status: "ok" });
  });

  it("GET /ready responde ok quando o banco responde", async () => {
    const res = await app.inject({ method: "GET", url: "/ready" });
    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual({ status: "ok" });
  });

  it("rota desconhecida devolve o envelope de erro", async () => {
    const res = await app.inject({ method: "GET", url: "/nao-existe" });
    expect(res.statusCode).toBe(404);
    expect(res.json()).toMatchObject({
      error: { code: "NOT_FOUND", message: "Rota não encontrada" },
    });
  });

  it("toda resposta carrega x-request-id", async () => {
    const res = await app.inject({ method: "GET", url: "/health" });
    expect(res.headers["x-request-id"]).toBeTruthy();
  });
});
