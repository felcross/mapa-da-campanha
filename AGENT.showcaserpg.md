# AGENTS.md — ShowcaseRPG

## O que é

Compêndio de classes de RPG (Samurai + Sacerdotes) em desktop — layout estilo chat com sidebar + painel de detalhe. Stack: HTML + CSS + JS puro, zero build step, zero dependências.

## Como rodar

`npm run dev` (usa `node dev.js`, servidor na porta 8000). Ou abra `index.html` direto no navegador.

## Estrutura

```
index.html   → shell semântico (sidebar + main), carrega fonts via Google Fonts
data.js      → conteúdo (categorias, itens, textos) — FORMATO documentado no topo
app.js       → estado + renderização — ZERO conteúdo hardcoded aqui
styles.css   → tokens de design (paleta orientoantiga) + layout grid 2 colunas
dev.js       → servidor local para npm run dev
SPEC.md      → documento de design com decisões e pontos em aberto
```

Separação intencional: `data.js` = conteúdo, `app.js` = lógica. Trocar o conteúdo do jogo = editar só `data.js`.

## Categorias

- **Samurai** (9 clãs): Mirumoto, Coruja, Escorpião, Lobo, Serpente, Tigre, Javali, Urso, Vaga-lume
- **Sacerdotes** (2 classes): Celeste (Onmyōji), Elemental (Shugenja)

## Seções opcionais do painel de detalhe

Itens podem ter campos extras. Se o campo existe, a seção renderiza; se não, não aparece:

| Campo | Usado por | O que renderiza |
|-------|-----------|-----------------|
| `fullTitle` | Todos | Subtítulo abaixo do nome |
| `bonuses` | Samurai | Chips de atributo |
| `school` | Samurai | Card de escola (perícias + equipamento) |
| `techniques` | Todos | Linha do tempo com acordeão por nível |
| `upkeep` | Sacerdotes | Card de regra/aviso (borda vermelha) |
| `resource` | Celeste | Tabela de progressão + métodos de invocação |
| `difficulty` | Sacerdotes | Fórmula de conjuração + tabela NA |
| `subSections` | Elemental | Sub-blocos nomeados dentro da descrição |
| `elementalVariants` | Elemental | Grid de cartões por elemento (armas/muralhas) |
| `domains` | Celeste | Acordeão de 2 níveis: domínios > constelações |
| `spellLibrary` | Elemental | Abas por elemento > níveis > feitiços |

Ver item "Mirumoto" (Samurai) e "Celeste"/"Elemental" (Sacerdotes) em `data.js` como exemplos. Documentado no topo de `data.js`.

## Mobile

Breakpoint `860px`: sidebar e main viram duas telas navegáveis (lista ↔ detalhe), controlado pela classe `.app--detailView` no `.app`. Botão "voltar" no detalhe volta pra lista. Acima do breakpoint nada muda.

## Design

Paleta e tipografia definidas em `styles.css` via CSS custom properties (`:root`). Duas fontes Google Fonts: **Shippori Mincho** (títulos) e **Noto Sans JP** (corpo). Layout: grid fixa 336px sidebar + 1fr main, 100vh, `overflow: hidden` na página.

## Pontos em aberto (ver SPEC.md §8)

- Interpretação de "sem scroll" — confirmar com base na quantidade real de itens.
- Dropdown de categoria vs. abas fixas.
- Fonte dos dados: estáticos em `data.js` ou backend/CMS futuro.
- Mobile: validar tamanho de toque (~44px mínimo) e breakpoint em dispositivo real.
- Acordeão de técnicas: calibrar aberto/fechado padrão conforme conteúdo real.
