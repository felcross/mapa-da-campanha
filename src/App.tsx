import { lazy, Suspense, useState, type ReactNode } from "react";
import HubScreen from "./components/hub/HubScreen";
// [PAUSADO — NoirIntro] import NoirIntro from "./components/classes/NoirIntro";
import ClassesView from "./components/classes/ClassesView";
import SessionGate from "./features/auth/SessionGate";
import { sheetEnabled } from "./featureFlag";
import "./styles/tokens.css";
import "./styles/noir.css";
import "./styles/hub.css";
import "./styles/classes.css";
import "./styles/auth.css";
import "./styles/sheet.css";

// Feature lazy-gated: com a flag off estes chunks nunca são carregados.
const SheetHome = lazy(() => import("./features/sheet/SheetHome"));
const SheetCreator = lazy(() => import("./features/sheet/SheetCreator"));
const SheetDetail = lazy(() => import("./features/sheet/SheetDetail"));

type AppView =
  | "hub"
  // [PAUSADO — NoirIntro] | "compendiumIntro"
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
          onSelectClasses={() => setView("compendium")}
          sheetEntry={
            sheetEnabled() ? { onSelect: () => setView("sheetHome") } : undefined
          }
        />
      )}
      {/* [PAUSADO — NoirIntro]
      {view === "compendiumIntro" && (
        <NoirIntro
          onEnter={() => setView("compendium")}
          onBack={() => setView("hub")}
        />
      )}
      */}
      {view === "compendium" && <ClassesView onBack={() => setView("hub")} />}
      {view === "sheetHome" && (
        <Suspense fallback={null}>
          <SheetHome
            onCreate={() => setView("sheetCreator")}
            onOpen={(id) => {
              setSelectedId(id);
              setView("sheetDetail");
            }}
          />
        </Suspense>
      )}
      {view === "sheetCreator" && (
        <Suspense fallback={null}>
          <SheetCreator
            onDone={() => setView("sheetHome")}
            onCancel={() => setView("sheetHome")}
          />
        </Suspense>
      )}
      {view === "sheetDetail" && selectedId && (
        <Suspense fallback={null}>
          <SheetDetail
            characterId={selectedId}
            onBack={() => setView("sheetHome")}
            onDeleted={() => setView("sheetHome")}
          />
        </Suspense>
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
