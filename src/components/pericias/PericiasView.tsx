interface PericiasViewProps {
  onBack: () => void;
}

interface SkillCard {
  name: string;
  attr: string;
  whatdoes: string;
  emphases: { name: string; text: string }[];
}

const ALTAS_PERICIAS: SkillCard[] = [
  { name: "Adivinhação", attr: "", whatdoes: "Permite vislumbrar os tecidos do destino e prever eventos futuros (uma vez por dia).", emphases: [{ name: "Astrologia", text: "Prever o futuro ou obter presságios lendo a posição das estrelas e astros." }, { name: "Kawaru", text: "Prever o futuro jogando e interpretando objetos pequenos (pedras, palitos ou moedas com hexagramas) em uma tigela." }] },
  { name: "Arte", attr: "", whatdoes: "Mede o talento do personagem em criar obras nobres e refinadas reconhecidas pela sociedade.", emphases: [{ name: "Qualquer Arte", text: "Criar uma obra física ou literária de alto nível para impressionar alguém ou demonstrar status cultural." }] },
  { name: "Atuação", attr: "", whatdoes: "Capacidade de se passar por outra pessoa de forma convincente ou atuar nos teatros tradicionais (Kabuki e Noh).", emphases: [{ name: "Clã", text: "Disfarce que exige mudar o Clã de origem." }, { name: "Gênero", text: "Disfarce que exige se passar por alguém de gênero diferente." }, { name: "Profissão", text: "Disfarce que exige se passar por alguém de outra função social." }] },
  { name: "Caligrafia", attr: "", whatdoes: "Demonstra refino, sofisticação e conhecimento de escritas avançadas através da escrita manual.", emphases: [{ name: "Cifra", text: "Criar mensagem codificada secreta ou decifrar código alheio." }, { name: "Alto Rokugani", text: "Escrever documentos oficiais com linguagem formal e florida da Corte Imperial." }] },
  { name: "Cerimônia do Chá", attr: "", whatdoes: "Um ritual sagrado de 30 minutos feito em silêncio para limpar a mente e recuperar as energias do grupo. Não possui ênfases.", emphases: [{ name: "Geral", text: "Conduzir o ritual formal do chá para recuperar Pontos de Vazio." }] },
  { name: "Corte", attr: "", whatdoes: "Funciona como o 'ataque social' em Rokugan. É a perícia usada para dominar conversas e jogos políticos na corte.", emphases: [{ name: "Boatos", text: "Espalhar fofoca maldosa ou descobrir rumores nos corredores do palácio." }, { name: "Manipulação", text: "Influenciar opiniões de forma sutil ou encurralar oponente socialmente." }, { name: "Retórica", text: "Vencer discussões formais através da eloquência." }] },
  { name: "Etiqueta", attr: "", whatdoes: "Funciona como a 'defesa social'. Mede o conhecimento das regras rígidas de comportamento e protocolo do Império.", emphases: [{ name: "Burocracia", text: "Lidar com engrenagens do governo, conseguir audiências oficiais." }, { name: "Conversação", text: "Puxar assunto na corte de forma segura e educada." }, { name: "Cortesia", text: "Defender-se de manipulações, expressar opinião sem ofender, lembrar costumes sociais." }] },
  { name: "Feitiçaria", attr: "", whatdoes: "Mede o conhecimento místico dos shugenjas sobre preces, estudo da magia e interação com espíritos elementais.", emphases: [{ name: "Importunar", text: "Persuadir ou bajular um espírito (kami) para que ajude você." }, { name: "Pesquisa de Feitiços", text: "Estudar na biblioteca do clã para criar um feitiço totalmente novo." }] },
  { name: "Investigação", attr: "", whatdoes: "A perícia clássica dos magistrados. Permite analisar cenas de crime, ligar pistas e encontrar o que está oculto.", emphases: [{ name: "Interrogatório", text: "Questionar testemunha ou suspeito para extrair informações." }, { name: "Notar", text: "Perceber se há alguém escondido ou camuflado (vs Furtividade)." }, { name: "Procurar", text: "Revistar local atrás de pistas físicas ou objetos escondidos." }] },
  { name: "Jogos", attr: "", whatdoes: "Representa o domínio do samurai nos passatempos tradicionais do Império.", emphases: [{ name: "Go / Shogi", text: "Jogos de tabuleiro que exigem estratégia mental." }, { name: "Kemari", text: "Competição física de chutar e manter a bola no ar." }, { name: "Sadane / Correspondências", text: "Jogos corteses com cartas poéticas ou debates improvisados." }, { name: "Fortunas e Ventos", text: "Jogo de azar e dados de Rokugan." }] },
  { name: "Medicina", attr: "", whatdoes: "Permite tratar feridos de guerra, diagnosticar males físicos e garantir recuperação.", emphases: [{ name: "Tratamento de Feridas", text: "Costurar cortes, imobilizar ossos, curar Ferimentos." }, { name: "Antídotos", text: "Identificar toxina e preparar substância neutralizadora." }, { name: "Doenças", text: "Diagnosticar e tratar febre, peste ou enfermidade." }, { name: "Fitoterapia", text: "Buscar ervas na natureza, preparar unguentos e chás." }, { name: "Inumanos", text: "Procedimento médico em raça não-humana (Naga, Nezumi, etc.)." }] },
  { name: "Meditação", attr: "", whatdoes: "Permite ao samurai acalmar a mente através dos ensinamentos do Tao de Shinsei.", emphases: [{ name: "Recuperação de Vazio", text: "Meditar em silêncio absoluto para recarregar Pontos de Vazio." }, { name: "Jejum", text: "Ignorar fome e sede, resistindo a privações físicas." }] },
  { name: "Performance", attr: "", whatdoes: "Mede a habilidade de entreter a corte com artes performáticas ou inspirar soldados.", emphases: [{ name: "Instrumentos, Dança e Títeres", text: "Dar show em banquete, tocar música ou dançar para impressionar." }, { name: "Oratória, Narração e Canção", text: "Fazer discurso emocionante ou contar lendas para inflamar espírito dos guerreiros." }] },
  { name: "Sinceridade", attr: "", whatdoes: "A arte de parecer absolutamente convincente no que diz. O importante é fazer com que os outros acreditem que você é sincero.", emphases: [{ name: "Honestidade", text: "Dizer a verdade e que as pessoas confiem plenamente." }, { name: "Ardil", text: "Contar mentira descarada com postura firme e polida." }, { name: "Geral", text: "Dar resposta evasiva ou elogio ambíguo sem ofender autoridade." }] },
];

