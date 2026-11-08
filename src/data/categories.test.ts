import { describe, expect, it } from "vitest";
import { ALL_CATEGORIES, DATA, GROUP_DESCRIPTIONS } from "./categories";

describe("categories — estrutura do conteúdo", () => {
  it("tem as 4 categorias na ordem esperada", () => {
    expect(ALL_CATEGORIES.map((c) => c.id)).toEqual([
      "fundamentos",
      "construcao",
      "kf-tecnicas",
      "kf-estilos",
    ]);
  });

  it("conta de capítulos por categoria", () => {
    expect(DATA.fundamentos.items).toHaveLength(3);
    expect(DATA.construcao.items).toHaveLength(7);
    expect(DATA["kf-tecnicas"].items).toHaveLength(3);
    expect(DATA["kf-estilos"].items).toHaveLength(2);
  });

  it("grupos e descrições de categoria presentes", () => {
    expect(DATA.fundamentos.group).toBe("As Seis Harmonias");
    expect(DATA["kf-estilos"].group).toBe("Kowloon Fighters");
    for (const cat of ALL_CATEGORIES) {
      expect(cat.description).toBeTruthy();
    }
    expect(GROUP_DESCRIPTIONS["Kowloon Fighters"]).toContain("Qi");
  });

  it("todo item tem os campos obrigatórios", () => {
    for (const cat of ALL_CATEGORIES) {
      for (const item of cat.items) {
        expect(item.id).toBeTruthy();
        expect(item.name).toBeTruthy();
        expect(item.glyph).toBeTruthy();
        expect(item.tagline).toBeTruthy();
        expect(item.description).toBeTruthy();
        expect(item.tags).toBeDefined();
      }
    }
  });

  it("Os Nove Dragões tem 9 cards, cada um com imagem e kanji", () => {
    const dragões = DATA["kf-estilos"].items.find((i) => i.id === "nove-dragoes");
    expect(dragões?.cards).toHaveLength(9);
    for (const card of dragões?.cards ?? []) {
      expect(card.image).toMatch(/^\/dragoes\/dragao-.+\.jpg$/);
      expect(card.glyph).toHaveLength(1);
      expect(card.dice).toHaveLength(5);
    }
  });
});
