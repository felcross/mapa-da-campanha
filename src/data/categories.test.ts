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
    expect(DATA["kowloon-fighters"].items.map((i) => i.id)).toEqual([
      "introducao",
      "arquetipos-especiais",
      "poderes-exclusivos",
      "tecnicas-de-nivel",
      "feiticeria-tai-chi",
      "nove-dragoes",
    ]);
  });

  it("grupos e descrições de categoria presentes", () => {
    expect(DATA.fundamentos.group).toBe("As Seis Harmonias");
    expect(DATA.arquetipos.group).toBe("As Seis Harmonias");
    expect(DATA["kowloon-fighters"].group).toBe("Classes");
    for (const cat of ALL_CATEGORIES) {
      if (cat.id !== "kowloon-fighters") {
        expect(cat.description).toBeTruthy();
      }
    }
    expect(DATA["kowloon-fighters"].description).toBeUndefined();
    expect(GROUP_DESCRIPTIONS["Classes"]).toBeUndefined();
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
    const dragões = DATA["kowloon-fighters"].items.find((i) => i.id === "nove-dragoes");
    expect(dragões?.cards).toHaveLength(9);
    for (const card of dragões?.cards ?? []) {
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

  it("Arquétipos Especiais KF: 3 cards com arte e bônus", () => {
    const kf = DATA["kowloon-fighters"].items.find((i) => i.id === "arquetipos-especiais");
    const cards = kf?.cards ?? [];
    expect(cards.map((c) => c.name)).toEqual([
      "1. Artista Marcial — Kyūryū Hyakusōken",
      "2. Artista Marcial — Tai Chi Kyūryū",
      "3. Artista Marcial — Kyūryū Shōtenken",
    ]);
    expect(cards.map((c) => c.image)).toEqual([
      "/arquetipos/hyakusoken.webp",
      "/arquetipos/tai-chi-kyuryu.webp",
      "/arquetipos/kyuryu-shotenken.webp",
    ]);
    for (const card of cards) {
      expect(card.imageFit).toBe("contain");
      expect(card.dice).toEqual(["1d4", "1d6", "1d8", "1d10"]);
      expect(card.items).toEqual(["Conhecimento: +3", "Duas Competências à escolha"]);
    }
    expect(cards[0].note).toContain(
      "Acesso às técnicas: 3 técnicas básicas, 2 técnicas intermediárias, 2 técnicas mestras",
    );
    expect(cards[1].text).toContain("acesso à feitiçaria Tai Chi Kyūryū");
    expect(cards[1].note).toContain(
      "Bônus: os praticantes de Tai Chi Kyūryū ganham 1 técnica intermediária exclusiva e 1 técnica mestra exclusiva",
    );
    expect(cards[2].text).toBe(
      "Categoria: Classe Kowloon Fighters. Descrição: acesso aos poderes do estilo Kyūryū Shōtenken.",
    );
    expect(cards[2].note).toContain(
      "Bônus: o personagem pode escolher 1 técnica básica, 1 técnica intermediária e 1 técnica mestra",
    );
    expect(cards[2].note).toContain("não podem ter seus bônus acumulados entre si");
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

  it("Kyūryū Shōtenken tem requisito de acesso; Tai Chi saiu dos estilos", () => {
    const dragões = DATA["kowloon-fighters"].items.find((i) => i.id === "nove-dragoes");
    expect(dragões?.name).toBe("Os Nove Dragões");
    expect(dragões?.ruleSections?.[1].title).toBe("Requisito de acesso");
    expect(dragões?.tags).toContain("Requisito: Arquétipo Artista Marcial Kyūryū Shōtenken");
    const titulos = (dragões?.ruleSections ?? []).map((s) => s.title);
    expect(titulos).toContain("Estilo Kyūryū Shōtenken");
    expect(titulos).toContain("Seleção dos Dragões");
    expect(titulos).toContain("Os Nove Dragões");
    expect(titulos).not.toContain("Estilo Tai Chi Kyūryū");
    expect(titulos).not.toContain("Tai Chi Kyūryū — Status do conteúdo");
    expect(dragões?.ruleSections?.some((s) => s.badge === "Em construção")).toBe(false);
  });

  it("Introdução da classe Kowloon Fighters traz os textos e a imagem", () => {
    const intro = DATA["kowloon-fighters"].items.find((i) => i.id === "introducao");
    expect(intro?.description).toContain("Lutadores de Kowloon. Fonte de poder: Qi.");
    expect(intro?.ruleSections?.[0].image).toBe("/kowloon/kowloon-intro-1024.webp");
    expect(intro?.ruleSections?.[0].text).toContain("Feitiçaria Tai Chi Kyūryū e Os Nove Dragões");
  });

  it("Feitiçaria Tai Chi Kyūryū: 4 áreas e 13 técnicas", () => {
    const feit = DATA["kowloon-fighters"].items.find((i) => i.id === "feiticeria-tai-chi");
    expect(feit?.description).toContain("Fonte de energia: Prana");
    expect(feit?.ruleSections).toHaveLength(17);
    const titulos = (feit?.ruleSections ?? []).map((s) => s.title);
    expect(titulos).toContain("1. Psionismo — Domínio Mental");
    expect(titulos).toContain("2. Telecinese — Manipulação à Distância");
    expect(titulos).toContain("3. Percepção Extrassensorial — Sentidos Ampliados");
    expect(titulos).toContain("4. Autodomínio Vital — Controle Interno");
    expect(titulos).toContain("Leitura Mental");
    expect(titulos).toContain("Campo Telecinético");
    expect(titulos).toContain("Leitura de Vestígios");
    expect(titulos).toContain("Disciplina Vital");
    const areas = (feit?.ruleSections ?? []).filter((s) => s.text?.startsWith("Função:"));
    expect(areas).toHaveLength(4);
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
