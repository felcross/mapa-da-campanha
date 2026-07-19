interface HubScreenProps {
  onSelectMap: () => void;
  onSelectClasses: () => void;
  onSelectFicha: () => void;
  onSelectPericias: () => void;
  onSelectArmas: () => void;
}

export default function HubScreen({ onSelectMap, onSelectClasses, onSelectFicha, onSelectPericias, onSelectArmas }: HubScreenProps) {
  return (
    <div className="hub">
      <h1 className="hub__title">Campanha Nihongan</h1>
      <p className="hub__subtitle">Ferramentas do Mestre V 1.11</p>
      <div className="hub__cards">
        <button className="hub__card hub__card--map" onClick={onSelectMap}>
          <span className="hub__cardIcon">🗺</span>
          <span className="hub__cardTitle">Mapa</span>
        </button>
        <button className="hub__card hub__card--classes" onClick={onSelectClasses}>
          <span className="hub__cardIcon">侍</span>
          <span className="hub__cardTitle">Compendium</span>
        </button>
        <button className="hub__card hub__card--ficha" onClick={onSelectFicha}>
          <span className="hub__cardIcon">📋</span>
          <span className="hub__cardTitle">Ficha</span>
        </button>
        <button className="hub__card hub__card--pericias" onClick={onSelectPericias}>
          <span className="hub__cardIcon">⚔</span>
          <span className="hub__cardTitle">Perícias</span>
        </button>
        <button className="hub__card hub__card--armas" onClick={onSelectArmas}>
          <span className="hub__cardIcon">🗡</span>
          <span className="hub__cardTitle">Armas</span>
        </button>
      </div>
    </div>
  );
}
