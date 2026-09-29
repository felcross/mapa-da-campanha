// ── Interfaces ──────────────────────────────────────────────────────

export interface RuleTable {
  headers: string[];
  rows: string[][];
}

export interface RuleSection {
  title?: string;
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
      // ── 1. YIN & YANG ─────────────────────────────────────────────
      {
        id: "yin-yang",
        name: "Yin & Yang",
        glyph: "☯",
        tagline: "As duas forças fundamentais do combate",
        description:
          "O combate é a arte de controlar o OR, a potência vital, através do Wuji, o vazio de possibilidades. Tudo gira em torno de duas forças: YIN (mente, técnica e percepção) e YANG ( corpo, força e impacto).",
        tags: ["Fundamentos", "YIN", "YANG", "OR"],
        ruleSections: [
          {
            title: "YIN — Mente",
            text: "Representa as 3 Harmonias Internas: Coração, Intenção e Energia Vital. O YIN determina sua capacidade de perceber, controlar e direcionar o combate.",
            items: [
              "Usado para Ataque",
              "Usado para Defesa",
            ],
          },
          {
            title: "Teste de YIN",
            text: "Role seu YIN contra o YIN do alvo. Quem obtiver o maior resultado vence a disputa.",
          },
          {
            title: "YANG — Corpo",
            text: "Representa as 3 Harmonias Externas: Ombros + Quadris, Cotovelos + Joelhos, Mãos + Pés. O YANG representa sua estrutura física e sua capacidade de produzir e suportar impacto.",
            items: [
              "Usado para Dano",
              "Usado para Resistência",
            ],
          },
          {
            title: "Teste de YANG",
            text: "Quando um ataque acerta, role seu YANG contra o YANG do alvo. O resultado determina o impacto causado ou absorvido.",
          },
        ],
      },

      // ── 2. SINCRONIA ──────────────────────────────────────────────
      {
        id: "sincronia",
        name: "Sincronia",
        glyph: "⚡",
        tagline: "O equilíbrio perfeito entre mente e corpo",
        description:
          "Normalmente, um teste utiliza apenas 1 dado. Você pode gastar 2 Aura para ativar a Sincronia — ao fazer isso, adiciona +1d6 ao teste e passa a rolar YIN + YANG juntos.",
        tags: ["Sincronia", "Aura", "Shin-Gi-Tai", "Desarmonia"],
        ruleSections: [
          {
            title: "Desarmonia",
            text: "Se os dados mostrarem 1 e 6, em qualquer ordem (1 + 6 = Desarmonia), o fluxo entra em curto. O bônus da Sincronia é perdido e os dados da Sincronia não são somados ao resultado.",
          },
          {
            title: "Harmonia",
            text: "Se os dados forem diferentes e não formarem 1+6 (ex: 2+5, 3+4, 4+5), o fluxo funciona normalmente. Some os dois dados ao resultado.",
          },
          {
            title: "Shin-Gi-Tai — Harmonia Perfeita",
            text: "Se os dois dados forem iguais, ocorre uma Harmonia Perfeita. O número repetido determina a potência da ressonância.",
            table: {
              headers: ["Dupla", "Ressonância"],
              rows: [
                ["1+1", "+3d4"],
                ["2+2", "+3d6"],
                ["3+3", "+3d8"],
                ["4+4", "+3d10"],
                ["5+5", "+3d12"],
                ["6+6", "+3d16 + DAN"],
              ],
            },
          },
          {
            title: "Ressonância Máxima",
            text: "6+6 é a Ressonância Máxima. O personagem adiciona seu nível atual de DAN ao resultado final.",
          },
        ],
      },

      // ── 3. POSTURAS ───────────────────────────────────────────────
      {
        id: "posturas",
        name: "Posturas",
        glyph: "🛡",
        tagline: "18 posturas, 3 escolhidas, 1 estilo",
        description:
          "Todo artista marcial conhece as 18 Posturas. Porém, cada personagem escolhe apenas 3 para formar seu estilo pessoal. Cada Postura possui 2 focos — um pode ser um Atributo, outro uma Manobra (ex: Pular, Fintar, Correr).",
        tags: ["Posturas", "Foco", "Atributo", "Manobra"],
        ruleSections: [
          {
            title: "Entrando em uma Postura",
            text: "Ao entrar em uma Postura, você recebe os benefícios dos seus dois focos.",
            items: [
              "Foco: Atributo — Você pode adicionar o dado daquele atributo aos testes permitidos pela Postura.",
              "Foco: Manobra — Você pode utilizar aquela Manobra sem pagar CP.",
            ],
          },
          {
            title: "Troca de Postura",
            text: "Durante o combate, você pode alternar entre suas 3 Posturas. A troca permite adaptar seu estilo à situação atual.",
            items: [
              "Custo: 2 Aura, ou 1 CPP",
            ],
          },
          {
            title: "Sem Postura",
            text: "Você também pode lutar sem uma Postura ativa. Nesse caso, para utilizar atributos ou manobras fora do foco atual, você deve gastar CPP normalmente.",
          },
        ],
      },

