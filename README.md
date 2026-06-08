# Portfolio Profissional Bruno Neves

Portfolio profissional reconstruido em Next.js com foco em prospeccao para sistemas web, SaaS, landing pages, automacoes, design e solucoes digitais.

## Stack

- Next.js App Router
- TypeScript
- Framer Motion
- GitHub REST API
- CSS responsivo com dark mode padrao

## GitHub Sync

A secao de projetos busca repositorios publicos do usuario `Niinh` pela GitHub API.

Configuracao atual:

```txt
GITHUB_USERNAME=Niinh
GITHUB_SYNC_MODE=all
GITHUB_PROJECT_TOPIC=portfolio
GITHUB_EXCLUDED_REPOS=Niinh
```

Modos disponiveis:

- `GITHUB_SYNC_MODE=all`: sincroniza todos os repositorios publicos, exceto os listados em `GITHUB_EXCLUDED_REPOS`.
- `GITHUB_SYNC_MODE=topic`: sincroniza somente repositorios publicos com o topic definido em `GITHUB_PROJECT_TOPIC`.

Para enriquecer um projeto no GitHub, preencha descricao, homepage e topics como `saas`, `landing-page`, `design`, `automacao`, `ia`, `react`, `nextjs` ou `typescript`.

O site usa ISR com revalidacao de 30 minutos. Isso significa que novos repositorios publicos aparecem automaticamente depois do cache expirar e uma nova visita acontecer. O webhook abaixo serve para acelerar esse processo logo depois de um push.

## Netlify

No Netlify, configure estas variaveis em `Site configuration > Environment variables`:

```txt
SITE_URL=https://brunoneves.netlify.app
GITHUB_USERNAME=Niinh
GITHUB_SYNC_MODE=all
GITHUB_PROJECT_TOPIC=portfolio
GITHUB_EXCLUDED_REPOS=Niinh
GITHUB_TOKEN=
GITHUB_REVALIDATE_SECRET=
NETLIFY_BUILD_HOOK_URL=
```

Observacoes importantes:

- `GITHUB_TOKEN` e recomendado em producao para aumentar o limite da API, mas repositorios publicos funcionam sem token.
- `GITHUB_WEBHOOK_TOKEN` e usado apenas pelo script local de configuracao de webhooks. Pode ser o mesmo token se ele tiver permissao para webhooks.
- `GITHUB_WEBHOOK_URL` e opcional. Se ficar vazio, o script usa `SITE_URL + /.netlify/functions/revalidate-github`.
- `GITHUB_REVALIDATE_SECRET` deve ser uma frase longa e aleatoria. Use o mesmo valor no GitHub webhook.
- `NETLIFY_BUILD_HOOK_URL` e opcional, mas recomendado para Netlify. Ele faz o webhook disparar um novo deploy quando houver push.
- Nao faca commit do arquivo `.env`. Em producao, use as variaveis do proprio Netlify.

Antes do webhook, confirme que o deploy automatico da Netlify esta ativo:

1. Abra `https://app.netlify.com/projects/brunoneves`.
2. Va em `Project configuration > Build & deploy > Continuous deployment`.
3. Confirme que o repositorio e `Niinh/portfolio-pessoal-cv`.
4. Confirme que a branch de producao e `main`.
5. O `netlify.toml` deste projeto ja define `npm run build` e publish `.next`.
6. Rode `Trigger deploy > Deploy site` depois de salvar.

Diagnostico rapido: se `https://brunoneves.netlify.app/api/revalidate-github` retorna 404, a versao nova ainda nao foi publicada. Depois do deploy correto, ela deve retornar JSON, mesmo que seja um 401 quando o secret ainda nao estiver configurado.

## Webhook GitHub + Netlify

Depois de fazer deploy desta versao, teste primeiro:

```txt
https://brunoneves.netlify.app/api/revalidate-github
```

Se retornar JSON, use esta URL como payload do webhook:

```txt
https://brunoneves.netlify.app/api/revalidate-github
```

Se ainda retornar 404 no Netlify, use a funcao fallback criada neste projeto:

```txt
https://brunoneves.netlify.app/.netlify/functions/revalidate-github
```

Passo a passo no GitHub:

1. Abra o repositorio no GitHub.
2. Va em `Settings > Webhooks > Add webhook`.
3. Em `Payload URL`, cole uma das URLs acima.
4. Em `Content type`, selecione `application/json`.
5. Em `Secret`, cole o mesmo valor de `GITHUB_REVALIDATE_SECRET`.
6. Em eventos, selecione `Just the push event`.
7. Clique em `Add webhook`.

Para atualizar automaticamente quando qualquer projeto receber push, configure o mesmo webhook nos repositorios que devem acionar a sincronizacao. Para listar projetos novos sem configurar webhook em cada repo, o ISR ja cobre isso; o webhook apenas reduz a espera.

Tambem existe um script local para fazer isso automaticamente via API:

```bash
npm run github:webhooks
```

Para esse script funcionar, coloque no `.env` um `GITHUB_WEBHOOK_TOKEN` com permissao de escrita em webhooks dos repositorios. Em fine-grained token, use `Webhooks: Read and write` nos repositorios desejados. Em token classic, use um escopo especifico para webhooks, como `write:repo_hook`, ou `repo` se voce tambem precisar cobrir repositorios privados.

## Build Hook do Netlify

Para criar o `NETLIFY_BUILD_HOOK_URL`:

1. Abra o site no painel do Netlify.
2. Va em `Site configuration > Build & deploy > Build hooks`.
3. Clique em `Add build hook`.
4. Escolha a branch de producao.
5. Copie a URL gerada e salve em `NETLIFY_BUILD_HOOK_URL`.

## Token do GitHub

Para repositorios publicos, o site funciona sem token. Em producao, use `GITHUB_TOKEN` para aumentar limite de requisicoes e deixar a sincronizacao mais estavel.

Criacao recomendada:

1. Acesse `GitHub > Settings > Developer settings > Personal access tokens`.
2. Preferencialmente crie um fine-grained token.
3. Para buscar somente repositorios publicos, nao conceda permissoes de escrita.
4. Se usar token classic, crie com expiracao definida e escopos minimos. Para publicos, normalmente nenhum escopo extra e necessario para leitura publica via API.
5. Configure o valor em `GITHUB_TOKEN` no Netlify.

Nunca exponha `GITHUB_TOKEN` no front-end, nunca use `NEXT_PUBLIC_GITHUB_TOKEN` e nao faca commit de `.env`.

## Curadoria

A curadoria fica em:

```txt
lib/projects/curation.ts
```

Nela e possivel destacar projetos, ordenar cards, definir categoria, stack, status e conteudo da pagina de case.

## Ambiente

Use `.env` para rodar localmente quando precisar configurar dominio, token do GitHub ou secret de revalidacao.

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
