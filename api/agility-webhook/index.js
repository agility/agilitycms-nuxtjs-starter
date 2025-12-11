const https = require('https');

// In-memory cache for debouncing (will be reset on function cold start)
let lastTriggerTime = 0;
const DEBOUNCE_DELAY_MS = 60000; // 1 minute - adjust as needed

/**
 * Azure Function to handle Agility CMS webhooks and trigger GitHub Actions
 * with debouncing to prevent multiple builds from rapid content updates.
 *
 * Debouncing strategy:
 * - If multiple webhooks arrive within DEBOUNCE_DELAY_MS, only the FIRST one triggers a build
 * - Subsequent calls within the window are acknowledged but don't trigger builds
 * - This prevents build storms when editors make many rapid changes
 *
 * Alternative: Use Azure Storage Table for persistent debouncing across function instances
 */
module.exports = async function (context, req) {
	context.log('Agility CMS webhook received');

	const now = Date.now();
	const timeSinceLastTrigger = now - lastTriggerTime;

	// Check if we're within the debounce window
	if (timeSinceLastTrigger < DEBOUNCE_DELAY_MS && lastTriggerTime > 0) {
		context.log(`Debounced: ${timeSinceLastTrigger}ms since last trigger (threshold: ${DEBOUNCE_DELAY_MS}ms)`);
		context.res = {
			status: 202,
			body: {
				message: "Webhook received but debounced. Build already scheduled.",
				debounced: true,
				timeSinceLastTrigger: timeSinceLastTrigger
			}
		};
		return;
	}

	// Validate environment variables
	const githubToken = process.env.GITHUB_TOKEN;
	const githubRepo = process.env.GITHUB_REPOSITORY || 'agility/agilitycms-nuxtjs-starter';

	if (!githubToken) {
		context.log.error('GITHUB_TOKEN environment variable not set');
		context.res = {
			status: 500,
			body: { error: "Server configuration error: GITHUB_TOKEN missing" }
		};
		return;
	}

	// Verify webhook authenticity (optional but recommended)
	const expectedSecret = process.env.AGILITY_WEBHOOK_SECRET;
	const providedSecret = req.headers['x-agility-webhook-secret'] || req.query.secret;

	if (expectedSecret && providedSecret !== expectedSecret) {
		context.log.warn('Invalid webhook secret provided');
		context.res = {
			status: 401,
			body: { error: "Unauthorized: Invalid webhook secret" }
		};
		return;
	}

	// Update last trigger time BEFORE making the API call
	lastTriggerTime = now;

	// Trigger GitHub Actions via repository_dispatch
	try {
		const result = await triggerGitHubAction(githubRepo, githubToken, context);

		context.res = {
			status: 200,
			body: {
				message: "Build triggered successfully",
				repository: githubRepo,
				timestamp: new Date(now).toISOString(),
				githubResponse: result
			}
		};
	} catch (error) {
		context.log.error('Failed to trigger GitHub Action:', error.message);

		// Reset the trigger time on error so it can be retried
		lastTriggerTime = 0;

		context.res = {
			status: 500,
			body: {
				error: "Failed to trigger build",
				details: error.message
			}
		};
	}
};

/**
 * Trigger GitHub repository_dispatch event
 */
function triggerGitHubAction(repo, token, context) {
	return new Promise((resolve, reject) => {
		const [owner, repoName] = repo.split('/');
		const postData = JSON.stringify({
			event_type: 'agility-content-update',
			client_payload: {
				timestamp: new Date().toISOString(),
				source: 'agility-cms-webhook'
			}
		});

		const options = {
			hostname: 'api.github.com',
			port: 443,
			path: `/repos/${owner}/${repoName}/dispatches`,
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'Content-Length': Buffer.byteLength(postData),
				'Authorization': `token ${token}`,
				'User-Agent': 'Agility-CMS-Webhook',
				'Accept': 'application/vnd.github.v3+json'
			}
		};

		const req = https.request(options, (res) => {
			let data = '';

			res.on('data', (chunk) => {
				data += chunk;
			});

			res.on('end', () => {
				if (res.statusCode === 204) {
					context.log('Successfully triggered GitHub Action');
					resolve({ status: res.statusCode });
				} else {
					context.log.error(`GitHub API returned status ${res.statusCode}: ${data}`);
					reject(new Error(`GitHub API error: ${res.statusCode} - ${data}`));
				}
			});
		});

		req.on('error', (error) => {
			context.log.error('Request to GitHub API failed:', error);
			reject(error);
		});

		req.write(postData);
		req.end();
	});
}
