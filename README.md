# api-node

API REST simples para gerenciamento de usuários, construída com **Fastify**, **Prisma** e **Zod**.

## Stack

- [Fastify](https://fastify.dev/) — servidor HTTP
- [Prisma](https://www.prisma.io/) (com `@prisma/adapter-pg`) — ORM sobre PostgreSQL
- [Zod](https://zod.dev/) — validação de schema (params e body)
- TypeScript + `tsx` (dev), ESLint + Prettier

## Pré-requisitos

- Node.js 20+
- PostgreSQL rodando localmente (ou acessível via `DATABASE_URL`)

## Setup

1. Instale as dependências:

   ```bash
   npm install
   ```

2. Crie um arquivo `.env` na raiz com a string de conexão do banco (use suas próprias credenciais, nunca commite esse arquivo):

   ```bash
   DATABASE_URL="postgresql://<usuario>:<senha>@<host>:<porta>/<database>?schema=public"
   ```

3. Rode as migrations do Prisma:

   ```bash
   npx prisma migrate dev
   ```

4. Suba o servidor em modo desenvolvimento (com watch):

   ```bash
   npm run dev
   ```

   O servidor sobe em `http://localhost:8080`.

## Scripts

| Comando            | Descrição                                   |
| ------------------ | ------------------------------------------- |
| `npm run dev`      | Sobe o servidor com reload automático       |
| `npm run build`    | Compila o TypeScript (`tsc`)                |
| `npm run lint`     | Roda o ESLint                               |
| `npm run lint:fix` | Roda o ESLint corrigindo o que for possível |
| `npm run format`   | Formata o projeto com Prettier              |

## Modelo de dados

```prisma
model Users {
  id          String  @id @default(uuid()) @db.Uuid
  name        String
  email       String  @unique
  phone       String? @unique
  description String? @db.Text
  isUserAdmin Boolean @default(false)
}
```

## Endpoints

Todas as rotas são prefixadas por `/users`. IDs são validados como UUID; requisições com `id` fora desse formato retornam `400`.

### `POST /users`

Cria um usuário.

**Body**

```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

- `name`: obrigatório, string não vazia.
- `email`: obrigatório, formato de e-mail válido.

**Resposta `201`**

```json
{ "userId": "b7f2c3e0-....-...." }
```

### `GET /users`

Lista todos os usuários.

**Resposta `200`**

```json
[
  {
    "id": "b7f2c3e0-....-....",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": null,
    "description": null,
    "isUserAdmin": false
  }
]
```

### `GET /users/:id`

Busca um usuário pelo `id`.

**Resposta `200`** — objeto do usuário (mesmo formato acima).
**Resposta `404`** — `{ "message": "User not found" }` quando o `id` não existe.

### `PATCH /users/:id`

Atualiza parcialmente um usuário. Só os campos enviados no body são alterados — o que não for enviado permanece intocado (evita _lost update_ em relação a outras atualizações concorrentes).

**Body** (todos os campos opcionais)

```json
{
  "phone": "+55 11 99999-0000",
  "description": "Some notes",
  "isUserAdmin": true
}
```

**Resposta `200`**, sem corpo. Para conferir o resultado, use `GET /users/:id`.
**Resposta `404`** quando o `id` não existe.

> Observação: `name` e `email` não são atualizáveis por esta rota de propósito — são tratados como imutáveis após a criação.

### `DELETE /users/:id`

Remove um usuário.

**Resposta `204`**, sem corpo.
**Resposta `404`** quando o `id` não existe.

## Tratamento de erros

Erros de validação (Zod) retornam `400`:

```json
{
  "message": "Validation error",
  "issues": [
    /* detalhes do zod */
  ]
}
```

Qualquer outro erro não tratado retorna `500`:

```json
{ "message": "Internal server error" }
```
