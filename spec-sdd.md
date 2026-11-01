# As Seis Harmonias — Character Sheet — spec-sdd.md

Versão estruturada no padrão SDD. Origem: spec externa (Character Sheet — Backend + Frontend) + relatório da Fase 0 + decisões do usuário. Ajustes e motivos documentados em cada seção.

**Fases de entrega da spec externa:** 1 (local) implementável agora. Fase 2 (produção/VPS) é roadmap — proibido implementar.
**Fases SDD:** Specify → Design → Tasks → Execute (este documento).

---

## Parte A — Specify

### A0. Resumo do projeto

Feature aditiva no SPA existente (em produção na VPS): autenticação por e-mail (magic link) como **entrada do site**, sessão persistente de 30 dias, e CRUD de fichas de personagem ("Character Sheet") de As Seis Harmonias, com backend Fastify + Prisma + PostgreSQL. Reaproveita tokens, estética noir, BEM, `AppView` por `useState`, dados tipados e Vitest. O Hub e o Compêndio existentes não mudam com a flag off.

**Tipo de projeto:** feature backend+frontend em app existente.
**Modo de análise:** CMS+ adaptado (10 conceitos). Modo Profundo dispensado — escopo e risco não justificam os 15.

### A1. Conceitos selecionados e como entram no Specify

| Conceito | Questão de Specify | Resposta para este projeto |
|---|---|---|
| **State Categorization** | O que precisa sobreviver a refresh / vir da API? | Ver tabela A2 |
| **SSR/Hydration** (adaptado p/ SPA) | Rota precisa de SEO / first-paint para anônimos? | **Não** — área logada, SPA CSR deliberado. Compêndio público só com flag off (site atual) |
| **Accessibility** | Nível de conformidade? | **WCAG AA** (telas novas) |
| **Observability** | Feature crítica para monitoramento prioritário? | Sim (auth + CRUD); instrumentação mínima nesta entrega |
| **Design System** | Usa componentes/tokens existentes ou precisa de novos? | Reaproveitar `tokens.css` + noir. Novos: `auth.css`, `sheet.css`, `CharacterCard` |
| **Cache/Optimistic** | Mutações precisam de resposta instantânea? | **Não** — refetch após mutação. Sem optimistic |
| **Main Thread Perf** | Lista grande (>100–200 itens)? | **Não** — listas paginadas (limit ≤ 50) |
| **Testing Strategy** | Crítico suficiente para E2E? | Auth + CRUD = integration (Vitest). Smoke do Hub para proteger legado. E2E fora de escopo |
| **Security** | UGC, dados sensíveis, XSS vectors? | Cookie session + magic link = CSRF obrigatório. Imagem por URL = vetor XSS/SSRF parcial. Ver A3 |
| **API Contracts** | Consome/produz API? Error shape? | Sim — Fastify `/api/v1`. Error envelope definido em A4 |
| **Performance Budgets** | Afeta LCP/CLS/INP? Categoria? | **Categoria: feature logada** — fora do bundle inicial (lazy-gate) |
| **Responsive** | Precisa funcionar em mobile? | Sim. Mobile-first |

**Conceitos Design-only:** Rendering Pipeline, Event Loop, Bundle Architecture (entram no Design — B5).

### A2. Classificação de estado por requisito

| Estado | Categoria | Mecanismo | Justificativa |
|---|---|---|---|
| `AppView` (tela atual) | **Local** | `useState` em `App.tsx` | Padrão do projeto (sem router) |
| Sessão/usuário logado | **Server** | `GET /auth/me` no boot + contexto simples | Vem da API; cookie httpOnly |
| Token do magic link | **URL** | `location.search` (`?token=`) | Precisa sobreviver a refresh na tela de verify |
| Email digitado no login | **Local** | `useState` | Efêmero até o submit |
| Lista de personagens | **Server** | fetch + `useState` (refetch pós-mutação) | Paginada; sem TanStack Query nesta entrega |
| Ficha em edição (form) | **Local** | `useState` | Rascunho até salvar |
| Dialog de delete / toasts | **Local** | `useState` | Efêmero |

**Regra:** nunca duplicar estado entre categorias. Server state não vai para `localStorage` (nunca armazenar tokens/segredos no cliente).

### A3. Security posture (decidido ANTES de código)

