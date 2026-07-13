interface HubScreenProps {
  onSelectMap: () => void;
  onSelectClasses: () => void;
  onSelectFicha: () => void;
}

export default function HubScreen({ onSelectMap, onSelectClasses, onSelectFicha }: HubScreenProps) {
  return (
    <div className="hub">
      <h1 className="hub__title">Ferramentas do Mestre</h1>
      <p className="hub__subtitle">Campanha Nihongan L5R</p>
      <div className="hub__cards">
        <button className="hub__card hub__card--map" onClick={onSelectMap}>
          <span className="hub__cardIcon">🗺</span>
          <span className="hub__cardTitle">Mapa da Campanha</span>
          <p className="hub__cardDesc">Mapa interativo com zoom, pan e pontos de interesse</p>
        </button>
        <button className="hub__card hub__card--classes" onClick={onSelectClasses}>
          <span className="hub__cardIcon">侍</span>
          <span className="hub__cardTitle">Compendium de Classes</span>
          <p className="hub__cardDesc">Samurai, Sacerdotes, técnicas, feitiços e domínios</p>
        </button>
        <button className="hub__card hub__card--ficha" onClick={onSelectFicha}>
          <span className="hub__cardIcon">📋</span>
          <span className="hub__cardTitle">Ficha Download</span>
          <p className="hub__cardDesc">Ficha de personagem L5R para impressão e PDF</p>
        </button>
      </div>
    </div>
  );
}
