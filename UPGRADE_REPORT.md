# Dependency upgrade report

## Outcome and registry observation

- Local branch: `chore/update-dependencies`; no commit, push, PR or deployment.
- npm registry `https://registry.npmjs.org/<encoded-name>` metadata (`dist-tags.latest`, engines, peers and publication times) was fetched **before edits** at 2026-10-31T19:45:01.652557+00:00. All 61 distinct existing direct packages/tool pins were audited, including workspace catalog entries and pnpm. Original semver range styles are retained where applicable.
- 39 packages/tool pins moved to the observed latest stable version; 21 were already current. Node types are the sole compatibility exception: latest stable Node **24** types `24.19.2`, not the global latest Node 26 types `26.6.6`, because this template intentionally targets Node 24.
- Node stays on major 24, with engine floor raised to `>=24.15.0 <25` for jsdom 30 / Ultracite 8. pnpm is pinned to `12.16.1` with engine `>=12 <13`; commands used `corepack pnpm` on Node `24.17.0`. No global tooling was changed.
- GitHub release API / official action manifests were checked: checkout `v5 → v7.0.1`, setup-node `v5 → v7.1.0`, pnpm/action-setup `v4 → v6.1.0` (adds pnpm 12 support). React Doctor's floating `v2` action was pinned to official stable tag `v2.4.0`. Hosted GitHub Actions itself was not run locally.

## Existing direct dependency audit

Before values are manifest declarations, not necessarily old resolved caret versions. Selected values are version floors; `@types/node` is intentionally runtime-aligned.

