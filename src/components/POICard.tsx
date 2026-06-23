import { useEffect } from "react";
import type { POI } from "../data/pois";

interface POICardProps {
  poi: POI | null;
  onClose: () => void;
}

export default function POICard({ poi, onClose }: POICardProps) {
  // Fecha com a tecla Esc
  useEffect(() => {
    if (!poi) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [poi, onClose]);

  if (!poi) return null;

  return (
    <div className="poi-overlay" onClick={onClose}>
      <div
        className="poi-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="poi-card-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="poi-card__close" onClick={onClose} aria-label="Fechar">
          ✕
        </button>

        <div className="poi-card__image-wrap">
          <img
            className="poi-card__image"
            src={poi.imagem}
            alt={poi.nome}
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/locations/sem-imagem.svg";
            }}
          />
        </div>

        <div className="poi-card__body">
          <h2 id="poi-card-title" className="poi-card__title">
            {poi.nome}
          </h2>
          <p className="poi-card__desc">{poi.descricao}</p>
        </div>
      </div>
    </div>
  );
}
