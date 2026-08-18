# Sistema Delivery WPP

Plataforma de delivery para restaurantes com integração direta ao WhatsApp. O sistema recebe pedidos via vitrine web e gerencia o fluxo de mensagens e status automaticamente pelo backend.

## Stack
- **Backend:** NestJS, Prisma, PostgreSQL, Baileys (WhatsApp WebSockets) e Multer.
- **Frontend:** Next.js e Tailwind CSS.
- **Arquitetura:** Monorepo.

## Setup do Backend

1. Instale as dependências:
`cd Backend`
`npm install`

2. Configure o banco de dados criando um arquivo `.env` na pasta `Backend`:
`DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco?schema=public"`

3. Gere as tabelas e inicie o servidor (modo dev):
`npx prisma migrate dev`
`npm run start:dev`

A API estará disponível em `http://localhost:3000`.
