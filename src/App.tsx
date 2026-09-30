import { useState } from "react";
import HubScreen from "./components/hub/HubScreen";
import NoirIntro from "./components/classes/NoirIntro";
import ClassesView from "./components/classes/ClassesView";
import "./styles/tokens.css";
import "./styles/noir.css";
import "./styles/hub.css";
import "./styles/classes.css";

type AppView = "hub" | "compendiumIntro" | "compendium";

export default function App() {
  const [view, setView] = useState<AppView>("hub");

  return (
    <>
      {view === "hub" && (
        <HubScreen onSelectClasses={() => setView("compendiumIntro")} />
      )}
      {view === "compendiumIntro" && (
        <NoirIntro
          onEnter={() => setView("compendium")}
          onBack={() => setView("hub")}
        />
      )}
      {view === "compendium" && (
        <ClassesView onBack={() => setView("hub")} />
      )}
    </>
  );
}
