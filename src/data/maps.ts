export interface MapConfig {
  id: string;
  nome: string;
  imagem: string;
  width: number;
  height: number;
}

// Adicione novos mapas aqui conforme colocar as imagens em /public/map/
// Apenas mapas com entrada aqui aparecem no dropdown.
export const maps: MapConfig[] = [
  {
    id: "mapa-principal",
    nome: "Mapa Principal",
    imagem: "/map/mapa.png",
    width: 1748,
    height: 1181,
  },
];
