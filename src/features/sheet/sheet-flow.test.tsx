import { afterEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import type { CharacterData } from "../../../shared/schemas/character";
import type { CharacterRecord } from "../../../shared/schemas/api";
import SheetCreator from "./SheetCreator";
import SheetDetail from "./SheetDetail";

const validData = (): CharacterData => ({
  schemaVersion: 1,
  name: "Kaito",
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
    chi: { current: 1, max: 5 },
    prana: { current: 1, max: 4 },
    vida: { current: 8, max: 10 },
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

const record = (): CharacterRecord => ({
  id: "c1",
  name: "Kaito",
  imageUrl: null,
  characterData: validData(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("SheetCreator", () => {
  it("valida no cliente e não envia com nome vazio", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const onDone = vi.fn();

    render(<SheetCreator onDone={onDone} onCancel={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: "Criar Personagem" }));

    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("Preencha este campo."),
    );
    expect(fetchMock).not.toHaveBeenCalled();
    expect(onDone).not.toHaveBeenCalled();
  });

  it("preenche o formulário e envia o POST válido", async () => {
    const fetchMock = vi.fn(async () => jsonResponse(record(), 201));
    vi.stubGlobal("fetch", fetchMock);
    const onDone = vi.fn();

    render(<SheetCreator onDone={onDone} onCancel={() => {}} />);
    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "Kaito" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Criar Personagem" }));

    await waitFor(() => expect(onDone).toHaveBeenCalledTimes(1));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("/api/v1/characters");
    expect(init.method).toBe("POST");
    const sent = JSON.parse(String(init.body)) as CharacterData;
    expect(sent.name).toBe("Kaito");
    expect(sent.schemaVersion).toBe(1);
  });

  it("mostra erro de servidor sem navegar", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse({ error: { code: "VALIDATION_ERROR", message: "ruim" } }, 400),
      ),
    );
    const onDone = vi.fn();

    render(<SheetCreator onDone={onDone} onCancel={() => {}} />);
    fireEvent.change(screen.getByLabelText("Nome"), { target: { value: "X" } });
    fireEvent.click(screen.getByRole("button", { name: "Criar Personagem" }));

    await waitFor(() => expect(screen.getByRole("alert")).toBeInTheDocument());
    expect(onDone).not.toHaveBeenCalled();
  });
});

describe("SheetDetail", () => {
  it("carrega a ficha e mostra os stats", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => jsonResponse(record())));
    render(
      <SheetDetail characterId="c1" onBack={() => {}} onDeleted={() => {}} />,
    );
    await waitFor(() =>
      expect(screen.getByRole("heading", { name: "Kaito" })).toBeInTheDocument(),
    );
    expect(screen.getByText(/Serpente/)).toBeInTheDocument();
    expect(screen.getByText("Editar")).toBeInTheDocument();
    expect(screen.getByText("Excluir")).toBeInTheDocument();
  });

  it("editar abre o formulário e o salvar chama PUT", async () => {
    const fetchMock = vi.fn(async () => jsonResponse(record()));
    vi.stubGlobal("fetch", fetchMock);
    render(
      <SheetDetail characterId="c1" onBack={() => {}} onDeleted={() => {}} />,
    );
    await waitFor(() => expect(screen.getByText("Editar")).toBeInTheDocument());
    fireEvent.click(screen.getByText("Editar"));
    fireEvent.click(screen.getByText("Salvar"));
    await waitFor(() => {
      const putCall = fetchMock.mock.calls.find((c) => {
        const [, init] = c as unknown as [string, RequestInit | undefined];
        return init?.method === "PUT";
      });
      expect(putCall).toBeTruthy();
    });
  });

  it("excluir pede confirmação e só deleta ao confirmar", async () => {
    const fetchMock = vi.fn(async () => jsonResponse(record()));
    vi.stubGlobal("fetch", fetchMock);
    const onDeleted = vi.fn();

    render(
      <SheetDetail characterId="c1" onBack={() => {}} onDeleted={onDeleted} />,
    );
    await waitFor(() => expect(screen.getByText("Excluir")).toBeInTheDocument());

    fireEvent.click(screen.getByText("Excluir"));
    expect(screen.getByText("Excluir personagem?")).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1); // só o GET

    fireEvent.click(screen.getByText("Manter personagem"));
    expect(screen.queryByText("Excluir personagem?")).not.toBeInTheDocument();

    fireEvent.click(screen.getByText("Excluir"));
    fireEvent.click(screen.getByText("Sim, excluir"));
    await waitFor(() => expect(onDeleted).toHaveBeenCalledTimes(1));
    const deleteCall = fetchMock.mock.calls.find((c) => {
      const [, init] = c as unknown as [string, RequestInit | undefined];
      return init?.method === "DELETE";
    });
    expect(deleteCall).toBeTruthy();
  });
});