| Package | Before | npm latest stable | Selected |
| --- | --- | --- | --- |
| `@base-ui/react` | `^1.7.0` | `1.9.0` | `1.9.0` |
| `@biomejs/biome` | `2.5.11` | `2.6.4` | `2.6.4` |
| `@cloudflare/vite-plugin` | `1.54.1` | `1.66.0` | `1.66.0` |
| `@cloudflare/vitest-plugin` | `1.1.1` | `1.4.11` | `1.4.11` |
| `@fontsource-variable/geist` | `^5.3.0` | `5.3.0` | `5.3.0` |
| `@playwright/test` | `1.62.1` | `1.64.1` | `1.64.1` |
| `@shadcn/react` | `^0.3.0` | `0.3.1` | `0.3.1` |
| `@t3-oss/env-core` | `0.13.11` | `0.13.11` | `0.13.11` |
| `@tailwindcss/vite` | `4.3.3` | `4.3.3` | `4.3.3` |
| `@tanstack/react-form` | `1.33.5` | `1.33.5` | `1.33.5` |
| `@tanstack/react-query` | `5.102.8` | `5.105.0` | `5.105.0` |
| `@tanstack/react-query-devtools` | `5.102.8` | `5.105.0` | `5.105.0` |
| `@tanstack/react-router` | `1.170.32` | `1.170.46` | `1.170.46` |
| `@tanstack/react-router-devtools` | `1.167.1` | `1.167.2` | `1.167.2` |
| `@tanstack/router-plugin` | `1.168.35` | `1.168.48` | `1.168.48` |
| `@testing-library/jest-dom` | `^6.9.1` | `7.0.1` | `7.0.1` |
| `@testing-library/react` | `^16.3.2` | `16.3.3` | `16.3.3` |
| `@types/node` | `^24` | `26.6.6` | `24.19.2` (Node 24) |
| `@types/react` | `^19.2.14` | `19.3.0` | `19.3.0` |
| `@types/react-dom` | `^19.2.3` | `19.3.0` | `19.3.0` |
| `@vitejs/plugin-react` | `6.1.1` | `6.1.2` | `6.1.2` |
| `class-variance-authority` | `^0.7.1` | `0.7.1` | `0.7.1` |
| `clsx` | `^2.1.1` | `2.1.1` | `2.1.1` |
| `cmdk` | `^1.1.1` | `1.1.1` | `1.1.1` |
| `date-fns` | `^4.4.0` | `4.4.0` | `4.4.0` |
| `embla-carousel-react` | `^8.6.0` | `8.6.0` | `8.6.0` |
| `hono` | `4.13.5` | `4.13.14` | `4.13.14` |
| `input-otp` | `^1.5.0` | `1.5.0` | `1.5.0` |
| `jsdom` | `^28.1.0` | `30.1.3` | `30.1.3` |
| `knip` | `6.32.3` | `6.44.1` | `6.44.1` |
| `lucide-react` | `^1.34.0` | `1.66.0` | `1.66.0` |
| `msw` | `2.15.0` | `3.0.3` | `3.0.3` |
| `neverthrow` | `8.2.0` | `8.2.0` | `8.2.0` |
| `next-themes` | `^0.4.6` | `0.4.6` | `0.4.6` |
| `pnpm` | `11.24.0` | `12.16.1` | `12.16.1` |
| `portless` | `0.15.6` | `0.15.12` | `0.15.12` |
| `radix-ui` | `^1.6.7` | `1.8.1` | `1.8.1` |
| `react` | `19.2.8, ^19.2.8` | `19.3.1` | `19.3.1` |
| `react-day-picker` | `^10.0.1` | `10.0.2` | `10.0.2` |
| `react-dom` | `19.2.8` | `19.3.1` | `19.3.1` |
| `react-resizable-panels` | `^4.12.3` | `4.16.0` | `4.16.0` |
| `recharts` | `3.8.0` | `3.10.1` | `3.10.1` |
| `shadcn` | `^4.19.0` | `4.23.0` | `4.23.0` |
| `sonner` | `^2.0.8` | `2.0.8` | `2.0.8` |
| `tailwind-merge` | `^3.6.0` | `3.7.0` | `3.7.0` |
| `tailwindcss` | `4.3.3` | `4.3.3` | `4.3.3` |
| `turbo` | `2.10.12` | `2.11.10` | `2.11.10` |
| `tw-animate-css` | `^1.4.0` | `1.4.0` | `1.4.0` |
| `typescript` | `7.0.2` | `7.0.2` | `7.0.2` |
| `ultracite` | `7.10.7` | `8.1.0` | `8.1.0` |
| `vaul` | `^1.1.2` | `1.1.2` | `1.1.2` |
| `vite` | `8.2.2` | `8.3.5` | `8.3.5` |
| `vite-plugin-pwa` | `1.3.0` | `2.0.0` | `2.0.0` |
| `vitest` | `4.1.11` | `5.0.5` | `5.0.5` |
| `workbox-core` | `^7.4.1` | `7.4.1` | `7.4.1` |
| `workbox-precaching` | `^7.4.1` | `7.4.1` | `7.4.1` |
| `workbox-routing` | `^7.4.1` | `7.4.1` | `7.4.1` |
| `workbox-window` | `^7.4.1` | `7.4.1` | `7.4.1` |
| `wrangler` | `4.127.0` | `4.156.0` | `4.156.0` |
| `zod` | `4.4.3` | `4.6.7` | `4.6.7` |
| `zustand` | `5.0.15` | `5.0.16` | `5.0.16` |

## Required migrations and preserved boundaries

