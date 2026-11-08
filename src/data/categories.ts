// ── Interfaces ──────────────────────────────────────────────────────

export interface RuleTable {
  headers: string[];
  rows: string[][];
}

export interface RuleSection {
  title?: string;
  titleImage?: string;
  badge?: string;
  text?: string;
  items?: string[];
  table?: RuleTable;
  image?: string;
  formulas?: string[];
  examples?: string[];
  dice?: { label?: string; values: string[] };
  pips?: { count: number; label?: string };
  note?: string;
}

export interface ContentCard {
  name: string;
  glyph?: string;
  image?: string;
  dice?: string[];
  text: string;
}

export interface SubSection {
  name: string;
  text: string;
}

export interface Item {
  id: string;
  name: string;
  glyph: string;
  tagline: string;
  description: string;
  tags: string[];
  fullTitle?: string;
  bonuses?: { source: string; value: string }[];
  school?: { name: string; skills: string[]; equipment: string[] };
  orders?: Order[];
  techniques?: Technique[];
  upkeep?: { text: string };
  resource?: Resource;
  difficulty?: Difficulty;
  subSections?: SubSection[];
  elementalVariants?: ElementalVariant[];
  domains?: Domain[];
  spellLibrary?: SpellLibrary[];
  tattoos?: Tattoo[];
  ruleSections?: RuleSection[];
  cards?: ContentCard[];
}

export interface TechniqueEffect {
  name: string;
  text: string;
  subEffects?: SubEffect[];
}

export interface SubEffect {
  name: string;
  text: string;
}

export interface SubAbility {
  name: string;
  text: string;
  categories?: SubAbilityCategory[];
}

export interface SubAbilityCategory {
  name: string;
  examples: string;
}

export interface Technique {
  level: number;
  levelLabel: string;
  title: string;
  intro: string;
  effects: TechniqueEffect[];
  subAbilities?: SubAbility[];
}

export interface Order {
  name: string;
  glyph: string;
  description: string;
  techniques: Technique[];
}

export interface Bonus {
  source: string;
  value: string;
}

export interface School {
  name: string;
  skills: string[];
  equipment: string[];
}

export interface Upkeep {
  text: string;
}

export interface ResourceProgression {
  level: number;
  cost: string;
}

export interface ResourceMethod {
  type: string;
  name: string;
  text: string;
}

export interface Resource {
  name: string;
  description: string;
  progression: ResourceProgression[];
  methods: ResourceMethod[];
}

export interface DifficultyTable {
  level: number;
  na: number;
}

export interface Difficulty {
  formula: string;
  description?: string;
  table?: DifficultyTable[];
}

export interface ElementalVariantBenefit {
  name: string;
  text: string;
}

export interface ElementalVariantItem {
  element: string;
  name: string;
  range: string;
  damage: string;
  special?: string;
  exclusive?: boolean;
}

export interface EkuroVariant {
  name: string;
  description: string;
  benefits: ElementalVariantBenefit[];
  variants: ElementalVariantItem[];
}

export interface WallStats {
  ring: string;
  range: string;
  area: string;
  duration: string;
  increments: string;
}

export interface WallVariant {
  element: string;
  name: string;
  description: string;
}

export interface WallTier {
  name: string;
  stats: WallStats;
  variants: WallVariant[];
}

export interface WallVariantSet {
  name: string;
  description: string;
  tiers: WallTier[];
}

export type ElementalVariant = EkuroVariant | WallVariantSet;

export interface Constellation {
  name: string;
  level: number;
  description: string;
  effect: string;
  extras?: Record<string, string>;
}

export interface Domain {
  name: string;
  description: string;
  constellations: Constellation[];
}

export interface Spell {
  name: string;
  ring: string;
  tags?: string[];
  range: string;
  area: string;
  duration: string;
  increments: string[];
  effect: string;
}

export interface SpellLevel {
  level: number;
  spells: Spell[];
}

export interface SpellLibrary {
  name: string;
  seal: string;
  levels: SpellLevel[];
}

export interface Tattoo {
  name: string;
  description: string;
}