const PERICIAS_BUGEI: SkillCard[] = [
  { name: "Armas de Corrente", attr: "Agilidade", whatdoes: "Permite lutar com armas exóticas e pouco convencionais baseadas em correntes, muito usadas pelo Clã Louva-a-deus para enredar e desarmar oponentes.", emphases: [{ name: "Kusarigama", text: "Atacar, desarmar ou iniciar uma imobilização usando uma foice acoplada a uma corrente." }, { name: "Kyoketsu-shogi", text: "Combater usando uma corda ou corrente que possui uma adaga em uma extremidade e um anel metálico na outra." }, { name: "Manrikikusari", text: "Lutar usando uma corrente pesada com pesos de metal em ambas as pontas para golpear ou prender o inimigo." }] },
  { name: "Armas de Haste", attr: "Agilidade", whatdoes: "Manejo de armas de longo alcance montadas sobre cabos rígidos, oferecendo versatilidade e a capacidade de manter os inimigos à distância.", emphases: [{ name: "Bisento", text: "Desferir golpes com uma grande e pesada alabarda de lâmina larga." }, { name: "Nagamaki", text: "Combater usando uma espada de cabo extra longo (quase do tamanho da própria lâmina)." }, { name: "Naginata", text: "Manejar a clássica e elegante lança com uma lâmina curva na ponta." }, { name: "Sasumata", text: "Utilizar a haste em formato de 'U' (pega-ladrão) para capturar ou imobilizar um oponente sem matá-lo." }, { name: "Sodegarami", text: "Usar a haste cheia de farpas e ganchos para se enroscar nas roupas ou armadura do inimigo e puxá-lo." }] },
  { name: "Armas Pesadas", attr: "Agilidade", whatdoes: "A marca registrada do Clã Caranguejo. Focada no poder bruto e esmagador de armas massivas, ideais para despedaçar monstros e ignorar armaduras.", emphases: [{ name: "Dai Tsuchi", text: "Desferir golpes demolidores usando um enorme martelo de guerra de duas mãos." }, { name: "Masakari", text: "Combater utilizando machados de batalha menores." }, { name: "Ono", text: "Atacar com um grande e pesado machado de batalha de duas mãos." }, { name: "Tetsubo", text: "Esmagar ossos e armaduras inimigas usando a icônica clava de metal (ou madeira cravejada)." }] },
  { name: "Bastões", attr: "Agilidade", whatdoes: "Uso de armas de impacto simples, comuns entre monges e camponeses. São excelentes para nocautear e derrubar, mas têm dificuldade contra armaduras pesadas.", emphases: [{ name: "Bo", text: "Lutar utilizando um bastão longo de madeira de duas mãos." }, { name: "Jo", text: "Usar um bastão curto ou bengala de caminhada para autodefesa." }, { name: "Machi-kanshisha", text: "Surpreender o oponente lutando com um cachimbo de tabaco feito de metal pesado." }, { name: "Nunchaku", text: "Golpear rapidamente usando dois bastões curtos conectados por uma corrente ou corda." }, { name: "Sang Kauw", text: "Manejar a arma exótica que mistura uma lança de ponta dupla com um escudo acoplado no centro." }, { name: "Tonfa", text: "Usar bastões com cabo perpendicular presos ao antebraço para desferir socos armados e bloquear." }] },
  { name: "Batalha", attr: "Percepção", whatdoes: "Mede o estudo analítico da guerra, táticas militares e estratégias de comando. É a perícia principal para o Sistema de Combate em Massa.", emphases: [{ name: "Combate em Massa", text: "Liderar exércitos, mover tropas em grande escala ou sobreviver nas grandes guerras do cenário." }, { name: "Luta", text: "Avaliar rapidamente as táticas imediatas de um confronto menor (escaramuça) ou prever a movimentação de um grupo inimigo." }] },
  { name: "Caça", attr: "Percepção", whatdoes: "Prática de esportes ao ar livre e sobrevivência na mata. Samurais usam esta perícia com arcos ou lanças (nunca com suas katanas).", emphases: [{ name: "Sobrevivência", text: "Improvisar abrigo, encontrar comida ou conseguir água potável em ambientes selvagens." }, { name: "Rastros", text: "Localizar, identificar e seguir as pegadas ou pistas deixadas por uma presa ou inimigo na natureza." }, { name: "Preceder", text: "Guiar um grupo abrindo uma trilha segura pela mata densa, poupando tempo e fôlego de todos." }] },
  { name: "Cavalaria", attr: "Agilidade", whatdoes: "Habilidade utilitária para guiar montarias. Qualquer samurai cavalga normalmente em situações calmas, mas esta perícia é exigida sob estresse, pressa ou combate.", emphases: [{ name: "Cavalo Corredor Gaijin", text: "Controlar ou lutar montado em um veloz cavalo de raça estrangeira." }, { name: "Pônei Rokugani", text: "Estiver em combate ou cruzando terrenos ruins montando o pônei nativo do Império." }, { name: "Corcel Utaku", text: "Comandar em batalha os lendários cavalos de guerra do Clã Unicórnio." }] },
  { name: "Defesa", attr: "Reflexos", whatdoes: "A base da sobrevivência no combate. Mede a capacidade de posicionar o corpo e a lâmina para que a armadura e a espada desviem os ataques inimigos.", emphases: [{ name: "Geral", text: "Adotar ativamente as Posturas de Defesa ou Defesa Total no seu turno para aumentar seu NA de Armadura." }] },
  { name: "Esportes", attr: "Força / Agilidade", whatdoes: "Governa o condicionamento físico geral do samurai e sua capacidade de superar obstáculos físicos e terrenos difíceis (mesmo usando armadura pesada).", emphases: [{ name: "Escalada", text: "Subir superfícies verticais, como muros de castelos, árvores ou encostas de montanhas." }, { name: "Corrida", text: "Perseguir um fugitivo, disputar uma corrida ou escapar rapidamente de um perigo." }, { name: "Natação", text: "Cruzar um rio turbulento, nadar contra a correnteza ou se manter vivo na água profunda." }, { name: "Arremesso", text: "Lançar um objeto comum com precisão ou arremessar uma arma (faca ou wakizashi) ofensivamente." }] },
  { name: "Facas", attr: "Agilidade", whatdoes: "O estilo prático de lutar à queima-roupa com lâminas curtas e ferramentas de autodefesa compactas que todo bushi carrega consigo.", emphases: [{ name: "Aiguchi / Tanto", text: "Entrar em combate usando facas e adagas tradicionais (com ou sem guarda de mão)." }, { name: "Jitte / Sai", text: "Lutar empunhando armas de metal projetadas para prender, bloquear ou desarmar a lâmina do oponente." }, { name: "Kama", text: "Combater utilizando pequenas foices de mão." }] },
  { name: "Iaijutsu", attr: "Reflexos", whatdoes: "A arte sagrada do saque rápido e o sistema formal de duelos de Rokugan. Onde a palavra final do destino é decidida pelo aço.", emphases: [{ name: "Avaliação", text: "Estudar a postura do oponente e medir o nível de habilidade dele antes das espadas saírem da bainha." }, { name: "Foco", text: "Acumular concentração e energia espiritual nos segundos cruciais que antecedem o golpe." }] },
  { name: "JiuJutsu", attr: "Agilidade", whatdoes: "Combate corporal desarmado. Muito refinado por monges e essencial para qualquer bushi que se encontre sem suas armas no campo de batalha.", emphases: [{ name: "Artes Marciais", text: "Desferir socos, chutes, joelhadas e golpes desarmados tradicionais usando o próprio corpo." }, { name: "Imobilizar", text: "Agarrar, derrubar e imobilizar um oponente no chão para neutralizá-lo sem necessariamente matá-lo." }, { name: "Armas Improvisadas", text: "Usar o que estiver à mão (cadeira, garrafa, pedra) para golpear." }] },
  { name: "Kenjutsu", attr: "Agilidade", whatdoes: "O lendário 'Caminho da Espada'. É o treinamento mais importante, obrigatório e tradicional para qualquer bushi de Rokugan.", emphases: [{ name: "Katana / Espadas", text: "Entrar em combate corporal padrão empunhando a katana, wakizashi ou qualquer variação de espada longa." }] },
  { name: "Kyujutsu", attr: "Reflexos", whatdoes: "A arte do tiro com arco. Diferente do estilo ocidental, o arqueiro de Rokugan dispara de forma fluida a partir da cintura, sem mirar fixamente.", emphases: [{ name: "Dai-kyu", text: "Disparar flechas utilizando o enorme e poderoso arco longo militar." }, { name: "Han-kyu", text: "Usar o arco curto, ideal para espaços confinados, emboscadas ou disparos rápidos a pé." }, { name: "Yumi", text: "Disparar com o arco assimétrico tradicional padrão do Império." }] },
  { name: "Lanças", attr: "Agilidade", whatdoes: "Arte focada em armas de estocada e impacto montadas em hastes longas. É a ferramenta defensiva perfeita contra investidas de cavalaria.", emphases: [{ name: "Yari / Mai Chong", text: "Lutar usando a clássica lança reta de infantaria ou suas variantes de perfuração." }, { name: "Kumade", text: "Usar a lança-ancinho (muito utilizada para puxar inimigos de muros ou cavalos)." }, { name: "Lance", text: "Realizar uma investida devastadora montado a cavalo segurando uma lança pesada." }, { name: "Nage-yari", text: "Arremessar uma lança curta contra um inimigo distante." }] },
  { name: "Leque de Guerra", attr: "Agilidade", whatdoes: "O uso de leques metálicos (tessen). Servem tanto para comandantes enviarem sinais táticos para as tropas quanto como armas discretas de defesa.", emphases: [{ name: "Geral", text: "Golpear, desviar ataques ou surpreender um oponente usando um leque de guerra de metal." }] },
  { name: "Ninjutsu", attr: "Agilidade ou Reflexos", whatdoes: "Uma prática proibida e desonrada (considerada Baixa Perícia). Governa as armas ocultas utilizadas pelos assassinos e guerreiros das sombras.", emphases: [{ name: "Zarabatana", text: "Disparar dardos (frequentemente envenenados) de forma totalmente silenciosa através de um tubo de sopro." }, { name: "Shuriken", text: "Arremessar estrelas ou lâminas ocultas de metal contra um alvo à distância." }, { name: "Tsubute", text: "Lançar pedras polidas ou projéteis pesados projetados para ferir ou criar distrações sonoras." }] },
];

