import { useRef, useCallback } from "react";

interface HubScreenProps {
  onSelectClasses: () => void;
}

export default function HubScreen({ onSelectClasses }: HubScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = useCallback(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  const handleMouseLeave = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
  }, []);

  return (
    <div className="hub">
      <h1 className="hub__title">AS SEIS HARMONIAS</h1>
      <p className="hub__subtitle">Livro do Jogador — Regras de Combate</p>

      <div className="hub__cards">
        <button
          className="hub__card hub__card--compendium"
          onClick={onSelectClasses}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <video
            ref={videoRef}
            className="hub__cardVideo"
            src="/compedium-video.mp4"
            muted
            loop
            playsInline
            preload="metadata"
          />
          <span className="hub__cardOverlay" />
          <span className="hub__cardIcon">☯</span>
          <span className="hub__cardTitle">Compêndio</span>
        </button>
      </div>
    </div>
  );
}
