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

export interface RuleTable {
  headers: string[];
  rows: string[][];
}

export interface RuleSection {
  title?: string;
  text?: string;
  table?: RuleTable;
  items?: string[];
}

export interface Order {
  name: string;
  glyph: string;
  description: string;
  techniques: Technique[];
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
  tattoos?: Tattoo[];
  ruleSections?: RuleSection[];
  orders?: Order[];
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
          "Fundado por Hantei, o Clã da Coruja nasceu do juramento de um antigo imperador que falhou em proteger seu mundo e dedicou sua nova vida à defesa de Nana. Seus membros são vigilantes incansáveis e guardiões da Imperatriz, tendo como principal força a Guarda Miharu, conhecida como os Olhos da Coruja. Sua lealdade é absoluta, colocando a segurança do Trono de Jade acima de qualquer interesse pessoal.",
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
          "Fundado por Bayushi, o Clã do Escorpião atua nas sombras para proteger a Imperatriz e o Império. Especialistas em espionagem, investigação, contraespionagem e missões secretas, realizam tarefas que outros samurais não podem assumir sem comprometer sua honra. Sua ordem secreta, os Oniwabanshū, domina o Kagenari, uma arte mística baseada nas Marcas das Sombras, travando uma guerra silenciosa contra os agentes da família Gojo e do Dragão das Sombras.",
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

      {
        id: "garca",
        name: "Garça",
        fullTitle: "Clã da Garça: Linhagem Doji",
        glyph: "鷺",
        tagline: "Diplomatas, artistas e estudiosos — guardiões da cultura e da identidade.",
        description:
          "Fundado por Lady Doji, o Clã da Garça tornou-se o grande guardião da cultura e da identidade de Nihongan. Seus samurais são diplomatas, artistas e estudiosos, responsáveis por aperfeiçoar as leis, a literatura, a música, a poesia e as tradições do Império. Enquanto outros clãs defendem suas fronteiras, os Garça preservam a alma da civilização.",
        bonuses: [
          { source: "Família Doji", value: "+1 Inteligência" },
          { source: "Bônus de Escola", value: "+1 Vontade" },
        ],
        school: {
          name: "Escola de Bugei Doji",
          skills: [
            "Corte",
            "Etiqueta",
            "Caligrafia",
            "Comércio",
            "Literatura",
            "Música",
            "qualquer 1 Perícia Social",
          ],
          equipment: [
            "Daisho",
            "Armadura Leve",
            "Roupas Refinadas",
            "Kit de Escrita",
            "Instrumento Musical",
            "15 Kokus",
          ],
        },
        techniques: [
          {
            level: 1,
            levelLabel: "一",
            title: "O Caminho da Garça",
            intro:
              "O samurai do Garça aprende que a palavra pode ser mais afiada que a lâmina, e que a diplomacia é a primeira linha de defesa do Império.",
            effects: [
              {
                name: "Diplomacia",
                text: "Você recebe +2k0 em todos os testes de Perícia Social enquanto estiver em território neutro ou aliado.",
              },
              {
                name: "Presença",
                text: "Seu teste de Iniciativa é augmentado pelo dobro do seu Rank de Etiqueta.",
              },
            ],
          },
          {
            level: 2,
            levelLabel: "二",
            title: "A Palavra Afiada",
            intro:
              "O Garça domina a arte de persuadir, negociar e manipular conversas a seu favor.",
            effects: [
              {
                name: "Negociação",
                text: "Você pode refazer qualquer teste de Comércio ou Corte uma vez por cena, mantendo o melhor resultado.",
              },
            ],
          },
          {
            level: 3,
            levelLabel: "三",
            title: "O Poder da Cultura",
            intro:
              "A erudição do Garça se manifesta em habilidades sobrenaturais que transcendem o mundo material.",
            effects: [
              {
                name: "Erudição",
                text: "Você recebe +1k1 em todos os testes de Conhecimento e Perícias Sociais.",
              },
            ],
          },
        ],
        tags: ["Diplomacia", "Cultura", "Artes"],
      },