- Upgraded majors: pnpm 12, Vitest 5, Ultracite 8, jest-dom 7, jsdom 30, MSW 3, PWA plugin 2. The existing Workers test plugin, SPA, service bindings, TanStack Router/Query/Form and PWA injectManifest behavior all execute successfully with these versions. No auth, storage, deployment configuration or architecture was added.
- Ultracite 8 / Biome 2.6 require safe formatting, sorted Tailwind class tokens and Unicode regex flags. Most shared UI edits are class-order-only, not restyling. Seven Fast Refresh warnings reflect existing public shadcn non-component exports; those APIs remain intact.
- Calendar custom renderers moved to module-level components to satisfy the new component-factory rule. Locale is read from DayPicker context; regression tests verify locale, DOM identity and focus across rerenders. Existing Calendar/CalendarDayButton exports and custom component overrides are preserved.
- Radix div-based group labels use semantic local aliases so the new HTML form-label rule does not misidentify them. FieldLabel explicitly forwards its existing association and children. No public component props or exports were removed.
- CSS root declarations are merged; `:is(*)` / `:is(body)` retain the same selector specificity and existing cascade-layer boundaries while satisfying duplicate-selector analysis. A font `@supports` guard preserves the existing ui-sans-serif stack on supporting browsers.
- Regenerated all three `worker-configuration.d.ts` files using Wrangler 4.156.0; compatibility dates and Worker bindings are unchanged. Runtime type output accounts for the large generated diff.
- Removed obsolete Knip dependency ignores (stronger checking). No lint/test gate was disabled and no existing test was weakened.
- Replaced obsolete release-age exclusions with the three exact current versions pnpm added for its freshness policy: `knip@6.44.1`, `lucide-react@1.66.0`, `react-resizable-panels@4.16.0`. No blanket freshness bypass or peer-check relaxation was introduced.

## AnimateIcons integration

Official sources inspected before installing:

