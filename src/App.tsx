import { useState } from "react";
import HubScreen from "./components/hub/HubScreen";
import ClassesView from "./components/classes/ClassesView";
import "./styles/tokens.css";
import "./styles/hub.css";
import "./styles/classes.css";

type AppView = "hub" | "compendium";

export default function App() {
  const [view, setView] = useState<AppView>("hub");

  return (
    <>
      {view === "hub" && (
        <HubScreen onSelectClasses={() => setView("compendium")} />
      )}
      {view === "compendium" && (
        <ClassesView onBack={() => setView("hub")} />
      )}
    </>
  );
}
