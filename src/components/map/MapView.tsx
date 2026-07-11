import { useCallback, useState } from "react";
import { maps } from "../../data/maps";
import type { POI } from "../../data/pois";
import MapSelector from "../MapSelector";
import MapCanvas from "../MapCanvas";
import POICard from "../POICard";

interface MapViewProps {
  onBack: () => void;
}

export default function MapView({ onBack }: MapViewProps) {
  const [headerHidden, setHeaderHidden] = useState(true);
  const [activeMapId, setActiveMapId] = useState(maps[0]?.id ?? "");
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleZoomChange = useCallback((zoomedIn: boolean) => {
    setHeaderHidden(zoomedIn);
  }, []);

  const handleMapChange = useCallback((mapId: string) => {
    setActiveMapId(mapId);
    setMenuOpen(false);
  }, []);

  return (
    <div className="mapProject">
      {/* Fixed nav bar — always visible, never auto-hides */}
      <nav className="mapProject__nav">
        <button
          className="mapProject__hamburger"
          aria-label="Menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(o => !o)}
        >
          ☰
        </button>
        <button className="mapProject__hubLink" onClick={onBack}>
          ← Hub
        </button>
      </nav>

      {/* Sliding menu panel */}
      {menuOpen && (
        <div className="mapProject__menuPanel">
          <div className="mapProject__menuPanelHeader">
            <span>Mapa da Campanha</span>
            <button className="mapProject__menuClose" onClick={() => setMenuOpen(false)}>✕</button>
          </div>
          <div className="mapProject__menuSection">
            <span className="mapProject__menuLabel">Mapa</span>
            <MapSelector maps={maps} activeMapId={activeMapId} onChange={handleMapChange} />
          </div>
          <button className="mapProject__menuHub" onClick={onBack}>
            ← Voltar ao Hub
          </button>
        </div>
      )}

      {/* Auto-hiding info header (title + hint only) */}
      <header className={`mapProject__header ${headerHidden ? "mapProject__header--hidden" : ""}`}>
        <h1 className="mapProject__title">Mapa da Campanha</h1>
        <p className="mapProject__hint">Arraste para explorar · Role o mouse para zoom · Clique nos marcadores</p>
      </header>

      <MapCanvas activeMapId={activeMapId} onZoomChange={handleZoomChange} onSelectPoi={setSelectedPoi} />
      <POICard poi={selectedPoi} onClose={() => setSelectedPoi(null)} />
    </div>
  );
}
