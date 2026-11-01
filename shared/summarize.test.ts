import { describe, expect, it } from "vitest";
import type { CharacterData } from "./schemas/character";
import { hasEspecializacao, summarizeCharacter } from "./summarize";

const validData = (): CharacterData => ({
  schemaVersion: 1,
  name: "Kaito",
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
  notes: "x",
});

describe("summarizeCharacter", () => {
  it("retorna só nome, imagem e opções escolhidas", () => {
    const summary = summarizeCharacter(validData());
    expect(summary).toEqual({
      name: "Kaito",
      imageUrl: "https://example.com/kaito.png",
      selections: {
        postura: "serpente",
        estilo: "fluxo-inversivo",
        manobraEstilo: "fintar",
        manobrasEspeciais: ["corrida-cinetica"],
      },
    });
  });

  it("normaliza imageUrl vazia para null", () => {
    const data = validData();
    data.imageUrl = "";
    expect(summarizeCharacter(data).imageUrl).toBeNull();
  });

  it("trata imageUrl ausente como null", () => {
    const data = validData();
    delete data.imageUrl;
    expect(summarizeCharacter(data).imageUrl).toBeNull();
  });

  it("não expõe autoridades, recursos ou notas no resumo", () => {
    const summary = summarizeCharacter(validData()) as unknown as Record<string, unknown>;
    expect(summary).not.toHaveProperty("autoridades");
    expect(summary).not.toHaveProperty("resources");
    expect(summary).not.toHaveProperty("notes");
    expect(summary).not.toHaveProperty("diceProgression");
  });
});

describe("hasEspecializacao", () => {
  it("é true quando a autoridade da postura está no par do estilo", () => {
    // serpente = reflexo; fluxo-inversivo = [velocidade, reflexo]
    expect(hasEspecializacao(validData())).toBe(true);
  });

  it("é false quando não casa", () => {
    const data = validData();
    data.selections.postura = "tigre"; // forca ∉ [velocidade, reflexo]
    expect(hasEspecializacao(data)).toBe(false);
  });
});
