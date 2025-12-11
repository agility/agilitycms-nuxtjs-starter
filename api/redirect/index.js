/**
 * Azure Function to handle redirects from Agility CMS.
 *
 * This function reads the redirects from a JSON file generated at build time
 * and performs the appropriate redirect based on the requested path.
 *
 * The function is called via a catch-all route in staticwebapp.config.json
 * that rewrites unmatched paths to this API endpoint.
 */

// Load redirects directly using require (JSON is cached by Node.js module system)
const redirects = require("../redirects.json");

console.log(`Loaded ${redirects.length} redirects from redirects.json`);

/**
 * Normalize a URL path for comparison.
 * - Decode URI components
 * - Convert to lowercase for case-insensitive matching
 * - Remove trailing slashes (except for root)
 */
function normalizePath(urlPath) {
	if (!urlPath) return "/";

	try {
		// Decode the path
		urlPath = decodeURIComponent(urlPath);
	} catch (e) {
		// If decoding fails, use as-is
	}

	// Normalize to lowercase for case-insensitive matching
	urlPath = urlPath.toLowerCase();

	// Remove trailing slash (except for root)
	if (urlPath.length > 1 && urlPath.endsWith("/")) {
		urlPath = urlPath.slice(0, -1);
	}

	return urlPath;
}

/**
 * Find a matching redirect for the given path.
 */
function findRedirect(requestPath) {
	const normalizedRequest = normalizePath(requestPath);

	for (const redirect of redirects) {
		const normalizedOrigin = normalizePath(redirect.originUrl);

		if (normalizedOrigin === normalizedRequest) {
			return redirect;
		}
	}

	return null;
}

/**
 * Azure Function entry point.
 */
module.exports = async function (context, req) {
	// Get the original path from the query parameter or header
	// Azure SWA passes the original URL in the x-ms-original-url header
	const originalUrl = req.headers["x-ms-original-url"] || req.query.path || req.url;

	let requestPath = "/";
	try {
		const url = new URL(originalUrl, "https://placeholder.com");
		requestPath = url.pathname;
	} catch (e) {
		requestPath = originalUrl;
	}

	console.log(`Checking redirect for: ${requestPath}`);

	const redirect = findRedirect(requestPath);

	if (redirect) {
		// Found a matching redirect
		let destinationUrl = redirect.destinationUrl;

		// Convert ~/ prefix to / for relative URLs
		if (destinationUrl.startsWith("~/")) {
			destinationUrl = destinationUrl.replace("~/", "/");
		}

		console.log(`Redirecting ${requestPath} → ${destinationUrl} (${redirect.statusCode})`);

		context.res = {
			status: redirect.statusCode || 301,
			headers: {
				Location: destinationUrl,
			},
			body: "",
		};
	} else {
		// No redirect found - return 404
		// Note: In production, you might want to return a custom 404 page
		console.log(`No redirect found for: ${requestPath}`);

		context.res = {
			status: 404,
			body: "Not Found",
		};
	}
};
