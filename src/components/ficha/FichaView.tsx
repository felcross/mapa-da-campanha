import { useCallback, useState, type JSX } from "react";

interface FichaViewProps {
  onBack: () => void;
}

const DEFAULT_SKILLS = [
  "Defesa",
  "Kenjutsu",
  "Iaijutsu",
  "Etiqueta",
  "Sinceridade",
  "Atletismo",
  "Investigação",
];
const PRESETS = [
  "Atletismo",
  "Batalha",
  "Comércio",
  "Defesa",
  "Etiqueta",
  "Iaijutsu",
  "Investigação",
  "Kenjutsu",
  "Kyujutsu",
  "Sinceridade",
  "Meditação",
];

export default function FichaView({ onBack }: FichaViewProps) {
  const [skills, setSkills] = useState<string[]>([...DEFAULT_SKILLS, "", ""]);
  const [preset, setPreset] = useState("");
  const [customName, setCustomName] = useState("");

  const addSkill = useCallback(() => {
    const name = customName.trim();
    if (!name) return;
    setSkills((prev) => [...prev, name]);
    setCustomName("");
    setPreset("");
  }, [customName]);

  const removeSkill = useCallback((index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const updateSkill = useCallback((index: number, value: string) => {
    setSkills((prev) => prev.map((s, i) => (i === index ? value : s)));
  }, []);

  const handlePresetChange = useCallback((value: string) => {
    setPreset(value);
    if (value) setCustomName(value);
  }, []);

  return (
    <div className="ficha">
      {/* Força o encaixe perfeito na folha A4 em modo Paisagem (Landscape) */}
      <style>{`
        @page {
          size: A4 landscape;
          margin: 6mm;
        }
        @media print {
          .ficha__toolbar {
            display: none !important;
          }
          html, body {
            height: 100%;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden;
          }
          .ficha {
            margin: 0 !important;
            padding: 0 !important;
          }
          .ficha__sheet {
            zoom: 88%; /* Encolhe proporcionalmente para travar tudo na primeira página */
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>

      {/* Toolbar (hidden on print) */}
      <div className="ficha__toolbar">
        <div className="ficha__toolbarInner">
          <div className="ficha__toolbarLeft">
            <button className="ficha__backBtn" onClick={onBack}>
              ← Voltar ao Hub
            </button>
            <div className="ficha__skillAdder">
              <label htmlFor="fichaPreset">Perícias Prontas: </label>
              <select
                id="fichaPreset"
                value={preset}
                onChange={(e) => handlePresetChange(e.target.value)}
              >
                <option value="">-- Escolha ou digite ao lado --</option>
                {PRESETS.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
              <input
                type="text"
                id="fichaCustomSkill"
                placeholder="Nome personalizado"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addSkill();
                }}
              />
              <button className="ficha__addBtn" onClick={addSkill}>
                + Adicionar à Lista
              </button>
            </div>
          </div>
          <div className="ficha__toolbarRight">
            <button className="ficha__printBtn" onClick={() => window.print()}>
              Imprimir / Salvar PDF
            </button>
          </div>
        </div>
      </div>

      {/* Sheet */}
      <div className="ficha__sheet">
        {/* Header */}
        <table className="ficha__headerTable">
          <tbody>
            <tr>
              <td className="ficha__headerCell ficha__headerInfo">
                <div className="ficha__fieldRow">
                  <span className="ficha__fieldLabel">Nome:</span>
                  <span className="ficha__fieldLine" />
                </div>
                <div className="ficha__fieldRow">
                  <span className="ficha__fieldLabel">Clã:</span>
                  <span className="ficha__fieldLine" />
                </div>
                <div className="ficha__fieldRow">
                  <span className="ficha__fieldLabel">Escola:</span>
                  <span className="ficha__fieldLine" />
                </div>
              </td>
              <td className="ficha__headerCell ficha__headerStats">
                <div className="ficha__fieldRow">
                  <span className="ficha__fieldLabel">Nível:</span>
                  <span className="ficha__fieldLine" />
                </div>
                <div className="ficha__fieldRow">
                  <span className="ficha__fieldLabel">Experiência:</span>
                  <span className="ficha__fieldLine" />
                </div>
              </td>
              <td className="ficha__headerCell ficha__headerLogo">
                <div className="ficha__logoTitle">
                  Lenda dos
                  <br />
                  Cinco Anéis
                </div>
                <div className="ficha__logoSubtitle">FICHA DE PERSONAGEM</div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Faixa 1: Anéis */}
        <div className="ficha__strip">
          <RingCol color="earth" name="Terra" attrs={["Vigor", "Vontade"]} />
          <RingCol color="air" name="Ar" attrs={["Reflexos", "Consciência"]} />
          <RingCol color="water" name="Água" attrs={["Força", "Percepção"]} />
          <RingCol
            color="fire"
            name="Fogo"
            attrs={["Agilidade", "Inteligência"]}
          />
          <RingCol
            color="void"
            name="Vazio"
            attrs={["Pontos Gastos", "Vazio Temporário"]}
          />
        </div>

        {/* Faixa 3: Combate — bloco dourado unificado */}
        <div className="ficha__strip">
          <div className="ficha__col ficha__col--gold" style={{ flex: 1 }}>

            {/* Honra / Glória / Status / Corrupção / Duelo — em linha */}
            <div className="ficha__inlineGroup" style={{ marginBottom: 5 }}>
              <TitleRow name="Honra" />
              <TitleRowSub name="Glória" note="1 ponto por combate" />
              <TitleRowSub name="Status" note="Buke 1d6 / Kuge 1d10 / Monge 1d8" />
              <TitleRow name="Corrupção" />
              <TitleRowSub name="Duelo" note="(Status+Honra)" />
            </div>

            {/* Arma + Armadura — todos em linha horizontal */}
            <div className="ficha__inlineGroup ficha__weaponRow">
              <span className="ficha__title">Arma</span>
              <span className="ficha__blankLine ficha__blankLine--sm" />
              <TitleRow name="Dureza" />
              <TitleRow name="Resistência" />
              <TitleRow name="Dano" />
              <span className="ficha__vDivider" />
              <span className="ficha__title">Armadura</span>
              <span className="ficha__blankLine ficha__blankLine--sm" />
              <TitleRow name="Defesa" />
              <TitleRow name="Resistência" />
              <TitleRow name="Redução" />
            </div>

          </div>
        </div>

        {/* Main layout: Perícias + Vitalidade/Penalidades */}
        <table className="ficha__mainLayout">
          <tbody>
            <tr>
              <td className="ficha__colLeft">
                <div className="ficha__sectionHeading">Perícias</div>
                <table className="ficha__skillsTable">
                  <thead>
                    <tr>
                      <th className="ficha__colSch">Esc</th>
                      <th>Nome da Perícia</th>
                      <th className="ficha__colRank">Grau</th>
                      <th className="ficha__colTrait">Atributo</th>
                      <th className="ficha__colRoll">Rolagem</th>
                      <th>Ênfases e Maestria</th>
                      <th className="ficha__colAction"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {skills.map((skill, i) => (
                      <tr key={i}>
                        <td className="ficha__colSch">
                          <span
                            className="ficha__blankCenterLine"
                            style={{ width: 14 }}
                          />
                        </td>
                        <td
                          style={{
                            fontWeight: "bold",
                            color: "var(--ink)",
                            fontSize: "10.5px",
                          }}
                        >
                          <input
                            className="ficha__skillInput"
                            value={skill}
                            onChange={(e) => updateSkill(i, e.target.value)}
                            placeholder=""
                          />
                        </td>
                        <td className="ficha__colRank">
                          <span className="ficha__blankCenterLine" />
                        </td>
                        <td className="ficha__colTrait">
                          <span className="ficha__blankCenterLine" />
                        </td>
                        <td className="ficha__colRoll">
                          <span className="ficha__blankCenterLine" />
                        </td>
                        <td>
                          <span className="ficha__blankLine" />
                        </td>
                        <td className="ficha__colAction">
                          <button
                            className="ficha__removeBtn"
                            onClick={() => removeSkill(i)}
                          >
                            ✕
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>

              <td className="ficha__colRight">

                {/* Combate — Chanbara / Iniciativa / Ataque / Defesa */}
                <div className="ficha__boxTrack">
                  <div className="ficha__duelTag">Chanbara</div>
                  <div className="ficha__sub ficha__sub--tight">
                    <span className="ficha__subLabel ficha__subLabel--xl">Foco: Iniciativa / Vazio</span>
                    <span className="ficha__fieldLine" />
                  </div>
                  <div className="ficha__sub ficha__sub--tight">
                    <span className="ficha__subLabel ficha__subLabel--xl">Saque: Iaijutsu / Vazio</span>
                    <span className="ficha__fieldLine" />
                  </div>
                  <div className="ficha__duelRule">Regra: superar o Foco por 5+ concede 1k0 no Saque.</div>
                  <div className="ficha__sub ficha__sub--tight"><span className="ficha__title" style={{ minWidth: 52 }}>Iniciativa</span><span className="ficha__subLabel ficha__subLabel--xl">Reflexo + Agilidade</span><span className="ficha__fieldLine" /></div>
                  <div className="ficha__sub ficha__sub--tight"><span className="ficha__title" style={{ minWidth: 52 }}>Ataque</span><span className="ficha__subLabel ficha__subLabel--xl">Arma / Agilidade</span><span className="ficha__fieldLine" /></div>
                  <div className="ficha__sub ficha__sub--tight"><span className="ficha__title" style={{ minWidth: 52 }}>Defesa</span><span className="ficha__subLabel ficha__subLabel--xl">Aparar: Arma / Reflexo</span><span className="ficha__fieldLine" /></div>
                  <div className="ficha__sub ficha__sub--tight"><span style={{ minWidth: 52, display: 'inline-block' }} /><span className="ficha__subLabel ficha__subLabel--xl">Bloquear: Defesa / Vigor</span><span className="ficha__fieldLine" /></div>
                  <div className="ficha__sub ficha__sub--tight"><span style={{ minWidth: 52, display: 'inline-block' }} /><span className="ficha__subLabel ficha__subLabel--xl">Esquiva: Atletismo / Agilidade</span><span className="ficha__fieldLine" /></div>
                </div>

                <div className="ficha__boxTrack">
                  <div className="ficha__boxTitle">Vitalidade</div>
                  <div className="ficha__lifeFormula">
                    Vida = 18 × Terra (máx. 3 pontos) + Vigor
                  </div>
                  <div className="ficha__lifeRef">
                    <b>Terra 1</b> = 18 (metade 9) &nbsp;|&nbsp; <b>Terra 2</b>{" "}
                    = 36 (metade 18) &nbsp;|&nbsp; <b>Terra 3</b> = 54 (metade
                    27)
                  </div>
                  <TitleRow name="Vida Total (Base + Vigor)" />
                  <div className="ficha__lifeFormula">
                    Resistência = Vigor + Nível — golpes que você aguenta antes
                    de cansar
                  </div>
                  <TitleRow name="Resistência Total (Vigor + Nível)" />
                </div>

                <div className="ficha__boxTrack">
                  <div className="ficha__boxTitle">Penalidades</div>
                  <table className="ficha__penaltyTable">
                    <thead>
                      <tr>
                        <th>Condição</th>
                        <th>Penal.</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Resistência esgotada (cansado)</td>
                        <td>−1k0</td>
                      </tr>
                      <tr>
                        <td>Vida ≤ metade</td>
                        <td>−1k0</td>
                      </tr>
                      <tr>
                        <td>Vida ≤ metade + cansado</td>
                        <td>−1k0</td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                        <td>Máximo acumulado</td>
                        <td>−3k0</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Faixa 4: Posturas */}
        <div className="ficha__sectionHeading">Posturas</div>
        <div className="ficha__stancesStrip">
          <StanceCol
            title="Ataque Total"
            blocks={[
              { label: "Efeito", text: "+2k1 ATQ / -1k1 DEF." },
              { label: "Restrições", text: "Só pode atacar." },
            ]}
          />
          <StanceCol
            title="Defesa"
            blocks={[
              { label: "Efeito", text: "-1k1 ATQ / +1k1 DEF." },
              { label: "Movimento", text: "Água -1." },
            ]}
          />
          <StanceCol
            title="Defesa Total"
            note="Sacerdotes"
            blocks={[
              { label: "Efeito", text: "+2k2 DEF." },
              { label: "Movimento", text: "Água -2." },
            ]}
          />
          <StanceCol
            title="Chanbara"
            blocks={[
              { label: "Duelo Igual", text: "Contestado: 1d10 + Vazio." },
              { label: "Duelo Maior", text: "Entra em Duelo." },
              { label: "Restrições", text: "1x por batalha, corpo a corpo." },
            ]}
          />
          <StanceCol
            title="Segundo Ataque"
            blocks={[
              {
                label: "Regra",
                text: "Supere a defesa do inimigo por 30 ou mais.",
              },
            ]}
          />
          <StanceCol
            title="Ataques à Distância"
            blocks={[
              {
                label: "Regra",
                text: "Se Aparar ou Esquivar, troca por Percepção.",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------------
// Ícones SVG dos anéis
// -------------------------------------------------------------------

function IconTerra({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 3 L20 16 H4 Z" />
      <rect x="2" y="18" width="20" height="3" rx="1.5" />
    </svg>
  );
}

function IconAr({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4 8 Q10 3 16 8 Q20 11 16 14 Q12 17 14 20" />
      <path d="M4 14 Q8 11 11 13" />
    </svg>
  );
}

function IconAgua({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M2 9 Q5.5 5.5 9 9 Q12.5 12.5 16 9 Q19.5 5.5 23 9" />
      <path d="M2 16 Q5.5 12.5 9 16 Q12.5 19.5 16 16 Q19.5 12.5 23 16" />
    </svg>
  );
}

function IconFogo({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2 C12 2 7 8 7 13 C7 16.5 9.2 20 12 20 C14.8 20 17 16.5 17 13 C17 10.5 15 8 13.5 6 C13.5 6 14.5 10.5 12 11.5 C9.5 12.5 9.5 10 9.5 9 C9.5 6 12 2 12 2Z" />
    </svg>
  );
}

function IconVazio({ size = 22 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

const RING_ICONS: Record<string, JSX.Element> = {
  earth: <IconTerra />,
  air: <IconAr />,
  water: <IconAgua />,
  fire: <IconFogo />,
  void: <IconVazio />,
};

// -------------------------------------------------------------------
// Componentes auxiliares
// -------------------------------------------------------------------

function RingCol({
  color,
  name,
  attrs,
}: {
  color: string;
  name: string;
  attrs: string[];
}) {
  return (
    <div className={`ficha__col ficha__col--${color}`}>
      <div className="ficha__titleRow">
        <span
          className={`ficha__ringIcon ficha__ringIcon--${color}`}
          title={name}
        >
          {RING_ICONS[color]}
        </span>
        <div className="ficha__circle" />
      </div>
      {attrs.map((a) => (
        <div key={a} className="ficha__sub">
          <span className="ficha__subLabel">{a}</span>
          <div className="ficha__circleSm" />
        </div>
      ))}
    </div>
  );
}

function TitleRow({ name }: { name: string }) {
  return (
    <div className="ficha__titleRow">
      <span className="ficha__title">{name}</span>
      <div className="ficha__circle" />
    </div>
  );
}

function TitleRowSub({ name, sub, note }: { name: string; sub?: string; note?: string }) {
  return (
    <div className="ficha__titleRowStack">
      <div className="ficha__titleRow">
        <span className="ficha__title">
          {name}{note && <span className="ficha__titleNote"> {note}</span>}
        </span>
        <div className="ficha__circle" />
      </div>
      {sub && <div className="ficha__titleSub">{sub}</div>}
    </div>
  );
}

function StanceCol({
  title,
  note,
  blocks,
}: {
  title: string;
  note?: string;
  blocks: { label: string; text: string }[];
}) {
  return (
    <div className="ficha__stanceCol">
      <div className="ficha__stanceTitle">
        {title}
        {note && <span className="ficha__stanceNote"> ({note})</span>}
      </div>
      {blocks.map((b) => (
        <div key={b.label} className="ficha__stanceBlock">
          <b>{b.label}: </b>
          {b.text}
        </div>
      ))}
    </div>
  );
}