# Agility CMS Webhook Setup

This guide explains how to configure Agility CMS webhooks to automatically trigger site rebuilds when content changes.

## Overview

The webhook system includes:

- **Azure Function endpoint** (`/api/agility-webhook`) that receives webhooks from Agility CMS
- **Debouncing logic** (60-second window) to prevent build storms from rapid content changes
- **GitHub Actions integration** via `repository_dispatch` events
- **Concurrency control** to cancel in-progress builds when new ones start

## How Debouncing Works

When multiple content changes happen in quick succession:

1. **First webhook** triggers a build immediately
2. **Subsequent webhooks** within 60 seconds are acknowledged but don't trigger new builds
3. After 60 seconds, the next webhook triggers a fresh build

This prevents issues like:

- Editor makes 10 rapid changes → only 1 build runs (not 10)
- Bulk content imports → single build after completion
- Multiple editors working simultaneously → builds are batched

## Setup Instructions

### 1. Create GitHub Personal Access Token

You have two options for creating a token:

#### Option A: Fine-grained Personal Access Token (Recommended)

1. Go to GitHub Settings → Developer settings → Personal access tokens → **Fine-grained tokens**
2. Click "Generate new token"
3. Configure:
   - **Token name**: `Agility CMS Webhook`
   - **Expiration**: Choose expiration (90 days recommended)
   - **Repository access**: Select "Only select repositories" → Choose your repository
   - **Repository permissions**:
     - ✅ **Actions**: Read and write access
     - ✅ **Contents**: Read-only access (needed for workflow files)
     - ✅ **Metadata**: Read-only access (automatically included)
4. Click "Generate token" and copy it (you won't see it again!)

#### Option B: Classic Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → **Tokens (classic)**
2. Click "Generate new token (classic)"
3. Set scopes:
   - ✅ `repo` (Full control of private repositories)
4. Click "Generate token" and copy it (you won't see it again!)

> **Note**: Fine-grained tokens are more secure as they limit access to specific repositories and permissions.

### 2. Configure Azure Static Web App

Add these application settings in Azure Portal:

```
GITHUB_TOKEN = ghp_your_token_here
GITHUB_REPOSITORY = agility/agilitycms-nuxtjs-starter
AGILITY_WEBHOOK_SECRET = your_random_secret_string
```

**To add settings:**

1. Open your Static Web App in Azure Portal
2. Go to Settings → Configuration
3. Add new application settings
4. Save changes

### 3. Configure Agility CMS Webhook

1. In Agility CMS, go to Settings → Webhooks
2. Create new webhook:
   - **URL**: `https://your-site.azurestaticapps.net/api/agility-webhook?secret=your_random_secret_string`
   - **Events**: Select content events (Save, Publish, Delete)
   - **Method**: POST
3. Save webhook

### 4. Test the Webhook

#### Option A: Test from Agility CMS

1. Make a content change in Agility CMS
2. Check webhook logs in Agility CMS
3. Check GitHub Actions tab for triggered workflow

#### Option B: Test locally

```bash
# Start the Azure Functions locally
npm run dev:swa

# In another terminal, send a test webhook
curl -X POST http://localhost:7071/api/agility-webhook?secret=your_secret \
  -H "Content-Type: application/json" \
  -d '{}'
```

## Webhook Endpoint Details

### URL Structure

```
https://your-site.azurestaticapps.net/api/agility-webhook?secret=YOUR_SECRET
```

Or use header authentication:

```
POST https://your-site.azurestaticapps.net/api/agility-webhook
X-Agility-Webhook-Secret: YOUR_SECRET
```

### Response Codes

| Code | Meaning                                                  |
| ---- | -------------------------------------------------------- |
| 200  | Build triggered successfully                             |
| 202  | Webhook received but debounced (build already scheduled) |
| 401  | Invalid webhook secret                                   |
| 500  | Configuration error or GitHub API failure                |

### Response Examples

**Success:**

```json
{
	"message": "Build triggered successfully",
	"repository": "agility/agilitycms-nuxtjs-starter",
	"timestamp": "2025-12-11T15:30:00.000Z"
}
```

**Debounced:**

```json
{
	"message": "Webhook received but debounced. Build already scheduled.",
	"debounced": true,
	"timeSinceLastTrigger": 15000
}
```

## Configuration Options

### Adjust Debounce Delay

Edit `api/agility-webhook/index.js`:

```javascript
const DEBOUNCE_DELAY_MS = 60000 // Change to your preferred value (in milliseconds)
```

Recommended values:

- **30000** (30 seconds) - For very active sites
- **60000** (1 minute) - Default, good for most cases
- **120000** (2 minutes) - For less critical updates
- **300000** (5 minutes) - Maximum batching for bulk operations

### Persistent Debouncing (Optional)

The current implementation uses in-memory debouncing, which resets on function cold starts. For persistent debouncing across Azure Function instances, you can integrate Azure Storage Tables. See comments in the code for guidance.

## GitHub Actions Configuration

The workflow includes concurrency control:

```yaml
concurrency:
  group: agility-cms-deploy-main
  cancel-in-progress: true
```

This means:

- If a build is running and a new webhook arrives, the old build is **cancelled**
- Only the latest build runs to completion
- Saves build minutes and ensures you deploy the latest content

## Monitoring

### Check Webhook Logs

- **Agility CMS**: Settings → Webhooks → View logs
- **Azure Portal**: Your Static Web App → Functions → Monitor

### Check GitHub Actions

- GitHub repository → Actions tab
- Look for workflows triggered by "repository_dispatch"

## Troubleshooting

### Webhook received but no build triggered

1. Check Azure Function logs for errors
2. Verify `GITHUB_TOKEN` has correct permissions
3. Verify `GITHUB_REPOSITORY` matches your repo (format: `owner/repo`)
4. Check GitHub Actions tab for workflow runs

### Build triggered but failed

1. Check GitHub Actions logs
2. Verify Agility CMS environment variables are set
3. Check Azure Static Web Apps deployment token

### Too many/few builds

Adjust `DEBOUNCE_DELAY_MS` in `api/agility-webhook/index.js`

## Security Best Practices

1. **Always use webhook secret** - Don't rely on security by obscurity
2. **Rotate GitHub token periodically** - Recommended every 90 days
3. **Use HTTPS only** - Webhook URL should be https://
4. **Monitor webhook logs** - Watch for suspicious activity
5. **Limit GitHub token scope** - Only grant `repo` permission

## Alternative Approaches

### 1. Scheduled Builds

If debouncing isn't sufficient, use GitHub Actions scheduled workflow:

```yaml
on:
  schedule:
    - cron: "0 */4 * * *" # Every 4 hours
```

### 2. Manual Trigger

Keep webhook but add manual trigger option:

```yaml
on:
  workflow_dispatch: # Adds "Run workflow" button in GitHub UI
```

### 3. Branch-specific Webhooks

Create separate webhooks for staging vs production branches.
