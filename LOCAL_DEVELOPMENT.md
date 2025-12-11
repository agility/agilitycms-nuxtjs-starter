# Local Development with Azure Static Web Apps CLI

This guide explains how to run your Nuxt app with Azure Static Web Apps emulation locally.

## Prerequisites

Before using local emulation, install the required dependencies:

```bash
npm install -D @azure/static-web-apps-cli
```

## Quick Start

Run in two terminals:

**Terminal 1: Start Nuxt dev server**

```bash
npm run dev
```

**Terminal 2: Start SWA CLI (in a new terminal)**

```bash
npm run dev:swa
```

Access your app at **`http://localhost:4280`**

This starts:

- Nuxt dev server on `http://localhost:3000`
- Azure Static Web Apps CLI on `http://localhost:4280`
- Your Azure Functions from the `./api` folder

## What Gets Emulated

- ✅ Your `staticwebapp.config.json` rules (routes, redirects)
- ✅ Navigation fallback to `/api/redirect` for your redirect logic
- ✅ Static asset exclusions (CSS, images, fonts, HTML, etc.)
- ✅ Azure Functions API endpoints
- ✅ Authentication/authorization (test at `/.auth/login/github`)

## Testing Redirects

Your redirects from `api/redirects.json` are loaded by the `/api/redirect` endpoint.

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

## Debugging

- **Frontend**: Use browser DevTools normally
- **API Functions**: Check terminal output for logs from the Azure Functions runtime
- **SWA CLI Logs**: Check the SWA CLI terminal for routing and configuration logs

## Port Mapping

| Service         | Port | URL                                |
| --------------- | ---- | ---------------------------------- |
| Nuxt Dev Server | 3000 | `http://localhost:3000`            |
| Azure Functions | 7071 | `http://localhost:7071`            |
| SWA CLI (proxy) | 4280 | `http://localhost:4280` (USE THIS) |

**Important:** Always access your app through port **4280**, not 3000. This ensures Azure Static Web Apps routing rules are applied.
