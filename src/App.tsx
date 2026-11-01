import { useState, type ReactNode } from "react";
import HubScreen from "./components/hub/HubScreen";
import NoirIntro from "./components/classes/NoirIntro";
import ClassesView from "./components/classes/ClassesView";
import SessionGate from "./features/auth/SessionGate";
import SheetHome from "./features/sheet/SheetHome";
import SheetCreator from "./features/sheet/SheetCreator";
import SheetDetail from "./features/sheet/SheetDetail";
import { sheetEnabled } from "./featureFlag";
import "./styles/tokens.css";
import "./styles/noir.css";
import "./styles/hub.css";
import "./styles/classes.css";
import "./styles/auth.css";
import "./styles/sheet.css";

type AppView =
  | "hub"
  | "compendiumIntro"
  | "compendium"
  | "sheetHome"
  | "sheetCreator"
  | "sheetDetail";

function AppContent({
  view,
  setView,
}: {
  view: AppView;
  setView: (view: AppView) => void;
}): ReactNode {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      {view === "hub" && (
        <HubScreen
          onSelectClasses={() => setView("compendiumIntro")}
          sheetEntry={
            sheetEnabled() ? { onSelect: () => setView("sheetHome") } : undefined
          }
        />
      )}
      {view === "compendiumIntro" && (
        <NoirIntro
          onEnter={() => setView("compendium")}
          onBack={() => setView("hub")}
        />
      )}
      {view === "compendium" && <ClassesView onBack={() => setView("hub")} />}
      {view === "sheetHome" && (
        <SheetHome
          onCreate={() => setView("sheetCreator")}
          onOpen={(id) => {
            setSelectedId(id);
            setView("sheetDetail");
          }}
        />
      )}
      {view === "sheetCreator" && (
        <SheetCreator
          onDone={() => setView("sheetHome")}
          onCancel={() => setView("sheetHome")}
        />
      )}
      {view === "sheetDetail" && selectedId && (
        <SheetDetail
          characterId={selectedId}
          onBack={() => setView("sheetHome")}
          onDeleted={() => setView("sheetHome")}
        />
      )}
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
