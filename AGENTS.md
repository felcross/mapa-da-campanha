# AGENTS.md — Mapa da Campanha

## O que é

SPA estático para RPG: mapa interativo com pan/zoom e pontos de interesse (POIs), mais um compêndio de classes (Samurai, Sacerdotes, Monges, Forças Especiais) e um livro de regras. Sem backend — tudo estático em `src/data/`.

## Comandos

```bash
npm install          # instalar dependências
npm run dev          # Vite dev server em http://localhost:5173
npm run build        # tsc -b && vite build → dist/
npm test             # vitest run (execução única)
npm run test:watch   # vitest (watch mode)
npm run lint         # eslint . (sem --fix)
```

## Stack

- React 19 + TypeScript 6 + Vite 8
- `react-zoom-pan-pinch` para pan/zoom no mapa
- Vitest + jsdom + React Testing Library para testes
- CSS custom properties (tokens) + BEM naming
- Docker multi-stage (Node 22 build → Nginx 1.27 serve)
- Deploy: push em `main` → GitHub Actions → SSH na VPS → docker compose build/up

## Arquitetura

### Troca de telas

**Não há roteador.** A navegação é controlada por `useState<AppView>` em `App.tsx`:

```
hub → "map"     (MapView)
hub → "classes" (ClassesView)
```

Para adicionar uma nova tela: adicione um novo valor ao tipo `AppView`, um novo componente, e um novo branch no render de `App.tsx`.

### Views

- **HubScreen** (`src/components/hub/HubScreen.tsx`) — tela inicial com cards de navegação
- **MapView** (`src/components/map/MapView.tsx`) — mapa interativo com POIs
- **ClassesView** (`src/components/classes/ClassesView.tsx`) — compêndio de classes com sidebar + detalhe

### Dados

Todos os dados são **estáticos** em `src/data/`:

| Arquivo | O que contém |
|---------|-------------|
| `categories.ts` | Todas as classes de RPG (Samurai, Sacerdotes, Monges, Forças Especiais, Regras) |
| `pois.ts` | Pontos de interesse no mapa |
| `maps.ts` | Configuração dos mapas (imagem, dimensões) |

**`ALL_CATEGORIES` é derivado automaticamente de `DATA`** — não editar manualmente.

### Onde adicionar conteúdo

- **POIs**: adicionar em `src/data/pois.ts`, imagens em `public/locations/`
- **Mapas**: adicionar em `src/data/maps.ts`, imagens em `public/map/`
- **Classes**: adicionar na `Record` `DATA` em `src/data/categories.ts` sob a chave da categoria

## Convenções

### TypeScript

- `verbatimModuleSyntax: true` — usar `import type { ... }` para imports somente de tipo
- `noUnusedLocals` / `noUnusedParameters` — imports e parâmetros não usados causam erro no build
- `erasableSyntaxOnly: true` — sem enums, use union types ou `as const`
- React 19 — componentes são funções plain, sem `React.FC`

### CSS

- Tokens em `src/styles/tokens.css` via CSS custom properties (`:root`)
- CSS split por feature: `tokens.css`, `hub.css`, `map.css`, `classes.css` — importados em `App.tsx`
- BEM naming: `.poi-card__title`, `.classesProject__sidebar`, etc.
- Fontes: Shippori Mincho (display), Noto Sans JP (body) — carregadas no `index.html`

### Coordenadas do mapa

`MapCanvas.tsx` usa constantes `MAP_WIDTH` / `MAP_HEIGHT` que devem bater com as dimensões reais da imagem `mapa.png`. **Se estiver errado, os pins ficam fora do lugar.**

### Dados de classes (categories.ts)

Cada item segue a interface `Item` com campos opcionais:

```ts
{
  id, name, glyph, tagline, description, tags,  // obrigatórios
  fullTitle?, bonuses?, school?, techniques?,    // escola samurai
  upkeep?, resource?, difficulty?,               // sacerdotes
  subSections?, elementalVariants?,              // elementos
  domains?, spellLibrary?,                       // feitiços
  tattoos?,                                      // monges (tatuagens místicas)
  ruleSections?,                                 // regras (tabelas, listas, textos)
}
```

### Testes

- Arquivos `*.test.tsx` junto ao componente
- `src/test-setup.ts` importa `@testing-library/jest-dom/vitest`
- Rodar `npm test` para execução única

## Cuidados

- `categories.ts` é enorme (~3400+ linhas). Editar é lento para autocomplete/linting. Saiba o que procura antes de abrir.
- O `dist/` pode existir no disco mas está no `.gitignore`.
- Deploy: `SSH_HOST` deve ser IPv4 (bug conhecido com IPv6 nesse secret).
