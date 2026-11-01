# Ficha de Personagem — setup local

Feature backend + frontend (auth por magic link + CRUD de fichas de As Seis Harmonias).
Tudo roda local nesta fase; deploy de produção é Fase 2 (spec-sdd.md).

## Pré-requisitos

- Node.js 20+ (o build de produção usa Node 22)
- Docker + docker compose

## 1. Dependências

```bash
npm install            # frontend (raiz)
cd backend && npm install && cd ..
```

## 2. Variáveis de ambiente

```bash
cp .env.example backend/.env   # backend lê daqui
echo "VITE_ENABLE_SHEET_CREATOR=true" > .env.local   # liga a feature no front
```

Sem `VITE_ENABLE_SHEET_CREATOR=true`, o site é exatamente o de hoje (hub + compêndio,
sem rede e sem tela de login).

## 3. Infra dev (Postgres + Mailpit)

```bash
docker compose -f compose.dev.yaml up -d
```

- Postgres: `localhost:5433` (usuário/senha `rpgmap`/`rpgmap_dev`)
- Mailpit: SMTP `localhost:1025`, UI da caixa de entrada em <http://localhost:8025>

Esse compose **não** tem relação com o `docker-compose.yml` de produção (`rede_vps`).

## 4. Banco de dados

```bash
cd backend
npm run prisma:migrate        # migration dev (banco rpgmap)
```

Banco de testes (separado):

```bash
docker exec rpg-map-pg-dev psql -U rpgmap -d rpgmap -c "CREATE DATABASE rpgmap_test OWNER rpgmap;"
DATABASE_URL="postgresql://rpgmap:rpgmap_dev@localhost:5433/rpgmap_test?schema=public" npx prisma migrate deploy
```

## 5. Rodar

```bash
cd backend && npm run dev     # API em http://localhost:3001
npm run dev                   # frontend em http://localhost:5173 (proxy /api → 3001)
```

Fluxo: abra <http://localhost:5173> → tela de login (estilo blog) → digite seu e-mail →
o link chega no Mailpit (UI :8025) → clique/abra o link → "Confirmar login" → hub.

## 6. Testes

```bash
npm test                      # raiz: shared + frontend
cd backend && npm test        # backend (usa o banco rpgmap_test)
```

## 7. Resumo da API (`/api/v1`)

| Método/Path | O que faz |
|---|---|
| `POST /auth/email/request` | Envia magic link (sempre `202`; rate limit 5/15min por ip+email) |
| `POST /auth/email/verify` | Confirma o link e cria a sessão (cookie HttpOnly, 30 dias) |
| `GET /auth/me` | Usuário + CSRF token |
| `POST /auth/logout` | Destrói a sessão (exige `X-CSRF-Token`) |
| `GET/POST /characters` | Lista (paginada) / cria |
| `GET/PUT/DELETE /characters/:id` | Detalhe / edita / exclui (ownership: alheio = 404) |
| `GET /health`, `GET /ready` | Liveness / readiness |

Mutações exigem o header `X-CSRF-Token` (lido do cookie `csrf_token`).

## Estrutura

- `shared/` — schemas Zod (CharacterSchema com **autoridades**), opções e `summarizeCharacter`
- `backend/` — Fastify + Prisma (módulos `auth`, `characters`, `health`)
- `src/features/auth/` — Login/Verify/SessionGate (cópia adaptada do blog)
- `src/features/sheet/` — SheetHome, SheetCreator, SheetDetail, CharacterCard
- `src/styles/auth.css` (visual claro do portal) e `src/styles/sheet.css` (noir)

Regas de ouro: nada em `localStorage`; nada da pasta `backup/`; textos de UI em `strings.ts`;
"autoridade" (nunca "atributo") em tudo que a feature cria.
