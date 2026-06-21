# Quartz v5 Migration Plan

## Goal

Upgrade this personal Quartz 4 site to Quartz 5 while preserving the current visual design,
navigation behavior, deployed URL structure as much as Quartz 5 allows, and existing content.

## Constraints

- Keep the current `v4` branch available as the source of truth and rollback path.
- Do not treat Quartz v5 as a cosmetic-only dependency bump: v5 changes config, layout, page
  types, and plugin loading.
- Run builds with elevated permissions because sandboxed builds can hang in this environment.
- Capture and compare screenshots for v4 and v5 at the same routes and viewport sizes.
- Verify that important current links either keep working directly or redirect correctly.

## Routes To Verify

- `/`
- `/software`
- `/resume`
- `/hobbies/board-games`
- `/i-want-to/burn%20an%20ISO%20to%20a%20USB`
- `/i-want-to/burn-an-iso-to-a-usb`
- `/tags`

Baseline note: the `hobbies/board-games` and `i-want-to/*` routes are draft pages and already
return 404 on v4.

## Screenshot Matrix

- Desktop: `1440x1000`
- Mobile: `390x844`
- Light mode home page
- Dark mode home page
- Search overlay
- Mobile explorer open state

## Migration Phases

### 1. Baseline v4

- [x] Build and serve the current v4 site with elevated permissions.
- [x] Capture desktop and mobile screenshots for the verification routes/states.
- [x] Record any v4 routes that already fail so v5 is not blamed for pre-existing behavior.

### 2. Branch and v5 Base

- [x] Create a migration branch from upstream Quartz v5.
- [x] Restore this site's content, static assets, custom fonts, and deployment metadata.
- [x] Keep this plan file in the migration branch.

### 3. Configuration Port

- [x] Convert `quartz.config.ts` values to `quartz.config.yaml`.
- [x] Preserve title, suffix, base URL, analytics, locale, ignore patterns, theme colors, and
      local typography behavior.
- [x] Map the Quartz 4 plugin chain to Quartz 5 community/internal plugins.
- [x] Disable graph/backlinks/reader-mode where the current site does not show them.

### 4. Layout Port

- [x] Recreate content-page layout: title, tags, left sidebar, search/darkmode toolbar, explorer,
      personal sidebar links, desktop-only table of contents.
- [x] Recreate list-page layout: breadcrumbs for tag pages, title, metadata, same left sidebar,
      empty right sidebar.
- [x] Preserve mobile toolbar and explorer behavior.

### 5. Custom Code and Styling

- [x] Port custom page title markup and styling.
- [x] Port page-updated footer/content metadata behavior, including `showPageUpdated: false`.
- [x] Port `SidebarLinks`.
- [x] Port local font declarations and visual CSS overrides.
- [x] Port dark favicon support if Quartz v5 does not cover it.
- [x] Decide whether custom v4 explorer/search patches still need to be reapplied against v5.
      The search shortcut label, v4 placeholder text, desktop explorer title hiding, and mobile
      sidebar-links placement are preserved with local plugins/CSS.

### 6. Build and Fix

- [x] Install Quartz v5 dependencies/plugins.
- [x] Build with elevated permissions.
- [x] Run typecheck/format checks where practical.
- [x] Fix build/runtime issues without relaxing the cosmetic parity goal.

### 7. Visual and Link Verification

- [x] Serve v5 with elevated permissions.
- [x] Capture the same screenshot matrix as v4.
- [x] Compare screenshots and fix meaningful visual regressions.
- [x] Verify current links and v5 lowercase/hyphenated redirects.
- [x] Verify RSS, sitemap, favicon, custom domain/CNAME, and static assets.

### 8. Deployment Readiness

- [x] Update GitHub Pages environment protection to allow the `v5` branch.
- [x] Update GitHub Pages workflow from `v4` to the v5 branch.
- [x] Add Quartz v5 plugin install step and cache `.quartz/plugins`.
- [x] Document residual differences, if any.

## Progress Log

- 2026-06-21: Plan created. Current local branch is `v4`; working tree is clean.
- 2026-06-21: Starting v4 baseline build and screenshot capture.
- 2026-06-21: v4 baseline screenshots saved under
  `/private/tmp/quartz-migration-screenshots/v4`. Confirmed `/`, `/software`, `/resume`, and
  `/tags/` return 200. Draft pages under `hobbies/board-games` and `i-want-to/*` already return
  404 on v4.
- 2026-06-21: Created `lore/quartz-v5-migration` from `upstream/v5`, restored content/static
  assets, added `quartz.config.yaml`, and added local component plugins for the custom page title,
  sidebar links, footer metadata, and search shortcut label.
- 2026-06-21: Installed npm dependencies and Quartz v5 community plugins. Local site plugins are
  plain JavaScript plugins marked as prebuilt so Quartz does not try to run a build script for
  them.
- 2026-06-21: First v5 build failed in OG image generation because local-only theme font names
  were not available to Satori. Restored v4 theme font names in `quartz.config.yaml` while keeping
  the visible local-font CSS overrides. Elevated `npx quartz build` now succeeds.
- 2026-06-21: Final v5 screenshots saved under `/private/tmp/quartz-migration-screenshots/v5`.
  Compared against the v4 captures for desktop light/dark home, search overlay, mobile home, mobile
  explorer, software, resume, tags, and the known draft 404 route.
- 2026-06-21: Verified v5 routes: `/`, `/software`, `/resume`, `/hobbies/cubing`,
  `/essential-os-settings`, `/os-tricks`, `/musings/pre-2022-books`, and `/tags/` return 200;
  `/tags` redirects to `/tags/`; draft routes under `hobbies/board-games` and `i-want-to/*` remain
  404 as they were on v4.
- 2026-06-21: Verified generated internal HTML links, `/sitemap.xml`, `/index.xml`,
  `/static/icon.png`, and `/static/icon-dark.png`.
- 2026-06-21: Added a GitHub Pages deploy workflow with Node 24, dependency/plugin caching, and
  `npx quartz plugin install --from-config`. A first deployment attempt from branch `v5` built
  successfully but was rejected by GitHub Pages environment protection because only `v4` was
  allowed to deploy. Added `v5` to the `github-pages` environment's deployment branch policies so
  the workflow can deploy from the branch that matches the Quartz version.
- 2026-06-21: Confirmed `npx quartz sync` remains the normal sync command. Quartz v5's sync command
  pulls from `origin/v5`, commits local changes, then force-pushes the current branch.
- 2026-06-21: Final elevated `npx quartz build` succeeds. `npx tsc --noEmit` succeeds, and targeted
  Prettier checks pass for migration code/config/plan files. Full `npm run check` still reports
  Prettier warnings in restored note content; those markdown files were intentionally not
  reformatted to avoid broad vault churn.
