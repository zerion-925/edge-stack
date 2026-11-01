# Edge Stack

A lean Cloudflare-first React monorepo that proves one vertical slice: URL-backed item search and typed creation from a Vite SPA, through a same-origin Hono BFF, to a bound Hono API Worker.

## Stack

- pnpm 12 workspaces, Turbo 2, Node 24, strict TypeScript
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

## Animated icons

The demo uses [AnimateIcons](https://animateicons.in/icons/docs/shadcn), copied
through its official shadcn registry. Only the Sparkles icon is included; the
full icon catalog and `@animateicons/react` package are not installed. Existing
static Lucide icons and public shadcn component APIs are preserved. The copied icon needs
`motion` (currently 14.9.0) in `packages/ui`.

```tsx
import { SparklesIcon } from "@edge-stack/ui/components/sparkles-icon";

// Decorative next to visible text (the default).
<SparklesIcon aria-hidden="true" size={20} />;
// Meaningful standalone icon.
<SparklesIcon aria-label="New features" size={24} />;
```

Hover plays the icon. For a button, pass a `SparklesIconHandle` ref and call
`startAnimation()` / `stopAnimation()` on focus/blur and pointer enter/leave;
see `apps/web/src/components/animated-icon-demo.tsx`. The example also plays
on activation. Reduced-motion preferences prevent animated transforms.

To copy another individual icon into the shared UI package:

```sh
corepack pnpm --filter @edge-stack/ui exec shadcn add @animateicons/lu-bell-ring
```

Choose the exact `lu-*` / `hu-*` identifier from the official gallery. The
registry is configured in `packages/ui/components.json`; generated files use
the existing shared `cn` utility. Review generated code against the strict
React 19/TypeScript settings, preserve its accessibility and reduced-motion
guards, then run the usual checks. Do not use `--all` to add the whole catalog.
AnimateIcons is MIT; the copied-source and underlying icon notices are retained
in `packages/ui/ANIMATED_ICONS_LICENSE.md`.

## Packages

- `apps/web` — React SPA and thin Hono BFF Worker
- `workers/api` — typed Hono API and in-memory example repository
- `workers/jobs` — queue consumer and scheduled handler examples
- `packages/contracts` — shared Zod schemas and inferred types
- `packages/ui` — minimal shared React UI
- `packages/config` — strict shared TypeScript configuration

The data is intentionally in memory: this scaffold includes no auth, database, payments, analytics, email, or deployment automation. Do not use the sample store as durable storage.

The PWA precaches only build-time static assets. Its app-shell navigation fallback excludes `/api`, and it defines no runtime response cache. API responses also leave the BFF with `Cache-Control: no-store`. Updates wait for an explicit user action in the in-app update notice.
