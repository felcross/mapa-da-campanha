interface NoirIntroProps {
  onEnter: () => void;
  onBack: () => void;
}

function YinYangSymbol() {
  // SVG em vez de ☯️: render idêntico em qualquer plataforma (spec §6)
  return (
    <svg
      className="noirIntro__sym"
      viewBox="0 0 64 64"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="32" cy="32" r="30" fill="#c9d4e6" />
      <path
        d="M32,2 A30,30 0 0,1 32,62 A15,15 0 0,1 32,32 A15,15 0 0,0 32,2"
        fill="#05060a"
      />
      <circle cx="32" cy="17" r="5" fill="#c9d4e6" />
      <circle cx="32" cy="47" r="5" fill="#05060a" />
    </svg>
  );
}

export default function NoirIntro({ onEnter, onBack }: NoirIntroProps) {
  return (
    <div className="noirIntro">
      <main className="noirIntro__panel">
        <div className="noirIntro__tag">
          <button type="button" className="noirIntro__back" onClick={onBack}>
            // SYS.NOIR_v0.1 · hub
          </button>
          <b>● ONLINE</b>
        </div>

        <h1 className="noirIntro__title" data-t="Frase-Chave do Sistema">
          <YinYangSymbol />
          Frase-Chave do Sistema
        </h1>

        <div className="noirIntro__lines">
          <p>
            <em>Yin</em> encontra <em>Yin</em>.
          </p>
          <p>
            <span className="y">Yang</span> encontra <span className="y">Yang</span>.
          </p>
          <p>
            <span className="c">Chi</span> une os dois.
          </p>
          <p>CPP transforma intenção em potência.</p>
          <p>Fa Jin transforma potência em destruição.</p>
          <p className="final">A Harmonia transforma o lutador.</p>
        </div>

        <button type="button" className="noirIntro__enter" onClick={onEnter}>
          &gt; acessar compêndio_
        </button>

        <div className="noirIntro__foot">
          &gt; aguardando input<span>_</span>
        </div>
      </main>
    </div>
  );
}
