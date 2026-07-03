// Tipo de cada Ponto de Interesse (POI) no mapa.
// x e y são coordenadas em PIXELS DA IMAGEM ORIGINAL do mapa
// (não da tela!) — exatamente como você já extraiu com o Gemini.
export interface POI {
  id: string;
  x: number;
  y: number;
  nome: string;
  descricao: string;
  imagem: string; // caminho relativo à pasta /public, ex: "/locations/taverna.jpg"
}

export const pois: POI[] = [
  {
    id: "clan-urso",
    x: 530,
    y: 218,
    nome: "Clã do Urso",
    descricao:
      "Guerreiros brutais e resistentes que dominam as montanhas do norte. Conhecidos por sua força descomunal e lealdade inabalável aos seus.",
    imagem: "/locations/sem-imagem.svg",
  },
  {
    id: "clan-lobo",
    x: 277,
    y: 52,
    nome: "Clã do Lobo",
    descricao:
      "Caçadores ágeis e silenciosos que percorrem as planícies geladas. Trabalham em matilhas e são temidos pela sua brutalidade coordenada.",
    imagem: "/locations/sem-imagem.svg",
  },
  {
    id: "clan-coruja",
    x: 383,
    y: 433,
    nome: "Clã da Coruja",
    descricao:
      "Estrategistas e estudiosos que habitam torres antigas. Guardiães do conhecimento proibido e mestres da espionagem.",
    imagem: "/locations/sem-imagem.svg",
  },
  {
    id: "clan-vagalume",
    x: 458,
    y: 1037,
    nome: "Clã do Vagalume",
    descricao:
      "Nômades místicos que vagueiam pelas florestas encantadas. Dizem que podem se comunicar com o mundo espiritual.",
    imagem: "/locations/sem-imagem.svg",
  },
  {
    id: "clan-tigre",
    x: 70,
    y: 922,
    nome: "Clã do Tigre",
    descricao:
      "Predadores solitários e orgulhosos das selvas do sul. Cada membro é um combatente formidável por conta própria.",
    imagem: "/locations/sem-imagem.svg",
  },
  {
    id: "clan-garca",
    x: 266,
    y: 860,
    nome: "Clã da Garça",
    descricao:
      "Viajantes eleganttes e diplomatas das regiões costeiras. Conhecidos por sua habilidade em comércio e negociação.",
    imagem: "/locations/sem-imagem.svg",
  },
  {
    id: "clan-fenix",
    x: 784,
    y: 851,
    nome: "Clã da Fênix",
    descricao:
      "Renascidos das cinzas, este clã é reverenciado por sua resiliência. Suas cidades são forjadas em chamas e tradição.",
    imagem: "/locations/sem-imagem.svg",
  },
  {
    id: "clan-serpente",
    x: 1264,
    y: 726,
    nome: "Clã da Serpente",
    descricao:
      "Intrigantes e astutos manipuladores dos pântanos venenosos. Ninguém sabe verdadeiramente quais são suas intenções.",
    imagem: "/locations/sem-imagem.svg",
  },
  {
    id: "clan-escorpiao",
    x: 1151,
    y: 654,
    nome: "Clã do Escorpião",
    descricao:
      "Guerreiros despiadados do deserto escaldante. Atacam sem aviso e deixam poucos sobreviventes para contar a história.",
    imagem: "/locations/sem-imagem.svg",
  },
  {
    id: "clan-corvo",
    x: 1678,
    y: 425,
    nome: "Clã do Corvo",
    descricao:
      "Mensageiros e ladrões das cidades abandonadas. Sabe-se que trocam informações com todos — e com ninguém.",
    imagem: "/locations/sem-imagem.svg",
  },
  {
    id: "clan-dragao",
    x: 1552,
    y: 289,
    nome: "Clã do Dragão",
    descricao:
      "A linhagem mais poderosa e temida. Suas forjas criam armas lendárias e sua presença domina qualquer batalha.",
    imagem: "/locations/sem-imagem.svg",
  },
  {
    id: "clan-javali",
    x: 1659,
    y: 66,
    nome: "Clã do Javali",
    descricao:
      "Guerreiros impulsivos e destemidos das florestas densas. Atacam com fúria e são impossíveis de intimidar.",
    imagem: "/locations/sem-imagem.svg",
  },
  {
    id: "clan-tartaruga",
    x: 1263,
    y: 134,
    nome: "Clã da Tartaruga",
    descricao:
      "Defensores imbatíveis e pacientíssimos dos reinos costeiros. Suas fortalezas são consideradas inexpugnáveis.",
    imagem: "/locations/sem-imagem.svg",
  },
  {
    id: "clan-raposa",
    x: 1445,
    y: 111,
    nome: "Clã da Raposa",
    descricao:
      "Espiões e trapaceiros que prosperam nas sombras. Nenhum segredo permanece seguro por tempo demais perto deles.",
    imagem: "/locations/sem-imagem.svg",
  },
  {
    id: "clan-aranha",
    x: 1643,
    y: 852,
    nome: "Clã da Aranha",
    descricao:
      "Tecelões de redes complexas de intriga e comércio. Seus teatros de poder se estendem por todo o continente.",
    imagem: "/locations/sem-imagem.svg",
  },
];
