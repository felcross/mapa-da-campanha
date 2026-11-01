import { useCallback, useEffect, useState } from "react";
import type { CharacterData } from "../../../shared/schemas/character";
import type { CharacterRecord } from "../../../shared/schemas/api";
import { apiGet, apiSend } from "../../api/client";
import { errorStateMessage } from "../auth/error";
import CharacterForm from "./CharacterForm";
import { sheetStrings } from "./strings";

type DetailState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; record: CharacterRecord; editing: boolean };

interface SheetDetailProps {
  characterId: string;
  onBack: () => void;
  onDeleted: () => void;
}

function ReadView({ data }: { data: CharacterData }) {
  const s = sheetStrings;
  return (
    <dl className="sheetDetail__list">
      <div>
        <dt>{s.name}</dt>
        <dd>{data.name}</dd>
      </div>
      <div>
        <dt>{s.imageUrl}</dt>
        <dd>{data.imageUrl || "—"}</dd>
      </div>
      <div>
        <dt>{s.sectionAutoridades}</dt>
        <dd>
          {Object.entries(data.autoridades).map(([key, value]) => (
            <span key={key} className="sheetDetail__chip">
              {s.autoridades[key as keyof typeof s.autoridades]}: {value}
            </span>
          ))}
        </dd>
      </div>
      <div>
        <dt>{s.sectionResources}</dt>
        <dd>
          {s.resources.chi} {data.resources.chi.current}/{data.resources.chi.max} ·{" "}
          {s.resources.prana} {data.resources.prana.current}/{data.resources.prana.max} ·{" "}
          {s.resources.vida} {data.resources.vida.current}/{data.resources.vida.max}
        </dd>
      </div>
      <div>
        <dt>{s.sectionSelections}</dt>
        <dd>
          {s.labels.postura[data.selections.postura]} · {s.labels.estilo[data.selections.estilo]} ·{" "}
          {s.labels.manobraEstilo[data.selections.manobraEstilo]}
          {data.selections.manobrasEspeciais.length > 0 &&
            ` · ${data.selections.manobrasEspeciais
              .map((m) => s.labels.manobraEspecial[m])
              .join(", ")}`}
        </dd>
      </div>
      <div>
        <dt>{s.sectionDice}</dt>
        <dd>
          {s.dice.manobraEstilo} {data.diceProgression.manobraEstilo} · {s.dice.manobraEspecial}{" "}
          {data.diceProgression.manobraEspecial} · {s.dice.faJin} {data.diceProgression.faJin}
        </dd>
      </div>
      {data.notes ? (
        <div>
          <dt>{s.sectionNotes}</dt>
          <dd>{data.notes}</dd>
        </div>
      ) : null}
    </dl>
  );
}

export default function SheetDetail({ characterId, onBack, onDeleted }: SheetDetailProps) {
  const [state, setState] = useState<DetailState>({ status: "loading" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const s = sheetStrings;

  const load = useCallback(() => {
    apiGet<CharacterRecord>(`/characters/${characterId}`)
      .then((record) => setState({ status: "ready", record, editing: false }))
      .catch((error: unknown) =>
        setState({ status: "error", message: errorStateMessage(error) }),
      );
  }, [characterId]);

  useEffect(() => {
    load();
  }, [load]);

  async function handleUpdate(data: CharacterData): Promise<void> {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const updated = await apiSend<CharacterRecord>(
        `/characters/${characterId}`,
        "PUT",
        data,
      );
      setState({ status: "ready", record: updated, editing: false });
    } catch (error) {
      setErrorMessage(errorStateMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(): Promise<void> {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await apiSend(`/characters/${characterId}`, "DELETE");
      onDeleted();
    } catch (error) {
      setErrorMessage(errorStateMessage(error));
      setIsSubmitting(false);
      setConfirmingDelete(false);
    }
  }

  if (state.status === "loading") {
    return (
      <main className="sheetScreen">
        <p className="sheetScreen__hint" role="status">
          {s.loading}
        </p>
      </main>
    );
  }

  if (state.status === "error") {
    return (
      <main className="sheetScreen">
        <p role="alert" className="sheetScreen__hint">
          {state.message}
        </p>
        <button type="button" className="sheetScreen__back" onClick={onBack}>
          {s.backToHome}
        </button>
      </main>
    );
  }

  const { record, editing } = state;

  return (
    <main className="sheetScreen">
      <button type="button" className="sheetScreen__back" onClick={onBack}>
        {s.backToHome}
      </button>
      <h1 className="sheetScreen__title">{record.name}</h1>

      {errorMessage ? (
        <p role="alert" className="sheetForm__error sheetForm__error--global">
          {errorMessage}
        </p>
      ) : null}

      {editing ? (
        <CharacterForm
          initial={record.characterData}
          submitLabel={s.save}
          onSubmit={(data) => void handleUpdate(data)}
          onCancel={() => setState({ status: "ready", record, editing: false })}
          isSubmitting={isSubmitting}
          errorMessage={null}
        />
      ) : (
        <>
          <ReadView data={record.characterData} />
          <div className="sheetDetail__actions">
            <button
              type="button"
              className="sheetForm__submit"
              onClick={() => setState({ status: "ready", record, editing: true })}
            >
              {s.edit}
            </button>
            {!confirmingDelete ? (
              <button
                type="button"
                className="sheetDetail__delete"
                onClick={() => setConfirmingDelete(true)}
              >
                {s.delete}
              </button>
            ) : (
              <div className="sheetDetail__confirm" role="alertdialog" aria-label={s.deleteConfirmTitle}>
                <p className="sheetDetail__confirmTitle">{s.deleteConfirmTitle}</p>
                <p className="sheetScreen__hint">{s.deleteConfirmMessage}</p>
                <div className="sheetDetail__confirmActions">
                  <button
                    type="button"
                    className="sheetDetail__delete"
                    onClick={() => void handleDelete()}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? s.deleting : s.deleteConfirmYes}
                  </button>
                  <button
                    type="button"
                    className="sheetForm__cancel"
                    onClick={() => setConfirmingDelete(false)}
                    disabled={isSubmitting}
                  >
                    {s.deleteConfirmNo}
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}
