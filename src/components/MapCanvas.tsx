import { useCallback, useEffect, useRef, useState } from "react";
import {
  TransformWrapper,
  TransformComponent,
  type ReactZoomPanPinchRef,
} from "react-zoom-pan-pinch";
import { pois, type POI } from "../data/pois";
import POIMarker from "./POIMarker";
import POICard from "./POICard";

const MAP_WIDTH = 1748;
const MAP_HEIGHT = 1181;
const HEADER_HIDE_THRESHOLD = 1.6;

export interface MapCanvasProps {
  onZoomChange?: (zoomedIn: boolean) => void;
}

export default function MapCanvas({ onZoomChange }: MapCanvasProps) {
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const [minScale, setMinScale] = useState(0.1);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const calculateFitScale = useCallback(() => {
    const el = containerRef.current;
    if (!el) return 0.1;
    const scaleX = el.clientWidth / MAP_WIDTH;
    const scaleY = el.clientHeight / MAP_HEIGHT;
    return Math.max(scaleX, scaleY);
  }, []);

  const fitToScreen = useCallback(
    (ref: ReactZoomPanPinchRef) => {
      const el = containerRef.current;
      if (!el) return;
      const fitScale = calculateFitScale();
      setMinScale(fitScale * 0.8);
      ref.setTransform(
        (el.clientWidth - MAP_WIDTH * fitScale) / 2,
        (el.clientHeight - MAP_HEIGHT * fitScale) / 2,
        fitScale,
        0
      );
    },
    [calculateFitScale]
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
              contentStyle={{ width: `${MAP_WIDTH}px`, height: `${MAP_HEIGHT}px` }}
            >
              <div
                className="map-content-inner"
                style={{ position: "relative", width: MAP_WIDTH, height: MAP_HEIGHT }}
              >
                <img
                  src="/map/mapa.png"
                  alt="Mapa do mundo de campanha"
                  className="map-image"
                  draggable={false}
                  style={{ width: "100%", height: "100%", display: "block" }}
                  onLoad={() => setIsMapLoaded(true)}
                />

                {pois.map((poi) => (
                  <POIMarker
                    key={poi.id}
                    poi={poi}
                    onSelect={setSelectedPoi}
                    isActive={selectedPoi?.id === poi.id}
                  />
                ))}
              </div>
            </TransformComponent>
          </>
        )}
      </TransformWrapper>

      <POICard poi={selectedPoi} onClose={() => setSelectedPoi(null)} />
    </div>
  );
}
