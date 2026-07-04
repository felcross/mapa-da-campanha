import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { maps } from "../data/maps";
import { pois, type POI } from "../data/pois";
import POIMarker from "./POIMarker";

const HEADER_HIDE_THRESHOLD = 1.6;

export interface MapCanvasProps {
  activeMapId: string;
  onZoomChange?: (zoomedIn: boolean) => void;
  onSelectPoi?: (poi: POI | null) => void;
}

export default function MapCanvas({ activeMapId, onZoomChange, onSelectPoi }: MapCanvasProps) {
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const [minScale, setMinScale] = useState(0.1);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout>>(null);
  const prevMapIdRef = useRef(activeMapId);

  const handleSelectPoi = useCallback((poi: POI | null) => {
    setSelectedPoi(poi);
    onSelectPoi?.(poi);
  }, [onSelectPoi]);

  const activeMap = useMemo(() => maps.find((m) => m.id === activeMapId) ?? maps[0], [activeMapId]);
  const mapWidth = activeMap.width;
  const mapHeight = activeMap.height;

  const filteredPois = useMemo(() => pois.filter((p) => p.mapId === activeMapId), [activeMapId]);

  const calculateFitScale = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 0.1;
    const scaleX = el.clientWidth / mapWidth;
    const scaleY = el.clientHeight / mapHeight;
    return Math.max(scaleX, scaleY);
  }, [mapWidth, mapHeight]);

  const fitToScreen = useCallback(
    (ref: ReactZoomPanPinchRef) => {
      const el = containerRef.current;
      if (!el) return;
      const fitScale = calculateFitScale();
      setMinScale(fitScale * 0.8);
      ref.setTransform(
        (el.clientWidth - mapWidth * fitScale) / 2,
        (el.clientHeight - mapHeight * fitScale) / 2,
        fitScale,
        0
      );
    },
    [calculateFitScale, mapWidth, mapHeight]
  );

  const handleInit = useCallback(
    (ref: ReactZoomPanPinchRef) => {
      transformRef.current = ref;
      fitToScreen(ref);
    },
    [fitToScreen]
  );

  const handleZoomChange = useCallback(
    (ref: ReactZoomPanPinchRef) => {
      const fitScale = calculateFitScale();
      onZoomChange?.(ref.state.scale > fitScale * HEADER_HIDE_THRESHOLD);
    },
    [calculateFitScale, onZoomChange]
  );

  // Reset when map changes
  useEffect(() => {
    if (prevMapIdRef.current !== activeMapId) {
      prevMapIdRef.current = activeMapId;
      setSelectedPoi(null);
      setIsMapLoaded(false);
    }
  }, [activeMapId]);

  // Refit after map image loads
  useEffect(() => {
    if (isMapLoaded && transformRef.current) {
      fitToScreen(transformRef.current);
    }
  }, [isMapLoaded, fitToScreen]);

  useEffect(() => {
    const handleResize = () => {
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
      resizeTimerRef.current = setTimeout(() => {
        if (transformRef.current) fitToScreen(transformRef.current);
      }, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeTimerRef.current) clearTimeout(resizeTimerRef.current);
    };
  }, [fitToScreen]);

  return (
    <div
      className="map-canvas"
      ref={containerRef}
      style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}
    >
      {!isMapLoaded && (
        <div className="map-loading">
          <div className="map-loading__spinner" />
          <span>Carregando mapa…</span>
        </div>
      )}

      <TransformWrapper
        key={activeMapId}
        initialScale={minScale}
        minScale={minScale}
        maxScale={4}
        limitToBounds={false}
        centerZoomedOut={true}
        centerOnInit={true}
        wheel={{ step: 0.12 }}
        doubleClick={{ disabled: true }}
        onInit={handleInit}
        onZoom={handleZoomChange}
      >
        {({ zoomIn, zoomOut }) => (
          <>
            <div className="map-controls" style={{ zIndex: 10 }}>
              <button onClick={() => zoomIn()} aria-label="Aproximar">
                +
              </button>
              <button onClick={() => zoomOut()} aria-label="Afastar">
                −
              </button>
              <button
                onClick={() => {
                  if (transformRef.current) fitToScreen(transformRef.current);
                }}
                aria-label="Restaurar visão"
              >
                ⤾
              </button>
            </div>

            <TransformComponent
              wrapperStyle={{ width: "100%", height: "100%" }}
              contentStyle={{ width: `${mapWidth}px`, height: `${mapHeight}px` }}
            >
              <div
                className="map-content-inner"
                style={{ position: "relative", width: mapWidth, height: mapHeight }}
              >
                <img
                  key={activeMapId}
                  src={activeMap.imagem}
                  alt={activeMap.nome}
                  className="map-image"
                  draggable={false}
                  style={{ width: "100%", height: "100%", display: "block" }}
                  onLoad={() => setIsMapLoaded(true)}
                />

                {filteredPois.map((poi) => (
                  <POIMarker
                    key={poi.id}
                    poi={poi}
                    onSelect={handleSelectPoi}
                    isActive={selectedPoi?.id === poi.id}
                  />
                ))}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}
