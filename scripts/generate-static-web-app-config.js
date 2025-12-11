/**
 * Pre-build script to generate Azure Static Web Apps configuration
 * with redirects from Agility CMS.
 *
 * This script fetches URL redirections from Agility CMS and:
 * 1. Generates a redirects.json file for the Azure Function to use
 * 2. Generates a staticwebapp.config.json with a catch-all route to the API
 *
 * This approach allows unlimited redirects since the Azure Function
 * handles them dynamically (no 20KB config file limit).
 */

// Load environment variables from .env file
require("dotenv").config();

const agility = require("@agility/content-fetch");
const fs = require("fs");
const path = require("path");

async function generateStaticWebAppConfig() {
	// Get environment variables for Agility CMS
	const guid = process.env.AGILITY_GUID;
	const apiKey =
		process.env.AGILITY_API_FETCH_KEY || process.env.AGILITY_API_KEY;

	if (!guid || !apiKey) {
		console.warn(
			"⚠️  AGILITY_GUID and AGILITY_API_FETCH_KEY environment variables are required to fetch redirects."
		);
		console.warn("   Generating config files without redirects.");

		writeRedirectsJson([]);
		writeStaticWebAppConfig();
		return;
	}

	try {
		// Initialize the Agility CMS API client
		const api = agility.getApi({
			guid: guid,
			apiKey: apiKey,
			isPreview: false,
		});

		console.log(`📡 Fetching URL redirections from Agility CMS (${guid})...`);

		// Fetch URL redirections from Agility CMS
		const redirRes = await api.getUrlRedirections({});

		const { items, lastAccessDate } = redirRes;
		console.log(`📅 Last Access Date: ${lastAccessDate}`);

		console.log(`✅ Found ${items?.length || 0} redirects.`);

		// Transform Agility redirects for the Azure Function
		const redirects = [];

		if (items && items.length > 0) {
			for (const redirect of items) {
				// Agility redirect properties:
				// - originUrl: the source URL
				// - destinationUrl: the target URL (may start with ~/ which means relative to site root)
				// - statusCode: the HTTP status code (301, 302, etc.)

				let originUrl = redirect.originUrl;

				// ============================================================
				// TEMPORARY FIX: Strip the host portion from origin URLs
				// Some Agility instances return full URLs (https://example.com/path)
				// instead of just paths (/path).
				// TODO: Remove this once Agility API returns paths consistently
				// ============================================================
				try {
					const urlObj = new URL(originUrl, "https://placeholder.com");
					originUrl = urlObj.pathname + urlObj.search + urlObj.hash;
				} catch (e) {
					// If URL parsing fails, try simple string manipulation
					if (originUrl.startsWith("http://") || originUrl.startsWith("https://")) {
						const pathStart = originUrl.indexOf("/", originUrl.indexOf("://") + 3);
						if (pathStart !== -1) {
							originUrl = originUrl.substring(pathStart);
						}
					}
				}
				// ============================================================
				// END TEMPORARY FIX
				// ============================================================

				const redirectEntry = {
					originUrl: originUrl,
					destinationUrl: redirect.destinationUrl,
					statusCode: redirect.statusCode || 301,
				};

				console.log(`   ${redirect.originUrl} → ${redirectEntry.originUrl} → ${redirectEntry.destinationUrl} (${redirectEntry.statusCode})`);
				redirects.push(redirectEntry);
			}
		}

		// Write the redirects JSON file for the Azure Function
		writeRedirectsJson(redirects);

		// Write the staticwebapp.config.json
		writeStaticWebAppConfig();

		console.log(`✅ Generated config files with ${redirects.length} redirects.`);
	} catch (error) {
		console.error("❌ Error fetching redirects from Agility CMS:", error.message);
		console.warn("   Generating config files without redirects.");

		writeRedirectsJson([]);
		writeStaticWebAppConfig();
	}
}

/**
 * Write the redirects.json file for the Azure Function.
 */
function writeRedirectsJson(redirects) {
	const outputPath = path.join(process.cwd(), "api", "redirects.json");

	// Ensure the api directory exists
	const apiDir = path.dirname(outputPath);
	if (!fs.existsSync(apiDir)) {
		fs.mkdirSync(apiDir, { recursive: true });
	}

	fs.writeFileSync(outputPath, JSON.stringify(redirects, null, 2), "utf8");

	console.log(`📝 Wrote ${redirects.length} redirects to: ${outputPath}`);
}

/**
 * Write the staticwebapp.config.json file.
 * This configures Azure Static Web Apps to use the redirect API function.
 */
function writeStaticWebAppConfig() {
	const config = {
		routes: [
			{
				route: "/api/*",
				allowedRoles: ["anonymous"]
			}
		],
		navigationFallback: {
			rewrite: "/api/redirect",
			exclude: [
				"/_nuxt/*",
				"/images/*",
				"/css/*",
				"/*.ico",
				"/*.png",
				"/*.jpg",
				"/*.jpeg",
				"/*.gif",
				"/*.svg",
				"/*.js",
				"/*.css",
				"/*.woff",
				"/*.woff2",
				"/*.ttf",
				"/*.eot"
			]
		},
		platform: {
			apiRuntime: "node:18"
		}
	};

	const outputPath = path.join(process.cwd(), "staticwebapp.config.json");
	fs.writeFileSync(outputPath, JSON.stringify(config, null, 2), "utf8");

	console.log(`📝 Wrote configuration to: ${outputPath}`);
}

// Run the script
generateStaticWebAppConfig();
