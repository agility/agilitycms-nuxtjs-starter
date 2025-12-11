# Agility CMS + Nuxt.js Starter - AI Agent Instructions

## Architecture Overview

This is a **Nuxt.js 2 static site generator** integrated with **Agility CMS** via `@agility/agilitycms-nuxt-module`. Content is fetched at build time and pages are statically generated with optional Azure Static Web Apps deployment support.

### Component Registration Flow

1. **Module Components** (`src/components/agility-pageModules/*`) are registered in `src/agility.components.js`
2. **Page Templates** (`src/components/agility-pageTemplates/*`) are registered in the same file
3. Component names MUST match exactly with Agility CMS module/template names (e.g., `RichTextArea.vue` → CMS module "RichTextArea")
4. All new components require manual registration in `agility.components.js` - automatic discovery is NOT supported

### Page Rendering Chain

```
AgilityPage.vue → MainTemplate.vue → AgilityContentZone.vue → Individual Page Modules
```

- `AgilityPage.vue` loads page data via `asyncData()` and resolves the template component
- Templates render content zones (e.g., `<ContentZone name="MainContentZone" />`)
- `AgilityContentZone.vue` dynamically loads and renders module components from `agility.components.js`

### Module Props Convention

ALL page modules and templates receive these props:

```vue
props: { contentID: Number, item: Object, // Module content from CMS page: Object, // Full page data pageInSitemap:
Object, // Sitemap metadata dynamicPageItem: Object, // For dynamic pages only moduleData: Object // Async data from
data fetch functions }
```

## Critical Workflows

### Adding a New Page Module

1. Create Vue component in `src/components/agility-pageModules/ModuleName.vue`
2. Import and register in `src/agility.components.js` under `moduleComponents`
3. Component name must match CMS module reference name exactly
4. Include standard props (see above)

### Adding a New Page Template

1. Create template in `src/components/agility-pageTemplates/TemplateName.vue`
2. Import and register in `src/agility.components.js` under `pageTemplateComponents`
3. Use `<ContentZone name="ZoneName" />` to define content zones
4. Template key must match CMS template display name (e.g., `"Main Template"`)

### Async Data Loading

For modules requiring additional API data:

1. Create data fetch function in `src/data/ModuleName.js` (see `PostsListing.js`)
2. Export async function: `export default async ({ $agility }) => { ... }`
3. Register in `agility.components.js` under `dataFetch` with module name as key
4. Access via `this.moduleData["ModuleName"]` in component

Example pattern from `PostsListing.js`:

```javascript
export default async ({$agility}) => {
	const languageCode = $agility.languages[0]
	const rawPosts = await $agility.client.getContentList({
		referenceName: "posts",
		languageCode,
	})
	return rawPosts
}
```

## Azure Static Web Apps Integration

### Redirect System Architecture

Agility CMS redirects are handled via Azure Functions to bypass SWA's 20KB config limit:

1. **Build time**: `scripts/generate-redirects.js` (runs via `prebuild`/`pregenerate`) fetches redirects from Agility API → `api/redirects.json`
2. **Runtime**: `staticwebapp.config.json` routes unmatched paths to `api/redirect/index.js` Azure Function
3. Function performs case-insensitive path matching and returns 301/302 redirects

**Critical**: Ensure `AGILITY_GUID` and `AGILITY_API_FETCH_KEY` are set in `.env` before build.

### Local Development Commands

```bash
# Standard Nuxt dev (no Azure emulation)
npm run dev

# With Azure Static Web Apps emulation (requires 2 terminals)
# Terminal 1:
npm run dev
# Terminal 2:
npm run dev:swa
# Access at http://localhost:4280 (NOT :3000)
```

## Build & Deploy

```bash
npm run generate  # Static site generation (auto-runs prebuild for redirects)
```

Pre-build script automatically runs before `build`/`generate` to fetch latest redirects.

## Environment Variables

Required in `.env`:

```
AGILITY_GUID=your-instance-guid
AGILITY_API_FETCH_KEY=your-fetch-api-key
```

Preview mode uses `AGILITY_API_PREVIEW_KEY` (handled by nuxt module).

## Styling

Uses **Tailwind CSS** with JIT mode. Global styles in `src/css/global.css`. Typography plugin included (`@tailwindcss/typography`) - use `prose` class for rich content.

## Key Files Reference

- `nuxt.config.js` - Agility module config, channel/language settings
- `src/agility.components.js` - **Central registry** for all modules, templates, and data fetchers
- `src/AgilityPage.vue` - Page entry point with `asyncData()` logic
- `src/AgilityContentZone.vue` - Dynamic zone renderer
- `staticwebapp.config.json` - Azure SWA routing (fallback to redirect function)
- `scripts/generate-redirects.js` - Pre-build redirect fetcher

## Common Pitfalls

- Forgetting to register components in `agility.components.js` (they won't render)
- Component name mismatch with CMS reference name (case-sensitive)
- Missing `moduleData` prop when using async data fetch
- Not running `npm run dev:swa` for testing Azure-specific routing locally
