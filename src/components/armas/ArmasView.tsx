import { useRef, useState, useCallback, useEffect } from "react";

interface ArmasViewProps {
  onBack: () => void;
}

interface MasteryLevel {
  level: number;
  description: string;
}

interface Weapon {
  name: string;
  specialRule?: string;
}

interface WeaponCategory {
  id: string;
  title: string;
  masteries: MasteryLevel[];
  weapons: Weapon[];
}

const CATEGORIES: WeaponCategory[] = [
  {
    id: "corrente",
    title: "Armas de Corrente",
    masteries: [
      { level: 3, description: "Podem ser usadas para iniciar uma Imobilização." },
      { level: 5, description: "Bônus de +1k0 em Testes Resistidos contra oponentes que estejam presos ou Imobilizados por suas armas." },
      { level: 7, description: "Incremento Livre para uso das Manobras Desarme ou Derrubar." },
    ],
    weapons: [
      { name: "Kusarigama" },
      { name: "Kyoketsu-shogi", specialRule: "Dobra o Bônus de NA fornecido pela armadura do alvo." },
      { name: "Manrikikusari" },
    ],
  },
  {
    id: "haste",
    title: "Armas de Haste",
    masteries: [
      { level: 3, description: "Durante a primeira rodada de uma luta, ganha um bônus de +5 ao Nível de Iniciativa." },
      { level: 5, description: "Avaliações de dano contra oponentes montados ou significativamente maiores são aumentadas em +1k0." },
      { level: 7, description: "Podem ser preparadas como Ação Livre." },
    ],
    weapons: [
      { name: "Bisento" },
      { name: "Nagamaki" },
      { name: "Naginata" },
      { name: "Sasumata", specialRule: "Pode ser usada para iniciar uma manobra de Agarrar/Imobilização." },
      { name: "Sodegarami", specialRule: "Pode ser usada para iniciar uma manobra de Agarrar/Imobilização." },
    ],
  },
  {
    id: "lamina",
    title: "Armas de Lâmina",
    masteries: [
      { level: 3, description: "Pode desembainhar a arma como Ação Livre." },
      { level: 5, description: "Aumenta o dano base da arma em +1k0 caso ataque no mesmo turno que a sacou." },
      { level: 7, description: "Acertos críticos causam sangramento no alvo, perdendo 2 ferimentos por rodada." },
    ],
    weapons: [
      { name: "Katana", specialRule: "Pode ser usada com duas mãos para receber +1k0 no dano." },
      { name: "Wakizashi" },
      { name: "Tanto", specialRule: "Pode ser escondida facilmente com um teste de Furtividade." },
      { name: "Nodachi" },
    ],
  },
  {
    id: "arco",
    title: "Armas de Arco",
    masteries: [
      { level: 3, description: "Diminui a penalidade por disparos a longas distâncias em 5." },
      { level: 5, description: "Pode disparar duas flechas no mesmo turno com penalidade de -10 em ambas as rolagens." },
      { level: 7, description: "Flechas ignoram 2 pontos de Redução de Dano (RD) do alvo." },
    ],
    weapons: [
      { name: "Yumi", specialRule: "Exige o uso das duas mãos e não pode ser disparado de montaria (a menos que possua técnica específica)." },
      { name: "Dai-kyu", specialRule: "Concede +1k0 no dano devido à grande tensão, mas exige Força 3." },
      { name: "Hankyu" },
    ],
  },
];

export default function ArmasView({ onBack }: ArmasViewProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = useCallback((index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const card = el.children[index] as HTMLElement;
    if (card) {
      card.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  }, []);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = el.children[0]?.getBoundingClientRect().width ?? 1;
    const index = Math.round(scrollLeft / cardWidth);
    setActiveIndex(Math.min(index, CATEGORIES.length - 1));
  }, []);

  const goPrev = useCallback(() => {
    const idx = Math.max(0, activeIndex - 1);
    setActiveIndex(idx);
    scrollTo(idx);
  }, [activeIndex, scrollTo]);

  const goNext = useCallback(() => {
    const idx = Math.min(CATEGORIES.length - 1, activeIndex + 1);
    setActiveIndex(idx);
    scrollTo(idx);
  }, [activeIndex, scrollTo]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="armas">
      <div className="armas__toolbar">
        <div className="armas__toolbarInner">
          <button className="armas__backBtn" onClick={onBack}>← Voltar ao Hub</button>
          <div className="armas__nav">
            <button className="armas__navBtn" onClick={goPrev} disabled={activeIndex === 0}>‹</button>
            <span className="armas__navIndicator">{activeIndex + 1} / {CATEGORIES.length}</span>
            <button className="armas__navBtn" onClick={goNext} disabled={activeIndex === CATEGORIES.length - 1}>›</button>
          </div>
        </div>
      </div>

      <div className="armas__carousel" ref={scrollRef}>
        {CATEGORIES.map((cat) => (
          <article key={cat.id} className="armas__card">
            <div className="armas__cardCorner armas__cardCorner--tl" />
            <div className="armas__cardCorner armas__cardCorner--tr" />
            <div className="armas__cardCorner armas__cardCorner--bl" />
            <div className="armas__cardCorner armas__cardCorner--br" />

            <h2 className="armas__cardTitle">{cat.title}</h2>
            <div className="armas__cardDivider">
              <div className="armas__cardDividerLine" />
              <div className="armas__cardDividerDot" />
              <div className="armas__cardDividerLine" />
            </div>

            <section className="armas__section">
              <h3 className="armas__sectionTitle">
                <span className="armas__sectionLine" />
                Maestrias
                <span className="armas__sectionLine armas__sectionLine--flex" />
              </h3>
              <ul className="armas__masteryList">
                {cat.masteries.map((m) => (
                  <li key={m.level} className="armas__masteryItem">
                    <span className="armas__masteryLevel">Nível {m.level}</span>
                    <span className="armas__masteryDesc">{m.description}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="armas__section">
              <h3 className="armas__sectionTitle">
                <span className="armas__sectionLine" />
                Armas
                <span className="armas__sectionLine armas__sectionLine--flex" />
              </h3>
              <ul className="armas__weaponList">
                {cat.weapons.map((w, i) => (
                  <li key={i} className="armas__weaponItem">
                    <span className="armas__weaponName">{w.name}</span>
                    {w.specialRule && (
                      <span className="armas__weaponRule">
                        <strong>Regra Especial:</strong> <em>{w.specialRule}</em>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </article>
        ))}
      </div>

      <div className="armas__dots">
        {CATEGORIES.map((cat, i) => (
          <button
            key={cat.id}
            className={`armas__dot ${i === activeIndex ? "armas__dot--active" : ""}`}
            onClick={() => { setActiveIndex(i); scrollTo(i); }}
            aria-label={`Ir para ${cat.title}`}
          />
        ))}
      </div>
    </div>
  );
}
