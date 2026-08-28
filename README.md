# Edge Stack

A lean Cloudflare-first React monorepo that proves one vertical slice: URL-backed item search and typed creation from a Vite SPA, through a same-origin Hono BFF, to a bound Hono API Worker.

## Stack

- pnpm 11 workspaces, Turbo 2, Node 24, strict TypeScript
- React 19, Vite 8, Tailwind 4, TanStack Router/Query/Form, Zustand
- Hono RPC, Zod contracts, neverthrow expected errors
- Cloudflare Workers for the web BFF, API, queue, and scheduled work
- PWA support, Portless local URLs, Router/Query devtools in development
- Ultracite/Biome, Knip, Vitest/RTL/MSW, Cloudflare Vitest, Playwright

## Start

```sh
corepack enable
pnpm install
pnpm dev
```

Portless prints the stable local URL. The web Worker handles `/api/*`, removes the `/api` prefix, and forwards the request through its `API` Service Binding. Vite starts the API and jobs configurations as auxiliary Workers.

## State boundaries

| Concern | Owner |
| --- | --- |
| Search query in the URL | TanStack Router |
| Remote item collection | TanStack Query |
| Create-item input and validation lifecycle | TanStack Form + Zod |
| Compact/comfortable display preference | Zustand |
| Shared request/response shapes | `@edge-stack/contracts` |

## Commands

- `pnpm dev` — all development processes
- `pnpm build` — production builds
- `pnpm check` / `pnpm fix` — Ultracite + Biome
- `pnpm typecheck` — strict workspace type checks
- `pnpm knip` — unused-code analysis
- `pnpm test` — unit, component, and Worker tests
- `pnpm test:e2e` — Playwright Chromium flow
- `pnpm cf-typegen` — regenerate Wrangler bindings
- `pnpm cf-typegen:check` — verify Wrangler bindings without changing files

## Packages

- `apps/web` — React SPA and thin Hono BFF Worker
- `workers/api` — typed Hono API and in-memory example repository
- `workers/jobs` — queue consumer and scheduled handler examples
- `packages/contracts` — shared Zod schemas and inferred types
- `packages/ui` — minimal shared React UI
- `packages/config` — strict shared TypeScript configuration

The data is intentionally in memory: this scaffold includes no auth, database, payments, analytics, email, or deployment automation. Do not use the sample store as durable storage.

The PWA precaches only build-time static assets. Its app-shell navigation fallback excludes `/api`, and it defines no runtime response cache. API responses also leave the BFF with `Cache-Control: no-store`. Updates wait for an explicit user action in the in-app update notice.
