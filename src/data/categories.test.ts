import { describe, expect, it } from "vitest";
import { ALL_CATEGORIES, DATA, GROUP_DESCRIPTIONS } from "./categories";

describe("categories — estrutura do conteúdo", () => {
  it("tem as 8 categorias na ordem esperada", () => {
    expect(ALL_CATEGORIES.map((c) => c.id)).toEqual([
      "fundamentos",
      "construcao",
      "regras-combate",
      "glossario",
      "arquetipos",
      "arquetipos-especiais",
      "kf-tecnicas",
      "kf-estilos",
    ]);
  });

  it("conta de capítulos por categoria", () => {
    expect(DATA.fundamentos.items).toHaveLength(5);
    expect(DATA.construcao.items).toHaveLength(9);
    expect(DATA["regras-combate"].items).toHaveLength(1);
    expect(DATA.glossario.items).toHaveLength(1);
    expect(DATA.arquetipos.items).toHaveLength(5);
    expect(DATA["arquetipos-especiais"].items).toHaveLength(1);
    expect(DATA["kf-tecnicas"].items).toHaveLength(4);
    expect(DATA["kf-estilos"].items).toHaveLength(3);
  });

  it("grupos e descrições de categoria presentes", () => {
    expect(DATA.fundamentos.group).toBe("As Seis Harmonias");
    expect(DATA["kf-estilos"].group).toBe("Kowloon Fighters");
    expect(DATA["arquetipos-especiais"].group).toBe("Kowloon Fighters");
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

  it("16 arquétipos gerais (5 capítulos), todos com Dado do Arquétipo", () => {
    const gerais = DATA.arquetipos.items.flatMap((i) => i.ruleSections ?? []);
    expect(gerais).toHaveLength(16);
    for (const arq of gerais) {
      expect(arq.dice?.values).toEqual(["1d4", "1d6", "1d8", "1d10"]);
    }
  });

  it("Arquétipos Especiais KF: 3 opções com regras de acesso às técnicas", () => {
    const secoes = DATA["arquetipos-especiais"].items[0].ruleSections ?? [];
    const titulos = secoes.map((s) => s.title);
    expect(titulos).toContain("1. Artista Marcial — Kyūryū Hyakusōken");
    expect(titulos).toContain("2. Tai Chi");
    expect(titulos).toContain("3. Shōtenken");
    expect(titulos).toContain("Acesso às técnicas — Kyūryū Hyakusōken");
    expect(titulos).toContain("Acesso às técnicas — Tai Chi");
    const hyakusoken = secoes.find((s) => s.title === "Acesso às técnicas — Kyūryū Hyakusōken");
    expect(hyakusoken?.items).toEqual([
      "3 técnicas básicas",
      "2 técnicas intermediárias",
      "2 técnicas mestras",
    ]);
  });

  it("VON está nos Atributos Especiais, não em capítulo separado", () => {
    const especiais = DATA.construcao.items.find((i) => i.id === "atributos-especiais");
    expect(especiais?.ruleSections?.map((s) => s.title)).toEqual([
      "VEL — Velocidade",
      "MEN — Mente",
      "ESP — Espírito",
      "VON — Vontade",
    ]);
    expect(DATA.fundamentos.items.some((i) => i.id === "von-vontade")).toBe(false);
  });

  it("Competências: 24 entradas oficiais", () => {
    const comp = DATA.construcao.items.find((i) => i.id === "competencias");
    expect(comp?.ruleSections).toHaveLength(24);
    expect(comp?.ruleSections?.[0].title).toBe("Atletismo");
    expect(comp?.ruleSections?.[23].title).toBe("Tradução");
  });

  it("Técnicas de Combate: 3 níveis com 17 técnicas e 2 exclusivas Tai Chi", () => {
    const tec = DATA["kf-tecnicas"].items.find((i) => i.id === "tecnicas-de-nivel");
    const titulos = (tec?.ruleSections ?? []).map((s) => s.title);
    expect(titulos).toContain("2.2. Técnicas de nível iniciante");
    expect(titulos).toContain("2.3. Técnicas de nível intermediário");
    expect(titulos).toContain("2.4. Técnicas de nível mestre");
    const exclusivas = (tec?.ruleSections ?? []).filter((s) => s.badge === "Exclusivo Tai Chi");
    expect(exclusivas.map((s) => s.title)).toEqual([
      "Redirecionamento do Fluxo",
      "O Abraço da Névoa",
    ]);
  });

  it("Kyūryū Shōtenken tem requisito de acesso e Tai Chi registrado como em construção", () => {
    const kyuryu = DATA["kf-estilos"].items.find((i) => i.id === "kyuryu-shotenken");
    expect(kyuryu?.ruleSections?.[0].title).toBe("Requisito de acesso");
    expect(kyuryu?.tags).toContain("Requisito: Arquétipo Artista Marcial Kyūryū Shōtenken");
    const taiChi = DATA["kf-estilos"].items.find((i) => i.id === "tai-chi-kyuryu");
    expect(taiChi?.tags).toContain("Em construção");
    expect(taiChi?.description).toContain("sem criar técnicas, poderes, custos ou efeitos");
  });

  it("manobras preservam o custo literal e Agarrar usa Dado de Dao", () => {
    const manobras = DATA["regras-combate"].items[0];
    expect(manobras.description).toBe("Custo padrão das manobras: 3 pontos de Taiji ou 4 CP.");
    expect(manobras.ruleSections?.map((s) => s.title)).toEqual([
      "1. Golpe Poderoso",
      "2. Ataque Veloz",
      "3. Saltar",
      "4. Correr",
      "5. Derrubar",
      "6. Agarrar",
    ]);
    const agarrar = manobras.ruleSections?.[5];
    expect(agarrar?.text).toContain("Dado de Dao contra Dado de Dao");
    expect(agarrar?.text).not.toContain("Yin contra Yang");
    expect(agarrar?.note).toContain("Não utilizar Yin contra Yang como testes separados");
  });
});
