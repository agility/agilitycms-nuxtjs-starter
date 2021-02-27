const agilityContentFetch = require("@agility/content-fetch")

export default ({ guid, apiKey, isPreview, languages, channelName }) => {

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
