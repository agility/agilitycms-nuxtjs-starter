const truncate = require("truncate-html");

export default async ({ $agility }) => {

	let posts = [];
	const languageCode = $agility.languages[0];

	try {


		const postsRet = await $agility.client.getContentList({
			referenceName: "posts",
			languageCode,
		});
		posts = postsRet.map((p) => {
			p.excerpt = truncate(p.fields.content, {
				length: 160,
				decodeEntities: true,
				stripTags: true,
				reserveLastWord: true,
			});
			return p;
		});

	} catch (error) {
		if (console) console.error("Could not load posts list.", error);
	}

	return posts

}