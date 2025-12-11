# Local Development with Azure Static Web Apps CLI

This guide explains how to run your Nuxt app with Azure Static Web Apps emulation locally.

## Quick Start

### Option 1: Simple Setup (API folder only, no separate function runtime)

Run in a single terminal:

```bash
npm run dev:swa
```

This starts:

- Nuxt dev server on `http://localhost:3000`
- Azure Static Web Apps CLI on `http://localhost:4280`
- Your Azure Functions from the `./api` folder

Access your app at **`http://localhost:4280`**

### Option 2: Full Setup (with separate Azure Functions runtime)

This option runs the Azure Functions runtime separately, useful for debugging.

**Terminal 1: Start Nuxt dev server**

```bash
npm run dev
```

**Terminal 2: Start Azure Functions locally**

```bash
func start
```

**Terminal 3: Start SWA CLI**

```bash
npm run dev:swa:func
```

Access your app at **`http://localhost:4280`**

## What Gets Emulated

- ✅ Your `staticwebapp.config.json` rules (routes, redirects)
- ✅ Navigation fallback to `/api/redirect` for your redirect logic
- ✅ Static asset exclusions (CSS, images, fonts, etc.)
- ✅ Azure Functions API endpoints
- ✅ Authentication/authorization (test at `/.auth/login/github`)

## Testing Redirects

Your 2,442 redirects from `api/redirects.json` are loaded by the `/api/redirect` endpoint.

Try a test redirect:

```
http://localhost:4280/web/physiotherapy-chilliwack-corbould
```

Should redirect to the destination URL with status 301/302.

## Configuration

The SWA CLI configuration is in `swa-cli.config.json`. Key settings:

- `appLocation`: `.` (root)
- `appDevserverUrl`: `http://localhost:3000` (Nuxt dev server)
- `apiLocation`: `api` (Azure Functions folder)
- `outputLocation`: `dist` (built output)

## Prerequisites

- Node.js (v18+)
- npm
- Azure Functions Core Tools (optional, for Option 2 - will be auto-installed if needed)

## Debugging

- **Frontend**: Use browser DevTools normally
- **API Functions**: Attach VS Code debugger to port 9229 when running `func start` with debug flag
- **Logs**: Check terminal output for SWA CLI logs

## Port Mapping

| Service         | Port | URL                                |
| --------------- | ---- | ---------------------------------- |
| Nuxt Dev Server | 3000 | `http://localhost:3000`            |
| Azure Functions | 7071 | `http://localhost:7071`            |
| SWA CLI (proxy) | 4280 | `http://localhost:4280` (USE THIS) |

Access your app through port **4280**, not 3000.
