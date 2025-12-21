# Repository Guidelines

## Project Structure & Module Organization
- `quartz/` contains the core TypeScript source: components, plugins, processors, styles, and CLI.
- `content/` is the note vault; Markdown and attachments here become site pages.
- `docs/` holds the documentation content used to build the Quartz docs site.
- `quartz/static/` and `quartz/styles/` host static assets and global SCSS.
- Config lives in `quartz.config.ts` and layout in `quartz.layout.ts`.
- Tests are co-located as `*.test.ts` (for example, `quartz/util/path.test.ts`).

## Build, Test, and Development Commands
- `npx quartz build --serve` builds the site and runs a hot-reloading preview server.
- `npx quartz build` produces a static site (output defaults to `public/`).
- `npm test` runs the TSX test runner over `*.test.ts` files.
- `npm run check` runs TypeScript type-checking and a Prettier formatting check.
- `npm run format` formats the repo with Prettier.
- `npm run docs` builds and serves the docs site from `docs/`.

## Coding Style & Naming Conventions
- TypeScript + TSX are standard; keep files in `quartz/` organized by feature area.
- Formatting is enforced by Prettier (`tabWidth: 2`, `printWidth: 100`, `semi: false`).
- Use `camelCase` for variables/functions, `PascalCase` for components (e.g., `ContentMeta`).
- Keep SCSS in component-local files under `quartz/components/styles/` when possible.

## Testing Guidelines
- Tests use Node’s TSX test runner (`npm test`).
- Name tests with `.test.ts` and colocate near the unit (e.g., `quartz/util/fileTrie.test.ts`).
- Keep tests small and deterministic; no network access in CI-style runs.

## Commit & Pull Request Guidelines
- Recent history favors `Quartz sync: <timestamp>` for sync/update commits; follow that pattern for bulk syncs.
- For feature/fix work, use short, imperative summaries (e.g., `Add tag sorting option`).
- PRs should include a clear description, linked issues when relevant, and screenshots for UI changes.

## Configuration Tips
- Content is Markdown-first; start at `content/index.md`.
- Use `quartz.config.ts` to toggle plugins/features and `quartz.layout.ts` for page composition.
