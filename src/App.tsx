import { useState } from "react";
import HubScreen from "./components/hub/HubScreen";
import MapView from "./components/map/MapView";
import ClassesView from "./components/classes/ClassesView";
import FichaView from "./components/ficha/FichaView";
import "./styles/tokens.css";
import "./styles/hub.css";
import "./styles/map.css";
import "./styles/classes.css";
import "./styles/ficha.css";

type AppView = "hub" | "map" | "classes" | "ficha";

export default function App() {
  const [view, setView] = useState<AppView>("hub");

  return (
    <>
      {view === "hub" && (
        <HubScreen
          onSelectMap={() => setView("map")}
          onSelectClasses={() => setView("classes")}
          onSelectFicha={() => setView("ficha")}
        />
      )}
      {view === "map" && (
        <MapView onBack={() => setView("hub")} />
      )}
      {view === "classes" && (
        <ClassesView onBack={() => setView("hub")} />
      )}
      {view === "ficha" && (
        <FichaView onBack={() => setView("hub")} />
      )}
    </>
  );
}
