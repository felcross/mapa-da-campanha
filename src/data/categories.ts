// ── Interfaces ──────────────────────────────────────────────────────

export interface RuleTable {
  headers: string[];
  rows: string[][];
}

export interface RuleSection {
  title?: string;
  titleImage?: string;
  text?: string;
  items?: string[];
  table?: RuleTable;
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
  items: Item[];
}

// ── Data ────────────────────────────────────────────────────────────

export const DATA: Record<string, Category> = {
  "seis-harmonias": {
    id: "seis-harmonias",
    seal: "☯",
    label: "As Seis Harmonias",
    listLabel: "Capítulos",
    items: [
      // ── 1. COSMOLOGIA E RECURSOS ───────────────────────────────────
      {
        id: "cosmologia-recursos",
        name: "Cosmologia e Recursos",
        glyph: "☯️",
        tagline: "Os três Chakras e os Pontos de Potência de Combate",
        description:
          "O corpo do lutador canaliza sua energia através dos três Chakras principais e dos Pontos de Potência de Combate.",
        tags: ["Chi", "Prana", "Vida", "CPP", "Chakra"],
        ruleSections: [
          {
            title: "Chi (Lâmina Preta — Chakra da Mente)",
            titleImage: "/Gakyil.jpeg",
            text: "Energia consciente para Sincronia, Posturas, Manobras, Fa Jin e habilidades.",
          },
          {
            title: "Prana (Lâmina Vermelha — Chakra do Coração)",
            titleImage: "/Gakyil.jpeg",
            text: "Usado para recuperar o corpo do estresse provocado pelo plasma.",
          },
          {
            title: "Vida (Lâmina Branca — Chakra do Corpo)",
            titleImage: "/Gakyil.jpeg",
            text: "Integridade física do receptáculo.",
          },
          {
            title: "CPP (Combat Power Points)",
            text: "Recurso tático dinâmico de combate.",
          },
        ],
      },

      // ── 2. O MOTOR DE COMBATE (YIN & YANG) ───────────────────────
      {
        id: "yin-yang",
        name: "Yin & Yang",
        glyph: "☯",
        tagline: "As duas forças fundamentais do combate",
        description:
          "O combate é dividido em duas forças fundamentais.",
        tags: ["YIN", "YANG", "Harmonias Internas", "Harmonias Externas"],
        ruleSections: [
          {
            title: "🔵 YIN — As Harmonias Internas (Dado Base: 1d6)",
            text: "Representa: Coração, Intenção e Energia.",
            items: [
              "Usado para: Ataque, Defesa, Precisão, Esquiva e Bloqueio.",
              "Regra: Testes de Ataque e Defesa utilizam Yin contra Yin.",
            ],
          },
          {
            title: "🔴 YANG — As Harmonias Externas (Dado Base: 1d6)",
            text: "Representa: Articulações, Membros e Força Física.",
            items: [
              "Usado para: Dano, Resistência e Aplicação de Força.",
              "Regra: Testes de Dano e Resistência utilizam Yang contra Yang.",
            ],
          },
        ],
      },

      // ── 3. ESCALA DE DADOS E PRIORIDADE DE MODIFICAÇÃO ──────────
      {
        id: "escala-dados",
        name: "Escala de Dados",
        glyph: "🎲",
        tagline: "Progressão e prioridade de modificação de dados",
        description:
          "A progressão de dados do sistema segue a ordem: 1d4 → 1d6 → 1d8 → 1d10 → 1d12 → 1d12+2 → 1d12+4... Cada avanço representa 1 Elevação.",
        tags: ["Escala", "Elevação", "Potencializar", "Negativar"],
        ruleSections: [
          {
            title: "Regra de Prioridade para Potencializar ou Negativar Dados",
            text: "Quando um efeito ou gasto de recurso permite Potencializar (+1 Elevação) ou Negativar (-1 Elevação) um dado da jogada, a aplicação DEVE obrigatoriamente seguir esta ordem:",
            items: [
              "1º — Dados de Atributo (se houver na jogada).",
              "2º — Dado de Manobra (se houver na jogada).",
              "3º — Dados de Yin / Yang (últimos a serem afetados).",
            ],
          },
          {
            title: "Exceção",
            text: "Se a ação for realizada utilizando apenas Yin e Yang (sem atributos ou manobras envolvidos), os dados de Yin e Yang tornam-se os primeiros e únicos afetados.",
          },
        ],
      },

      // ── 4. COMBAT POWER POINTS (CPP) ─────────────────────────────
      {
        id: "cpp",
        name: "Combat Power Points",
        glyph: "⚡",
        tagline: "Recurso tático dinâmico de combate",
        description:
          "O CPP é um recurso exclusivo de combate acumulado durante a luta.",
        tags: ["CPP", "Recurso", "Combate"],
        ruleSections: [
          {
            title: "Regras Gerais do CPP",
            items: [
              "Todo combate começa obrigatoriamente com 0 CPP.",
              "Existe apenas durante o combate. Ao término do confronto, todos os CPPs são zerados.",
            ],
          },
          {
            title: "Como Ganhar CPP",
            items: [
              "Receber dano de qualquer origem.",
              "Acertar um ataque no alvo.",
            ],
          },
          {
            title: "Como Gastar CPP",
            items: [
              "3 CPP — Potencializar um Dado: Eleva 1 dado da jogada em 1 degrau na escala (respeitando a regra de prioridade).",
              "3 CPP — Negativar um Dado: Reduz 1 dado do alvo/jogada em 1 degrau na escala (respeitando a regra de prioridade).",
              "4 CPP — Manobra: Permite ativar uma Manobra Especial ou Manobra de Estilo.",
              "4 CPP — Atributo: Permite adicionar um Atributo à jogada.",
            ],
          },
        ],
      },

      // ── 5. POSTURAS E ESTILOS ─────────────────────────────────────
      {
        id: "posturas-estilos",
        name: "Posturas e Estilos",
        glyph: "🛡",
        tagline: "Posturas básicas, transição e os seis estilos",
        description:
          "As posturas definem a base do combate e os estilos determinam a especialização do personagem.",
        tags: ["Posturas", "Estilos", "VEL", "FOR", "RES", "REF"],
        ruleSections: [
          {
            title: "Posturas Básicas",
            items: [
              "🦅 Postura do Falcão: Velocidade (VEL)",
              "🐯 Postura do Tigre: Força (FOR)",
              "🐢 Postura da Tartaruga: Resistência (RES)",
              "🐍 Postura da Serpente: Reflexo (REF)",
            ],
          },
          {
            title: "Transição de Postura",
            items: [
              "No próprio Turno: 1 CPP (ou 2 Chi).",
              "No Turno do Alvo (Reação): 2 CPP (ou 3 Chi).",
              "Conversão Geral: Custo em Chi = CPP + 1.",
            ],
          },
          {
            title: "Os Seis Estilos",
            text: "Cada personagem escolhe 1 Estilo que define seus dois atributos especializados:",
            items: [
              "⚡ Tempestade Súbita: VEL + FOR",
              "🌊 Fluxo Inversivo: VEL + REF",
              "🌋 Montanha Esmagadora: FOR + RES",
              "🦂 Garra Perfurante: FOR + REF",
              "🌀 Vórtice de Vento: RES + VEL",
              "⛰️ Muralha de Ferro: RES + REF",
            ],
          },
          {
            title: "Especialização",
            text: "Quando o personagem assume a Postura correspondente a um dos atributos de seu Estilo, aquele atributo recebe +1 Elevação (ex: 1d10 → 1d12).",
          },
        ],
      },

      // ── 6. MANOBRAS DE ESTILO ─────────────────────────────────────
      {
        id: "manobras-estilo",
        name: "Manobras de Estilo",
        glyph: "⚔",
        tagline: "Técnicas táticas exclusivas de combate",
        description:
          "As Manobras de Estilo são técnicas táticas exclusivas de combate.",
        tags: ["Manobras", "Pular", "Rasteira", "Fintar", "Triângulo"],
        ruleSections: [
          {
            title: "Regras das Manobras de Estilo",
            items: [
              "Escolha Única: Na criação do personagem, escolhe-se apenas 1 Manobra de Estilo: Pular, Rasteira ou Fintar. As outras duas não podem ser compradas nem usadas.",
              "Dado de Manobra: Possui um dado próprio que começa em 1d4 e pode ser elevado com CPP até o limite máximo de 1d12.",
              "Atenção: O Dado de Manobra é independente dos atributos e não concede +1 Elevação aos atributos.",
              "Custo de Ativação: 2 CPP, 3 Chi.",
            ],
          },
          {
            title: "Triângulo de Defesa",
            items: [
              "🦘 PULAR defende contra 🧹 RASTEIRA",
              "🧹 RASTEIRA defende contra ↪️ FINTA",
              "↪️ FINTA defende contra 🦘 PULAR",
            ],
          },
          {
            title: "Defesa Incorreta",
            text: "Se o adversário usar uma Manobra e você não possuir a resposta correta no Triângulo, não poderá usar sua Manobra para defender. A defesa deverá ser feita com Yin puro (1d6).",
          },
          {
            title: "Efeito de Negativação",
            text: "Um personagem atingido por um ataque com Manobra de Estilo sofre Negativação em seu próximo turno (todas as rolagens descem 1 degrau na escala de dados).",
          },
        ],
      },

      // ── 7. MANOBRAS ESPECIAIS ─────────────────────────────────────
      {
        id: "manobras-especiais",
        name: "Manobras Especiais",
        glyph: "💥",
        tagline: "Acessíveis a todos os personagens",
        description:
          "Manobras Especiais são acessíveis a todos os personagens (sem exclusividade).",
        tags: ["Manobras Especiais", "Corrida Cinética", "Arremessar"],
        ruleSections: [
          {
            title: "Custo de Ativação",
            items: [
              "4 CPP, 5 Chi.",
              "Dado de Manobra Especial: Começa em 1d4 e pode ser elevado via CPP até 1d12.",
            ],
          },
          {
            title: "🏃 Corrida Cinética",
            items: [
              "Requisito: Avanço mínimo de 4 metros / 4 quadrados até o alvo. Rola o atributo MOV (Movimento).",
              "Efeito: Se o ataque conectar, concede +1d4 de Dano automático e aplica Negativação no próximo golpe/ação do alvo.",
            ],
          },
          {
            title: "💥 Arremessar (Empuxo)",
            items: [
              "Efeito: Se o ataque conectar, role 1d4. O resultado indica a distância em metros que o alvo é empurrado e causa esse valor como Dano Bruto.",
              "Arremesso Vertical: Lança o alvo para cima.",
              "Regra de Desarmonia no Ar: Alvos lançados verticalmente entram automaticamente em Desarmonia durante o tempo no ar / em seu próximo turno, ficando impedidos de gastar Chi para Sincronia.",
            ],
          },
        ],
      },

      // ── 8. SINCRONIA E ALINHAMENTO ────────────────────────────────
      {
        id: "sincronia",
        name: "Sincronia",
        glyph: "⚡",
        tagline: "A união consciente do Yin e Yang",
        description:
          "A Sincronia é a união consciente do Yin e Yang.",
        tags: ["Sincronia", "Chi", "Shin-Gi-Tai", "Desarmonia", "Harmonia"],
        ruleSections: [
          {
            title: "Custo e Rolagem",
            items: [
              "Custo: 3 Chi (Declaração: \"Vou gastar Chi para Alinhar\").",
              "Rolagem: Yin (1d6) + Yang (1d6) = 2d6.",
            ],
          },
          {
            title: "⚠️ Desarmonia (Resultados 1 + 6 ou 6 + 1)",
            items: [
              "Os dados de Yin e Yang são descartados (não somam na jogada).",
              "Qualquer bônus de Sincronia é perdido.",
              "O personagem fica impedido de gastar Chi em seu próximo ataque (mas pode atacar normalmente sem Chi).",
            ],
          },
          {
            title: "🟢 Harmonia (Dados diferentes, exceto 1 + 6 / 6 + 1)",
            text: "Soma-se o resultado dos dois dados normalmente à jogada.",
          },
          {
            title: "🔥 Shin-Gi-Tai (Dados iguais)",
            text: "Soma-se os dois dados iguais e adiciona-se 1 dado extra conforme a tabela:",
            table: {
              headers: ["Par", "Resultado Fixo", "Dado Extra de Shin-Gi-Tai"],
              rows: [
                ["1 + 1", "2", "+1d4"],
                ["2 + 2", "4", "+1d6"],
                ["3 + 3", "6", "+1d8"],
                ["4 + 4", "8", "+1d10"],
                ["5 + 5", "10", "+1d12"],
                ["6 + 6", "12", "+1d12 + DAN (máx +10)"],
              ],
            },
          },
        ],
      },

      // ── 9. FA JIN & KYŪRYŪKEN ──────────────────────────────────────
      {
        id: "fa-jin",
        name: "Fa Jin & Kyūryūken",
        glyph: "🐉",
        tagline: "Liberação de plasma térmico e Punho dos Nove Dragões",
        description:
          "O Fa Jin é a liberação de plasma térmico através do atrito celular.",
        tags: ["Fa Jin", "Plasma", "Fusão Primordial", "Kyūryūken"],
        ruleSections: [
          {
            title: "Escala do Fa Jin",
            text: "1d4 → 1d6 → 1d8 → 1d10 (Limite máximo: 1d10).",
          },
          {
            title: "Propriedade Especial",
            text: "O dano do Fa Jin ignora a Resistência (RES) e é aplicado diretamente na Vida do alvo.",
          },
          {
            title: "Restrição Padrão",
            text: "É proibido utilizar Fa Jin e Sincronia na mesma ação.",
          },
          {
            title: "🐉 Fusão Primordial (Nível 10 da Arbor Long Mai)",
            text: "Quebra a limitação do Fa Jin, permitindo combinar Fa Jin + Sincronia na mesma ação (Rolagem: Dado de Fa Jin + Yin 1d6 + Yang 1d6).",
          },
          {
            title: "🐉 Kyūryūken Punho dos Nove Dragões",
            text: "Quando o personagem utiliza Fa Jin com Sincronia e obtém um Shin-Gi-Tai, desencadeia acertos múltiplos de plasma:",
            items: [
              "1 + 1: 1 golpe extra (+1 dado de Fa Jin)",
              "2 + 2: 2 golpes extras (+2 dados de Fa Jin)",
              "3 + 3: 3 golpes extras (+3 dados de Fa Jin)",
              "4 + 4: 6 golpes extras (+6 dados de Fa Jin)",
              "5 + 5: 7 golpes extras (+7 dados de Fa Jin)",
              "💥 6 + 6 (Kyūryūken Supremo): Executa 9 golpes inevitáveis e adiciona +9 dados de Fa Jin.",
              "Com Fa Jin no máximo (1d10): 1d10 + 9d10 = 10d10 de Plasma Puro aplicados diretamente na Vida (sem redução por RES).",
            ],
          },
        ],
      },

      // ── 10. FLUXO BÁSICO DO COMBATE ──────────────────────────────
      {
        id: "fluxo-combate",
        name: "Fluxo Básico do Combate",
        glyph: "⚔",
        tagline: "Sequência completa de resolução de combate",
        description:
          "A sequência completa de resolução de combate, da Postura ao Kyūryūken.",
        tags: ["Fluxo", "Combate", "Sequência"],
        ruleSections: [
          {
            title: "1. POSTURA",
            text: "Define o atributo físico concentrado.",
          },
          {
            title: "2. ESTILO",
            text: "Define os dois atributos especializados.",
          },
          {
            title: "3. MANOBRA",
            text: "Utiliza seu próprio Dado de Manobra.",
            items: [
              "1d4 → 1d6 → 1d8 → 1d10 → 1d12",
            ],
          },
          {
            title: "4. YIN / YANG",
            items: [
              "Yin: Ataque / Defesa",
              "Yang: Dano / Resistência",
            ],
          },
          {
            title: "5. SINCRONIA",
            text: "Gaste 3 Chi para combinar Yin + Yang.",
          },
          {
            title: "6. RESULTADO",
            items: [
              "1 + 6 → Desarmonia",
              "Diferentes → Harmonia",
              "Iguais → Shin-Gi-Tai",
            ],
          },
          {
            title: "7. FA JIN",
            text: "Quando permitido, ignora Resistência e causa dano direto à Vida.",
          },
          {
            title: "8. FUSÃO PRIMORDIAL",
            text: "Permite: Fa Jin + Sincronia.",
          },
          {
            title: "9. Kyūryūken Punho dos Nove Dragões",
            text: "Shin-Gi-Tai durante Fa Jin produz a sequência dos Dragões.",
          },
        ],
      },

      // ── 11. TABELA DE REFERÊNCIA RÁPIDA ──────────────────────────
      {
        id: "tabela-referencia",
        name: "Tabela de Referência Rápida",
        glyph: "📋",
        tagline: "Resumo de custos",
        description:
          "Tabela de custos para consultas durante o combate.",
        tags: ["Referência", "Custos", "Tabela"],
        ruleSections: [
          {
            title: "Custos",
            table: {
              headers: ["Ação", "CPP", "Chi"],
              rows: [
                ["Trocar Postura — próprio Turno", "1", "2"],
                ["Trocar Postura — Reação", "2", "3"],
                ["Manobra de Estilo", "1", "2"],
                ["Manobra Especial", "3", "4"],
                ["Sincronia", "—", "3"],
                ["Potencializar Dado", "2", "—"],
                ["Negativar Dado", "2", "—"],
                ["Adicionar Atributo", "3", "—"],
              ],
            },
          },
        ],
      },
    ],
  },
};

// ── Derived ─────────────────────────────────────────────────────────

export const ALL_CATEGORIES: Category[] = Object.values(DATA);
