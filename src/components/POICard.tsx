import { useEffect, useRef } from "react";
import type { POI } from "../data/pois";

interface POICardProps {
  poi: POI | null;
  onClose: () => void;
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function POICard({ poi, onClose }: POICardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!poi) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !cardRef.current) return;

      const focusable = cardRef.current.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKey);

    const card = cardRef.current;
    if (card) {
      const firstFocusable = card.querySelector<HTMLElement>(FOCUSABLE);
      firstFocusable?.focus();
    }

    return () => window.removeEventListener("keydown", handleKey);
  }, [poi, onClose]);

  if (!poi) return null;

  return (
    <div className="poi-overlay" onClick={onClose}>
      <div
        ref={cardRef}
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
