import { useEffect, useRef, useState, useCallback } from "react";
import type { POI } from "../data/pois";

interface POICardProps {
  poi: POI | null;
  onClose: () => void;
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function POICard({ poi, onClose }: POICardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);

  const images = poi?.imagens ?? [];
  const hasMultiple = images.length > 1;
  const prevPoiIdRef = useRef(poi?.id);

  if (poi?.id !== prevPoiIdRef.current) {
    prevPoiIdRef.current = poi?.id;
    setCurrentIndex(0);
  }

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  }, [images.length]);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  }, [images.length]);

  // Focus trap + keyboard nav
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

  // Touch swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goNext(); else goPrev();
    }
  };

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

        <div
          className="poi-card__carousel"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="poi-card__carousel-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((src, i) => (
              <img
                key={`${poi.id}-${i}`}
                className="poi-card__slide"
                src={src}
                alt={`${poi.nome} - imagem ${i + 1}`}
                draggable={false}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/locations/sem-imagem.svg";
                }}
              />
            ))}
          </div>

          {hasMultiple && (
            <>
              <button className="poi-card__carousel-prev" onClick={goPrev} aria-label="Imagem anterior">
                ‹
              </button>
              <button className="poi-card__carousel-next" onClick={goNext} aria-label="Próxima imagem">
                ›
              </button>
              <div className="poi-card__carousel-dots">
                {images.map((_, i) => (
                  <button
                    key={i}
                    className={`poi-card__dot ${i === currentIndex ? "poi-card__dot--active" : ""}`}
                    onClick={() => setCurrentIndex(i)}
                    aria-label={`Imagem ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
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
