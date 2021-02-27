

const agilityContentFetch = require("@agility/content-fetch")

const getFetchClient = ({ guid, apiKey, isPreview, languages, channelName }) => {

	if (!guid) {
		console.log("AgilityCMS => No GUID was provided.");
		return null;

	}

	const api = agilityContentFetch.getApi({
		guid,
		apiKey,
		isPreview
	  });

	  return api

};

export default (ctx, inject) => {

	// read from injected options
	const agilityConfig = JSON.parse(`<%= JSON.stringify(options) %>`)

	const client = getFetchClient(agilityConfig)

	inject('agility', { client, ... agilityConfig})
  }