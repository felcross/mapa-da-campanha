import MapCanvas from "./components/MapCanvas";
import "./styles.css";

export default function App() {
  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">Mapa da Campanha</h1>
        <p className="app__hint">Arraste para explorar · Role o mouse para zoom · Clique nos marcadores</p>
      </header>
      <MapCanvas />
    </div>
  );
}
