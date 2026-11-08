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
  imageFit?: "cover" | "contain";
  srcSet?: string;
  dice?: string[];
  text: string;
  items?: string[];
  note?: string;
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
        tagline: "VEL, MEN, ESP e VON",
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
          {
            title: "VON — Vontade",
            text: "VON — Vontade representa a firmeza mental e emocional do personagem, sua capacidade de resistir a influências externas e manter o controle sobre suas próprias decisões. Vontade é utilizada em testes de resistência contra Competências e efeitos que tentem se impor sobre o personagem. Quando um personagem é alvo de uma dessas tentativas, sua Vontade pode ser utilizada para resistir à influência.",
            dice: { label: "Vontade", values: ["1d4", "1d6", "1d8", "1d10"] },
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
            text: "Os personagens da classe Kowloon Fighters possuem três opções de Arquétipo Especial. O jogador deve escolher apenas um desses três arquétipos durante a criação do personagem. A escolha determina a qual estilo marcial exclusivo o personagem terá acesso.",
            items: [
              "1. Artista Marcial — Kyūryū Hyakusōken",
              "2. Tai Chi",
              "3. Shōtenken",
            ],
          },
        ],
      },
      {
        id: "competencias",
        name: "Competências",
        glyph: "◆",
        tagline: "Lista oficial de Competências",
        description:
          "Lista oficial de Competências disponíveis durante a criação do personagem e a escolha dos Arquétipos. Cada Competência possui um bônus próprio, somado aos testes sempre que o personagem utiliza uma Competência na qual é treinado.",
        tags: ["24 Competências"],
        ruleSections: [
          {
            title: "Atletismo",
            text: "Executar atividades físicas como correr, saltar, escalar, nadar e superar obstáculos.",
          },
          {
            title: "Comunicação",
            text: "Transmitir informações com clareza, adaptar a linguagem e garantir a compreensão da mensagem.",
          },
          {
            title: "Conhecimento",
            text: "Recordar, compreender e aplicar informações de uma área de especialização.",
          },
          {
            title: "Decifração",
            text: "Interpretar códigos, cifras, símbolos e mensagens ocultas.",
          },
          {
            title: "Debate",
            text: "Defender ideias e confrontar argumentos em uma discussão.",
          },
          {
            title: "Discrição",
            text: "Controlar a própria presença e comportamento para evitar chamar atenção.",
          },
          {
            title: "Estratégia",
            text: "Antecipar decisões, elaborar planos e superar as ações de um adversário.",
          },
          {
            title: "Identificação",
            text: "Reconhecer pessoas, criaturas, objetos, substâncias ou fenômenos por suas características.",
          },
          {
            title: "Interrogatório",
            text: "Conduzir perguntas, pressionar alguém e identificar contradições em seu relato.",
          },
          {
            title: "Intimidação",
            text: "Provocar medo, insegurança ou submissão por meio de ameaças, postura ou autoridade.",
          },
          {
            title: "Investigação",
            text: "Relacionar pistas, informações e evidências para reconstruir acontecimentos.",
          },
          {
            title: "Leitura Emocional",
            text: "Interpretar emoções, intenções e mudanças no comportamento de outras pessoas.",
          },
          {
            title: "Liderança",
            text: "Inspirar, coordenar e conduzir pessoas em direção a um objetivo.",
          },
          {
            title: "Luta",
            text: "Utilizar técnicas de combate corporal, defesa pessoal e confronto físico.",
          },
          {
            title: "Ocultação",
            text: "Esconder objetos, rastros, informações ou evidências.",
          },
          {
            title: "Ofício",
            text: "Executar trabalhos manuais especializados, fabricar, reparar e manipular ferramentas e materiais.",
          },
          {
            title: "Orientação",
            text: "Determinar localização, direção e caminhos utilizando referências ambientais.",
          },
          {
            title: "Percepção",
            text: "Identificar detalhes, alterações, sons, movimentos e elementos difíceis de notar no ambiente.",
          },
          {
            title: "Performance",
            text: "Causar impacto por meio da expressão corporal, aparência, atuação ou demonstração artística.",
          },
          {
            title: "Persuasão",
            text: "Influenciar alguém a aceitar uma ideia, proposta ou decisão.",
          },
          {
            title: "Rastreamento",
            text: "Localizar e seguir pessoas, animais ou objetos por meio de vestígios e sinais.",
          },
          {
            title: "Sedução",
            text: "Despertar atração, interesse ou envolvimento por meio do comportamento e da expressão pessoal.",
          },
          {
            title: "Sobrevivência",
            text: "Encontrar recursos, improvisar soluções e permanecer vivo em ambientes hostis.",
          },
          {
            title: "Tradução",
            text: "Compreender e converter idiomas, textos e sistemas de comunicação conhecidos.",
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
            text: "Realiza um teste contestado de Dado de Dao contra Dado de Dao. Se o alvo perder, fica imobilizado, dando ao atacante duas opções subsequentes:",
            items: [
              "Manter a imobilização — vencendo um novo teste contestado, o valor que ultrapassar a defesa do alvo é convertido em dano direto",
              "Arremessar o alvo — causa 1d4 de dano, sendo que o valor numérico obtido nesse dado também define a quantidade de metros que o alvo é lançado",
            ],
            note: "Correção mecânica obrigatória: a disputa de Agarrar deve utilizar os Dados de Dao dos dois participantes. Não utilizar Yin contra Yang como testes separados.",
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
        id: "introducao",
        name: "Introdução",
        glyph: "◎",
        tagline: "Arquétipos, Competências e testes",
        description:
          "Este capítulo apresenta como os personagens desenvolvem suas capacidades por meio dos Arquétipos e Competências, além de estabelecer como funcionam os testes durante o jogo. Aqui você encontrará as regras para realizar ações, superar dificuldades e disputar diretamente com outros personagens, determinando quando e como os bônus são aplicados.",
        tags: ["3 Arquétipos", "+1 por melhoria · Limite máximo: +10"],
        ruleSections: [
          {
            title: "Arquétipos e Competências",
            text: "No início do jogo, cada personagem escolhe seus Arquétipos e desenvolve suas Competências para interagir com o mundo.",
          },
          {
            title: "1.1. Escolha de Arquétipos",
            text: "No início do jogo, cada personagem escolhe 3 Arquétipos:",
            items: [
              "1 Arquétipo relacionado à sua classe",
              "2 Arquétipos livres, escolhidos pelo jogador",
            ],
          },
          {
            title: "1.2. Os Arquétipos",
            text: "Os Arquétipos representam as áreas em que o personagem possui experiência, conhecimento e habilidade para interagir com o mundo.\n\nCada Arquétipo concede ao personagem um conjunto de Competências, utilizadas para realizar feitos mundanos, superar desafios e interagir com outros personagens.\n\nAs Competências estão diretamente ligadas aos Arquétipos. Portanto, o personagem só pode utilizar uma Competência quando ela pertence a um dos seus Arquétipos escolhidos.",
          },
          {
            title: "1.3. Competências e Bônus",
            text: "Cada Competência possui um bônus próprio, que começa em um valor definido na criação do personagem, como +1, +2, +3 e assim por diante.\n\nEsses bônus são somados aos testes sempre que o personagem utiliza uma Competência na qual é treinado por meio de seus Arquétipos.\n\nPor meio de XP, o jogador pode aumentar o bônus de uma Competência em +1 por melhoria, até o limite máximo de +10.",
            formulas: ["+1 por melhoria · Limite máximo: +10"],
          },
          {
            title: "Regras Gerais de Testes",
            text: "As regras gerais de testes cobrem desafios mundanos, testes de Competência e testes contestados.",
          },
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
            text: "Quando o personagem possui a Competência necessária por meio de um de seus Arquétipos, realiza o teste somando:\n\nDado do Dao + Dado do Arquétipo + bônus da Competência.\n\nO resultado é comparado à dificuldade definida pelo Narrador.",
            formulas: ["Dado do Dao + Dado do Arquétipo + bônus da Competência"],
          },
          {
            title: "2.2. Testes de Competência — Sem Competência",
            text: "Quando o personagem não possui a Competência necessária em seus Arquétipos, realiza o teste apenas com:\n\nDado do Dao.\n\nO resultado é comparado à dificuldade definida pelo Narrador.",
            formulas: ["Dado do Dao"],
          },
          {
            title: "2.3. Testes Contestados",
            text: "Quando um personagem tenta superar ou se impor sobre outro personagem, o teste pode ser resolvido por uma disputa direta, sem que o Narrador precise estabelecer uma dificuldade.\n\nNesse caso, os dois lados realizam suas rolagens, conforme suas Competências e capacidades.",
          },
          {
            title: "2.3. Testes Contestados — Exemplo: Seduzir",
            text: "Um personagem tenta seduzir outro.\n\nCaso o personagem não possua a Competência Seduzir por meio de seus Arquétipos, ele rola apenas o Dado do Dao contra a rolagem de resistência do alvo.\n\nSe não houver um alvo realizando uma disputa direta, o teste será resolvido contra uma dificuldade definida pelo Narrador.",
            items: [
              "Personagem que possui a Competência Seduzir: rola Dado do Dao + Dado do Arquétipo + bônus da Competência.",
              "Alvo: rola Dado do Dao + Vontade.",
            ],
            note: "O resultado das duas rolagens é comparado para determinar o desfecho da disputa.",
          },
        ],
      },
      {
        id: "arquetipos-sociais",
        name: "Arquétipos Sociais",
        glyph: "✦",
        tagline: "Sedutor, Manipulador, Diplomata e Líder",
        description:
          "Arquétipos voltados à interação, influência e condução de pessoas.",
        tags: [],
        cards: [
          {
            name: "1. Sedutor",
            image: "/arquetipos/01-sedutor-1024.webp",
            srcSet: "/arquetipos/01-sedutor-640.webp 640w, /arquetipos/01-sedutor-1024.webp 1024w",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Social. Especialista em atração, expressão pessoal e influência interpessoal.",
            items: [
              "Sedução: +3",
              "Performance: +2 (Especialização em Dança, Moda ou Atuação)",
              "Leitura Emocional: +2",
            ],
            note: "Conhecimentos Relevantes: Psicologia, Etiqueta, Moda.",
          },
          {
            name: "2. Manipulador",
            image: "/arquetipos/02-manipulador-1024.webp",
            srcSet: "/arquetipos/02-manipulador-640.webp 640w, /arquetipos/02-manipulador-1024.webp 1024w",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Social. Especialista em influência psicológica, controle emocional e manipulação comportamental.",
            items: [
              "Persuasão: +3",
              "Leitura Emocional: +2",
              "Interrogatório: +2",
            ],
            note: "Conhecimentos Relevantes: Criminologia, Psicologia, Política.",
          },
          {
            name: "3. Diplomata",
            image: "/arquetipos/03-diplomata-1024.webp",
            srcSet: "/arquetipos/03-diplomata-640.webp 640w, /arquetipos/03-diplomata-1024.webp 1024w",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Social. Especialista em negociação, argumentação e resolução de conflitos.",
            items: [
              "Debate: +3",
              "Persuasão: +2",
              "Comunicação: +2",
            ],
            note: "Conhecimentos Relevantes: Política, Direito, História, Filosofia.",
          },
          {
            name: "4. Líder",
            image: "/arquetipos/04-lider-1024.webp",
            srcSet: "/arquetipos/04-lider-640.webp 640w, /arquetipos/04-lider-1024.webp 1024w",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Social. Especialista em conduzir pessoas, estabelecer autoridade e inspirar grupos.",
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
        cards: [
          {
            name: "5. Investigador",
            image: "/arquetipos/05-investigador-1024.webp",
            srcSet: "/arquetipos/05-investigador-640.webp 640w, /arquetipos/05-investigador-1024.webp 1024w",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Investigativo. Especialista em encontrar pistas, reconstruir acontecimentos e descobrir verdades ocultas.",
            items: [
              "Investigação: +3",
              "Percepção: +2",
              "Interrogatório: +2",
            ],
            note: "Conhecimentos Relevantes: Criminologia, Direito, Anatomia.",
          },
          {
            name: "6. Estrategista",
            image: "/arquetipos/06-estrategista-1024.webp",
            srcSet: "/arquetipos/06-estrategista-640.webp 640w, /arquetipos/06-estrategista-1024.webp 1024w",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Intelectual. Especialista em planejamento, antecipação e tomada de decisões complexas.",
            items: [
              "Estratégia: +3",
              "Conhecimento: +2 (Especialização em Guerra, Logística ou Política)",
              "Debate: +2",
            ],
            note: "Conhecimentos Relevantes: História, Política, Arquitetura/Engenharia Militar.",
          },
          {
            name: "7. Erudito",
            image: "/arquetipos/07-erudito-1024.webp",
            srcSet: "/arquetipos/07-erudito-640.webp 640w, /arquetipos/07-erudito-1024.webp 1024w",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Intelectual. Especialista em estudos, idiomas, registros históricos e sistemas complexos.",
            items: [
              "Conhecimento: +3 (Especialização em História, Filosofia ou Ciências)",
              "Decifração: +2",
              "Tradução: +2",
            ],
            note: "Conhecimentos Relevantes: História, Filosofia, Arquitetura, Astronomia.",
          },
          {
            name: "8. Místico",
            image: "/arquetipos/08-mistico-1024.webp",
            srcSet: "/arquetipos/08-mistico-640.webp 640w, /arquetipos/08-mistico-1024.webp 1024w",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Intelectual. Especialista em tradições espirituais, fenômenos sobrenaturais e conhecimentos ocultos.",
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
        cards: [
          {
            name: "9. Infiltrador",
            image: "/arquetipos/09-infiltrador-1024.webp",
            srcSet: "/arquetipos/09-infiltrador-640.webp 640w, /arquetipos/09-infiltrador-1024.webp 1024w",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Exploração. Especialista em passar despercebido, observar ambientes e acessar locais restritos.",
            items: [
              "Discrição: +3",
              "Percepção: +2",
              "Ocultação: +2",
            ],
            note: "Conhecimentos Relevantes: Arquitetura, Cybersecurity, Mecânica (Trancas/Sistemas).",
          },
          {
            name: "10. Cowboy",
            image: "/arquetipos/10-cowboy-1024.webp",
            srcSet: "/arquetipos/10-cowboy-640.webp 640w, /arquetipos/10-cowboy-1024.webp 1024w",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Exploração. Especialista em sobrevivência, travessias rurais/selvagens e manuseio de animais/recursos no campo.",
            items: [
              "Sobrevivência: +3",
              "Rastreamento: +2",
              "Orientação: +2",
            ],
            note: "Conhecimentos Relevantes: Zoologia, Geografia, Anatomia.",
          },
          {
            name: "11. Caçador",
            image: "/arquetipos/11-cacador-1024.webp",
            srcSet: "/arquetipos/11-cacador-640.webp 640w, /arquetipos/11-cacador-1024.webp 1024w",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Exploração. Especialista em perseguir alvos/criaturas, identificar seus hábitos e explorar suas vulnerabilidades.",
            items: [
              "Rastreamento: +3",
              "Identificação: +2",
              "Sobrevivência: +2 (Ajustado de Percepção para cobrir a lacuna técnica)",
            ],
            note: "Conhecimentos Relevantes: Zoologia, Biologia, Anatomia.",
          },
          {
            name: "12. Monge",
            image: "/arquetipos/12-monge-1024.webp",
            srcSet: "/arquetipos/12-monge-640.webp 640w, /arquetipos/12-monge-1024.webp 1024w",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Exploração / Prático. Especialista em disciplina, autocontrole, aperfeiçoamento físico e tradições espirituais.",
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
        cards: [
          {
            name: "13. Artista",
            image: "/arquetipos/13-artista-1024.webp",
            srcSet: "/arquetipos/13-artista-640.webp 640w, /arquetipos/13-artista-1024.webp 1024w",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Expressão. Especialista em expressão criativa, manifestações artísticas e impacto estético.",
            items: [
              "Performance: +3 (Especialização à escolha: Música, Pintura, Atuação, etc.)",
              "Leitura Emocional: +2 (Ajustado no lugar de Estética, integrando com as competências oficiais)",
              "Comunicação: +2",
            ],
            note: "Performances Relevantes: Dança, Canto, Atuação, Música, Escultura, Pintura, Ilusionismo, Escrita Artística.",
          },
          {
            name: "14. Atleta",
            image: "/arquetipos/14-atleta-1024.webp",
            srcSet: "/arquetipos/14-atleta-640.webp 640w, /arquetipos/14-atleta-1024.webp 1024w",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Físico. Especialista em desempenho físico, condicionamento corporal e práticas esportivas.",
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
        cards: [
          {
            name: "15. Chef",
            image: "/arquetipos/15-chef-1024.webp",
            srcSet: "/arquetipos/15-chef-640.webp 640w, /arquetipos/15-chef-1024.webp 1024w",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Profissional. Especialista em culinária, gastronomia, ingredientes e preparação de alimentos.",
            items: [
              "Conhecimento: +3 (Especialização em Culinária)",
              "Ofício: +2",
              "Percepção: +2",
            ],
            note: "Conhecimentos Relevantes: Culinária, Biologia, Química.",
          },
          {
            name: "16. Especialista",
            image: "/arquetipos/16-especialista-1024.webp",
            srcSet: "/arquetipos/16-especialista-640.webp 640w, /arquetipos/16-especialista-1024.webp 1024w",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Profissional. Especialista em uma área técnica, científica ou profissional, aplicando conhecimentos específicos para resolver problemas.",
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
  "kowloon-fighters": {
    id: "kowloon-fighters",
    seal: "龍",
    label: "Kowloon Fighters",
    listLabel: "Capítulos",
    group: "Classes",
    items: [
      {
        id: "introducao",
        name: "Introdução",
        glyph: "龍",
        tagline: "Lutadores de Kowloon · Fonte de poder: Qi",
        description:
          "Lutadores de Kowloon. Fonte de poder: Qi. Os Kowloon Fighters são combatentes que utilizam o Qi como fonte de energia para potencializar suas técnicas marciais, manipular as forças de Yin e Yang e alcançar estados superiores de combate. A classe possui acesso a: Sincronia Qi (Yin/Yang), Radians, Fa Jin e o Estilo Kyūryū Shōtenken.",
        tags: ["Fonte de poder: Qi"],
        ruleSections: [
          {
            image: "/kowloon/kowloon-intro-1024.webp",
            text: "Classe dos Kowloon Fighters. Reúne os Arquétipos Especiais, os Poderes Exclusivos, as Técnicas de Combate, a Feitiçaria Tai Chi Kyūryū e Os Nove Dragões.",
          },
        ],
      },
      {
        id: "arquetipos-especiais",
        name: "Arquétipos Especiais",
        glyph: "❖",
        tagline: "1 Especial de Classe + 2 Livres",
        description:
          "Cada personagem começa o jogo escolhindo 3 Arquétipos no total: 1 Arquétipo Especial de Classe e 2 Arquétipos Livres. Os Arquétipos Especiais são opções alternativas — o personagem Kowloon Fighters escolhe somente um deles. As regras de acesso às técnicas variam conforme o Arquétipo Especial escolhido.",
        tags: ["1 Especial de Classe + 2 Livres", "A escolha não é um 4º arquétipo"],
        cards: [
          {
            name: "1. Artista Marcial — Kyūryū Hyakusōken",
            image: "/arquetipos/hyakusoken.webp",
            imageFit: "contain",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Classe Kowloon Fighters. Descrição: acesso ao estilo Kyūryū Hyakusōken.",
            items: ["Conhecimento: +3", "Duas Competências à escolha"],
            note: "Conhecimentos Relevantes: História da Ordem e outros dois conhecimentos à escolha.\n\nAcesso às técnicas: 3 técnicas básicas, 2 técnicas intermediárias, 2 técnicas mestras.",
          },
          {
            name: "2. Artista Marcial — Tai Chi Kyūryū",
            image: "/arquetipos/tai-chi-kyuryu.webp",
            imageFit: "contain",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Classe Kowloon Fighters. Descrição: acesso à feitiçaria Tai Chi Kyūryū.",
            items: ["Conhecimento: +3", "Duas Competências à escolha"],
            note: "Conhecimentos Relevantes: História da Ordem e outros dois conhecimentos à escolha.\n\nBônus: os praticantes de Tai Chi Kyūryū ganham 1 técnica intermediária exclusiva e 1 técnica mestra exclusiva.",
          },
          {
            name: "3. Artista Marcial — Kyūryū Shōtenken",
            image: "/arquetipos/kyuryu-shotenken.webp",
            imageFit: "contain",
            dice: DADO_ARQUETIPO.values,
            text: "Categoria: Classe Kowloon Fighters. Descrição: acesso aos poderes do estilo Kyūryū Shōtenken.",
            items: ["Conhecimento: +3", "Duas Competências à escolha"],
            note: "Conhecimentos Relevantes: História da Ordem e outros dois conhecimentos à escolha.\n\nBônus: o personagem pode escolher 1 técnica básica, 1 técnica intermediária e 1 técnica mestra.\n\nAs técnicas escolhidas não podem ter seus bônus acumulados entre si.",
          },
        ],
      },
      {
        id: "poderes-exclusivos",
        name: "Poderes Exclusivos",
        glyph: "☯",
        tagline: "Sincronia Qi: Yin/Yang, Radians e Fa Jin",
        description:
          "Reúne as técnicas que utilizam Qi para ampliar as capacidades ofensivas e defensivas dos Kowloon Fighters: Sincronia Qi (Yin/Yang), Radians e Fa Jin.",
        tags: ["Custo: 5 Qi", "Custo: 3 Qi", "Custo: 3 Qi por nível", "Tipo de dano: Agravado"],
        ruleSections: [
          {
            title: "Sincronia Qi: Yin/Yang",
            text: "Alinhamento Yin/Yang e o estado Shin-Gi-Tai.\n\nA Sincronia Qi permite que o personagem entre em um estado especial de alinhamento entre Yin e Yang, modificando as regras convencionais do Dao. Dado-base da Sincronia: 2d6.",
            items: ["Custo: 5 Qi"],
          },
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
          {
            title: "Radians",
            text: "Energia concentrada em dano ou redução.\n\nRadians é uma técnica que concentra energia para ampliar o poder ofensivo ou defensivo do personagem. Ao utilizar Radians, o personagem adiciona o resultado do dado-base ao dano causado ou à redução de dano recebida.",
            items: ["Custo: 3 Qi", "Tipo de dano: Agravado"],
          },
          {
            title: "Dado-base",
            dice: { values: ["1d4", "1d6", "1d8", "1d10"] },
          },
          {
            title: "Fa Jin",
            text: "Liberação de energia com projeção.\n\nFa Jin é uma técnica de liberação concentrada de energia, utilizada para potencializar ataques e projetar força sobre o adversário. Cada nível investido acrescenta um Dado Base ao dano.",
            items: ["Custo: 3 Qi por nível", "Tipo de dano: Agravado"],
          },
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
      {
        id: "tecnicas-de-nivel",
        name: "Técnicas de Combate",
        glyph: "✧",
        tagline: "17 técnicas em três níveis de progressão",
        description:
          "As Técnicas de Combate são habilidades especiais utilizadas pelos Kowloon Fighters para ampliar suas capacidades durante o combate. As técnicas possuem categorias de progressão: Iniciante, Intermediária e Mestra. Cada técnica possui um custo de ativação e um efeito específico.",
        tags: ["Custos: 3 Taiji · 6 Taiji · 8 Qi"],
        ruleSections: [
          {
            title: "Funcionamento geral",
            text: "As Técnicas de Combate são habilidades especiais utilizadas pelos Kowloon Fighters para ampliar suas capacidades durante o combate. As técnicas possuem categorias de progressão: Iniciante, Intermediária e Mestra. Cada técnica possui um custo de ativação e um efeito específico.",
          },
          {
            title: "2.1. Acúmulo de bônus",
            items: [
              "Os bônus concedidos por diferentes técnicas podem ser somados, desde que seus efeitos sejam compatíveis com a ação realizada",
              "Uma técnica não pode ser somada a outra quando seus efeitos não fizerem sentido em conjunto",
              "O limite de técnicas acumuláveis em uma mesma ação será equivalente à metade do nível de Dan do personagem",
            ],
            note: "Observação: o limite baseado no nível de Dan será implementado futuramente.",
          },
          {
            title: "2.2. Técnicas de nível iniciante",
            text: "Custo: 3 Taiji.",
          },
          {
            title: "Golpe Relâmpago",
            text: "Efeito: Ao realizar um ataque desarmado, você ganha 1 Elevação no dado de Potência do AGIL.",
          },
          {
            title: "Dobre-se como o Junco",
            text: "Efeito: Ao realizar um teste de Defesa, caso seja bem-sucedido, adicione 1 Elevação no dado de Potência do AGIL ao seu próximo ataque.",
          },
          {
            title: "Força do Rikishi",
            text: "Efeito: Durante um Agarrão ou Imobilização ativa, seu dado de Dao ganha 1 Elevação enquanto mantiver o oponente sob controle.",
          },
          {
            title: "Manto Ciclôni",
            text: "Efeito: Se usar a manobra Ataque Veloz no mapa de batalha naquele turno, seu dado de Potência do FOR ganha 1 Elevação devido à inércia do giro.",
          },
          {
            title: "Postura de Aço",
            text: "Efeito: Adiciona 1 Elevação ao dado de Potência RES ao calcular a redução de dano em qualquer ataque sofrido de frente.",
          },
          {
            title: "2.3. Técnicas de nível intermediário",
            text: "Custo: 6 Taiji.",
          },
          {
            title: "Impacto Trovejante",
            text: "Efeito: Quando o ataque acerta, você ganha 1 Elevação gratuita no dado de Potência FOR.",
          },
          {
            title: "Redirecionamento do Fluxo",
            badge: "Exclusivo Tai Chi",
            text: "Efeito: Ao esquivar com sucesso de um ataque corpo a corpo, você redireciona o oponente. O atacante é empurrado [Resultado do seu dado de REF] metros e cai no chão (Derrubado).",
          },
          {
            title: "Golpe no Ponto Vital",
            text: "Efeito: Se o seu teste de ataque superar a Defesa do alvo por uma margem de 5+, seu dado de Dao ganha 1 Elevação na ação de dano.",
          },
          {
            title: "Precisão Divina",
            text: "Efeito: Com um golpe preciso nos centros nervosos, o alvo sofre dano e recebe uma penalidade de -1d4 em todos os testes físicos na próxima rodada devido ao travamento muscular.",
          },
          {
            title: "Giro de Redirecionamento",
            text: "Efeito: Quando um inimigo erra um ataque corpo a corpo contra você e você se movimentou até o alvo naquele turno, o giro do movimento permite que você realize um Golpe Poderoso que ganha 1 Elevação no dado de Potência FOR.",
          },
          {
            title: "Rebate de Ferro",
            text: "Efeito: Se a sua redução de dano anular completamente o dano de um ataque recebido, o oponente sofre uma reflexão de dano puro igual à metade do valor obtido anulado.",
          },
          {
            title: "2.4. Técnicas de nível mestre",
            text: "Custo: 8 Qi.",
          },
          {
            title: "Fúria da Tempestade",
            text: "Efeito: Você desfere uma saraivada rápida. Realiza um ataque aplicando 1 Elevação no dado do Dao no ataque e 1 Elevação no dado do Dao no dano da rolagem.",
          },
          {
            title: "Suplex Tectônico",
            text: "Efeito: Ao usar a manobra Agarrar, você arremessa o oponente contra o chão com impacto avassalador. O alvo sofre os efeitos de Derrubar ao final do golpe e seu dado de Potência FOR ganha 2 Elevações gratuitas.",
          },
          {
            title: "Toque Cortante",
            text: "Efeito: Ao declarar um ataque desarmado, você pode aplicar 1 Elevação no dado de Dao e seu ataque tem efeito Letal (não tem efeito em Sincronismo).",
          },
          {
            title: "Olho do Furacão",
            text: "Efeito: Você cria uma zona de pressão ao seu redor. Todos os inimigos adjacentes que tentarem atacar sofrem Desarmonia (-1d4) no teste deles, enquanto seu próximo ataque ganha 1 Elevação no dado de Potência AGIL.",
          },
          {
            title: "Impenetrável",
            text: "Efeito: Durante uma rodada inteira, você se torna uma verdadeira muralha: ganha 1 Elevação gratuita em todas as rolagens de Potência em REF e RES, além de imunidade contra efeitos de Derrubar ou Arremesso.",
          },
          {
            title: "O Abraço da Névoa",
            badge: "Exclusivo Tai Chi",
            text: "Efeito: Você opta por não causar dano ao acertar um ataque desarmado. Em vez disso, o alvo entra em Desarmonia Maior (não pode gastar Taiji, Aura, Mana ou Prana) por 1 rodada.",
          },
        ],
      },
      {
        id: "feiticeria-tai-chi",
        name: "Feitiçaria Tai Chi Kyūryū",
        glyph: "☯",
        tagline: "Psionismo, Telecinese, Percepção Extrassensorial e Autodomínio Vital",
        description:
          "Arquétipo: Tai Chi Kyūryū. Os praticantes de Tai Chi Kyūryū utilizam o Prana por meio do domínio da energia interna, da mente e do equilíbrio entre corpo e ambiente. Suas técnicas permitem manipular percepções, movimentar objetos sem contato físico, ampliar os sentidos e controlar as próprias funções vitais. Fonte de energia: Prana.",
        tags: ["Fonte de energia: Prana", "Atributo principal: MEN / ESP"],
        ruleSections: [
          {
            title: "1. Psionismo — Domínio Mental",
            text: "Função: Controlar informações, pensamentos, emoções e percepções de outros personagens.\n\nAtributo principal: MEN.",
          },
          {
            title: "Leitura Mental",
            text: "Permite captar pensamentos superficiais de um alvo.",
            items: [
              "Usuário: teste de Dao + MEN.",
              "Alvo: teste de Dao + VON.",
              "Se o usuário vencer, consegue captar pensamentos superficiais.",
              "Diferenças maiores entre os resultados podem permitir a obtenção de informações mais específicas.",
            ],
          },
          {
            title: "Comunicação Psíquica",
            text: "Permite estabelecer comunicação mental com outro personagem.",
            items: [
              "Usuário: teste de Dao + MEN.",
              "Não exige disputa caso o alvo aceite a comunicação.",
              "Alcance em metros: Dao + MEN.",
            ],
          },
          {
            title: "Influência Mental",
            text: "Permite provocar emoções ou impulsos momentâneos em um alvo.",
            items: [
              "Usuário: teste de Dao + MEN.",
              "Alvo: teste de Dao + VON.",
              "Se o usuário vencer, aplica uma das seguintes influências: medo, calma ou dúvida.",
              "Não permite controlar diretamente as ações do alvo, apenas influenciar seu estado emocional momentâneo.",
            ],
          },
          {
            title: "Ilusão Mental",
            text: "Permite alterar a percepção de um alvo, fazendo-o perceber algo que não existe.",
            items: [
              "Usuário: teste de Dao + MEN.",
              "Alvo: teste de Dao + VON.",
              "Se o usuário vencer, o alvo passa a perceber a ilusão criada.",
            ],
          },
          {
            title: "2. Telecinese — Manipulação à Distância",
            text: "Função: Manipular objetos e criaturas sem contato físico, utilizando força mental e energia interna.\n\nAtributo principal: MEN.",
          },
          {
            title: "Impulso Telecinético",
            text: "Permite empurrar ou puxar objetos e criaturas à distância.",
            items: [
              "Usuário: teste de Dao + MEN.",
              "Alvo: teste de Dao + FOR, conforme a situação.",
              "Se o usuário vencer, desloca o alvo.",
              "A distância do deslocamento é determinada por Dao + MEN, conforme a resolução da técnica.",
              "O atributo MEN também pode determinar a intensidade da força ou do dano causado.",
            ],
          },
          {
            title: "Suspensão",
            text: "Permite manter objetos suspensos no ar por meio da energia mental.",
            items: [
              "Teste: Dao + MEN.",
              "O resultado determina o peso máximo, em quilogramas, que pode ser sustentado.",
              "Duração: MEN em minutos.",
            ],
          },
          {
            title: "Compressão",
            text: "Permite exercer pressão telecinética sobre um alvo, comprimindo seu corpo ou estrutura.",
            items: [
              "Usuário: teste de Dao + MEN.",
              "Alvo: teste de Dao + RES.",
              "Se o usuário vencer, realiza uma rolagem de MEN puro para determinar o dano letal causado.",
            ],
          },
          {
            title: "Campo Telecinético",
            text: "Permite criar uma barreira de força invisível para proteger o usuário contra ataques de projéteis.",
            items: [
              "Teste: Dao + MEN.",
              "O resultado é somado ao REF do usuário como defesa contra projéteis.",
            ],
          },
          {
            title: "3. Percepção Extrassensorial — Sentidos Ampliados",
            text: "Função: Perceber presenças, identificar ameaças e obter informações que ultrapassam os sentidos físicos convencionais.\n\nAtributo principal: MEN.",
          },
          {
            title: "Intuição de Perigo",
            text: "Permite perceber ameaças iminentes e reagir melhor a situações inesperadas.",
            items: [
              "Baseado em MEN.",
              "O resultado é somado a qualquer teste realizado quando o personagem for surpreendido.",
              "Habilidade passiva, permanece sempre ativa.",
            ],
          },
          {
            title: "Leitura de Vestígios",
            text: "Permite captar fragmentos de acontecimentos associados a objetos ou locais.",
            items: [
              "Teste: Dao + ESP.",
              "A dificuldade aumenta conforme a distância temporal ou espacial do acontecimento, além da antiguidade e durabilidade do objeto.",
              "Pode revelar informações visuais, sons, cheiros e outras percepções relacionadas ao ambiente.",
              "As informações obtidas podem fornecer vantagens investigativas e táticas para o grupo.",
            ],
          },
          {
            title: "4. Autodomínio Vital — Controle Interno",
            text: "Função: Controlar as próprias funções corporais, recuperar vitalidade e resistir a condições físicas, mentais e espirituais.\n\nAtributo principal: ESP.",
          },
          {
            title: "Regeneração Interna",
            text: "Permite utilizar o Prana para estimular a recuperação do próprio corpo.",
            items: [
              "Rolagem: dado de ESP.",
              "O resultado é somado ao dado de Prana.",
              "O total determina a quantidade de pontos de vida recuperados.",
            ],
          },
          {
            title: "Purificação",
            text: "Permite utilizar a energia interna para neutralizar substâncias e influências nocivas.",
            items: [
              "Teste: Dao + ESP.",
              "O resultado é comparado à dificuldade do efeito nocivo.",
              "O sucesso pode neutralizar venenos, males mentais e influências espirituais.",
            ],
          },
          {
            title: "Disciplina Vital",
            text: "Permite controlar as funções internas do corpo para suportar condições extremas.",
            items: [
              "Teste: Dao + ESP.",
              "O resultado é utilizado como bônus nos testes de resistência correspondentes.",
              "Permite resistir a condições como frio, calor, cansaço e falta de ar.",
            ],
          },
        ],
      },
      {
        id: "nove-dragoes",
        name: "Os Nove Dragões",
        glyph: "龍",
        tagline: "Nove dragões elementais, três escolhas",
        description:
          "Apresenta o estilo marcial exclusivo dos Kowloon Fighters e suas especializações elementais.",
        tags: [
          "Requisito: Arquétipo Artista Marcial Kyūryū Shōtenken",
          "Até 3 dragões",
          "3 pts da fonte por uso",
          "Dado do Dragão: 1d4–1d12",
        ],
        ruleSections: [
          {
            title: "Estilo Kyūryū Shōtenken",
            text: "Nove dragões elementais, três escolhas.\n\nO Kyūryū Shōtenken é um sistema de estilos de luta inspirado nos nove dragões elementais. Cada dragão representa uma força da natureza e concede ao personagem um bônus específico, complementando seus atributos e suas fontes de energia.",
            items: [
              "Requisito: Arquétipo Artista Marcial Kyūryū Shōtenken",
              "Até 3 dragões",
              "3 pts da fonte por uso",
            ],
          },
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
          {
            title: "Os Nove Dragões",
            text: "Os estilos elementais do Kyūryū Shōtenken.\n\nCada dragão possui uma característica própria, oferecendo diferentes possibilidades de especialização durante o combate.",
            items: ["Dado do Dragão: 1d4–1d12"],
          },
        ],
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
export const GROUP_DESCRIPTIONS: Record<string, string> = {};
