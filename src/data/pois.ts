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

// Substitua os itens abaixo pelos seus pontos reais.
// Cole aqui as coordenadas (x, y) que você já extraiu.
export const pois: POI[] = [
  {
    id: "poi-001",
    x: 1627,
    y: 559,
    nome: "Vila de Kaeru",
    descricao:
      "Pequena vila pesqueira às margens do rio. Conhecida por seu mercado de peixes e pela hospitalidade dos seus moradores. Os PJs podem encontrar rumores sobre a Floresta Negra aqui.",
    imagem: "/locations/placeholder-1.jpg",
  },
  {
    id: "poi-002",
    x: 2400,
    y: 1600,
    nome: "Ruínas de Ashkar",
    descricao:
      "Antigas ruínas de um templo esquecido. Dizem que guardiões de pedra ainda protegem a câmara central. Local recomendado para grupos de nível intermediário.",
    imagem: "/locations/placeholder-2.jpg",
  },
  {
    id: "poi-003",
    x: 600,
    y: 2100,
    nome: "Taverna do Corvo Bêbado",
    descricao:
      "Ponto de encontro de mercenários e aventureiros. O taverneiro, Bram, sempre tem um trabalho ou outro para quem precisar de moedas.",
    imagem: "/locations/placeholder-3.jpg",
  },
];