| Vetor | Decisão |
|---|---|
| **Auth mechanism** | Magic link por e-mail (copiado do blog). Token 32 bytes hex, SHA-256 no DB, TTL 15 min, single-use, reenvio invalida anteriores. Sessão: cookie opaco, hash no DB, **30 dias fixos** |
| **Cookies** | `session` HttpOnly; `csrf_token` legível; `SameSite=Lax`; `Secure` em prod; `Path=/` |
| **CSRF** | Double-submit cookie + `X-CSRF-Token`, comparação `timingSafeEqual`. Isento nos endpoints pré-auth (`/auth/email/request`, `/auth/email/verify`) |
| **Token storage** | Apenas cookie httpOnly. **Proibido** localStorage/sessionStorage |
| **Rate limit** | 5 / 15 min por `ip:email` no endpoint que dispara e-mail. Resposta 429 com envelope padrão |
| **Anti-enumeração** | `POST /auth/email/request` sempre responde `202 { ok: true }` — não revela se o e-mail existe |
| **Ownership/IDOR** | Toda query de personagem filtra `(id, user_id)`; acesso alheio = **404** (não 403) |
| **Imagem de personagem** | String URL **https** apenas, máx 2048 chars, URL bem formada. Front: `referrerpolicy="no-referrer"`, `loading="lazy"`, placeholder obrigatório em falha/vazio |
| **Logging** | Tokens, cookies e e-mails nunca logados em claro (`maskEmail` no pino) |
| **Deep link** | `?token=` validado como input externo (Zod). Tela de verify não consome token no mount — só no botão Confirmar |
| **XSS** | Sem `dangerouslySetInnerHTML` nas telas novas; strings centralizadas; URL de imagem validada |

### A4. API contracts (respostas e mapeamento)

Base: `/api/v1`. Success: recurso único retorna o recurso; lista retorna `{ data: [...], page, limit, total }`; health `{ "status": "ok" }`.

**Error (uniforme, incluindo 500):**
```json
{ "error": { "code": "VALIDATION_ERROR", "message": "Human readable", "requestId": "…", "details": [] } }
```
- `code`: SCREAMING_SNAKE_CASE estável — frontend faz branch em `code`, nunca em `message`
- Códigos: `VALIDATION_ERROR` 400, `UNAUTHENTICATED` 401, `INVALID_TOKEN` 401, `FORBIDDEN` 403, `NOT_FOUND` 404, `RATE_LIMITED` 429, `SERVICE_UNAVAILABLE` 503

**Status → state (frontend):**

| HTTP | Estado UI | Comportamento |
|---|---|---|
| 200/201 | Success | Renderizar dado |
| 400 | Erro de formulário inline | `details` por campo; sem retry |
| 401 | Não autenticado | Voltar para a tela de auth |
| 404 | Not found | Empty state dedicado |
| 429 | Rate limit | "Tente novamente em instantes" |
| 500+ | Erro de servidor | Mensagem genérica + retry |
| Network fail | Erro de rede | Distinto de 500 |

**Endpoints:**

| Método/Path | Auth | Request | Response |
|---|---|---|---|
| `POST /api/v1/auth/email/request` | — | `{ email }` | `202 { ok: true }` (sempre) |
| `POST /api/v1/auth/email/verify` | — | `{ token }` | `200 { user }` + cookies; `401 INVALID_TOKEN` |
| `POST /api/v1/auth/logout` | sessão+CSRF | — | `204` |
| `GET /api/v1/auth/me` | sessão | — | `200 { user, csrfToken }` |
| `POST /api/v1/characters` | sessão+CSRF | CharacterSchema | `201` character |
| `GET /api/v1/characters?page&limit` | sessão | — | `{ data: summaries, page, limit, total }` |
| `GET /api/v1/characters/:id` | sessão | — | character completo |
| `PUT /api/v1/characters/:id` | sessão+CSRF | CharacterSchema | character atualizado |
| `DELETE /api/v1/characters/:id` | sessão+CSRF | — | `204` |
| `GET /health` / `GET /ready` | — | — | `{ status: "ok" }` (ready checa DB) |

**Tipos compartilhados:** schemas Zod em `shared/` são a source of truth (frontend e backend).

### A5. Performance budgets

| Métrica | Target | Nota |
|---|---|---|
| JS inicial | **sem regressão** vs site atual | Feature inteira lazy-gated atrás de `VITE_ENABLE_SHEET_CREATOR`; flag off = bundle idêntico em comportamento |
| LCP/CLS/INP | sem regressão | Telas novas são internas (pós-login) |

Sem Lighthouse CI nesta entrega (repo não tem); enforcement = lazy-gate + smoke test.

### A6. Responsive

