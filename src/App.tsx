import { useCallback, useState } from "react";
import MapCanvas from "./components/MapCanvas";
import "./styles.css";

export default function App() {
  const [headerHidden, setHeaderHidden] = useState(false);

  const handleZoomChange = useCallback((zoomedIn: boolean) => {
    setHeaderHidden(zoomedIn);
  }, []);

  return (
    <div className="app">
      <header className={`app__header ${headerHidden ? "app__header--hidden" : ""}`}>
        <h1 className="app__title">Mapa da Campanha</h1>
        <p className="app__hint">Arraste para explorar · Role o mouse para zoom · Clique nos marcadores</p>
      </header>
      <MapCanvas onZoomChange={handleZoomChange} />
    </div>
  );
}
