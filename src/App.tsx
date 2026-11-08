import { useState, type ReactNode } from "react";
import HubScreen from "./components/hub/HubScreen";
// [PAUSADO — NoirIntro] import NoirIntro from "./components/classes/NoirIntro";
import ClassesView from "./components/classes/ClassesView";
// [PAUSADO — Character Sheet] import SessionGate from "./features/auth/SessionGate";
// [PAUSADO — Character Sheet] import { sheetEnabled } from "./featureFlag";
import "./styles/tokens.css";
import "./styles/noir.css";
import "./styles/hub.css";
import "./styles/classes.css";
// [PAUSADO — Character Sheet] import "./styles/auth.css";
// [PAUSADO — Character Sheet] import "./styles/sheet.css";

// [PAUSADO — Character Sheet] Feature lazy-gated: com a flag off estes chunks nunca são carregados.
// [PAUSADO — Character Sheet] const SheetHome = lazy(() => import("./features/sheet/SheetHome"));
// [PAUSADO — Character Sheet] const SheetCreator = lazy(() => import("./features/sheet/SheetCreator"));
// [PAUSADO — Character Sheet] const SheetDetail = lazy(() => import("./features/sheet/SheetDetail"));

type AppView =
  | "hub"
  // [PAUSADO — NoirIntro] | "compendiumIntro"
  | "compendium";
// [PAUSADO — Character Sheet] | "sheetHome"
// [PAUSADO — Character Sheet] | "sheetCreator"
// [PAUSADO — Character Sheet] | "sheetDetail";

function AppContent({
  view,
  setView,
}: {
  view: AppView;
  setView: (view: AppView) => void;
}): ReactNode {
  // [PAUSADO — Character Sheet] const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <>
      {view === "hub" && (
        <HubScreen
          onSelectClasses={() => setView("compendium")}
          /* [PAUSADO — Character Sheet] sheetEntry={sheetEnabled() ? { onSelect: () => setView("sheetHome") } : undefined} */
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
      {/* [PAUSADO — Character Sheet]
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
      */}
    </>
  );
}

export default function App() {
  const [view, setView] = useState<AppView>("hub");

  const content = <AppContent view={view} setView={setView} />;

  // [PAUSADO — Character Sheet] Flag off: site atual, sem rede, sem gate.
  // [PAUSADO — Character Sheet] if (!sheetEnabled()) return content;
  // [PAUSADO — Character Sheet] return <SessionGate>{content}</SessionGate>;
  return content;
}