- Mobile-first; touch targets **≥ 44×44px**; `dvh` em telas full-height
- Form do criador: seções empilham em telas estreitas
- Grid de cards reflow: multi-coluna → stack em telas menores
- Tela de login: card centralizado, max-width (como no blog)

### A7. Testing classification por feature

| Feature | Nível | Por quê |
|---|---|---|
| `summarizeCharacter` + validação Zod | **Unit** (Vitest) | Regra pura |
| Auth (magic link, verify, sessão, CSRF, rate limit) | **Integration** | Contrato HTTP + segurança |
| Characters CRUD + ownership | **Integration** | IDOR é crítico |
| Hub (comportamento existente) | **Smoke** (RTL) | Proteger legado |
| Telas novas (login, home, cards, imagem) | **Integration** (RTL) | Fluxos críticos |

Pirâmide: muitos unit → alguns integration. E2E fora de escopo.

### A8. Escopo

**Implementar agora (Fase 1, local):** auth magic-link + sessões + CRUD de fichas + telas novas + testes + docs de setup local.
**NÃO implementar:** VPS/Nginx/HTTPS/CI-CD/secrets/backups (Fase 2); admin; combate; PDF; upload de imagem; chat; campanhas; refatorar o Compêndio; renomear "Atributo"→"Autoridade" nos textos de `categories.ts` (parked); custos de CPP (parked).
**Proibido:** alterar `Dockerfile`, `nginx.conf`, `docker-compose.yml`, `.github/workflows/deploy.yml`; usar algo da pasta `backup/` ou do sistema L5R.

---

## Parte B — Design (decisões travadas ANTES das Tasks)

### B1. Stack e layout do repositório

| Item | Decisão |
|---|---|
| Backend | Node 22 + Fastify + TypeScript strict + Zod + Prisma 6 + PostgreSQL 16 + Vitest |
| Frontend | React 19 + Vite 8 + CSS tokens/BEM (existente); sem router; sem TanStack Query |
| Layout | Frontend permanece na raiz. Novos: `shared/` (Zod contracts) e `backend/` (package.json e lockfile **isolados** — raiz não vira workspace, `npm ci` do Docker de produção intacto) |
| shared/ | TS puro (dependência: zod). Import relativo pelos dois lados; `tsconfig.app.json` include += `shared` |
| Backend run | `tsx` (dev e Fase 1); emit compilado fica para o Dockerfile da Fase 2 |
| Dev infra | `compose.dev.yaml` (NOVO, só dev): Postgres 16 (:5433) + Mailpit (:1025 SMTP, :8025 UI). Nada toca o compose de produção (`rede_vps`) |
| Proxy | `vite.config.ts` ganha `server.proxy: { '/api': 'http://localhost:3001' }` (só dev; sem efeito no build) |
| Env | `.env.example` completo; `.env` no `.gitignore`; env validada com Zod no boot do backend (fail-fast) |

### B2. Navegação, flag e boot

- `AppView = "auth" | "hub" | "compendiumIntro" | "compendium" | "sheetHome" | "sheetCreator" | "sheetDetail"` por `useState` (sem router).
- Flag única `VITE_ENABLE_SHEET_CREATOR` (default off) governa **login-gate + card Criador + telas de ficha**.
  - **Off:** `hub → compendiumIntro → compendium` como hoje; zero chamadas de rede; feature lazy-gated (`React.lazy`) fora do bundle.
  - **On:** entrada do site = tela de login igual à do blog (form → inbox com reenvio → verify com botão Confirmar). Login gateia **Hub e Compêndio**.
- Boot (flag on): `?token=` em `location.search` → `auth` (estado verify). Senão `GET /auth/me` → `hub` (ok) / `auth` (401) / splash mínimo (loading).
- Link do e-mail: `${WEB_URL}/verify?token=…` (SPA fallback já existe no nginx e no Vite).
- 401 em qualquer chamada → `auth`. Logout → `auth`.
- Tela de login = **cópia do front do blog** (`Login.tsx`, `Verify.tsx`, `useAuth`, `AuthHeader`), adaptados sem router/TanStack Query; visual claro/portal do blog em `auth.css`. Copy pt-BR idêntica.

### B3. Estado

| Tipo | Mecanismo |
|---|---|
| Server (sessão, personagens) | fetch via `src/api/client.ts` + `useState` com refetch pós-mutação |
| URL (token do verify) | `location.search` lido no boot |
| Global (usuário logado) | hook `useAuth` (context simples) |
| Local (formulários, dialogs) | `useState` |

### B4. Design System

