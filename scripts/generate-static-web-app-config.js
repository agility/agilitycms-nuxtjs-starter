/**
 * Pre-build script to generate Azure Static Web Apps configuration
 * with redirects from Agility CMS.
 *
 * This script fetches URL redirections from Agility CMS and generates
 * a staticwebapp.config.json file for Azure Static Web Apps deployment.
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
		console.warn("   Generating staticwebapp.config.json without redirects.");

		// Generate a minimal config without redirects
		const minimalConfig = {
			routes: [],
		};

		writeConfig(minimalConfig);
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

		// Transform Agility redirects to Azure Static Web Apps format
		const routes = [];

		if (items && items.length > 0) {
			for (const redirect of items) {
				// Agility redirect properties:
				// - originUrl: the source URL
				// - destinationUrl: the target URL (may start with ~/ which means relative to site root)
				// - statusCode: the HTTP status code (301, 302, etc.)

				// Normalize the origin URL for Azure Static Web Apps:
				// 1. First decode any existing encoding (e.g., %20 -> space)
				// 2. Then encode properly for URL matching
				// This ensures consistent URL encoding for route matching
				let originUrl = redirect.originUrl;
				try {
					// Decode first to normalize (handles already-encoded URLs like /test%203)
					originUrl = decodeURIComponent(originUrl);
				} catch (e) {
					// If decoding fails, use as-is
				}
				// Encode the URL path (handles special chars like é -> %C3%A9)
				// encodeURI handles the full path, preserving /
				originUrl = encodeURI(originUrl);

				// Convert ~/ prefix to / for Azure Static Web Apps
				let destinationUrl = redirect.destinationUrl;
				if (destinationUrl.startsWith("~/")) {
					destinationUrl = destinationUrl.replace("~/", "/");
				}

				const route = {
					route: originUrl,
					redirect: destinationUrl,
					statusCode: redirect.statusCode || 301,
				};

				console.log(`   ${redirect.originUrl} → ${route.route} → ${route.redirect} (${route.statusCode})`);
				routes.push(route);
			}
		}

		// Build the complete staticwebapp.config.json
		const config = {
			routes: routes,
		};

		writeConfig(config);

		console.log(`✅ Generated staticwebapp.config.json with ${routes.length} redirects.`);
	} catch (error) {
		console.error("❌ Error fetching redirects from Agility CMS:", error.message);
		console.warn("   Generating staticwebapp.config.json without redirects.");

		// Generate a minimal config without redirects on error
		const minimalConfig = {
			routes: [],
		};

		writeConfig(minimalConfig);
	}
}

function writeConfig(config) {
	// Write to the root directory (where nuxt.config.js is)
	const outputPath = path.join(process.cwd(), "staticwebapp.config.json");

	fs.writeFileSync(outputPath, JSON.stringify(config, null, 2), "utf8");

	console.log(`📝 Wrote configuration to: ${outputPath}`);
}

// Run the script
generateStaticWebAppConfig();
