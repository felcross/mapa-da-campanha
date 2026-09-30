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
          <svg
            className="hub__cardIcon"
            viewBox="0 0 64 64"
            aria-hidden="true"
            focusable="false"
          >
            <circle cx="32" cy="32" r="30" fill="currentColor" />
            <path
              d="M32,2 A30,30 0 0,1 32,62 A15,15 0 0,1 32,32 A15,15 0 0,0 32,2"
              fill="#05060a"
            />
            <circle cx="32" cy="17" r="5" fill="currentColor" />
            <circle cx="32" cy="47" r="5" fill="#05060a" />
          </svg>
          <span className="hub__cardTitle">Compêndio</span>
        </button>
      </div>
    </div>
  );
}