- Tokens semânticos de `tokens.css` em tudo que é noir (`sheet.css`); `auth.css` reproduz o visual do blog.
- BEM (`.sheetHome__…`, `.characterCard__…`). Proibido hex/px arbitrários fora do `auth.css` (que espelha o blog).
- Tipografia existente (Shippori Mincho / Noto Sans JP) nas telas noir; login preserva a hierarquia do blog.
- Strings centralizadas em `strings.ts` por feature — **proibido texto literal em JSX**.

### B5. Bundle architecture

- `React.lazy` do bloco auth+sheet, importado só quando a flag está on.
- Chunks do site atual intocados.

### B6. Accessibility

- HTML semântico (`form`, `label`, `button`); `aria-invalid` em erros de campo; erros `role="alert"`.
- Focus ring visível; touch ≥ 44px; dialog de delete com focus trap + Esc.

### B7. Observability

- Error boundary no bloco auth+sheet; estados de erro por tela (rede/validação/servidor distintos).
- Backend: pino estruturado + `x-request-id` + `maskEmail`.

### B8. Cache / mutations

- Estratégia padrão: **refetch** após create/update/delete (invalidate manual). Sem optimistic nesta entrega.

### B9. Strings centralizadas

- `src/features/auth/strings.ts` e `src/features/sheet/strings.ts` — todos os textos de UI.

### B10. Backend

- **Módulos:** `auth`, `users`, `characters`, `health` — cada um com `routes | service | repository` (HTTP ≠ regra ≠ DB).
- **Prisma:** `User(id, email unique lower, emailVerifiedAt, role player|admin, timestamps)`; `Session(id, userId FK cascade, tokenHash unique, expiresAt, createdAt, lastSeenAt)`; `LoginToken(id, email, tokenHash unique, expiresAt, usedAt)`; `Character(id, userId FK cascade, name, imageUrl?, characterData Json, timestamps)`. Índices: `tokenHash` (unique), `user_id`, `(user_id, updated_at DESC)`.
- **Auth (port do blog):** token 32B hex + SHA-256 at rest; TTL link 15 min, single-use, reenvio deleta não consumidos; verify = 1 transação (consome token + upsert user + cria sessão); sessão 30 dias fixos; logout deleta sessão + limpa cookies; `/auth/me` reemite CSRF se faltar; `EmailService` interface + `NodemailerEmailService` (Mailpit/dev, SMTP/prod futuro) + `FakeEmailService` (testes). **Sem Redis/BullMQ** (decisão) — envio direto, fire-and-forget com try/catch (nunca derruba login).
- **Characters:** validação Zod compartilhada antes de salvar; `characterData` com `schemaVersion: 1`; resumo do card por função pura `summarizeCharacter`; ownership `(id, user_id)` → 404 alheio; paginação `page/limit` (limit máx 50) ordenado por `updated_at` desc.

### B11. CharacterSchema (aprovado — nomenclatura "autoridade")

```ts
{
  schemaVersion: 1,
  name: string,                      // obrigatório
  imageUrl?: string,                 // https, máx 2048
  autoridades: {                     // DieStep: "1d4" | "1d6" | "1d8" | "1d10" | "1d12" | "1d12+2" | "1d12+4"
    velocidade: DieStep, forca: DieStep, resistencia: DieStep,
    reflexo: DieStep, movimento: DieStep, yin: DieStep, yang: DieStep,
  },
  resources: {
    chi: { current: number, max: number },
    prana: { current: number, max: number },
    vida: { current: number, max: number },
  },
  selections: {
    postura: "falcao" | "tigre" | "tartaruga" | "serpente",
    estilo: "tempestade" | "fluxo-inversivo" | "montanha" | "garra" | "vortice" | "muralha",
    manobraEstilo: "pular" | "rasteira" | "fintar",
    manobrasEspeciais: ("corrida-cinetica" | "arremessar")[],
  },
  diceProgression: {
    manobraEstilo: DieStep,          // 1d4–1d12
    manobraEspecial: DieStep,        // 1d4–1d12
    faJin: DieStep,                  // 1d4–1d10 (limite Fa Jin)
  },
  notes?: string,
}
```

- Fonte única das opções/limites: `src/data/categories.ts` (As Seis Harmonias). **Proibido** derivar de `backup/`/L5R.
- Derivados: `summarizeCharacter` (nome, imagem, postura/estilo/manobra); especialização (postura casa com a autoridade do estilo → +1 Elevação).
- Fora do schema até existirem regras (não inventar): valores iniciais de autoridade, nível/XP, perícias, máximos de recurso, identidade (Clã/Escola).

