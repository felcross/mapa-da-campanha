import { describe, expect, it } from "vitest";
import { characterDataSchema, type CharacterData } from "./character";

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
    chi: { current: 0, max: 5 },
    prana: { current: 0, max: 4 },
    vida: { current: 10, max: 10 },
  },
  selections: {
    postura: "falcao",
    estilo: "tempestade",
    manobraEstilo: "pular",
    manobrasEspeciais: [],
  },
  diceProgression: {
    manobraEstilo: "1d4",
    manobraEspecial: "1d4",
    faJin: "1d4",
  },
});

describe("characterDataSchema", () => {
  it("aceita um personagem válido", () => {
    expect(characterDataSchema.safeParse(validData()).success).toBe(true);
  });

  it("aceita imageUrl vazia e https válida; rejeita http", () => {
    const base = validData();
    expect(characterDataSchema.safeParse({ ...base, imageUrl: "" }).success).toBe(true);
    expect(
      characterDataSchema.safeParse({ ...base, imageUrl: "https://example.com/a.png" }).success,
    ).toBe(true);
    expect(
      characterDataSchema.safeParse({ ...base, imageUrl: "http://example.com/a.png" }).success,
    ).toBe(false);
  });

  it("rejeita imageUrl acima de 2048 caracteres", () => {
    const base = validData();
    const longUrl = `https://example.com/${"a".repeat(2040)}`;
    expect(characterDataSchema.safeParse({ ...base, imageUrl: longUrl }).success).toBe(false);
  });

  it("rejeita passo de dado fora da escala", () => {
    const base = validData();
    const invalid = {
      ...base,
      autoridades: { ...base.autoridades, yin: "1d20" },
    };
    expect(characterDataSchema.safeParse(invalid).success).toBe(false);
  });

  it("rejeita Fa Jin acima de 1d10", () => {
    const base = validData();
    const invalid = {
      ...base,
      diceProgression: { ...base.diceProgression, faJin: "1d12" },
    };
    expect(characterDataSchema.safeParse(invalid).success).toBe(false);
  });

  it("rejeita resource com current > max", () => {
    const base = validData();
    const invalid = {
      ...base,
      resources: { ...base.resources, chi: { current: 9, max: 5 } },
    };
    expect(characterDataSchema.safeParse(invalid).success).toBe(false);
  });

  it("rejeita seleção fora das opções", () => {
    const base = validData();
    const invalidPostura = { ...base, selections: { ...base.selections, postura: "dragao" } };
    expect(characterDataSchema.safeParse(invalidPostura).success).toBe(false);
    const invalidManobra = {
      ...base,
      selections: { ...base.selections, manobraEstilo: "volar" },
    };
    expect(characterDataSchema.safeParse(invalidManobra).success).toBe(false);
  });

  it("rejeita name vazio e schemaVersion diferente de 1", () => {
    const base = validData();
    expect(characterDataSchema.safeParse({ ...base, name: "  " }).success).toBe(false);
    expect(characterDataSchema.safeParse({ ...base, schemaVersion: 2 }).success).toBe(false);
  });
});
