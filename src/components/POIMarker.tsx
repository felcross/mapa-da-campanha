import type { POI } from "../data/pois";

interface POIMarkerProps {
  poi: POI;
  onSelect: (poi: POI) => void;
  isActive: boolean;
}

export default function POIMarker({ poi, onSelect, isActive }: POIMarkerProps) {
  return (
    <button
      className={`poi-marker ${isActive ? "poi-marker--active" : ""}`}
      style={{ left: poi.x, top: poi.y }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(poi);
      }}
      aria-label={`Ver detalhes: ${poi.nome}`}
      title={poi.nome}
    >
      <span className="poi-marker__pulse" aria-hidden="true" />
      <svg
        className="poi-marker__icon"
        viewBox="0 0 24 24"
        width="22"
        height="22"
        aria-hidden="true"
      >
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          fill="currentColor"
        />
        <circle cx="12" cy="9" r="2.4" fill="#1c140b" />
      </svg>
    </button>
  );
}
