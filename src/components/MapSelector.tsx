import type { MapConfig } from "../data/maps";

interface MapSelectorProps {
  maps: MapConfig[];
  activeMapId: string;
  onChange: (mapId: string) => void;
}

export default function MapSelector({ maps, activeMapId, onChange }: MapSelectorProps) {
  if (maps.length <= 1) return null;

  return (
    <select
      className="map-selector"
      value={activeMapId}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Selecionar mapa"
    >
      {maps.map((map) => (
        <option key={map.id} value={map.id}>
          {map.nome}
        </option>
      ))}
    </select>
  );
}
