# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos

```bash
npm run dev     # next dev (http://localhost:3000)
npm run build   # next build
npm run start   # next start
npm run lint    # eslint .
```

Não há testes configurados. Existem `package-lock.json` e `pnpm-lock.yaml` (projeto originado do v0); scripts rodam com qualquer gerenciador.

## Arquitetura

Front-end Next.js 16 (App Router, React 19, Tailwind v4, shadcn/ui estilo "new-york", alias `@/*`) de campanha de Natal: visitantes "adotam" idosos e enviam um presente/mensagem. Todo o texto de UI é em português.

O front **não tem backend próprio**. Todos os dados vêm de uma API externa (repo separado) via cliente axios único em `lib/api.ts`:
- dev: `http://localhost:3333`; produção: `https://christmas-api-1.onrender.com` (escolhido por `NODE_ENV`, sem variável de ambiente).
- `withCredentials: true`.
- Endpoints usados: `GET /elders`, `PUT /elders/:id` (`{ adopted }`), `POST /gifts`, `GET /gifts`, `PUT /gifts/:id` (`{ status }`), `DELETE /gifts/:id`, `POST /admin/login`.

Fluxos:
- **Público** (`app/page.tsx`): busca `/elders`, renderiza `ElderCard`s; "Presentear" abre `GiftFormModal`, que faz `POST /gifts` (campo `message` obrigatório validado no cliente). Se não há idosos disponíveis, mostra `NoEldersAvailable`. Decoração temática em `christmas-lights.tsx` e `snow-fall.tsx`.
- **Admin** (`app/admin/`): login em `app/admin/login/page.tsx` chama `POST /admin/login` e grava `localStorage.isAdmin = "true"`; `app/admin/page.tsx` checa esse flag no `useEffect` e redireciona para `/admin/login`. Gerencia pedidos (status, exclusão) e marca idosos como adotados.

Observações não óbvias:
- A proteção do admin é apenas client-side (`localStorage`). `app/admin/login/action.ts` (server action que seta o cookie `admin_authenticated`) existe, mas não é o mecanismo efetivamente checado; não há `middleware`. Não presuma proteção server-side.
- Quase tudo é `"use client"`; `lib/api.ts` também.
- Imagens de idosos ficam em `public/img/foto*.jpg`; `ElderCard` cai para emoji por `id` quando `image` falta. O tipo `Elder` está duplicado localmente em cada arquivo (sem tipos compartilhados).
- Animações do card usam `<style jsx>` inline.
- Componentes primitivos em `components/ui/` são gerados pelo shadcn (`components.json`); componentes de domínio ficam em `components/`.

## Convenções do projeto

- Grafia da empresa: **Servfaz** (nunca "ServFaz").
- Não incluir dados pessoais de clientes (nome, e-mail, telefone dos doadores) em respostas, logs ou exemplos.
