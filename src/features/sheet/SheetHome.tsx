import { useCallback, useEffect, useState } from "react";
import type { CharacterSummary, ListResponse } from "../../../shared/schemas/api";
import { apiGet } from "../../api/client";
import { errorStateMessage } from "../auth/error";
import CharacterCard from "./CharacterCard";
import { sheetStrings } from "./strings";

type HomeState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; items: CharacterSummary[] };

interface SheetHomeProps {
  onCreate: () => void;
  onOpen: (id: string) => void;
}

export default function SheetHome({ onCreate, onOpen }: SheetHomeProps) {
  const [state, setState] = useState<HomeState>({ status: "loading" });

  const fetchList = useCallback(() => {
    apiGet<ListResponse<CharacterSummary>>("/characters?limit=50")
      .then((res) => setState({ status: "ready", items: res.data }))
      .catch((error: unknown) => {
        setState({ status: "error", message: errorStateMessage(error) });
      });
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  function handleRetry(): void {
    setState({ status: "loading" });
    fetchList();
  }

  return (
    <main className="sheetHome">
      <header className="sheetHome__header">
        <h1 className="sheetHome__title">{sheetStrings.homeTitle}</h1>
        <button type="button" className="sheetHome__create" onClick={onCreate}>
          {sheetStrings.createCta}
        </button>
      </header>

      {state.status === "loading" && (
        <p className="sheetHome__hint" role="status">
          {sheetStrings.loading}
        </p>
      )}

      {state.status === "error" && (
        <div className="sheetHome__hint">
          <p role="alert">{state.message}</p>
          <button type="button" className="sheetHome__create" onClick={handleRetry}>
            {sheetStrings.retry}
          </button>
        </div>
      )}

      {state.status === "ready" && state.items.length === 0 && (
        <>
          <p className="sheetHome__hint">{sheetStrings.emptyMessage}</p>
          <button type="button" className="sheetHome__create" onClick={onCreate}>
            {sheetStrings.createCta}
          </button>
        </>
      )}

      {state.status === "ready" && state.items.length > 0 && (
        <div className="sheetHome__grid">
          {state.items.map((item) => (
            <CharacterCard key={item.id} summary={item} onOpen={onOpen} />
          ))}
        </div>
      )}
    </main>
  );
}
