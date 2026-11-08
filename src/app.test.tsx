import { afterEach, describe, expect, it, vi } from "vitest";
// [PAUSADO — Character Sheet] import { render, screen, waitFor } from "@testing-library/react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// [PAUSADO — Character Sheet] function jsonResponse(body: unknown, status = 200) {
// [PAUSADO — Character Sheet]   return new Response(JSON.stringify(body), {
// [PAUSADO — Character Sheet]     status,
// [PAUSADO — Character Sheet]     headers: { "Content-Type": "application/json" },
// [PAUSADO — Character Sheet]   });
// [PAUSADO — Character Sheet] }

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("App — flag de feature", () => {
  it("flag off: mostra o hub direto, sem chamadas de rede e sem card de criador", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("VITE_ENABLE_SHEET_CREATOR", "false");

    render(<App />);

    expect(screen.getByText("AS SEIS HARMONIAS")).toBeInTheDocument();
    expect(screen.getByText("Compêndio")).toBeInTheDocument();
    expect(screen.queryByText("Criador de Personagem")).not.toBeInTheDocument();
    expect(screen.queryByText("Entrar")).not.toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  // [PAUSADO — Character Sheet]
  // it("flag on: mostra o login como entrada quando não há sessão", async () => {
  //   vi.stubGlobal(
  //     "fetch",
  //     vi.fn(async () => jsonResponse({ error: { code: "UNAUTHENTICATED", message: "no" } }, 401)),
  //   );
  //   vi.stubEnv("VITE_ENABLE_SHEET_CREATOR", "true");
  //
  //   render(<App />);
  //
  //   await waitFor(() => expect(screen.getByText("Entrar")).toBeInTheDocument());
  //   expect(screen.getByLabelText("Email")).toBeInTheDocument();
  //   expect(screen.getByText("Enviar link de acesso")).toBeInTheDocument();
  // });
  //
  // it("flag on: com sessão válida entra direto no hub, com o card de criador", async () => {
  //   vi.stubGlobal(
  //     "fetch",
  //     vi.fn(async () =>
  //       jsonResponse({
  //         user: { id: "u1", email: "kaito@exemplo.com", role: "player" },
  //         csrfToken: "tok",
  //       }),
  //     ),
  //   );
  //   vi.stubEnv("VITE_ENABLE_SHEET_CREATOR", "true");
  //
  //   render(<App />);
  //
  //   await waitFor(() =>
  //     expect(screen.getByText("Criador de Personagem")).toBeInTheDocument(),
  //   );
  //   expect(screen.queryByText("Entrar")).not.toBeInTheDocument();
  //   expect(screen.getByText("Sair")).toBeInTheDocument();
  // });
  //
  // it("flag on: ?token= na URL abre a tela de confirmação do magic link", async () => {
  //   const fetchMock = vi.fn();
  //   vi.stubGlobal("fetch", fetchMock);
  //   vi.stubEnv("VITE_ENABLE_SHEET_CREATOR", "true");
  //   window.history.replaceState({}, "", "/verify?token=abc123");
  //
  //   render(<App />);
  //
  //   await waitFor(() =>
  //     expect(
  //       screen.getByRole("button", { name: "Confirmar login" }),
  //     ).toBeInTheDocument(),
  //   );
  //   // não dispara /me: o token é a entrada
  //   expect(fetchMock).not.toHaveBeenCalled();
  //
  //   window.history.replaceState({}, "", "/");
  // });
});
