import { useEffect, useRef, useState } from "react";
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

export default function MapCanvas() {
  const [selectedPoi, setSelectedPoi] = useState<POI | null>(null);
  const [minScale, setMinScale] = useState(0.1);
  const containerRef = useRef<HTMLDivElement>(null);
  const transformRef = useRef<ReactZoomPanPinchRef | null>(null);

  const calculateFitScale = () => {
    const el = containerRef.current;
    if (!el) return 0.1;
    const scaleX = el.clientWidth / MAP_WIDTH;
    const scaleY = el.clientHeight / MAP_HEIGHT;
    
    // Mudamos para Math.max para agir como um "cover", garantindo que 
    // a imagem cubra toda a área visível do container sem deixar vazios.
    return Math.max(scaleX, scaleY);
  };

  const fitToScreen = (ref: ReactZoomPanPinchRef) => {
    const el = containerRef.current;
    if (!el) return;
    const fitScale = calculateFitScale();
    setMinScale(fitScale * 0.8); // Permite afastar um pouco mais que o padrão se quiser
    
    ref.setTransform(
      (el.clientWidth - MAP_WIDTH * fitScale) / 2,
      (el.clientHeight - MAP_HEIGHT * fitScale) / 2,
      fitScale,
      0
    );
  };

  const handleInit = (ref: ReactZoomPanPinchRef) => {
    transformRef.current = ref;
    fitToScreen(ref);
  };

  useEffect(() => {
    const handleResize = () => {
      if (transformRef.current) fitToScreen(transformRef.current);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="map-canvas" ref={containerRef} style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
      <TransformWrapper
        initialScale={minScale}
        minScale={minScale}
        maxScale={4}
        // Mudamos limitToBounds para false para que você possa arrastar livremente pelos cantos da imagem
        limitToBounds={false}
        centerZoomedOut={true}
        centerOnInit={true}
        wheel={{ step: 0.12 }}
        doubleClick={{ disabled: true }}
        onInit={handleInit}
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
                style={{ 
                  position: "relative", 
                  width: MAP_WIDTH, 
                  height: MAP_HEIGHT 
                }}
              >
                <img
                  src="/map/mapa.png"
                  alt="Mapa do mundo de campanha"
                  className="map-image"
                  draggable={false}
                  style={{ width: "100%", height: "100%", display: "block" }}
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