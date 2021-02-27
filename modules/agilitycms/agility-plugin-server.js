
const agilityContentSync = require("@agility/content-sync")
const agilityFileSystem = require("@agility/content-sync/src/store-interface-filesystem")

const getSyncClient = ({ guid, apiKey, isPreview, languages, channelName }) => {

	if (!guid) {
		console.log("AgilityCMS => No GUID was provided.");
		return null;
	}

	const rootPath = process.cwd()
	let cachePath = `${rootPath}/node_modules/@agility/.cache/${guid}/${isPreview ? "preview" : "live" }`;

	return agilityContentSync.getSyncClient({
		guid,
		apiKey,
		isPreview,
		languages,
		channels: [channelName],
		store: {
			interface: agilityFileSystem,
			options: {
				rootPath: cachePath
			},
		},
	});
};


export default (ctx, inject) => {

	// read from injected options
	const agilityConfig = JSON.parse(`<%= JSON.stringify(options) %>`)

	const syncClient = getSyncClient(agilityConfig)
	const client = syncClient.store

	inject('agility', { client, ... agilityConfig})
  }