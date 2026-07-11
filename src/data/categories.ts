// ── Interfaces ──────────────────────────────────────────────────────

export interface Bonus {
  source: string;
  value: string;
}

export interface School {
  name: string;
  skills: string[];
  equipment: string[];
}

export interface SubEffect {
  name: string;
  text: string;
}

export interface TechniqueEffect {
  name: string;
  text: string;
  subEffects?: SubEffect[];
}

export interface SubAbilityCategory {
  name: string;
  examples: string;
}

export interface SubAbility {
  name: string;
  text: string;
  categories?: SubAbilityCategory[];
}

export interface Technique {
  level: number;
  levelLabel: string;
  title: string;
  intro: string;
  effects: TechniqueEffect[];
  subAbilities?: SubAbility[];
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

export interface SubSection {
  name: string;
  text: string;
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

export interface ConstellationField {
  [key: string]: string;
}

export interface Constellation {
  name: string;
  summary: string;
  fields: ConstellationField;
}

export interface Domain {
  name: string;
  sealLabel: string;
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

export interface Item {
  id: string;
  name: string;
  fullTitle?: string;
  glyph: string;
  tagline: string;
  description: string;
  tags: string[];
  bonuses?: Bonus[];
  school?: School;
  techniques?: Technique[];
  upkeep?: Upkeep;
  resource?: Resource;
  difficulty?: Difficulty;
  subSections?: SubSection[];
  elementalVariants?: ElementalVariant[];
  domains?: Domain[];
  spellLibrary?: SpellLibrary[];
}

export interface Category {
  label: string;
  seal: string;
  listLabel: string;
  items: Item[];
}

// ── DATA ────────────────────────────────────────────────────────────

export const DATA: Record<string, Category> = {
  samurai: {
    label: "Samurai",
    seal: "侍",
    listLabel: "Clãs",
    items: [
      {
        id: "mirumoto",
        name: "Mirumoto",
        fullTitle: "Clã do Dragão: Linhagem Mirumoto",
        glyph: "龍",
        tagline: "Guardiões práticos das montanhas do Dragão, mestres do Niten.",
        description:
          "Os Mirumoto são os guardiões práticos das montanhas do Dragão. Enquanto outros buscam iluminação em isolamento, os Mirumoto dominam a arte do Niten — o estilo de duas espadas. Calmos e implacáveis, eles desafiam a tradição ortodoxa de \"uma alma, uma espada\", utilizando a katana e a wakizashi em um fluxo harmônico que serve tanto para o ataque devastador quanto para uma defesa impenetrável.",
        bonuses: [
          { source: "Família Mirumoto", value: "+1 Agilidade" },
          { source: "Bônus de Escola", value: "+1 Vigor" },
        ],
        school: {
          name: "Escola de Bushi Mirumoto",
          skills: [
            "Defesa",
            "Iaijutsu",
            "Kenjutsu (Katana)",
            "Conhecimento: Shugenja",
            "Meditação",
            "Teologia",
            "qualquer Perícia de Bugei ou Alta Perícia",
          ],
          equipment: [
            "Armadura Leve",
            "Roupas Grossas",
            "Daisho (Katana e Wakizashi)",
            "qualquer arma adicional",
            "Kit de Viagens",
            "5 kokus",
          ],
        },
        techniques: [
          {
            level: 1,
            levelLabel: "一",
            title: "O Caminho do Dragão",
            intro:
              "O Mirumoto aprende a coordenar suas lâminas como extensões naturais de seu corpo.",
            effects: [
              {
                name: "Técnica Niten",
                text: "Ao empunhar a katana (principal) e a wakizashi (secundária), a penalidade por dupla empunhadura é reduzida para apenas -5 (em vez de -10).",
              },
              {
                name: "Versatilidade de Fluxo",
                text: "No seu turno, você escolhe uma das opções:",
                subEffects: [
                  {
                    name: "Estilo Ofensivo",
                    text: "Realiza dois ataques (um com cada arma), aplicando a penalidade de -5 em ambos.",
                  },
                  {
                    name: "Estilo Defensivo",
                    text: "Realiza um ataque com a katana e usa a wakizashi para defesa, recebendo +2k0 no seu Teste de Defesa até o próximo turno.",
                  },
                ],
              },
              {
                name: "Sintonia Espiritual",
                text: "Quando for alvo de um feitiço, você pode aumentar ou diminuir o NA do Teste de Conjuração do Shugenja em 5 pontos.",
              },
            ],
          },
          {
            level: 2,
            levelLabel: "二",
            title: "A Calma em Meio ao Trovão",
            intro:
              "A harmonia entre as espadas torna-se instintiva, eliminando as distrações do combate.",
            effects: [
              {
                name: "Mestria Niten",
                text: "A penalidade para o ataque com a mão inábil é reduzida para -3 (substituindo o redutor de -5 do nível anterior).",
              },
            ],
          },
          {
            level: 3,
            levelLabel: "三",
            title: "Retaliação Furiosa",
            intro:
              "Um Mirumoto não hesita quando provocado. A fúria do Dragão é despertada por aqueles que ousam testar seu aço.",
            effects: [
              {
                name: "Efeito",
                text: "Você pode escolher um oponente que realizou ou tentou ataques contra você nesta rodada. No seu próximo turno, você recebe um bônus de +3k0 em todas as jogadas de ataque contra esse alvo.",
              },
            ],
          },
          {
            level: 4,
            levelLabel: "四",
            title: "Espírito das Duas Lâminas",
            intro:
              "As espadas agem como para-raios para o Vazio, permitindo que o bushi canalize energia espiritual com eficiência absoluta.",
            effects: [
              {
                name: "Requisito",
                text: "Deve estar empunhando Katana e Wakizashi simultaneamente.",
              },
              {
                name: "Ataque Potencializado",
                text: "Ao gastar 1 Ponto de Vazio para melhorar um ataque, você recebe +3k0 (em vez do bônus padrão).",
              },
              {
                name: "Resiliência do Vazio",
                text: "Ao gastar 1 Ponto de Vazio para reduzir o dano sofrido, você reduz 15 pontos de dano (em vez do valor padrão do sistema).",
              },
            ],
          },
        ],
        tags: ["Niten", "Duas Espadas", "Bushi"],
      },

      {
        id: "coruja",
        name: "Coruja",
        fullTitle: "Clã Hantei: Guardas da Imperatriz",
        glyph: "鷹",
        tagline: "A elite absoluta da segurança imperial, lealdade inabalável ao Trono.",
        description:
          "Os Seppun, conhecidos como os Miharu, são a elite absoluta da segurança imperial. Para um Miharu, a linhagem Hantei é o coração de Rokugan; protegê-la é garantir que o sol continue a brilhar. Eles sacrificam suas vidas e desejos pessoais em favor de uma vigilância eterna contra traições, invasões e corrupção, servindo diretamente como a guarda pessoal da Imperatriz.",
        bonuses: [
          { source: "Família Seppun", value: "+1 Vontade" },
          { source: "Bônus de Escola", value: "+1 Percepção" },
        ],
        school: {
          name: "Escola Bushi Hantei",
          skills: [
            "Batalha",
            "Defesa",
            "Etiqueta",
            "Iaijutsu",
            "Kenjutsu (Katana)",
            "Kyujutsu",
            "qualquer 1 Alta Perícia",
          ],
          equipment: [
            "Armadura Leve",
            "Roupas Grossas",
            "Daisho (Katana e Wakizashi)",
            "qualquer 1 arma adicional",
            "Kit de Viagens",
            "10 Kokus",
          ],
        },
        techniques: [
          {
            level: 1,
            levelLabel: "一",
            title: "Nunca na Escuridão",
            intro:
              "O Miharu é uma âncora de integridade, imune às manipulações daqueles que buscam ferir o Trono ou desonrar o nome da Imperatriz.",
            effects: [
              {
                name: "Incorruptível",
                text: "Sempre que realizar um teste para resistir a Perícias Sociais que buscam desviá-lo de seu dever (como Tentação, Intimidação ou Corte), você rola dados adicionais iguais ao seu Rank na Perícia usada: +1k0 por Rank.",
              },
              {
                name: "Sentinela",
                text: "Você recebe um bônus inato de +2k0 em todos os testes de Investigação para detectar emboscadas, armadilhas ou ataques surpresa.",
              },
            ],
          },
          {
            level: 2,
            levelLabel: "二",
            title: "O Partir das Nuvens",
            intro:
              "A pureza do propósito do Seppun manifesta-se em golpes certeiros e devastadores contra os inimigos da ordem cósmica e imperial.",
            effects: [
              {
                name: "Poder da Honra",
                text: "No início do seu turno, você pode gastar 1 Ponto de Vazio. Se o fizer, você passa a somar metade do seu Rank de Honra atual ao total de todas as suas jogadas de ataque e dano até o final da batalha.",
              },
            ],
          },
          {
            level: 3,
            levelLabel: "三",
            title: "Harmonia e Precisão",
            intro:
              "A técnica da lâmina da guarda imperial foca na submissão rápida do agressor. O Miharu encontra as brechas nas defesas adversárias através de uma ofensiva coordenada e cirúrgica.",
            effects: [
              {
                name: "Mecânica",
                text: "Para ativar esta técnica, você deve obrigatoriamente estar empunhando uma Katana e deve assumir a Postura de Ataque Total.",
              },
              {
                name: "Efeito",
                text: "Enquanto mantiver estas condições, a precisão milimétrica dos seus cortes permite que você ignore metade do valor de Redução de armaduras do seu oponente.",
              },
            ],
          },
          {
            level: 4,
            levelLabel: "四",
            title: "Julgamento da Alvorada",
            intro:
              "A fúria técnica de um guarda imperial quebra as defesas daqueles que ameaçam o Trono. O Miharu desfere uma sequência punitiva que anula qualquer tentativa de resguardo do traidor.",
            effects: [
              {
                name: "Mecânica",
                text: "Uma vez por combate, você pode desferir uma série de golpes punitivos executando um ataque corporal como uma Ação Complexa. Este ataque não causa dano — ele ignora completamente quaisquer bônus e efeitos de armadura do alvo.",
              },
              {
                name: "Efeito Consequente",
                text: "Se o golpe atingir, o alvo é completamente desestabilizado e não pode receber bônus de armadura ou de postura em seus testes de defesa ou ataque por um número de rodadas igual ao seu Rank de Honra.",
              },
            ],
          },
          {
            level: 5,
            levelLabel: "五",
            title: "A Luz do Sol Revela",
            intro:
              "No ápice do treinamento como Guarda da Imperatriz, nada escapa ao olhar divino do Miharu; nem mesmo as magias ou ilusões mais densas conseguem nublar sua visão e seu dever de proteção.",
            effects: [
              {
                name: "Visão Verdadeira",
                text: "Como uma Ação Livre, você pode gastar 1 Ponto de Vazio e realizar um teste de Investigação (Notar) / Percepção com NA 25. Você enxerga instantaneamente através de qualquer disfarce, camuflagem ou ilusão.",
              },
              {
                name: "Dever Imperial",
                text: "Se você estiver atuando na proteção direta da Imperatriz, do Imperador ou de Altos Oficiais Imperiais, o custo de 1 Ponto de Vazio desta técnica é anulado.",
              },
            ],
          },
        ],
        tags: ["Imperial", "Guarda", "Honra"],
      },

      {
        id: "escorpiao",
        name: "Escorpião",
        fullTitle: "Clã Escorpião: Linhagem Bayushi",
        glyph: "蠍",
        tagline: "Mestres do dever sujo, a lâmina nas sombras do Império.",
        description:
          "Os Bayushi são os mestres do dever sujo, a lâmina nas sombras que protege o Império de formas que a honra convencional não permite. Sua escola de Bushi foca em velocidade, pragmatismo e uma periculosidade que pune qualquer hesitação do adversário.",
        bonuses: [
          { source: "Família Bayushi", value: "+1 Agilidade" },
          { source: "Bônus de Escola", value: "+1 Inteligência" },
        ],
        school: {
          name: "Escola de Bushi Bayushi",
          skills: [
            "Corte (Manipulação)",
            "Defesa",
            "Etiqueta",
            "Iaijutsu",
            "Kenjutsu",
            "Sinceridade",
            "qualquer Perícia de escolha",
          ],
          equipment: [
            "Armadura Leve",
            "Roupas Grossas",
            "Daisho (Katana e Wakizashi)",
            "qualquer arma adicional",
            "Kit de Viagens",
            "5 kokus",
          ],
        },
        techniques: [
          {
            level: 1,
            levelLabel: "一",
            title: "O Caminho do Escorpião",
            intro:
              "Os guerreiros deste caminho atacam com astúcia e ritmo imprevisível, misturando lâminas curtas e golpes corporais no mesmo fluxo de combate.",
            effects: [
              {
                name: "Iniciativa",
                text: "Você recebe um bônus de +2k0 nas Jogadas de Iniciativa.",
              },
              {
                name: "Ataque Fluido",
                text: "Ao atacar com uma Kodachi ou Tanto na mão hábil, você pode realizar um segundo golpe desarmado com a mão inábil no mesmo turno.",
              },
              {
                name: "Mecânicas de Arma",
                text: "A Kodachi pode ser utilizada com a perícia Faca. O ataque desarmado extra não sofre penalidade por mão inábil e recebe um bônus de +1k0 no acerto.",
              },
            ],
          },
          {
            level: 2,
            levelLabel: "二",
            title: "Pinças e Cauda",
            intro:
              "A defesa do Escorpião é tão perigosa quanto seu ataque, utilizando a agilidade das lâminas curtas para transformar a guarda em uma armadilha.",
            effects: [
              {
                name: "Defesa",
                text: "Você adiciona o seu Rank na perícia Faca ao seu Teste de Defesa Contestada.",
              },
              {
                name: "Dano",
                text: "O bônus em seus ataques desarmados aumenta para +2k0.",
              },
            ],
          },
          {
            level: 3,
            levelLabel: "三",
            title: "O Bote Silencioso",
            intro:
              "O Bushi reage com o fluxo do combate, esquivando-se de golpes enquanto busca pontos vitais expostos.",
            effects: [
              {
                name: "Mobilidade",
                text: "Se você se mover ao menos 1,5m em seu turno, você ganha um bônus no Ataque e Dano igual à sua Força no ataque desarmado com a mão inábil.",
              },
              {
                name: "Tático",
                text: "Você ganha +2k0 exclusivo para realizar a Manobra Derrubar.",
              },
            ],
          },
          {
            level: 4,
            levelLabel: "四",
            title: "A Dança das Máscaras",
            intro:
              "Os bushi de elite são um borrão constante de movimento, usando ataques rápidos e implacáveis para romper as defesas mais sólidas.",
            effects: [
              {
                name: "Ambidestria Superior",
                text: "Ao lutar com uma Kodachi em cada mão, você sofre a penalidade de arma pequena em vez de arma média para o manejo.",
              },
              {
                name: "Letalidade",
                text: "Você ganha um bônus de +3k0 em todas as rolagens de dano realizadas com Kodachi ou Tanto.",
              },
            ],
          },
        ],
        tags: ["Sombras", "Kodachi", "Astúcia"],
      },

      {
        id: "lobo",
        name: "Lobo",
        fullTitle: "Clã do Lobo: Linhagem Kakita",
        glyph: "狼",
        tagline: "Duelistas solitários, a pureza do espírito antes da explosão.",
        description:
          "Os Ashidaka são os duelistas solitários do Império. Diferente de outros clãs, o Lobo foca na pureza do espírito e na quietude absoluta antes da explosão de violência. Seus bushi tratam a espada como uma prática meditativa e teológica, acreditando que no centro do caos existe um ponto de silêncio onde a vitória já foi decidida.",
        bonuses: [
          { source: "Família Kakita", value: "+1 Agilidade" },
          { source: "Bônus de Escola", value: "+1 Reflexos" },
        ],
        school: {
          name: "Escola de Bushi Kakita",
          skills: [
            "Etiqueta",
            "Iaijutsu (Foco)",
            "Kenjutsu",
            "Kyujutsu",
            "Meditação",
            "Conhecimento: Teologia",
            "Bushido",
            "Sinceridade",
          ],
          equipment: [
            "Armadura Leve",
            "Roupas Grossas",
            "Daisho",
            "Rosário",
            "qualquer arma adicional",
            "Kit de Viagens",
            "10 kokus",
          ],
        },
        techniques: [
          {
            level: 1,
            levelLabel: "一",
            title: "O Caminho do Lobo",
            intro:
              "O Lobo não apenas desembainha a espada; ele se torna o próprio corte antes mesmo do oponente piscar.",
            effects: [
              {
                name: "Reflexo do Predador",
                text: "Você soma o dobro do seu Rank de Iaijutsu a todas as suas jogadas de Iniciativa.",
              },
              {
                name: "Foco Interior",
                text: "Você ganha um bônus de +1k1 no total de todas as jogadas de ataque enquanto estiver na Postura de Centro.",
              },
            ],
          },
          {
            level: 2,
            levelLabel: "二",
            title: "Velocidade do Relâmpago",
            intro:
              "Para o Lobo, um inimigo lento já é um inimigo morto. A hesitação do adversário é o convite para o golpe final.",
            effects: [
              {
                name: "Superioridade",
                text: "Você ganha um bônus de +3k0 no total de todas as jogadas de ataque contra oponentes que possuam uma Iniciativa menor que a sua.",
              },
            ],
          },
          {
            level: 3,
            levelLabel: "三",
            title: "Extraindo o Vazio",
            intro:
              "O Lobo permanece inerte enquanto o caos ruge ao seu redor. Sua mente limpa permite que o corpo desvie de ataques sem esforço consciente.",
            effects: [
              {
                name: "Imobilidade Zen",
                text: "Se você estiver na Postura de Centro, você soma o seu Rank na perícia Meditação ao seu Teste de Defesa Contestada.",
              },
            ],
          },
          {
            level: 4,
            levelLabel: "四",
            title: "O Olhar do Lobo",
            intro:
              "Sua compreensão teológica e marcial permite que você ignore as distrações do mundo físico.",
            effects: [
              {
                name: "Vigilância Espiritual",
                text: "Você pode gastar um Ponto de Vazio para adicionar seu Rank de Teologia à sua Defesa contra ataques mágicos ou sobrenaturais por uma rodada.",
              },
            ],
          },
          {
            level: 5,
            levelLabel: "五",
            title: "Golpe Sem Pensamento",
            intro:
              "O aluno supremo do Lobo não precisa pensar para agir; ele se torna a própria manifestação do Vazio.",
            effects: [
              {
                name: "Fluxo Absoluto",
                text: "Você ganha os benefícios da Postura de Centro no mesmo turno em que a assume (em vez de no turno seguinte) e pode mantê-la por quantos turnos desejar.",
              },
              {
                name: "Ataque Instantâneo",
                text: "Você pode realizar um ataque como uma Ação Simples enquanto estiver na Postura de Centro.",
              },
              {
                name: "Transição Fluida",
                text: "Você pode realizar Ações de Movimento normalmente, ignorando as restrições padrão da Postura de Centro.",
              },
            ],
          },
        ],
        tags: ["Iaijutsu", "Meditação", "Duelista"],
      },

      {
        id: "serpente",
        name: "Serpente",
        fullTitle: "Clã da Serpente: Linhagem Chuda",
        glyph: "蛇",
        tagline: "Pacientes, difíceis de encurralar e letais quando decidem dar o bote.",
        description:
          "O Clã da Serpente foi breve e envolto em mistérios, mas seu legado marcial sobrevive através dos Lutadores com Correntes. Criada por Chuda Masaki, esta escola ignora a etiqueta da katana em favor da versatilidade da Kusarigama e do Manrikikusari. Seus praticantes são como serpentes: pacientes, difíceis de encurralar e letais quando decidem dar o bote.",
        bonuses: [
          { source: "Família Chuda", value: "+1 Inteligência" },
          { source: "Bônus de Escola", value: "+1 Reflexos" },
        ],
        school: {
          name: "Escola de Lutadores com Correntes Chuda",
          skills: [
            "Atletismo",
            "Armas com Corrente (Espiral da Serpente)",
            "Defesa",
            "Caça",
            "Kenjutsu",
            "Meditação",
            "qualquer Perícia de escolha",
          ],
          equipment: [
            "Katana",
            "Wakizashi",
            "Espiral da Serpente (Corrente longa)",
            "Armadura Ashigaru",
            "Roupas de Viagem",
            "2 Koku",
          ],
        },
        techniques: [
          {
            level: 1,
            levelLabel: "一",
            title: "Caminho da Serpente",
            intro:
              "A vitória não vem da força bruta, mas de observar a falha no ritmo do inimigo.",
            effects: [
              {
                name: "Mente Estratégica",
                text: "Em rolagens de Batalha durante guerras, adicione o dobro da sua Inteligência ao resultado.",
              },
              {
                name: "Guarda Circular",
                text: "Enquanto empunhar uma Arma com Corrente, você não pode ser flanqueado. Além disso, ganha um bônus de +2k0 em todas as rolagens com uma Kusarigama.",
              },
            ],
          },
          {
            level: 2,
            levelLabel: "二",
            title: "Espirais Esmagadoras da Píton",
            intro:
              "O Chuda utiliza sua corrente como uma extensão do corpo, tanto para mobilidade quanto para manter a distância.",
            effects: [
              {
                name: "Utilidade",
                text: "Recebe +1k1 em testes de Esportes (Atletismo) ao usar a corrente para escalar.",
              },
              {
                name: "Alcance",
                text: "Você pode atacar alvos a até 4,5 metros (15 pés) de distância com sua corrente.",
              },
              {
                name: "Fluidez",
                text: "Adicione o seu Anel de Água à sua Defesa Contestada.",
              },
            ],
          },
          {
            level: 3,
            levelLabel: "三",
            title: "Golpe Afiado da Víbora",
            intro:
              "O lutador aprende a imobilidade absoluta, tornando-se invisível até o momento do ataque.",
            effects: [
              {
                name: "Bote Oculto",
                text: "Enquanto estiver perfeitamente imóvel (sem mover-se ou falar), você ganha +Xk0 em rolagens de Furtividade, onde X é o seu Rank de Habilidades (Perícias de Escola).",
              },
              {
                name: "Escamas de Ferro",
                text: "Adicione o dobro do seu Anel de Água à sua Defesa Contestada quando empunhar uma Arma com Corrente (substitui o bônus do Rank 2).",
              },
            ],
          },
          {
            level: 4,
            levelLabel: "四",
            title: "Método de Dannoshin",
            intro:
              "A corrente se torna uma ferramenta de controle absoluto, capaz de neutralizar oponentes antes mesmo que eles se aproximem.",
            effects: [
              {
                name: "Especialista em Controle",
                text: "Ganha um bônus de +3k1 em ataques para as manobras Derrubar ou Desarmar.",
              },
              {
                name: "Enredar",
                text: "Você pode declarar 3 Incrementos (Raises) em um ataque para aplicar a condição Enredado a um alvo a até 4,5m. A condição dura até você liberar (Ação Livre) ou o alvo vencer um teste de Força Resistida contra você (Ação Simples).",
              },
            ],
          },
          {
            level: 5,
            levelLabel: "五",
            title: "Poder de 10.000",
            intro:
              "A técnica suprema ensina a usar a força do inimigo contra ele mesmo, transformando oponentes em escudos humanos.",
            effects: [
              {
                name: "Escudo de Carne",
                text: "Uma vez por rodada, quando for atacado por um inimigo, você pode tentar puxar um alvo que já esteja Enredado por você para a linha de fogo.",
              },
              {
                name: "Mecânica",
                text: "Realize um teste de Força Bruta contestado contra o alvo enredado. Você ganha um bônus de +Anel de Terra neste teste. Se vencer, o ataque inimigo atinge automaticamente o seu alvo enredado.",
              },
            ],
          },
        ],
        tags: ["Kusarigama", "Corrente", "Emboscada"],
      },

      {
        id: "tigre",
        name: "Tigre",
        fullTitle: "Clã do Tigre: Linhagem Yotsu",
        glyph: "虎",
        tagline: "Guardiões das ruínas, ferocidade de um predador nas sombras.",
        description:
          "Os Yotsu são os guardiões das ruínas e os protetores do povo comum. Sua técnica de combate foi forjada em ambientes urbanos e escombros, resultando em um estilo que une a furtividade da emboscada com a ferocidade de um tigre saltando sobre sua presa.",
        bonuses: [
          { source: "Família Yotsu", value: "+1 Inteligência" },
          { source: "Bônus de Escola", value: "+1 Agilidade" },
        ],
        school: {
          name: "Escola de Bushi Yotsu",
          skills: [
            "Comércio",
            "Caça",
            "Kenjutsu",
            "Kyujutsu",
            "Conhecimento (Gaijin ou Terras Sombrias)",
            "Furtividade (Esconder-se)",
            "qualquer Perícia Baixa ou de Bugei",
          ],
          equipment: [
            "Daisho",
            "Armadura Leve ou Ashigaru",
            "duas armas adicionais",
            "Roupas Resistentes",
            "Mochila de Viagem",
            "4 Koku",
          ],
        },
        techniques: [
          {
            level: 1,
            levelLabel: "一",
            title: "O Passo do Tigre",
            intro:
              "Os Yotsu perseguem seus inimigos com a mistura de silêncio e velocidade de um predador.",
            effects: [
              {
                name: "Mestre Urbano",
                text: "Ganha +2k0 em testes de Furtividade, em Caça nos ambientes urbanos ou ruínas, e soma seu Rank de Furtividade à sua Defesa Contestada.",
              },
              {
                name: "Retribuição",
                text: "Se você atacar um oponente que te feriu nesta rodada, recebe +2k0 no ataque contra ele.",
              },
            ],
          },
          {
            level: 2,
            levelLabel: "二",
            title: "O Salto do Tigre",
            intro:
              "O primeiro bote do tigre é tão feroz que o oponente raramente tem a chance de reagir.",
            effects: [
              {
                name: "Iniciativa",
                text: "Na primeira rodada de combate, adicione seu Rank de Atletismo ao total da sua rolagem de Iniciativa.",
              },
              {
                name: "Explosão",
                text: "Na primeira rodada, você pode declarar qualquer Manobra de Combate ganhando +2k0.",
              },
            ],
          },
          {
            level: 3,
            levelLabel: "三",
            title: "Forje Seu Próprio Destino",
            intro:
              "O Tigre não se rende ao desígnio das lâminas inimigas. Ao canalizar o seu foco espiritual no momento exato do impacto, você consegue mitigar traumas fatais.",
            effects: [
              {
                name: "Mecânica",
                text: "Sempre que você sofrer um ataque bem-sucedido e receber Ferimentos, você pode declarar o uso desta técnica gastando 1 Ponto de Vazio.",
              },
              {
                name: "Efeito",
                text: "Ao fazê-lo, você força o oponente a anular e descartar os dois maiores dados da rolagem de Teste de Dano dele (respeitando o limite mínimo de 1k1).",
              },
            ],
          },
          {
            level: 4,
            levelLabel: "四",
            title: "As Presas do Tigre",
            intro:
              "O estilo do tigre é adaptável, permitindo que o samurai direcione toda a sua força vital para estraçalhar a resistência do oponente.",
            effects: [
              {
                name: "Efeito",
                text: "Um número de vezes por dia igual ao seu Nível de Intuição, você pode explodir um dado rolado em uma jogada de dano, apenas um.",
              },
            ],
          },
        ],
        tags: ["Furtividade", "Urbano", "Predador"],
      },

      {
        id: "javali",
        name: "Javali",
        fullTitle: "Clã do Javali: Linhagem Heichi",
        glyph: "猪",
        tagline: "Forjados nas Montanhas do Crepúsculo, vontade inabalável.",
        description:
          "Os Heichi são um povo duro e audaz, forjados nas perigosas Montanhas do Crepúsculo. Eles são conhecidos por sua vontade inabalável e por um estilo de luta que ignora a dor, avançando contra o inimigo como um javali enfurecido que recusa cair, não importa quantos ferimentos receba.",
        bonuses: [
          { source: "Família Heichi", value: "+1 Reflexo" },
          { source: "Bônus de Escola", value: "+1 Força" },
        ],
        school: {
          name: "Escola de Bushi Heichi",
          skills: [
            "Esportes",
            "Defesa",
            "Caça",
            "Intimidação",
            "Kenjutsu",
            "Lança (Mai Chong)",
            "qualquer Perícia de Bugei",
          ],
          equipment: [
            "Armadura (Leve ou Pesada)",
            "Roupas Grossas",
            "Daisho",
            "qualquer Lança",
            "Kit de Viagens",
            "3 kokus",
          ],
        },
        techniques: [
          {
            level: 1,
            levelLabel: "一",
            title: "A Investida do Javali",
            intro:
              "O ataque do Javali é súbito e devastador, aproveitando o momento para sobrecarregar o oponente.",
            effects: [
              {
                name: "Prontidão",
                text: "Na Postura de Ataque Total, você pode preparar uma arma média ou lança como uma Ação Livre.",
              },
              {
                name: "Iniciativa",
                text: "Você recebe um bônus de +5 no seu Rank de Iniciativa.",
              },
              {
                name: "Poder da Lança",
                text: "Ao empunhar uma lança, você ganha +0k1 em todas as rolagens de dano.",
              },
            ],
          },
          {
            level: 2,
            levelLabel: "二",
            title: "O Impulso do Javali",
            intro:
              "O Heichi domina o tempo do combate, garantindo que sua lança atinja o alvo antes que o inimigo consiga fechar a distância.",
            effects: [
              {
                name: "Poder da Lança",
                text: "Ao empunhar uma lança, você ganha +2k0 em todas as rolagens de Ataque.",
              },
              {
                name: "Iniciativa",
                text: "Seu bônus de Iniciativa aumenta para +7.",
              },
              {
                name: "Derrubada",
                text: "Você ganha 2k0 exclusivo para realizar a manobra Derrubar.",
              },
            ],
          },
          {
            level: 3,
            levelLabel: "三",
            title: "A Fúria do Javali",
            intro:
              "Assim como o animal que lhes dá nome, os bushi Heichi continuam lutando e se protegendo mesmo quando o corpo deveria ceder.",
            effects: [
              {
                name: "Resistência à Dor",
                text: "Reduz sua penalidade de Ferimentos em um valor igual ao seu Anel de terra.",
              },
              {
                name: "Postura Adaptativa",
                text: "Você pode mudar sua postura para Defesa Total além da defesa agora.",
              },
              {
                name: "Poder da Lança",
                text: "Ao empunhar uma lança, você ganha +3k0 em todas as rolagens de Ataque.",
              },
            ],
          },
          {
            level: 4,
            levelLabel: "四",
            title: "Além das Montanhas",
            intro:
              "O Javali aprende a liberar sua fúria de forma técnica, golpeando de trás de uma guarda impenetrável.",
            effects: [
              {
                name: "Contra-ataque Blindado",
                text: "Mesmo na Postura de Defesa Total, você pode realizar um ataque normal com uma lança ou arma Samurai como uma Ação Livre.",
              },
              {
                name: "Poder da Lança",
                text: "Ao empunhar uma lança, você ganha +3k0 em todas as rolagens de dano.",
              },
            ],
          },
        ],
        tags: ["Lança", "Resistência", "Montanha"],
      },

      {
        id: "urso",
        name: "Urso",
        fullTitle: "Clã do Urso: Família Daikuma",
        glyph: "熊",
        tagline: "Assassinos brutais, ferocidade selvagem e eficiência sanguinária.",
        description:
          "Quando o lendário guerreiro Daikuma reuniu seus primeiros seguidores, ficou claro que os samurais do Urso não eram apenas montanheses rústicos, mas assassinos brutais e desprovidos de piedade. Eles adquiriram rapidamente uma reputação de ferocidade selvagem, agindo com uma eficiência sanguinária que silencia qualquer crítico.",
        bonuses: [
          { source: "Família Daikuma", value: "+1 Força" },
          { source: "Bônus de Escola", value: "+1 Agilidade" },
        ],
        school: {
          name: "Escola Bushi Daikuma",
          skills: [
            "Arma Pesada",
            "Defesa",
            "Iaijutsu",
            "Jiujutsu",
            "Kenjutsu",
            "Intimidação",
            "qualquer uma Perícia",
          ],
          equipment: [
            "Armadura Leve",
            "Katana",
            "Wakizashi",
            "No-Dachi",
            "qualquer uma arma",
            "Roupas Robustas",
            "Mochila de Viagem",
            "5 koku",
          ],
        },
        techniques: [
          {
            level: 1,
            levelLabel: "一",
            title: "As Garras do Urso",
            intro:
              "Para os Daikuma, um oponente ferido é apenas uma presa que ainda não morreu. Suas mãos não buscam apenas golpear, mas dilacerar a carne com a precisão brutal de um predador de topo.",
            effects: [
              {
                name: "Efeito",
                text: "Adicione a sua Força a todas as rolagens de dano. Além disso, você recebe +5 de Iniciativa e +2k0 em todas as rolagens de dano.",
              },
            ],
          },
          {
            level: 2,
            levelLabel: "二",
            title: "Cheiro de Sangue",
            intro:
              "O olfato do Urso é sua bússola de guerra. Uma vez que o metal atinge a carne e o odor ferroso do sangue sobe ao ar, o Daikuma entra em um estado de foco assassino.",
            effects: [
              {
                name: "Efeito",
                text: "Sempre que infligir ao menos 5 Ferimentos a um oponente, você ganha +3k0 em todas as rolagens de ataque contra ele na rodada seguinte.",
              },
            ],
          },
          {
            level: 3,
            levelLabel: "三",
            title: "Transcender a Montanha",
            intro:
              "Assim como a montanha não se move perante a tempestade, o Daikuma não permite que obstáculos físicos ou a fadiga o impeçam de avançar.",
            effects: [
              {
                name: "Efeito",
                text: "Você pode refazer qualquer Teste de Atributo ou Perícia que utilize Força, sendo obrigado a manter o segundo resultado.",
              },
              {
                name: "Movimentação",
                text: "Você ignora penalidades de movimento e combate em Terreno Moderado e sofre apenas metade da penalidade em Terreno Difícil.",
              },
            ],
          },
          {
            level: 4,
            levelLabel: "四",
            title: "A Fúria do Esmagador",
            intro:
              "O Daikuma abandona a técnica em favor do peso absoluto. Ele se lança contra o inimigo como uma avalanche de músculos e fúria.",
            effects: [
              {
                name: "Efeito",
                text: "Ao adotar a Postura de Ataque Total, você pode gastar um Ponto de Vazio para entrar em Fúria:",
                subEffects: [
                  {
                    name: "Bônus",
                    text: "O bônus de Ataque Total dobra para +4k2.",
                  },
                  {
                    name: "Iniciativa",
                    text: "Sua Iniciativa aumenta em +5.",
                  },
                  {
                    name: "Resistência",
                    text: "Você não sofre Penalidades de Ferimento enquanto durar a Fúria.",
                  },
                  {
                    name: "Custo",
                    text: "Sua defesa é severamente comprometida: a penalidade de Defesa dobra, reduzindo-a em -2k2.",
                  },
                ],
              },
            ],
          },
        ],
        tags: ["Força Bruta", "No-Dachi", "Fúria"],
      },

      {
        id: "vagalume",
        name: "Vaga-lume",
        fullTitle: "Clã do Vaga-lume: Linhagem Hotaru",
        glyph: "蛍",
        tagline: "Observação e adaptação, ataque apenas no momento de fraqueza absoluta.",
        description:
          "O Clã Hotaru é pequeno e vigilante, especializado em patrulhar costas e servir como magistrados de elite. Diferente de escolas agressivas, os Hotaru prezam pela observação e adaptação, estudando o ritmo do adversário para atacar apenas no momento de fraqueza absoluta.",
        bonuses: [
          { source: "Família Hotaru", value: "+1 Percepção" },
          { source: "Bônus de Escola", value: "+1 Inteligência" },
        ],
        school: {
          name: "Escola de Bushi Hotaru",
          skills: [
            "Defesa",
            "Montaria",
            "Caça (Rastreamento)",
            "Investigação (Notar)",
            "Kenjutsu",
            "Kyujutsu",
            "qualquer Perícia Alta ou de Bugei",
          ],
          equipment: [
            "Armadura Leve",
            "Daisho",
            "qualquer arma adicional",
            "Pônei Rokugani",
            "Roupas Resistentes",
            "Mochila de Viagem",
            "2 koku",
          ],
        },
        techniques: [
          {
            level: 1,
            levelLabel: "一",
            title: "A Luz do Vaga-lume",
            intro:
              "O samurai estuda os movimentos do inimigo para antecipar seus golpes.",
            effects: [
              {
                name: "Bônus",
                text: "Adicione seu Rank de Investigação ao seu teste de Defesa Contestada contra qualquer oponente.",
              },
              {
                name: "Reflexo",
                text: "Adicione sempre o dobro do seu Atributo de Intuição ao seu Ataque Contestada enquanto estiver em Defesa.",
              },
            ],
          },
          {
            level: 2,
            levelLabel: "二",
            title: "Vaga-lume em Voo",
            intro:
              "A percepção do samurai se torna sua melhor defesa, permitindo movimentos evasivos impossíveis de prever.",
            effects: [
              {
                name: "Efeito",
                text: "Ao declarar Postura Defesa, você pode somar Investigação ao seu teste de Ataque nessa postura.",
              },
              {
                name: "Bônus",
                text: "Adicione sempre o dobro do seu Atributo de Intuição à sua Defesa Contestada enquanto estiver em Defesa.",
              },
            ],
          },
          {
            level: 3,
            levelLabel: "三",
            title: "Preparado para a Noite",
            intro:
              "A mente do Vaga-lume é um arquivo de soluções táticas, garantindo que ele nunca falhe em seus deveres.",
            effects: [
              {
                name: "Efeito",
                text: "Você ganha um número de Pontos de vazio por dia igual ao seu Rank de Intuição que concedem 3k0.",
              },
              {
                name: "Uso",
                text: "Podem ser usados em qualquer teste de Perícia não marcial. Os incrementos são restaurados ao amanhecer.",
              },
            ],
          },
          {
            level: 4,
            levelLabel: "四",
            title: "Ataque do Crepúsculo",
            intro:
              "A técnica suprema do Clã: atrair o inimigo para uma falsa sensação de segurança e punir o erro instantaneamente.",
            effects: [
              {
                name: "Efeito",
                text: "Você agora pode assumir a postura Defesa Total. Enquanto estiver em Defesa Total, se um oponente errar um ataque contra você, você pode imediatamente mudar sua postura para Ataque ou Ataque Total como uma reação, podendo realizar um ataque corpo a corpo imediato contra esse oponente.",
              },
            ],
          },
        ],
        tags: ["Investigação", "Defesa", "Adaptação"],
      },
    ],
  },

  sacerdotes: {
    label: "Sacerdotes",
    seal: "神主",
    listLabel: "Conselhos",
    items: [
      {
        id: "celeste",
        name: "Celeste",
        fullTitle: "Onmyōji — Os Leitores das Constelações",
        glyph: "陰陽",
        tagline:
          "Estudiosos do Onmyōdō, o poder flui das Fortunas e dos padrões celestes.",
        description:
          "Os Onmyōji são estudiosos do Onmyōdō, a arte sagrada que interpreta os movimentos das constelações e a influência das Fortunas sobre o mundo mortal. Para eles, o céu noturno é um reflexo de Tengoku, onde cada estrela revela fragmentos do destino, da sorte e da vontade divina. Diferente dos Shugenja, os Onmyōji não negociam com os kamis elementais. Seu poder flui das Fortunas, dos Reinos Espirituais, dos ancestrais e dos padrões celestes. Através de cálculos astrológicos, símbolos sagrados e caligrafia ritualística, eles traçam conexões entre o mundo mortal e as forças invisíveis que governam o destino.",
        upkeep: {
          text: "As constelações estão em constante movimento, refletindo as mudanças das Fortunas em Tengoku. Uma vez por semana, o Onmyōji deve dedicar um período ao estudo dos céus e realizar um teste de Conhecimento (Astrologia) / Inteligência para manter seus Talismãs alinhados com os padrões celestes. Caso falhe ou negligencie esse estudo, seus Talismãs perdem a sintonia espiritual e deixam de funcionar até que um novo alinhamento seja realizado.",
        },
        resource: {
          name: "Talismãs Celestes",
          description:
            "Os Talismãs são diagramas astrológicos cobertos por runas e selos sagrados que servem como catalisadores do poder das Fortunas. Eles não armazenam magia; são pontes entre o mundo material e as influências celestes.",
          progression: [
            { level: 1, cost: "15 XP" },
            { level: 2, cost: "20 XP" },
            { level: 3, cost: "25 XP" },
            { level: 4, cost: "30 XP" },
            { level: 5, cost: "35 XP" },
          ],
          methods: [
            {
              type: "Ação Simples",
              name: "Conjuração Rápida",
              text: "Gasta um espaço de feitiço. O Onmyōji usa sua própria energia espiritual para estabelecer instantaneamente a conexão com a Fortuna através do Talismã.",
            },
            {
              type: "Ação Complexa",
              name: "Conjuração Ritual",
              text: "Exige um teste de Caligrafia / Inteligência. Em vez de gastar energia espiritual, o Onmyōji reescreve e reforça os símbolos do Talismã, canalizando diretamente as Palavras de Poder para a inscrição.",
            },
          ],
        },
        difficulty: {
          formula: "NA = (5 × Nível Do Feitiço) + 10",
          table: [
            { level: 1, na: 15 },
            { level: 2, na: 20 },
            { level: 3, na: 25 },
            { level: 4, na: 30 },
            { level: 5, na: 35 },
          ],
        },
        techniques: [
          {
            level: 1,
            levelLabel: "Base",
            title: "Sabedoria dos Céus",
            intro:
              "Os Onmyōji são treinados para reconhecer os padrões ocultos do destino nos movimentos das estrelas. Através da contemplação dos Céus Celestiais, eles aprendem que toda criatura possui um lugar na grande tapeçaria das Fortunas.",
            effects: [
              {
                name: "Ritual Astrológico",
                text: "Uma vez por mês, você pode realizar um ritual astrológico para esclarecer o destino de um indivíduo e conceder a ele uma Vantagem Espiritual ou uma Desvantagem Espiritual.",
              },
              {
                name: "Restrições",
                text: "Este é um efeito ritualístico e não pode ser utilizado durante uma escaramuça. O efeito dura por um mês, ou até que você utilize esta Técnica em outra pessoa. Caso deseje impor uma Desvantagem Espiritual, deve obter sucesso em uma Rolagem de Vazio Contestada contra o alvo.",
              },
            ],
          },
          {
            level: 2,
            levelLabel: "一",
            title: "Criar Shikigami Celestial",
            intro:
              "Os Onmyōji aprendem cedo a dar forma física aos símbolos e nomes escritos em seus talismãs. Através do Onmyōdō, eles criam pequenos servos espirituais conhecidos como Shikigami, entidades vinculadas às Fortunas e às constelações que servem como mensageiros, espiões e auxiliares ritualísticos.",
            effects: [
              {
                name: "Ativação",
                text: "Como uma atividade de tempo livre, utilizando papel consagrado, madeira, tecido ou outro recipiente de tamanho reduzido, você realiza um teste de Caligrafia / Inteligência. Em caso de sucesso, você cria um Shikigami Celestial e pode selar nele um número de Talismãs conhecidos igual ao resultado obtido no teste referente ao Nível Do Feitiço.",
              },
              {
                name: "Restrições",
                text: "Enquanto os Talismãs permanecerem selados, você não pode utilizá-los pessoalmente, mas o Shikigami pode ativá-los em seu lugar. Você pode possuir apenas um Shikigami Celestial ativo por vez. O Shikigami possui inteligência limitada, compreende seus comandos, pode transmitir mensagens, memorizar informações e executar tarefas simples. Caso seu corpo seja destruído, sua essência espiritual retorna ao Onmyōji e pode ser invocada novamente através de um novo ritual.",
              },
            ],
            subAbilities: [
              {
                name: "Talismã Vivo",
                text: "Uma vez por cena, o Shikigami pode ativar um dos Talismãs selados nele sem realizar um teste de invocação, sendo considerado como tendo obtido sucesso automático.",
              },
              {
                name: "Forma Celestial",
                text: "A aparência do Shikigami reflete a constelação, Fortuna ou natureza espiritual utilizada em sua criação.",
                categories: [
                  {
                    name: "Fortunas da Sorte",
                    examples: "raposas, grous e carpas",
                  },
                  {
                    name: "Fortunas da Guerra",
                    examples: "falcões, tigres e lobos",
                  },
                  {
                    name: "Fortunas do Conhecimento",
                    examples: "corujas, serpentes e mariposas",
                  },
                  {
                    name: "Constelações Celestiais",
                    examples:
                      "dragões de papel, borboletas estelares e figuras humanoides feitas de selos e pergaminhos",
                  },
                ],
              },
            ],
          },
        ],
        domains: [
          {
            name: "Domínio 1",
            sealLabel: "一",
            constellations: [
              {
                name: "Constelação da Sabedoria",
                summary: "+1 Nível em uma Perícia na qual seja imperito",
                fields: {
                  Efeito:
                    "o usuário recebe +1 Nível em uma Perícia na qual seja imperito. A Perícia é escolhida no momento da invocação.",
                },
              },
              {
                name: "Constelação do Construtor",
                summary:
                  "+1k1 em uma Perícia de Criação específica por 1 hora/dia",
                fields: {
                  Efeito:
                    "concede por 1 hora por dia, o alvo +1k1 em uma Perícia de Criação específica. A Perícia deve ser escolhida quando a constelação é aprendida/criada.",
                },
              },
              {
                name: "Constelação da Fortuna Serena",
                summary: "+2k1 em uma rolagem, 1 vez a cada 24h",
                fields: {
                  Efeito:
                    "o usuário pode melhorar uma rolagem; ele recebe +2k1. Só pode ser usada uma vez a cada 24h.",
                },
              },
              {
                name: "Constelação da Mãe Estelar",
                summary:
                  "Recupera Ferimentos como se Vigor fosse 1 nível maior",
                fields: {
                  Condição:
                    "deve ser mantida por 1 dia inteiro e empunhada/invocada por pelo menos 1 hora nesse período a cada hora.",
                  Efeito:
                    "o usuário recupera Ferimentos como se seu Vigor fosse 1 Nível maior. Isso não altera o valor real de Vigor.",
                  Incrementos:
                    "a cada 1 Incremento, aumenta em +1 o Nível efetivo de Vigor para recuperação.",
                },
              },
              {
                name: "Constelação das Águas Profundas",
                summary: "+3k0 em Esportes (Nadar), +Ênfase em Nadar",
                fields: {
                  Efeito:
                    "o usuário pode nadar normalmente (exceto condições extremas), é considerado como tendo +3k0 Níveis em Esportes (para nadar) e ganha Ênfase em Nadar, mesmo que não possua.",
                },
              },
              {
                name: "Constelação do Pai Vigilante",
                summary:
                  "Indica direção de uma criatura voluntária, 1 vez/hora por 24h",
                fields: {
                  Efeito:
                    "a constelação é sintonizada a uma criatura voluntária específica. Uma vez por hora durante 24h, o usuário pode fazê-la indicar a direção exata dessa criatura.",
                  Limite: "alcance máximo de 15 km.",
                  Incrementos:
                    "cada Incremento adiciona +15 km ao alcance.",
                },
              },
            ],
          },
          {
            name: "Domínio 2",
            sealLabel: "二",
            constellations: [
              {
                name: "Constelação do Guerreiro Celeste",
                summary:
                  "+1k1 em Perícias com Armas ou Jiujutsu",
                fields: {
                  Efeito:
                    "Concede +1k1 em todas as rolagens de Perícias com Armas ou Jiujutsu na próxima jogada. A Perícia específica deve ser escolhida na criação da constelação.",
                },
              },
              {
                name: "Constelação do Antídoto Celeste",
                summary:
                  "Remove efeitos de venenos, 1 vez/semana",
                fields: {
                  Efeito:
                    "1 vez por semana, o usuário pode remover os efeitos de um único veneno de um alvo.",
                  Limitação:
                    "Venenos magicamente criados podem ser curados através de testes contestados contra a NA de criação do feitiço.",
                },
              },
              {
                name: "Constelação dos Amantes",
                summary:
                  "Cura até 10 Ferimentos de outro alvo, 1 vez/dia",
                fields: {
                  Efeito:
                    "o usuário pode, pelo toque, curar até 10 Ferimentos de outro alvo. Uso: 1 vez por dia.",
                  Custo:
                    "o usuário sofre a mesma quantidade de Ferimentos curados. Esses Ferimentos não podem ser curados por magia, apenas naturalmente.",
                },
              },
              {
                name: "Constelação do Companheiro",
                summary:
                  "+1k1 em testes sociais por 24h",
                fields: {
                  Efeito:
                    "o usuário recebe +1k1 em todos os testes sociais. Funciona com qualquer tipo de interação, incluindo criaturas não humanas, por 24h.",
                },
              },
              {
                name: "Constelação da Abundância",
                summary:
                  "Ignora penalidades de fome por 1 dia",
                fields: {
                  "NA de Invocação": "20",
                  Ativação:
                    "o usuário deve manter a constelação por 1 hora.",
                  Efeito:
                    "o usuário ignora todas as penalidades de fome por 1 dia inteiro.",
                  Limite:
                    "pode ser usada uma vez por dia. Funciona por até 7 dias consecutivos, após isso deixa de funcionar.",
                },
              },
              {
                name: "Constelação do Lar Gêmeo",
                summary:
                  "Vínculo entre duas constelações sintonizadas, indica direção",
                fields: {
                  Efeito:
                    "a invocação gera duas marcas/constelações sintonizadas entre si. Cada portador pode, uma vez por hora, fazer a constelação indicar a direção exata da outra.",
                  Alcance: "80 km a cada 2 Incrementos.",
                },
              },
              {
                name: "Constelação do Caçador",
                summary: "+1k1 em testes de Caça (olfato)",
                fields: {
                  Efeito:
                    "o usuário recebe +1k1 em testes de Caça, apenas quando o olfato for relevante.",
                },
              },
              {
                name: "Constelação dos Espíritos",
                summary:
                  "Perceber, entender e ser entendido por espíritos por 1h/dia",
                fields: {
                  Efeito:
                    "por 1 hora por dia, o usuário pode perceber espíritos e fantasmas, entendê-los e ser entendido por eles.",
                  Forma: "Necessário um Ritual.",
                },
              },
            ],
          },
          {
            name: "Domínio 3",
            sealLabel: "三",
            constellations: [
              {
                name: "Constelação da Armadura Celeste",
                summary:
                  "+1k1 Defesa + Redução 5 (sem armadura) ou ignora penalidades",
                fields: {
                  Efeito:
                    "se o usuário não estiver usando armadura: seu Teste de defesa aumenta em +1k1 e recebe Redução 5. Se já estiver usando armadura: pode ignorar todas as penalidades de Perícia causadas por ela.",
                  Duração: "Dura o vazio em turnos.",
                },
              },
              {
                name: "Constelação do Coletor Sombrio",
                summary: "+1k1 Furtividade + Mãos Rápidas",
                fields: {
                  Efeito:
                    "o usuário recebe +1k1 em testes de Furtividade e +1k1 em testes de Mãos Rápidas.",
                  Duração: "Dura o vazio em turnos.",
                },
              },
              {
                name: "Constelação do Corredor dos Ventos",
                summary:
                  "Anel de Água +2 níveis para movimento",
                fields: {
                  Efeito:
                    "o usuário se move como se seu Anel de Água fosse +2 Níveis maior. Este bônus se acumula com habilidades naturais equivalentes.",
                  Incrementos:
                    "a cada 2 Incrementos, aumenta em +1 Nível adicional no Anel de Água efetivo.",
                  Duração: "Dura anel de água em turnos.",
                },
              },
              {
                name: "Constelação da Vida Persistente",
                summary:
                  "Ignorar até 5×Terra em Ferimentos ou penalidades por 1h",
                fields: {
                  Uso: "1 vez por dia.",
                  Efeitos:
                    "escolher um ao ativar: ignorar até 5 × Terra em Ferimentos 1 vez por dia, ou ignorar todas as penalidades de Ferimentos (exceto morte) por 1 hora.",
                  Restrição:
                    "Não pode ser usado no mesmo alvo no período de 24h.",
                },
              },
            ],
          },
          {
            name: "Domínio 4",
            sealLabel: "四",
            constellations: [
              {
                name: "Constelação da Fúria Celeste",
                summary: "+1k1 nas jogadas de dano",
                fields: {
                  Efeito:
                    "o usuário recebe +1k1 nas jogadas de dano.",
                  Aplicação:
                    "vale para uma arma específica ou ataques desarmados. A escolha é feita quando a constelação é criada.",
                  Duração: "Dura anel de Água em turnos.",
                },
              },
              {
                name: "Constelação do Mercador Astuto",
                summary:
                  "Saber se a última afirmação foi mentira, 1 vez/dia",
                fields: {
                  Efeito:
                    "1 vez por dia, o usuário pode saber se a última coisa que ouviu foi uma mentira.",
                },
              },
              {
                name: "Constelação do Demônio Quebrado",
                summary:
                  "Pode ferir criaturas Invulneráveis com qualquer arma",
                fields: {
                  Efeito:
                    "O usuário pode ferir criaturas Invulneráveis com qualquer arma. Não reduz a redução de dano do monstro.",
                  Duração: "Dura o vazio em turnos.",
                  Uso: "1 vez por dia por alvo.",
                },
              },
              {
                name: "Constelação da Luz Eterna",
                summary:
                  "Ver claramente ignorando escuridão, névoa, fumaça",
                fields: {
                  Efeito:
                    "o usuário pode ver claramente, ignorando cegueira, escuridão, névoa, fumaça e qualquer penalidade de visibilidade.",
                  Duração: "1 hora.",
                  Uso: "1 vez por dia.",
                },
              },
              {
                name: "Constelação do Sonho Vigilante",
                summary:
                  "Entrar no Reino Espiritual consciente, 1 vez/semana",
                fields: {
                  Efeito:
                    "1 vez por semana, ao dormir, o usuário pode entrar no Reino Espiritual e permanecer consciente e no controle de suas ações.",
                },
              },
            ],
          },
          {
            name: "Domínio 5",
            sealLabel: "五",
            constellations: [
              {
                name: "Constelação do Amanhã",
                summary: "Concede Grande Destino ao alvo",
                fields: {
                  "NA de Invocação": "25",
                  Condição:
                    "a constelação deve ser sintonizada a um indivíduo específico no momento da criação. Não funciona para mais ninguém.",
                  Efeito:
                    "o alvo recebe os efeitos da Vantagem Grande Destino. Não precisa manter a constelação ativa constantemente para que funcione.",
                  Duração: "enquanto a constelação permanecer intacta.",
                  Limitações:
                    "quando a constelação salva a vida do alvo, ela se dissipa (quebra). Se for desfeita prematuramente, o alvo morre imediatamente.",
                  Restrição:
                    "o invocador pode ter apenas uma ativa por vez. Só pode criar outra após a anterior se dissipar.",
                },
              },
              {
                name: "Constelação do Chefe Celeste",
                summary:
                  "Concede até +2 Níveis em uma Perícia para até 10 aliados",
                fields: {
                  Efeito:
                    "o usuário pode escolher uma Perícia em que tenha pelo menos 4 Níveis e pode conceder até +2 Níveis nessa Perícia para até 10 aliados.",
                  Incrementos:
                    "cada Incremento permite afetar +1 aliado adicional.",
                  Limite:
                    "Nenhum alvo pode receber mais Níveis do que o limite de 10 em Perícias.",
                  Uso: "1 vez por dia.",
                  Duração: "1 hora.",
                },
              },
              {
                name: "Constelação do Xamã Estelar",
                summary:
                  "Próximo feitiço não consuma espaço de magia",
                fields: {
                  Efeito:
                    "1 vez por dia, o usuário pode ativar a constelação para fazer com que seu próximo feitiço não consuma espaço de magia.",
                  Incrementos:
                    "a cada 2 Incrementos, ganha +1 uso adicional por dia.",
                },
              },
              {
                name: "Constelação da Ruína Sombria",
                summary:
                  "Proteção contra criaturas Sombrias por 1h, NA 35",
                fields: {
                  Efeito:
                    "por 1 hora, o usuário fica protegido contra criaturas Sombrias ou qualquer ser espiritual. Criaturas afetadas devem passar em uma Rolagem de Vontade contra NA 35. Se falharem, não podem atacar ou causar dano ao usuário.",
                  Limitação:
                    "se o usuário atacar uma dessas criaturas, perde imediatamente a proteção contra ela.",
                  "Após a duração":
                    "a constelação se dissipa permanentemente.",
                  Incrementos:
                    "cada Incremento aumenta o NA do teste em +5.",
                },
              },
            ],
          },
        ],
        tags: ["Onmyōdō", "Constelações", "Talismãs"],
      },

      {
        id: "elemental",
        name: "Elemental",
        fullTitle: "Shugenja — A Voz dos Kamis",
        glyph: "巫",
        tagline:
          "Sacerdotes intermediários entre o Império e o mundo invisível dos kamis.",
        description:
          "Os Shugenjas são os sacerdotes e intermediários sagrados entre o Império de Esmeralda e o mundo invisível. Enquanto os Onmyoji atuam como canais para as distantes Fortunas celestiais, os Shugenjas conversam diretamente com os Kamis — os espíritos elementais primordiais que habitam cada rocha, brisa, labareda e gota de água do plano mortal. Para um Shugenja, o mundo não é matéria inanimada, mas um coral vivo de vozes divinas que aguardam para serem ouvidas e reverenciadas.",
        subSections: [
          {
            name: "Kamis Despertados",
            text: "Através das preces do sacerdote, os espíritos adormecidos na natureza despertam e ganham forma física. Uma centelha se torna um chicote de chamas vivas; o solo se ergue como uma fortaleza intransponível. A matéria atende ao chamado da alma.",
          },
          {
            name: "O Elo de Sangue e Oração",
            text: "Diferente de outras ordens, o Shugenja usa suas orações e sua linhagem espiritual para aterrar o poder. Ele não dobra o elemento à força; ele se torna um reflexo dele. Sem o devido respeito e oferendas rituais aos kamis locais, a terra se recusa a se mover e o fogo se extingue antes de queimar.",
          },
        ],
        upkeep: {
          text: "Um Shugenja veterano pode tentar se comunicar com os kamis sem proferir as preces em voz alta ou realizar os mudras rituais, confiando apenas no elo puramente mental com os espíritos. No entanto, convencer os kamis a agir sem o devido protocolo litúrgico é uma tarefa hercúlea: acrescente +10 à dificuldade (NA) de invocação para quaisquer feitiços realizados sem componentes gestuais ou verbais.",
        },
        difficulty: {
          formula:
            "Agilidade + (Metade do Nível de Escola), mantendo sua Agilidade",
          description:
            "Mecânica de Ataque Universal (Armas Elementais)",
        },
        elementalVariants: [
          {
            name: "Armas Elementais de Ekuro",
            description:
              "Diz a lenda que este feitiço sagrado foi um presente direto dos próprios Dragões Celestiais para o shugenja Ekuro, o lendário fundador da Ordem das Cinco Armas. A magia permite ao conjurador manifestar a fúria crua de um elemento, moldando-o diretamente a partir de seu braço ou pulso como uma extensão de sua própria alma.",
            benefits: [
              {
                name: "Conjuração Veloz",
                text: "Este feitiço pode ser conjurado como uma Ação Simples, em vez de uma Ação Complexa.",
              },
              {
                name: "Canalização do Vazio",
                text: "O conjurador pode gastar 1 Ponto de Vazio (como uma Ação Livre) para que os ataques realizados com a arma invocada passem a custar uma Ação Simples (em vez de Complexa). Este efeito dura por um número de rodadas igual aos Pontos de Vazios gastos.",
              },
            ],
            variants: [
              {
                element: "Fogo",
                name: "Chicote de Fogo",
                range: "9m",
                damage: "Anel de Fogo",
              },
              {
                element: "Ar",
                name: "Lança de Vento",
                range: "6m",
                damage: "Anel de Ar",
              },
              {
                element: "Água",
                name: "Bastão de Torrente",
                range: "3m",
                damage: "Anel de Água",
              },
              {
                element: "Terra",
                name: "Manopla de Rocha",
                range: "Corpo a corpo",
                damage: "Anel de Terra",
              },
              {
                element: "Vazio",
                name: "Dardo do Vazio",
                range: "30m",
                damage: "Anel de Vazio",
                special:
                  "Pré-requisito: Vazio 3. Gasto obrigatório de 1 Ponto de Vazio. Ignora Invulnerável e qualquer Redução de dano.",
                exclusive: true,
              },
            ],
          },
          {
            name: "Muralhas Elementais",
            description:
              "As Muralhas Elementais exigem matéria-prima ou condições adequadas para se manifestarem. Terra e Fogo podem ser erguidas em quase qualquer superfície sólida ou ar livre. Ar exige a presença de atmosfera ou vento. Água só pode ser conjurada se o invocador estiver adjacente ou dentro de rios, lagos navegáveis ou o mar.",
            tiers: [
              {
                name: "Muralha Menor",
                stats: {
                  ring: "Ar 2, Terra 2, Fogo 2 ou Água 2",
                  range: "15m",
                  area: "Parede de 1,5m altura × 1m espessura × 4,5m comprimento",
                  duration: "5 minutos (1 rodada para Fogo)",
                  increments:
                    "Área (+0,5m altura ou +1,5m comprimento), Duração (+1 minuto, exceto Fogo)",
                },
                variants: [
                  {
                    element: "Fogo",
                    name: "Muralha Menor de Fogo",
                    description:
                      "Uma cortina crepitante de chamas. Qualquer criatura que tentar atravessar sofre 3k3 Ferimentos. Dura apenas 1 rodada.",
                  },
                  {
                    element: "Terra",
                    name: "Muralha Menor de Terra",
                    description:
                      "Uma parede de rocha compacta que bloqueia completamente a passagem física. Para ser estilhaçada, exige Teste de Força ou Terra contra NA = Terra do Invocador + Nível de Escola × 3.",
                  },
                  {
                    element: "Água",
                    name: "Muralha Menor de Água",
                    description:
                      "Uma torrente vertical de água em alta pressão. Ataques à distância que cruze a muralha sofrem -10. Criaturas que tentarem passar devem vencer Teste Resistido de Força contra o Anel de Água.",
                  },
                  {
                    element: "Ar",
                    name: "Muralha Menor de Ar",
                    description:
                      "Um turbilhão de ventos que impede a passagem de flechas e projéteis leves. Criaturas que tentarem passar ficam Cegas por 1 rodada.",
                  },
                ],
              },
              {
                name: "Muralha Maior",
                stats: {
                  ring: "Ar 4, Terra 4, Fogo 4 ou Água 4",
                  range: "30m",
                  area: "Especial por elemento",
                  duration: "10 minutos (1 hora para Fogo)",
                  increments:
                    "Área (+1 medida), Duração (+1 minuto, exceto Fogo)",
                },
                variants: [
                  {
                    element: "Fogo",
                    name: "Muralha Maior de Fogo",
                    description:
                      "Parede de 3m altura × 1,5m espessura × 7,5m comprimento. 6k6 Ferimentos. Dura 1 hora.",
                  },
                  {
                    element: "Terra",
                    name: "Muralha Maior de Terra",
                    description:
                      "Barreira de 3m altura × 30m extensão. NA massivo = Terra + Nível × 5.",
                  },
                  {
                    element: "Água",
                    name: "Muralha Maior de Água",
                    description:
                      "Parede de 4m altura × 15m comprimento. Bloqueia linha de visão. Barcos sofrem 4k2 e são empurrados 10m.",
                  },
                  {
                    element: "Ar",
                    name: "Muralha Maior de Ar",
                    description:
                      "Micro-furação de 5m altura × 20m comprimento. Nenhuma arma física consegue cruzar. Criaturas sofrem 2k2 por queda.",
                  },
                ],
              },
            ],
          },
        ],
        spellLibrary: [
          {
            name: "Água",
            seal: "水",
            levels: [
              {
                level: 1,
                spells: [
                    {
                      name: "Clareza de Propósito",
                      ring: "Água 1",
                      tags: ["Batalha"],
                      range: "Pessoal",
                      area: "3m",
                      duration: "2 rodadas",
                      increments: ["+Área","+Duração"],
                      effect:
                        "O invocador obtém clareza mental e foco inabalável. Concede +1k0 em testes de Inteligência e +1k0 em testes de Vontade."
                    },
                    {
                      name: "Energias Complacentes",
                      ring: "Água 1",
                      range: "7,5m",
                      area: "—",
                      duration: "Instantâneo",
                      increments: ["+Alcance","+Especial"],
                      effect:
                        "O invocador pode forçar uma criatura a gastar 1 Ponto de Vazio (se possuir). Se a criatura não possuir Vazio, o efeito causa 1k1 de dano."
                    },
                    {
                      name: "Força Fluente",
                      ring: "Água 1",
                      tags: ["Defesa"],
                      range: "6m",
                      area: "—",
                      duration: "3 rodadas",
                      increments: ["+Duração","+Alcance"],
                      effect:
                        "O invocador canaliza a força da água em um aliado, concedendo +1k0 em testes de Força."
                    }
                ]
              },
              {
                level: 2,
                spells: [
                    {
                      name: "Manto dos Miya",
                      ring: "Água 2",
                      tags: ["Defesa"],
                      range: "Pessoal",
                      area: "—",
                      duration: "5 rodadas",
                      increments: ["+Duração"],
                      effect:
                        "O invocador se envolve em uma camada protetora de água que absorve impactos. Concede Redução 2 (ou Redução adicional se já possui armadura)."
                    },
                    {
                      name: "Poça Reflexiva",
                      ring: "Água 2",
                      tags: ["Adivinhação"],
                      range: "15km",
                      area: "—",
                      duration: "5 min",
                      increments: ["+Duração","+Alcance"],
                      effect:
                        "O invocador pode ver através de qualquer superfície aquosa dentro do alcance. A imagem é como um reflexo distorcido e é apenas visual."
                    },
                    {
                      name: "Sabedoria e Clareza",
                      ring: "Água 2",
                      range: "Pessoal",
                      area: "—",
                      duration: "1h",
                      increments: ["+Duração","+Alvo"],
                      effect:
                        "O invocador ganha +1k1 em todos os testes de Inteligência e Conhecimento por uma hora."
                    },
                    {
                      name: "Velocidade das Ondas",
                      ring: "Água 2",
                      tags: ["Viagem"],
                      range: "Pessoal",
                      area: "—",
                      duration: "2 rodadas",
                      increments: [],
                      effect:
                        "O invocador ganha +20 em seus deslocamentos por 2 rodadas."
                    },
                    {
                      name: "Vapores Rejuvenescedores",
                      ring: "Água 2",
                      range: "Toque",
                      area: "—",
                      duration: "Instantâneo",
                      increments: ["+Alvos"],
                      effect:
                        "O invocador cura 1k1 de Ferimentos em um alvo tocado."
                    }
                ]
              },
              {
                level: 3,
                spells: [
                    {
                      name: "Ataque do Tsunami",
                      ring: "Água 3",
                      tags: ["Batalha"],
                      range: "7,5m",
                      area: "Cone 3m",
                      duration: "Instantâneo",
                      increments: ["+Dano","+Alcance","+Especial"],
                      effect:
                        "Uma onda de água se abate sobre os inimigos. Todas as criaturas na área sofrem o dano do Anel de Água do invocador. Criaturas que falharem no teste de Resistido são empurradas 3m para trás."
                    },
                    {
                      name: "Águas Silenciosas",
                      ring: "Água 3",
                      tags: ["Defesa"],
                      range: "Pessoal",
                      area: "—",
                      duration: "Variável",
                      increments: [],
                      effect:
                        "O invocador se torna silencioso como a água parada. Ganha +2k1 em testes de Furtividade e pode se mover sem produzir som."
                    },
                    {
                      name: "Bênção do Kami da Água",
                      ring: "Água 3",
                      range: "Toque",
                      area: "—",
                      duration: "5 rodadas",
                      increments: ["+Especial"],
                      effect:
                        "O invocador abençoa um aliado com o poder da água. O alvo ganha +1k1 em todos os testes de Resistido e pode respirar debaixo d'água."
                    },
                    {
                      name: "Caminhando sobre as Ondas",
                      ring: "Água 3",
                      tags: ["Viagem"],
                      range: "Toque",
                      area: "—",
                      duration: "10 min",
                      increments: ["+Duração","+Alvos"],
                      effect:
                        "O invocador e até 5 aliados podem caminhar sobre a superfície da água como se fosse terra firme."
                    },
                    {
                      name: "Próximo ao Gelo",
                      ring: "Água 3",
                      range: "Toque",
                      area: "—",
                      duration: "5 rodadas",
                      increments: ["+Duração","+Alcance"],
                      effect:
                        "O invocador conjura uma arma de gelo. A arma causa dano igual ao Anel de Água e pode empalar criaturas (dano extra se falharem no teste de Resistido)."
                    }
                ]
              },
              {
                level: 4,
                spells: [
                    {
                      name: "Água Flui por Todos os Obstáculos",
                      ring: "Água 4",
                      range: "Toque",
                      area: "—",
                      duration: "1 rodada",
                      increments: ["+Duração","+Alcance"],
                      effect:
                        "O invocador faz a água fluir através de qualquer obstáculo físico. Pode atravessar paredes, portas fechadas e outras barreiras físicas."
                    },
                    {
                      name: "Ir e Vir da Batalha",
                      ring: "Água 4",
                      tags: ["Batalha"],
                      range: "Pessoal",
                      area: "—",
                      duration: "5 rodadas",
                      increments: ["+Duração"],
                      effect:
                        "O invocador se torna tão fluido quanto a água. Ganha +2k1 em testes de Defesa e pode reagir a ataques corporal com -5 em vez do penalidade normal."
                    }
                ]
              },
              {
                level: 5,
                spells: [
                    {
                      name: "Mãos das Marés",
                      ring: "Água 5",
                      tags: ["Batalha","Viagem"],
                      range: "Raio 30m",
                      area: "—",
                      duration: "Instantâneo",
                      increments: ["+Área","+Alvos"],
                      effect:
                        "O invocador controla a água em uma grande área, erguendo-a e moldando-a. Pode erguer barreiras, afogar inimigos ou transportar aliados através de corpos d'água."
                    },
                    {
                      name: "Abraço de Suitengu",
                      ring: "Água 5",
                      tags: ["Trovão"],
                      range: "Pessoal",
                      area: "—",
                      duration: "Variável",
                      increments: [],
                      effect:
                        "O invocador se torna um avatar do kami da água. Ganha +2k1 em todos os testes, pode respirar debaixo d'água e é imune a venenos líquidos."
                    },
                    {
                      name: "Poder do Oceano",
                      ring: "Água 5",
                      tags: ["Defesa"],
                      range: "Toque",
                      area: "—",
                      duration: "Dias",
                      increments: ["+Duração"],
                      effect:
                        "O invocador canaliza o poder do oceano em um aliado. O alvo ganha Redução 5 e +2k1 em todos os testes de Resistido."
                    }
                ]
              },
              {
                level: 6,
                spells: [
                    {
                      name: "Erga-se, Água",
                      ring: "Água 6",
                      range: "9m",
                      area: "—",
                      duration: "Concentração",
                      increments: [],
                      effect:
                        "O invocador ergue uma coluna massiva de água que pode ser moldada e controlada livremente. A coluna causa dano equal ao Anel de Água do invocador a cada rodada e pode ser usada como barreira, arma ou veículo."
                    }
                ]
              }
            ]
          },
          {
            name: "Ar",
            seal: "風",
            levels: [
              {
                level: 1,
                spells: [
                    {
                      name: "Buscar a Verdade",
                      ring: "Ar 1",
                      range: "Pessoal/Toque",
                      area: "—",
                      duration: "5 min",
                      increments: ["+Duração"],
                      effect:
                        "O invocador pode perceber a verdade em um interrogatório. Se fizer uma pergunta direta a uma criatura, pode saber se ela respondeu com sinceridade."
                    },
                    {
                      name: "Legado de Kaze-no-Kami",
                      ring: "Ar 1",
                      tags: ["Criação"],
                      range: "NvEscola×15km",
                      area: "—",
                      duration: "Especial",
                      increments: ["+Alvos","+Alcance"],
                      effect:
                        "O invocador envia uma mensagem através do vento. A mensagem pode conter até 25 palavras e chega instantaneamente ao destinatário."
                    },
                    {
                      name: "Pela Luz da Lua",
                      ring: "Ar 1",
                      range: "Pessoal",
                      area: "6m",
                      duration: "1 min",
                      increments: ["+Área","+Duração"],
                      effect:
                        "O invocador ilumina uma área escura com uma luz suave vinda do vento. A iluminação é suficiente para ler e navegar."
                    },
                    {
                      name: "Tempestade de Ar",
                      ring: "Ar 1",
                      tags: ["Trovão"],
                      range: "Pessoal",
                      area: "Cone 22m",
                      duration: "Instantâneo",
                      increments: ["+Área","+Dano","+Alcance","+Especial"],
                      effect:
                        "O invocador solta uma explosão de ventos cortantes em forma de cone. Todas as criaturas na área sofrem o dano do Anel de Ar e são empurradas 3m para trás."
                    },
                    {
                      name: "Vento Abençoado",
                      ring: "Ar 1",
                      tags: ["Defesa"],
                      range: "Pessoal",
                      area: "Raio 3m",
                      duration: "Concentração",
                      increments: ["+Especial"],
                      effect:
                        "O invocador convoca uma rajada protetora ao redor de si. Qualquer projétil que se aproxime é desviado. Concede +2k1 em testes de Defesa contra ataques à distância."
                    }
                ]
              },
              {
                level: 2,
                spells: [
                    {
                      name: "Clamar pelo Vento",
                      ring: "Ar 2",
                      tags: ["Viagem"],
                      range: "Pessoal/6m",
                      area: "—",
                      duration: "1 min",
                      increments: ["+Duração","+Alcance"],
                      effect:
                        "O invocador convoca uma rajada de vento que o transporta. Pode voar a uma velocidade de até 30 km/h por 1 minuto."
                    },
                    {
                      name: "Segredos ao Vento",
                      ring: "Ar 2",
                      range: "16km",
                      area: "Raio 6m",
                      duration: "Concentração",
                      increments: ["+Área","+Alcance"],
                      effect:
                        "O invocador pode ouvir conversas e sons em uma área distante. O vento carrega os sons até ele."
                    },
                    {
                      name: "Sussurro dos Kamis",
                      ring: "Ar 2",
                      tags: ["Ilusão"],
                      range: "15m",
                      area: "Raio 6m",
                      duration: "1 rodada",
                      increments: ["+Área","+Duração","+Alcance"],
                      effect:
                        "O invocador cria uma ilusão sônica. Pode fazer com que uma voz pareça vir de qualquer direção ou location dentro da área."
                    },
                    {
                      name: "Toque de Benten",
                      ring: "Ar 2",
                      range: "Pessoal/Toque",
                      area: "—",
                      duration: "1h",
                      increments: ["+Alcance"],
                      effect:
                        "O invocador canaliza o poder de Benten, a deusa da música e da arte. Ganha +1k1 em todos os testes de Influência e Perícia de Artes."
                    },
                    {
                      name: "Vento Sussurrante",
                      ring: "Ar 2",
                      tags: ["Adivinhação"],
                      range: "6m",
                      area: "—",
                      duration: "Instantâneo",
                      increments: ["+Alcance"],
                      effect:
                        "O invocador pode ouvir sussurros e pensamentos superficiais de criaturas dentro do alcance. Não permite ler pensamentos complexos, apenas impressões gerais."
                    },
                    {
                      name: "Visão Oculta",
                      ring: "Ar 2",
                      tags: ["Ilusão"],
                      range: "Pessoal",
                      area: "—",
                      duration: "5 min",
                      increments: ["+Alvo","+Duração"],
                      effect:
                        "O invocador pode ver através de névoa, fumaça, escuridão e outras obstruções visuais como se elas não existissem."
                    }
                ]
              },
              {
                level: 3,
                spells: [
                    {
                      name: "Essência do Ar",
                      ring: "Ar 3",
                      tags: ["Defesa"],
                      range: "Pessoal",
                      area: "—",
                      duration: "5 rodadas",
                      increments: ["+Duração"],
                      effect:
                        "O invocador se torna parcialmente etéreo, tornando-se parcialmente feito de vento. Ganha +2k1 em todos os testes de Furtividade e pode se mover através de obstáculos físicos leves."
                    },
                    {
                      name: "Invocar os Vendavais",
                      ring: "Ar 3",
                      tags: ["Defesa"],
                      range: "15m",
                      area: "—",
                      duration: "Concentração",
                      increments: ["+Alcance"],
                      effect:
                        "O invocador convoca uma tempestade ventosa. Todas as criaturas na área sofrem -10 em testes de Ataque à distância e precisam passar em um teste de Resistido contra NA 20 para não serem empurradas."
                    },
                    {
                      name: "Invocar Névoa",
                      ring: "Ar 3",
                      range: "30m",
                      area: "Raio 15m",
                      duration: "1 min",
                      increments: ["+Área","+Duração","+Alcance"],
                      effect:
                        "O invocador ergue uma névoa densa que obscurece toda a visão. Criaturas na área sofrem -2k1 em testes de Percepção visual."
                    },
                    {
                      name: "O Olho Não Verá",
                      ring: "Ar 3",
                      tags: ["Defesa"],
                      range: "Pessoal/Toque",
                      area: "—",
                      duration: "Concentração",
                      increments: [],
                      effect:
                        "O invocador se torna invisível para criaturas que dependem da visão. Criaturas com outros sentidos (percepção, ouça) não são afetadas."
                    }
                ]
              },
              {
                level: 4,
                spells: [
                    {
                      name: "Dom do Vento",
                      ring: "Ar 4",
                      tags: ["Ilusão"],
                      range: "Pessoal",
                      area: "—",
                      duration: "5 min",
                      increments: ["+Duração"],
                      effect:
                        "O invocador assume controle total dos ventos em uma ampla área. Pode criar tempestades, controlar a direção dos ventos e usar o ar como arma."
                    }
                ]
              },
              {
                level: 5,
                spells: [
                    {
                      name: "Ecos na Brisa",
                      ring: "Ar 5",
                      range: "Pessoal",
                      area: "—",
                      duration: "Concentração",
                      increments: [],
                      effect:
                        "O invocador pode ouvir qualquer conversa que já tenha ocorrido em uma área. O vento retém as memórias sonoras dos últimos 7 dias."
                    },
                    {
                      name: "Facas do Assassino",
                      ring: "Ar 5",
                      tags: ["Trovão"],
                      range: "9m",
                      area: "Corredor 3m",
                      duration: "Instantâneo",
                      increments: ["+Área","+Dano"],
                      effect:
                        "O invocador cria lâminas de vento cortantes que atacam múltiplos alvos. Todas as criaturas no corredor sofrem o dano do Anel de Ar."
                    }
                ]
              },
              {
                level: 6,
                spells: [
                    {
                      name: "Erga-se, Ar",
                      ring: "Ar 6",
                      range: "9m",
                      area: "—",
                      duration: "Concentração",
                      increments: [],
                      effect:
                        "O invocador se torna uma tempestade viva. Pode voar, criar rajadas de vento cortantes e controlar o clima em uma vasta área."
                    },
                    {
                      name: "Fúria de Kaze-no-Kami",
                      ring: "Ar 6",
                      tags: ["Trovão"],
                      range: "Pessoal",
                      area: "Raio 1,5km",
                      duration: "Concentração",
                      increments: ["+Especial"],
                      effect:
                        "O invocador invoca a fúria do kami do vento. Uma tempestade devastadora se abate sobre a área, causando dano massivo a todos os inimigos."
                    }
                ]
              }
            ]
          },
          {
            name: "Fogo",
            seal: "火",
            levels: [
              {
                level: 1,
                spells: [
                    {
                      name: "Chamas Invejosas",
                      ring: "Fogo 1",
                      range: "6m",
                      area: "—",
                      duration: "Instantâneo",
                      increments: [],
                      effect:
                        "O invocador conjura uma chama que persegue o alvo. O alvo deve passar em um teste de Resistido contra NA = Anel de Fogo ou sofre 1k1 de dano de fogo."
                    },
                    {
                      name: "Extinguir",
                      ring: "Fogo 1",
                      range: "Pessoal",
                      area: "Raio 30m",
                      duration: "Instantâneo",
                      increments: ["+Área"],
                      effect:
                        "O invocador apaga todas as chamas na área afetada. Isso inclui incêndios, tochas e até chamas mágicas."
                    },
                    {
                      name: "Fogo Purificado",
                      ring: "Fogo 1",
                      range: "Pessoal",
                      area: "Raio 9m",
                      duration: "Instantâneo",
                      increments: ["+Área"],
                      effect:
                        "O invocador conjura chamas purificadoras que queimam apenas impurezas e corrupção. Pode curar 1k1 de Ferimentos causados por venenos ou doenças."
                    },
                    {
                      name: "Nunca Estou Só",
                      ring: "Fogo 1",
                      range: "Toque",
                      area: "—",
                      duration: "5 rodadas",
                      increments: ["+Alvos"],
                      effect:
                        "O invocador conjura um espírito de fogo que protege um aliado. O aliado ganha +1k1 em testes de Ataque com armas de fogo."
                    }
                ]
              },
              {
                level: 2,
                spells: [
                    {
                      name: "Chamas do Âmago",
                      ring: "Fogo 2",
                      range: "30m",
                      area: "—",
                      duration: "Instantâneo",
                      increments: ["+Alvos"],
                      effect:
                        "O invocador conjura chamas que queimam a essência de uma criatura. O alvo sofre 2k2 de dano de fogo e perde 1 Ponto de Vazio (se possuir)."
                    },
                    {
                      name: "Dança Sedutora",
                      ring: "Fogo 2",
                      range: "15m",
                      area: "Raio 6m",
                      duration: "2 rodadas",
                      increments: ["+Duração"],
                      effect:
                        "O invocador cria uma ilusão de fogo que hipnotiza as criaturas na área. Todas as criaturas devem passar em um teste de Vontade contra NA 20 ou ficam fascinadas pelo fogo."
                    },
                    {
                      name: "Romper a Aura",
                      ring: "Fogo 2",
                      range: "15m",
                      area: "—",
                      duration: "24h",
                      increments: ["+Duração"],
                      effect:
                        "O invocador quebra a proteção espiritual de uma criatura. A criatura perde todos os bônus de aura protetora por 24 horas."
                    }
                ]
              },
              {
                level: 3,
                spells: [
                    {
                      name: "Fúria Ígnea",
                      ring: "Fogo 3",
                      range: "30m",
                      area: "15×15m",
                      duration: "Instantâneo",
                      increments: [],
                      effect:
                        "O invocador conjura uma explosão de fogo devastadora. Todas as criaturas na área sofrem 4k4 de dano de fogo e devem passar em um teste de Resistido contra NA 25 ou ficam em chamas."
                    },
                    {
                      name: "Luz Resplandecente",
                      ring: "Fogo 3",
                      tags: ["Defesa"],
                      range: "15m",
                      area: "Armadura",
                      duration: "3 rodadas",
                      increments: ["+Dano","+Duração"],
                      effect:
                        "O invocador canaliza o poder do fogo em uma armadura protetora. A armadura ganha +2k1 em testes de Defesa e causa 1k1 de dano de fago a qualquer criatura que acertar um ataque corpo a corpo."
                    }
                ]
              },
              {
                level: 4,
                spells: [
                    {
                      name: "Defesa da Tempestade",
                      ring: "Fogo 4",
                      tags: ["Defesa"],
                      range: "Toque",
                      area: "Armadura",
                      duration: "10 rodadas",
                      increments: ["+Duração"],
                      effect:
                        "O invocador envolve um aliado em uma armadura de fogo protetora. A armadura ganha +3k1 em testes de Defesa e causa 2k2 de dano de fago a qualquer criatura que acertar um ataque corpo a corpo."
                    },
                    {
                      name: "Morte da Chama",
                      ring: "Fogo 4",
                      range: "30m",
                      area: "—",
                      duration: "5 rodadas",
                      increments: [],
                      effect:
                        "O invocador pode apagar qualquer chama, incluindo chamas mágicas e elementais. A criatura que mantém a chama ativa deve passar em um teste de Vontade contra NA 30 ou perde controle sobre sua chama."
                    }
                ]
              },
              {
                level: 5,
                spells: [
                    {
                      name: "Ira Eterna",
                      ring: "Fogo 5",
                      range: "7,5m",
                      area: "—",
                      duration: "1 rodada",
                      increments: ["+Duração","+Alvos"],
                      effect:
                        "O invocador canaliza a fúria do fogo em um aliado. O aliado ganha +2k1 em todos os testes de Ataque e causa 2k2 de dano de fago adicional com cada golpe."
                    },
                    {
                      name: "Onda Destrutiva",
                      ring: "Fogo 5",
                      range: "Pessoal",
                      area: "7,5m",
                      duration: "Instantâneo",
                      increments: ["+Dano"],
                      effect:
                        "O invocador libera uma onda de fogo devastadora em todas as direções. Todas as criaturas na área sofrem 6k6 de dano de fogo e são empurradas 5m para trás."
                    }
                ]
              }
            ]
          },
          {
            name: "Terra",
            seal: "地",
            levels: [
              {
                level: 1,
                spells: [
                    {
                      name: "Alma de Pedra",
                      ring: "Terra 1",
                      tags: ["Defesa"],
                      range: "Toque",
                      area: "—",
                      duration: "1h",
                      increments: ["+Duração"],
                      effect:
                        "O invocador canaliza a resistência da pedra em um aliado. O alvo ganha +1k1 em todos os testes de Resistido."
                    },
                    {
                      name: "Armadura de Terra",
                      ring: "Terra 1",
                      tags: ["Batalha","Defesa"],
                      range: "Pessoal",
                      area: "—",
                      duration: "10 rodadas",
                      increments: ["+Duração"],
                      effect:
                        "O invocador conjura uma armadura de rocha que se molda ao seu corpo. Concede Redução 3 e +1k1 em testes de Defesa."
                    },
                    {
                      name: "Bálsamo de Jurojin",
                      ring: "Terra 1",
                      range: "Toque",
                      area: "—",
                      duration: "1h",
                      increments: ["+Duração","+Alvos"],
                      effect:
                        "O invocador canaliza o poder curativo da terra. O alvo recupera 1k1 de Ferimentos e é curado de venenos leves."
                    },
                    {
                      name: "Estagnação da Terra",
                      ring: "Terra 1",
                      range: "15m",
                      area: "—",
                      duration: "6 rodadas",
                      increments: ["+Duração","+Alcance","+Alvos"],
                      effect:
                        "O invocador torna o solo instável. Criaturas na área sofrem -10 em seus deslocamentos e precisam passar em um teste de Resistido contra NA 15 para não cair."
                    },
                    {
                      name: "Toque da Terra",
                      ring: "Terra 1",
                      tags: ["Defesa"],
                      range: "Toque",
                      area: "—",
                      duration: "1h",
                      increments: ["+Duração","+Alvos"],
                      effect:
                        "O invocador toca o solo e pode sentir qualquer criatura dentro de um raio de 15m. A percepção é apenas de presença, não de identidade."
                    }
                ]
              },
              {
                level: 2,
                spells: [
                    {
                      name: "Força de Vontade",
                      ring: "Terra 2",
                      tags: ["Batalha"],
                      range: "15m",
                      area: "—",
                      duration: "2 rodadas",
                      increments: ["+Duração"],
                      effect:
                        "O invocador canaliza a determinação da terra em um aliado. O alvo ganha +1k1 em todos os testes de Vontade e resistência a magia."
                    },
                    {
                      name: "Mão de Argila",
                      ring: "Terra 2",
                      tags: ["Viagem"],
                      range: "Pessoal",
                      area: "—",
                      duration: "10 min",
                      increments: ["+Duração"],
                      effect:
                        "O invocador molda o solo para criar degraus, rampas ou plataformas que permitem escalar paredes ou precipícios."
                    },
                    {
                      name: "O Pegar da Terra",
                      ring: "Terra 2",
                      range: "15m",
                      area: "—",
                      duration: "3 rodadas",
                      increments: ["+Duração","+Alcance","+Alvos"],
                      effect:
                        "O invocador faz o solo agarrar os pés de uma criatura. A criatura precisa passar em um teste de Força contra NA 20 para se libertar."
                    },
                    {
                      name: "Os Pés da Montanha",
                      ring: "Terra 2",
                      tags: ["Defesa"],
                      range: "Pessoal/6m",
                      area: "—",
                      duration: "1h",
                      increments: ["+Duração","+Alvos"],
                      effect:
                        "O invocador torna-se inabalável como uma montanha. Ganha +2k1 em todos os testes de Resistido e não pode ser empurrado."
                    },
                    {
                      name: "Plenitude do Mundo",
                      ring: "Terra 2",
                      tags: ["Defesa"],
                      range: "Pessoal/6m",
                      area: "—",
                      duration: "10 min",
                      increments: ["+Duração","+Alcance","+Alvos"],
                      effect:
                        "O invocador canaliza a abundância da terra. Todos os aliados na área recuperam 1k1 de Ferimentos e ganham +1k1 em testes de Vigor."
                    },
                    {
                      name: "Seja a Montanha",
                      ring: "Terra 2",
                      tags: ["Defesa"],
                      range: "9m",
                      area: "—",
                      duration: "4 rodadas",
                      increments: ["+Duração"],
                      effect:
                        "O invocador se torna uma fortaleza viva. Ganha Redução 5 e imunidade a empurrões, mas perde metade de seus deslocamentos."
                    },
                    {
                      name: "Terra se Torna Céu",
                      ring: "Terra 2",
                      tags: ["Jade","Trovão"],
                      range: "30m",
                      area: "3m×3m",
                      duration: "Instantâneo",
                      increments: ["+Dano","+Alvos","+Especial"],
                      effect:
                        "O invocador faz o solo explodir em uma explosão de rochas. Todas as criaturas na área sofrem 3k3 de dano e são empurradas 3m para cima."
                    },
                    {
                      name: "Abraço de Kenro-jin",
                      ring: "Terra 2",
                      tags: ["Viagem"],
                      range: "Pessoal/Toque",
                      area: "—",
                      duration: "1h",
                      increments: ["+Duração"],
                      effect:
                        "O invocador se torna um com a terra. Pode se mover através do solo como se fosse água, emergindo em qualquer ponto dentro de 30m."
                    }
                ]
              },
              {
                level: 3,
                spells: [
                    {
                      name: "Bênção dos Kamis da Terra",
                      ring: "Terra 3",
                      tags: ["Batalha"],
                      range: "Pessoal/6m",
                      area: "—",
                      duration: "10 min",
                      increments: ["+Duração"],
                      effect:
                        "O invocador abençoa todos os aliados na área com o poder da terra. Todos ganham +1k1 em todos os testes e Redução 2."
                    },
                    {
                      name: "Força de Muitos",
                      ring: "Terra 3",
                      range: "9m",
                      area: "—",
                      duration: "5 rodadas",
                      increments: ["+Duração","+Alcance"],
                      effect:
                        "O invocador canaliza a força coletiva da terra em um aliado. O alvo ganha +2k1 em testes de Força e pode empurrar criaturas com até o dobro de seu tamanho."
                    },
                    {
                      name: "Misericórdia da Terra",
                      ring: "Terra 3",
                      range: "15m",
                      area: "—",
                      duration: "3 rodadas",
                      increments: ["+Alcance","+Alvos"],
                      effect:
                        "O invocador canaliza o poder curativo da terra. O alvo recupera 3k3 de Ferimentos e é curado de todas as doenças e venenos."
                    }
                ]
              },
              {
                level: 4,
                spells: [
                    {
                      name: "Essência da Terra",
                      ring: "Terra 4",
                      tags: ["Batalha"],
                      range: "Pessoal/6m",
                      area: "—",
                      duration: "10 rodadas",
                      increments: ["+Duração","+Alcance","+Alvos","+Especial"],
                      effect:
                        "O invocador se torna um avatar da terra. Ganha +2k1 em todos os testes, Redução 5 e pode erguer muros de rocha com um gesto."
                    }
                ]
              },
              {
                level: 5,
                spells: [
                    {
                      name: "A Força dos Kamis",
                      ring: "Terra 5",
                      tags: ["Batalha"],
                      range: "9m",
                      area: "—",
                      duration: "5 rodadas",
                      increments: ["+Duração","+Alcance"],
                      effect:
                        "O invocador canaliza a fúria dos kamis da terra. Cada golpe causa dano adicional igual ao Anel de Terra e pode estilhaçar armaduras."
                    },
                    {
                      name: "Terremoto",
                      ring: "Terra 5",
                      range: "Pessoal",
                      area: "Raio 1,5km",
                      duration: "1 min",
                      increments: ["+Área","+Duração"],
                      effect:
                        "O invocador invoca um terremoto devastador. Todas as estruturas na área sofrem danos massivos e todas as criaturas devem passar em um teste de Resistido contra NA 35 ou ficam debilitadas."
                    },
                    {
                      name: "Golpear as Raízes",
                      ring: "Terra 5",
                      range: "15m",
                      area: "—",
                      duration: "3 rodadas",
                      increments: ["+Duração","+Alcance","+Alvos","+Especial"],
                      effect:
                        "O invocador faz as raízes das árvores e plantas agarrarem e sufocarem uma criatura. A criatura deve passar em um teste de Força contra NA 30 a cada rodada ou sofre 4k4 de dano e fica incapacitada."
                    }
                ]
              },
              {
                level: 6,
                spells: [
                    {
                      name: "Erga-se, Terra",
                      ring: "Terra 6",
                      range: "9m",
                      area: "—",
                      duration: "Concentração",
                      increments: [],
                      effect:
                        "O invocador se torna uma montanha viva. Pode erguer montanhas, criar terremotos e controlar todo o solo em uma vasta área."
                    }
                ]
              }
            ]
          },
          {
            name: "Vazio",
            seal: "空",
            levels: [
              {
                level: 1,
                spells: [
                    {
                      name: "O Afago do Vazio",
                      ring: "Vazio 1",
                      range: "Toque",
                      area: "—",
                      duration: "1 min",
                      increments: ["+Duração"],
                      effect:
                        "O invocador toca uma criatura e pode sentir seus medos mais profundos. Ganha +1k1 em testes de Intimidação contra essa criatura por 1 minuto."
                    },
                    {
                      name: "Recorrer ao Vazio",
                      ring: "Vazio 1",
                      range: "Pessoal",
                      area: "—",
                      duration: "Instantâneo",
                      increments: ["+Especial"],
                      effect:
                        "O invocador canaliza uma pequena porção do Vazio para potencializar um feitiço. O próximo feitiço que conjurar terá +1k1 em seu teste de invocação."
                    },
                    {
                      name: "Testemunhar o Desconhecido",
                      ring: "Vazio 1",
                      range: "4,5m",
                      area: "—",
                      duration: "3 rodadas",
                      increments: ["+Alcance"],
                      effect:
                        "O invocador pode perceber a presença de magia, espíritos e energias sobrenaturais em uma área. A percepção é apenas de presença, não de identidade ou intenção."
                    }
                ]
              },
              {
                level: 2,
                spells: [
                    {
                      name: "Falsos Sussurros",
                      ring: "Vazio 2",
                      range: "9m",
                      area: "—",
                      duration: "1 min",
                      increments: [],
                      effect:
                        "O invocador pode implantar pensamentos falsos na mente de uma criatura. A criatura deve passar em um teste de Vontade contra NA 20 para resistir."
                    },
                    {
                      name: "Retirado do Curso",
                      ring: "Vazio 2",
                      range: "7,5m",
                      area: "—",
                      duration: "5 rodadas",
                      increments: ["+Duração","+Alcance"],
                      effect:
                        "O invocador pode desviar uma criatura de seu caminho. A criatura deve passar em um teste de Vontade contra NA 20 ou muda de direção aleatoriamente."
                    }
                ]
              },
              {
                level: 3,
                spells: [
                    {
                      name: "Ecos no Vazio",
                      ring: "Vazio 3",
                      range: "7,5m",
                      area: "—",
                      duration: "Concentração",
                      increments: ["+Alcance"],
                      effect:
                        "O invocador pode ouvir ecos de eventos passados em uma área. Pode ver imagens fragmentadas dos últimos 24 horas."
                    },
                    {
                      name: "Liberação de Vazio",
                      ring: "Vazio 3",
                      range: "7,5m",
                      area: "—",
                      duration: "Instantâneo",
                      increments: ["+Alcance"],
                      effect:
                        "O invocador libera uma onda de energia do Vazio. Todas as criaturas na área devem passar em um teste de Vontade contra NA 25 ou ficam atordoadas por 1 rodada."
                    }
                ]
              },
              {
                level: 4,
                spells: [
                    {
                      name: "Equilíbrio dos Elementos",
                      ring: "Vazio 4",
                      range: "Toque",
                      area: "—",
                      duration: "5 rodadas/5 min",
                      increments: ["+Duração","+Especial"],
                      effect:
                        "O invocador harmoniza os elementos em uma criatura. O alvo ganha resistência a todos os tipos de dano elemental e pode usar qualquer Anel Elemental como se tivesse 1 nível adicional."
                    },
                    {
                      name: "Preencher com o Vazio",
                      ring: "Vazio 4",
                      range: "Toque",
                      area: "—",
                      duration: "Instantâneo",
                      increments: ["+Alcance"],
                      effect:
                        "O invocador preenche uma criatura com a energia do Vazio. A criatura deve passar em um teste de Vontade contra NA 30 ou fica incapacitada por 1 rodada."
                    }
                ]
              },
              {
                level: 5,
                spells: [
                    {
                      name: "Momento de Clareza",
                      ring: "Vazio 5",
                      range: "Pessoal",
                      area: "—",
                      duration: "2 rodadas",
                      increments: ["+Duração"],
                      effect:
                        "O invocador ganha uma visão momentânea do verdadeiro natureza de todas as coisas. Pode ver através de ilusões, detectar mentiras e perceber a verdade oculta."
                    }
                ]
              },
              {
                level: 6,
                spells: [
                    {
                      name: "Dividir a Alma",
                      ring: "Vazio 6",
                      range: "Pessoal",
                      area: "—",
                      duration: "1 min",
                      increments: ["+Duração"],
                      effect:
                        "O invocador divide sua alma em duas partes. Uma parte permanece no corpo, enquanto a outra pode viajar livremente pelo plano espiritual por 1 minuto."
                    }
                ]
              }
            ]
          }
        ],
        tags: ["Kamis", "Elemental", "Conjuração"],
      },
    ],
  },
};

// ── Flat category list ──────────────────────────────────────────────

export const ALL_CATEGORIES = Object.entries(DATA).map(([id, cat]) => ({
  id,
  ...cat,
}));