const PERICIAS_MERCANTES: SkillCard[] = [
  { name: "Velejar", attr: "Agilidade ou Inteligência", whatdoes: "Governa a capacidade de tripular embarcações, manobrar navios mercantes ou de guerra pelos rios e pela costa do Império, e lidar com a estrutura náutica.", emphases: [{ name: "Navegação", text: "Ler as estrelas para determinar localização no mar ou descobrir direção para chegar a um destino." }, { name: "Nós", text: "Trabalhar com cordas, amarras, nós marinheiros e içamento de velas a bordo de um navio." }] },
  { name: "Comércio", attr: "Inteligência", whatdoes: "Governa a gestão de dinheiro, transações comerciais e contabilidade. Embora a casta samurai veja o comércio com certo estigma, 'patronos mercantes' usam essa perícia para garantir o suprimento de suas famílias.", emphases: [{ name: "Avaliação", text: "Determinar rapidamente o valor de mercado de um item, tesouro ou mercadoria exótica." }, { name: "Cálculos", text: "Calcular impostos, tarifas comerciais ou resolver problemas matemáticos complexos." }] },
  { name: "Criação", attr: "Variável", whatdoes: "Uma macro-perícia voltada para o artesanato prático e a produção de recursos essenciais (como armas, armaduras, mapas ou comida).", emphases: [{ name: "Qualquer Ofício", text: "Fabricar, consertar, cultivar ou coletar algo prático ligado à especialidade do personagem (Ferraria, Carpintaria, Culinária, Cartografia, Venenos, Alfaiataria, etc.)." }] },
  { name: "Engenharia", attr: "Inteligência", whatdoes: "Domínio avançado sobre a arquitetura e a física estrutural. Permite entender perfeitamente como as grandes obras são construídas — e qual a melhor forma de destruí-las.", emphases: [{ name: "Construção", text: "Projetar plantas, planejar defesas e coordenar a edificação de estruturas, de uma torre de vigia a um palácio Imperial." }, { name: "Cerco", text: "Operar armas de cerco ou descobrir pontos fracos nas muralhas e fortificações do inimigo." }] },
  { name: "Treinar Animais", attr: "Astúcia", whatdoes: "Governa a capacidade de lidar, domesticar e adestrar criaturas para transporte, mensagens, caça ou combate direto.", emphases: [{ name: "Animal Escolhido", text: "Acalmar uma fera selvagem, ensinar comandos a uma montaria ou ordenar que uma criatura treinada realize uma tarefa específica (Cavalos, Cães, Falcões, Felinos, etc.)." }] },
];