      // ── 4. FA JIN ─────────────────────────────────────────────────
      {
        id: "fa-jin",
        name: "Fa Jin",
        glyph: "💥",
        tagline: "Liberação concentrada de plasma",
        description:
          "O Fa Jin é a liberação concentrada do OR através do corpo. O lutador força suas células a descarregarem sua energia em um único instante. Fa Jin transforma o próprio ataque em dano.",
        tags: ["Fa Jin", "Plasma", "Aura", "Dano Direto"],
        ruleSections: [
          {
            title: "Ativação",
            text: "Ao declarar um Fa Jin, gaste Aura para liberar a técnica. O ataque utiliza: 1d6 de YIN + dados de Fa Jin.",
          },
          {
            title: "Defesa contra Fa Jin",
            text: "O alvo não pode usar Resistência para reduzir o dano. A defesa é resolvida através de: YIN do atacante × YIN do defensor. O defensor também pode gastar Aura para ativar um Fa Jin defensivo e adicionar seus dados de Fa Jin à defesa.",
          },
          {
            title: "Resolução",
            text: "O Fa Jin não possui uma rolagem de dano separada. O resultado final do ataque é o próprio dano.",
            items: [
              "Se o ataque superar a defesa: Dano = resultado total do Fa Jin",
              "O dano é aplicado diretamente à Vida",
              "A Resistência não reduz esse valor",
            ],
          },
          {
            title: "Exemplo",
            text: "Fa Jin do atacante: 15. Defesa do alvo: 6. O ataque supera a defesa. Dano sofrido: 15. A Resistência não reduz esse valor.",
          },
        ],
      },

      // ── 5. FA JIN + SHIN-GI-TAI ───────────────────────────────────
      {
        id: "fa-jin-shin-gi-tai",
        name: "Fa Jin + Shin-Gi-Tai",
        glyph: "🔥",
        tagline: "A explosão máxima de OR",
        description:
          "Você pode gastar Aura adicional ao declarar o Fa Jin para buscar uma Ressonância Shin-Gi-Tai. Quanto maior a dupla, maior a explosão de OR.",
        tags: ["Fa Jin", "Shin-Gi-Tai", "Ressonância", "Explosão"],
        ruleSections: [
          {
            title: "Ressonância com Fa Jin",
            text: "Se os dados de YIN e YANG formarem uma dupla, os dados de ressonância são adicionados ao resultado do Fa Jin.",
            table: {
              headers: ["Dupla", "Ressonância"],
              rows: [
                ["1+1", "+3d4"],
                ["2+2", "+3d6"],
                ["3+3", "+3d8"],
                ["4+4", "+3d10"],
                ["5+5", "+3d12"],
                ["6+6", "+3d16 + DAN"],
              ],
            },
          },
        ],
      },

      // ── 6. FLUXO DO COMBATE ───────────────────────────────────────
      {
        id: "fluxo-combate",
        name: "Fluxo do Combate",
        glyph: "⚔",
        tagline: "Sequências de resolução de combate",
        description:
          "Os três fluxos principais do combate: ataque normal, ataque com Sincronia e Fa Jin. Cada fluxo define a ordem exata de rolagens e resoluções.",
        tags: ["Fluxo", "Ataque", "Sincronia", "Fa Jin"],
        ruleSections: [
          {
            title: "Ataque Normal",
            items: [
              "1. Declare o ataque",
              "2. Role YIN contra YIN",
              "3. Se acertar, role YANG contra YANG",
              "4. Determine o Dano",
            ],
          },
          {
            title: "Ataque com Sincronia",
            items: [
              "1. Gaste 2 Aura",
              "2. Adicione +1d6",
              "3. Compare os dois dados",
              "4. Desarmonia, Harmonia ou Shin-Gi-Tai",
              "5. Resolva o teste",
            ],
          },
          {
            title: "Fa Jin",
            items: [
              "1. Gaste Aura",
              "2. Role YIN + dados de Fa Jin",
              "3. O alvo defende com YIN",
              "4. Se o ataque superar a defesa: Dano = resultado total do ataque",
            ],
          },
        ],
      },

      // ── 7. O ESTILO DO PERSONAGEM ─────────────────────────────────
      {
        id: "estilo-personagem",
        name: "O Estilo do Personagem",
        glyph: "🎭",
        tagline: "18 posturas disponíveis → 3 escolhidas → 1 estilo pessoal",
        description:
          "Seu estilo é definido pelas 3 Posturas escolhidas. As Posturas determinam quais atributos e manobras estão naturalmente integrados ao seu estilo de combate.",
        tags: ["Estilo", "Posturas", "Personalização"],
        ruleSections: [
          {
            title: "Construção do Estilo",
            text: "Cada personagem possui 18 posturas disponíveis, escolhe 3, e forma 1 estilo pessoal único.",
            items: [
              "As Posturas determinam quais atributos e manobras estão naturalmente integrados ao seu estilo de combate",
              "Escolha suas Posturas. Domine suas Harmonias. Controle seu OR.",
            ],
          },
        ],
      },
    ],
  },
};

// ── Derived ─────────────────────────────────────────────────────────

export const ALL_CATEGORIES: Category[] = Object.values(DATA);
