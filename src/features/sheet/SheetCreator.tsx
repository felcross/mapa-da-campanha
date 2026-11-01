import { useState } from "react";
import type { CharacterData } from "../../../shared/schemas/character";
import type { CharacterRecord } from "../../../shared/schemas/api";
import { apiSend } from "../../api/client";
import { errorStateMessage } from "../auth/error";
import CharacterForm from "./CharacterForm";
import { sheetStrings } from "./strings";

interface SheetCreatorProps {
  onDone: () => void;
  onCancel: () => void;
}

export default function SheetCreator({ onDone, onCancel }: SheetCreatorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(data: CharacterData): Promise<void> {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      await apiSend<CharacterRecord>("/characters", "POST", data);
      onDone();
    } catch (error) {
      setErrorMessage(errorStateMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="sheetScreen">
      <h1 className="sheetScreen__title">{sheetStrings.createTitle}</h1>
      <CharacterForm
        submitLabel={sheetStrings.saveCta}
        onSubmit={(data) => void handleSubmit(data)}
        onCancel={onCancel}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
      />
    </main>
  );
}