### B12. Cross-cutting rules

1. Error contract no backend antes do frontend consumir.
2. Security posture (A3) antes de qualquer código de auth.
3. Nenhum segredo/token em `localStorage` ou em logs.
4. Nada da pasta `backup/`; nada de L5R.
5. "atributo" → "autoridade" em tudo que esta feature cria.
6. Arquivos de deploy da produção intocados.

---

## Parte C — Tasks (1 task = 1 commit)

| # | Task | Conceitos | Acceptance criteria (resumo) | Depende de |
|---|---|---|---|---|
| 0 | Branch + spec-sdd.md | SDD | Arquivo no repo; nada de código antes | — |
| 1 | `shared/` (schemas, options, errors, summarize) | API Contracts | Unit tests de summarize + validação verdes | 0 |
| 2 | `compose.dev.yaml` + `.env.example` + scaffold backend (Fastify+Prisma+migration+health) | Data Modeling | `compose up` sobe Postgres+Mailpit; `/health` e `/ready` ok; migrate roda | 0 |
| 3 | Auth: EmailVerifier + magic link (port) + sessões + CSRF + rate limit | Security | 202 uniforme; token single-use/expira; cookie flags; logout; me; 429 | 1, 2 |
| 4 | Characters CRUD + ownership + paginação + summarize | AuthZ, Contracts | CRUD validado; 404 cross-user; page/limit | 1, 2 |
| 5 | Front: api client + flag + AuthGate + Login/Verify (cópia blog) + boot | Bundle, Security | Entrada igual à do blog; flag off = hub direto sem rede | 3 |
| 6 | Front: Hub (card Criador + Sair) + smoke test do Hub | Design System | Hub idêntico com flag off; atrás do login com flag on | 5 |
| 7 | Front: SheetHome (empty + CharacterCard) | State, Design | Empty → Criar; cards com resumo | 4, 6 |
| 8 | Front: SheetCreator (form único seções) + SheetDetail (editar/deletar) | A11y, State | Ciclo completo; delete com confirmação | 7 |
| 9 | Testes front + polish estados | Testing | Flag, login gate, cards, fallback de imagem, 401; `npm test` verde | 8 |
| 10 | Docs (`docs/character-sheet-setup.md` + seção no `AGENTS.md`) + DoD | — | Setup reproduzível; obsoletos só reportados | 9 |

---

## Parte D — Execute (tech lead verification)

- [ ] `npm test` verde (inclui smoke do Hub — legado protegido)
- [ ] `npm run build` sem flag: Hub e Compêndio idênticos aos de hoje
- [ ] Flag on, local: entrada = login do blog; magic link → sessão de 30 dias; sem re-login
- [ ] CRUD de fichas com ownership; dados sobrevivem a restart
- [ ] Cross-user = 404 (teste)
- [ ] Card = resumo (só opções escolhidas); detail = stats + Edit
- [ ] Imagem com placeholder em falha/vazio
- [ ] Migrations versionadas no git
- [ ] Nenhum texto literal em JSX nas telas novas
- [ ] Teclado operável em login, verify e CRUD
- [ ] Zero tokens em localStorage; CSRF ativo em mutações
- [ ] Setup documentado
- [ ] `Dockerfile`, `nginx.conf`, `docker-compose.yml`, `deploy.yml` sem alterações

---

## Traceability — ajustes vs spec externa

| Ajuste | Motivo |
|---|---|
| Login movido para antes do Hub (gate do site inteiro com flag on) | Decisão do usuário (rev. 2): "tela de login igual à do blog, antes do hub" |
| Sessão 30 dias fixos (não 90 deslizantes) | Decisão do usuário |
| Envio de e-mail sem BullMQ/Redis (Nodemailer direto) | Decisão do usuário; fila fica para Fase 2 se necessário |
| Schema minimalista com renomeação atributo→autoridade | Decisão do usuário; sem inventar regras de criação |
| Criador = formulário único com seções (não wizard) | Decisão do usuário |
| Nomes `sheetAuth` → `auth` | Login agora é gate do site, não sub-fluxo do criador |
| Flag `VITE_ENABLE_SHEET_CREATOR` governa login+card+fichas | Flag única, semântica ampliada (documentado em B2) |
| Front do blog copiado (Tailwind → CSS próprio) | Pedido explícito; projeto não usa Tailwind |
| Nada de `backup/`/L5R; texts/CPP parked | Pedido explícito |
| Sem TanStack Query / react-router | Manter dependências do projeto; spec não exige |

