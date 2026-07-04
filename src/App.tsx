import { useCallback, useState } from "react";
import { maps } from "./data/maps";
import type { POI } from "./data/pois";
import MapSelector from "./components/MapSelector";
import MapCanvas from "./components/MapCanvas";
import POICard from "./components/POICard";
import "./styles.css";

export default function App() {
  const [headerHidden, setHeaderHidden] = useState(true);
  const [activeMapId, setActiveMapId] = useState(maps[0]?.id ?? "");
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);

  const handleZoomChange = useCallback((zoomedIn: boolean) => {
    setHeaderHidden(zoomedIn);
  }, []);

  return (
    <div className="app">
      <header className={`app__header ${headerHidden ? "app__header--hidden" : ""}`}>
        <h1 className="app__title">Mapa da Campanha</h1>
        <MapSelector maps={maps} activeMapId={activeMapId} onChange={setActiveMapId} />
        <p className="app__hint">Arraste para explorar · Role o mouse para zoom · Clique nos marcadores</p>
      </header>
      <MapCanvas activeMapId={activeMapId} onZoomChange={handleZoomChange} onSelectPoi={setSelectedPoi} />
      <POICard poi={selectedPoi} onClose={() => setSelectedPoi(null)} />
    </div>
  );
}
