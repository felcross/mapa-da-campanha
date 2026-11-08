import { describe, expect, it } from "vitest";
import { ALL_CATEGORIES, DATA, GROUP_DESCRIPTIONS } from "./categories";

describe("categories — estrutura do conteúdo", () => {
  it("tem as 6 categorias na ordem esperada", () => {
    expect(ALL_CATEGORIES.map((c) => c.id)).toEqual([
      "fundamentos",
      "construcao",
      "regras-combate",
      "glossario",
      "arquetipos",
      "kowloon-fighters",
    ]);
  });

  it("conta de capítulos por categoria", () => {
    expect(DATA.fundamentos.items).toHaveLength(3);
    expect(DATA.construcao.items).toHaveLength(9);
    expect(DATA["regras-combate"].items).toHaveLength(1);
    expect(DATA.glossario.items).toHaveLength(1);
    expect(DATA.arquetipos.items).toHaveLength(6);
    expect(DATA["kowloon-fighters"].items).toHaveLength(4);
  });

  it("grupos e descrições de categoria presentes", () => {
    expect(DATA.fundamentos.group).toBe("As Seis Harmonias");
    expect(DATA.arquetipos.group).toBe("As Seis Harmonias");
    expect(DATA["kowloon-fighters"].group).toBe("Classes");
    for (const cat of ALL_CATEGORIES) {
      expect(cat.description).toBeTruthy();
    }
    expect(GROUP_DESCRIPTIONS["Classes"]).toContain("Qi");
    expect(GROUP_DESCRIPTIONS["Kowloon Fighters"]).toBeUndefined();
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

  it("Introdução em Arquétipos cobre escolha, competências e testes", () => {
    const intro = DATA.arquetipos.items.find((i) => i.id === "introducao");
    const titulos = (intro?.ruleSections ?? []).map((s) => s.title);
    expect(titulos).toContain("1.1. Escolha de Arquétipos");
    expect(titulos).toContain("1.2. Os Arquétipos");
    expect(titulos).toContain("1.3. Competências e Bônus");
    expect(titulos).toContain("2.1. Desafios Mundanos");
    expect(titulos).toContain("2.2. Testes de Competência — Com Competência");
    expect(titulos).toContain("2.2. Testes de Competência — Sem Competência");
    expect(titulos).toContain("2.3. Testes Contestados — Exemplo: Seduzir");
    const escolha = intro?.ruleSections?.find((s) => s.title === "1.1. Escolha de Arquétipos");
    expect(escolha?.items).toEqual([
      "1 Arquétipo relacionado à sua classe",
      "2 Arquétipos livres, escolhidos pelo jogador",
    ]);
    const comComp = intro?.ruleSections?.find(
      (s) => s.title === "2.2. Testes de Competência — Com Competência",
    );
    expect(comComp?.text).toContain("por meio de um de seus Arquétipos");
    const desafios = intro?.ruleSections?.find((s) => s.title === "2.1. Desafios Mundanos");
    expect(desafios?.table?.rows).toEqual([
      ["1 a 10", "Mundano"],
      ["11 a 15", "Heroico — feitos que beiram o sobre-humano"],
      ["16 a 20", "Sobre-humano"],
      ["21 a 30", "Bestas e Divindades"],
    ]);
    expect(DATA.fundamentos.items.some((i) => i.id === "comeco-do-jogo")).toBe(false);
    expect(DATA.fundamentos.items.some((i) => i.id === "regras-gerais-testes")).toBe(false);
  });

  it("Os Nove Dragões tem 9 cards, cada um com imagem e kanji", () => {
    const estilos = DATA["kowloon-fighters"].items.find((i) => i.id === "estilos-de-luta");
    expect(estilos?.cards).toHaveLength(9);
    for (const card of estilos?.cards ?? []) {
      expect(card.image).toMatch(/^\/dragoes\/dragao-.+\.jpg$/);
      expect(card.glyph).toHaveLength(1);
      expect(card.dice).toHaveLength(5);
    }
  });

  it("16 arquétipos gerais em cards (5 capítulos), com imagem e Dado do Arquétipo", () => {
    const gerais = DATA.arquetipos.items.flatMap((i) => i.cards ?? []);
    expect(gerais).toHaveLength(16);
    for (const arq of gerais) {
      expect(arq.image).toMatch(/^\/arquetipos\/\d{2}-[a-z-]+-1024\.webp$/);
      expect(arq.srcSet).toContain("-640.webp 640w");
      expect(arq.dice).toEqual(["1d4", "1d6", "1d8", "1d10"]);
      expect(arq.items?.length).toBeGreaterThan(0);
      expect(arq.note).toBeTruthy();
    }
  });

  it("Arquétipos Especiais KF: 3 opções com regras de acesso às técnicas", () => {
    const kf = DATA["kowloon-fighters"].items.find((i) => i.id === "arquetipos-especiais");
    const secoes = kf?.ruleSections ?? [];
    const titulos = secoes.map((s) => s.title);
    expect(titulos).toContain("1. Artista Marcial — Kyūryū Hyakusōken");
    expect(titulos).toContain("2. Artista Marcial — Tai Chi Kyūryū");
    expect(titulos).toContain("3. Artista Marcial — Kyūryū Shōtenken");
    expect(titulos).toContain("Acesso às técnicas — Kyūryū Hyakusōken");
    expect(titulos).toContain("Acesso às técnicas — Tai Chi");
    const hyakusoken = secoes.find((s) => s.title === "Acesso às técnicas — Kyūryū Hyakusōken");
    expect(hyakusoken?.items).toEqual([
      "3 técnicas básicas",
      "2 técnicas intermediárias",
      "2 técnicas mestras",
    ]);
    const shotenken = secoes.find((s) => s.title === "3. Artista Marcial — Kyūryū Shōtenken");
    expect(shotenken?.dice?.values).toEqual(["1d4", "1d6", "1d8", "1d10"]);
    expect(shotenken?.items).toContain("Conhecimento: +3");
    expect(shotenken?.items).toContain("Duas Competências à escolha");
    expect(shotenken?.note).toContain("História da Ordem e outros dois conhecimentos à escolha");
  });

  it("Poderes Exclusivos reúne Sincronia Qi, Radians e Fa Jin numa página", () => {
    const poderes = DATA["kowloon-fighters"].items.find((i) => i.id === "poderes-exclusivos");
    const titulos = (poderes?.ruleSections ?? []).map((s) => s.title);
    expect(titulos).toContain("Sincronia Qi: Yin/Yang");
    expect(titulos).toContain("Radians");
    expect(titulos).toContain("Fa Jin");
    expect(titulos).toContain("Níveis de Fa Jin");
    expect(titulos).toContain("Projeção Fa Jin");
    expect(poderes?.tags).toContain("Custo: 5 Qi");
    expect(poderes?.tags).toContain("Custo: 3 Qi por nível");
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
    const tec = DATA["kowloon-fighters"].items.find((i) => i.id === "tecnicas-de-nivel");
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
    const estilos = DATA["kowloon-fighters"].items.find((i) => i.id === "estilos-de-luta");
    expect(estilos?.ruleSections?.[1].title).toBe("Requisito de acesso");
    expect(estilos?.tags).toContain("Requisito: Arquétipo Artista Marcial Kyūryū Shōtenken");
    const titulos = (estilos?.ruleSections ?? []).map((s) => s.title);
    expect(titulos).toContain("Estilo Tai Chi Kyūryū");
    expect(titulos).toContain("Tai Chi Kyūryū — Status do conteúdo");
    const taiChi = estilos?.ruleSections?.find((s) => s.title === "Estilo Tai Chi Kyūryū");
    expect(taiChi?.badge).toBe("Em construção");
    expect(taiChi?.text).toContain("sem criar técnicas, poderes, custos ou efeitos");
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