const BAIXAS_PERICIAS: SkillCard[] = [
  { name: "Falsificação", attr: "Agilidade", whatdoes: "Permite criar documentos falsos, decretos oficiais, obras de arte e selos pessoais para enganar as autoridades ou lucrar no mercado negro.", emphases: [{ name: "Documentos / Selos / Obras de Arte", text: "Forjar um documento de viagem oficial, imitar a assinatura de um magistrado ou replicar um selo de família para obter acesso a locais restritos." }] },
  { name: "Furtividade", attr: "Agilidade", whatdoes: "Permite agir pelas sombras, mover-se sem ser notado, armar emboscadas ou ocultar a origem de magias (embora a maioria das ações cause perda de Honra para um samurai).", emphases: [{ name: "Esgueirar", text: "Mover-se silenciosamente por um local sem chamar atenção (única ênfase que não faz perder Honra)." }, { name: "Ocultação", text: "Se esconder em um ponto fixo, aproveitando a cobertura do cenário." }, { name: "Emboscada", text: "Pegar um oponente totalmente desprevenido na primeira rodada de combate." }, { name: "Invocação", text: "Conjurar um feitiço e camuflar suas preces, impedindo que saibam de onde a magia se originou." }] },
  { name: "Intimidação", attr: "Vontade", whatdoes: "Permite dobrar a vontade de outra pessoa através do medo, seja por violência direta, manipulação psicológica de longo prazo ou dor física.", emphases: [{ name: "Ameaça", text: "Coagir alguém imediatamente através do medo ou da promessa de violência física rápida." }, { name: "Controle", text: "Manipulação psicológica de longo prazo para moldar o comportamento de um alvo de menor posição social." }, { name: "Tortura", text: "Extrair confissões ou informações vitais de um prisioneiro através do sofrimento físico." }] },
  { name: "Mãos Rápidas", attr: "Agilidade", whatdoes: "Governa a agilidade manual oculta, permitindo realizar truques de mágica, furtar bolsos, esconder pequenos objetos no corpo ou escapar de amarras.", emphases: [{ name: "Ocultar", text: "Esconder um objeto pequeno (ou armas menores com Maestria Nível 5) em vestes ou mãos." }, { name: "Fuga", text: "Desvencilhar-se de nós, cordas ou correntes quando amarrado ou algemado." }, { name: "Punga", text: "Bater a carteira de alguém ou surrupiar um item pequeno do cinto do alvo sem ser detectado." }, { name: "Prestidigitação", text: "Fazer truques rápidos com as mãos para entreter o público ou criar distração visual." }] },
  { name: "Tentação", attr: "Astúcia", whatdoes: "A arte de descobrir o que outra pessoa deseja e usar isso como moeda de troca para conseguir o que você quer, explorando ambições e fraquezas do alvo.", emphases: [{ name: "Sedução", text: "Usar charme, magnetismo pessoal ou apelo físico para influenciar decisões e postura de alguém na corte." }, { name: "Corrupção", text: "Oferecer subornos, ouro, favores financeiros ou explorar a ganância e segredos sombrios de um alvo." }] },
];