export interface Category {
  id: string;
  seal: string;
  label: string;
  listLabel: string;
  group?: string;
  description?: string;
  items: Item[];
}

// ── Data ────────────────────────────────────────────────────────────

export const DATA: Record<string, Category> = {
  fundamentos: {
    id: "fundamentos",
    seal: "☯",
    label: "Fundamentos do Sistema",
    listLabel: "Capítulos",
    group: "As Seis Harmonias",
    description:
      "Apresenta as mecânicas centrais que regem as ações, disputas e resultados do jogo.",
    items: [
      {
        id: "sistema-dao",
        name: "Sistema Dao: Yin e Yang",
        glyph: "☯",
        tagline: "O motor de rolagem: 2d6, Yin e Yang",
        description:
          "O Dao representa o equilíbrio entre as forças Yin e Yang. Todas as disputas do sistema utilizam essa mecânica como base.",
        tags: ["Dado do Dao: 2d6"],
        ruleSections: [
          {
            title: "Os dois dados",
            items: [
              "☯️ Yin: 1d6 — representa o menor resultado",
              "☯️ Yang: 1d6 — representa o maior resultado",
            ],
          },
          {
            title: "Resultado do Dao",
            text: "O resultado da rolagem é determinado pela diferença entre os dois dados.",
            formulas: ["Yang − Yin = Resultado do Dao"],
          },
        ],
      },
      {
        id: "desarmonia-harmonia",
        name: "Desarmonia e Harmonia",
        glyph: "◑",
        tagline: "Dois estados, duas leituras do resultado",
        description:
          "O sistema possui dois estados fundamentais que determinam como os resultados do Dao são interpretados.",
        tags: [],
        ruleSections: [
          {
            title: "Desarmonia — Rolagem padrão",
            text: "A desarmonia representa o estado natural de quem ainda não domina as artes de equilíbrio entre Yin e Yang. Nas disputas convencionais, o jogador rola os 2d6 do Dao e subtrai o menor resultado do maior. Em seguida, soma o valor do atributo correspondente.",
            examples: [
              "Um lutador realiza um soco utilizando Agilidade (AGIL 2).\nYang: 5 · Yin: 2 · AGIL: 2",
            ],
            formulas: ["5 − 2 + 2 = 5"],
          },
          {
            title: "Harmonia — Rolagem especial",
            text: "Quando os dois dados do Dao apresentam valores iguais, o personagem alcança momentaneamente um estado de harmonia.",
            items: ["1 e 1", "2 e 2", "3 e 3", "4 e 4", "5 e 5", "6 e 6"],
          },
          {
            title: "Regra da harmonia",
            text: "Qualquer resultado com dados iguais gera automaticamente um resultado 6 no Dao. Isso acontece porque, embora a diferença matemática entre os dados seja zero, a igualdade representa o alinhamento entre Yin e Yang: o Taiji em equilíbrio. A harmonia não representa a ausência de resultado, mas sim um estado especial de alinhamento das forças.",
            formulas: ["Resultado automático: 6"],
          },
        ],
      },
      {
        id: "disputas-resolucao",
        name: "Disputas e Resolução",
        glyph: "⚔",
        tagline: "Dao + Atributo contra Dao + Atributo",
        description:
          "As disputas são resolvidas comparando o resultado do Dao somado ao atributo correspondente.",
        tags: [],
        ruleSections: [
          {
            title: "Tabela de disputas",
            table: {
              headers: ["Ação", "Disputa"],
              rows: [
                ["Ataque / Defesa", "Dao + Atributo contra Dao + Atributo"],
                ["Dano / Redução", "Dao + Atributo contra Dao + Atributo"],
              ],
            },
            text: "Cada participante realiza sua rolagem e soma o atributo utilizado na ação. O resultado final determina o vencedor da disputa.",
          },
        ],
      },
    ],
  },
  construcao: {
    id: "construcao",
    seal: "◈",
    label: "Construção do Personagem",
    listLabel: "Capítulos",
    group: "As Seis Harmonias",
    description:
      "Reúne os elementos necessários para criar, desenvolver e evoluir um personagem.",
    items: [
      {
        id: "fontes-de-energia",
        name: "Fontes de Energia",
        glyph: "◈",
        tagline: "Cinco fontes, duas por personagem",
        description:
          "O sistema possui cinco fontes de energia, cada uma responsável por alimentar diferentes habilidades e capacidades dos personagens. Cada personagem pode possuir duas fontes de energia, sendo uma delas obrigatoriamente determinada por sua classe. A segunda fonte fica a critério do jogador, permitindo maior liberdade na construção do personagem.",
        tags: ["Duas fontes por personagem"],
        ruleSections: [
          {
            title: "As cinco fontes",
            table: {
              headers: ["Fonte", "Utilização"],
              rows: [
                ["Qi", "Utilizado para executar Fa Jin, Radians e ativar a Sincronia Qi."],
                ["Aura", "Utilizada para ativar a Potência dos Atributos."],
                ["Prana", "Utilizado para recuperar a saúde e curar ferimentos."],
                ["Mana", "Utilizada pelos Magos para alimentar suas habilidades e poderes mágicos."],
                ["Ether", "Utilizado por Eons e Astrais, espécies de natureza mágica, para alimentar suas habilidades e poderes especiais."],
              ],
            },
          },
          {
            title: "Regra de classe",
            text: "Uma das duas fontes de energia do personagem deve ser obrigatoriamente aquela correspondente à sua classe. A segunda pode ser escolhida livremente entre as fontes disponíveis.",
          },
        ],
      },
      {
        id: "evolucao-fontes",
        name: "Evolução das Fontes de Energia",
        glyph: "▲",
        tagline: "Até 10 níveis, dados distintos",
        description:
          "Cada fonte de energia pode adquirir até 10 níveis. Ao investir em uma fonte, o jogador escolhe um dado para representá-la.",
        tags: ["Custo: 50 XP por nível"],
        ruleSections: [
          {
            title: "Escolha de dado",
            text: "Existem três opções de dado para representar a fonte:",
            dice: { label: "Opções", values: ["1d6", "1d8", "1d10"] },
          },
          {
            title: "Regra de diferenciação",
            text: "Cada fonte de energia deve possuir um dado diferente. Portanto, as duas fontes escolhidas pelo personagem devem utilizar dados distintos, sem repetição.",
            examples: ["Qi: 1d10 · Aura: 1d6"],
          },
        ],
      },
      {
        id: "vitalidade-pv",
        name: "Vitalidade e Pontos de Vida",
        glyph: "✚",
        tagline: "+10 PV por nível, até o nível 10",
        description:
          "A Vitalidade representa a capacidade do personagem de suportar danos e permanecer em combate.",
        tags: [],
        ruleSections: [
          {
            title: "Regras da Vitalidade",
            items: [
              "Cada nível adquirido concede +10 pontos de vida",
              "A Vitalidade pode evoluir até o nível 10",
              "Não utiliza dados",
            ],
            pips: { count: 10, label: "Vitalidade" },
          },
        ],
      },
      {
        id: "progressao-nivel",
        name: "Progressão de Nível e Experiência",
        glyph: "▲",
        tagline: "Humano até o 3, sobre-humano até o 10",
        description:
          "A progressão dos níveis determina o potencial físico do personagem, diferenciando suas capacidades humanas e sobre-humanas.",
        tags: [],
        ruleSections: [
          {
            title: "Tabela de progressão",
            table: {
              headers: ["Nível", "Classificação", "Custo por nível"],
              rows: [
                ["1 ao 3", "Humano", "50 XP"],
                ["4 ao 10", "Sobre-humano", "100 XP"],
              ],
            },
          },
        ],
      },
      {
        id: "atributos-fisicos",
        name: "Atributos Físicos",
        glyph: "◆",
        tagline: "AGIL, REF, FOR e RES — escala 1 a 6",
        description:
          "Os atributos representam as capacidades físicas e funcionais do personagem. Cada atributo possui uma escala de 1 a 6, que é somada às rolagens do Dao durante as disputas.",
        tags: ["Escala: 1 a 6"],
        ruleSections: [
          {
            title: "AGIL — Agilidade",
            text: "Representa a coordenação, destreza e capacidade de executar movimentos precisos.",
            dice: { label: "Potência", values: ["1d4", "1d6", "1d8", "1d10"] },
            pips: { count: 6, label: "Escala 1–6" },
          },
          {
            title: "REF — Reflexo",
            text: "Representa a capacidade de reação, percepção de movimentos e resposta rápida a ameaças.",
            dice: { label: "Potência", values: ["1d4", "1d6", "1d8", "1d10"] },
            pips: { count: 6, label: "Escala 1–6" },
          },
          {
            title: "FOR — Força",
            text: "Representa a força física e a capacidade de exercer potência muscular.",
            dice: { label: "Potência", values: ["1d4", "1d6", "1d8", "1d10"] },
            pips: { count: 6, label: "Escala 1–6" },
          },
          {
            title: "RES — Resistência",
            text: "Representa a capacidade de suportar impactos, esforços físicos e danos.",
            dice: { label: "Potência", values: ["1d4", "1d6", "1d8", "1d10"] },
            pips: { count: 6, label: "Escala 1–6" },
          },
        ],
      },
      {
        id: "atributos-especiais",
        name: "Atributos Especiais",
        glyph: "✦",
        tagline: "VEL, MEN e ESP",
        description:
          "Os atributos especiais representam capacidades que vão além das disputas físicas convencionais.",
        tags: [],
        ruleSections: [
          {
            title: "VEL — Velocidade",
            text: "Determina a capacidade de movimentação do personagem no mapa de batalha.",
            dice: { label: "Potência", values: ["1d4", "1d6", "1d8", "1d10"] },
          },
          {
            title: "MEN — Mente",
            text: "Utilizado para defesa contra ataques psíquicos.",
            dice: { label: "Potência", values: ["1d4", "1d6", "1d8", "1d10"] },
          },
          {
            title: "ESP — Espírito",
            text: "Utilizado para defesa contra ataques espirituais.",
            dice: { label: "Potência", values: ["1d4", "1d6", "1d8", "1d10"] },
          },
        ],
      },
      {
        id: "potencia-atributos",
        name: "Potência dos Atributos",
        glyph: "⚡",
        tagline: "Além do limite humano por 3 Aura",
        description:
          "A Potência representa a capacidade de ultrapassar os limites humanos de determinado atributo, alcançando níveis sobre-humanos. Cada atributo possui um dado de Potência próprio.",
        tags: ["Custo de ativação: 3 Aura"],
        ruleSections: [
          {
            title: "Ativação",
            text: "Ao ativar a Potência, o personagem utiliza o dado correspondente ao atributo escolhido para ampliar sua capacidade naquela ação.",
            dice: { label: "Potência", values: ["1d4", "1d6", "1d8", "1d10"] },
          },
        ],
      },
    ],
  },
  "kf-tecnicas": {
    id: "kf-tecnicas",
    seal: "⚔",
    label: "Técnicas de Combate",
    listLabel: "Capítulos",
    group: "Kowloon Fighters",
    description:
      "Reúne as técnicas que utilizam Qi para ampliar as capacidades ofensivas e defensivas dos Kowloon Fighters.",
    items: [
      {
        id: "sincronia-qi",
        name: "Sincronia Qi: Yin/Yang",
        glyph: "☯",
        tagline: "Alinhamento Yin/Yang e o estado Shin-Gi-Tai",
        description:
          "A Sincronia Qi permite que o personagem entre em um estado especial de alinhamento entre Yin e Yang, modificando as regras convencionais do Dao. Dado-base da Sincronia: 2d6.",
        tags: ["Custo: 5 Qi"],
        ruleSections: [
          {
            title: "Duração",
            text: "A Sincronia possui um dado próprio para determinar sua duração:",
            dice: { label: "Dado de Duração", values: ["1d4", "1d6", "1d8", "1d10"] },
          },
          {
            title: "Desarmonia durante a Sincronia",
            text: "Enquanto estiver em Sincronia Qi, os resultados 1 + 6 e 6 + 1 são considerados resultados válidos. Diferentemente das rolagens convencionais, esses resultados não representam desarmonia nem sofrem qualquer penalidade especial.",
            items: ["1 + 6", "6 + 1"],
          },
          {
            title: "Harmonia durante a Sincronia — Shin-Gi-Tai",
            text: "Caso os dois dados apresentem valores iguais, o personagem alcança o estado supremo da Sincronia: Shin-Gi-Tai. Nesse estado, o personagem adiciona o dado de Shin-Gi-Tai ao resultado da rolagem original.",
            dice: {
              label: "Dado de Shin-Gi-Tai",
              values: ["1d4", "1d6", "1d8", "1d10", "1d12", "1d20"],
            },
          },
        ],
      },
      {
        id: "radians",
        name: "Radians",
        glyph: "◉",
        tagline: "Energia concentrada em dano ou redução",
        description:
          "Radians é uma técnica que concentra energia para ampliar o poder ofensivo ou defensivo do personagem. Ao utilizar Radians, o personagem adiciona o resultado do dado-base ao dano causado ou à redução de dano recebida.",
        tags: ["Custo: 3 Qi", "Tipo de dano: Agravado"],
        ruleSections: [
          {
            title: "Dado-base",
            dice: { values: ["1d4", "1d6", "1d8", "1d10"] },
          },
        ],
      },
      {
        id: "fa-jin",
        name: "Fa Jin",
        glyph: "拳",
        tagline: "Liberação de energia com projeção",
        description:
          "Fa Jin é uma técnica de liberação concentrada de energia, utilizada para potencializar ataques e projetar força sobre o adversário. Cada nível investido acrescenta um Dado Base ao dano.",
        tags: ["Custo: 3 Qi por nível", "Tipo de dano: Agravado"],
        ruleSections: [
          {
            title: "Dado-base",
            dice: { values: ["1d4", "1d6", "1d8", "1d10"] },
          },
          {
            title: "Níveis de Fa Jin",
            text: "Cada nível investido acrescenta um Dado Base ao dano. Custo: 3 Qi por nível.",
            pips: { count: 10, label: "Níveis" },
          },
          {
            title: "Projeção Fa Jin",
            text: "A Projeção determina a distância em que o personagem consegue projetar a força do Fa Jin. Cada nível de Projeção acrescenta 1 metro de alcance, até o limite máximo de 10 metros.",
            pips: { count: 10, label: "Projeção" },
          },
        ],
      },
    ],
  },
  "kf-estilos": {
    id: "kf-estilos",
    seal: "龍",
    label: "Estilos de Luta",
    listLabel: "Capítulos",
    group: "Kowloon Fighters",
    description:
      "Apresenta o estilo marcial exclusivo dos Kowloon Fighters e suas especializações elementais.",
    items: [
      {
        id: "kyuryu-shotenken",
        name: "Estilo Kyūryū Shōtenken",
        glyph: "龍",
        tagline: "Nove dragões elementais, três escolhas",
        description:
          "O Kyūryū Shōtenken é um sistema de estilos de luta inspirado nos nove dragões elementais. Cada dragão representa uma força da natureza e concede ao personagem um bônus específico, complementando seus atributos e suas fontes de energia.",
        tags: ["Até 3 dragões", "3 pts da fonte por uso"],
        ruleSections: [
          {
            title: "Seleção dos Dragões",
            text: "O personagem pode escolher até 3 dragões, que representam os estilos incorporados à sua técnica de combate. Cada dragão possui uma progressão própria de dado.",
            dice: {
              label: "Progressão do Dragão",
              values: ["1d4", "1d6", "1d8", "1d10", "1d12"],
            },
          },
          {
            title: "Custo de Uso",
            text: "Cada utilização de um dragão custa 3 pontos da fonte de energia vinculada a ele.",
          },
          {
            title: "Vínculo com as Fontes de Energia",
            text: "Cada dragão escolhido deve ser vinculado a uma das fontes de energia do personagem. O vínculo determina de qual fonte serão descontados os pontos quando o dragão for utilizado.",
            items: ["Qi", "Aura", "Prana"],
          },
          {
            title: "Aplicação do Bônus",
            text: "Ao utilizar um dragão, seu dado é somado à rolagem do atributo correspondente, respeitando o efeito específico e a natureza elemental daquele dragão.",
          },
        ],
      },
      {
        id: "nove-dragoes",
        name: "Os Nove Dragões",
        glyph: "❖",
        tagline: "Os estilos elementais do Kyūryū Shōtenken",
        description:
          "Cada dragão possui uma característica própria, oferecendo diferentes possibilidades de especialização durante o combate.",
        tags: ["Dado do Dragão: 1d4–1d12"],
        cards: [
          {
            name: "Dragão do Fogo",
            glyph: "火",
            image: "/dragoes/dragao-do-fogo.jpg",
            dice: ["1d4", "1d6", "1d8", "1d10", "1d12"],
            text: "Vinculado à Força (FOR). Adiciona seu dado às rolagens de Força.",
          },
          {
            name: "Dragão da Terra",
            glyph: "地",
            image: "/dragoes/dragao-da-terra.jpg",
            dice: ["1d4", "1d6", "1d8", "1d10", "1d12"],
            text: "Vinculado à Resistência (RES). Adiciona seu dado às rolagens de Resistência.",
          },
          {
            name: "Dragão do Ar",
            glyph: "風",
            image: "/dragoes/dragao-do-ar.jpg",
            dice: ["1d4", "1d6", "1d8", "1d10", "1d12"],
            text: "Vinculado à Agilidade (AGIL). Adiciona seu dado às rolagens de Agilidade.",
          },
          {
            name: "Dragão da Água",
            glyph: "水",
            image: "/dragoes/dragao-da-agua.jpg",
            dice: ["1d4", "1d6", "1d8", "1d10", "1d12"],
            text: "Vinculado ao Reflexo (REF). Adiciona seu dado às rolagens de Reflexo.",
          },
          {
            name: "Dragão da Gravidade",
            glyph: "重",
            image: "/dragoes/dragao-da-gravidade.jpg",
            dice: ["1d4", "1d6", "1d8", "1d10", "1d12"],
            text: "Vinculado à Velocidade (VEL). Adiciona seu dado às rolagens de Velocidade.",
          },
          {
            name: "Dragão da Luz",
            glyph: "光",
            image: "/dragoes/dragao-da-luz.jpg",
            dice: ["1d4", "1d6", "1d8", "1d10", "1d12"],
            text: "Seu poder é ativado ao alcançar o Shin-Gi-Tai. Seu dado é somado ao dado de Shin-Gi-Tai.",
          },
          {
            name: "Dragão das Sombras",
            glyph: "影",
            image: "/dragoes/dragao-das-sombras.jpg",
            dice: ["1d4", "1d6", "1d8", "1d10", "1d12"],
            text: "Seu poder é ativado ao alcançar o estado de Harmonia. Seu dado é somado ao resultado da jogada.",
          },
          {
            name: "Dragão da Natureza",
            glyph: "自",
            image: "/dragoes/dragao-da-natureza.jpg",
            dice: ["1d4", "1d6", "1d8", "1d10", "1d12"],
            text: "Vinculado ao Prana. Adiciona seu dado às rolagens de Prana utilizadas para cura.",
          },
          {
            name: "Dragão do Vácuo",
            glyph: "空",
            image: "/dragoes/dragao-do-vacuo.jpg",
            dice: ["1d4", "1d6", "1d8", "1d10", "1d12"],
            text: "Altera a interpretação da Desarmonia, fazendo com que ela seja considerada Harmonia. Seu dado é somado ao resultado.",
          },
        ],
      },
    ],
  },
};

export const ALL_CATEGORIES: Category[] = Object.values(DATA);

/** Descrição de grupo (ex.: visão geral de uma classe) exibida no ItemList. */
export const GROUP_DESCRIPTIONS: Record<string, string> = {
  "Kowloon Fighters":
    "Lutadores de Kowloon. Fonte de poder: Qi. Os Kowloon Fighters são combatentes que utilizam o Qi como fonte de energia para potencializar suas técnicas marciais, manipular as forças de Yin e Yang e alcançar estados superiores de combate. A classe possui acesso a: Sincronia Qi (Yin/Yang), Radians, Fa Jin e o Estilo Kyūryū Shōtenken.",
};