      {
        id: "fenix",
        name: "Fênix",
        fullTitle: "Clã Fênix: Linhagem Isawa",
        glyph: "鳳",
        tagline: "Guardiões do conhecimento elemental e da magia autorizada.",
        description:
          "Fundado pela própria Imperatriz Nana em homenagem a Naka (Isawa Kenji), o Clã Fênix é o guardião do conhecimento elemental e da magia autorizada. Após o Decreto Elemental, o uso da magia passou a ser rigidamente controlado para preservar o equilíbrio do mundo. O clã supervisiona essa tradição por meio do Conselho Elemental, composto por cinco Mestres Elementais e seus cinco discípulos, sendo a única autoridade acima deles a própria Imperatriz.",
        bonuses: [
          { source: "Família Isawa", value: "+1 Inteligência" },
          { source: "Bônus de Escola", value: "+1 Percepção" },
        ],
        school: {
          name: "Escola Shugenja Isawa",
          skills: [
            "Meditação",
            "Teologia",
            "Conhecimento: Elementos",
            "Caligrafia",
            "História",
            "Investigação",
            "qualquer 1 Perícia",
          ],
          equipment: [
            "Daisho",
            "Armadura Leve",
            "Roupas de Cerimônia",
            "Kit de Caligrafia",
            "Talismãs Elementais",
            "10 Kokus",
          ],
        },
        techniques: [
          {
            level: 1,
            levelLabel: "一",
            title: "O Caminho da Fênix",
            intro:
              "O Fênix aprende que o equilíbrio dos elementos é a chave para todo poder. Através da meditação e do estudo, ele canalis forças que outros apenas temem.",
            effects: [
              {
                name: "Percepção Elemental",
                text: "Você pode sentir a presença de magia elemental em um raio de 15 metros como uma Ação Simples.",
              },
            ],
          },
          {
            level: 2,
            levelLabel: "二",
            title: "O Decreto Elemental",
            intro:
              "O Fênix compreende as leis que governam o uso da magia e pode aplicá-las com maestria.",
            effects: [
              {
                name: "Controle",
                text: "Você recebe +1k1 em todos os testes de Conjuração de feitiços elementais.",
              },
            ],
          },
          {
            level: 3,
            levelLabel: "三",
            title: "A Autoridade do Conselho",
            intro:
              "No ápice de seu treinamento, o Fênix se torna uma autoridade reconhecida nas artes elementais.",
            effects: [
              {
                name: "Maestria",
                text: "Feitiços de Rank 3 ou inferior podem ser conjurados como Ação Simples.",
              },
            ],
          },
        ],
        tags: ["Elementos", "Magia", "Conselho"],
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
            name: "Domínio da Guerra e Combate",
            description: "Focado em melhorar capacidades de luta, ataque e defesa.",
            constellations: [
              {
                name: "Constelação do Guerreiro Celeste",
                level: 1,
                description: "Conta a história de um campeão espiritual das batalhas.",
                effect: "Concede +1k1 em sua próxima jogada de Perícia com Armas ou Jiujutsu.",
                extras: { Restrições: "A Perícia específica deve ser escolhida na criação da constelação." },
              },
              {
                name: "Constelação da Fúria Celeste",
                level: 2,
                description: "Narra a fúria de um espírito guerreiro indomável.",
                effect: "O usuário recebe +1k1 nas jogadas de dano. A escolha (para uma arma específica ou ataque desarmado) é feita na criação da constelação.",
                extras: { Duração: "Turnos iguais ao Anel de Água." },
              },
              {
                name: "Constelação da Armadura Celeste",
                level: 3,
                description: "Antiga aliança entre espíritos guerreiros e defensores inabaláveis.",
                effect: "Se sem armadura: Teste de defesa aumenta em +1k1 e recebe Redução 5. Se com armadura: ignora todas as penalidades de Perícia causadas por ela.",
                extras: { Duração: "Turnos iguais ao Anel de Vazio." },
              },
              {
                name: "Constelação do Chefe Celeste",
                level: 4,
                description: "Representa a liderança que eleva todos ao redor.",
                effect: "O usuário escolhe uma Perícia que possua pelo menos 4 Níveis. Concede +2 Níveis nessa mesma Perícia para até 10 aliados.",
                extras: {
                  Incrementos: "Cada Incremento permite afetar +1 aliado.",
                  Limites: "Ninguém pode ultrapassar o limite de 10 Níveis na perícia. Uso 1 vez por dia.",
                  Duração: "1 hora.",
                },
              },
            ],
          },
          {
            name: "Domínio da Vitalidade e Cura",
            description: "Focado em sobrevivência, recuperação e resistência física.",
            constellations: [
              {
                name: "Constelação da Abundância",
                level: 1,
                description: "Tempo de fartura que afastava os Tempos Magros. NA de Invocação 20.",
                effect: "Ignora penalidades de fome por 1 dia.",
                extras: {
                  Limites: "1 uso/dia. Só funciona por até 7 dias consecutivos.",
                  Duração: "Deve ser mantida por 1 hora para ativar.",
                },
              },
              {
                name: "Constelação da Mãe Estelar",
                level: 2,
                description: "Representa o amor protetor e restaurador.",
                effect: "Usuário recupera Ferimentos ao descansar como se seu Vigor fosse 1 Nível maior (não altera o Vigor real).",
                extras: {
                  Custo: "1 hora de meditação",
                  Duração: "24h",
                  Incrementos: "Cada 1 Incremento aumenta em +1 o Nível efetivo de Vigor para recuperação.",
                },
              },
              {
                name: "Constelação do Antídoto Celeste",
                level: 3,
                description: "Baseada no conhecimento de um grande curandeiro.",
                effect: "Remove os efeitos de um único veneno de um alvo (1 vez por semana).",
                extras: { Limites: "Venenos mágicos exigem teste contestado contra a NA de criação do feitiço." },
              },
              {
                name: "Constelação dos Amantes",
                level: 4,
                description: "Narra um espírito que sacrificou tudo por amor.",
                effect: "Pelo toque, cura até 10 Ferimentos de outro alvo (1 vez por dia).",
                extras: { Custo: "O usuário sofre a exata mesma quantidade de Ferimentos curados. Esses ferimentos não podem ser curados por magia, só descanso natural." },
              },
              {
                name: "Constelação da Vida Persistente",
                level: 5,
                description: "Espírito guerreiro que sobreviveu além dos limites.",
                effect: "Escolher um ao ativar: Ignorar Ferimentos no valor de (5 × Anel de Terra) por 1 vez no dia OU ignorar todas as penalidades de Ferimentos (exceto morte) por 1 hora.",
                extras: { Limites: "1 vez por dia por alvo." },
              },
            ],
          },
          {
            name: "Domínio da Busca e Conexão",
            description: "Focado em localizar pessoas e rastreamento.",
            constellations: [
              {
                name: "Constelação do Caçador",
                level: 1,
                description: "Rastreador de sentidos sobrenaturais.",
                effect: "+1k1 em testes de Caça (apenas quando o olfato for relevante).",
              },
              {
                name: "Constelação do Pai Vigilante",
                level: 2,
                description: "Vínculo inquebrável entre protetor e protegido.",
                effect: "Sintonizada a uma criatura voluntária específica. Uma vez por hora, o usuário pode fazê-la indicar a direção exata dessa criatura.",
                extras: {
                  Alcance: "Máximo de 15 km.",
                  Incrementos: "Cada Incremento adiciona +15 km ao alcance.",
                  Duração: "24h.",
                },
              },
              {
                name: "Constelação do Lar Gêmeo",
                level: 3,
                description: "Vínculo entre dois pontos espirituais.",
                effect: "Gera duas marcas/constelações sintonizadas. Cada portador pode, uma vez por hora, fazer a constelação indicar a direção exata da outra.",
                extras: { Alcance: "80 km (a cada 2 Incrementos ampliado)." },
              },
            ],
          },
          {
            name: "Domínio do Espaço e Movimento",
            description: "Focado em mobilidade superior.",
            constellations: [
              {
                name: "Constelação das Águas Profundas",
                level: 1,
                description: "Espírito que dominava as águas como a terra.",
                effect: "O usuário pode nadar normalmente. É considerado como tendo +3k0 Níveis em Esportes (para nadar) e ganha Ênfase em Nadar temporariamente.",
                extras: { Duração: "1 hora por dia." },
              },
              {
                name: "Constelação do Corredor dos Ventos",
                level: 2,
                description: "Representa um espírito de velocidade sobrenatural.",
                effect: "O usuário se move como se seu Anel de Água fosse +2 Níveis maior (acumula com habilidades naturais equivalentes).",
                extras: {
                  Incrementos: "A cada 2 Incrementos, aumenta em +1 Nível adicional no Anel de Água efetivo.",
                  Duração: "Turnos iguais ao Anel de Água.",
                },
              },
            ],
          },
          {
            name: "Domínio da Mente e Sociedade",
            description: "Focado em intelecto, percepção social e conhecimento.",
            constellations: [
              {
                name: "Constelação da Sabedoria",
                level: 1,
                description: "Espírito de um explorador versátil, mestre em improvisar habilidades.",
                effect: "Recebe +1 Nível em uma Perícia na qual seja imperito (escolhida no momento da invocação).",
              },
              {
                name: "Constelação do Companheiro",
                level: 2,
                description: "Espírito carismático cercado de aliados.",
                effect: "Recebe +1k1 em todos os testes sociais, incluindo interações com criaturas não humanas.",
                extras: { Duração: "24h." },
              },
              {
                name: "Constelação do Mercador Astuto",
                level: 3,
                description: "Espírito negociador que jamais era enganado.",
                effect: "1 vez por dia, o usuário pode saber com absoluta certeza se a última coisa que ouviu foi uma mentira.",
              },
            ],
          },
          {
            name: "Domínio Místico e Espiritual",
            description: "Focado em interação com magia, reinos espirituais e criaturas do vazio.",
            constellations: [
              {
                name: "Constelação dos Espíritos",
                level: 1,
                description: "Espíritos dominados e compreendidos.",
                effect: "Pode perceber espíritos e fantasmas, entendê-los e ser entendido por eles. Necessário um Ritual.",
                extras: { Duração: "1 hora por dia." },
              },
              {
                name: "Constelação da Luz Eterna",
                level: 2,
                description: "Visão perfeita além de qualquer obstáculo.",
                effect: "O usuário pode ver claramente, ignorando cegueira, escuridão, névoa, fumaça e qualquer penalidade de visibilidade.",
                extras: {
                  Limites: "1 uso por dia.",
                  Duração: "1 hora.",
                },
              },
              {
                name: "Constelação do Sonho Vigilante",
                level: 3,
                description: "Espírito que caminhava consciente pelos sonhos.",
                effect: "1 vez por semana, ao dormir, o usuário pode entrar no Reino Espiritual, permanecendo consciente e no controle de suas ações.",
              },
              {
                name: "Constelação do Xamã Estelar",
                level: 4,
                description: "Domínio espiritual absoluto sobre a magia.",
                effect: "1 vez por dia, ativa a constelação para fazer com que seu próximo feitiço não consuma espaço de magia.",
                extras: { Incrementos: "A cada 2 Incrementos, ganha +1 uso adicional por dia." },
              },
              {
                name: "Constelação da Ruína Sombria",
                level: 5,
                description: "Catástrofe ancestral que marcou o mundo.",
                effect: "Proteção contra criaturas Sombrias ou qualquer ser espiritual. Criaturas afetadas devem passar em Rolagem de Vontade (NA 35) ou não podem atacar ou causar dano ao usuário.",
                extras: {
                  Restrições: "Se o usuário atacar a criatura, perde a proteção contra ela. Ao final da duração, a constelação se dissipa permanentemente.",
                  Incrementos: "Cada Incremento aumenta o NA do teste em +5.",
                  Duração: "1 hora.",
                },
              },
            ],
          },
          {
            name: "Domínio do Destino e Milagres",
            description: "Efeitos únicos e poderosos que alteram as regras do mundo.",
            constellations: [
              {
                name: "Constelação da Fortuna Serena",
                level: 1,
                description: "Espírito virtuoso que sempre tomava o caminho correto.",
                effect: "O usuário pode melhorar uma rolagem recebendo +2k1.",
                extras: { Limites: "Uso de 1 vez a cada 24h." },
              },
              {
                name: "Constelação do Demônio Quebrado",
                level: 2,
                description: "Derrota de uma entidade invulnerável através de astúcia.",
                effect: "O usuário pode ferir criaturas com a habilidade 'Invulnerável' usando qualquer arma. Redução de Dano da criatura não é afetada.",
                extras: {
                  Limites: "1 vez por dia por alvo.",
                  Duração: "Turnos iguais ao Anel de Vazio.",
                },
              },
              {
                name: "Constelação do Amanhã",
                level: 3,
                description: "Espírito destinado a sobreviver ao inevitável. NA de Invocação: 25.",
                effect: "Sintonizada a um indivíduo específico na criação. O alvo recebe os efeitos da Vantagem Grande Destino.",
                extras: {
                  Restrições: "O invocador pode ter apenas uma ativa por vez. Quando salva a vida do alvo, se dissipa. Se desfeita prematuramente, o alvo morre imediatamente.",
                  Duração: "Enquanto permanecer intacta.",
                },
              },
            ],
          },
          {
            name: "Domínios Isolados",
            description: "Constelações de utilidade específica que não se enquadram completamente nas outras categorias.",
            constellations: [
              {
                name: "Constelação do Construtor",
                level: 1,
                description: "Espírito de criação e precisão.",
                effect: "Concede +1k1 em uma Perícia de Criação específica (escolhida na criação).",
                extras: { Duração: "1 hora por dia." },
              },
            ],
          },
          {
            name: "Domínio dos Selos e Guardas",
            description: "Focado em preparação tática, armadilhas espirituais e proteção elemental canalizada através de talismãs (wards).",
            constellations: [
              {
                name: "Constelação do Selo Elemental",
                level: 1,
                description: "Canaliza a energia bruta dos elementos em um papel ou marca mística para proteger ou fortalecer rapidamente.",
                effect: "Ao ativar esta constelação, o usuário escolhe um Elemento e ganha o respectivo bônus: Ar (Recebe +1k1 em rolagens de Defesa); Terra (Recebe Redução de Dano 5); Água (O deslocamento do alvo é dobrado); Fogo (O próximo ataque corpo-a-corpo ou à distância causa dano extra igual ao Anel de Fogo × 2).",
                extras: {
                  Incrementos: "A cada 2 Incrementos na ativação, o efeito base é dobrado (+2k2 Defesa, Redução 10, etc).",
                  Duração: "Turnos iguais ao Anel de Vazio.",
                },
              },
              {
                name: "Constelação do Vigia Puro",
                level: 2,
                description: "Baseada nas antigas wards de purificação, detecta e expulsa a corrupção.",
                effect: "Pode ser fixada em um objeto, porta ou pessoa. Qualquer criatura Sombria ou com a Mácula (Corrupção) que tocar no alvo sofrerá dano igual ao Anel de Vazio do usuário e revelará imediatamente sua contaminação para o criador do selo.",
                extras: {
                  Limites: "Pode manter um número de selos ativos igual ao seu Anel de Vazio.",
                  Duração: "24 horas.",
                },
              },
              {
                name: "Constelação do Refúgio Protetor",
                level: 3,
                description: "Cria um local consagrado que amortece o impacto de qualquer agressão física ou mística.",
                effect: "Ao custo de 1 Ponto de Vazio, o usuário cria uma área de proteção ao redor do selo. Qualquer dano (causado por feitiços ou ataques físicos) que as criaturas recebam enquanto estiverem dentro dessa área será reduzido em 1k1 (até o limite mínimo de 1k1 de dano sofrido).",
                extras: {
                  Área: "Raio de 5 metros a partir do selo.",
                  Duração: "1 hora.",
                },
              },
              {
                name: "Constelação da Vigília Elemental",
                level: 4,
                description: "Um selo de controle espiritual que interfere na capacidade das entidades elementais de conjurar magia livremente.",
                effect: "Cria uma área mística (raio de 5 metros). Entidades e espíritos elementais (Kami) podem entrar e sair normalmente da área, porém, para conjurarem feitiços ou habilidades mágicas dentro da área (ou contra quem está dentro dela), eles precisam primeiro passar em um Teste Contestado do seu próprio Anel principal contra o Anel de Vazio do criador do selo.",
                extras: {
                  Incrementos: "+1 Incremento aumenta a duração em 1 hora; +1 Incremento aumenta a área em +5 metros.",
                  Duração: "1 hora.",
                },
              },
              {
                name: "Constelação da Égide Negra",
                level: 5,
                description: "A técnica projetada para isolar e repelir a corrupção e os espíritos maculados.",
                effect: "Cria uma barreira intransponível (raio de 5 metros). Criaturas sombrias e espíritos corrompidos (Kansen) são proibidos de entrar na área e não podem usar magias contra quem está lá dentro. Para quebrar essa regra (entrar ou atacar), o Kansen precisa passar em um Teste Contestado rigoroso de seu Anel principal contra o Anel de Vazio do criador do selo.",
                extras: {
                  Incrementos: "+1 Incremento aumenta a duração em 1 hora; +1 Incremento aumenta a área em +5 metros.",
                  Duração: "1 hora.",
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
            name: "O Elo de Oração e Reverência",
            text: "Diferente de outras ordens, o Shugenja é escolhido pelos próprios elementos — kamis reconhecem nele uma vida dedicada e uma personalidade afinada com a natureza do mundo. Através de orações, mudras rituais e oferendas, ele estabelece um vínculo de confiança com os espíritos. Ele não dobra o elemento à força; ele se torna um reflexo dele. Sem o devido respeito e reverência aos kamis locais, a terra se recusa a se mover e o fogo se extingue antes de queimar.",
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

  monges: {
    label: "Monges",
    seal: "☸",
    listLabel: "Ordens",
    items: [
      {
        id: "hoshi",
        name: "Ordem Tatuada de Hoshi",
        fullTitle:
          "Ordens Tatuadas de Hoshi — Sub-ordens da Irmandade de Shinsei e do Clã Dragão",
        glyph: "龍",
        tagline:
          "O poder das tatuagens sagradas: harmonia mística (Ise Zumi) ou confronto direto (Kikage Zumi).",
        description:
          "Dentro da Irmandade de Shinsei, os monges que seguem a linhagem de Hoshi dividem-se em duas vertentes filosóficas e marciais distintas. Ambas carregam o sangue místico e o poder das tatuagens sagradas, mas buscam a iluminação por caminhos opostos: os Ise Zumi, através da harmonia mística entre o espírito e o receptáculo físico, e os Kikage Zumi, através do confronto direto e da superação dos limites corpóreos.",
        tags: ["Tatuagens", "Kiho", "Shinsei", "Dragão"],
        orders: [
          {
            name: "Ordem Ise Zumi",
            glyph: "🐲",
            description:
              "Os Ise Zumi trilham um caminho onde contemplação e ação caminham lado a lado. Diferentemente daqueles que buscam a iluminação apenas através do combate ou apenas da meditação, eles procuram harmonizar o corpo, o espírito e os elementos em uma única prática. Para eles, cada movimento nasce do silêncio interior, e cada silêncio prepara o próximo movimento.\n\nSuas tatuagens despertam por meio da disciplina espiritual, da compreensão dos kami e do domínio do próprio ki. Embora treinem artes marciais com dedicação, sua verdadeira força está em transformar a energia espiritual em proteção, percepção e técnicas capazes de alterar o fluxo natural de um confronto.\n\nMuitos Ise Zumi preferem evitar a violência sempre que possível, dedicando-se ao estudo, à contemplação e aos mistérios do mundo espiritual. Ainda assim, quando a ordem natural é ameaçada, lutam com serenidade e convicção, utilizando tanto a sabedoria quanto a força para restaurar o equilíbrio. Seu caminho representa a união perfeita entre a tradição contemplativa ancestral e a disciplina marcial, enxergando o combate não como um objetivo, mas como mais uma forma de compreender a natureza do universo.",
            techniques: [
              {
                level: 1,
                levelLabel: "一",
                title: "O Sangue do Kami",
                intro:
                  "O sangue do Kami Togashi é levemente diluído na linhagem dominante da ordem Togashi, e os irmãos escolhidos para servir ao Dragão como vassalos dos Togashi recebem o sangue místico de um deus na forma de tatuagens únicas.",
                effects: [
                  {
                    name: "Efeito",
                    text: "Você ganha duas Tatuagens neste nível.",
                  },
                ],
              },
              {
                level: 2,
                levelLabel: "二",
                title: "Corpo de Pedra",
                intro:
                  "O domínio do corpo é o primeiro passo essencial da jornada de um monge rumo à iluminação, e as artes marciais são as ferramentas perfeitas para harmonizar corpo e espírito.",
                effects: [
                  {
                    name: "Efeito",
                    text: "Você ganha um bônus de +1k1 ao total de todas as jogadas de ataque e avaliações de dano desarmado.",
                  },
                ],
              },
              {
                level: 3,
                levelLabel: "三",
                title: "O Poder Dentro e Fora",
                intro:
                  "O ise zumi sabe que os kami não podem ajudar nenhum homem se ele se provar um receptáculo físico indigno.",
                effects: [
                  {
                    name: "Mecânica",
                    text: "Enquanto estiver sem armadura e sem nenhum Kiho ou Tatuagem ativa, você ganha Redução igual a 3 mais o seu Anel de Vazio.",
                  },
                  {
                    name: "Tatuagem",
                    text: "Você ganha uma Tatuagem adicional.",
                  },
                ],
              },
              {
                level: 4,
                levelLabel: "四",
                title: "O Dom da Senhora",
                intro:
                  "A jornada do ise zumi eventualmente atrai as bênçãos e os dons de patronos divinos que reconhecem seu esforço e dedicação às artes marciais e ao aprimoramento físico.",
                effects: [
                  {
                    name: "Tatuagem",
                    text: "Você ganha uma Tatuagem neste nível.",
                  },
                  {
                    name: "Defesa",
                    text: "Você pode adicionar seus Reflexos ao seu teste contestado de defesa.",
                  },
                  {
                    name: "Agarrada",
                    text: "Ao rolar para controlar uma Agarrada (Grapple), você pode optar por usar seus Reflexos em vez de sua Força.",
                  },
                ],
              },
              {
                level: 5,
                levelLabel: "五",
                title: "Bênção do Kami",
                intro:
                  "À medida que um ise zumi continua sua jornada de autodescoberta, acumulando novas experiências pelo caminho, ele eventualmente será julgado digno de sabedoria adicional na forma de novas tatuagens.",
                effects: [
                  {
                    name: "Efeito",
                    text: "Você ganha duas Tatuagens adicionais.",
                  },
                ],
              },
            ],
          },
          {
            name: "Ordem Kikage Zumi",
            glyph: "⚡",
            description:
              "Os Kikage Zumi acreditam que a iluminação é alcançada pelo confronto direto com os próprios limites. Para eles, cada batalha, cada cicatriz e cada golpe recebido são ensinamentos que não podem ser encontrados em pergaminhos ou longos períodos de contemplação. Seu caminho é marcado pela disciplina física, pela coragem e pela determinação de avançar mesmo diante do medo.\n\nAs tatuagens sagradas de um Kikage Zumi despertam à medida que ele coloca seu corpo e seu espírito à prova. Em combate, seus movimentos são intensos e decisivos, unindo força, velocidade e instinto em uma única expressão de vontade. A violência nunca é um fim em si mesma, mas uma ferramenta para romper as ilusões que prendem a mente.\n\nEmbora sejam frequentemente vistos como guerreiros impetuosos, os verdadeiros Kikage Zumi compreendem que a força sem propósito é apenas brutalidade. Seu objetivo não é vencer todos os inimigos, mas superar a si mesmos sempre que entram em conflito.",
            techniques: [
              {
                level: 1,
                levelLabel: "一",
                title: "Golpeie a Base",
                intro:
                  "À medida que o estudante de Kaze-do se torna mais proficiente, ele é capaz de focar o poder da mente, da alma e do corpo em golpes punitivos com as mãos e os pés.",
                effects: [
                  {
                    name: "Dano",
                    text: "Você pode gastar um Ponto de Vazio em rolagens de dano para ataques desarmados, incluindo o dano causado em uma Agarrada (Grapple).",
                  },
                  {
                    name: "Tatuagem",
                    text: "Você ganha uma tatuagem adicional.",
                  },
                ],
              },
              {
                level: 2,
                levelLabel: "二",
                title: "Movendo o Vento",
                intro:
                  "O Kikage Zumi agora golpeia com a rapidez do próprio Elemento Ar, o verdadeiro caminho do Kaze-do.",
                effects: [
                  {
                    name: "Efeito",
                    text: "Você pode atacar como uma Ação Simples (Simple Action) ao realizar ataques desarmados.",
                  },
                  {
                    name: "Tatuagem",
                    text: "Você ganha uma tatuagem adicional.",
                  },
                ],
              },
              {
                level: 3,
                levelLabel: "三",
                title: "Golpeie o Centro",
                intro:
                  "Os Kikage Zumi aprendem a golpear com velocidade e força terrível, ao mesmo tempo em que usam a rapidez do vento para arremessar seus oponentes ao chão.",
                effects: [
                  {
                    name: "Derrubar",
                    text: "Quando estiver lutando desarmado, você pode realizar a manobra Derrubar (Knockdown) com 1 Aumento (Raise) a menos.",
                  },
                  {
                    name: "Tatuagem",
                    text: "Você ganha uma tatuagem adicional.",
                  },
                ],
              },
              {
                level: 4,
                levelLabel: "四",
                title: "Golpeie o Cume",
                intro:
                  "A maestria final dos caminhos do Kaze-do permite ao homem tatuado desferir golpes e arremessos que privam seus inimigos do próprio Ar.",
                effects: [
                  {
                    name: "Derrubar Aprimorado",
                    text: "Sempre que você realizar uma manobra Derrubar (Knockdown), você pode declarar dois Aumentos adicionais; se o Derrubar for bem-sucedido, seu oponente fica automaticamente Atordoado (Stunned).",
                  },
                  {
                    name: "Agarrada",
                    text: "Se você optar por arremessar um oponente durante uma Agarrada que você controla, ele deve rolar Terra contra ND 20 ou também ficará Atordoado.",
                  },
                  {
                    name: "Tatuagem",
                    text: "Você ganha uma tatuagem adicional.",
                  },
                ],
              },
            ],
          },
        ],
        tattoos: [
          {
            name: "Aranha",
            description:
              "Permite mover-se por superfícies verticais ou invertidas (paredes e tetos) usando metade do seu deslocamento durante Ações de Movimento.",
          },
          {
            name: "Bambu",
            description:
              "Aumenta o seu ND de Armadura em um valor igual a (Nível de Escola x 2) + 5.",
          },
          {
            name: "Camaleão",
            description:
              "Cria uma ilusão alterando sua aparência e roupas (não pode imitar pessoas específicas). Para perceberem a ilusão, devem passar em um teste contra ND igual à sua Consciência x 5.",
          },
          {
            name: "Caranguejo",
            description:
              "Concede um valor de Redução de Dano igual ao seu Anel de Terra.",
          },
          {
            name: "Centopeia",
            description:
              "Permite viajar distâncias imensas (Água x 30m por movimento) por um dia inteiro. Se parar por mais de um minuto, o efeito acaba, causando desmaio e exaustão por 12 horas.",
          },
          {
            name: "Corvo",
            description:
              "[Sempre Ativa] Você rola dados extras iguais ao seu Nível de Escola para resistir à Contaminação das Terras Sombrias.",
          },
          {
            name: "Crisântemo",
            description:
              "[Sempre Ativa] Torna você imune aos efeitos prejudiciais do clima frio ou quente extremo (não protege contra fogo ou magias).",
          },
          {
            name: "Dragão",
            description:
              "Permite soprar um cone de fogo (Ação Complexa) que causa dano igual ao seu Anel de Fogo.",
          },
          {
            name: "Equilíbrio",
            description:
              "Aumenta ou diminui (à sua escolha) o ND de feitiços direcionados a você em um valor de (Nível de Escola x 2) + 5.",
          },
          {
            name: "Erupção",
            description:
              "Seus ataques desarmados são envoltos em chamas, causando dano extra igual ao seu Anel de Fogo + Nível de Escola.",
          },
          {
            name: "Escorpião",
            description:
              "Adiciona dados extras (+Nível de Escola) em testes de Furtividade. Dados de dano que explodirem atordoam automaticamente o alvo.",
          },
          {
            name: "Falcão",
            description:
              "Permite saltar uma distância imensa (Água x 7,5m) como uma Ação Complexa.",
          },
          {
            name: "Fênix",
            description:
              "Pode ser ativada 1 vez por semana se você tiver ao menos 1 Ponto de Vazio. Quando seus ferimentos descerem de nível, consome todo seu Vazio e cura instantaneamente um número de Ferimentos igual a (Nível de Escola x 10).",
          },
          {
            name: "Flor de Cerejeira",
            description:
              "Adiciona dados extras (+Nível de Escola) em todas as rolagens de Honra.",
          },
          {
            name: "Garça",
            description:
              "Concede dados de bônus (Ar + Nível de Escola) para rolagens Sociais durante 1 hora (cada dado dá +1k0). O limite máximo de dados usados em um único teste é igual ao seu Anel de Vazio.",
          },
          {
            name: "Ki-Rin",
            description:
              "Permite refazer qualquer rolagem uma vez por rodada, mantendo o melhor resultado.",
          },
          {
            name: "Leão",
            description:
              "Concede a você graduações em uma Perícia Bugei (Marcial) igual ao seu Nível de Escola. (Substitui sua graduação atual se o Nível da Escola for maior).",
          },
          {
            name: "Lobo",
            description:
              "Aguça os sentidos e concede Incrementos Livres (+Nível de Escola) em rolagens de Caça/Rastrear. O efeito dura um número de horas igual ao Nível de Escola.",
          },
          {
            name: "Louva-a-deus",
            description:
              "[Sempre Ativa] Torna você completamente imune a todos os efeitos de Medo.",
          },
          {
            name: "Máscara Branca",
            description:
              "Torna você imune a tentativas mágicas de ler sua mente. Além disso, aumenta o ND de quem tentar ler suas emoções ou avaliar sua honestidade em (+Vazio + Nível de Escola).",
          },
          {
            name: "Montanha",
            description:
              "Reduz todas as suas penalidades por ferimentos em (Nível de Escola + 2).",
          },
          {
            name: "Morcego",
            description:
              "Sente o ambiente intuitivamente, ignorando penalidades por escuridão ou cegueira (mas não supera furtividade ou invisibilidade mágica).",
          },
          {
            name: "Oceano",
            description:
              "[Sempre Ativa] Você não precisa mais de comida ou bebida. Ao ativar a tatuagem (1 vez a cada 3 dias), você descansa instantaneamente o equivalente a 8h de sono e recupera todos os Pontos de Vazio.",
          },
          {
            name: "Raiz de Flecha",
            description:
              "Cura você mesmo ou um aliado em um número de Feridas igual a (Nível de Escola x 5). Limite de 1 vez por dia por alvo.",
          },
          {
            name: "Rouxinol",
            description:
              "Adiciona um bônus numérico fixo (+Terra + Nível de Escola) ao resultado total de suas rolagens de Meditação.",
          },
          {
            name: "Sol",
            description:
              "Permite que você declare 1 Aumento a mais do que o seu limite normal permitiria em uma ação.",
          },
          {
            name: "Tartaruga",
            description:
              "Concede graduações em uma Perícia Alta, Mercante ou Baixa igual ao seu Nível de Escola. (Substitui sua graduação atual se o Nível da Escola for maior).",
          },
          {
            name: "Tempestade",
            description:
              "Manobras de Derrubar (Knockdown) custam 1 Aumento a menos (ou 2 a menos contra quadrúpedes). Em caso de sucesso, você soma (+Ar + Nível de Escola) no resultado do teste de Força contestado.",
          },
          {
            name: "Tigre",
            description:
              "Seus ataques desarmados imitam garras e ignoram a Redução de Dano do oponente até um valor igual ao seu Nível de Escola.",
          },
          {
            name: "Vazio",
            description:
              "Concede percepção das formas de vida ao seu redor em um raio de (Nível de Escola x 3m), revelando a posição de seres mesmo através de paredes, mas sem identificar detalhes específicos.",
          },
          {
            name: "Vento",
            description:
              "Concede 1 Ação Simples adicional por rodada (não pode ser usada para ataque) e seu movimento não é mais limitado ao seu (Anel de Água x 6m).",
          },
        ],
      },
    ],
  },

  forcasEspeciais: {
    label: "Forças Especiais",
    seal: "⚔",
    listLabel: "Organizações",
    items: [
      {
        id: "guarda-esmeralda",
        name: "Guarda Esmeralda",
        fullTitle: "A Guarda Esmeralda: Os Kenshinzen",
        glyph: "🛡",
        tagline:
          "Corpo de elite militar e investigativo que responde ao Campeão de Esmeralda.",
        description:
          "A Guarda Esmeralda é o corpo de elite militar e investigativo que responde diretamente ao Campeão de Esmeralda. Diferente dos exércitos dos Clãs, os Guardas Esmeralda possuem jurisdição absoluta, podendo atuar em qualquer território do Império de Esmeralda, independentemente de fronteiras clânicas. Seus membros mais temidos e respeitados são os Kenshinzen, samurais que uniram a maestria absoluta da espada (Kenjutsu) com o dever inabalável de aplicar a Lei Imperial.",
        tags: ["Kenjutsu", "Magistrados", "Imperial", "Esmeralda"],
        school: {
          name: "Escola Kenshinzen",
          skills: [
            "Kenjutsu",
            "Defesa",
            "Investigação (Notar)",
            "Esportes",
            "Etiqueta",
            "Intimidação",
            "qualquer 1 Perícia",
          ],
          equipment: [
            "Katana",
            "Wakizashi",
            "Armadura Leve",
            "Roupas Imperiais",
            "Kit de Investigação",
            "10 Kokus",
          ],
        },
        techniques: [
          {
            level: 1,
            levelLabel: "一",
            title: "O Coração da Espada (Ken no Kokoro)",
            intro:
              "O Kenshinzen não luta apenas contra o corpo do inimigo; ele governa o fluxo da justiça e da batalha. Ao entrar em harmonia absoluta com sua lâmina e com a Lei Imperial, o guarda antecipa as intenções criminosas e os movimentos adversários antes mesmo que o golpe seja desferido.",
            effects: [
              {
                name: "Mecânica",
                text: "Enquanto estiver empunhando armas de corte (Kenjutsu) e na Postura de Ataque, sua postura é tão impecável que intimida e confunde o agressor. Você soma o seu Rank de Honra ao seu Total de Defesa contra o primeiro ataque corpo a corpo recebido em cada rodada.",
              },
            ],
          },
          {
            level: 2,
            levelLabel: "二",
            title: "O Coração do Imperador",
            intro:
              "Como um soldado de elite treinado para emboscadas, capturas e vigilância em qualquer terreno do Império, o Kenshinzen desenvolve reflexos aguçados e uma leitura corporal impecável, tornando-se virtualmente impossível de ser pego desprevenido por criminosos ou traidores.",
            effects: [
              {
                name: "Mecânica",
                text: "Sempre que você for alvo de uma emboscada ou surpreendido em batalha por falhar em um teste de Investigação (Notar) / Percepção, seu treinamento tático se ativa imediatamente. Você tem direito a realizar um Segundo Teste usando Esportes / Agilidade. Se tiver sucesso neste segundo teste, você nega a surpresa, reage a tempo e não sofre as penalidades de ser surpreendido.",
              },
            ],
          },
          {
            level: 3,
            levelLabel: "三",
            title: "O Coração da Lei Implacável",
            intro:
              "No ápice de seu treinamento, o Kenshinzen combina sua agilidade física superior com a precisão cirúrgica de um executor imperial. Seus movimentos atléticos estendem-se diretamente para a letalidade de sua lâmina.",
            effects: [
              {
                name: "Mecânica",
                text: "A sua precisão marcial atinge o ápice. Você soma metade do seu Nível de Perícia em Esportes (arredondado para cima) ao total de todas as suas jogadas de ataque com armas de corte (Kenjutsu). Sua velocidade e controle corporal garantem que a justiça do Imperador seja rápida e infalível.",
              },
            ],
          },
        ],
      },
      {
        id: "oniwabanshu",
        name: "Oniwabanshu",
        fullTitle: "Oniwabanshu — Clã Escorpião",
        glyph: "🜂",
        tagline:
          "O Braço das Sombras do Imperador — mestres da ilusão e da sombra.",
        description:
          "A palavra tejina significa 'ilusão'. Por séculos, ela foi o segredo mais bem guardado do clã escorpião, mas sob o decreto de Bayushi, essa arte foi elevada a um novo patamar. No isolado Dojo da Lua Oculta, os Soshi e os Shosuro foram incumbidos de pesquisar a fundo as kage yakiin (Marcas da Sombra) para forjar shinobis superiores. Dessa linhagem de elite nasceu a Ordem Oniwabanshu — samurais escolhidos a dedo para servirem como o Braço das Sombras do Imperador.",
        tags: ["Tejina", "Sombra", "Escorpião", "Shinobi"],
        techniques: [
          {
            level: 1,
            levelLabel: "一",
            title: "A Arte de Tejina",
            intro:
              "O Oniwabanshu domina os fundamentos da manipulação sensorial, usando o poder da Sombra para dobrar a realidade ao redor de seus alvos.",
            effects: [
              {
                name: "Mecânica",
                text: "Você pode gastar 1 Espaço de Feitiço de Ar ou 1 de Vazio como uma Ação Simples para ativar uma das seguintes habilidades:",
                subEffects: [
                  {
                    name: "Manto da Noite (Toque)",
                    text: "Torna invisível um objeto não vivo (menor que você) por um número de horas igual ao seu Anel de Ar. O item ainda pode ser detectado magicamente via Teste Contestado (Percepção/Ar).",
                  },
                  {
                    name: "Rosto Oculto (Próprio)",
                    text: "Altera suas feições para parecer outra pessoa (mesmo gênero/porte) por horas iguais ao seu Anel de Ar. Observadores familiares podem tentar um Teste Contestado base 10 (Investigação/Percepção).",
                  },
                  {
                    name: "Conhecer a Mente (Curto)",
                    text: "Sente pensamentos superficiais e emoções do alvo por Rodadas iguais ao seu Anel de Ar. Enquanto ativo, você recebe +2k2 em testes de Perícia Social contra o alvo.",
                  },
                ],
              },
            ],
          },
          {
            level: 2,
            levelLabel: "二",
            title: "Sombras Desvanecentes",
            intro:
              "Como um verdadeiro mestre da ordem, o Oniwabanshu sabe que não ser atingido é a forma mais pura de domínio. Ele se dissolve no ar no momento exato do impacto.",
            effects: [
              {
                name: "Mecânica",
                text: "Sempre que você for alvo de um ataque ou efeito hostil, você pode gastar 1 Espaço de Feitiço de Ar como uma Ação Livre. O atacante deve refazer a rolagem de ataque e manter o menor resultado.",
              },
              {
                name: "Desvanecer em Sombras",
                text: "Se o ataque falhar, você pode se deslocar imediatamente uma distância igual ao seu Anel de Ar x 1,5 metros. Este movimento não provoca ataques de oportunidade.",
              },
            ],
          },
          {
            level: 3,
            levelLabel: "三",
            title: "Caminho da Sombra",
            intro:
              "O treinamento no Dojo da Lua Oculta permite que o samurai caminhe por onde outros apenas enxergam vácuo. A sombra torna-se sua visão e sua voz.",
            effects: [
              {
                name: "Olhos do Nada",
                text: "Você pode sacrificar um espaço de feitiço de qualquer Elemento para obter Visão Perfeita na escuridão absoluta por uma cena.",
              },
              {
                name: "Fluidez Sombria",
                text: "Você pode gastar 1 espaço de feitiço de Ar ou Vazio para ganhar +1k1 em qualquer teste de Furtividade, Prestidigitação ou Sinceridade (Engano).",
              },
              {
                name: "Limite",
                text: "Você não pode gastar mais espaços de feitiço desta forma do que o seu Nível de Habilidade da escola em um único teste.",
              },
            ],
          },
          {
            level: 4,
            levelLabel: "四",
            title: "O Abraço da Escuridão",
            intro:
              "O Oniwabanshu torna-se um fantasma entre os homens. Suas ilusões são tão densas que drenam a vontade de lutar daqueles que as presenciam.",
            effects: [
              {
                name: "Presença Dissolvente",
                text: "Alvos tentando resistir às suas habilidades de Tejina sofrem uma penalidade de -1k1 em seus Testes Resistidos.",
              },
              {
                name: "Mestria de Tejina",
                text: "Você pode manter os efeitos de Rosto Oculto e Manto da Noite ativos simultaneamente sem precisar gastar ações para concentração.",
              },
            ],
          },
          {
            level: 5,
            levelLabel: "五",
            title: "Desvelar a Sombra",
            intro:
              "Os místicos das Sombras aprendem a discernir e quebrar as ilusões do Nada, revelando as mentiras da Sombra.",
            effects: [
              {
                name: "Expor a Verdade",
                text: "Como Ação Simples, você pode gastar 1 Ponto de Vazio para tentar expor a verdadeira forma de qualquer Filho da Sombra ou lacaio do Nada dentro da sua visão. Realize uma Jogada Contestada de Vazio contra a Força de Vontade do alvo. Com sucesso, a criatura é revelada como realmente é e não pode reassumir sua forma ilusória enquanto permanecer sob sua observação.",
              },
              {
                name: "Ataque Verdadeiro",
                text: "Como Ação Livre, você pode gastar 1 Ponto de Vazio junto a um espaço de feitiços ao fazer um ataque físico. Esse efeito ignora as resistências e imunidades normais de criaturas ligadas ao Nada.",
              },
            ],
          },
        ],
      },
    ],
  },

  regras: {
    label: "Regras",
    seal: "📖",
    listLabel: "Tópicos",
    items: [
      {
        id: "progressao-xp",
        name: "Sistema de Progressão de XP",
        glyph: "📘",
        tagline:
          "Custo fixo para atributos e fórmula para perícias — quanto custa evoluir.",
        description:
          "A progressão de personagens é governada por Pontos de Experiência (XP). Atributos e Vazio possuem custo fixo, enquanto perícias seguem uma fórmula baseada no nível atual.",
        tags: ["Progressão", "Atributos", "Perícias"],
        ruleSections: [
          {
            title: "Atributos",
            text: "Custo fixo para qualquer ponto de atributo ou Vazio.",
            items: [
              "1 ponto de Atributo = 50 XP",
              "1 ponto de Vazio = 50 XP",
            ],
          },
          {
            title: "Perícias",
            text: "Fórmula de custo baseada no nível atual da perícia.",
            items: ["1 ponto de Perícia = 10 XP"],
          },
        ],
      },

      {
        id: "conjuracao",
        name: "Conjuração Shugenja e Dobra",
        glyph: "🔮",
        tagline:
          "A dificuldade de conjuração segue a fórmula TN = (5 × Rank) + 10.",
        description:
          "Todos os feitiços e dobras elementais usam a mesma fórmula de dificuldade. O TN aumenta conforme o rank da magia desejada.",
        tags: ["Conjuração", "TN", "Shugenja"],
        ruleSections: [
          {
            title: "Fórmula de Dificuldade",
            text: "TN = (5 × Rank da Magia) + 10",
          },
          {
            title: "Tabela de Referência",
            table: {
              headers: ["Rank da Magia", "TN"],
              rows: [
                ["Rank 1", "15"],
                ["Rank 2", "20"],
                ["Rank 3", "25"],
                ["Rank 4", "30"],
                ["Rank 5", "35"],
              ],
            },
          },
        ],
      },

      {
        id: "vazio",
        name: "Vazio",
        glyph: "⚪",
        tagline:
          "Recurso exclusivo de escolas treinadas — pode negar dano como ação livre.",
        description:
          "O Vazio é um recurso poderoso restrito a personagens treinados em escolas que concedem habilidades de uso de Vazio.",
        tags: ["Vazio", "Defesa", "Recurso"],
        ruleSections: [
          {
            items: [
              "Só pode ser usado por personagens treinados em escolas que concedem habilidades de uso de Vazio.",
              "Pode ser gasto como Ação Livre para negar 10 pontos de dano.",
            ],
          },
        ],
      },

      {
        id: "honra",
        name: "Honra",
        glyph: "🏵️",
        tagline:
          "Redutor de dano e vida extra à beira da morte.",
        description:
          "A Honra funciona como redutor de dano e concede vida extra quando o personagem chega a 0 PV.",
        tags: ["Honra", "Defesa", "Dano", "Vida Extra"],
        ruleSections: [
          {
            title: "Redutor de Dano",
            items: [
              "Com armadura: Metade do valor de Honra é adicionada ao redutor.",
              "Sem armadura: O valor integral de Honra atua como redutor de dano.",
            ],
          },
          {
            title: "Honra à Beira da Morte (Vida Extra)",
            text: "Ativado quando os PV chegam a 0. O jogador realiza um teste de Vigor com NA = 10 - Vigor do Personagem.",
            items: [
              "Efeito de Sucesso: Negar a inconsciência/morte e ganhar PV Extra temporários.",
              "Cálculo da Vida Extra: Valor de Honra atual + Rolagem do Dado de Classe Social.",
            ],
          },
          {
            title: "Tabela de Dados por Classe Social",
            table: {
              headers: ["Classe Social", "Dado"],
              rows: [
                ["Buke (Proletário)", "1d6"],
                ["Classes Religiosas (Monges/Shugenjas)", "1d8"],
                ["Buke (Aristocrata)", "1d10"],
              ],
            },
          },
        ],
      },

      {
        id: "iniciativa",
        name: "Iniciativa",
        glyph: "⚔️",
        tagline: "Valor fixo na ficha — Agilidade + Reflexos.",
        description:
          "A Iniciativa é um valor fixo e estático na ficha. O personagem com o maior valor age primeiro no turno.",
        tags: ["Iniciativa", "Combate"],
        ruleSections: [
          {
            title: "Fórmula",
            text: "Iniciativa = Agilidade + Reflexos",
          },
          {
            title: "Resolução",
            items: [
              "O personagem com o maior valor total age primeiro no turno.",
              "Desempate: Teste Disputado de Perícia de Ataque / Reflexos. Quem obtiver maior resultado assume a frente.",
            ],
          },
        ],
      },

      {
        id: "posturas",
        name: "Guia de Posturas e Combate",
        glyph: "⚔️",
        tagline:
          "Posturas táticas e a mecânica de Chanbara (Duelo).",
        description:
          "As posturas determinam como o personagem distribui seus recursos entre ataque e defesa. Chanbara é um atributo passivo que permite arrastar oponentes para duelos.",
        tags: ["Posturas", "Combate", "Chanbara", "Duelo"],
        ruleSections: [
          {
            title: "Ataque Total",
            text: "+2k1 em rolagens de Ataque e -2k1 em rolagens de Defesa.",
            items: [
              "Movimento: Reduz o deslocamento em Água -1.",
              "Restrições: Não permite defesa passiva e limita outras ações complexas.",
            ],
          },
          {
            title: "Ataque (Padrão)",
            text: "Tática padrão para escaramuças. Não possui bônus ou penalidades intrínsecas.",
            items: [
              "Movimento: Sem restrições de movimento.",
              "Restrições: Sem restrições de ações.",
            ],
          },
          {
            title: "Defesa (Foco em Equilíbrio)",
            text: "+1k1 no teste de Defesa e -1k1 no teste de Ataque.",
            items: [
              "Movimento: Reduz o deslocamento em Água -1.",
            ],
          },
          {
            title: "Defesa Total (Exclusiva Shugenja)",
            text: "+2k2 em todas as rolagens de Defesa.",
            items: [
              "Movimento: Reduz o deslocamento em Água -1.",
              "Restrições: Postura apenas para Shugenjas. Só é permitido conjurar feitiços; o personagem não pode realizar ataques físicos.",
            ],
          },
          {
            title: "Chanbara (Duelo)",
            text: "Atributo passivo: Status + Honra. Ação Complexa para evocar o oponente ao duelo.",
            items: [
              "Duelo MAIOR que o alvo: Oponente é obrigado a aceitar. Turno especial isolado.",
              "Duelo IGUAL ao alvo: Teste Disputado para definir o desfecho.",
              "Duelo MENOR que o alvo: Oponente escolhe se aceita ou recusa.",
              "Se recusar: Ambos perdem a ação deste turno.",
              "Uso: Uma vez por combate.",
            ],
          },
        ],
      },

      {
        id: "acoes",
        name: "Economia de Ações",
        glyph: "🕒",
        tagline:
          "Combinações permitidas de ações por turno e os três tipos de ação.",
        description:
          "Em seu turno, o personagem pode realizar diferentes combinações de ações. Cada tipo de ação permite certas atividades.",
        tags: ["Ações", "Combate", "Turno"],
        ruleSections: [
          {
            title: "Combinações por Turno",
            items: [
              "1 Ação Complexa + 1 Ação de Movimento",
              "2 Ações Simples + 1 Ação de Movimento",
              "2 Ações Simples + Ações Livres",
            ],
            text: "Nota: Cada Ação Livre só pode ser executada uma vez por rodada, a menos que especificado o contrário.",
          },
          {
            title: "Ações Livres",
            items: [
              "Falar (curto)",
              "Sacar arma pequena",
              "Soltar itens",
              "Encordoar arco",
              "Levantar-se",
              "Movimento curto",
            ],
          },
          {
            title: "Ações Simples",
            items: [
              "Sacar arma média/grande",
              "Ativar Kata",
              "Proteger aliado",
              "Usar perícia (não-combate)",
              "Movimento médio",
            ],
          },
          {
            title: "Ações Complexas",
            items: [
              "Realizar ataque (corpo a corpo ou distância)",
              "Conjurar feitiços",
              "Manobras",
            ],
          },
        ],
      },

      {
        id: "movimentacao",
        name: "Movimentação e Terreno",
        glyph: "🏃",
        tagline:
          "Distâncias percorridas por tipo de ação e penalidades de terreno.",
        description:
          "A distância percorrida depende do tipo de ação dedicada ao movimento. O mapa de batalha usa quadrados de 1,5m.",
        tags: ["Movimentação", "Terreno", "Mapa"],
        ruleSections: [
          {
            title: "Distâncias",
            items: [
              "Quadrado no mapa de batalha = 1,5m",
              "Ação Movimento: Anel de Água × 1,5m",
              "Máximo por Rodada: Até 6 × Anel de Água (salvo bônus extras)",
            ],
          },
          {
            title: "Modificadores de Terreno",
            items: [
              "Básico (Ruas, planícies): Sem penalidades.",
              "Moderado (Grama alta, subidas): Água conta como -1 nível (mín. 1).",
              "Difícil (Selva, pântano): Água conta como -2 níveis (mín. 1). O mestre pode aplicar -5 ou -10 em testes físicos.",
            ],
          },
        ],
      },

      {
        id: "combate",
        name: "Sistema de Combate",
        glyph: "🛡️",
        tagline:
          "Testes contestados, opções de defesa e regras para duas armas.",
        description:
          "O combate é resolvido com Testes Contestados entre atacante e defensor. O empate favorece a defesa.",
        tags: ["Combate", "Ataque", "Defesa", "Armas"],
        ruleSections: [
          {
            title: "Ataque",
            text: "Fórmula: Perícia de Arma / Agilidade",
          },
          {
            title: "Defesa",
            text: "O defensor escolhe como reagir ao ataque:",
            items: [
              "Aparar: Perícia de Arma / Reflexo — Usa sua arma para desviar o golpe.",
              "Bloquear: Perícia de Defesa / Vigor — Absorve o impacto com resistência ou armadura.",
              "Esquiva: Perícia de Atletismo / Agilidade — Evita o golpe com movimento.",
            ],
          },
          {
            title: "Ataques à Distância",
            text: "Flechas e similares: Caso escolha Aparar ou Esquivar, troca Reflexo por Percepção.",
          },
          {
            title: "Duas Armas — Penalidades",
            table: {
              headers: ["Arma", "Penalidade"],
              rows: [
                ["Arma Menor", "-5"],
                ["Arma Média", "-10"],
                ["Arma Maior", "-15"],
              ],
            },
          },
          {
            title: "Segundo Ataque",
            text: "Todo ataque que superar a jogada de defesa do inimigo por 30 ou mais tem direito a aplicar um segundo ataque no alvo.",
          },
        ],
      },

      {
        id: "emboscada",
        name: "Emboscada e Surpresas",
        glyph: "🌑",
        tagline:
          "Teste resistido entre Furtividade e Investigação — quem vence surpreende.",
        description:
          "Para realizar uma emboscada, o grupo escondido realiza um Teste Resistido contra o grupo que pode ser surpreendido.",
        tags: ["Emboscada", "Surpresa", "Furtividade"],
        ruleSections: [
          {
            title: "Teste Resistido",
            items: [
              "Atacante: Furtividade (Emboscada) / Agilidade",
              "Defensor: Investigação (Notar) / Percepção",
            ],
          },
          {
            title: "Efeitos da Vitória do Emboscador",
            items: [
              "Iniciativa: Apenas o grupo emboscador age na 1ª rodada.",
              "Restrições: O grupo emboscado não pode usar certas Posturas (como Defesa Total).",
              "Bônus: O grupo escondido ganha +1k1 no primeiro ataque.",
              "Penalidade: Os inimigos recebem -10 na Iniciativa durante toda a luta.",
            ],
          },
        ],
      },

      {
        id: "perigos-ambientais",
        name: "Perigos Ambientais",
        glyph: "⚠️",
        tagline: "Quedas, afogamento e outros riscos do mundo natural.",
        description:
          "O mundo oferece perigos que vão além do combate direto. Quedas e afogamento são ameaças reais a qualquer aventureiro.",
        tags: ["Ambiente", "Perigo", "Queda", "Afogamento"],
        ruleSections: [
          {
            title: "Queda",
            text: "1k1 de Ferimentos a cada 3 metros de queda.",
            items: [
              "Quedas menores que 3m normalmente não causam dano, a menos que o terreno seja perigoso (ex: pedras ou estacas).",
            ],
          },
          {
            title: "Afogamento",
            text: "Teste de Manutenção: Perícia Esportes (Natação) / Força (NA 15) por minuto para manter-se à tona. Em condições severas (mar agitado), o Mestre pode alterar o NA ou o atributo.",
            items: [
              "Falha: O personagem pode prender a respiração por um número de Rodadas igual ao seu Vigor.",
              "Dano de Asfixia: Após o limite de rodadas, sofre 2k2 de Ferimentos por Rodada e fica em estado Indefeso até ser salvo.",
            ],
          },
        ],
      },

      {
        id: "recuperacao",
        name: "Recuperação de Ferimentos",
        glyph: "🩹",
        tagline:
          "Descanso natural, tratamento ativo e ferimentos permanentes.",
        description:
          "A recuperação de ferimentos depende do descanso, de tratamento médico ou mágico, e pode resultar em cicatrizes permanentes.",
        tags: ["Cura", "Ferimentos", "Descanso"],
        ruleSections: [
          {
            title: "Descanso Natural",
            text: "O personagem recupera (Vigor × 2) + Nível de Habilidades em Ferimentos por noite de sono.",
          },
          {
            title: "Tratamento Ativo",
            text: "A cura pode ser acelerada através de Perícias Médicas ou Feitiços de cura.",
          },
          {
            title: "Ferimentos Permanentes",
            text: "Cicatrizes graves ou perda de membros não se curam naturalmente; seus efeitos mecânicos e narrativos ficam a critério do Mestre.",
          },
        ],
      },

      {
        id: "armas-divinas",
        name: "Armas Divinas",
        glyph: "⚡",
        tagline:
          "Tier lendário — armas de poder incomensurável que transcendem a forja terrena.",
        description:
          "Armas divinas são adquiridas apenas por intervenção direta das Fortunas ou dos Deuses Dragões.",
        tags: ["Armas", "Lendário", "Divino"],
        ruleSections: [
          {
            title: "Aquisição",
            text: "Só podem ser adquiridas por meio de intervenção direta das Fortunas ou dos Deuses Dragões.",
          },
          {
            title: "Dano Base",
            text: "O dado de ataque salta imediatamente para 1d20, independente do tamanho original da arma.",
          },
          {
            title: "Dado Auxiliar Ampliado",
            text: "Se a arma for uma Nemuranai (Desperta), o dado auxiliar (+1d4) aumenta dois níveis na escala de dados, virando 1d8.",
          },
          {
            title: "Propriedade Divina",
            text: "O dano deste armamento é considerado Jade para fins de explorar vulnerabilidades de criaturas maculadas.",
          },
          {
            title: "Exemplo",
            text: "Uma faca (Arma Leve) que se torne uma Arma Divina Desperta rolará 1d20 + 1d8 de dano.",
          },
        ],
      },

      {
        id: "po-de-jade",
        name: "Pó de Jade",
        glyph: "💎",
        tagline:
          "Medida paliativa para combater criaturas imunes a armas mundanas.",
        description:
          "Pó de Jade pode ser passado na lâmina para causar dano a criaturas que seriam invulneráveis.",
        tags: ["Item", "Jade", "Criaturas"],
        ruleSections: [
          {
            title: "Aplicação",
            text: "Passar o pó na lâmina, ponta de flecha ou clava exige uma Ação Complexa. O efeito dura até ser gasto, lavado ou consumido.",
          },
          {
            title: "Degradação por Impacto",
            text: "O pó vai se soltando da arma a cada golpe desferido com sucesso.",
            items: [
              "1º Acerto: Causa Dano Total.",
              "2º Acerto: Causa Metade (1/2) do Dano.",
              "3º Acerto: Causa Um Quarto (1/4) do Dano.",
              "Após o 3º Acerto: O pó esgota-se completamente.",
            ],
          },
          {
            title: "Degradação Ambiental",
            text: "Se exposto à corrupção dentro das Terras Sombrias, a Mácula consumirá o pó de jade da arma em 2 horas, mesmo que nenhum ataque seja feito.",
          },
        ],
      },

      {
        id: "habilidades-criaturas",
        name: "Habilidades Especiais (Criaturas)",
        glyph: "👹",
        tagline:
          "Efeitos sobrenaturais comumente encontrados em monstros e ameaças.",
        description:
          "Características especiais que definem o comportamento e as limitações de criaturas no combate.",
        tags: ["Criaturas", "Monstros", "Habilidades"],
        ruleSections: [
          {
            title: "Medo",
            text: "A criatura emana uma aura aterrorizante ativada automaticamente no começo de qualquer encontro. Obriga os oponentes a realizarem testes de resistência a Medo.",
          },
          {
            title: "Imenso",
            text: "Devido ao vasto tamanho ou anatomia monstruosa, a criatura é imune a ser Imobilizada ou a sofrer a manobra Derrubar. Ela também não pode iniciar imobilizações contra outros, a menos que possua Jiujutsu.",
          },
          {
            title: "Invulnerabilidade",
            text: "Ataques mundanos normais são inúteis. A criatura só sofre dano normal de feitiços, armas Nemuranais ou armas feitas de materiais sagrados (Jade, Cristal ou Obsidiana).",
            items: [
              "Qualquer outro tipo de ataque causará apenas 1 Ferimento fixo, independentemente do dano rolado.",
              "Se a criatura tiver Redução, a Invulnerabilidade é aplicada por último.",
            ],
          },
          {
            title: "Invulnerabilidade Parcial",
            text: "A criatura possui a regra de Invulnerabilidade normal, mas aplicada apenas a fontes específicas de dano indicadas em sua ficha (ex: Invulnerável a flechas, ou Invulnerável a fogo). Ataques vindos dessa fonte causam apenas 1 Ferimento.",
          },
          {
            title: "Invulnerabilidade Superior",
            text: "Possui todos os benefícios da Invulnerabilidade padrão, mas também ignora uma ou mais fontes mágicas que normalmente a feririam (ex: Invulnerabilidade Superior a Jade, ou a Feitiços de Ar).",
          },
        ],
      },

      {
        id: "sistema-armas",
        name: "Sistema de Armas",
        glyph: "🗡️",
        tagline:
          "Categorias de tamanho, atributos de arma e progressão de qualidade.",
        description:
          "As armas são divididas em três categorias de tamanho e possuem três atributos principais: Dureza, Resistência e Dano.",
        tags: ["Armas", "Combate", "Ferreiro"],
        ruleSections: [
          {
            title: "Atributos da Arma",
            items: [
              "Dureza: Define a solidez da arma. Derivado da qualidade do material.",
              "Resistência: Define a durabilidade antes de quebrar. Derivado da qualidade do material.",
              "Dano: Define o dado que será lançado no ataque. Derivado da qualidade do ferreiro.",
            ],
          },
          {
            title: "Escala de Dados",
            text: "1d4 → 1d6 → 1d8 → 1d10 → 1d12 → 1d20",
          },
          {
            title: "Tabela de Dano por Qualidade",
            table: {
              headers: ["Categoria", "Ruim", "Normal", "Superior", "Obra de Arte"],
              rows: [
                ["Leve", "1d4 - 2", "1d4", "1d6", "1d8"],
                ["Média", "1d6 - 3", "1d6", "1d8", "1d10"],
                ["Grande", "1d8 - 4", "1d8", "1d10", "1d12"],
              ],
            },
          },
          {
            title: "Qualidade Ruim",
            text: "Utiliza o dado base da categoria, mas sofre penalidade numérica igual à metade do valor máximo do dado (ex: 1d4 vira 1d4 - 2).",
          },
          {
            title: "Qualidade Superior",
            text: "Sobe 1 nível na escala de dados.",
          },
          {
            title: "Qualidade Obra de Arte",
            text: "Sobe 2 níveis na escala de dados (1 nível acima da Superior).",
          },
          {
            title: "Armas Desertas (Nemuranai)",
            text: "Artefatos místicos cujos espíritos (kami) foram acordados.",
            items: [
              "Bônus de Dano: Adiciona +1d4 diretamente à parada de dados de dano da arma.",
              "Efeito Místico: A arma passa a causar dano diretamente em espíritos.",
            ],
          },
          {
            title: "Exemplo",
            text: "Uma faca (Arma Leve) de qualidade Obra de Arte causa 1d8 de dano. Se se tornar Nemuranai, sua parada de dados final será 1d8 + 1d4.",
          },
        ],
      },
    ],
  },
};

// ── Flat category list ──────────────────────────────────────────────

export const ALL_CATEGORIES = Object.entries(DATA).map(([id, cat]) => ({
  id,
  ...cat,
}));
