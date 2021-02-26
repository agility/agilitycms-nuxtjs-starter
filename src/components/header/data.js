export default async ({$agility, languageCode, page, dynamicPageItem}) => {

	let contentItem = null;
	let links = [];

	try {
		//get the global header
		let contentItemList = await $agility.client.getContentList({
			referenceName: "globalheader",
			languageCode
		});

		if (contentItemList && contentItemList.length) {
			contentItem = contentItemList[0];

		}
	} catch (error) {
		if (console) console.error("Could not load global header item.", error);
	}


	try {
		//get the nested sitemap
		let sitemap = await $agility.client.getSitemapNested({
			channelName: $agility.channelName,
			languageCode,
		});

		//grab the top level links that are visible on menu
		links = sitemap
			.filter(node => node.visible.menu)
			.map(node => {
				return {
					text: node.menuText || node.title,
					path: node.path
				}
			})

	} catch (error) {
		if (console) console.error("Could not load nested sitemap.", error);
	}

	return {
		contentItem,
		links
	}


}