const ALL_CARDS = [
  ...ALTAS_PERICIAS,
  ...PERICIAS_BUGEI,
  ...PERICIAS_MERCANTES,
  ...BAIXAS_PERICIAS,
];

export default function PericiasView({ onBack }: PericiasViewProps) {
  return (
    <div className="pericias">
      <style>{`
        @page { size: A4 landscape; margin: 6mm; }
        @media print {
          .pericias__toolbar { display: none !important; }
          .pericias__sheet { width: 100%; margin: 0; border: none; box-shadow: none; padding: 6mm; }
          .pericias__sheet::before, .pericias__sheet::after { display: none; }
        }
      `}</style>

      <div className="pericias__toolbar">
        <div className="pericias__toolbarInner">
          <button className="pericias__backBtn" onClick={onBack}>← Voltar ao Hub</button>
          <button className="pericias__printBtn" onClick={() => window.print()}>🖨️ Imprimir / Salvar PDF</button>
        </div>
      </div>

      <div className="pericias__sheet">
        <div className="pericias__pageTitle">Compendium de Perícias</div>
        <div className="pericias__cardsContainer">
          {ALL_CARDS.map((card) => (
            <div key={card.name} className="pericias__skillCard">
              <div className="pericias__skillCardTitle">
                {card.name}{card.attr && <span className="pericias__skillCardAttr"> ({card.attr})</span>}
              </div>
                  <div className="pericias__skillCardBody">
                    <div className="pericias__whatdoesLabel">O que faz</div>
                    <div className="pericias__whatdoesText">{card.whatdoes}</div>
                    {card.emphases.length > 0 && (
                      <>
                        <div className="pericias__emphasesLabel">Ênfases</div>
                        {card.emphases.map((e) => (
                          <div key={e.name} className="pericias__emphasisItem">
                            <span className="pericias__emphasisName">{e.name}</span> — {e.text}
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
          ))}
        </div>
      </div>
    </div>
  );
}
