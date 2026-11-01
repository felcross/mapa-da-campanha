import { useState } from "react";
import type { CharacterSummary } from "../../../shared/schemas/api";
import { sheetStrings } from "./strings";

function CharacterImage({ src, alt }: { src: string | null; alt: string }) {
  const [failed, setFailed] = useState(false);
  const placeholder = "/locations/sem-imagem.svg";

  if (!src || failed) {
    return (
      <img
        className="characterCard__image"
        src={placeholder}
        alt=""
        loading="lazy"
      />
    );
  }

  return (
    <img
      className="characterCard__image"
      src={src}
      alt={alt}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );
}

interface CharacterCardProps {
  summary: CharacterSummary;
  onOpen: (id: string) => void;
}

export default function CharacterCard({ summary, onOpen }: CharacterCardProps) {
  const { labels } = sheetStrings;
  return (
    <button
      type="button"
      className="characterCard"
      onClick={() => onOpen(summary.id)}
    >
      <CharacterImage src={summary.imageUrl} alt={summary.name} />
      <span className="characterCard__name">{summary.name}</span>
      <span className="characterCard__summary">
        {labels.postura[summary.selections.postura]} · {labels.estilo[summary.selections.estilo]}
      </span>
      <span className="characterCard__summary">
        {labels.manobraEstilo[summary.selections.manobraEstilo]}
      </span>
    </button>
  );
}
