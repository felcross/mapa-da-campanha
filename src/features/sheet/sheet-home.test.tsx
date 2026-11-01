import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import type { CharacterSummary } from "../../../shared/schemas/api";
import CharacterCard from "./CharacterCard";
import SheetHome from "./SheetHome";

const summary = (overrides: Partial<CharacterSummary> = {}): CharacterSummary => ({
  id: "c1",
  name: "Kaito",
  imageUrl: "https://example.com/kaito.png",
  selections: {
    postura: "serpente",
    estilo: "fluxo-inversivo",
    manobraEstilo: "fintar",
    manobrasEspeciais: [],
  },
  updatedAt: new Date().toISOString(),
  ...overrides,
});

function stubList(items: CharacterSummary[]) {
  vi.stubGlobal(
    "fetch",
    vi.fn(async () =>
      new Response(JSON.stringify({ data: items, page: 1, limit: 50, total: items.length }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    ),
  );
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("CharacterCard", () => {
  it("mostra imagem, nome e opções escolhidas (resumo)", () => {
    render(<CharacterCard summary={summary()} onOpen={() => {}} />);
    expect(screen.getByText("Kaito")).toBeInTheDocument();
    expect(screen.getByText("Serpente · Fluxo Inversivo")).toBeInTheDocument();
    expect(screen.getByText("Fintar")).toBeInTheDocument();
    expect(screen.getByAltText("Kaito")).toHaveAttribute(
      "src",
      "https://example.com/kaito.png",
    );
  });

  it("usa placeholder quando a imagem falha ao carregar", () => {
    render(<CharacterCard summary={summary()} onOpen={() => {}} />);
    const img = screen.getByAltText("Kaito");
    fireEvent.error(img);
    expect(screen.getByAltText("")).toHaveAttribute("src", "/locations/sem-imagem.svg");
  });

  it("usa placeholder quando não há imagem", () => {
    render(<CharacterCard summary={summary({ imageUrl: null })} onOpen={() => {}} />);
    expect(screen.getByAltText("")).toHaveAttribute("src", "/locations/sem-imagem.svg");
  });

  it("chama onOpen com o id", () => {
    const onOpen = vi.fn();
    render(<CharacterCard summary={summary()} onOpen={onOpen} />);
    fireEvent.click(screen.getByText("Kaito"));
    expect(onOpen).toHaveBeenCalledWith("c1");
  });
});

describe("SheetHome", () => {
  it("mostra empty state com botão Criar quando não há personagens", async () => {
    stubList([]);
    const onCreate = vi.fn();
    render(<SheetHome onCreate={onCreate} onOpen={() => {}} />);
    await waitFor(() =>
      expect(screen.getByText("Você ainda não tem personagens.")).toBeInTheDocument(),
    );
    fireEvent.click(screen.getAllByText("Criar Personagem")[0]);
    expect(onCreate).toHaveBeenCalled();
  });

  it("renderiza os cards do resumo", async () => {
    stubList([summary(), summary({ id: "c2", name: "Yumi" })]);
    render(<SheetHome onCreate={() => {}} onOpen={() => {}} />);
    await waitFor(() => expect(screen.getByText("Kaito")).toBeInTheDocument());
    expect(screen.getByText("Yumi")).toBeInTheDocument();
  });

  it("mostra erro com retry quando a API falha", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("", { status: 500 })),
    );
    render(<SheetHome onCreate={() => {}} onOpen={() => {}} />);
    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    expect(screen.getByText("Tentar novamente")).toBeInTheDocument();
  });
});
