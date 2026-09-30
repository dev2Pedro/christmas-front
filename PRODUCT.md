# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Público: pessoas que aceitam "adotar" um idoso de uma casa de idosos no Natal e enviar um presente com mensagem carinhosa. Admin: a instituição parceira (casa de idosos), que acompanha pedidos, muda status, marca idosos como adotados e remove pedidos.

Hoje o projeto não está em uso. A campanha foi concluída com sucesso (todos os idosos foram presenteados). A redesenho serve como peça de portfólio do desenvolvedor.

## Product Purpose

Ajudar uma casa de idosos, em parceria com uma faculdade de outro estado, a conectar doadores a idosos que desejam um presente de Natal. Sucesso: cada idoso adotado e presenteado. Neste momento, sucesso do redesenho: portfólio que demonstre craft de design e front-end.

## Positioning

Cada idoso é uma pessoa real com nome, idade, gostos e um desejo específico; o doador escolhe alguém, não um item de catálogo.

## Capabilities and Constraints

- Lista idosos (`GET /elders`), formulário de doação (`POST /gifts`, mensagem obrigatória), estado sem idosos disponíveis.
- Admin: login, pedidos (status, exclusão), marcar idoso como adotado.
- API externa em repositório separado; contratos não podem mudar.
- Stack existente: Next.js 16 App Router, React 19, Tailwind v4, shadcn/ui.
- Todo o texto de UI em PT-BR.

## Brand Commitments

- Manter as fotos reais dos idosos (`public/img/foto*.jpg`), com fallback quando não houver imagem.
- Manter os textos atuais em PT-BR (copy e fluxo de adoção).
- Grafia da empresa: Servfaz.

## Evidence on Hand

Fotos reais em `public/img/`. Sem depoimentos, métricas ou logotipo fornecidos; não inventar.

## Product Principles

1. Pessoas primeiro: rosto, nome e desejo do idoso lideram, não a decoração.
2. Ato de doar simples e caloroso, com mensagem obrigatória.
3. Admin claro e sem ornamento para quem opera.
4. Tratar fotos e dados de pessoas reais com respeito.

## Accessibility & Inclusion

Público inclui doadores de idades variadas; texto legível, contraste alto, alvos de toque grandes, respeitar `prefers-reduced-motion`.
