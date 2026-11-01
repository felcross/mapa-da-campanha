import { useState, type ReactNode } from "react";
import HubScreen from "./components/hub/HubScreen";
import NoirIntro from "./components/classes/NoirIntro";
import ClassesView from "./components/classes/ClassesView";
import SessionGate from "./features/auth/SessionGate";
import { sheetEnabled } from "./featureFlag";
import "./styles/tokens.css";
import "./styles/noir.css";
import "./styles/hub.css";
import "./styles/classes.css";
import "./styles/auth.css";

type AppView = "hub" | "compendiumIntro" | "compendium" | "sheetHome" | "sheetCreator" | "sheetDetail";

function AppContent({
  view,
  setView,
}: {
  view: AppView;
  setView: (view: AppView) => void;
}): ReactNode {
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
      {view === "compendium" && <ClassesView onBack={() => setView("hub")} />}
    </>
  );
}

export default function App() {
  const [view, setView] = useState<AppView>("hub");

  const content = <AppContent view={view} setView={setView} />;

  // Flag off: site atual, sem rede, sem gate.
  if (!sheetEnabled()) return content;

  return <SessionGate>{content}</SessionGate>;
}
