# Mapa da Campanha

Mapa interativo do mundo de RPG: pan/zoom sobre uma imagem grande, com
pontos de interesse clicáveis que abrem um card com nome, descrição e
imagem do local. Sem backend — tudo estático.

## Stack

- React + TypeScript + Vite
- `react-zoom-pan-pinch` para pan/zoom
- Nginx (servindo arquivos estáticos) em produção

## Rodando localmente

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Onde editar o conteúdo

### 1. O mapa em si

Substitua o arquivo `public/map/mapa.png` pelo seu PNG real (o que está
lá agora é só um placeholder de grade pra testar).

Depois, em `src/components/MapCanvas.tsx`, ajuste as constantes para
o **tamanho real em pixels** da sua imagem:

```ts
const MAP_WIDTH = 3000;  // largura real do seu mapa.png
const MAP_HEIGHT = 2400; // altura real do seu mapa.png
```

Isso é importante: os marcadores são posicionados com base nessas
dimensões, então se estiver errado os pins ficam fora do lugar.

### 2. Os pontos de interesse (POIs)

Tudo fica em `src/data/pois.ts`. Cada item é:

```ts
{
  id: "poi-004",
  x: 1850,        // coordenada x (pixel da imagem original)
  y: 920,         // coordenada y (pixel da imagem original)
  nome: "Nome do local",
  descricao: "Texto que aparece no card.",
  imagem: "/locations/nome-do-arquivo.jpg",
}
```

Coloque as imagens correspondentes em `public/locations/`. Os 3 itens
que já estão no arquivo são só exemplos — apague e substitua pelas
suas coordenadas reais (as que você já extraiu com o Gemini).

**Dica de imagens:** comprima antes de subir (ex: via [squoosh.app](https://squoosh.app)
ou `npx @squoosh/cli`). Com 10-50 imagens, manter cada uma abaixo de
~200-300KB evita que o repositório/site fiquem pesados.

## Build de produção

```bash
npm run build
```

Gera os arquivos estáticos em `dist/`.

## Deploy na VPS (Docker + Nginx Proxy Manager)

O projeto já vem com `Dockerfile`, `nginx.conf`, `docker-compose.yml`
e um workflow de GitHub Actions (`.github/workflows/deploy.yml`)
seguindo o mesmo padrão dos seus outros projetos na VPS.

### Passo a passo

1. **Crie o repositório no GitHub** e dê push deste projeto.

2. **No GitHub**, configure os secrets do repositório
   (Settings → Secrets and variables → Actions):
   - `SSH_HOST` — IP **IPv4** da sua VPS (atenção ao bug que você já
     teve antes com IPv6 nesse mesmo secret em outro projeto)
   - `SSH_USER` — usuário SSH
   - `SSH_KEY` — chave privada SSH
   - `RPG_MAP_PATH` — caminho absoluto na VPS onde o repo vai ficar
     clonado, ex: `/opt/rpg-map`

3. **Na VPS**, clone o repositório nesse caminho:
   ```bash
   git clone <url-do-seu-repo> /opt/rpg-map
   ```

4. **Ajuste o `docker-compose.yml`**: troque `npm_network` pelo nome
   real da rede Docker do seu Nginx Proxy Manager (a mesma que seus
   outros projetos como `crm.felbatista.tech` já usam).

5. **No Nginx Proxy Manager**, crie um Proxy Host novo:
   - Domain: `mapa.felbatista.tech` (ou o subdomínio que preferir)
   - Forward Hostname: `rpg-map` (nome do container)
   - Forward Port: `80`

6. **Dê push na branch `main`** — o GitHub Actions builda e faz
   deploy automático via SSH.

### Primeiro deploy manual (antes do CI/CD rodar pela primeira vez)

```bash
cd /opt/rpg-map
docker compose build
docker compose up -d
```

## Possíveis evoluções futuras

- Painel admin (FastAPI + Mongo) para editar POIs sem tocar no JSON
- Categorias de pin com ícones diferentes (cidade, dungeon, etc.)
- Múltiplos mapas (ex: mapa-múndi + mapa de uma cidade específica)
- Modo "névoa de guerra" (esconder áreas não exploradas pelos PJs)