- [React docs](https://animateicons.in/icons/docs/react), [shadcn installation](https://animateicons.in/icons/docs/shadcn), [source license](https://github.com/Avijit07x/animateicons/blob/main/LICENSE), [third-party notices](https://github.com/Avijit07x/animateicons/blob/main/THIRD_PARTY_NOTICES.md).
- The official npm React package was observed as `@animateicons/react@0.13.0` (MIT, React 18/19 peers), but **not installed**, to avoid copying/installing an unnecessary icon catalog.
- Executed the official supported per-icon flow: `corepack pnpm --filter @edge-stack/ui exec shadcn add @animateicons/lu-sparkles --yes`. This copied just `sparkles-icon.tsx`, configured `@animateicons` as `https://animateicons.in/r/{name}.json`, and added the actual registry dependency `motion` at observed latest stable `^14.9.0`. Motion is MIT. No similarly named substitute is used.
- Registry source: `https://animateicons.in/r/lu-sparkles.json`, observed 2026-10-31T20:00:39Z; SHA-256 of the registry JSON: `ae295dab1528a519b596f6824f5a4121e157437ae293a4787ec1cc5d6a2415d6`.
- Preserved upstream SVG shapes, keyframes, lazy motion features and imperative handles. Adaptations: React 19 ref prop instead of forwardRef; strict event types instead of `any`; an ordinary non-animated div wrapper to keep strict CSS types; accessible decorative/default hiding and named-image support; immediate reduced-motion imperative resets. Public static-icon and existing shadcn APIs are preserved.
- Added a small native-button preview in the existing page, playable by pointer hover, keyboard focus and activation. Browser tests verify actual SVG transforms with normal motion, and no transform for reduced-motion users. No autoplay or looping animation was added.
- Retained the full AnimateIcons MIT notice and upstream Lucide/Feather/Hugeicons notices in `packages/ui/ANIMATED_ICONS_LICENSE.md`. README documents imports, ref controls and how to add one more official registry icon.
- Runtime cost: the route chunk grows from about 81.99 kB / 22.07 kB gzip (upgraded build before icons) to 162.49 kB / 50.47 kB gzip with the selected icon and Motion. This is one icon plus its animation runtime, not the full catalog.

Exact integration files:

- `packages/ui/components.json` — official registry configuration.
- `packages/ui/package.json`, `pnpm-lock.yaml` — Motion dependency and resolution.
- `packages/ui/src/components/sparkles-icon.tsx` — copied/adapted reusable component and exported `SparklesIconHandle` type, available through the existing wildcard package export.
- `packages/ui/ANIMATED_ICONS_LICENSE.md` — retained licenses/notices.
- `apps/web/src/components/animated-icon-demo.tsx`, `apps/web/src/routes/index.tsx` — working example.
- `apps/web/src/test/animated-icons.test.tsx`, `apps/web/e2e/animated-icons.spec.ts` — accessibility and real-browser motion coverage.
- `README.md` — usage and the official add-an-icon workflow.

## Verification

Baseline frozen install, check, typecheck and all 7 original tests passed before upgrades. After all dependency and icon changes, the following final commands ran on the actual installed workspace; Turbo gates were forced to avoid relying on cached test/build results. Shared-VM limits: Turbo concurrency 2, Playwright worker 1, React Doctor parallelism 1. Chromium was installed with `corepack pnpm --filter @edge-stack/web exec playwright install chromium` (exit 0).

Environment for the final batch: `CI=1 NO_COLOR=1 REACT_DOCTOR_PARALLEL=1 TURBO_TELEMETRY_DISABLED=1`.

| Command | Exit | Verified result |
| --- | --- | --- |
| `corepack pnpm install --frozen-lockfile --network-concurrency=4 --child-concurrency=2` | 0 | Frozen lockfile accepted; pnpm 12.16.1; strict peers/engines retained |
| `corepack pnpm check` | 0 | 135 files checked after adding this report; no fixes needed |
| `corepack pnpm typecheck --concurrency=2 --force` | 0 | 8/8 tasks successful, no cached results |
| `corepack pnpm cf-typegen:check --concurrency=2` | 0 | 3/3 Workers type files up to date |
| `corepack pnpm knip` | 0 | Passed, no remaining configuration hints |
| `corepack pnpm test --concurrency=2 --force` | 0 | 12 tests passed (contracts 2, API 2, jobs 1, web 7); existing UI no-test script unchanged |
| `corepack pnpm build --concurrency=2 --force` | 0 | 5/5 tasks successful; SPA, Workers, static PWA precache built |
| `corepack pnpm test:e2e --workers=1` | 0 | 4 Chromium tests passed: original item/PWA flows plus normal/reduced icon motion |
| `corepack pnpm dlx react-doctor@0.9.18 . --json --json-compact --blocking none --project '*' --scope full` | 0 | CI-equivalent advisory scan completed: 1 existing error, 21 warnings; not a clean report |
| `corepack pnpm dlx react-doctor@0.9.18 . --json --json-compact --blocking error --project '*' --scope changed --base main --include-untracked` | 0 | Stronger error-blocking baseline scan: 0 errors, 7 existing-export warnings |
| `git diff --check` | 0 | No whitespace errors |

## Remaining limitations / review notes

- React Doctor full scan still reports the pre-existing `carousel.tsx` subscription-cleanup error (that file is unchanged) and 21 warnings. Its form preventDefault warning is a false positive: the unchanged handler already calls `event.preventDefault()`. The changed-scope scan exits 0 even with error blocking, but still reports 7 existing shadcn Fast Refresh export warnings. These were not suppressed or refactored outside scope.
- PWA plugin's internal build emits a Rolldown `inlineDynamicImports` deprecation warning; generated service worker and PWA e2e pass. Turbo reports its pre-existing output-pattern warnings for no-emit builds / tests without coverage. Vitest suggests environment pooling as a performance hint; isolation was not weakened.
- pnpm notes unapproved package-supplied agent skills. They were not approved or installed; this has no effect on the build/test gates and no Hermes profiles were changed.
- No application runtime dependency is deferred from the observed latest stable version. Only Node typings stay on the Node 24 line. A full audit of every unused shadcn interaction is outside this dependency pass; all shared source typechecks and the focused regression, Worker, SPA, PWA and icon browser tests passed.
- Hosted Actions, authenticated deployment and remote publication were deliberately not executed. Parent/maintainer diff review is still required before any commit or push.

Other changed files are the root/web/UI/API/jobs manifests, workspace catalog/lockfile, both CI workflows, Knip config, three generated Worker type files, safe shared-component class sorting, Unicode regex flags in the chart/service-worker/original e2e code, CSS compatibility fixes, and `apps/web/src/test/ui-upgrade.test.tsx`.
