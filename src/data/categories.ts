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

const DADO_ARQUETIPO: { label: string; values: string[] } = {
  label: "Dado do Arquétipo",
  values: ["1d4", "1d6", "1d8", "1d10"],
};

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
      {
        id: "comeco-do-jogo",
        name: "Começo do Jogo",
        glyph: "◇",
        tagline: "Arquétipos e Competências na criação",
        description:
          "No início do jogo, cada personagem escolhe seus Arquétipos e desenvolve suas Competências para interagir com o mundo.",
        tags: ["3 Arquétipos"],
        ruleSections: [
          {
            title: "Escolha de Arquétipos",
            text: "No início do jogo, cada personagem escolhe 3 Arquétipos:",
            items: [
              "1 Arquétipo relacionado à sua classe",
              "2 Arquétipos livres, escolhidos pelo jogador",
            ],
          },
          {
            title: "Os Arquétipos",
            text: "Os Arquétipos representam as áreas em que o personagem possui experiência, conhecimento e habilidade para interagir com o mundo. Cada Arquétipo concede ao personagem um conjunto de Competências, utilizadas para realizar feitos mundanos, superar desafios e interagir com outros personagens.",
          },
          {
            title: "Competências e Bônus",
            text: "Cada Competência possui um bônus próprio, que começa em um valor definido na criação do personagem, como +1, +2, +3 e assim por diante. Esses bônus são somados aos testes sempre que o personagem utiliza uma Competência na qual é treinado. Por meio de XP, o jogador pode aumentar o bônus de uma Competência em +1 por melhoria, até o limite máximo de +10.",
            formulas: ["+1 por melhoria · limite máximo: +10"],
          },
        ],
      },
      {
        id: "regras-gerais-testes",
        name: "Regras Gerais de Testes",
        glyph: "⚖",
        tagline: "Dificuldades, Competências e disputas diretas",
        description:
          "As regras gerais de testes cobrem desafios mundanos, testes de Competência e testes contestados.",
        tags: [],
        ruleSections: [
          {
            title: "2.1. Desafios Mundanos",
            text: "Fora de combate, os desafios são resolvidos por testes contra uma dificuldade definida pelo Narrador. As dificuldades são divididas em quatro categorias:",
            table: {
              headers: ["Dificuldade", "Classificação"],
              rows: [
                ["1 a 10", "Mundano"],
                ["11 a 15", "Heroico — feitos que beiram o sobre-humano"],
                ["16 a 20", "Sobre-humano"],
                ["21 a 30", "Bestas e Divindades"],
              ],
            },
          },
          {
            title: "2.2. Testes de Competência",
            text: "Quando um personagem tenta realizar uma ação, o Narrador determina se ela exige uma Competência específica.",
          },
          {
            title: "2.2. Testes de Competência — Com Competência",
            text: "Quando o personagem possui a Competência necessária, realiza o teste somando: Dado do Dao + Dado do Arquétipo + bônus da Competência. O resultado é comparado à dificuldade definida pelo Narrador.",
            formulas: ["Dado do Dao + Dado do Arquétipo + bônus da Competência"],
          },
          {
            title: "2.2. Testes de Competência — Sem Competência",
            text: "Quando o personagem não possui a Competência necessária, realiza o teste apenas com: Dado do Dao. O resultado é comparado à dificuldade definida pelo Narrador.",
            formulas: ["Dado do Dao"],
          },
          {
            title: "2.3. Testes Contestados",
            text: "Quando um personagem tenta superar ou se impor sobre outro personagem, o teste pode ser resolvido por uma disputa direta, sem que o Narrador precise estabelecer uma dificuldade. Nesse caso, os dois lados realizam suas rolagens, conforme suas Competências e capacidades.",
          },
          {
            title: "2.3. Testes Contestados — Exemplo: Seduzir",
            examples: [
              "Um personagem tenta seduzir outro.\n\n• Personagem que possui a Competência Seduzir: rola Dado do Dao + Dado do Arquétipo + bônus da Competência.\n• Alvo: rola Dado do Dao + Vontade.\n\nO resultado das duas rolagens é comparado para determinar o desfecho da disputa.",
            ],
            text: "Caso o personagem não possua a Competência Seduzir, ele rola apenas o Dado do Dao contra a rolagem de resistência do alvo. Se não houver um alvo realizando uma disputa direta, o teste será resolvido contra uma dificuldade definida pelo Narrador.",
          },
        ],
      },
      {
        id: "von-vontade",
        name: "Atributos Especiais: VON (Vontade)",
        glyph: "✧",
        tagline: "Firmeza mental e resistência a influências",
        description:
          "VON — Vontade representa a firmeza mental e emocional do personagem, sua capacidade de resistir a influências externas e manter o controle sobre suas próprias decisões. Vontade pertence ao grupo de Atributos Especiais.",
        tags: ["Atributo Especial"],
        ruleSections: [
          {
            title: "Progressão",
            dice: { label: "Vontade", values: ["1d4", "1d6", "1d8", "1d10"] },
          },
          {
            title: "Aplicações de Vontade",
            text: "Vontade é utilizada em testes de resistência contra Competências e efeitos que tentem se impor sobre o personagem. Quando um personagem é alvo de uma dessas tentativas, sua Vontade pode ser utilizada para resistir à influência.",
            items: [
              "Resistir à intimidação",
              "Resistir à sedução",
              "Resistir à persuasão",
              "Resistir à manipulação",
              "Resistir ao medo",
              "Suportar pressão psicológica",
              "Manter uma decisão",
              "Resistir à compulsão",
              "Permanecer firme",
              "Suportar uma imposição",
            ],
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
      {
        id: "escolha-dos-arquetipos",
        name: "Escolha dos Arquétipos",
        glyph: "◇",
        tagline: "1 Especial de Classe + 2 Livres",
        description:
          "Cada personagem começa o jogo escolhindo 3 Arquétipos no total, distribuídos da seguinte maneira.",
        tags: ["3 Arquétipos no total"],
        ruleSections: [
          {
            title: "Distribuição",
            items: [
              "1 Arquétipo Especial de Classe: deve pertencer à classe escolhida pelo personagem",
              "2 Arquétipos Livres: podem ser escolhidos entre os arquétipos gerais disponíveis no sistema",
            ],
            text: "O Arquétipo Especial de Classe representa uma especialização própria da classe do personagem e pode conceder acesso a técnicas, estilos de luta, poderes ou outras características exclusivas.",
          },
          {
            title: "Regra para os Kowloon Fighters",
            text: "Os personagens da classe Kowloon Fighters possuem duas opções de Arquétipo Especial. O jogador deve escolher apenas um desses dois arquétipos durante a criação do personagem. A escolha determina a qual estilo marcial exclusivo o personagem terá acesso.",
            items: [
              "1. Artista Marcial Kyūryū Shōtenken",
              "2. Artista Marcial Tai Chi Kyūryū",
            ],
          },
        ],
      },
    ],
  },
  "regras-combate": {
    id: "regras-combate",
    seal: "⚑",
    label: "Regras de Combate",
    listLabel: "Capítulos",
    group: "As Seis Harmonias",
    description:
      "Manobras de combate e regras especiais utilizadas durante os confrontos.",
    items: [
      {
        id: "manobras-combate",
        name: "Manobras de Combate e Regras Especiais",
        glyph: "⚔",
        tagline: "Custo padrão: 3 pontos de Taiji ou 4 CP",
        description:
          "Custo padrão das manobras: 3 pontos de Taiji ou 4 CP.",
        tags: ["Custo padrão: 3 pontos de Taiji ou 4 CP"],
        ruleSections: [
          {
            title: "1. Golpe Poderoso",
            text: "Ao declarar um ataque, você acrescenta +1d4 de dano. O valor numérico tirado nesse dado de dano também representa a quantidade de metros que o alvo é arremessado ao receber o golpe.",
            formulas: ["+1d4 de dano · arremesso: metros = valor do dado"],
          },
          {
            title: "2. Ataque Veloz",
            text: "Ao se movimentar ao menos 3 hexágonos e desferir um ataque na mesma rodada, você acrescenta +1d4 no valor do seu teste de ataque.",
            formulas: ["+1d4 no teste de ataque"],
          },
          {
            title: "3. Saltar",
            text: "Alcance/Altura: calculado com o valor de FOR pela metade. Ao se movimentar ao menos 2 hexágonos e realizar um salto seguido de ataque, você aplica +1d4 no valor de dano do golpe.",
            formulas: ["+1d4 de dano", "Alcance/Altura = FOR ÷ 2"],
          },
          {
            title: "4. Correr",
            text: "Você aplica +1d4 no valor de movimento.",
            formulas: ["+1d4 de movimento"],
          },
          {
            title: "5. Derrubar",
            text: "O personagem caído precisa gastar uma ação de movimento para se levantar.",
            items: [
              "Enquanto estiver caído: não pode atacar",
              "Enquanto estiver caído: não pode somar atributos às suas rolagens",
            ],
          },
          {
            title: "6. Agarrar",
            text: "Realiza um teste contestado de Yin contra Yang. Se o alvo perder, fica imobilizado, dando ao atacante duas opções subsequentes:",
            items: [
              "Manter a imobilização — vencendo um novo teste contestado, o valor que ultrapassar a defesa do alvo é convertido em dano direto",
              "Arremessar o alvo — causa 1d4 de dano, sendo que o valor numérico obtido nesse dado também define a quantidade de metros que o alvo é lançado",
            ],
          },
        ],
      },
    ],
  },
  glossario: {
    id: "glossario",
    seal: "☰",
    label: "Glossário de Regras",
    listLabel: "Capítulos",
    group: "As Seis Harmonias",
    description:
      "Definições dos termos técnicos usados pelas regras do sistema.",
    items: [
      {
        id: "termos-efeitos",
        name: "Termos e Efeitos",
        glyph: "☰",
        tagline: "Elevar, Negativar e Fervor",
        description:
          "Definições dos termos técnicos usados pelas regras do sistema.",
        tags: [],
        ruleSections: [
          {
            title: "Elevar",
            text: "Elevar significa aumentar em um grau a categoria de um dado, avançando para o próximo dado da progressão.",
            examples: ["1d4 passa para 1d6", "1d8 passa para 1d10", "1d10 passa para 1d12"],
          },
          {
            title: "Negativar",
            text: "Negativar significa reduzir em um grau a categoria de um dado, retrocedendo na progressão.",
            examples: ["1d10 passa para 1d8", "1d8 passa para 1d6", "1d6 passa para 1d4"],
          },
          {
            title: "Limite de aplicação",
            text: "Elevar ou Negativar só pode ser utilizado uma vez por jogada e sua aplicação ocorre sempre sobre o dado de dano.",
          },
          {
            title: "Fervor",
            text: "Fervor concede +2 de bônus à jogada em que for aplicado.",
            formulas: ["+2 de bônus"],
          },
        ],
      },
    ],
  },
  arquetipos: {
    id: "arquetipos",
    seal: "✦",
    label: "Arquétipos",
    listLabel: "Capítulos",
    group: "As Seis Harmonias",
    description:
      "Os Arquétipos representam as áreas em que o personagem possui experiência, conhecimento e habilidade. Cada Arquétipo concede Competências.",
    items: [
      {
        id: "arquetipos-sociais",
        name: "Arquétipos Sociais",
        glyph: "✦",
        tagline: "Sedutor, Manipulador, Diplomata e Líder",
        description:
          "Arquétipos voltados à interação, influência e condução de pessoas.",
        tags: [],
        ruleSections: [
          {
            title: "1. Sedutor",
            text: "Categoria: Social. Especialista em atração, expressão pessoal e influência interpessoal.",
            dice: DADO_ARQUETIPO,
            items: [
              "Sedução: +3",
              "Performance: +2 (Especialização em Dança, Moda ou Atuação)",
              "Leitura Emocional: +2",
            ],
            note: "Conhecimentos Relevantes: Psicologia, Etiqueta, Moda.",
          },
          {
            title: "2. Manipulador",
            text: "Categoria: Social. Especialista em influência psicológica, controle emocional e manipulação comportamental.",
            dice: DADO_ARQUETIPO,
            items: [
              "Persuasão: +3",
              "Leitura Emocional: +2",
              "Interrogatório: +2",
            ],
            note: "Conhecimentos Relevantes: Criminologia, Psicologia, Política.",
          },
          {
            title: "3. Diplomata",
            text: "Categoria: Social. Especialista em negociação, argumentação e resolução de conflitos.",
            dice: DADO_ARQUETIPO,
            items: [
              "Debate: +3",
              "Persuasão: +2",
              "Comunicação: +2",
            ],
            note: "Conhecimentos Relevantes: Política, Direito, História, Filosofia.",
          },
          {
            title: "4. Líder",
            text: "Categoria: Social. Especialista em conduzir pessoas, estabelecer autoridade e inspirar grupos.",
            dice: DADO_ARQUETIPO,
            items: [
              "Liderança: +3",
              "Intimidação: +2",
              "Comunicação: +2",
            ],
            note: "Performance Relevante: Oratória.\nConhecimentos Relevantes: Estratégia, Política, História.",
          },
        ],
      },
      {
        id: "arquetipos-investigativos",
        name: "Arquétipos Investigativos e Intelectuais",
        glyph: "◉",
        tagline: "Investigador, Estrategista, Erudito e Místico",
        description:
          "Arquétipos voltados à investigação, planejamento, estudo e conhecimento oculto.",
        tags: [],
        ruleSections: [
          {
            title: "5. Investigador",
            text: "Categoria: Investigativo. Especialista em encontrar pistas, reconstruir acontecimentos e descobrir verdades ocultas.",
            dice: DADO_ARQUETIPO,
            items: [
              "Investigação: +3",
              "Percepção: +2",
              "Interrogatório: +2",
            ],
            note: "Conhecimentos Relevantes: Criminologia, Direito, Anatomia.",
          },
          {
            title: "6. Estrategista",
            text: "Categoria: Intelectual. Especialista em planejamento, antecipação e tomada de decisões complexas.",
            dice: DADO_ARQUETIPO,
            items: [
              "Estratégia: +3",
              "Conhecimento: +2 (Especialização em Guerra, Logística ou Política)",
              "Debate: +2",
            ],
            note: "Conhecimentos Relevantes: História, Política, Arquitetura/Engenharia Militar.",
          },
          {
            title: "7. Erudito",
            text: "Categoria: Intelectual. Especialista em estudos, idiomas, registros históricos e sistemas complexos.",
            dice: DADO_ARQUETIPO,
            items: [
              "Conhecimento: +3 (Especialização em História, Filosofia ou Ciências)",
              "Decifração: +2",
              "Tradução: +2",
            ],
            note: "Conhecimentos Relevantes: História, Filosofia, Arquitetura, Astronomia.",
          },
          {
            title: "8. Místico",
            text: "Categoria: Intelectual. Especialista em tradições espirituais, fenômenos sobrenaturais e conhecimentos ocultos.",
            dice: DADO_ARQUETIPO,
            items: [
              "Conhecimento: +3 (Especialização em Ocultismo)",
              "Percepção: +2",
              "Leitura Emocional: +2",
            ],
            note: "Conhecimentos Relevantes: Ocultismo, Filosofia, História, Astronomia.",
          },
        ],
      },
      {
        id: "arquetipos-infiltracao",
        name: "Arquétipos de Infiltração e Exploração",
        glyph: "○",
        tagline: "Infiltrador, Cowboy, Caçador e Monge",
        description:
          "Arquétipos voltados à infiltração, sobrevivência, rastreamento e disciplina.",
        tags: [],
        ruleSections: [
          {
            title: "9. Infiltrador",
            text: "Categoria: Exploração. Especialista em passar despercebido, observar ambientes e acessar locais restritos.",
            dice: DADO_ARQUETIPO,
            items: [
              "Discrição: +3",
              "Percepção: +2",
              "Ocultação: +2",
            ],
            note: "Conhecimentos Relevantes: Arquitetura, Cybersecurity, Mecânica (Trancas/Sistemas).",
          },
          {
            title: "10. Cowboy",
            text: "Categoria: Exploração. Especialista em sobrevivência, travessias rurais/selvagens e manuseio de animais/recursos no campo.",
            dice: DADO_ARQUETIPO,
            items: [
              "Sobrevivência: +3",
              "Rastreamento: +2",
              "Orientação: +2",
            ],
            note: "Conhecimentos Relevantes: Zoologia, Geografia, Anatomia.",
          },
          {
            title: "11. Caçador",
            text: "Categoria: Exploração. Especialista em perseguir alvos/criaturas, identificar seus hábitos e explorar suas vulnerabilidades.",
            dice: DADO_ARQUETIPO,
            items: [
              "Rastreamento: +3",
              "Identificação: +2",
              "Sobrevivência: +2 (Ajustado de Percepção para cobrir a lacuna técnica)",
            ],
            note: "Conhecimentos Relevantes: Zoologia, Biologia, Anatomia.",
          },
          {
            title: "12. Monge",
            text: "Categoria: Exploração / Prático. Especialista em disciplina, autocontrole, aperfeiçoamento físico e tradições espirituais.",
            dice: DADO_ARQUETIPO,
            items: [
              "Luta: +3",
              "Atletismo: +2",
              "Conhecimento: +2 (Especialização em Filosofia ou Ocultismo)",
            ],
            note: "Conhecimentos Relevantes: Filosofia, Anatomia, Medicina tradicional.",
          },
        ],
      },
      {
        id: "arquetipos-artisticos",
        name: "Arquétipos Artísticos e Físicos",
        glyph: "♪",
        tagline: "Artista e Atleta",
        description:
          "Arquétipos voltados à expressão criativa e ao desempenho físico.",
        tags: [],
        ruleSections: [
          {
            title: "13. Artista",
            text: "Categoria: Expressão. Especialista em expressão criativa, manifestações artísticas e impacto estético.",
            dice: DADO_ARQUETIPO,
            items: [
              "Performance: +3 (Especialização à escolha: Música, Pintura, Atuação, etc.)",
              "Leitura Emocional: +2 (Ajustado no lugar de Estética, integrando com as competências oficiais)",
              "Comunicação: +2",
            ],
            note: "Performances Relevantes: Dança, Canto, Atuação, Música, Escultura, Pintura, Ilusionismo, Escrita Artística.",
          },
          {
            title: "14. Atleta",
            text: "Categoria: Físico. Especialista em desempenho físico, condicionamento corporal e práticas esportivas.",
            dice: DADO_ARQUETIPO,
            items: [
              "Atletismo: +3",
              "Luta: +2",
              "Conhecimento: +2 (Especialização em Esportes ou Anatomia)",
            ],
            note: "Conhecimentos Relevantes: Anatomia, Esportes, Medicina/Fisiologia.",
          },
        ],
      },
      {
        id: "arquetipos-profissionais",
        name: "Arquétipos Profissionais e Técnicos",
        glyph: "⚙",
        tagline: "Chef e Especialista",
        description:
          "Arquétipos voltados às profissões e às áreas técnicas e científicas.",
        tags: [],
        ruleSections: [
          {
            title: "15. Chef",
            text: "Categoria: Profissional. Especialista em culinária, gastronomia, ingredientes e preparação de alimentos.",
            dice: DADO_ARQUETIPO,
            items: [
              "Conhecimento: +3 (Especialização em Culinária)",
              "Ofício: +2",
              "Percepção: +2",
            ],
            note: "Conhecimentos Relevantes: Culinária, Biologia, Química.",
          },
          {
            title: "16. Especialista",
            text: "Categoria: Profissional. Especialista em uma área técnica, científica ou profissional, aplicando conhecimentos específicos para resolver problemas.",
            dice: DADO_ARQUETIPO,
            items: [
              "Conhecimento: +3 (Especialização escolhida)",
              "Investigação: +2",
              "Ofício: +2",
            ],
            note: "Variações de Especialização e Conhecimentos Pertinentes:\n• Médico: Conhecimento +3 (Medicina), Anatomia, Química, Biologia.\n• Cientista: Conhecimento +3 (Biologia, Química ou Física), Matemática, Astronomia.\n• Engenheiro: Conhecimento +3 (Engenharia ou Mecânica), Arquitetura, Matemática, Física.\n• Hacker / TI: Conhecimento +3 (Cybersecurity), Matemática, Decifração (+2).\n• Perito: Conhecimento +3 (Criminologia), Anatomia, Química.",
          },
        ],
      },
    ],
  },
  "arquetipos-especiais": {
    id: "arquetipos-especiais",
    seal: "❖",
    label: "Arquétipos Especiais",
    listLabel: "Capítulos",
    group: "Kowloon Fighters",
    description:
      "Especializações próprias de cada classe. Os Arquétipos Especiais são opções alternativas — o personagem escolhe somente um deles.",
    items: [
      {
        id: "arquetipos-especiais-kf",
        name: "Arquétipos Especiais dos Kowloon Fighters",
        glyph: "❖",
        tagline: "1 Especial de Classe + 2 Livres",
        description:
          "Cada personagem começa o jogo escolhindo 3 Arquétipos no total: 1 Arquétipo Especial de Classe e 2 Arquétipos Livres. Os Arquétipos Especiais são opções alternativas — o personagem Kowloon Fighters escolhe somente um deles.",
        tags: ["1 Especial de Classe + 2 Livres", "A escolha não é um 4º arquétipo"],
        ruleSections: [
          {
            title: "1. Artista Marcial Kyūryū Shōtenken",
            text: "Categoria: Classe Kowloon Fighters. Concede acesso aos poderes do estilo Kyūryū Shōtenken.",
            dice: DADO_ARQUETIPO,
            items: ["Conhecimento: +3", "2 Competências à sua escolha"],
            note: "Conhecimentos Relevantes: História da Ordem; mais 2 conhecimentos à sua escolha.\nAcesso ao Estilo: o personagem que escolher este Arquétipo Especial terá acesso ao estilo marcial Kyūryū Shōtenken, incluindo suas especializações elementais e os poderes correspondentes. O acesso ao estilo depende da escolha deste arquétipo. Personagens que não possuam o Arquétipo Artista Marcial Kyūryū Shōtenken não podem utilizar seus poderes.",
          },
          {
            title: "2. Artista Marcial Tai Chi Kyūryū",
            badge: "Em construção",
            text: "Categoria: Classe Kowloon Fighters. Concede acesso aos poderes do estilo Tai Chi Kyūryū.",
            dice: DADO_ARQUETIPO,
            items: ["Conhecimento: +3", "2 Competências à sua escolha"],
            note: "Conhecimentos Relevantes: História da Ordem; mais 2 conhecimentos à sua escolha.\nAcesso ao Estilo: o personagem que escolher este Arquétipo Especial terá acesso ao estilo marcial Tai Chi Kyūryū.\nAs regras, técnicas e poderes do estilo Tai Chi Kyūryū serão desenvolvidos posteriormente. Não criar ou atribuir poderes provisórios a esse estilo.",
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
        tags: ["Requisito: Arquétipo Artista Marcial Kyūryū Shōtenken", "Até 3 dragões", "3 pts da fonte por uso"],
        ruleSections: [
          {
            title: "Requisito de acesso",
            text: "Requisito de acesso: Arquétipo Especial Artista Marcial Kyūryū Shōtenken. O estilo Kyūryū Shōtenken é exclusivo dos Kowloon Fighters que escolheram o arquétipo correspondente. O personagem precisa possuir esse Arquétipo Especial para ter acesso às técnicas, especializações elementais e poderes dos Nove Dragões.",
            items: [
              "Personagem com Artista Marcial Kyūryū Shōtenken: possui acesso ao estilo Kyūryū Shōtenken",
              "Personagem com Artista Marcial Tai Chi Kyūryū: não possui acesso ao Kyūryū Shōtenken por essa escolha; terá acesso ao estilo Tai Chi Kyūryū, cujas regras ainda serão desenvolvidas",
              "A escolha de um estilo não concede automaticamente acesso ao outro",
            ],
          },
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
      {
        id: "tai-chi-kyuryu",
        name: "Estilo Tai Chi Kyūryū",
        glyph: "☯",
        tagline: "Conteúdo em construção",
        description:
          "Requisito de acesso: Arquétipo Especial Artista Marcial Tai Chi Kyūryū. Este estilo será desenvolvido posteriormente. Manter o capítulo registrado na estrutura do sistema, sem criar técnicas, poderes, custos ou efeitos até que o conteúdo oficial seja fornecido.",
        tags: ["Em construção"],
        ruleSections: [
          {
            title: "Requisito de acesso",
            text: "O acesso ao estilo Tai Chi Kyūryū depende da escolha do Arquétipo Especial Artista Marcial Tai Chi Kyūryū. A escolha de um estilo não concede automaticamente acesso ao outro.",
          },
          {
            title: "Status do conteúdo",
            badge: "Em construção",
            note: "Em construção. As regras, técnicas e poderes do estilo Tai Chi Kyūryū serão desenvolvidos posteriormente. Não criar ou atribuir poderes provisórios a esse estilo.",
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
