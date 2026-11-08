import { useRef, useCallback } from "react";
// [PAUSADO — Character Sheet] import { useOptionalAuth } from "../../features/auth/useAuth";
// [PAUSADO — Character Sheet] import { strings } from "../../features/auth/strings";
// [PAUSADO — Character Sheet] import { sheetStrings } from "../../features/sheet/strings";

interface HubScreenProps {
  onSelectClasses: () => void;
  // [PAUSADO — Character Sheet] Presente quando a feature de ficha está ativa — renderiza o segundo card.
  // [PAUSADO — Character Sheet] sheetEntry?: { onSelect: () => void };
}

export default function HubScreen({ onSelectClasses }: HubScreenProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  // [PAUSADO — Character Sheet] const auth = useOptionalAuth();

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
      {/* [PAUSADO — Character Sheet]
      {auth ? (
        <button className="hub__logout" onClick={() => void auth.logout()}>
          {strings.auth.logout}
        </button>
      ) : null}
      */}
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

        {/* [PAUSADO — Character Sheet]
        {sheetEntry ? (
          <button
            className="hub__card hub__card--sheet"
            onClick={sheetEntry.onSelect}
          >
            <svg
              className="hub__cardIcon"
              viewBox="0 0 64 64"
              aria-hidden="true"
              focusable="false"
            >
              <circle cx="32" cy="32" r="30" fill="currentColor" />
              <circle cx="32" cy="22" r="10" fill="#05060a" />
              <path
                d="M14,52 C14,40 22,36 32,36 C42,36 50,40 50,52 Z"
                fill="#05060a"
              />
            </svg>
            <span className="hub__cardTitle">{sheetStrings.cardTitle}</span>
          </button>
        ) : null}
        */}
      </div>
    </div>
  );
}
